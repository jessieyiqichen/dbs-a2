"use client";
// The bar that stays at the top of every trail page: back to the hub, home to the index, and My list.
import { useEffect, useRef, useState } from "react";
import { CountBadge, PlateLink, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { ListPanel } from "./ListPanel";
import { useTrails } from "./state";
import { t14 } from "./type";

export function TopBar() {
  const { list } = useTrails();
  const [open, setOpen] = useState(false);
  // success: when a walk is added, My list glows sun for a moment, so the change is seen wherever the person clicked
  const [glow, setGlow] = useState(false);
  const before = useRef(list.length);
  useEffect(() => {
    const added = list.length > before.current;
    before.current = list.length;
    if (!added) return;
    setGlow(true);
    const t = setTimeout(() => setGlow(false), 1200);
    return () => clearTimeout(t);
  }, [list.length]);
  return (
    <div className="sticky top-0 z-30 border-b border-dw-ink/15 bg-dw-dawn-top">
      <div className={`${t14} mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5`}>
        <div className="flex items-baseline gap-5 sm:gap-6">
          <PlateLink href="/" size="note">← Hub</PlateLink>
          <PlateLink href="/trails/" size="name">Twelve Trails</PlateLink>
        </div>
        <span className={`inline-flex transition-shadow duration-[600ms] ${glow ? "shadow-[0_0_0_5px_var(--color-dw-sun)]" : "shadow-[0_0_0_0_var(--color-dw-sun)]"}`}>
        <SecondaryButton small aria-haspopup="dialog" aria-label={`My list, ${list.length} ${list.length === 1 ? "walk" : "walks"}`} onClick={() => setOpen(true)}>
          <span className="mr-2">My list</span>
          <CountBadge n={list.length} small />
        </SecondaryButton>
        </span>
        <span className="sr-only" aria-live="polite">{list.length} on your list</span>
      </div>
      <ListPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
