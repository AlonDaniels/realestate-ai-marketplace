import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreatorCard from "@/components/CreatorCard";
import { featuredCreators } from "@/lib/data";
import Link from "next/link";

export default function CreatorsPage() {
  return (
    <>
      <Header />
      <main className="bg-sand-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 mb-4">Our Creators</h1>
            <p className="text-ink-500 text-lg max-w-2xl mx-auto">
              Meet the builders creating AI tools that power the future of real estate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {featuredCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>

          {/* Become a Creator CTA */}
          <div className="bg-card-bg rounded-2xl border border-border p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-ink-900 mb-3">Become a Creator</h2>
            <p className="text-ink-500 mb-6">
              Have an AI tool for real estate? Join our marketplace and start earning recurring revenue.
            </p>
            <Link
              href="/sell"
              className="btn-primary inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
