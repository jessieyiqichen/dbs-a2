"use client";
// Dawn, photo-book direction: printed matter, not glass. Square corners, hairlines, no shadows, the photo is the hero.
// Motion is only slow fades and slow travel. First light (#f3dfa0) is decoration only.
import { useState } from "react";
import Image from "next/image";
import { hikes, formatRange } from "@/data/hikes";

export const BOOK = { paper: "#f5f4f0", ink: "#2e3150", muted: "#5d6180", slate: "#3b4a6e", slateUp: "#44557a", light: "#f3dfa0" };
const ease = "cubic-bezier(.45,0,.2,1)";
const label = "font-[family-name:var(--dw-ui)] text-[11px] uppercase tracking-[0.22em]";
const serif = "font-[family-name:var(--dw-display)] [font-variant-numeric:lining-nums]";

/** Buttons: printed blocks. Hover: the slate lifts a shade and a hairline of first light rises from the bottom edge. */
export function BookButtons() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <button
        type="button"
        className={`${label} bg-[#3b4a6e] px-6 py-3.5 text-[#f5f4f0] shadow-[inset_0_0_0_0_#f3dfa0] transition-[background-color,box-shadow] duration-[900ms] hover:bg-[#44557a] hover:shadow-[inset_0_-2px_0_0_#f3dfa0] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#2e3150] active:bg-[#2f3d5e]`}
        style={{ transitionTimingFunction: ease }}
      >
        See the walk
      </button>
      <button
        type="button"
        className={`${label} border-b border-[#2e3150]/30 pb-1 text-[#2e3150] transition-colors duration-[900ms] hover:border-[#2e3150] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#2e3150]`}
        style={{ transitionTimingFunction: ease }}
      >
        Later
      </button>
      <button type="button" disabled className={`${label} cursor-not-allowed border border-dashed border-[#5d6180]/50 px-5 py-3 text-[#5d6180]`}>
        Full for 2026
      </button>
    </div>
  );
}

/** Tabs as a book's contents line: numbered, one hairline, the chosen one gets a rule that travels slowly under it. */
export function BookTabs() {
  const tabs = ["Overview", "Route", "When to go"];
  const [at, setAt] = useState(0);
  return (
    <div role="tablist" aria-label="Trail sections" className="relative flex gap-8 border-b border-[#2e3150]/15">
      {tabs.map((t, i) => (
        <button
          key={t}
          role="tab"
          type="button"
          aria-selected={at === i}
          onClick={() => setAt(i)}
          className={`relative pb-3 text-left transition-colors duration-700 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#2e3150] ${at === i ? "text-[#2e3150]" : "text-[#5d6180] hover:text-[#2e3150]"}`}
        >
          <span className={`${serif} mr-2 text-lg italic`}>{String(i + 1).padStart(2, "0")}</span>
          <span className={label}>{t}</span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-px origin-left bg-[#2e3150] transition-transform duration-[900ms]"
            style={{ transform: `scaleX(${at === i ? 1 : 0})`, transitionTimingFunction: ease }}
          />
        </button>
      ))}
    </div>
  );
}

/** Toggle: a horizon line. Off, the sun waits below it; on, it rises above and fills with first light. */
export function HorizonToggle({ text, initial = false }: { text: string; initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className="flex w-full items-center justify-between gap-6 border-b border-[#2e3150]/15 py-3 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#2e3150]"
    >
      <span className={`${serif} text-xl ${on ? "text-[#2e3150]" : "text-[#5d6180]"} transition-colors duration-700`}>{text}</span>
      <svg viewBox="0 0 48 24" className="h-8 w-16 shrink-0 overflow-visible" aria-hidden="true">
        <defs>
          <clipPath id={`dw-above-${text.length}`}>
            <rect x="-4" y="-10" width="56" height="27" />
          </clipPath>
        </defs>
        <g clipPath={`url(#dw-above-${text.length})`}>
          <circle
            cx={on ? 34 : 14}
            cy={on ? 9 : 19.5}
            r="5.5"
            fill={on ? BOOK.light : BOOK.paper}
            stroke={BOOK.ink}
            strokeWidth="1"
            style={{ transition: `cx 1100ms ${ease}, cy 1100ms ${ease}, fill 1100ms ${ease}` }}
          />
        </g>
        <path d="M0 17 H48" stroke={BOOK.ink} strokeWidth="1" />
      </svg>
    </button>
  );
}

/** A route card set like a plate in a photo book: the photograph first, then a number, a name, and three facts. */
export function PlateCard({ id, photo, credit }: { id: string; photo: string; credit: string }) {
  const index = hikes.findIndex((h) => h.id === id);
  const h = hikes[index];
  if (!h) return null;
  const months = `${h.best_months[0]} – ${h.best_months[h.best_months.length - 1]}`;
  const facts = [
    { n: `${formatRange(h.distance_km)}`, u: `km, ${h.route}` },
    { n: `${formatRange(h.days)}`, u: "days" },
    { n: `${formatRange(h.max_elev_m)}`, u: `m · ${h.high_point}` },
  ];
  return (
    <article className="group bg-[#f5f4f0]">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image src={photo} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-[filter] duration-[1400ms] group-hover:brightness-[1.06]" />
      </div>
      <p className={`${label} mt-2 text-[9px] tracking-[0.18em] text-[#5d6180]`}>{credit}</p>
      <div className="mt-6 flex items-baseline justify-between border-b border-[#2e3150]/15 pb-2">
        <span className={`${label} text-[#5d6180]`}>No. {String(index + 1).padStart(2, "0")}</span>
        <span className={`${label} text-[#5d6180]`}>{h.country.join(" · ")}</span>
      </div>
      <h3 className={`${serif} mt-5 text-5xl font-light leading-none text-[#2e3150]`}>{h.name}</h3>
      <p className={`${serif} mt-2 text-xl italic text-[#5d6180]`}>
        {h.start} to {h.end}
      </p>
      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-[#2e3150]/15 pt-4">
        {facts.map((f) => (
          <div key={f.u}>
            <dt className="sr-only">{f.u}</dt>
            <dd className={`${serif} whitespace-nowrap text-2xl font-light text-[#2e3150] sm:text-3xl`}>{f.n}</dd>
            <dd className={`${label} mt-1 text-[10px] leading-relaxed text-[#5d6180]`}>{f.u}</dd>
          </div>
        ))}
      </dl>
      <p className={`${label} mt-6 text-[#5d6180]`}>
        Best {months} · {h.permit ? "permit or booking needed" : "no permit"}
      </p>
    </article>
  );
}

function Sample({ n, title, note, children }: { n: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#2e3150]/15 pt-4">
      <p className="flex items-baseline gap-3">
        <span className={`${serif} text-lg italic text-[#5d6180]`}>{n}</span>
        <span className={`${label} text-[#2e3150]`}>{title}</span>
      </p>
      <p className={`${serif} mt-1 text-lg italic text-[#5d6180]`}>{note}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Four samples of the proposed direction, shown above the current board for comparison. */
export function PhotoBookPreview() {
  return (
    <section aria-label="Proposed direction: photo book" className="mt-8 bg-[#f5f4f0] px-6 py-10 sm:px-12 sm:py-14">
      <p className={`${label} text-[#5d6180]`}>Proposed direction · four samples</p>
      <h2 className={`${serif} mt-3 max-w-2xl text-5xl font-light leading-tight text-[#2e3150]`}>A photo book at first light</h2>
      <p className={`${serif} mt-2 max-w-xl text-xl italic text-[#5d6180]`}>
        Printed, not glass: square corners, hairlines, no shadows, and the photograph does the talking.
      </p>
      <div className="mt-12 grid gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="mb-4 flex items-baseline gap-3">
            <span className={`${serif} text-lg italic text-[#5d6180]`}>04</span>
            <span className={`${label} text-[#2e3150]`}>Route card, set as a plate</span>
          </p>
          <PlateCard id="milford" photo="/moodboards/dawn/misty-lake.jpg" credit="Stand-in photograph: misty lake, Anna Goncharova / Unsplash. The site uses a photo of each trail." />
        </div>
        <div className="flex flex-col gap-12">
          <Sample n="01" title="Buttons" note="A printed block; on hover a line of first light rises from the bottom.">
            <BookButtons />
          </Sample>
          <Sample n="02" title="Tabs" note="A contents line; the rule travels slowly to the chosen one.">
            <BookTabs />
          </Sample>
          <Sample n="03" title="Toggle" note="A horizon: off, the sun waits below it; on, it rises.">
            <HorizonToggle text="Show sunrise times" initial />
            <HorizonToggle text="Permit walks only" />
          </Sample>
        </div>
      </div>
    </section>
  );
}
