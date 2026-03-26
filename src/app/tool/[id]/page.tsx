import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { db } from "@/lib/db";
import { categoryIconsHero } from "@/lib/icons";
import SubscribeButton from "@/components/SubscribeButton";
import Link from "next/link";
import { Star, Download, ChevronRight } from "lucide-react";
import type { Tool } from "@/lib/data";

function dbToolToCard(t: {
  slug: string; name: string; description: string; price: number; category: string;
  categoryLabel: string; installs: number; rating: number; tags: string[];
  seller: { firstName: string | null; lastName: string | null; avatarUrl: string | null; title: string | null };
}): Tool {
  return {
    id: t.slug,
    name: t.name,
    description: t.description,
    price: t.price / 100,
    category: t.category as Tool["category"],
    categoryLabel: t.categoryLabel,
    creator: {
      name: [t.seller.firstName, t.seller.lastName].filter(Boolean).join(" ") || "Unknown",
      avatar: t.seller.avatarUrl || "",
      title: t.seller.title || "",
    },
    installs: t.installs,
    rating: t.rating,
    image: "",
    tags: t.tags,
  };
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const tool = await db.tool.findFirst({
    where: {
      OR: [{ slug: id }, { id }],
      status: "PUBLISHED",
    },
    include: {
      seller: { select: { firstName: true, lastName: true, avatarUrl: true, title: true, bio: true } },
      reviews: {
        include: { user: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!tool) {
    notFound();
  }

  // Check if current user is subscribed
  let isSubscribed = false;
  const { userId } = await auth();
  if (userId) {
    const dbUser = await db.user.findUnique({ where: { clerkId: userId } });
    if (dbUser) {
      const subscription = await db.subscription.findUnique({
        where: { buyerId_toolId: { buyerId: dbUser.id, toolId: tool.id } },
      });
      isSubscribed = subscription?.status === "ACTIVE";
    }
  }

  const relatedTools = await db.tool.findMany({
    where: { category: tool.category, status: "PUBLISHED", id: { not: tool.id } },
    take: 3,
    include: { seller: { select: { firstName: true, lastName: true, avatarUrl: true, title: true } } },
  });

  const sellerName = [tool.seller.firstName, tool.seller.lastName].filter(Boolean).join(" ") || "Unknown";
  const priceDisplay = tool.price === 0 ? 0 : tool.price / 100;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-1.5 text-sm text-text-secondary mb-8">
            <Link href="/" className="hover:text-text-primary transition-colors cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/browse" className="hover:text-text-primary transition-colors cursor-pointer">Browse</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-text-primary font-medium">{tool.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="aspect-[16/9] bg-gradient-to-br from-surface to-primary-light/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/5">
                <div className="text-primary/40">{categoryIconsHero[tool.category]}</div>
              </div>

              <div className="card-elevated rounded-2xl p-8">
                <h2 className="font-heading text-xl font-semibold text-text-primary mb-4">About this tool</h2>
                <p className="text-text-secondary leading-relaxed mb-6">{tool.description}</p>
                {tool.longDescription && (
                  <p className="text-text-secondary/80 leading-relaxed whitespace-pre-line">{tool.longDescription}</p>
                )}

                {tool.tags.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <h3 className="text-sm font-heading font-semibold text-text-primary mb-3 uppercase tracking-wide">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-primary/5 text-text-secondary text-xs rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                {tool.reviews.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <h3 className="text-sm font-heading font-semibold text-text-primary mb-4 uppercase tracking-wide">
                      Reviews ({tool.reviewCount})
                    </h3>
                    <div className="space-y-4">
                      {tool.reviews.map((review) => (
                        <div key={review.id} className="pb-4 border-b border-border/30 last:border-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-text-primary">
                              {review.user.firstName} {review.user.lastName}
                            </span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
                              ))}
                            </div>
                          </div>
                          {review.title && <p className="text-sm font-medium text-text-primary">{review.title}</p>}
                          {review.body && <p className="text-sm text-text-secondary">{review.body}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-elevated rounded-2xl p-6 sticky top-24">
                <span className="text-xs font-semibold text-primary bg-primary/8 rounded-full px-3 py-1 uppercase tracking-wide">
                  {tool.categoryLabel}
                </span>
                <h1 className="font-heading text-2xl font-bold text-text-primary mt-3 mb-2">{tool.name}</h1>

                <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {tool.rating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {tool.installs.toLocaleString()} installs
                  </span>
                </div>

                <div className="mb-6">
                  {tool.price === 0 ? (
                    <div className="text-3xl font-heading font-bold text-primary">Free</div>
                  ) : (
                    <div>
                      <span className="text-3xl font-heading font-bold text-text-primary">${priceDisplay}</span>
                      <span className="text-text-secondary text-sm">/month</span>
                    </div>
                  )}
                </div>

                <SubscribeButton toolId={tool.id} price={tool.price} isSubscribed={isSubscribed} packageUrl={tool.packageUrl} />

                <div className="mt-6 pt-6 border-t border-border/50">
                  <h3 className="text-sm font-heading font-semibold text-text-primary mb-3 uppercase tracking-wide">Created by</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-white">{sellerName.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-text-primary text-sm">{sellerName}</div>
                      <div className="text-xs text-text-secondary">{tool.seller.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedTools.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} tool={dbToolToCard(t)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
