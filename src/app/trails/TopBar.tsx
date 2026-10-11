"use client";
// The bar that stays at the top of every trail page: back to the hub, home to the index, and the list count.
import Link from "next/link";
import { CountBadge } from "@/components/dawn/ds/Primitives";
import { focusRing } from "@/components/dawn/ds/tokens";
import { useTrails } from "./state";
import { t14, t24 } from "./type";

export function TopBar() {
  const { list } = useTrails();
  return (
    <div className="sticky top-0 z-30 border-b border-[#22333a]/15 bg-[#e6edeb]/95">
      <div className={`${t14} mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3`}>
        <div className="flex items-baseline gap-6">
          <Link href="/" className={`relative text-[#4f5f66] underline-offset-4 hover:text-[#22333a] hover:underline ${focusRing}`}>← Hub</Link>
          <Link href="/trails/" className={`${t24} relative hover:underline hover:decoration-[#8eaaa6] hover:underline-offset-4 ${focusRing}`}>Twelve Trails</Link>
        </div>
        <p className="flex items-center gap-2" aria-live="polite">
          <CountBadge n={list.length} />
          <span className="text-[#4f5f66]">on your list</span>
        </p>
      </div>
    </div>
  );
}
