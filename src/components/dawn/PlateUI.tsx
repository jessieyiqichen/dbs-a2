// Dawn components, made the way a photochrom was: colour plates slightly off register, a key line on top.
// Interaction brings the plates into register. Nothing glows, nothing is glass.
import Image from "next/image";
import { hikes, formatRange } from "@/data/hikes";
import { KEY, LOCH, MOUNT, T } from "./PlateArt";

const ui = "font-[family-name:var(--dw-ui)]";
const serif = "font-[family-name:var(--dw-display)]";
const caps = `${ui} whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em]`;
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#2b2f28]";
const slow = "transition-[box-shadow,background-color,text-shadow,translate] duration-[600ms] ease-[cubic-bezier(.45,0,.2,1)]";

/** Primary: deep loch ink with its tint plate printed a little off. Hover: the plates come into register. */
const primary = `${caps} bg-[#35585a] px-5 py-3 text-[#faf7ee] shadow-[3px_3px_0_0_#8ea69d] [text-shadow:1px_0.5px_0_rgba(193,209,173,.75)] ${slow} hover:bg-[#3d6563] hover:shadow-[0_0_0_0_#8ea69d] hover:[text-shadow:0_0_0_rgba(193,209,173,0)] active:translate-y-px active:bg-[#2f5052] ${focus}`;
const secondary = `${caps} border border-[#2b2f28] bg-[#faf7ee] px-5 py-3 text-[#2b2f28] shadow-[3px_3px_0_0_#c1d1ad] ${slow} hover:shadow-[0_0_0_0_#c1d1ad] active:translate-y-px ${focus}`;

export function PlateButtons({ showStates = false }: { showStates?: boolean }) {
  if (!showStates) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" className={primary}>See the walk</button>
        <button type="button" className={secondary}>Later</button>
      </div>
    );
  }
  const states = [
    { s: "Rest", c: primary },
    { s: "Hover · in register", c: `${primary} !bg-[#3d6563] !shadow-none ![text-shadow:none]` },
    { s: "Pressed", c: `${primary} !bg-[#2f5052] !shadow-none translate-y-px` },
    { s: "Focus", c: `${primary} outline outline-2 outline-offset-[3px] outline-[#2b2f28]` },
  ];
  return (
    <div className="space-y-3">
      {states.map((x) => (
        <div key={x.s} className="flex items-center gap-4">
          <span tabIndex={-1} className={`inline-block ${x.c}`}>See the walk</span>
          <span className={`${ui} text-xs text-[#5c5f52]`}>{x.s}</span>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <button type="button" disabled className={`${caps} cursor-not-allowed border border-dashed border-[#5c5f52] bg-transparent px-5 py-3 text-[#5c5f52]`}>
          Full for 2026
        </button>
        <span className={`${ui} text-xs text-[#5c5f52]`}>Disabled · unprinted</span>
      </div>
    </div>
  );
}

/** Filters: printed labels, each its own tint plate. Chosen: the plate drops into register and the key line darkens. */
export function PlateChips() {
  const chips = [
    { t: "Lakes", tint: T.loch, on: true },
    { t: "Huts", tint: T.light },
    { t: "Glaciers", tint: T.mist },
    { t: "Forest", tint: T.celadon, on: true },
  ];
  return (
    <div className="flex flex-wrap gap-2.5">
      {chips.map((c) => (
        <span
          key={c.t}
          className={`${ui} border px-3 py-1.5 text-sm ${c.on ? "border-[#2b2f28] font-semibold text-[#2b2f28]" : "border-[#2b2f28]/40 text-[#5c5f52]"}`}
          style={{ background: c.on ? c.tint : "transparent", boxShadow: c.on ? "none" : `2px 2px 0 0 ${c.tint}` }}
        >
          {c.t}
        </span>
      ))}
    </div>
  );
}

/** Search the catalogue: a field with a print-mount bevel. */
export function CatalogueSearch() {
  return (
    <div className="border border-[#2b2f28]/50 bg-[#faf7ee] p-1">
      <div className="flex items-baseline gap-3 border border-[#2b2f28]/20 px-3 py-2.5">
        <span className={`${caps} text-[#5c5f52]`}>No.</span>
        <span className={`${serif} text-lg italic text-[#5c5f52]`}>a trail, a country, a month…</span>
      </div>
    </div>
  );
}

/** Badge: an embossed publisher's stamp, the kind pressed into a print's mount. */
export function EmbossStamp({ text = "Permit needed" }: { text?: string }) {
  const ring = `${text} · ${text} · `.toUpperCase();
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-32 drop-shadow-[1px_1px_0_rgba(43,47,40,.28)]" role="img" aria-label={`Badge: ${text}`}>
      <defs>
        <path id="dw-ring" d="M60 60 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
      </defs>
      <g style={{ filter: "drop-shadow(-1px -1px 0 rgba(255,255,255,.9))" }}>
        <circle cx="60" cy="60" r="54" fill={MOUNT} stroke={LOCH} strokeWidth="1.2" />
        <circle cx="60" cy="60" r="31" fill="none" stroke={LOCH} strokeWidth=".8" />
        <text fontSize="10.5" letterSpacing="2.2" fill={LOCH} fontFamily="var(--dw-ui)" fontWeight="600">
          <textPath href="#dw-ring">{ring}</textPath>
        </text>
        <g transform="translate(36 34) scale(1)" fill="none" stroke={LOCH} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M6 38 L20 16 L27 26 L33 19 L44 38 Z" fill={T.loch} fillOpacity=".35" />
          <path d="M16.5 22 L20 16 L23.5 21.5" />
        </g>
      </g>
    </svg>
  );
}

/** The printed caption line, set the way the prints set theirs. */
export function PrintCaption({ n, text }: { n: number; text: string }) {
  return (
    <p className={`${serif} text-[13px] uppercase tracking-[0.12em] text-[#2b2f28]`}>
      No. {String(n).padStart(2, "0")}. {text}.
    </p>
  );
}

/** A route card is a mounted print: the picture with its dark edge, the caption, then the facts. */
export function PlateCard({ id, photo, plateNote }: { id: string; photo: string; plateNote: string }) {
  const index = hikes.findIndex((h) => h.id === id);
  const h = hikes[index];
  if (!h) return null;
  return (
    <article className="group bg-[#faf7ee] p-3.5 shadow-[0_1px_0_rgba(43,47,40,.15)]">
      <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-[#2b2f28]">
        <Image src={photo} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover transition-[filter] duration-[1200ms] group-hover:saturate-[1.15]" />
      </div>
      <div className="mt-3">
        <PrintCaption n={index + 1} text={`${h.name}, ${h.country.join(", ")}`} />
        <p className={`${ui} mt-0.5 text-xs text-[#5c5f52]`}>{plateNote}</p>
      </div>
      <dl className={`${ui} mt-3 border-t border-[#2b2f28]/20 text-sm text-[#2b2f28]`}>
        {[
          ["Distance", `${formatRange(h.distance_km)} km, ${h.route}`],
          ["Days", formatRange(h.days)],
          ["High point", `${formatRange(h.max_elev_m)} m`],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3 border-b border-dotted border-[#2b2f28]/25 py-1.5">
            <dt className="text-[#5c5f52]">{k}</dt>
            <dd className={`${serif} text-base`}>{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/** Progress: one colour plate per day. Printed days are in register; today is still a touch off; the rest are not printed yet. */
export function DayPlates({ day = 2, of = 4 }: { day?: number; of?: number }) {
  const tints = [T.celadon, T.loch, T.mist, T.light, T.rock];
  return (
    <div>
      <div className="flex gap-2">
        {Array.from({ length: of }).map((_, i) => {
          const done = i < day - 1;
          const now = i === day - 1;
          return (
            <span
              key={i}
              className="h-10 flex-1 border"
              style={{
                background: done || now ? tints[i % tints.length] : "transparent",
                borderColor: done || now ? KEY : "rgba(43,47,40,.35)",
                borderStyle: done || now ? "solid" : "dashed",
                transform: now ? "translate(2px, 2px)" : undefined,
                boxShadow: now ? `-2px -2px 0 0 ${MOUNT}, -2px -2px 0 1px ${KEY}` : undefined,
              }}
            />
          );
        })}
      </div>
      <p className={`${ui} mt-3 text-sm text-[#2b2f28]`}>
        <span className="font-semibold">Day {day} of {of}</span> <span className="text-[#5c5f52]">· a plate for each day walked</span>
      </p>
    </div>
  );
}

/** Loading: the print comes up plate by plate: grey key first, then the sky, the hills, the water. */
export function PrintingLoader({ photo }: { photo: string }) {
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-[#2b2f28]">
        <Image src={photo} alt="" fill sizes="300px" className="object-cover grayscale" />
        <Image src={photo} alt="" fill sizes="300px" className="dw-print object-cover" />
      </div>
      <p className={`${ui} mt-2 text-sm text-[#5c5f52]`} role="status">Printing the colour, one plate at a time…</p>
    </div>
  );
}

/** How a modern photo joins the set: lift the colour out, lay the print's tints back in. */
export function PhotochromTreatment({ photo }: { photo: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <figure className="m-0">
        <div className="relative aspect-square overflow-hidden"><Image src={photo} alt="" fill sizes="200px" className="object-cover" /></div>
        <figcaption className={`${ui} mt-1 text-[11px] text-[#5c5f52]`}>Unsplash, as shot</figcaption>
      </figure>
      <figure className="m-0">
        <div className="relative aspect-square overflow-hidden border-[3px] border-[#2b2f28]">
          <Image src={photo} alt="" fill sizes="200px" className="object-cover [filter:grayscale(1)_contrast(1.05)_brightness(1.08)]" />
          <div className="absolute inset-0 mix-blend-color" style={{ background: `linear-gradient(180deg, ${T.light} 0%, ${T.celadon} 35%, ${T.loch} 70%, #6f7a5a 100%)` }} />
        </div>
        <figcaption className={`${ui} mt-1 text-[11px] text-[#5c5f52]`}>With the print&apos;s tints</figcaption>
      </figure>
    </div>
  );
}

export const PLATE_KEYFRAMES = `
.dw-print { animation: dw-print 7s cubic-bezier(.45,0,.2,1) infinite }
@keyframes dw-print {
  0%, 8% { clip-path: inset(0 0 100% 0); opacity: 1 }
  28%, 34% { clip-path: inset(0 0 62% 0) }
  52%, 58% { clip-path: inset(0 0 30% 0) }
  76%, 90% { clip-path: inset(0 0 0 0); opacity: 1 }
  100% { clip-path: inset(0 0 0 0); opacity: 0 }
}
@media (prefers-reduced-motion: reduce) { .dw-print { animation: none } }
`;
