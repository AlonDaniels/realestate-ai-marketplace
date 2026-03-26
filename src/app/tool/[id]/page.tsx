import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { getToolById, tools } from "@/lib/data";
import { categoryIconsHero } from "@/lib/icons";
import Link from "next/link";
import { Star, Download, ChevronRight } from "lucide-react";
import SubscribeButton from "@/components/SubscribeButton";

export function generateStaticParams() {
  return tools.map((tool) => ({ id: tool.id }));
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = getToolById(id);

  if (!tool) {
    notFound();
  }

  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-text-secondary mb-8">
            <Link href="/" className="hover:text-text-primary transition-colors cursor-pointer">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/browse" className="hover:text-text-primary transition-colors cursor-pointer">Browse</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-text-primary font-medium">{tool.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="aspect-[16/9] bg-gradient-to-br from-surface to-primary-light/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/5">
                <div className="text-primary/40">
                  {categoryIconsHero[tool.category]}
                </div>
              </div>

              {/* Description */}
              <div className="card-elevated rounded-2xl p-8">
                <h2 className="font-heading text-xl font-semibold text-text-primary mb-4">About this tool</h2>
                <p className="text-text-secondary leading-relaxed mb-6">{tool.description}</p>
                <p className="text-text-secondary/80 leading-relaxed">
                  This tool integrates seamlessly with your existing real estate workflow. Whether you&apos;re a solo agent or managing a team, it scales to fit your needs. Built by experienced real estate professionals who understand the industry inside and out.
                </p>

                {/* Tags */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <h3 className="text-sm font-heading font-semibold text-text-primary mb-3 uppercase tracking-wide">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-primary/5 text-text-secondary text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-elevated rounded-2xl p-6 sticky top-24">
                {/* Title & Category */}
                <span className="text-xs font-semibold text-primary bg-primary/8 rounded-full px-3 py-1 uppercase tracking-wide">
                  {tool.categoryLabel}
                </span>
                <h1 className="font-heading text-2xl font-bold text-text-primary mt-3 mb-2">{tool.name}</h1>

                {/* Rating & Installs */}
                <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {tool.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {tool.installs.toLocaleString()} installs
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {tool.price === 0 ? (
                    <div className="text-3xl font-heading font-bold text-primary">Free</div>
                  ) : (
                    <div>
                      <span className="text-3xl font-heading font-bold text-text-primary">${tool.price}</span>
                      <span className="text-text-secondary text-sm">/month</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <SubscribeButton toolId={tool.id} price={tool.price} />

                {/* Creator */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <h3 className="text-sm font-heading font-semibold text-text-primary mb-3 uppercase tracking-wide">Created by</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-white">{tool.creator.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-text-primary text-sm">{tool.creator.name}</div>
                      <div className="text-xs text-text-secondary">{tool.creator.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} tool={t} />
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
