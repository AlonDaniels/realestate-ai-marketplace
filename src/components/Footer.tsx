"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RE</span>
              </div>
              <span className="font-bold text-xl">RE AI Market</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The marketplace for AI-powered real estate tools. Buy, sell, and scale your business with AI.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-gray-300">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</Link></li>
              <li><Link href="/creators" className="text-gray-400 hover:text-white text-sm transition-colors">Creators</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-white text-sm transition-colors">Support</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-gray-300">Categories</h3>
            <ul className="space-y-2.5">
              <li><Link href="/browse?cat=ai-agent" className="text-gray-400 hover:text-white text-sm transition-colors">AI Agents</Link></li>
              <li><Link href="/browse?cat=automation" className="text-gray-400 hover:text-white text-sm transition-colors">Automation</Link></li>
              <li><Link href="/browse?cat=analytics" className="text-gray-400 hover:text-white text-sm transition-colors">Analytics</Link></li>
              <li><Link href="/browse?cat=marketing" className="text-gray-400 hover:text-white text-sm transition-colors">Marketing</Link></li>
              <li><Link href="/browse?cat=lead-gen" className="text-gray-400 hover:text-white text-sm transition-colors">Lead Generation</Link></li>
              <li><Link href="/browse?cat=property-mgmt" className="text-gray-400 hover:text-white text-sm transition-colors">Property Mgmt</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-gray-300">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">One AI real estate tip, every morning. Free, no spam.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} RE AI Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
