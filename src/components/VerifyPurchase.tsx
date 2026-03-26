"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";

export default function VerifyPurchase() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"verifying" | "success" | "error" | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    setStatus("verifying");

    fetch("/api/stripe/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          // Reload after a short delay so the page reflects the subscription
          setTimeout(() => {
            window.location.href = window.location.pathname;
          }, 1500);
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (!sessionId || !status) return null;

  return (
    <div className="mb-6">
      {status === "verifying" && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
          <span className="text-sm text-primary font-medium">Confirming your purchase...</span>
        </div>
      )}
      {status === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700 font-medium">Purchase confirmed! Loading your access...</span>
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <span className="text-sm text-red-700">Could not verify purchase. Please refresh or contact support.</span>
        </div>
      )}
    </div>
  );
}
