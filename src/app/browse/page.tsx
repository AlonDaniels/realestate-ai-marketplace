"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/lib/data";

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
      <main className="bg-sand-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2">Browse Marketplace</h1>
            <p className="text-ink-500 text-lg">Discover AI tools built for real estate professionals</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-ink-900 text-white"
                    : "bg-white text-ink-700 border border-border hover:bg-sand-100"
                }`}
              >
                All Tools
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-ink-900 text-white"
                      : "bg-white text-ink-700 border border-border hover:bg-sand-100"
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border text-sm bg-white text-ink-700 focus:outline-none focus:border-primary"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Results count */}
          <p className="text-sm text-ink-500 mb-6">{sortedTools.length} tools found</p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {sortedTools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-ink-500 text-lg">No tools found in this category yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
