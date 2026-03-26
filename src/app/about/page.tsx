import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Sparkles, Users, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-14">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">About RE AI Market</h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              We&apos;re building the #1 marketplace for AI-powered real estate tools — connecting builders with agents who need them.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed space-y-6 mb-16">
            <p>
              Real estate professionals waste countless hours on repetitive tasks — lead qualification, market reports, listing descriptions, follow-ups. AI can handle all of it, but most agents don&apos;t have the time or technical skills to build custom solutions.
            </p>
            <p>
              That&apos;s where RE AI Market comes in. We connect AI tool builders with real estate professionals who need ready-made solutions. Buyers get instant access to battle-tested tools. Sellers earn recurring revenue from their expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: <Users className="w-7 h-7" />, title: "Built for Agents", desc: "Every tool on our platform is designed specifically for real estate workflows." },
              { icon: <Shield className="w-7 h-7" />, title: "Quality Reviewed", desc: "Every submission is reviewed for quality, security, and real estate relevance." },
              { icon: <Zap className="w-7 h-7" />, title: "Fair for Creators", desc: "Sellers keep 90% of every sale. No hidden fees, no lock-in." },
            ].map((item) => (
              <div key={item.title} className="card-elevated rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">{item.icon}</div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
