"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles, ShoppingBag, Store } from "lucide-react";

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-16">
        <div className="w-full max-w-md mx-4">
          <div className="card-elevated rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="font-heading text-2xl font-bold text-text-primary mb-2">Create your account</h1>
              <p className="text-text-secondary text-sm">Join the #1 marketplace for real estate AI tools</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">First name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">Last name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">I want to</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3.5 rounded-xl border border-border cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                    <input type="radio" name="role" value="buyer" defaultChecked className="text-primary accent-[var(--primary)]" />
                    <ShoppingBag className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-primary font-medium">Buy tools</span>
                  </label>
                  <label className="flex items-center gap-2 p-3.5 rounded-xl border border-border cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                    <input type="radio" name="role" value="seller" className="text-primary accent-[var(--primary)]" />
                    <Store className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-primary font-medium">Sell tools</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn-cta w-full font-semibold py-3 rounded-full text-sm cursor-pointer"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline cursor-pointer">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
