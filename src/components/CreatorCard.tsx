import type { Creator } from "@/lib/data";

export default function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div className="card-hover bg-card-bg rounded-2xl border border-border p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl font-bold text-primary">{creator.name.charAt(0)}</span>
      </div>
      <h3 className="font-semibold text-ink-900 text-base">{creator.name}</h3>
      <p className="text-xs text-primary font-medium mt-1">{creator.title}</p>
      <p className="text-sm text-ink-500 mt-3 leading-relaxed line-clamp-2">{creator.bio}</p>
      <div className="mt-4 pt-4 border-t border-border">
        <span className="text-xs text-ink-500">{creator.listingCount} listings</span>
      </div>
    </div>
  );
}
