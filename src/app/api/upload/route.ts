import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const config = {
  maxDuration: 60,
};

const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user || (user.role !== "ADMIN" && user.role !== "SELLER")) {
      return NextResponse.json({ error: "Only admins and sellers can upload" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File too large. Max 50MB.` },
        { status: 400 },
      );
    }

    const blob = await put(`tools/${Date.now()}-${file.name}`, file, {
      access: "private",
    });

    return NextResponse.json({ url: blob.url, fileName: file.name });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Upload failed" },
      { status: 500 },
    );
  }
}
