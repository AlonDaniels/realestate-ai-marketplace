import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      // In development without webhook secret, parse directly
      event = JSON.parse(body) as Stripe.Event;
    } else {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    }
  } catch {
    console.error("Webhook signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const { buyerId, toolId } = session.metadata || {};
        if (buyerId && toolId) {
          const stripeSubscriptionId = session.subscription
            ? (session.subscription as string)
            : null;
          const stripePaymentIntentId = session.payment_intent
            ? (session.payment_intent as string)
            : null;

          await db.subscription.upsert({
            where: { buyerId_toolId: { buyerId, toolId } },
            create: {
              buyerId,
              toolId,
              stripeSubscriptionId: stripeSubscriptionId || stripePaymentIntentId,
              status: "ACTIVE",
            },
            update: {
              stripeSubscriptionId: stripeSubscriptionId || stripePaymentIntentId,
              status: "ACTIVE",
              canceledAt: null,
            },
          });
          await db.tool.update({
            where: { id: toolId },
            data: { installs: { increment: 1 } },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const sub = subscription as unknown as Record<string, unknown>;
        const dbSub = await db.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });
        if (dbSub) {
          let status: "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING" = "ACTIVE";
          if (subscription.status === "past_due") status = "PAST_DUE";
          if (subscription.status === "canceled") status = "CANCELED";
          if (subscription.status === "trialing") status = "TRIALING";

          await db.subscription.update({
            where: { id: dbSub.id },
            data: {
              status,
              currentPeriodStart: sub.current_period_start ? new Date((sub.current_period_start as number) * 1000) : null,
              currentPeriodEnd: sub.current_period_end ? new Date((sub.current_period_end as number) * 1000) : null,
              canceledAt: sub.canceled_at ? new Date((sub.canceled_at as number) * 1000) : null,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await db.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: "CANCELED",
            canceledAt: new Date(),
          },
        });
        break;
      }

      case "account.updated": {
        // Stripe Connect: seller account updated
        const account = event.data.object as Stripe.Account;
        if (account.charges_enabled && account.payouts_enabled) {
          await db.user.updateMany({
            where: { stripeAccountId: account.id },
            data: { stripeOnboarded: true },
          });
        }
        break;
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
