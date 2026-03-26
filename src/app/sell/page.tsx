"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, DollarSign, Rocket, Settings, Code } from "lucide-react";

export default function SellPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-text-primary via-primary to-cta-dark text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">Sell Your AI Tools</h1>
            <p className="text-teal-100 text-lg mb-2">
              Keep <span className="text-white font-bold">90% of every sale</span>. Build recurring revenue from your real estate AI tools.
            </p>
            <p className="text-teal-200/60 text-sm mb-8">
              Join 50+ creators already earning on RE AI Market.
            </p>
            <Link
              href="/signup?role=creator"
              className="btn-cta inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-full text-base"
            >
              Create Seller Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <DollarSign className="w-8 h-8" />, title: "Recurring Revenue", desc: "Set monthly subscription pricing. Earn predictable MRR as your subscriber base grows." },
                { icon: <Rocket className="w-8 h-8" />, title: "Built-in Distribution", desc: "Access thousands of real estate professionals actively looking for AI solutions." },
                { icon: <Settings className="w-8 h-8" />, title: "Easy Publishing", desc: "Upload your tool, set pricing, and publish in minutes. REST API available for automation." },
              ].map((item) => (
                <div key={item.title} className="card-elevated rounded-2xl p-8 text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary-light/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary group-hover:to-primary-light group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-text-primary mb-3">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to List */}
        <section className="py-20 bg-white/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-text-primary text-center mb-12">How to List Your Tool</h2>
            <div className="space-y-8">
              {[
                { step: "1", title: "Create your seller account", description: "Sign up and complete your creator profile with your bio, expertise, and payment details." },
                { step: "2", title: "Submit your tool", description: "Upload your tool package, write a compelling description, set your monthly price, and choose a category." },
                { step: "3", title: "Pass review", description: "Our team reviews every submission for quality, security, and real estate relevance. Most reviews complete within 48 hours." },
                { step: "4", title: "Start earning", description: "Once approved, your tool goes live on the marketplace. You earn 90% of every subscription payment." },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-cta text-white rounded-full flex items-center justify-center font-heading font-bold shrink-0 shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center mb-3">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-text-primary mb-3">Creator API</h2>
              <p className="text-text-secondary text-lg">Publish and manage listings programmatically</p>
            </div>
            <div className="bg-text-primary rounded-2xl p-6 sm:p-8 overflow-x-auto shadow-xl">
              <pre className="text-sm text-teal-100/80 font-mono leading-relaxed">
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
        <section className="py-16 bg-white/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Ready to start earning?</h2>
            <Link
              href="/signup?role=creator"
              className="btn-cta inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-full text-base"
            >
              Create Seller Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
