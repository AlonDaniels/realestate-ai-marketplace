"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
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
              <h1 className="font-heading text-2xl font-bold text-text-primary mb-2">Welcome back</h1>
              <p className="text-text-secondary text-sm">Log in to your RE AI Market account</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                />
              </div>
              <button
                type="submit"
                className="btn-cta w-full font-semibold py-3 rounded-full text-sm cursor-pointer"
              >
                Log In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary font-semibold hover:underline cursor-pointer">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
