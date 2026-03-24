"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="bg-sand-50 min-h-screen flex items-center justify-center py-16">
        <div className="w-full max-w-md mx-4">
          <div className="bg-card-bg rounded-2xl border border-border p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-ink-900 mb-2">Welcome back</h1>
              <p className="text-ink-500 text-sm">Log in to your RE AI Market account</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full bg-primary text-white font-semibold py-3 rounded-full text-sm"
              >
                Log In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-ink-500">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
