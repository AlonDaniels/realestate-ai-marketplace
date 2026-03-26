"use client";

import { Mail } from "lucide-react";

export default function NewsletterForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="relative flex-1">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/50" />
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full pl-10 pr-4 py-3 rounded-full border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
        />
      </div>
      <button
        type="submit"
        className="btn-cta font-semibold px-6 py-3 rounded-full text-sm"
      >
        Subscribe
      </button>
    </form>
  );
}
