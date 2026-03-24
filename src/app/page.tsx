import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ToolCard from "@/components/ToolCard";
import CreatorCard from "@/components/CreatorCard";
import HowItWorks from "@/components/HowItWorks";
import NewsletterForm from "@/components/NewsletterForm";
import { getPopularTools, getFreeTools, featuredCreators } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  const popularTools = getPopularTools();
  const freeTools = getFreeTools();

  return (
    <>
      <Header />
      <main>
        <HeroSection />

        {/* Most Popular Tools */}
        <section className="py-20 bg-sand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-ink-900">Most Popular Tools</h2>
                <p className="text-ink-500 mt-2">Battle-tested AI tools trusted by top agents</p>
              </div>
              <Link
                href="/browse"
                className="hidden sm:inline-flex text-primary font-medium text-sm hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
            <div className="sm:hidden text-center mt-8">
              <Link href="/browse" className="text-primary font-medium text-sm hover:underline">
                View all tools &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Free Tools */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-ink-900">Free Tools</h2>
                <p className="text-ink-500 mt-2">Get started with powerful tools at no cost</p>
              </div>
              <Link
                href="/browse?price=free"
                className="hidden sm:inline-flex text-primary font-medium text-sm hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* Sell CTA */}
        <section className="py-20 bg-ink-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Built an AI Tool for Real Estate?
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                Keep <span className="text-white font-bold">90% of every sale</span>, minus payment processing fees. Publish once, earn recurring revenue.
              </p>
              <p className="text-gray-400 text-sm mb-8">
                One command to publish. REST API for programmatic listing management.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/sell"
                  className="btn-primary bg-primary text-white font-semibold px-8 py-3.5 rounded-full text-base w-full sm:w-auto"
                >
                  Start Selling
                </Link>
                <Link
                  href="/pricing"
                  className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-white/10 transition-colors w-full sm:w-auto"
                >
                  See Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Creators */}
        <section className="py-20 bg-sand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-ink-900">Featured Creators</h2>
              <p className="text-ink-500 mt-2">Meet the builders powering the AI real estate revolution</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-ink-900 mb-3">RE AI Daily</h2>
            <p className="text-ink-500 text-lg mb-8">One AI real estate tip, every morning. Free, no spam.</p>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
