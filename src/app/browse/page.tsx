"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/lib/data";
import { SlidersHorizontal } from "lucide-react";

export default function BrowsePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  const filteredTools = activeCategory === "all"
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === "popular") return b.installs - a.installs;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-2">Browse Marketplace</h1>
            <p className="text-text-secondary text-lg">Discover AI tools built for real estate professionals</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-primary text-white shadow-md"
                    : "glass-card text-text-secondary hover:text-text-primary"
                }`}
              >
                All Tools
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-primary text-white shadow-md"
                      : "glass-card text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-text-secondary" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border text-sm bg-white text-text-secondary focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-text-secondary mb-6">{sortedTools.length} tools found</p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {sortedTools.map((tool) => (
              <div key={tool.id} className="animate-fade-in-up">
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>

          {sortedTools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-secondary text-lg">No tools found in this category yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
