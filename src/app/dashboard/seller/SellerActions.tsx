"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export default function SellerActions({
  stripeOnboarded,
  isSeller,
}: {
  stripeOnboarded: boolean;
  isSeller: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleConnectStripe() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/connect", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to start Stripe onboarding");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (stripeOnboarded) return null;

  return (
    <button
      onClick={handleConnectStripe}
      disabled={loading}
      className="btn-cta font-semibold px-6 py-3 rounded-full text-sm inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          {isSeller ? "Connect Stripe" : "Become a Seller"}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}
