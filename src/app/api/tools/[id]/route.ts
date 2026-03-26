import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { updateToolSchema } from "@/lib/validations";

// GET /api/tools/[id] — get single tool
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const tool = await db.tool.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
      status: "PUBLISHED",
    },
    include: {
      seller: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true, title: true, bio: true },
      },
      reviews: {
        include: {
          user: { select: { firstName: true, lastName: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!tool) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  return NextResponse.json({ tool });
}

// PATCH /api/tools/[id] — seller updates their tool
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tool = await db.tool.findUnique({ where: { id } });
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // Only the seller or admin can edit
    if (tool.sellerId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = updateToolSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await db.tool.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json({ tool: updated });
  } catch (error) {
    console.error("Update tool error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
