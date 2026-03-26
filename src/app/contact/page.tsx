"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-4xl font-bold text-text-primary mb-3">Contact Us</h1>
            <p className="text-text-secondary text-lg">
              Have a question about enterprise plans, partnerships, or anything else? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="card-elevated rounded-2xl p-8">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-text-primary mb-1.5">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary bg-surface cursor-pointer">
                  <option>Enterprise pricing</option>
                  <option>Partnership inquiry</option>
                  <option>Technical support</option>
                  <option>General question</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface resize-none"
                />
              </div>
              <button
                type="submit"
                className="btn-cta w-full font-semibold py-3.5 rounded-full text-base cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
