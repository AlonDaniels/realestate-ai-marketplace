import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createReviewSchema } from "@/lib/validations";

// POST /api/reviews — buyer leaves a review
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = createReviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }

    const { toolId, rating, title, body: reviewBody } = parsed.data;

    // Verify tool exists and is published
    const tool = await db.tool.findUnique({
      where: { id: toolId, status: "PUBLISHED" },
    });
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // Verify buyer has an active subscription (or tool is free)
    if (tool.price > 0) {
      const subscription = await db.subscription.findUnique({
        where: {
          buyerId_toolId: { buyerId: user.id, toolId },
          status: "ACTIVE",
        },
      });
      if (!subscription) {
        return NextResponse.json({ error: "Must be subscribed to review" }, { status: 403 });
      }
    }

    // Create or update review
    const review = await db.review.upsert({
      where: { userId_toolId: { userId: user.id, toolId } },
      create: {
        userId: user.id,
        toolId,
        rating,
        title,
        body: reviewBody,
      },
      update: {
        rating,
        title,
        body: reviewBody,
      },
    });

    // Recalculate tool rating
    const stats = await db.review.aggregate({
      where: { toolId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await db.tool.update({
      where: { id: toolId },
      data: {
        rating: stats._avg.rating || 0,
        reviewCount: stats._count.rating,
      },
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
