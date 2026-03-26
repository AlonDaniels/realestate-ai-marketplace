import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-text-secondary">
      <Check className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
      {children}
    </li>
  );
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-14">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">Simple, Transparent Pricing</h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              For buyers, pay per tool. For sellers, keep 90% of every sale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Buyer - Free */}
            <div className="card-elevated rounded-2xl p-8">
              <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-widest font-heading">For Buyers</div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">Free to Browse</h2>
              <p className="text-text-secondary text-sm mb-6">Create an account and explore the marketplace at no cost.</p>
              <div className="mb-8">
                <span className="text-4xl font-heading font-bold text-text-primary">$0</span>
                <span className="text-text-secondary text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <CheckItem>Browse all tools</CheckItem>
                <CheckItem>Access free tools</CheckItem>
                <CheckItem>Read reviews & ratings</CheckItem>
                <CheckItem>Subscribe to paid tools monthly</CheckItem>
              </ul>
              <Link href="/signup" className="btn-secondary block text-center w-full font-semibold py-3 rounded-full cursor-pointer">
                Get Started
              </Link>
            </div>

            {/* Seller - Standard */}
            <div className="card-elevated rounded-2xl p-8 relative ring-2 ring-primary shadow-lg shadow-primary/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-cta text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-widest font-heading">For Sellers</div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">Creator</h2>
              <p className="text-text-secondary text-sm mb-6">List your AI tools and earn recurring revenue from subscribers.</p>
              <div className="mb-8">
                <span className="text-4xl font-heading font-bold text-text-primary">10%</span>
                <span className="text-text-secondary text-sm"> platform fee</span>
              </div>
              <ul className="space-y-3 mb-8">
                <CheckItem>Keep 90% of every sale</CheckItem>
                <CheckItem>Unlimited tool listings</CheckItem>
                <CheckItem>Creator profile page</CheckItem>
                <CheckItem>Analytics dashboard</CheckItem>
                <CheckItem>REST API access</CheckItem>
                <CheckItem>Monthly payouts</CheckItem>
              </ul>
              <Link href="/sell" className="btn-cta block text-center w-full font-semibold py-3 rounded-full cursor-pointer">
                Start Selling
              </Link>
            </div>

            {/* Enterprise */}
            <div className="card-elevated rounded-2xl p-8">
              <div className="text-sm font-semibold text-primary mb-2 uppercase tracking-widest font-heading">For Teams</div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">Enterprise</h2>
              <p className="text-text-secondary text-sm mb-6">Custom plans for brokerages and teams with 10+ agents.</p>
              <div className="mb-8">
                <span className="text-4xl font-heading font-bold text-text-primary">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <CheckItem>Volume discounts</CheckItem>
                <CheckItem>Team management</CheckItem>
                <CheckItem>Priority support</CheckItem>
                <CheckItem>Custom integrations</CheckItem>
                <CheckItem>Dedicated account manager</CheckItem>
              </ul>
              <Link href="/contact" className="btn-secondary block text-center w-full font-semibold py-3 rounded-full cursor-pointer">
                Contact Sales
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-20">
            <div className="flex items-center justify-center gap-2 mb-10">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h2 className="font-heading text-2xl font-bold text-text-primary">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "How does the MRR model work for sellers?",
                  a: "When a buyer subscribes to your tool, they pay a monthly fee. You keep 90% of every payment, minus Stripe processing fees (~2.9% + 30c). Payouts happen monthly to your connected bank account.",
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
                <div key={faq.q} className="card-elevated rounded-xl p-6">
                  <h3 className="font-heading font-semibold text-text-primary mb-2">{faq.q}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
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
