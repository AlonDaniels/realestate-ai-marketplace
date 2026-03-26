import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// PATCH /api/admin/tools/[id] — admin updates any tool (status, featured, etc)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  // Allow updating status, featured, name, description, price, category, tags
  const allowedFields = ["status", "featured", "name", "description", "longDescription", "price", "category", "categoryLabel", "tags", "publishedAt"];
  const data: Record<string, unknown> = {};
  for (const key of allowedFields) {
    if (key in body) data[key] = body[key];
  }

  // Auto-set publishedAt when publishing
  if (data.status === "PUBLISHED" && !data.publishedAt) {
    data.publishedAt = new Date();
  }

  const tool = await db.tool.update({ where: { id }, data });
  return NextResponse.json({ tool });
}

// DELETE /api/admin/tools/[id] — admin deletes a tool
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { id } = await params;
  await db.tool.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
