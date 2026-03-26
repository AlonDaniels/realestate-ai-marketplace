import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const tool = await db.tool.findFirst({
    where: { OR: [{ id }, { slug: id }] },
  });

  if (!tool || !tool.blobUrl) {
    return NextResponse.json({ error: "No downloadable file" }, { status: 404 });
  }

  // Admin and tool owner can always download
  const isAdmin = user.role === "ADMIN";
  const isOwner = tool.sellerId === user.id;

  if (!isAdmin && !isOwner) {
    const subscription = await db.subscription.findUnique({
      where: { buyerId_toolId: { buyerId: user.id, toolId: tool.id } },
    });

    if (!subscription || subscription.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Active subscription required" },
        { status: 403 },
      );
    }
  }

  // Fetch the private blob server-side using the token and stream to user
  const blobRes = await fetch(tool.blobUrl, {
    headers: {
      Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
    },
  });

  if (!blobRes.ok) {
    console.error("Blob fetch failed:", blobRes.status, await blobRes.text());
    return NextResponse.json({ error: "File download failed" }, { status: 500 });
  }

  const fileName = tool.fileName || "download";

  return new NextResponse(blobRes.body, {
    headers: {
      "Content-Type": blobRes.headers.get("Content-Type") || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      ...(blobRes.headers.get("Content-Length")
        ? { "Content-Length": blobRes.headers.get("Content-Length")! }
        : {}),
    },
  });
}
