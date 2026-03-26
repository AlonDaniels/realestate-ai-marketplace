"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { id: "ai-agent", label: "AI Agent" },
  { id: "automation", label: "Automation" },
  { id: "analytics", label: "Analytics" },
  { id: "marketing", label: "Marketing" },
  { id: "lead-gen", label: "Lead Generation" },
  { id: "property-mgmt", label: "Property Mgmt" },
];

export default function AdminAddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    pricingModel: "SUBSCRIPTION" as "ONE_TIME" | "SUBSCRIPTION",
    category: "ai-agent",
    tags: "",
    packageUrl: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const priceInCents = form.price === "" || form.price === "0" ? 0 : Math.round(parseFloat(form.price) * 100);
      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

      const res = await fetch("/api/admin/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          longDescription: form.longDescription || undefined,
          price: priceInCents,
          pricingModel: form.pricingModel,
          category: form.category,
          tags,
          packageUrl: form.packageUrl || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create product");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/admin" className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm mb-6 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to admin
          </Link>

          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Add Product</h1>
          <p className="text-text-secondary mb-8">This product will be published immediately.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4 mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text" required minLength={3} maxLength={100}
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. LeadFlow AI"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required minLength={20} maxLength={500} rows={3}
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description (20-500 chars)"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface resize-none"
              />
              <p className="text-xs text-text-secondary mt-1">{form.description.length}/500</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Long Description</label>
              <textarea
                maxLength={5000} rows={6}
                value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                placeholder="Detailed description, features, use cases..."
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary bg-surface cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Price ($){form.pricingModel === "SUBSCRIPTION" ? "/month" : ""}
                </label>
                <input
                  type="number" min="0" max="999" step="1"
                  value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0 = Free"
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Pricing Model</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, pricingModel: "SUBSCRIPTION" })}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                    form.pricingModel === "SUBSCRIPTION"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface text-text-secondary hover:border-primary/40"
                  }`}
                >
                  Monthly Subscription
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, pricingModel: "ONE_TIME" })}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                    form.pricingModel === "ONE_TIME"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface text-text-secondary hover:border-primary/40"
                  }`}
                >
                  One-Time Purchase
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Access URL</label>
              <input
                type="url" value={form.packageUrl} onChange={(e) => setForm({ ...form, packageUrl: e.target.value })}
                placeholder="https://app.example.com — where users go after subscribing"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
              />
              <p className="text-xs text-text-secondary mt-1">The URL subscribers will get access to</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Tags</label>
              <input
                type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="lead-gen, automation, crm (comma separated)"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="btn-cta w-full font-semibold py-3.5 rounded-full text-base cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</> : <><Plus className="w-4 h-4" /> Publish Product</>}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
