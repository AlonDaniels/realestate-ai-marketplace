import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const [
    totalUsers,
    totalBuyers,
    totalSellers,
    totalTools,
    publishedTools,
    inReviewTools,
    totalSubscriptions,
    activeSubscriptions,
    totalInstalls,
    avgRating,
    recentUsers,
    recentTools,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { role: "BUYER" } }),
    db.user.count({ where: { role: "SELLER" } }),
    db.tool.count(),
    db.tool.count({ where: { status: "PUBLISHED" } }),
    db.tool.count({ where: { status: "IN_REVIEW" } }),
    db.subscription.count(),
    db.subscription.count({ where: { status: "ACTIVE" } }),
    db.tool.aggregate({ _sum: { installs: true } }),
    db.tool.aggregate({ where: { status: "PUBLISHED", reviewCount: { gt: 0 } }, _avg: { rating: true } }),
    db.user.findMany({ orderBy: { createdAt: "desc" }, take: 10, select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true } }),
    db.tool.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { seller: { select: { firstName: true, lastName: true, email: true } } } }),
  ]);

  // Monthly revenue estimate (sum of active subscription tool prices * 90%)
  const activeSubsWithPrice = await db.subscription.findMany({
    where: { status: "ACTIVE" },
    include: { tool: { select: { price: true } } },
  });
  const grossMRR = activeSubsWithPrice.reduce((sum, s) => sum + s.tool.price, 0);
  const platformMRR = Math.round(grossMRR * 0.1); // 10% platform fee
  const sellerMRR = grossMRR - platformMRR;

  return NextResponse.json({
    users: { total: totalUsers, buyers: totalBuyers, sellers: totalSellers },
    tools: { total: totalTools, published: publishedTools, inReview: inReviewTools },
    subscriptions: { total: totalSubscriptions, active: activeSubscriptions },
    installs: totalInstalls._sum.installs || 0,
    avgRating: avgRating._avg.rating || 0,
    revenue: {
      grossMRR: grossMRR / 100,
      platformMRR: platformMRR / 100,
      sellerMRR: sellerMRR / 100,
    },
    recentUsers,
    recentTools,
  });
}
