// One trail in the grid: a mounted print. The whole card is a button that opens the detail panel.
import { formatRange, type Hike } from "@/data/hikes";
import { TonedPhoto, type TrailPhoto } from "@/components/dawn/Toned";
import { caps, display, focusRing, slow, ui } from "@/components/dawn/ds/tokens";

export const plateNo = (n: number) => `No. ${String(n).padStart(2, "0")}`;

export function TrailCard({ h, n, cover, inList, onOpen }: { h: Hike; n: number; cover: TrailPhoto; inList: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${h.name}, ${h.country.join(", ")}. Open the trail${inList ? ". On your list" : ""}`}
      className={`group relative block w-full bg-[#f6f9f7] p-3.5 text-left shadow-[0_1px_0_rgba(34,51,58,.15)] ${slow} hover:shadow-[5px_5px_0_0_#c9dcdc] active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(34,51,58,.2)] ${focusRing}`}
    >
      <span className="relative block">
        <TonedPhoto photo={cover} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] border-[3px] border-[#22333a]" />
        {inList && (
          <span className={`${caps} absolute right-2 top-2 flex items-center gap-1.5 border border-[#22333a] bg-[#c3d6c4] px-2 py-1 text-[11px] text-[#22333a]`}>
            <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true"><path d="M2.5 8.5 L6.5 12 L13.5 3.5" fill="none" stroke="#22333a" strokeWidth="2.2" strokeLinecap="square" /></svg>
            On your list
          </span>
        )}
      </span>
      <span className="mt-3 flex items-baseline justify-between gap-3">
        <span className={`${display} text-sm text-[#4f5f66]`}>{plateNo(n)}</span>
        <span className={`${caps} truncate text-[11px] text-[#4f5f66]`}>{h.country.join(" · ")}</span>
      </span>
      <span className={`${display} mt-1 block text-[26px] leading-tight text-[#22333a] decoration-[#8eaaa6] decoration-2 underline-offset-4 group-hover:underline`}>{h.name}</span>
      <span className={`${ui} mt-3 block border-t border-[#22333a]/20 text-sm text-[#22333a]`}>
        {[
          ["Distance", `${formatRange(h.distance_km)} km, ${h.route}`],
          ["Days", formatRange(h.days)],
          ["High point", `${formatRange(h.max_elev_m)} m`],
        ].map(([k, v]) => (
          <span key={k} className="flex items-baseline justify-between gap-3 border-b border-dotted border-[#22333a]/25 py-1.5">
            <span className="text-[#4f5f66]">{k}</span>
            <span className={`${display} text-base [font-variant-numeric:lining-nums]`}>{v}</span>
          </span>
        ))}
      </span>
    </button>
  );
}
