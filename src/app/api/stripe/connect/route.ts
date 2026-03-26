import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

// Create Stripe Connect onboarding link for sellers
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

    // Upgrade to seller if needed
    if (user.role === "BUYER") {
      await db.user.update({
        where: { id: user.id },
        data: { role: "SELLER" },
      });
    }

    // Create or retrieve Stripe Connect account
    let accountId = user.stripeAccountId;
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "standard",
        email: user.email,
        metadata: { userId: user.id, clerkId: user.clerkId },
      });
      accountId = account.id;
      await db.user.update({
        where: { id: user.id },
        data: { stripeAccountId: accountId },
      });
    }

    // Create onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${req.nextUrl.origin}/dashboard/seller?stripe=refresh`,
      return_url: `${req.nextUrl.origin}/dashboard/seller?stripe=complete`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Connect error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
