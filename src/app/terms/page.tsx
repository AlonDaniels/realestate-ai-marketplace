import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-heading text-4xl font-bold text-text-primary mb-8">Terms of Service</h1>

          <div className="prose max-w-none text-text-secondary leading-relaxed space-y-6">
            <p className="text-sm text-text-secondary">Last updated: March 2026</p>

            <h2 className="font-heading text-xl font-semibold text-text-primary">1. Acceptance of Terms</h2>
            <p>By accessing or using RE AI Market, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform.</p>

            <h2 className="font-heading text-xl font-semibold text-text-primary">2. Platform Description</h2>
            <p>RE AI Market is a marketplace connecting AI tool creators with real estate professionals. We facilitate transactions between buyers and sellers but do not create the tools listed on the platform.</p>

            <h2 className="font-heading text-xl font-semibold text-text-primary">3. User Accounts</h2>
            <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials.</p>

            <h2 className="font-heading text-xl font-semibold text-text-primary">4. Buyers</h2>
            <p>Subscriptions are billed monthly. You may cancel at any time, and access continues until the end of your billing period. Refunds are handled on a case-by-case basis.</p>

            <h2 className="font-heading text-xl font-semibold text-text-primary">5. Sellers</h2>
            <p>Sellers retain 90% of subscription revenue, minus payment processing fees. All tools are subject to review. We reserve the right to remove tools that violate our guidelines.</p>

            <h2 className="font-heading text-xl font-semibold text-text-primary">6. Prohibited Conduct</h2>
            <p>You may not use the platform to distribute malware, violate intellectual property rights, or engage in fraudulent activity.</p>

            <h2 className="font-heading text-xl font-semibold text-text-primary">7. Limitation of Liability</h2>
            <p>RE AI Market is provided &quot;as is&quot; without warranties. We are not liable for damages arising from the use of third-party tools listed on the platform.</p>

            <h2 className="font-heading text-xl font-semibold text-text-primary">8. Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use of the platform after changes constitutes acceptance.</p>

            <h2 className="font-heading text-xl font-semibold text-text-primary">9. Contact</h2>
            <p>Questions about these terms? Contact us at support@reaimarket.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
