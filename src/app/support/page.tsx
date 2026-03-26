import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { HelpCircle, Mail, MessageSquare, Book } from "lucide-react";

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-14">
            <HelpCircle className="w-8 h-8 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-4xl font-bold text-text-primary mb-4">Support</h1>
            <p className="text-text-secondary text-lg">Need help? We&apos;ve got you covered.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <Mail className="w-7 h-7" />, title: "Email Us", desc: "Get a response within 24 hours.", action: "support@reaimarket.com", href: "mailto:support@reaimarket.com" },
              { icon: <MessageSquare className="w-7 h-7" />, title: "Contact Form", desc: "Send us a detailed message.", action: "Go to contact", href: "/contact" },
              { icon: <Book className="w-7 h-7" />, title: "FAQ", desc: "Find answers to common questions.", action: "View pricing FAQ", href: "/pricing#faq" },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="card-elevated rounded-2xl p-6 text-center cursor-pointer block">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">{item.icon}</div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary mb-3">{item.desc}</p>
                <span className="text-sm text-primary font-medium">{item.action}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
