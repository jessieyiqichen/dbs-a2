"use client";
// A trail photo, shown in its own colour: photochrom prints as printed, modern photos as taken. (Until 11 Oct 2026
// modern photos were toned to look old, treatment A; it made the guide feel grey, so the site dropped it. The mood
// board still shows the treatment as an early decision.)
// While it loads, the frame shows the tint plates printing, sky first; once loaded the photo's colour fades in.
// If it fails, the frame says so in Dawn's error state.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { display } from "./ds/tokens";
import { t12, t14 } from "./ds/type";

export type TrailPhoto = {
  file: string;
  kind: "photochrom" | "modern";
  alt: string;
  place: string;
  author: string;
  date?: string;
  license: string;
  source: string;
  w: number;
  h: number;
  cover: boolean;
};

export const TONE_FILTER = "saturate(.55) sepia(.28) contrast(.9) brightness(1.06)";
export const TONE_OVERLAY = "linear-gradient(180deg, #f6efd6 0%, #c1d1ad 45%, #b5a483 100%)";

export type PhotoState = "loading" | "ready" | "error";

/** The plates printing while a photo loads: sky first, then pine, then heather. */
function Printing() {
  return (
    <span aria-hidden="true" className="absolute inset-0 grid grid-rows-[45%_30%_25%] bg-dw-mount">
      <span className="bg-dw-sky motion-safe:animate-[dw-plate_1.6s_ease-in-out_infinite_alternate]" />
      <span className="bg-dw-pine motion-safe:animate-[dw-plate_1.6s_ease-in-out_.3s_infinite_alternate]" />
      <span className="bg-dw-heather motion-safe:animate-[dw-plate_1.6s_ease-in-out_.6s_infinite_alternate]" />
    </span>
  );
}

/** Dawn's error state inside the frame. Small frames keep only the mark; wider ones also say what happened. */
function NotPrinted({ alt }: { alt: string }) {
  return (
    <span role="img" aria-label={`Photo did not load: ${alt}`} className="absolute inset-0 grid place-items-center bg-dw-mount p-2 text-center">
      <span className="flex flex-col items-center gap-1">
        <span aria-hidden="true" className={`${display} grid h-7 w-7 place-items-center border-[1.5px] border-dw-ink bg-dw-heather text-lg text-dw-ink shadow-[2px_2px_0_0_var(--color-dw-ink)]`}>!</span>
        <span aria-hidden="true" className={`${t14} hidden text-dw-ink @min-[11rem]:block`}>This print didn&apos;t come through</span>
        <span aria-hidden="true" className={`${t12} hidden text-dw-muted @min-[11rem]:block`}>Reload the page to try again</span>
      </span>
    </span>
  );
}

/** `force` shows a state on purpose, for the design system. */
export function TonedPhoto({ photo, sizes, priority = false, className = "", force }: { photo: TrailPhoto; sizes: string; priority?: boolean; className?: string; force?: PhotoState }) {
  const ref = useRef<HTMLImageElement>(null);
  const [live, setLive] = useState<PhotoState>("loading");
  // an image can finish before the page wakes up; read where it got to
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setLive(img.naturalWidth > 0 ? "ready" : "error");
  }, []);
  const state = force ?? live;
  return (
    <span className={`@container relative block overflow-hidden ${className}`}>
      {state === "loading" && <Printing />}
      {force !== "loading" && force !== "error" && (
        <>
          <Image
            ref={ref}
            src={photo.file}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            onLoad={() => setLive("ready")}
            onError={() => setLive("error")}
            className={`object-cover transition-opacity duration-[600ms] ease-[cubic-bezier(.45,0,.2,1)] ${state === "ready" ? "opacity-100" : "opacity-0"}`}
          />
        </>
      )}
      {state === "error" && <NotPrinted alt={photo.alt} />}
    </span>
  );
}

/** One line of credit, as the prints carried theirs. */
export function creditLine(p: TrailPhoto): string {
  return p.kind === "photochrom" ? `${p.place} · photochrom, ${p.author}, ${p.date}` : `${p.place} · photo ${p.author} / Unsplash`;
}
