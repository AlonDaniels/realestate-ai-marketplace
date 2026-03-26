import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ToolCard from "@/components/ToolCard";
import CreatorCard from "@/components/CreatorCard";
import HowItWorks from "@/components/HowItWorks";
import NewsletterForm from "@/components/NewsletterForm";
import { db } from "@/lib/db";
import { featuredCreators } from "@/lib/data";
import type { Tool } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, DollarSign, Newspaper } from "lucide-react";

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

export const dynamic = "force-dynamic";

export default async function Home() {
  const [popularDbTools, freeDbTools] = await Promise.all([
    db.tool.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { installs: "desc" },
      take: 6,
      include: { seller: { select: { firstName: true, lastName: true, avatarUrl: true, title: true } } },
    }),
    db.tool.findMany({
      where: { status: "PUBLISHED", price: 0 },
      orderBy: { installs: "desc" },
      take: 6,
      include: { seller: { select: { firstName: true, lastName: true, avatarUrl: true, title: true } } },
    }),
  ]);

  const popularTools = popularDbTools.map(dbToolToCard);
  const freeTools = freeDbTools.map(dbToolToCard);

  return (
    <>
      <Header />
      <main>
        <HeroSection />

        {/* Most Popular Tools */}
        {popularTools.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-text-primary">Most Popular Tools</h2>
                  <p className="text-text-secondary mt-2">Battle-tested AI tools trusted by top agents</p>
                </div>
                <Link href="/browse" className="hidden sm:inline-flex items-center gap-1 text-primary font-semibold text-sm hover:text-cta transition-colors cursor-pointer">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {popularTools.map((tool) => (
                  <div key={tool.id} className="animate-fade-in-up"><ToolCard tool={tool} /></div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Free Tools */}
        {freeTools.length > 0 && (
          <section className="py-20 bg-white/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-text-primary">Free Tools</h2>
                  <p className="text-text-secondary mt-2">Get started with powerful tools at no cost</p>
                </div>
                <Link href="/browse?price=free" className="hidden sm:inline-flex items-center gap-1 text-primary font-semibold text-sm hover:text-cta transition-colors cursor-pointer">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {freeTools.map((tool) => (
                  <div key={tool.id} className="animate-fade-in-up"><ToolCard tool={tool} /></div>
                ))}
              </div>
            </div>
          </section>
        )}

        <HowItWorks />

        {/* Sell CTA */}
        <section className="py-20 bg-gradient-to-br from-text-primary via-primary to-cta-dark text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <DollarSign className="w-5 h-5 text-primary-light" />
                <span className="text-primary-light font-semibold text-sm uppercase tracking-widest">For Creators</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Built an AI Tool for Real Estate?</h2>
              <p className="text-teal-100 text-lg mb-8">
                Keep <span className="text-white font-bold">90% of every sale</span>, minus payment processing fees.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/sell" className="btn-cta font-semibold px-8 py-3.5 rounded-full text-base w-full sm:w-auto inline-flex items-center justify-center gap-2">
                  Start Selling <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-white/10 transition-colors w-full sm:w-auto cursor-pointer">
                  See Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Creators */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-bold text-text-primary">Featured Creators</h2>
              <p className="text-text-secondary mt-2">Meet the builders powering the AI real estate revolution</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {featuredCreators.map((creator) => (
                <div key={creator.id} className="animate-fade-in-up"><CreatorCard creator={creator} /></div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-white/50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-4"><Newspaper className="w-6 h-6 text-primary" /></div>
            <h2 className="font-heading text-3xl font-bold text-text-primary mb-3">RE AI Daily</h2>
            <p className="text-text-secondary text-lg mb-8">One AI real estate tip, every morning. Free, no spam.</p>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
