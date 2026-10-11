"use client";
// The detail panel: a modal dialog with the trail's plates (a small gallery), three tabs of facts, sources, and one action.
import { useEffect, useRef, useState } from "react";
import { formatRange, type Hike } from "@/data/hikes";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { PlateTabs } from "@/components/dawn/ds/Interactive";
import { PrimaryButton, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { caps, display, focusRing, slow, ui } from "@/components/dawn/ds/tokens";
import { plateNo } from "./TrailCard";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function MonthStrip({ best }: { best: string[] }) {
  return (
    <div>
      <p className="sr-only">Best months: {best.join(", ")}</p>
      <div className="grid grid-cols-12 gap-1" aria-hidden="true">
        {MONTHS.map((m) => {
          const on = best.includes(m);
          return (
            <span key={m} className={`${ui} grid h-9 place-items-center border text-[11px] font-semibold ${on ? "border-[#22333a] bg-[#c3d6c4] text-[#22333a]" : "border-[#6f8287]/40 text-[#4f5f66]"}`}>
              {m[0]}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Gallery({ photos }: { photos: TrailPhoto[] }) {
  const [at, setAt] = useState(() => Math.max(0, photos.findIndex((p) => p.cover)));
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const go = (i: number) => {
    const next = (i + photos.length) % photos.length;
    setAt(next);
    thumbs.current[next]?.focus();
  };
  const p = photos[at];
  return (
    <figure className="m-0 min-w-0">
      <TonedPhoto photo={p} sizes="(min-width: 1024px) 520px, 100vw" priority className="aspect-[4/3] border-[3px] border-[#22333a]" />
      <figcaption className={`${ui} mt-2 text-xs text-[#4f5f66]`} aria-live="polite">
        <span className="font-semibold text-[#22333a]">Plate {at + 1} of {photos.length}</span> · {creditLine(p)}
      </figcaption>
      {photos.length > 1 && (
        <div role="group" aria-label="Plates of this trail; arrow keys move between them" className="mt-3 grid max-w-sm grid-cols-4 gap-2" onKeyDown={(e) => (e.key === "ArrowRight" ? go(at + 1) : e.key === "ArrowLeft" ? go(at - 1) : undefined)}>
          {photos.map((ph, i) => (
            <button
              key={ph.file}
              ref={(el) => { thumbs.current[i] = el; }}
              type="button"
              aria-label={`Plate ${i + 1}: ${ph.place}`}
              aria-pressed={i === at}
              onClick={() => setAt(i)}
              className={`relative aspect-[4/3] w-full border-2 ${slow} ${i === at ? "border-[#22333a] shadow-[3px_3px_0_0_#c3d6c4]" : "border-[#6f8287]/40 opacity-70 hover:opacity-100 hover:shadow-[3px_3px_0_0_#c9dcdc]"} active:translate-y-px ${focusRing}`}
            >
              <TonedPhoto photo={ph} sizes="80px" className="h-full w-full" />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className={`${ui} mt-3 text-sm`}>
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-dotted border-[#22333a]/25 py-1.5">
          <dt className="text-[#4f5f66]">{k}</dt>
          <dd className="text-[#22333a] [font-variant-numeric:lining-nums]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const host = (u: string) => new URL(u).hostname.replace(/^www\./, "");

export function TrailDialog({ h, n, photos, inList, onToggleList, onClose }: { h: Hike | null; n: number; photos: TrailPhoto[]; inList: boolean; onToggleList: () => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (h && !d.open) d.showModal();
    if (!h && d.open) d.close();
  }, [h]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="trail-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto bg-[#f6f9f7] p-0 text-[#22333a] shadow-[8px_8px_0_0_#c9dcdc] backdrop:bg-[#22333a]/55"
    >
      {h && (
        <div key={h.id} className="relative grid grid-cols-1 gap-6 p-5 pt-14 sm:p-7 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-7">
          <button type="button" onClick={() => ref.current?.close()} className={`${caps} absolute right-5 top-4 z-10 border border-[#22333a] bg-[#f6f9f7] px-3 py-1.5 text-[#22333a] hover:bg-[#c3d6c4] active:translate-y-px ${focusRing}`}>
            Close
          </button>
          <Gallery photos={photos} />
          <div className="min-w-0">
            <p className={`${display} text-[13px] uppercase tracking-[0.12em] text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")} · {h.continent}</p>
            <h2 id="trail-title" className={`${display} mt-1 pr-16 text-4xl leading-tight`}>{h.name}</h2>
            <div className="mt-4">
              <PlateTabs
                tabs={["Overview", "Route", "When to go"]}
                panels={[
                  <div key="o">
                    <p>{h.why}</p>
                    <Facts rows={[["Distance", `${formatRange(h.distance_km)} km, ${h.route}`], ["Days", formatRange(h.days)], ["High point", `${h.high_point}, ${formatRange(h.max_elev_m)} m`], ...(h.ascent_m ? [["Total climb", `about ${h.ascent_m.toLocaleString("en-US")} m`] as [string, string]] : [])]} />
                  </div>,
                  <div key="r">
                    <Facts rows={[["Start", h.start], ["End", h.end], ["Route", h.route], ["Difficulty", h.difficulty]]} />
                  </div>,
                  <div key="w">
                    <MonthStrip best={h.best_months} />
                    <p className="mt-3">{h.permit ? "Permit or booking needed. " : "No permit needed. "}{h.permit_note}</p>
                  </div>,
                ]}
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <PrimaryButton aria-pressed={inList} onClick={onToggleList}>{inList ? "On your list ✓" : "Add to my list"}</PrimaryButton>
              <SecondaryButton onClick={() => ref.current?.close()}>Back to the trails</SecondaryButton>
            </div>
            <p className={`${ui} mt-2 min-h-5 text-sm text-[#4f5f66]`} role="status">{inList ? "On your list for this visit. Nothing is saved when you leave." : ""}</p>
            <div className={`${ui} mt-4 border-t border-[#22333a]/20 pt-3 text-xs text-[#4f5f66]`}>
              <p className={`${caps} text-[11px] text-[#22333a]`}>Sources</p>
              <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {h.sources.map((s) => (
                  <li key={s}><a href={s} target="_blank" rel="noreferrer" className={`relative underline decoration-[#8eaaa6] underline-offset-2 hover:decoration-[#22333a] ${focusRing}`}>{host(s)}</a></li>
                ))}
              </ul>
              {h.flags.length > 0 && <p className="mt-2">Notes on the data: {h.flags.join("; ")}.</p>}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
