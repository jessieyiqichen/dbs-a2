"use client";
// One line of printed chips above the cards: where, how long, and no permit. The cards below change at once.
import { DW, focusRing } from "@/components/dawn/ds/tokens";
import { PlateChip, PlateToggle } from "@/components/dawn/ds/Interactive";
import { LENGTHS, NO_FILTERS, REGIONS, isFiltered, toggle, type Filters } from "./filters";
import { t12, t14 } from "./type";

const REGION_TINT = { Europe: DW.celadon, Asia: DW.aqua, Oceania: DW.loch, "The Americas": DW.stone } as const;
const LENGTH_TINT = { day: DW.aqua, days: DW.celadon, weeks: DW.stone } as const;

export function FilterBar({ f, setF, shown, total }: { f: Filters; setF: (f: Filters) => void; shown: number; total: number }) {
  return (
    <div className="mt-8 border-y border-[#22333a]/20 py-4">
      <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
        <div role="group" aria-label="Where" className="flex flex-wrap items-center gap-2">
          <span className={`${t12} mr-1 text-[#4f5f66]`} aria-hidden="true">Where</span>
          {REGIONS.map((r) => <PlateChip key={r} label={r} tint={REGION_TINT[r]} on={f.regions.includes(r)} onToggle={() => setF({ ...f, regions: toggle(f.regions, r) })} />)}
        </div>
        <div role="group" aria-label="How long" className="flex flex-wrap items-center gap-2">
          <span className={`${t12} mr-1 text-[#4f5f66]`} aria-hidden="true">How long</span>
          {LENGTHS.map((l) => <PlateChip key={l.key} label={l.label} tint={LENGTH_TINT[l.key]} on={f.lengths.includes(l.key)} onToggle={() => setF({ ...f, lengths: toggle(f.lengths, l.key) })} />)}
        </div>
        <PlateToggle label="No permit needed" checked={f.noPermit} onChange={(noPermit) => setF({ ...f, noPermit })} />
      </div>
      <p className={`${t14} mt-3 flex items-baseline gap-4 text-[#4f5f66]`} aria-live="polite">
        <span><span className="font-semibold text-[#22333a]">{shown}</span> of {total} walks</span>
        {isFiltered(f) && (
          <button type="button" onClick={() => setF(NO_FILTERS)} className={`relative underline decoration-[#8eaaa6] decoration-2 underline-offset-4 hover:text-[#22333a] hover:decoration-[#22333a] ${focusRing}`}>Clear all</button>
        )}
      </p>
    </div>
  );
}
