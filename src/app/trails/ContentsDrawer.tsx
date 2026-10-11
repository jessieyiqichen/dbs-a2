"use client";
// Contents in a side panel: printed filter chips, the print catalogue, and a jump to each chapter.
import { useEffect, useRef } from "react";
import type { Hike } from "@/data/hikes";
import { DW, focusRing } from "@/components/dawn/ds/tokens";
import { PlateChip, PlateToggle } from "@/components/dawn/ds/Interactive";
import { CatalogueRow } from "@/components/dawn/ds/Pieces";
import { SecondaryButton } from "@/components/dawn/ds/Primitives";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { LENGTHS, NO_FILTERS, REGIONS, isFiltered, toggle, type Filters } from "./filters";
import { t12, t14, t24, t48 } from "./type";

const REGION_TINT = { Europe: DW.celadon, Asia: DW.aqua, Oceania: DW.loch, "The Americas": DW.stone } as const;
const LENGTH_TINT = { day: DW.aqua, days: DW.celadon, weeks: DW.stone } as const;

export function ContentsDrawer({ open, onClose, all, f, setF, matches }: { open: boolean; onClose: () => void; all: Hike[]; f: Filters; setF: (f: Filters) => void; matches: Set<string> }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  const close = () => ref.current?.close();
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && close()}
      aria-labelledby="contents-title"
      className="m-0 ml-auto h-dvh max-h-dvh w-[min(460px,100%)] overflow-y-auto bg-[#f6f9f7] p-0 text-[#22333a] shadow-[-8px_0_0_0_#c9dcdc] backdrop:bg-[#22333a]/45 motion-safe:animate-[dw-drawer-in_.45s_cubic-bezier(.45,0,.2,1)]"
    >
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="contents-title" className={t48}>Contents</h2>
          <button type="button" onClick={close} className={`${t12} relative border border-[#22333a] px-3 py-1.5 hover:bg-[#c3d6c4] active:translate-y-px ${focusRing}`}>Close</button>
        </div>

        <div className="mt-6 space-y-4">
          <div role="group" aria-label="Where" className="space-y-2">
            <p className={`${t12} text-[#4f5f66]`}>Where</p>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => <PlateChip key={r} label={r} tint={REGION_TINT[r]} on={f.regions.includes(r)} onToggle={() => setF({ ...f, regions: toggle(f.regions, r) })} />)}
            </div>
          </div>
          <div role="group" aria-label="How long" className="space-y-2">
            <p className={`${t12} text-[#4f5f66]`}>How long</p>
            <div className="flex flex-wrap gap-2">
              {LENGTHS.map((l) => <PlateChip key={l.key} label={l.label} tint={LENGTH_TINT[l.key]} on={f.lengths.includes(l.key)} onToggle={() => setF({ ...f, lengths: toggle(f.lengths, l.key) })} />)}
            </div>
          </div>
          <PlateToggle label="No permit needed" checked={f.noPermit} onChange={(noPermit) => setF({ ...f, noPermit })} />
        </div>

        <div className={`${t14} mt-6 flex items-baseline justify-between border-b border-[#22333a] pb-2 text-[#4f5f66]`} aria-live="polite">
          <span><span className="font-semibold text-[#22333a]">{matches.size}</span> of {all.length} walks fit</span>
          {isFiltered(f) && (
            <button type="button" onClick={() => setF(NO_FILTERS)} className={`relative underline decoration-[#8eaaa6] decoration-2 underline-offset-4 hover:text-[#22333a] hover:decoration-[#22333a] ${focusRing}`}>Clear all</button>
          )}
        </div>

        {matches.size === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <span className="grid h-20 w-28 place-items-center border-[1.5px] border-dashed border-[#4f5f66]"><PlateIcon name="camera" size={36} /></span>
            <p className={t24}>No prints in this drawer</p>
            <p className={`${t14} text-[#4f5f66]`}>No walk fits all of these at once. Take a filter off.</p>
            <SecondaryButton onClick={() => setF(NO_FILTERS)}>Clear filters</SecondaryButton>
          </div>
        ) : (
          <ol className="mt-1">
            {all.map((h) => (
              <li key={h.id}>
                <CatalogueRow id={h.id} href={`#${h.id}`} onClick={close} muted={!matches.has(h.id)} note={`${h.days[0] === h.days[1] ? h.days[0] : `${h.days[0]}–${h.days[1]}`} ${h.days[1] === 1 ? "day" : "days"}`} />
              </li>
            ))}
          </ol>
        )}
        {matches.size > 0 && isFiltered(f) && <p className={`${t14} mt-3 text-[#4f5f66]`}>Walks in grey italic don&apos;t fit your choice.</p>}
      </div>
    </dialog>
  );
}
