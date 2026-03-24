import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            The #1 Marketplace for Real Estate AI
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 leading-tight mb-6">
            The App Store for{" "}
            <span className="text-primary">Real Estate AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-ink-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Skip weeks of building from scratch. Get pre-built, battle-tested AI tools for lead generation, property analysis, marketing automation, and more.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/browse"
              className="btn-primary bg-primary text-white font-semibold px-8 py-3.5 rounded-full text-base w-full sm:w-auto"
            >
              Browse Marketplace
            </Link>
            <Link
              href="/sell"
              className="border-2 border-ink-900 text-ink-900 font-semibold px-8 py-3.5 rounded-full text-base hover:bg-ink-900 hover:text-white transition-colors w-full sm:w-auto"
            >
              Sell Your Tool
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 mt-14 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-ink-900">12+</div>
              <div className="text-sm text-ink-500 mt-1">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-ink-900">6</div>
              <div className="text-sm text-ink-500 mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-ink-900">27K+</div>
              <div className="text-sm text-ink-500 mt-1">Installs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-ink-900">4.7</div>
              <div className="text-sm text-ink-500 mt-1">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
