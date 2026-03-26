"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Sparkles } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-xl font-semibold text-text-primary tracking-wide">
              RE AI Market
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/browse", label: "Browse" },
              { href: "/sell", label: "Sell Your Tool" },
              { href: "/pricing", label: "Pricing" },
              { href: "/creators", label: "Creators" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium cursor-pointer relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-primary-light after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-4 py-2 cursor-pointer"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="btn-cta text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 cursor-pointer text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4 animate-fade-in">
            <nav className="flex flex-col gap-3">
              {[
                { href: "/browse", label: "Browse" },
                { href: "/sell", label: "Sell Your Tool" },
                { href: "/pricing", label: "Pricing" },
                { href: "/creators", label: "Creators" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-text-secondary hover:text-text-primary text-sm font-medium py-2 cursor-pointer">
                  {link.label}
                </Link>
              ))}
              <hr className="border-border" />
              <Link href="/login" className="text-text-secondary text-sm font-medium py-2 cursor-pointer">Log In</Link>
              <Link href="/signup" className="btn-cta text-sm font-semibold px-5 py-2.5 rounded-full text-center">Sign Up</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
