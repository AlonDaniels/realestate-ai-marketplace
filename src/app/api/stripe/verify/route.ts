import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const buyer = await db.user.findUnique({ where: { clerkId: userId } });
    if (!buyer) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== "complete") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const { buyerId, toolId } = session.metadata || {};
    if (!buyerId || !toolId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    // Verify the session belongs to this user
    if (buyerId !== buyer.id) {
      return NextResponse.json({ error: "Session does not belong to this user" }, { status: 403 });
    }

    // Check if subscription already exists (webhook may have already handled it)
    const existing = await db.subscription.findUnique({
      where: { buyerId_toolId: { buyerId, toolId } },
    });

    if (existing && existing.status === "ACTIVE") {
      return NextResponse.json({ success: true, alreadyActive: true });
    }

    // Create/update the subscription
    const stripeSubId = session.subscription
      ? (session.subscription as string)
      : session.payment_intent
        ? (session.payment_intent as string)
        : null;

    await db.subscription.upsert({
      where: { buyerId_toolId: { buyerId, toolId } },
      create: {
        buyerId,
        toolId,
        stripeSubscriptionId: stripeSubId,
        status: "ACTIVE",
      },
      update: {
        stripeSubscriptionId: stripeSubId,
        status: "ACTIVE",
        canceledAt: null,
      },
    });

    await db.tool.update({
      where: { id: toolId },
      data: { installs: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
