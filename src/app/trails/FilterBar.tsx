"use client";
// One line of printed chips above the cards: where, how long, and no permit. The cards below change at once.
import { DW } from "@/components/dawn/ds/tokens";
import { SecondaryButton } from "@/components/dawn/ds/Primitives";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { PlateChip, PlateToggle } from "@/components/dawn/ds/Interactive";
import { LENGTHS, NO_FILTERS, REGIONS, isFiltered, toggle, type Filters } from "./filters";
import { t12, t14 } from "./type";

const REGION_TINT = { Europe: DW.celadon, Asia: DW.aqua, Oceania: DW.loch, "The Americas": DW.stone } as const;
const LENGTH_TINT = { day: DW.aqua, days: DW.celadon, weeks: DW.stone } as const;

export function FilterBar({ f, setF, shown, total }: { f: Filters; setF: (f: Filters) => void; shown: number; total: number }) {
  return (
    <div className="mt-4 border-y border-dw-ink/20 py-3 sm:mt-8 sm:py-4">
      <div className="flex flex-wrap items-start gap-x-10 gap-y-3 sm:items-center sm:gap-y-4">
        <div role="group" aria-label="Where" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <span className={`${t12} inline-flex items-center gap-1.5 text-dw-muted sm:mr-1`} aria-hidden="true"><PlateIcon name="compass" size={22} />Where</span>
          <div className="-mx-5 -my-2 flex gap-2 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:m-0 sm:flex-wrap sm:overflow-visible sm:p-0">
            {REGIONS.map((r) => <PlateChip key={r} label={r} tint={REGION_TINT[r]} on={f.regions.includes(r)} onToggle={() => setF({ ...f, regions: toggle(f.regions, r) })} />)}
          </div>
        </div>
        <div role="group" aria-label="How long" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <span className={`${t12} inline-flex items-center gap-1.5 text-dw-muted sm:mr-1`} aria-hidden="true"><PlateIcon name="clock" size={22} />How long</span>
          <div className="-mx-5 -my-2 flex gap-2 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:m-0 sm:flex-wrap sm:overflow-visible sm:p-0">
            {LENGTHS.map((l) => <PlateChip key={l.key} label={l.label} tint={LENGTH_TINT[l.key]} on={f.lengths.includes(l.key)} onToggle={() => setF({ ...f, lengths: toggle(f.lengths, l.key) })} />)}
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
