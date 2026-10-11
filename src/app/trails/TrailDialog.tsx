"use client";
// The plates viewer: every photograph of one walk, large, in route order. Opened from a chapter; Esc closes it.
import { useEffect, useRef, useState } from "react";
import type { Hike } from "@/data/hikes";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { PrimaryButton } from "@/components/dawn/ds/Primitives";
import { caps, display, focusRing, slow, ui } from "@/components/dawn/ds/tokens";
import { plateNo } from "./plate";

function Gallery({ photos, title }: { photos: TrailPhoto[]; title: React.ReactNode }) {
  const [at, setAt] = useState(() => Math.max(0, photos.findIndex((p) => p.cover)));
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const go = (i: number) => {
    const next = (i + photos.length) % photos.length;
    setAt(next);
    thumbs.current[next]?.focus();
  };
  const p = photos[at];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
      <figure className="m-0 min-w-0">
        <TonedPhoto photo={p} sizes="(min-width: 1024px) 680px, 100vw" priority className="aspect-[4/3] border-[3px] border-[#22333a]" />
        <figcaption className={`${ui} mt-2 text-sm text-[#4f5f66]`} aria-live="polite">
          <span className="font-semibold text-[#22333a]">Plate {at + 1} of {photos.length}</span> · {creditLine(p)}
        </figcaption>
      </figure>
      <div className="min-w-0">
        {title}
        <p className={`${caps} mt-6 text-[11px] text-[#4f5f66]`}>In route order · arrow keys move</p>
        <div role="group" aria-label="Plates of this walk" className="mt-2 grid grid-cols-2 gap-3" onKeyDown={(e) => (e.key === "ArrowRight" || e.key === "ArrowDown" ? (e.preventDefault(), go(at + 1)) : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (e.preventDefault(), go(at - 1)) : undefined)}>
          {photos.map((ph, i) => (
            <button
              key={ph.file}
              ref={(el) => { thumbs.current[i] = el; }}
              type="button"
              aria-label={`Plate ${i + 1}: ${ph.place}`}
              aria-pressed={i === at}
              onClick={() => setAt(i)}
              className={`relative text-left ${slow} active:translate-y-px ${focusRing}`}
            >
              <span className={`block border-2 ${i === at ? "border-[#22333a] shadow-[3px_3px_0_0_#c3d6c4]" : "border-[#6f8287]/40 opacity-75 hover:opacity-100 hover:shadow-[3px_3px_0_0_#c9dcdc]"} ${slow}`}>
                <TonedPhoto photo={ph} sizes="160px" className="aspect-[4/3]" />
              </span>
              <span className={`${ui} mt-1 block truncate text-xs ${i === at ? "font-semibold text-[#22333a]" : "text-[#4f5f66]"}`}>{i + 1}. {ph.place}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      aria-labelledby="plates-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto bg-[#f6f9f7] p-0 text-[#22333a] shadow-[8px_8px_0_0_#c9dcdc] backdrop:bg-[#22333a]/60"
    >
      {h && (
        <div key={h.id} className="relative p-5 pt-14 sm:p-7 sm:pt-14">
          <button type="button" onClick={() => ref.current?.close()} className={`${caps} absolute right-5 top-4 z-10 border border-[#22333a] bg-[#f6f9f7] px-3 py-1.5 text-[#22333a] hover:bg-[#c3d6c4] active:translate-y-px ${focusRing}`}>
            Close
          </button>
          <Gallery
            photos={photos}
            title={
              <>
                <p className={`${display} text-[13px] uppercase tracking-[0.12em] text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")}</p>
                <h2 id="plates-title" className={`${display} mt-1 text-4xl leading-tight`}>{h.name}</h2>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <PrimaryButton aria-pressed={inList} onClick={onToggleList}>{inList ? "On your list ✓" : "Add to my list"}</PrimaryButton>
                </div>
              </>
            }
          />
        </div>
      )}
    </dialog>
  );
}
