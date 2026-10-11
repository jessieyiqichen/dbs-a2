"use client";
// The bar that stays at the top of every trail page: back to the hub, home to the index, and the list count.
import { CountBadge, PlateLink } from "@/components/dawn/ds/Primitives";
import { useTrails } from "./state";
import { t14 } from "./type";

export function TopBar() {
  const { list } = useTrails();
  return (
    <div className="sticky top-0 z-30 border-b border-[#22333a]/15 bg-[#e6edeb]/95">
      <div className={`${t14} mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3`}>
        <div className="flex items-baseline gap-6">
          <PlateLink href="/" size="note">← Hub</PlateLink>
          <PlateLink href="/trails/" size="name">Twelve Trails</PlateLink>
        </div>
        <p className="flex items-center gap-2" aria-live="polite">
          <CountBadge n={list.length} />
          <span className="text-[#4f5f66]">on your list</span>
        </p>
      </div>
    </div>
  );
}
