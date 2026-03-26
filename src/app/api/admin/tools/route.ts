import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { createToolSchema } from "@/lib/validations";
import { stripe } from "@/lib/stripe";

// GET /api/admin/tools — list all tools (admin only)
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const tools = await db.tool.findMany({
    include: {
      seller: { select: { id: true, firstName: true, lastName: true, email: true } },
      _count: { select: { subscriptions: true, reviews: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ tools });
}

// POST /api/admin/tools — admin creates a tool directly (published)
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createToolSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }

  const { name, description, longDescription, price, pricingModel, category, tags, packageUrl, blobUrl, fileName } = parsed.data;

  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let slug = baseSlug;
  let counter = 1;
  while (await db.tool.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const categoryLabels: Record<string, string> = {
    "ai-agent": "AI Agent",
    "automation": "Automation",
    "analytics": "Analytics",
    "marketing": "Marketing",
    "lead-gen": "Lead Generation",
    "property-mgmt": "Property Mgmt",
  };

  // Create Stripe product and price for paid tools
  let stripeProductId: string | undefined;
  let stripePriceId: string | undefined;

  if (price > 0) {
    const stripeProduct = await stripe.products.create({
      name,
      description,
      metadata: { sellerId: user.id, slug },
    });
    stripeProductId = stripeProduct.id;

    const stripePrice = pricingModel === "SUBSCRIPTION"
      ? await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: price,
          currency: "usd",
          recurring: { interval: "month" },
        })
      : await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: price,
          currency: "usd",
        });
    stripePriceId = stripePrice.id;
  }

  const tool = await db.tool.create({
    data: {
      sellerId: user.id,
      name,
      slug,
      description,
      longDescription,
      price,
      pricingModel,
      category,
      categoryLabel: categoryLabels[category] || category,
      tags,
      packageUrl,
      blobUrl,
      fileName,
      stripeProductId,
      stripePriceId,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  return NextResponse.json({ tool }, { status: 201 });
}
