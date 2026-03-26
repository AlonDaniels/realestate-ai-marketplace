import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import SellerActions from "./SellerActions";
import { Package, DollarSign, Download, Star, Plus, AlertCircle } from "lucide-react";

export default async function SellerDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/login");

  const isSeller = user.role === "SELLER" || user.role === "ADMIN";

  const tools = isSeller
    ? await db.tool.findMany({
        where: { sellerId: user.id },
        include: {
          _count: { select: { subscriptions: true, reviews: true } },
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const totalInstalls = tools.reduce((sum, t) => sum + t.installs, 0);
  const totalRevenue = 0; // Will come from Stripe later

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
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-heading text-3xl font-bold text-text-primary">Seller Dashboard</h1>
              <p className="text-text-secondary mt-1">
                {isSeller ? "Manage your tools and earnings" : "Start selling AI tools"}
              </p>
            </div>
            {isSeller && (
              <Link
                href="/dashboard/seller/new"
                className="btn-cta font-semibold px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Tool
              </Link>
            )}
          </div>

          {/* Not a seller yet */}
          {!isSeller && (
            <div className="card-elevated rounded-2xl p-10 text-center max-w-2xl mx-auto">
              <Package className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">Become a Seller</h2>
              <p className="text-text-secondary mb-4">
                List your AI tools on the marketplace and earn recurring revenue. Keep 90% of every sale.
              </p>
              <p className="text-text-secondary text-sm mb-6">
                You&apos;ll need to connect a Stripe account to receive payouts.
              </p>
              <SellerActions stripeOnboarded={false} isSeller={false} />
            </div>
          )}

          {/* Seller content */}
          {isSeller && (
            <>
              {/* Stripe Connect status */}
              {!user.stripeOnboarded && (
                <div className="card-elevated rounded-2xl p-6 mb-8 border-l-4 border-amber-400">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Connect Stripe to receive payments</h3>
                      <p className="text-text-secondary text-sm mb-3">
                        You need to complete Stripe onboarding before your paid tools can accept subscriptions.
                      </p>
                      <SellerActions stripeOnboarded={false} isSeller={true} />
                    </div>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
                <div className="card-elevated rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-primary" />
                    <span className="text-sm text-text-secondary font-medium">Tools</span>
                  </div>
                  <p className="text-3xl font-heading font-bold text-text-primary">{tools.length}</p>
                </div>
                <div className="card-elevated rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Download className="w-5 h-5 text-primary" />
                    <span className="text-sm text-text-secondary font-medium">Total Installs</span>
                  </div>
                  <p className="text-3xl font-heading font-bold text-text-primary">{totalInstalls}</p>
                </div>
                <div className="card-elevated rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className="text-sm text-text-secondary font-medium">Revenue</span>
                  </div>
                  <p className="text-3xl font-heading font-bold text-text-primary">${(totalRevenue / 100).toFixed(0)}</p>
                </div>
                <div className="card-elevated rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span className="text-sm text-text-secondary font-medium">Avg Rating</span>
                  </div>
                  <p className="text-3xl font-heading font-bold text-text-primary">
                    {tools.length > 0
                      ? (tools.reduce((s, t) => s + t.rating, 0) / tools.length).toFixed(1)
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Tools list */}
              <h2 className="font-heading text-xl font-semibold text-text-primary mb-4">Your Tools</h2>

              {tools.length === 0 ? (
                <div className="card-elevated rounded-2xl p-10 text-center">
                  <Package className="w-10 h-10 text-text-secondary/40 mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">No tools yet</h3>
                  <p className="text-text-secondary mb-6">Create your first AI tool listing to start earning.</p>
                  <Link
                    href="/dashboard/seller/new"
                    className="btn-cta inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-sm"
                  >
                    <Plus className="w-4 h-4" /> Create Tool
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {tools.map((tool) => (
                    <div key={tool.id} className="card-elevated rounded-2xl p-6 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-heading font-semibold text-text-primary">{tool.name}</h3>
                          <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${statusColors[tool.status]}`}>
                            {tool.status.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {tool.price === 0 ? "Free" : `$${tool.price / 100}/mo`} &middot;{" "}
                          {tool._count.subscriptions} subscribers &middot;{" "}
                          {tool.installs} installs
                        </p>
                      </div>
                      <Link
                        href={`/dashboard/seller/edit/${tool.id}`}
                        className="text-sm text-primary font-medium hover:underline cursor-pointer"
                      >
                        Edit
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
