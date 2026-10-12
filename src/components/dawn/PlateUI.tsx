// Dawn components, made the way a photochrom was: colour plates slightly off register, a key line on top.
// Interaction brings the plates into register. Nothing glows, nothing is glass.
import Image from "next/image";
import { hikes, elevation, formatRange } from "@/data/hikes";
import { KEY, MOUNT, T } from "./PlateArt";
import { TONE_FILTER, TONE_OVERLAY } from "./Toned";

const ui = "font-[family-name:var(--dw-ui)]";
const serif = "font-[family-name:var(--dw-display)]";
const caps = `${ui} whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em]`;
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-dw-ink";
const slow = "transition-[box-shadow,background-color,text-shadow,translate] duration-[600ms] ease-[cubic-bezier(.45,0,.2,1)]";

/** Primary: deep loch ink with its tint plate printed a little off. Hover: the plates come into register. */
const primary = `${caps} bg-dw-loch px-5 py-3 text-dw-mount shadow-[3px_3px_0_0_var(--color-dw-lake)] [text-shadow:1px_0.5px_0_rgba(195,214,196,.75)] ${slow} hover:bg-dw-loch-hover hover:shadow-[0_0_0_0_var(--color-dw-lake)] hover:[text-shadow:0_0_0_rgba(195,214,196,0)] active:translate-y-px active:bg-dw-loch-pressed ${focus}`;
const secondary = `${caps} border border-dw-ink bg-dw-mount px-5 py-3 text-dw-ink shadow-[3px_3px_0_0_var(--color-dw-pine)] ${slow} hover:shadow-[0_0_0_0_var(--color-dw-pine)] active:translate-y-px ${focus}`;

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
    { s: "Hover · in register", c: `${primary} !bg-dw-loch-hover !shadow-none ![text-shadow:none]` },
    { s: "Pressed", c: `${primary} !bg-dw-loch-pressed !shadow-none translate-y-px` },
    { s: "Focus", c: `${primary} outline outline-2 outline-offset-[3px] outline-dw-ink` },
  ];
  return (
    <div className="space-y-3">
      {states.map((x) => (
        <div key={x.s} className="flex items-center gap-4">
          <span tabIndex={-1} className={`inline-block ${x.c}`}>See the walk</span>
          <span className={`${ui} text-xs text-dw-muted`}>{x.s}</span>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <button type="button" disabled className={`${caps} cursor-not-allowed border border-dashed border-dw-muted bg-transparent px-5 py-3 text-dw-muted`}>
          Full for 2026
        </button>
        <span className={`${ui} text-xs text-dw-muted`}>Disabled · unprinted</span>
      </div>
    </div>
  );
}

/** Filters: printed labels, each its own tint plate. Chosen: the plate drops into register and the key line darkens. */
export function PlateChips() {
  const chips = [
    { t: "Lakes", tint: T.lake, on: true },
    { t: "Huts", tint: T.heather },
    { t: "Glaciers", tint: T.sky },
    { t: "Forest", tint: T.pine, on: true },
  ];
  return (
    <div className="flex flex-wrap gap-2.5">
      {chips.map((c) => (
        <span
          key={c.t}
          className={`${ui} border px-3 py-1.5 text-sm ${c.on ? "border-dw-ink font-semibold text-dw-ink" : "border-dw-ink/40 text-dw-muted"}`}
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
    <div className="border border-dw-ink/50 bg-dw-mount p-1">
      <div className="flex items-baseline gap-3 border border-dw-ink/20 px-3 py-2.5">
        <span className={`${caps} text-dw-muted`}>No.</span>
        <span className={`${serif} text-lg italic text-dw-muted`}>a trail, a country, a month…</span>
      </div>
    </div>
  );
}

/** Badge: an embossed publisher's stamp, the kind pressed into a print's mount. Key ink, never the action colour. */
export function EmbossStamp({ text = "Permit needed", uid = "dw-ring", className = "h-32 w-32" }: { text?: string; uid?: string; className?: string }) {
  const ring = `${text} · ${text} · `.toUpperCase();
  return (
    <svg viewBox="0 0 120 120" className={`${className} drop-shadow-[1px_1px_0_rgba(34,51,58,.28)]`} role="img" aria-label={`Badge: ${text}`}>
      <defs>
        <path id={uid} d="M60 60 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
      </defs>
      <g style={{ filter: "drop-shadow(-1px -1px 0 rgba(255,255,255,.9))" }}>
        <circle cx="60" cy="60" r="54" fill={MOUNT} stroke={KEY} strokeWidth="1.2" />
        <circle cx="60" cy="60" r="31" fill="none" stroke={KEY} strokeWidth=".8" />
        <text fontSize="10.5" letterSpacing="2.2" fill={KEY} fontFamily="var(--dw-ui)" fontWeight="600">
          <textPath href={`#${uid}`}>{ring}</textPath>
        </text>
        <g transform="translate(36 34) scale(1)" fill="none" stroke={KEY} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M6 38 L20 16 L27 26 L33 19 L44 38 Z" fill={T.lake} fillOpacity=".35" />
          <path d="M16.5 22 L20 16 L23.5 21.5" />
        </g>
      </g>
    </svg>
  );
}

/** The printed caption line, set the way the prints set theirs. */
export function PrintCaption({ n, text }: { n: number; text: string }) {
  return (
    <p className={`${serif} text-[13px] uppercase tracking-[0.12em] text-dw-ink`}>
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
    <article className="group bg-dw-mount p-3.5 shadow-[0_1px_0_rgba(34,51,58,.15)]">
      <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-dw-ink">
        <Image src={photo} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover transition-[filter] duration-[1200ms] group-hover:saturate-[1.15]" />
      </div>
      <div className="mt-3">
        <PrintCaption n={index + 1} text={`${h.name}, ${h.country.join(", ")}`} />
        <p className={`${ui} mt-0.5 text-xs text-dw-muted`}>{plateNote}</p>
      </div>
      <dl className={`${ui} mt-3 border-t border-dw-ink/20 text-sm text-dw-ink`}>
        {[
          ["Distance", `${formatRange(h.distance_km)} km, ${h.route}`],
          ["Days", formatRange(h.days)],
          ["High point", elevation(h)],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3 border-b border-dotted border-dw-ink/25 py-1.5">
            <dt className="text-dw-muted">{k}</dt>
            <dd className={`${serif} text-base`}>{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/** Progress: one colour plate per day. Printed days are in register; today is still a touch off; the rest are not printed yet. */
export function DayPlates({ day = 2, of = 4 }: { day?: number; of?: number }) {
  const tints = [T.pine, T.lake, T.sky, T.heather];
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
                borderColor: done || now ? KEY : "rgba(34,51,58,.35)",
                borderStyle: done || now ? "solid" : "dashed",
                transform: now ? "translate(2px, 2px)" : undefined,
                boxShadow: now ? `-2px -2px 0 0 ${MOUNT}, -2px -2px 0 1px ${KEY}` : undefined,
              }}
            />
          );
        })}
      </div>
      <p className={`${ui} mt-3 text-sm text-dw-ink`}>
        <span className="font-semibold">Day {day} of {of}</span> <span className="text-dw-muted">· a plate for each day walked</span>
      </p>
    </div>
  );
}

/** Loading: the print comes up plate by plate: grey key first, then the sky, the hills, the water. */
export function PrintingLoader({ photo }: { photo: string }) {
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-dw-ink">
        <Image src={photo} alt="" fill sizes="300px" className="object-cover grayscale" />
        <Image src={photo} alt="" fill sizes="300px" className="dw-print object-cover" />
      </div>
      <p className={`${ui} mt-2 text-sm text-dw-muted`} role="status">Printing the colour, one plate at a time…</p>
    </div>
  );
}

/** How a modern photo joins the set: treatment A, the photochrom look (half the colour out, warm cream highlights, soft contrast). */
export function PhotochromTreatment({ photo }: { photo: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <figure className="m-0">
        <div className="relative aspect-square overflow-hidden"><Image src={photo} alt="" fill sizes="200px" className="object-cover" /></div>
        <figcaption className={`${ui} mt-1 text-[11px] text-dw-muted`}>Unsplash, as shot</figcaption>
      </figure>
      <figure className="m-0">
        <div className="relative aspect-square overflow-hidden border-[3px] border-dw-ink">
          <Image src={photo} alt="" fill sizes="200px" className="object-cover" style={{ filter: TONE_FILTER }} />
          <div className="absolute inset-0 opacity-55 mix-blend-soft-light" style={{ background: TONE_OVERLAY }} />
        </div>
        <figcaption className={`${ui} mt-1 text-[11px] text-dw-muted`}>Toned like the prints</figcaption>
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
