import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Package, Star, ArrowRight, Store } from "lucide-react";

export default async function BuyerDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect("/login");

  const subscriptions = await db.subscription.findMany({
    where: { buyerId: user.id, status: "ACTIVE" },
    include: {
      tool: {
        include: {
          seller: { select: { firstName: true, lastName: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-heading text-3xl font-bold text-text-primary">My Dashboard</h1>
              <p className="text-text-secondary mt-1">
                Welcome back, {user.firstName || user.email.split("@")[0]}
              </p>
            </div>
            <Link
              href="/dashboard/seller"
              className="btn-secondary font-semibold px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2"
            >
              <Store className="w-4 h-4" />
              Become a Seller
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="card-elevated rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary font-medium">Active Subscriptions</span>
              </div>
              <p className="text-3xl font-heading font-bold text-text-primary">{subscriptions.length}</p>
            </div>
            <div className="card-elevated rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary font-medium">Reviews Written</span>
              </div>
              <p className="text-3xl font-heading font-bold text-text-primary">0</p>
            </div>
            <div className="card-elevated rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-text-secondary font-medium">Account Type</span>
              </div>
              <p className="text-lg font-heading font-bold text-primary capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>

          {/* Subscriptions */}
          <h2 className="font-heading text-xl font-semibold text-text-primary mb-4">My Tools</h2>

          {subscriptions.length === 0 ? (
            <div className="card-elevated rounded-2xl p-10 text-center">
              <Package className="w-10 h-10 text-text-secondary/40 mx-auto mb-4" />
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">No subscriptions yet</h3>
              <p className="text-text-secondary mb-6">Browse the marketplace to find AI tools for your business.</p>
              <Link
                href="/browse"
                className="btn-cta inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full text-sm"
              >
                Browse Marketplace <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="card-elevated rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary">{sub.tool.name}</h3>
                    <p className="text-sm text-text-secondary">
                      by {sub.tool.seller.firstName} {sub.tool.seller.lastName} &middot;{" "}
                      {sub.tool.price === 0 ? "Free" : `$${sub.tool.price / 100}/mo`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-primary bg-primary/8 rounded-full px-3 py-1 uppercase">
                      {sub.status}
                    </span>
                    <Link
                      href={`/tool/${sub.tool.slug}`}
                      className="text-sm text-primary font-medium hover:underline cursor-pointer"
                    >
                      View
                    </Link>
                  </div>
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
