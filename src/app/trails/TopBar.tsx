"use client";
// The bar that stays at the top of every trail page: back to the hub, home to the index, and My list.
import { useState } from "react";
import { CountBadge, PlateLink, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { ListPanel } from "./ListPanel";
import { useTrails } from "./state";
import { t14 } from "./type";

export function TopBar() {
  const { list } = useTrails();
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-30 border-b border-dw-ink/15 bg-dw-dawn-top">
      <div className={`${t14} mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5`}>
        <div className="flex items-baseline gap-5 sm:gap-6">
          <PlateLink href="/" size="note">← Hub</PlateLink>
          <PlateLink href="/trails/" size="name">Twelve Trails</PlateLink>
        </div>
        <SecondaryButton small aria-haspopup="dialog" aria-label={`My list, ${list.length} ${list.length === 1 ? "walk" : "walks"}`} onClick={() => setOpen(true)}>
          <span className="mr-2">My list</span>
          <CountBadge n={list.length} small />
        </SecondaryButton>
        <span className="sr-only" aria-live="polite">{list.length} on your list</span>
      </div>
      <ListPanel open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
