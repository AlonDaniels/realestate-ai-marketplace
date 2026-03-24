"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RE</span>
            </div>
            <span className="font-bold text-xl text-ink-900">RE AI Market</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/browse" className="text-ink-700 hover:text-ink-900 transition-colors text-sm font-medium">
              Browse
            </Link>
            <Link href="/sell" className="text-ink-700 hover:text-ink-900 transition-colors text-sm font-medium">
              Sell Your Tool
            </Link>
            <Link href="/pricing" className="text-ink-700 hover:text-ink-900 transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="/creators" className="text-ink-700 hover:text-ink-900 transition-colors text-sm font-medium">
              Creators
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-ink-700 hover:text-ink-900 transition-colors px-4 py-2"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="btn-primary bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              <Link href="/browse" className="text-ink-700 hover:text-ink-900 text-sm font-medium py-1">Browse</Link>
              <Link href="/sell" className="text-ink-700 hover:text-ink-900 text-sm font-medium py-1">Sell Your Tool</Link>
              <Link href="/pricing" className="text-ink-700 hover:text-ink-900 text-sm font-medium py-1">Pricing</Link>
              <Link href="/creators" className="text-ink-700 hover:text-ink-900 text-sm font-medium py-1">Creators</Link>
              <hr className="border-border" />
              <Link href="/login" className="text-ink-700 text-sm font-medium py-1">Log In</Link>
              <Link href="/signup" className="btn-primary bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full text-center">Sign Up</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
