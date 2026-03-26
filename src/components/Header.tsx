"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Menu, X, Sparkles, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";

const ADMIN_EMAILS = ["alondaniels.b@gmail.com"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  const isAdmin = user?.emailAddresses?.some((e) => ADMIN_EMAILS.includes(e.emailAddress));

  const navLinks = [
    { href: "/browse", label: "Browse" },
    { href: "/sell", label: "Sell Your Tool" },
    { href: "/pricing", label: "Pricing" },
    { href: "/creators", label: "Creators" },
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors text-sm font-medium cursor-pointer relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-primary-light after:transition-all hover:after:w-full ${link.href === "/admin" ? "text-primary hover:text-cta inline-flex items-center gap-1" : "text-text-secondary hover:text-text-primary"}`}
              >
                {link.href === "/admin" && <ShieldCheck className="w-3.5 h-3.5" />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!user && (
              <>
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
              </>
            )}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 cursor-pointer"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || "U"}
                  </div>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-12 z-50 w-56 card-elevated rounded-xl shadow-lg p-2 animate-fade-in">
                      <div className="px-3 py-2 border-b border-border/50 mb-1">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-text-secondary truncate">
                          {user?.emailAddresses[0]?.emailAddress}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors cursor-pointer"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false); }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
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
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-text-secondary hover:text-text-primary text-sm font-medium py-2 cursor-pointer" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <hr className="border-border" />
              {!user && (
                <>
                  <Link href="/login" className="text-text-secondary text-sm font-medium py-2 cursor-pointer" onClick={() => setMobileOpen(false)}>Log In</Link>
                  <Link href="/signup" className="btn-cta text-sm font-semibold px-5 py-2.5 rounded-full text-center" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </>
              )}
              {user && (
                <>
                  <Link href="/dashboard" className="text-text-secondary text-sm font-medium py-2 cursor-pointer" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="text-red-600 text-sm font-medium py-2 cursor-pointer text-left">
                    Sign Out
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
