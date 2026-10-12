"use client";
// One line of printed chips above the cards: where, how long, and no permit. The cards below change at once.
import { DW } from "@/components/dawn/ds/tokens";
import { CatalogueSearch, PrimaryButton, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { SidePanel } from "@/components/dawn/ds/Viewer";
import { useState } from "react";
import { PLACES } from "@/data/stops";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { PlateChip, PlateToggle } from "@/components/dawn/ds/Interactive";
import { hikes } from "@/data/hikes";
import { LENGTHS, NO_FILTERS, REGIONS, choose, counts, isFiltered, type Filters } from "./filters";
import { t12, t14, t48 } from "./type";

const REGION_TINT = { Europe: DW.pine, Asia: DW.sky, Oceania: DW.lake, "The Americas": DW.heather } as const;
const LENGTH_TINT = { day: DW.sky, few: DW.pine, week: DW.heather, month: DW.lake } as const;
const LENGTH_KEYS = LENGTHS.map((l) => l.key);

/** The choices themselves: where, how long, no permit. Inline on wide screens; in a side panel on a phone, where
 *  they wrap instead of sliding. Each group starts on All; picking every option, or All, goes back to All. */
function Choices({ f, setF, idPrefix, inPanel = false }: { f: Filters; setF: (f: Filters) => void; idPrefix: string; inPanel?: boolean }) {
  const c = counts(hikes, f, PLACES);
  const row = "flex flex-wrap gap-2";
  const group = inPanel ? "flex flex-col gap-2" : "flex flex-row items-center gap-2";
  return (
    <div className={inPanel ? "space-y-6" : "flex flex-wrap items-center gap-x-10 gap-y-4"}>
      <div role="group" aria-label="Where" id={`${idPrefix}-where`} className={group}>
        <span className={`${t12} mr-1 inline-flex items-center gap-1.5 text-dw-muted`} aria-hidden="true"><PlateIcon name="compass" size={22} />Where</span>
        <div className={row}>
          <PlateChip label="All" tint={DW.sun} on={f.regions.length === 0} onToggle={() => setF({ ...f, regions: [] })} />
          {REGIONS.map((r) => <PlateChip key={r} label={r} count={c.regions[r]} tint={REGION_TINT[r]} on={f.regions.includes(r)} onToggle={() => setF({ ...f, regions: choose(f.regions, r, REGIONS) })} />)}
        </div>
      </div>
      <div role="group" aria-label="How long" className={group}>
        <span className={`${t12} mr-1 inline-flex items-center gap-1.5 text-dw-muted`} aria-hidden="true"><PlateIcon name="clock" size={22} />How long</span>
        <div className={row}>
          <PlateChip label="All" tint={DW.sun} on={f.lengths.length === 0} onToggle={() => setF({ ...f, lengths: [] })} />
          {LENGTHS.map((l) => <PlateChip key={l.key} label={l.label} count={c.lengths[l.key]} tint={LENGTH_TINT[l.key]} on={f.lengths.includes(l.key)} onToggle={() => setF({ ...f, lengths: choose(f.lengths, l.key, LENGTH_KEYS) })} />)}
        </div>
      </div>
      <PlateToggle label="No permit needed" icon={<PlateIcon name="permit" size={22} />} checked={f.noPermit} onChange={(noPermit) => setF({ ...f, noPermit })} />
    </div>
  );
}

/** Search always in view. Wide screens show the choices inline; a phone shows a Filters button (with how many groups
 *  are narrowed) that opens them in a side panel, so the first walks stay on the first screen. */
export function FilterBar({ f, setF, shown, total }: { f: Filters; setF: (f: Filters) => void; shown: number; total: number }) {
  const [open, setOpen] = useState(false);
  const active = (f.regions.length ? 1 : 0) + (f.lengths.length ? 1 : 0) + (f.noPermit ? 1 : 0);
  const result = (
    <span><span className="font-semibold text-dw-ink">{shown}</span> of {total} walks</span>
  );
  return (
    <div className="mt-4 border-y border-dw-ink/20 py-3 sm:mt-8 sm:py-4">
      <div className="mb-3 max-w-md sm:mb-4">
        <CatalogueSearch id="walk-search" label="Search the walks" placeholder="a walk, a country, a place on the way" value={f.query} onChange={(query) => setF({ ...f, query })} />
      </div>
      <div className="hidden sm:block"><Choices f={f} setF={setF} idPrefix="inline" /></div>
      <p className={`${t14} mt-2 flex min-h-9 flex-wrap items-center gap-x-4 gap-y-2 text-dw-muted sm:mt-3`} aria-live="polite">
        <span className="sm:hidden">
          <SecondaryButton small selected={active > 0} aria-haspopup="dialog" onClick={() => setOpen(true)}>
            Filters{active > 0 && <span className="ml-1.5">{active}</span>}
          </SecondaryButton>
        </span>
        {result}
        {isFiltered(f) && <SecondaryButton small onClick={() => setF(NO_FILTERS)}>Clear all</SecondaryButton>}
      </p>
      <SidePanel open={open} onClose={() => setOpen(false)} titleId="filters-title" title={<h2 id="filters-title" className={t48}>Filters</h2>}>
        <div className="mt-6"><Choices f={f} setF={setF} idPrefix="panel" inPanel /></div>
        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-dw-ink/20 pt-5 [&>button:first-child]:flex-1 [&>button:first-child]:justify-center">
          <PrimaryButton onClick={() => setOpen(false)}>{shown === 0 ? "No walks fit" : `Show ${shown} ${shown === 1 ? "walk" : "walks"}`}</PrimaryButton>
          {isFiltered(f) && <SecondaryButton onClick={() => setF({ ...NO_FILTERS, query: f.query })}>Clear</SecondaryButton>}
        </div>
      </SidePanel>
    </div>
  );
}
