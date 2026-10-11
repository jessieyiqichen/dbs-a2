"use client";
// The plates viewer: every photograph of one walk, large, in route order. Opened from a walk's page, on the
// plate that was chosen; arrow keys move between plates; Esc, Close or a click outside closes it.
import { useEffect, useRef, useState } from "react";
import type { Hike } from "@/data/hikes";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { focusRing, slow } from "@/components/dawn/ds/tokens";
import { plateNo } from "./plate";
import { t12, t12caption, t14, t48 } from "./type";

function Gallery({ photos, start, title }: { photos: TrailPhoto[]; start: number; title: React.ReactNode }) {
  const [at, setAt] = useState(start);
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
        <figcaption className={`${t14} mt-2 text-[#4f5f66]`} aria-live="polite">
          <span className="font-semibold text-[#22333a]">Plate {at + 1} of {photos.length}</span> · {creditLine(p)}
        </figcaption>
      </figure>
      <div className="min-w-0">
        {title}
        <p className={`${t12} mt-6 text-[#4f5f66]`}>In route order · arrow keys move</p>
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
              <span className={`${t14} mt-1 block truncate ${i === at ? "font-semibold text-[#22333a]" : "text-[#4f5f66]"}`}>{i + 1}. {ph.place}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** `at` is the plate to open on; null keeps the viewer shut. */
export function TrailDialog({ h, n, photos, at, onClose }: { h: Hike; n: number; photos: TrailPhoto[]; at: number | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (at !== null && !d.open) d.showModal();
    if (at === null && d.open) d.close();
  }, [at]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="plates-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto bg-[#f6f9f7] p-0 text-[#22333a] shadow-[8px_8px_0_0_#c9dcdc] backdrop:bg-[#22333a]/60"
    >
      {at !== null && (
        <div key={at} className="relative p-5 pt-14 sm:p-7 sm:pt-14">
          <button type="button" onClick={() => ref.current?.close()} className={`${t12} absolute right-5 top-4 z-10 border border-[#22333a] bg-[#f6f9f7] px-3 py-1.5 text-[#22333a] hover:bg-[#c3d6c4] active:translate-y-px ${focusRing}`}>
            Close
          </button>
          <Gallery
            photos={photos}
            start={at}
            title={
              <>
                <p className={`${t12caption} text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")}</p>
                <h2 id="plates-title" className={`${t48} mt-2`}>{h.name}</h2>
              </>
            }
          />
        </div>
      )}
    </dialog>
  );
}
