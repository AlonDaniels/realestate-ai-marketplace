import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="bg-sand-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-ink-500 text-lg max-w-2xl mx-auto">
              For buyers, pay per tool. For sellers, keep 90% of every sale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Buyer - Free */}
            <div className="bg-card-bg rounded-2xl border border-border p-8">
              <div className="text-sm font-medium text-primary mb-2">FOR BUYERS</div>
              <h2 className="text-2xl font-bold text-ink-900 mb-2">Free to Browse</h2>
              <p className="text-ink-500 text-sm mb-6">Create an account and explore the marketplace at no cost.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-ink-900">$0</span>
                <span className="text-ink-500 text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Browse all tools
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Access free tools
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Read reviews & ratings
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Subscribe to paid tools monthly
                </li>
              </ul>
              <Link href="/signup" className="block text-center w-full border-2 border-ink-900 text-ink-900 font-semibold py-3 rounded-full hover:bg-ink-900 hover:text-white transition-colors">
                Get Started
              </Link>
            </div>

            {/* Seller - Standard */}
            <div className="bg-card-bg rounded-2xl border-2 border-primary p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="text-sm font-medium text-primary mb-2">FOR SELLERS</div>
              <h2 className="text-2xl font-bold text-ink-900 mb-2">Creator</h2>
              <p className="text-ink-500 text-sm mb-6">List your AI tools and earn recurring revenue from subscribers.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-ink-900">10%</span>
                <span className="text-ink-500 text-sm"> platform fee</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Keep 90% of every sale
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited tool listings
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Creator profile page
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Analytics dashboard
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  REST API access
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Monthly payouts
                </li>
              </ul>
              <Link href="/sell" className="btn-primary block text-center w-full bg-primary text-white font-semibold py-3 rounded-full">
                Start Selling
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-card-bg rounded-2xl border border-border p-8">
              <div className="text-sm font-medium text-primary mb-2">FOR TEAMS</div>
              <h2 className="text-2xl font-bold text-ink-900 mb-2">Enterprise</h2>
              <p className="text-ink-500 text-sm mb-6">Custom plans for brokerages and teams with 10+ agents.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-ink-900">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Volume discounts
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Team management
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom integrations
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-700">
                  <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dedicated account manager
                </li>
              </ul>
              <Link href="/contact" className="block text-center w-full border-2 border-ink-900 text-ink-900 font-semibold py-3 rounded-full hover:bg-ink-900 hover:text-white transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl font-bold text-ink-900 text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "How does the MRR model work for sellers?",
                  a: "When a buyer subscribes to your tool, they pay a monthly fee. You keep 90% of every payment, minus Stripe processing fees (~2.9% + 30¢). Payouts happen monthly to your connected bank account.",
                },
                {
                  q: "Can I list free tools?",
                  a: "Absolutely! Free tools are great for building your audience and credibility. Many creators offer a free tool alongside premium offerings.",
                },
                {
                  q: "What happens if a subscriber cancels?",
                  a: "The subscriber retains access until the end of their billing period. You keep all earnings from completed billing cycles.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No setup fees for sellers. Create your account, list your tools, and start earning. The only cost is the 10% platform fee on sales.",
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-card-bg rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-ink-900 mb-2">{faq.q}</h3>
                  <p className="text-ink-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
