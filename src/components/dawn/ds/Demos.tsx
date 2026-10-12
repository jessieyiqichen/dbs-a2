"use client";
// Live examples for the design-system page: the walk card with its list button, and a toggling primary button.
import { useState } from "react";
import type { TrailPhoto } from "../Toned";
import { PrintCard } from "./Pieces";
import { CatalogueSearch, ListMark, PrimaryButton, SecondaryButton } from "./Primitives";
import { CatalogueRow } from "./Pieces";
import { SidePanel } from "./Viewer";

export function CardDemo({ id, photo }: { id: string; photo: TrailPhoto }) {
  const [on, setOn] = useState(false);
  return (
    <PrintCard
      id={id}
      photo={photo}
      mark={<ListMark selected={on} onClick={() => setOn(!on)} aria-label="Milford Track: on my list" />}
      footer={<SecondaryButton small selected={on} onClick={() => setOn(!on)}>{on ? "On my list" : "+ My list"}</SecondaryButton>}
    />
  );
}

export function AddToListDemo() {
  const [on, setOn] = useState(false);
  return <PrimaryButton selected={on} onClick={() => setOn(!on)}>{on ? "On your list" : "Add to my list"}</PrimaryButton>;
}

export function SidePanelDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SecondaryButton small aria-haspopup="dialog" onClick={() => setOpen(true)}>Open the side panel</SecondaryButton>
      <SidePanel open={open} onClose={() => setOpen(false)} titleId="ds-panel-title" title={<p id="ds-panel-title" className="font-[family-name:var(--dw-display)] text-[32px] leading-[1.1] sm:text-[48px]">My list</p>}>
        <ul className="mt-4 border-t border-dw-ink/20">
          {["milford", "tongariro"].map((id) => (
            <li key={id} className="flex items-center gap-2">
              <div className="min-w-0 flex-1"><CatalogueRow id={id} href="#panel" /></div>
              <SecondaryButton small>Remove</SecondaryButton>
            </li>
          ))}
        </ul>
      </SidePanel>
    </>
  );
}

export function SearchDemo() {
  const [q, setQ] = useState("Namche");
  return <CatalogueSearch id="dw-search-live" value={q} onChange={setQ} placeholder="a walk, a country, a place on the way" />;
}
