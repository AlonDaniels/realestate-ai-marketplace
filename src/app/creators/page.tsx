import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreatorCard from "@/components/CreatorCard";
import { featuredCreators } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export default function CreatorsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">Our Creators</h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Meet the builders creating AI tools that power the future of real estate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 stagger-children">
            {featuredCreators.map((creator) => (
              <div key={creator.id} className="animate-fade-in-up">
                <CreatorCard creator={creator} />
              </div>
            ))}
          </div>

          {/* Become a Creator CTA */}
          <div className="card-elevated rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">Become a Creator</h2>
            <p className="text-text-secondary mb-6">
              Have an AI tool for real estate? Join our marketplace and start earning recurring revenue.
            </p>
            <Link
              href="/sell"
              className="btn-cta inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-full cursor-pointer"
            >
              Start Selling <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
