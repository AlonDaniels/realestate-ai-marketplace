import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stripe, PLATFORM_FEE_PERCENT } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toolId } = await req.json();
    if (!toolId) {
      return NextResponse.json({ error: "toolId required" }, { status: 400 });
    }

    const buyer = await db.user.findUnique({ where: { clerkId: userId } });
    if (!buyer) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tool = await db.tool.findUnique({
      where: { id: toolId, status: "PUBLISHED" },
      include: { seller: true },
    });
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // Check if already subscribed
    const existingSub = await db.subscription.findUnique({
      where: { buyerId_toolId: { buyerId: buyer.id, toolId: tool.id } },
    });
    if (existingSub && existingSub.status === "ACTIVE") {
      return NextResponse.json({ error: "Already subscribed" }, { status: 400 });
    }

    // Free tools — create subscription directly
    if (tool.price === 0) {
      await db.subscription.upsert({
        where: { buyerId_toolId: { buyerId: buyer.id, toolId: tool.id } },
        create: {
          buyerId: buyer.id,
          toolId: tool.id,
          status: "ACTIVE",
        },
        update: {
          status: "ACTIVE",
          canceledAt: null,
        },
      });
      await db.tool.update({
        where: { id: tool.id },
        data: { installs: { increment: 1 } },
      });
      return NextResponse.json({ free: true, success: true });
    }

    // Paid tools — create Stripe Checkout session
    if (!tool.stripePriceId) {
      return NextResponse.json({ error: "Tool not configured for payments" }, { status: 400 });
    }

    // Ensure buyer has a Stripe customer ID
    let stripeCustomerId = buyer.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: buyer.email,
        metadata: { userId: buyer.id, clerkId: buyer.clerkId },
      });
      stripeCustomerId = customer.id;
      await db.user.update({
        where: { id: buyer.id },
        data: { stripeCustomerId },
      });
    }

    const sessionParams: Record<string, unknown> = {
      customer: stripeCustomerId,
      mode: "subscription",
      line_items: [{ price: tool.stripePriceId, quantity: 1 }],
      success_url: `${req.nextUrl.origin}/tool/${tool.slug}?subscribed=true`,
      cancel_url: `${req.nextUrl.origin}/tool/${tool.slug}`,
      subscription_data: {
        metadata: { buyerId: buyer.id, toolId: tool.id, sellerId: tool.sellerId },
      },
      metadata: { buyerId: buyer.id, toolId: tool.id },
    };

    // If seller has Stripe Connect, apply platform fee
    if (tool.seller.stripeAccountId && tool.seller.stripeOnboarded) {
      sessionParams.subscription_data = {
        ...(sessionParams.subscription_data as Record<string, unknown>),
        application_fee_percent: PLATFORM_FEE_PERCENT,
        transfer_data: { destination: tool.seller.stripeAccountId },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams as Parameters<typeof stripe.checkout.sessions.create>[0]);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
