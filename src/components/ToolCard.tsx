import Link from "next/link";
import { Star, Download } from "lucide-react";
import type { Tool } from "@/lib/data";
import { categoryIcons } from "@/lib/icons";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tool/${tool.id}`} className="block cursor-pointer">
      <div className="card-elevated rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Image area */}
        <div className="aspect-[16/10] bg-gradient-to-br from-surface to-primary-light/10 flex items-center justify-center relative">
          <div className="text-primary/60">
            {categoryIcons[tool.category]}
          </div>
          {/* Price badge */}
          <div className="absolute top-3 right-3 glass-card rounded-full px-3 py-1.5 text-sm font-semibold">
            {tool.price === 0 ? (
              <span className="text-primary">Free</span>
            ) : (
              <span className="text-text-primary">${tool.price}<span className="text-text-secondary text-xs font-normal">{tool.pricingModel === "ONE_TIME" ? "" : "/mo"}</span></span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category tag */}
          <span className="text-xs font-semibold text-primary bg-primary/8 rounded-full px-3 py-1 self-start mb-3 tracking-wide uppercase">
            {tool.categoryLabel}
          </span>

          <h3 className="font-heading font-semibold text-text-primary text-base mb-2 line-clamp-1">{tool.name}</h3>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4 flex-1">{tool.description}</p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-xs font-semibold text-white">
                {tool.creator.name.charAt(0)}
              </div>
              <span className="text-xs text-text-secondary font-medium">{tool.creator.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {tool.rating}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                {tool.installs.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
