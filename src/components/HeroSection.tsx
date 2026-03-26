import Link from "next/link";
import { ArrowRight, Package, Grid3X3, Download, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-primary-light/5 to-surface" />
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-light/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-card text-primary text-sm font-semibold rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
            The #1 Marketplace for Real Estate AI
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6 animate-fade-in-up">
            The App Store for{" "}
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              Real Estate AI
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            Skip weeks of building from scratch. Get pre-built, battle-tested AI tools for lead generation, property analysis, marketing automation, and more.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Link
              href="/browse"
              className="btn-cta font-semibold px-8 py-3.5 rounded-full text-base w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              Browse Marketplace
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sell"
              className="btn-secondary font-semibold px-8 py-3.5 rounded-full text-base w-full sm:w-auto"
            >
              Sell Your Tool
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-primary/10">
            {[
              { icon: <Package className="w-5 h-5 text-primary-light" />, value: "12+", label: "AI Tools" },
              { icon: <Grid3X3 className="w-5 h-5 text-primary-light" />, value: "6", label: "Categories" },
              { icon: <Download className="w-5 h-5 text-primary-light" />, value: "27K+", label: "Installs" },
              { icon: <Star className="w-5 h-5 text-primary-light" />, value: "4.7", label: "Avg Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-1">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">{stat.value}</div>
                <div className="text-sm text-text-secondary mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
