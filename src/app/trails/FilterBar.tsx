"use client";
// One line of printed chips above the cards: where, how long, and no permit. The cards below change at once.
import { DW } from "@/components/dawn/ds/tokens";
import { CatalogueSearch, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { PLACES } from "@/data/stops";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { PlateChip, PlateToggle } from "@/components/dawn/ds/Interactive";
import { hikes } from "@/data/hikes";
import { LENGTHS, NO_FILTERS, REGIONS, choose, counts, isFiltered, type Filters } from "./filters";
import { t12, t14 } from "./type";

const REGION_TINT = { Europe: DW.pine, Asia: DW.sky, Oceania: DW.lake, "The Americas": DW.heather } as const;
const LENGTH_TINT = { day: DW.sky, few: DW.pine, week: DW.heather, month: DW.lake } as const;
const LENGTH_KEYS = LENGTHS.map((l) => l.key);

/** Each group starts on All. Picking options narrows it; picking every option, or All, goes back to All. */
export function FilterBar({ f, setF, shown, total }: { f: Filters; setF: (f: Filters) => void; shown: number; total: number }) {
  const c = counts(hikes, f, PLACES);
  return (
    <div className="mt-4 border-y border-dw-ink/20 py-3 sm:mt-8 sm:py-4">
      <div className="mb-3 max-w-md sm:mb-4">
        <CatalogueSearch id="walk-search" label="Search the walks" placeholder="a walk, a country, a place on the way" value={f.query} onChange={(query) => setF({ ...f, query })} />
      </div>
      <div className="flex flex-wrap items-start gap-x-10 gap-y-3 sm:items-center sm:gap-y-4">
        <div role="group" aria-label="Where" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <span className={`${t12} inline-flex items-center gap-1.5 text-dw-muted sm:mr-1`} aria-hidden="true"><PlateIcon name="compass" size={22} />Where</span>
          <div className="-mx-5 -my-2 flex gap-2 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:m-0 sm:flex-wrap sm:overflow-visible sm:p-0">
            <PlateChip label="All" tint={DW.sun} on={f.regions.length === 0} onToggle={() => setF({ ...f, regions: [] })} />
            {REGIONS.map((r) => <PlateChip key={r} label={r} count={c.regions[r]} tint={REGION_TINT[r]} on={f.regions.includes(r)} onToggle={() => setF({ ...f, regions: choose(f.regions, r, REGIONS) })} />)}
          </div>
        </div>
        <div role="group" aria-label="How long" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <span className={`${t12} inline-flex items-center gap-1.5 text-dw-muted sm:mr-1`} aria-hidden="true"><PlateIcon name="clock" size={22} />How long</span>
          <div className="-mx-5 -my-2 flex gap-2 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:m-0 sm:flex-wrap sm:overflow-visible sm:p-0">
            <PlateChip label="All" tint={DW.sun} on={f.lengths.length === 0} onToggle={() => setF({ ...f, lengths: [] })} />
            {LENGTHS.map((l) => <PlateChip key={l.key} label={l.label} count={c.lengths[l.key]} tint={LENGTH_TINT[l.key]} on={f.lengths.includes(l.key)} onToggle={() => setF({ ...f, lengths: choose(f.lengths, l.key, LENGTH_KEYS) })} />)}
          </div>
        </div>
        <PlateToggle label="No permit needed" icon={<PlateIcon name="permit" size={22} />} checked={f.noPermit} onChange={(noPermit) => setF({ ...f, noPermit })} />
      </div>
      <p className={`${t14} mt-2 flex min-h-9 items-center gap-4 text-dw-muted sm:mt-3`} aria-live="polite">
        <span><span className="font-semibold text-dw-ink">{shown}</span> of {total} walks</span>
        {isFiltered(f) && (
          <SecondaryButton small onClick={() => setF(NO_FILTERS)}>Clear all</SecondaryButton>
        )}
      </p>
    </div>
  );
}
