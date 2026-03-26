import { Layers } from "lucide-react";
import type { Creator } from "@/lib/data";

export default function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div className="card-elevated rounded-2xl p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto mb-4 shadow-md">
        <span className="text-2xl font-heading font-bold text-white">{creator.name.charAt(0)}</span>
      </div>
      <h3 className="font-heading font-semibold text-text-primary text-base">{creator.name}</h3>
      <p className="text-xs text-primary font-semibold mt-1 uppercase tracking-wide">{creator.title}</p>
      <p className="text-sm text-text-secondary mt-3 leading-relaxed line-clamp-2">{creator.bio}</p>
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-center gap-1.5">
        <Layers className="w-3.5 h-3.5 text-text-secondary" />
        <span className="text-xs text-text-secondary font-medium">{creator.listingCount} listings</span>
      </div>
    </div>
  );
}
