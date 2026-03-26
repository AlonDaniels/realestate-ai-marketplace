"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { categories } from "@/lib/data";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import type { Tool } from "@/lib/data";

interface DbTool {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  categoryLabel: string;
  installs: number;
  rating: number;
  tags: string[];
  seller: { id: string; firstName: string | null; lastName: string | null; avatarUrl: string | null; title: string | null };
}

function dbToolToCard(t: DbTool): Tool {
  return {
    id: t.slug,
    name: t.name,
    description: t.description,
    price: t.price / 100,
    category: t.category as Tool["category"],
    categoryLabel: t.categoryLabel,
    creator: {
      name: [t.seller.firstName, t.seller.lastName].filter(Boolean).join(" ") || "Unknown",
      avatar: t.seller.avatarUrl || "",
      title: t.seller.title || "",
    },
    installs: t.installs,
    rating: t.rating,
    image: "",
    tags: t.tags,
  };
}

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [dbTools, setDbTools] = useState<DbTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tools?limit=50&sort=${sortBy}${activeCategory !== "all" ? `&category=${activeCategory}` : ""}`)
      .then((r) => r.json())
      .then((data) => setDbTools(data.tools || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory, sortBy]);

  const displayTools = dbTools.map(dbToolToCard);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-2">Browse Marketplace</h1>
            <p className="text-text-secondary text-lg">Discover AI tools built for real estate professionals</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeCategory === "all" ? "bg-primary text-white shadow-md" : "glass-card text-text-secondary hover:text-text-primary"}`}
              >
                All Tools
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeCategory === cat.id ? "bg-primary text-white shadow-md" : "glass-card text-text-secondary hover:text-text-primary"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-text-secondary" />
              <select
                value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border text-sm bg-white text-text-secondary focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-text-secondary mb-6">{displayTools.length} tools found</p>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : displayTools.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary text-lg">No tools found yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {displayTools.map((tool) => (
                <div key={tool.id} className="animate-fade-in-up">
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
