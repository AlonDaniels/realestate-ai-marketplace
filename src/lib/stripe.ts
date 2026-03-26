import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
  typescript: true,
});

// Platform fee: 10% of every transaction
export const PLATFORM_FEE_PERCENT = 10;
