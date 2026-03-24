import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { getToolById, tools } from "@/lib/data";
import Link from "next/link";

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
      <main className="bg-sand-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-ink-900">Home</Link>
            <span>/</span>
            <Link href="/browse" className="hover:text-ink-900">Browse</Link>
            <span>/</span>
            <span className="text-ink-900">{tool.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="aspect-[16/9] bg-sand-100 rounded-2xl flex items-center justify-center mb-8 border border-border">
                <div className="text-8xl">
                  {tool.category === "ai-agent" && "🤖"}
                  {tool.category === "automation" && "⚡"}
                  {tool.category === "analytics" && "📊"}
                  {tool.category === "marketing" && "📣"}
                  {tool.category === "lead-gen" && "🎯"}
                  {tool.category === "property-mgmt" && "🏠"}
                </div>
              </div>

              {/* Description */}
              <div className="bg-card-bg rounded-2xl border border-border p-8">
                <h2 className="text-xl font-semibold text-ink-900 mb-4">About this tool</h2>
                <p className="text-ink-700 leading-relaxed mb-6">{tool.description}</p>
                <p className="text-ink-500 leading-relaxed">
                  This tool integrates seamlessly with your existing real estate workflow. Whether you&apos;re a solo agent or managing a team, it scales to fit your needs. Built by experienced real estate professionals who understand the industry inside and out.
                </p>

                {/* Tags */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-ink-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-sand-100 text-ink-500 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card-bg rounded-2xl border border-border p-6 sticky top-24">
                {/* Title & Category */}
                <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1">
                  {tool.categoryLabel}
                </span>
                <h1 className="text-2xl font-bold text-ink-900 mt-3 mb-2">{tool.name}</h1>

                {/* Rating & Installs */}
                <div className="flex items-center gap-4 text-sm text-ink-500 mb-6">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {tool.rating}
                  </span>
                  <span>{tool.installs.toLocaleString()} installs</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {tool.price === 0 ? (
                    <div className="text-3xl font-bold text-green-600">Free</div>
                  ) : (
                    <div>
                      <span className="text-3xl font-bold text-ink-900">${tool.price}</span>
                      <span className="text-ink-500 text-sm">/month</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button className="btn-primary w-full bg-primary text-white font-semibold py-3.5 rounded-full text-base mb-3">
                  {tool.price === 0 ? "Get It Free" : "Subscribe Now"}
                </button>
                <p className="text-xs text-ink-500 text-center">
                  {tool.price === 0 ? "No credit card required" : "Cancel anytime. 7-day free trial."}
                </p>

                {/* Creator */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-ink-900 mb-3">Created by</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{tool.creator.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-ink-900 text-sm">{tool.creator.name}</div>
                      <div className="text-xs text-ink-500">{tool.creator.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-ink-900 mb-6">Related Tools</h2>
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
