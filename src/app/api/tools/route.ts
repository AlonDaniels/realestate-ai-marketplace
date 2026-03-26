import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { createToolSchema } from "@/lib/validations";

// GET /api/tools — public marketplace listing
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "popular";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { status: "PUBLISHED" };
  if (category) where.category = category;

  const orderBy: Record<string, string> = {};
  if (sort === "popular") orderBy.installs = "desc";
  else if (sort === "rating") orderBy.rating = "desc";
  else if (sort === "newest") orderBy.publishedAt = "desc";
  else if (sort === "price-low") orderBy.price = "asc";
  else if (sort === "price-high") orderBy.price = "desc";

  const [tools, total] = await Promise.all([
    db.tool.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        seller: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true, title: true },
        },
      },
    }),
    db.tool.count({ where }),
  ]);

  return NextResponse.json({
    tools,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

// POST /api/tools — seller creates a tool listing
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user || (user.role !== "SELLER" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Seller access required" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createToolSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
    }

    const { name, description, longDescription, price, pricingModel, category, tags, packageUrl, blobUrl, fileName } = parsed.data;

    // Generate slug
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    let slug = baseSlug;
    let counter = 1;
    while (await db.tool.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Category labels
    const categoryLabels: Record<string, string> = {
      "ai-agent": "AI Agent",
      "automation": "Automation",
      "analytics": "Analytics",
      "marketing": "Marketing",
      "lead-gen": "Lead Generation",
      "property-mgmt": "Property Mgmt",
    };

    // Create Stripe product + price if paid
    let stripeProductId: string | null = null;
    let stripePriceId: string | null = null;

    if (price > 0 && user.stripeAccountId && user.stripeOnboarded) {
      const product = await stripe.products.create({
        name,
        description,
        metadata: { sellerId: user.id },
      });
      stripeProductId = product.id;

      const stripePrice = await stripe.prices.create({
        product: product.id,
        unit_amount: price,
        currency: "usd",
        recurring: { interval: "month" },
        metadata: { sellerId: user.id },
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
        status: "IN_REVIEW",
        stripeProductId,
        stripePriceId,
      },
    });

    return NextResponse.json({ tool }, { status: 201 });
  } catch (error) {
    console.error("Create tool error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
