"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SellPage() {
  return (
    <>
      <Header />
      <main className="bg-sand-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-ink-900 to-gray-800 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Sell Your AI Tools</h1>
            <p className="text-gray-300 text-lg mb-2">
              Keep <span className="text-white font-bold">90% of every sale</span>. Build recurring revenue from your real estate AI tools.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Join {">"}50 creators already earning on RE AI Market.
            </p>
            <Link
              href="/signup?role=creator"
              className="btn-primary inline-block bg-primary text-white font-semibold px-8 py-3.5 rounded-full text-base"
            >
              Create Seller Account
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card-bg rounded-2xl border border-border p-8 text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-ink-900 mb-3">Recurring Revenue</h3>
                <p className="text-ink-500 leading-relaxed">
                  Set monthly subscription pricing. Earn predictable MRR as your subscriber base grows.
                </p>
              </div>
              <div className="bg-card-bg rounded-2xl border border-border p-8 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-ink-900 mb-3">Built-in Distribution</h3>
                <p className="text-ink-500 leading-relaxed">
                  Access thousands of real estate professionals actively looking for AI solutions.
                </p>
              </div>
              <div className="bg-card-bg rounded-2xl border border-border p-8 text-center">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold text-ink-900 mb-3">Easy Publishing</h3>
                <p className="text-ink-500 leading-relaxed">
                  Upload your tool, set pricing, and publish in minutes. REST API available for automation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to List */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-ink-900 text-center mb-12">How to List Your Tool</h2>
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Create your seller account",
                  description: "Sign up and complete your creator profile with your bio, expertise, and payment details.",
                },
                {
                  step: "2",
                  title: "Submit your tool",
                  description: "Upload your tool package, write a compelling description, set your monthly price, and choose a category.",
                },
                {
                  step: "3",
                  title: "Pass review",
                  description: "Our team reviews every submission for quality, security, and real estate relevance. Most reviews complete within 48 hours.",
                },
                {
                  step: "4",
                  title: "Start earning",
                  description: "Once approved, your tool goes live on the marketplace. You earn 90% of every subscription payment.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900 mb-1">{item.title}</h3>
                    <p className="text-ink-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Section */}
        <section className="py-20 bg-sand-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-ink-900 mb-3">Creator API</h2>
              <p className="text-ink-500 text-lg">Publish and manage listings programmatically</p>
            </div>
            <div className="bg-ink-900 rounded-2xl p-6 sm:p-8 overflow-x-auto">
              <pre className="text-sm text-gray-300 font-mono leading-relaxed">
{`// Publish a new tool listing
const response = await fetch('https://api.reaimarket.com/v1/listings', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'My AI Tool',
    description: 'AI-powered lead qualification...',
    category: 'lead-gen',
    price_monthly: 49,
    package_url: 'https://...'
  })
});

// { "id": "tool_abc123", "status": "in_review" }`}
              </pre>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-ink-900 mb-4">Ready to start earning?</h2>
            <Link
              href="/signup?role=creator"
              className="btn-primary inline-block bg-primary text-white font-semibold px-8 py-3.5 rounded-full text-base"
            >
              Create Seller Account
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
