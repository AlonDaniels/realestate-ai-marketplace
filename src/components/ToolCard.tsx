import Link from "next/link";
import type { Tool } from "@/lib/data";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tool/${tool.id}`} className="card-hover block">
      <div className="bg-card-bg rounded-2xl border border-border overflow-hidden h-full flex flex-col">
        {/* Image placeholder */}
        <div className="aspect-[16/10] bg-sand-100 flex items-center justify-center relative">
          <div className="text-5xl">
            {tool.category === "ai-agent" && "🤖"}
            {tool.category === "automation" && "⚡"}
            {tool.category === "analytics" && "📊"}
            {tool.category === "marketing" && "📣"}
            {tool.category === "lead-gen" && "🎯"}
            {tool.category === "property-mgmt" && "🏠"}
          </div>
          {/* Price badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
            {tool.price === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span className="text-ink-900">${tool.price}/mo</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category tag */}
          <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1 self-start mb-3">
            {tool.categoryLabel}
          </span>

          <h3 className="font-semibold text-ink-900 text-base mb-2 line-clamp-1">{tool.name}</h3>
          <p className="text-ink-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">{tool.description}</p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-sand-100 flex items-center justify-center text-xs font-medium">
                {tool.creator.name.charAt(0)}
              </div>
              <span className="text-xs text-ink-500">{tool.creator.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-ink-500">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {tool.rating}
              </span>
              <span>{tool.installs.toLocaleString()} installs</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
