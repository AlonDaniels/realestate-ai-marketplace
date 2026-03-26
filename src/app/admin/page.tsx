"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Users, Package, DollarSign, Download, Star, TrendingUp, Clock, Plus, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

interface Stats {
  users: { total: number; buyers: number; sellers: number };
  tools: { total: number; published: number; inReview: number };
  subscriptions: { total: number; active: number };
  installs: number;
  avgRating: number;
  revenue: { grossMRR: number; platformMRR: number; sellerMRR: number };
  recentUsers: { id: string; email: string; firstName: string | null; lastName: string | null; role: string; createdAt: string }[];
  recentTools: { id: string; name: string; slug: string; status: string; price: number; category: string; createdAt: string; seller: { firstName: string | null; lastName: string | null; email: string } }[];
}

interface ToolItem {
  id: string;
  name: string;
  slug: string;
  status: string;
  price: number;
  category: string;
  featured: boolean;
  installs: number;
  rating: number;
  createdAt: string;
  seller: { id: string; firstName: string | null; lastName: string | null; email: string };
  _count: { subscriptions: number; reviews: number };
}

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats").then((r) => r.json()),
      fetch("/api/admin/tools").then((r) => r.json()),
    ])
      .then(([statsData, toolsData]) => {
        if (statsData.error) {
          setError(statsData.error);
          return;
        }
        setStats(statsData);
        setTools(toolsData.tools || []);
      })
      .catch(() => setError("Failed to load admin data"))
      .finally(() => setLoading(false));
  }, []);

  async function toggleStatus(toolId: string, currentStatus: string) {
    const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setActionLoading(toolId);
    const res = await fetch(`/api/admin/tools/${toolId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setTools((prev) =>
        prev.map((t) => (t.id === toolId ? { ...t, status: newStatus } : t))
      );
    }
    setActionLoading(null);
  }

  async function toggleFeatured(toolId: string, currentFeatured: boolean) {
    setActionLoading(toolId);
    const res = await fetch(`/api/admin/tools/${toolId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !currentFeatured }),
    });
    if (res.ok) {
      setTools((prev) =>
        prev.map((t) => (t.id === toolId ? { ...t, featured: !currentFeatured } : t))
      );
    }
    setActionLoading(null);
  }

  async function deleteTool(toolId: string) {
    if (!confirm("Are you sure you want to delete this tool?")) return;
    setActionLoading(toolId);
    const res = await fetch(`/api/admin/tools/${toolId}`, { method: "DELETE" });
    if (res.ok) {
      setTools((prev) => prev.filter((t) => t.id !== toolId));
    }
    setActionLoading(null);
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-2">{error}</p>
            <p className="text-text-secondary text-sm">You must be an admin to access this page.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const statusColors: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-600",
    IN_REVIEW: "bg-amber-100 text-amber-700",
    PUBLISHED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    SUSPENDED: "bg-red-100 text-red-700",
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-heading text-3xl font-bold text-text-primary">Admin Dashboard</h1>
              <p className="text-text-secondary mt-1">Platform overview and management</p>
            </div>
            <Link
              href="/admin/add"
              className="btn-cta font-semibold px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Product
            </Link>
          </div>

          {stats && (
            <>
              {/* Revenue Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="card-elevated rounded-2xl p-6 border-l-4 border-green-400">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-text-secondary font-medium">Gross MRR</span>
                  </div>
                  <p className="text-3xl font-heading font-bold text-text-primary">${stats.revenue.grossMRR.toFixed(0)}</p>
                </div>
                <div className="card-elevated rounded-2xl p-6 border-l-4 border-primary">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm text-text-secondary font-medium">Your Cut (10%)</span>
                  </div>
                  <p className="text-3xl font-heading font-bold text-primary">${stats.revenue.platformMRR.toFixed(0)}</p>
                </div>
                <div className="card-elevated rounded-2xl p-6 border-l-4 border-cta">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-cta" />
                    <span className="text-sm text-text-secondary font-medium">Seller Payouts</span>
                  </div>
                  <p className="text-3xl font-heading font-bold text-text-primary">${stats.revenue.sellerMRR.toFixed(0)}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
                {[
                  { icon: <Users className="w-5 h-5" />, label: "Total Users", value: stats.users.total },
                  { icon: <Users className="w-5 h-5" />, label: "Buyers", value: stats.users.buyers },
                  { icon: <Users className="w-5 h-5" />, label: "Sellers", value: stats.users.sellers },
                  { icon: <Package className="w-5 h-5" />, label: "Published", value: stats.tools.published },
                  { icon: <Download className="w-5 h-5" />, label: "Installs", value: stats.installs },
                  { icon: <Star className="w-5 h-5" />, label: "Active Subs", value: stats.subscriptions.active },
                ].map((stat) => (
                  <div key={stat.label} className="card-elevated rounded-xl p-4">
                    <div className="text-primary mb-1">{stat.icon}</div>
                    <p className="text-2xl font-heading font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-secondary">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Users */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Recent Users
                  </h2>
                  <div className="card-elevated rounded-2xl divide-y divide-border/50">
                    {stats.recentUsers.map((u) => (
                      <div key={u.id} className="px-5 py-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {u.firstName} {u.lastName || u.email}
                          </p>
                          <p className="text-xs text-text-secondary">{u.email}</p>
                        </div>
                        <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${u.role === "ADMIN" ? "bg-purple-100 text-purple-700" : u.role === "SELLER" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                          {u.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Pending Review
                  </h2>
                  {stats.tools.inReview === 0 ? (
                    <div className="card-elevated rounded-2xl p-6 text-center">
                      <p className="text-text-secondary text-sm">No tools pending review</p>
                    </div>
                  ) : (
                    <div className="card-elevated rounded-2xl divide-y divide-border/50">
                      {stats.recentTools
                        .filter((t) => t.status === "IN_REVIEW")
                        .map((t) => (
                          <div key={t.id} className="px-5 py-3 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-text-primary">{t.name}</p>
                              <p className="text-xs text-text-secondary">by {t.seller.email}</p>
                            </div>
                            <span className="text-xs font-semibold rounded-full px-2.5 py-0.5 bg-amber-100 text-amber-700">
                              IN REVIEW
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* All Tools Management */}
          <h2 className="font-heading text-xl font-semibold text-text-primary mb-4">All Products</h2>

          {tools.length === 0 ? (
            <div className="card-elevated rounded-2xl p-10 text-center">
              <Package className="w-10 h-10 text-text-secondary/40 mx-auto mb-4" />
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">No products yet</h3>
              <p className="text-text-secondary mb-6">Add your first product to the marketplace.</p>
              <Link
                href="/admin/add"
                className="btn-cta inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-sm"
              >
                <Plus className="w-4 h-4" /> Add Product
              </Link>
            </div>
          ) : (
            <div className="card-elevated rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-surface/50">
                      <th className="text-left px-5 py-3 font-semibold text-text-primary">Name</th>
                      <th className="text-left px-5 py-3 font-semibold text-text-primary">Category</th>
                      <th className="text-left px-5 py-3 font-semibold text-text-primary">Price</th>
                      <th className="text-left px-5 py-3 font-semibold text-text-primary">Status</th>
                      <th className="text-left px-5 py-3 font-semibold text-text-primary">Subs</th>
                      <th className="text-left px-5 py-3 font-semibold text-text-primary">Installs</th>
                      <th className="text-right px-5 py-3 font-semibold text-text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {tools.map((tool) => (
                      <tr key={tool.id} className="hover:bg-surface/30">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            {tool.featured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                            <span className="font-medium text-text-primary">{tool.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-text-secondary">{tool.category}</td>
                        <td className="px-5 py-3 text-text-secondary">{tool.price === 0 ? "Free" : `$${tool.price / 100}/mo`}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${statusColors[tool.status]}`}>
                            {tool.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-text-secondary">{tool._count.subscriptions}</td>
                        <td className="px-5 py-3 text-text-secondary">{tool.installs}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toggleStatus(tool.id, tool.status)}
                              disabled={actionLoading === tool.id}
                              className="p-1.5 rounded-lg hover:bg-surface transition-colors cursor-pointer"
                              title={tool.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                            >
                              {tool.status === "PUBLISHED" ? <EyeOff className="w-4 h-4 text-text-secondary" /> : <Eye className="w-4 h-4 text-green-600" />}
                            </button>
                            <button
                              onClick={() => toggleFeatured(tool.id, tool.featured)}
                              disabled={actionLoading === tool.id}
                              className="p-1.5 rounded-lg hover:bg-surface transition-colors cursor-pointer"
                              title={tool.featured ? "Unfeature" : "Feature"}
                            >
                              <Star className={`w-4 h-4 ${tool.featured ? "text-amber-500 fill-amber-500" : "text-text-secondary"}`} />
                            </button>
                            <button
                              onClick={() => deleteTool(tool.id)}
                              disabled={actionLoading === tool.id}
                              className="p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
