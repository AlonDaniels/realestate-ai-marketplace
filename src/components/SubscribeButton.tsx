"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2, Shield, ExternalLink, CheckCircle } from "lucide-react";

export default function SubscribeButton({
  toolId,
  price,
  pricingModel,
  isSubscribed,
  packageUrl,
}: {
  toolId: string;
  price: number;
  pricingModel?: string;
  isSubscribed?: boolean;
  packageUrl?: string | null;
}) {
  const isOneTime = pricingModel === "ONE_TIME";
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId }),
      });
      const data = await res.json();

      if (data.free && data.success) {
        window.location.reload();
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to start checkout");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (isSubscribed) {
    return (
      <div>
        <div className="flex items-center gap-2 text-primary mb-3 justify-center">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-semibold">Subscribed</span>
        </div>
        {packageUrl ? (
          <a
            href={packageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full font-semibold py-3.5 rounded-full text-base mb-3 cursor-pointer inline-flex items-center justify-center gap-2"
          >
            Access Tool <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <div className="w-full text-center font-semibold py-3.5 rounded-full text-base mb-3 bg-primary/10 text-primary">
            Access Coming Soon
          </div>
        )}
        <p className="text-xs text-text-secondary text-center">
          {price === 0 ? "Free plan — no charges" : isOneTime ? "Lifetime access — one-time purchase" : "Your subscription is active"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="btn-cta w-full font-semibold py-3.5 rounded-full text-base mb-3 cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {price === 0 ? "Getting..." : "Redirecting..."}
          </>
        ) : price === 0 ? (
          "Get It Free"
        ) : isOneTime ? (
          "Buy Now"
        ) : (
          "Subscribe Now"
        )}
      </button>
      <p className="text-xs text-text-secondary text-center flex items-center justify-center gap-1">
        <Shield className="w-3 h-3" />
        {price === 0 ? "No credit card required" : isOneTime ? "One-time payment. Lifetime access." : "Cancel anytime. 7-day free trial."}
      </p>
    </div>
  );
}
