"use client";
// Twelve Trails, in the Dawn style: search, filter and sort the catalogue, open a trail, keep a list for this visit.
import { useMemo, useState } from "react";
import Link from "next/link";
import { DATA_AS_OF, hikes } from "@/data/hikes";
import rawPhotos from "@/data/trailPhotos.json";
import type { TrailPhoto } from "@/components/dawn/Toned";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { PlateChip, PlateToggle } from "@/components/dawn/ds/Interactive";
import { CatalogueSearch, CountBadge, MountSelect, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { DW, caps, display, ui } from "@/components/dawn/ds/tokens";
import { LENGTHS, NO_FILTERS, REGIONS, SORTS, applyFilters, isFiltered, toggle, type Filters, type Sort } from "./filters";
import { TrailCard } from "./TrailCard";
import { TrailDialog } from "./TrailDialog";

const photos = rawPhotos as Record<string, TrailPhoto[]>;
const coverOf = (id: string) => photos[id].find((p) => p.cover) ?? photos[id][0];
const numberOf = (id: string) => hikes.findIndex((h) => h.id === id) + 1;
const REGION_TINT = { Europe: DW.celadon, Asia: DW.aqua, Oceania: DW.loch, "The Americas": DW.stone } as const;
const LENGTH_TINT = { day: DW.aqua, days: DW.celadon, weeks: DW.stone } as const;

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2.5">
      <span className={`${caps} w-20 shrink-0 text-[#4f5f66]`}>{label}</span>
      {children}
    </div>
  );
}

function EmptyDrawer({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 bg-[#f6f9f7] px-5 py-14 text-center">
      <span className="grid h-20 w-28 place-items-center border-[1.5px] border-dashed border-[#4f5f66]"><PlateIcon name="camera" size={36} /></span>
      <p className={`${display} text-2xl`}>No prints in this drawer</p>
      <p className={`${ui} max-w-sm text-sm text-[#4f5f66]`}>No trail matches all of these at once. Take a filter off, or clear them all.</p>
      <SecondaryButton onClick={onClear}>Clear filters</SecondaryButton>
    </div>
  );
}

export default function TrailsApp() {
  const [f, setF] = useState<Filters>(NO_FILTERS);
  const [openId, setOpenId] = useState<string | null>(null);
  const [list, setList] = useState<string[]>([]);
  const shown = useMemo(() => applyFilters(hikes, f), [f]);
  const open = hikes.find((h) => h.id === openId) ?? null;
  const set = (patch: Partial<Filters>) => setF((cur) => ({ ...cur, ...patch }));

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-8">
      <div className={`${ui} flex items-center justify-between gap-4 text-sm`}>
        <Link href="/" className="text-[#4f5f66] underline-offset-4 hover:text-[#22333a] hover:underline">← Hub</Link>
        <p className="flex items-center gap-2" aria-live="polite">
          <CountBadge n={list.length} />
          <span className="text-[#4f5f66]">on your list</span>
        </p>
      </div>

      <header className="mt-10 max-w-3xl">
        <p className={`${caps} text-[#4f5f66]`}>A guide to twelve famous walks</p>
        <h1 className={`${display} mt-2 text-6xl leading-none sm:text-8xl`}>Twelve Trails</h1>
        <p className={`${display} mt-4 text-xl italic text-[#4f5f66] sm:text-2xl`}>Set out like a box of old travel prints: open one, look closely, take your time.</p>
      </header>

      <section aria-label="Find a trail" className="mt-10 space-y-4 bg-[#f6f9f7] p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_15rem]">
          <CatalogueSearch id="trail-search" value={f.query} onChange={(query) => set({ query })} placeholder="a trail, a country, a place on the way…" />
          <MountSelect id="trail-sort" label="Order" options={SORTS.map((s) => ({ value: s.key, label: s.label }))} value={f.sort} onChange={(v) => set({ sort: v as Sort })} />
        </div>
        <Group label="Where">
          {REGIONS.map((r) => <PlateChip key={r} label={r} tint={REGION_TINT[r]} on={f.regions.includes(r)} onToggle={() => set({ regions: toggle(f.regions, r) })} />)}
        </Group>
        <Group label="How long">
          {LENGTHS.map((l) => <PlateChip key={l.key} label={l.label} tint={LENGTH_TINT[l.key]} on={f.lengths.includes(l.key)} onToggle={() => set({ lengths: toggle(f.lengths, l.key) })} />)}
        </Group>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#22333a]/15 pt-4">
          <PlateToggle label="No permit needed" checked={f.noPermit} onChange={(noPermit) => set({ noPermit })} />
          <p className={`${ui} flex items-center gap-4 text-sm text-[#4f5f66]`} aria-live="polite">
            <span>Showing <span className="font-semibold text-[#22333a]">{shown.length}</span> of {hikes.length}</span>
            {isFiltered(f) && (
              <button type="button" onClick={() => setF({ ...NO_FILTERS, sort: f.sort })} className="relative underline decoration-[#8eaaa6] decoration-2 underline-offset-4 hover:text-[#22333a] hover:decoration-[#22333a] dw-crop focus-visible:outline-none">
                Clear all
              </button>
            )}
          </p>
        </div>
      </section>

      <section aria-label="Trails" className="mt-8">
        {shown.length === 0 ? (
          <EmptyDrawer onClear={() => setF({ ...NO_FILTERS, sort: f.sort })} />
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((h) => (
              <li key={h.id}>
                <TrailCard h={h} n={numberOf(h.id)} cover={coverOf(h.id)} inList={list.includes(h.id)} onOpen={() => setOpenId(h.id)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <TrailDialog
        h={open}
        n={open ? numberOf(open.id) : 0}
        photos={open ? photos[open.id] : []}
        inList={!!open && list.includes(open.id)}
        onToggleList={() => open && setList((cur) => toggle(cur, open.id))}
        onClose={() => setOpenId(null)}
      />

      <footer className={`${ui} mt-16 border-t border-[#22333a]/20 pt-6 text-sm text-[#4f5f66]`}>
        <p>
          Facts checked against official park, trail and tourism sources in {DATA_AS_OF}; where sources disagree, both numbers are shown. Each trail lists its sources.
          Your list lasts for this visit only: nothing is stored.
        </p>
        <p className="mt-2">
          Photochrom prints: Library of Congress, Photochrom Print Collection (no known restrictions). Other photographs: Unsplash (Unsplash License), toned to sit with the prints.
        </p>
        <details className="mt-3">
          <summary className="cursor-pointer text-[#22333a] underline decoration-[#8eaaa6] underline-offset-4">Every photograph and its credit</summary>
          <ul className="mt-2 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {hikes.flatMap((h) => photos[h.id].map((p) => (
              <li key={p.file}>
                {h.name}: <a href={p.source} target="_blank" rel="noreferrer" className="underline decoration-[#8eaaa6] underline-offset-2 hover:decoration-[#22333a]">{p.place}</a>, {p.kind === "photochrom" ? `${p.author}, ${p.date}` : `${p.author} / Unsplash`}
              </li>
            )))}
          </ul>
        </details>
      </footer>
    </div>
  );
}
