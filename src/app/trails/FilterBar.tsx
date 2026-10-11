"use client";
// One line of printed chips above the cards: where, how long, and no permit. The cards below change at once.
import { DW } from "@/components/dawn/ds/tokens";
import { SecondaryButton } from "@/components/dawn/ds/Primitives";
import { PlateChip, PlateToggle } from "@/components/dawn/ds/Interactive";
import { LENGTHS, NO_FILTERS, REGIONS, isFiltered, toggle, type Filters } from "./filters";
import { t12, t14 } from "./type";

const REGION_TINT = { Europe: DW.celadon, Asia: DW.aqua, Oceania: DW.loch, "The Americas": DW.stone } as const;
const LENGTH_TINT = { day: DW.aqua, days: DW.celadon, weeks: DW.stone } as const;

export function FilterBar({ f, setF, shown, total }: { f: Filters; setF: (f: Filters) => void; shown: number; total: number }) {
  return (
    <div className="mt-6 border-y border-[#22333a]/20 py-4 sm:mt-8">
      <div className="flex flex-wrap items-start gap-x-10 gap-y-4 sm:items-center">
        <div role="group" aria-label="Where" className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className={`${t12} text-[#4f5f66] sm:mr-1`} aria-hidden="true">Where</span>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => <PlateChip key={r} label={r} tint={REGION_TINT[r]} on={f.regions.includes(r)} onToggle={() => setF({ ...f, regions: toggle(f.regions, r) })} />)}
          </div>
        </div>
        <div role="group" aria-label="How long" className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className={`${t12} text-[#4f5f66] sm:mr-1`} aria-hidden="true">How long</span>
          <div className="flex flex-wrap gap-2">
            {LENGTHS.map((l) => <PlateChip key={l.key} label={l.label} tint={LENGTH_TINT[l.key]} on={f.lengths.includes(l.key)} onToggle={() => setF({ ...f, lengths: toggle(f.lengths, l.key) })} />)}
          </div>
        </div>
        <PlateToggle label="No permit needed" checked={f.noPermit} onChange={(noPermit) => setF({ ...f, noPermit })} />
      </div>
      <p className={`${t14} mt-3 flex min-h-9 items-center gap-4 text-[#4f5f66]`} aria-live="polite">
        <span><span className="font-semibold text-[#22333a]">{shown}</span> of {total} walks</span>
        {isFiltered(f) && (
          <SecondaryButton small onClick={() => setF(NO_FILTERS)}>Clear all</SecondaryButton>
        )}
      </p>
    </div>
  );
}
