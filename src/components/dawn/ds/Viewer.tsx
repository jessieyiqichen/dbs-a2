"use client";
// The plates viewer: every photograph of one walk, large, in route order. The chosen plate is selected (a celadon
// plate in register); arrow keys move between plates. As a dialog, Esc, Close or a click outside closes it.
import { useEffect, useRef, useState } from "react";
import { TonedPhoto, creditLine, type TrailPhoto } from "../Toned";
import { PlateThumb } from "./Guide";
import { SecondaryButton } from "./Primitives";
import { t12, t14 } from "./type";

export function Gallery({ photos, start = 0, title }: { photos: TrailPhoto[]; start?: number; title: React.ReactNode }) {
  const [at, setAt] = useState(start);
  const move = (e: React.KeyboardEvent<HTMLDivElement>, by: number) => {
    e.preventDefault();
    const next = (at + by + photos.length) % photos.length;
    setAt(next);
    e.currentTarget.querySelectorAll("button")[next]?.focus();
  };
  const p = photos[at];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
      <figure className="m-0 min-w-0">
        <TonedPhoto photo={p} sizes="(min-width: 1024px) 680px, 100vw" priority className="aspect-[4/3] border-[3px] border-dw-ink" />
        <figcaption className={`${t14} mt-2 text-dw-muted`} aria-live="polite">
          <span className="font-semibold text-dw-ink">Plate {at + 1} of {photos.length}</span> · {creditLine(p)}
        </figcaption>
      </figure>
      <div className="min-w-0">
        {title}
        <p className={`${t12} mt-6 text-dw-muted`}>In route order · arrow keys move</p>
        <div
          role="group"
          aria-label="Plates of this walk"
          className="mt-2 grid grid-cols-2 gap-3"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") move(e, 1);
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") move(e, -1);
          }}
        >
          {photos.map((ph, i) => (
            <PlateThumb key={ph.file} photo={ph} n={i + 1} selected={i === at} onClick={() => setAt(i)} label={`Plate ${i + 1}: ${ph.place}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** `at` is the plate to open on; null keeps the viewer shut. */
export function PlatesViewer({ photos, at, title, labelledBy, onClose }: { photos: TrailPhoto[]; at: number | null; title: React.ReactNode; labelledBy: string; onClose: () => void }) {
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
      aria-labelledby={labelledBy}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto bg-dw-mount p-0 text-dw-ink shadow-[8px_8px_0_0_var(--color-dw-aqua)] backdrop:bg-dw-ink/60"
    >
      {at !== null && (
        <div key={at} className="relative p-5 pt-16 sm:p-7 sm:pt-16">
          <span className="absolute right-5 top-4 z-10"><SecondaryButton small onClick={() => ref.current?.close()}>Close</SecondaryButton></span>
          <Gallery photos={photos} start={at} title={title} />
        </div>
      )}
    </dialog>
  );
}
