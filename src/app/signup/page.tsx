"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="bg-sand-50 min-h-screen flex items-center justify-center py-16">
        <div className="w-full max-w-md mx-4">
          <div className="bg-card-bg rounded-2xl border border-border p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-ink-900 mb-2">Create your account</h1>
              <p className="text-ink-500 text-sm">Join the #1 marketplace for real estate AI tools</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">First name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Last name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
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
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-3">I want to</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="role" value="buyer" defaultChecked className="text-primary" />
                    <span className="text-sm text-ink-700">Buy tools</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="role" value="seller" className="text-primary" />
                    <span className="text-sm text-ink-700">Sell tools</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary w-full bg-primary text-white font-semibold py-3 rounded-full text-sm"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-ink-500">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
