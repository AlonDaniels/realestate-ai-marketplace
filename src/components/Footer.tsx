"use client";

import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-semibold">RE AI Market</span>
            </div>
            <p className="text-teal-200/70 text-sm leading-relaxed">
              The marketplace for AI-powered real estate tools. Buy, sell, and scale your business with AI.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-sm mb-4 uppercase tracking-widest text-teal-200/60">Company</h3>
            <ul className="space-y-2.5">
              {["About", "Creators", "Pricing", "Support", "Terms"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-teal-200/70 hover:text-white text-sm transition-colors cursor-pointer">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-sm mb-4 uppercase tracking-widest text-teal-200/60">Categories</h3>
            <ul className="space-y-2.5">
              {[
                { label: "AI Agents", cat: "ai-agent" },
                { label: "Automation", cat: "automation" },
                { label: "Analytics", cat: "analytics" },
                { label: "Marketing", cat: "marketing" },
                { label: "Lead Generation", cat: "lead-gen" },
                { label: "Property Mgmt", cat: "property-mgmt" },
              ].map((item) => (
                <li key={item.cat}>
                  <Link href={`/browse?cat=${item.cat}`} className="text-teal-200/70 hover:text-white text-sm transition-colors cursor-pointer">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-sm mb-4 uppercase tracking-widest text-teal-200/60">Stay Updated</h3>
            <p className="text-teal-200/70 text-sm mb-4">One AI real estate tip, every morning. Free, no spam.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-200/40" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder:text-teal-200/40 focus:outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light/30"
                />
              </div>
              <button
                type="submit"
                className="btn-cta px-4 py-2.5 text-sm font-medium rounded-lg"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-teal-200/40 text-sm">&copy; {new Date().getFullYear()} RE AI Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
