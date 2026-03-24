"use client";

export default function NewsletterForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-full border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="submit"
        className="btn-primary bg-primary text-white font-medium px-6 py-3 rounded-full text-sm"
      >
        Subscribe
      </button>
    </form>
  );
}
