"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Loader2, Upload, X, FileText } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { id: "ai-agent", label: "AI Agent" },
  { id: "automation", label: "Automation" },
  { id: "analytics", label: "Analytics" },
  { id: "marketing", label: "Marketing" },
  { id: "lead-gen", label: "Lead Generation" },
  { id: "property-mgmt", label: "Property Mgmt" },
];

const ALLOWED_EXTENSIONS = ".zip,.pdf,.json,.md,.xlsx,.csv";
const MAX_SIZE_MB = 4.5;

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function NewToolPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    pricingModel: "SUBSCRIPTION" as "ONE_TIME" | "SUBSCRIPTION",
    category: "ai-agent",
    tags: "",
    packageUrl: "",
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      return;
    }
    setError("");
    setFile(selected);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let blobUrl: string | undefined;
      let fileName: string | undefined;

      if (file) {
        setUploadProgress("Uploading file...");
        const fd = new FormData();
        fd.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          setError(uploadData.error || "File upload failed");
          return;
        }
        blobUrl = uploadData.url;
        fileName = uploadData.fileName;
        setUploadProgress("");
      }

      const priceInCents = form.price === "" || form.price === "0" ? 0 : Math.round(parseFloat(form.price) * 100);
      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          longDescription: form.longDescription || undefined,
          price: priceInCents,
          pricingModel: form.pricingModel,
          category: form.category,
          tags,
          packageUrl: form.packageUrl || undefined,
          blobUrl,
          fileName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create tool");
        return;
      }

      router.push("/dashboard/seller");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/dashboard/seller"
            className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary text-sm mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </Link>

          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Submit New Tool</h1>
          <p className="text-text-secondary mb-8">
            Fill out the details below. Your tool will be reviewed before going live.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Tool Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text" required minLength={3} maxLength={100}
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. LeadFlow AI"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required minLength={20} maxLength={500} rows={3}
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="A brief description of what your tool does (20-500 chars)"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface resize-none"
              />
              <p className="text-xs text-text-secondary mt-1">{form.description.length}/500</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Long Description</label>
              <textarea
                maxLength={5000} rows={6}
                value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                placeholder="Detailed description, features, use cases, setup instructions..."
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary bg-surface cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Price ($){form.pricingModel === "SUBSCRIPTION" ? "/month" : ""}
                </label>
                <input
                  type="number" min="0" max="999" step="1"
                  value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0 = Free"
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Pricing Model</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, pricingModel: "SUBSCRIPTION" })}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                    form.pricingModel === "SUBSCRIPTION"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface text-text-secondary hover:border-primary/40"
                  }`}
                >
                  Monthly Subscription
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, pricingModel: "ONE_TIME" })}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                    form.pricingModel === "ONE_TIME"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface text-text-secondary hover:border-primary/40"
                  }`}
                >
                  One-Time Purchase
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Product File</label>
              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_EXTENSIONS}
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/30 bg-primary/5">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{file.name}</p>
                    <p className="text-xs text-text-secondary">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    className="text-text-secondary hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-8 rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-surface text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-6 h-6 text-text-secondary/60 mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">Click to upload your product file</p>
                  <p className="text-xs text-text-secondary/60 mt-1">ZIP, PDF, JSON, MD, XLSX, CSV — max {MAX_SIZE_MB}MB</p>
                </button>
              )}
              {uploadProgress && (
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> {uploadProgress}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Access URL</label>
              <input
                type="url" value={form.packageUrl} onChange={(e) => setForm({ ...form, packageUrl: e.target.value })}
                placeholder="https://app.example.com — for SaaS tools (optional)"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
              />
              <p className="text-xs text-text-secondary mt-1">If your tool is a web app, enter the URL here</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Tags</label>
              <input
                type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="lead-gen, automation, crm (comma separated)"
                className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="btn-cta w-full font-semibold py-3.5 rounded-full text-base cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> {uploadProgress || "Submitting..."}</>
              ) : (
                <><Upload className="w-4 h-4" /> Submit for Review</>
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
