import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Crimson_Pro } from "next/font/google";
import credits from "@/data/credits/field-notes.json";

const hand = Caveat({ subsets: ["latin"], weight: ["400", "600"], variable: "--fn-hand" });
const serif = Crimson_Pro({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--fn-serif" });

export const metadata: Metadata = { title: "Field Notes · Mood board · Twelve Trails" };

type Credit = (typeof credits)[number];
const photo = (file: string) => credits.find((c) => c.file === file) as Credit;

const INK = "#2b2a26";
const PALETTE = [
  { name: "Kraft", hex: "#e9dcc0" },
  { name: "Paper", hex: "#f7f1e3" },
  { name: "Graphite", hex: "#55524b" },
  { name: "Moss", hex: "#6f8a5b" },
  { name: "Ink blue", hex: "#2f4a6b" },
];

/* ---------- pieces made for this board ---------- */

function Rough({ children, viewBox, label }: { children: React.ReactNode; viewBox: string; label: string }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="h-auto w-full" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <g filter="url(#fn-rough)">{children}</g>
    </svg>
  );
}

const made: Record<string, React.ReactNode> = {
  palette: (
    <div className="grid grid-cols-5">
      {PALETTE.map((c) => (
        <div key={c.hex}>
          <div className="h-20" style={{ background: c.hex }} />
          <p className="mt-1 font-[family-name:var(--fn-hand)] text-base leading-tight">{c.name}</p>
          <p className="text-[10px] tracking-wide text-black/50">{c.hex}</p>
        </div>
      ))}
    </div>
  ),
  moss: (
    <div className="flex h-40 items-end p-3 text-[#f7f1e3]" style={{ background: "#6f8a5b" }}>
      <span className="font-[family-name:var(--fn-hand)] text-2xl">moss, after rain</span>
    </div>
  ),
  "type-hand": (
    <div className="py-4 text-center">
      <p className="font-[family-name:var(--fn-hand)] text-8xl leading-none">Aa</p>
      <p className="mt-2 text-xs tracking-wide text-black/50">Caveat · the hand</p>
    </div>
  ),
  "type-serif": (
    <div className="py-3">
      <p className="font-[family-name:var(--fn-serif)] text-5xl leading-none">4,215 m</p>
      <p className="mt-2 font-[family-name:var(--fn-serif)] text-lg italic text-black/70">Dead Woman&apos;s Pass, Inca Trail</p>
      <p className="mt-2 text-xs tracking-wide text-black/50">Crimson Pro · the facts</p>
    </div>
  ),
  "ruled-note": (
    <div
      className="px-4 pb-4 pt-6 font-[family-name:var(--fn-hand)] text-2xl leading-[32px]"
      style={{ background: "repeating-linear-gradient(#f7f1e3 0 31px, #b9c6d6 31px 32px)", borderLeft: "2px solid #2f4a6b" }}
    >
      Milford Track · one way only.
      <br />
      Huts booked, no camping.
    </div>
  ),
  graph: (
    <div
      className="h-44"
      style={{
        backgroundColor: "#f7f1e3",
        backgroundImage:
          "linear-gradient(#cfd8c4 1px, transparent 1px), linear-gradient(90deg, #cfd8c4 1px, transparent 1px), linear-gradient(#a9b89a 1px, transparent 1px), linear-gradient(90deg, #a9b89a 1px, transparent 1px)",
        backgroundSize: "10px 10px, 10px 10px, 50px 50px, 50px 50px",
      }}
    />
  ),
  kraft: (
    <svg viewBox="0 0 200 140" className="block h-auto w-full" role="img" aria-label="Kraft paper texture">
      <filter id="fn-kraft">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="4" />
        <feColorMatrix values="0 0 0 0 .55  0 0 0 0 .45  0 0 0 0 .3  0 0 0 .35 0" />
      </filter>
      <rect width="200" height="140" fill="#e9dcc0" />
      <rect width="200" height="140" filter="url(#fn-kraft)" />
    </svg>
  ),
  "doodle-mountain": (
    <Rough viewBox="0 0 220 140" label="Line drawing of mountains with a dashed trail">
      <path d="M10 125 L70 45 L100 85 L140 25 L210 125 Z" />
      <path d="M128 42 l12 -17 l12 17" />
      <path d="M30 120 C 60 112, 70 98, 92 96 S 120 78, 138 60" strokeDasharray="5 7" stroke="#2f4a6b" />
      <circle cx="138" cy="58" r="3.5" fill={INK} />
    </Rough>
  ),
  "doodle-boot": (
    <Rough viewBox="0 0 160 140" label="Line drawing of a hiking boot">
      <path d="M48 18 h40 v58 c18 4 40 10 52 22 c6 6 6 14 0 18 H30 c-6 0 -8 -6 -6 -12 l8 -30 z" />
      <path d="M24 116 h118" />
      <path d="M52 34 h30 M52 46 h30 M52 58 h30" />
      <path d="M30 126 l6 -10 M50 126 l6 -10 M70 126 l6 -10 M90 126 l6 -10 M110 126 l6 -10" strokeWidth={1.6} />
    </Rough>
  ),
  "doodle-tent": (
    <Rough viewBox="0 0 180 130" label="Line drawing of a tent under stars">
      <path d="M20 110 L80 30 L150 110 Z" />
      <path d="M80 30 L95 110 M80 30 L65 110" />
      <path d="M10 112 h160" />
      <path d="M140 22 l4 8 l8 1 l-6 6 l2 8 l-8 -4 l-8 4 l2 -8 l-6 -6 l8 -1 z" strokeWidth={1.6} />
      <circle cx="30" cy="26" r="2" fill={INK} />
      <circle cx="110" cy="14" r="2" fill={INK} />
    </Rough>
  ),
  "profile-sketch": (
    <div>
      <Rough viewBox="0 0 260 110" label="Pencil sketch of an elevation profile">
        <path d="M6 96 C 30 92, 40 70, 62 66 S 96 40, 118 22 C 130 14, 140 30, 158 44 S 200 80, 254 88" stroke="#55524b" />
        <path d="M6 100 h248" strokeWidth={1.2} />
        <path d="M118 22 v78" strokeDasharray="3 5" strokeWidth={1.2} />
      </Rough>
      <p className="mt-1 font-[family-name:var(--fn-hand)] text-lg">a profile, sketched — not to scale</p>
    </div>
  ),
  "tape-chip": (
    <div className="flex flex-wrap items-center gap-3 py-4">
      <span className="-rotate-2 bg-[#e8dfc6]/90 px-3 py-1 font-[family-name:var(--fn-hand)] text-xl shadow-sm">moderate</span>
      <span className="rotate-1 bg-[#cfdcc4]/90 px-3 py-1 font-[family-name:var(--fn-hand)] text-xl shadow-sm">4 days</span>
      <span className="-rotate-1 bg-[#c9d4e2]/90 px-3 py-1 font-[family-name:var(--fn-hand)] text-xl shadow-sm">huts</span>
    </div>
  ),
  "stamp-button": (
    <div className="py-5 text-center">
      <span className="inline-block rotate-[-2deg] border-2 border-[#2f4a6b] px-5 py-2 font-[family-name:var(--fn-serif)] text-lg uppercase tracking-[0.18em] text-[#2f4a6b]">
        Open the trail →
      </span>
    </div>
  ),
  "page-card": (
    <div className="relative bg-[#fbf7ec] p-4 shadow-[0_1px_2px_rgba(0,0,0,.15)]">
      <svg viewBox="0 0 30 60" className="absolute -top-4 right-6 h-12 w-6" fill="none" stroke="#8a8780" strokeWidth={2.5} aria-hidden="true">
        <path d="M8 40 V10 a7 7 0 0 1 14 0 V48 a10 10 0 0 1 -20 0 V16" />
      </svg>
      <p className="font-[family-name:var(--fn-serif)] text-2xl">Laugavegur Trail</p>
      <p className="font-[family-name:var(--fn-hand)] text-xl text-black/70">54–55 km · 4 days · late June to mid-September</p>
    </div>
  ),
  checkbox: (
    <div className="space-y-2 py-2 font-[family-name:var(--fn-hand)] text-2xl">
      <p className="flex items-center gap-3">
        <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
          <path d="M4 5 L24 4 L23 24 L5 23 Z" />
          <path d="M8 14 l5 6 l11 -16" stroke="#6f8a5b" strokeWidth={3} />
        </svg>
        permit needed
      </p>
      <p className="flex items-center gap-3 text-black/60">
        <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
          <path d="M4 5 L24 4 L23 24 L5 23 Z" />
        </svg>
        day hike
      </p>
    </div>
  ),
  washi: (
    <div className="relative h-32">
      <div className="absolute left-2 top-6 h-8 w-4/5 -rotate-6 bg-[#9fb38f]/70" />
      <div className="absolute right-2 top-14 h-8 w-3/4 rotate-3 bg-[#8fa3bd]/60" />
      <div
        className="absolute bottom-3 left-8 h-8 w-2/3 -rotate-1 bg-[#e3d6b4]/80"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 10px, rgba(85,82,75,.15) 10px 12px)" }}
      />
    </div>
  ),
};

/* ---------- the board, in reading order ---------- */

type Tile = { kind: "photo"; file: string; caption: string } | { kind: "made"; id: keyof typeof made; caption: string };

const tiles: Tile[] = [
  { kind: "photo", file: "notebook-map.jpg", caption: "A notebook that lives on the map" },
  { kind: "made", id: "palette", caption: "Paper, pencil, moss and ink" },
  { kind: "photo", file: "fern.jpg", caption: "Fern, close" },
  { kind: "made", id: "type-hand", caption: "A hand for notes and labels" },
  { kind: "photo", file: "birch-path.jpg", caption: "A path through birch" },
  { kind: "made", id: "doodle-mountain", caption: "Route, sketched" },
  { kind: "photo", file: "pressed-petals.jpg", caption: "Pressed petals, kraft pages" },
  { kind: "made", id: "ruled-note", caption: "Facts, written down" },
  { kind: "made", id: "tape-chip", caption: "Labels as tape, not as pills" },
  { kind: "photo", file: "tree-sketch.jpg", caption: "Trees in pencil" },
  { kind: "made", id: "type-serif", caption: "A book serif for the numbers" },
  { kind: "photo", file: "alpine-hut.jpg", caption: "A hut above the treeline" },
  { kind: "made", id: "doodle-boot", caption: "Boot" },
  { kind: "made", id: "graph", caption: "Graph paper" },
  { kind: "photo", file: "compass.jpg", caption: "Brass and glass" },
  { kind: "made", id: "page-card", caption: "A card is a page, clipped in" },
  { kind: "photo", file: "flower-notebook.jpg", caption: "Flowers, drawn on the cover" },
  { kind: "made", id: "moss", caption: "One colour does the talking" },
  { kind: "photo", file: "mossy-birch.jpg", caption: "Light on moss" },
  { kind: "made", id: "checkbox", caption: "Ticks drawn, not clicked" },
  { kind: "made", id: "kraft", caption: "Kraft" },
  { kind: "photo", file: "sketchbook.jpg", caption: "Landscape, in pen" },
  { kind: "made", id: "stamp-button", caption: "The one button: stamped" },
  { kind: "photo", file: "map-pencil.jpg", caption: "Pencil, map, coffee" },
  { kind: "made", id: "profile-sketch", caption: "Elevation, by hand" },
  { kind: "photo", file: "swiss-trail.jpg", caption: "Up the ridge" },
  { kind: "made", id: "doodle-tent", caption: "Night two" },
  { kind: "made", id: "washi", caption: "Washi tape, holding things down" },
];

const tilts = ["-rotate-1", "rotate-1", "rotate-0", "-rotate-[0.6deg]", "rotate-[0.8deg]"];

export default function FieldNotesBoard() {
  const madeCount = tiles.filter((t) => t.kind === "made").length;
  return (
    <main
      className={`${hand.variable} ${serif.variable} min-h-screen font-[family-name:var(--fn-serif)] text-[#2b2a26]`}
      style={{ background: "#efe6d0" }}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="fn-rough">
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
      </svg>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10">
        <Link
          href="/"
          className="text-sm text-black/60 underline-offset-4 hover:text-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4a6b]"
        >
          ← Hub
        </Link>
        <header className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-black/15 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-black/50">Mood board · 1 of 3</p>
            <h1 className="mt-1 font-[family-name:var(--fn-hand)] text-7xl leading-none">Field Notes</h1>
            <p className="mt-3 text-xl italic">Handmade · Curious · Warm</p>
            <p className="mt-3 max-w-xl text-lg leading-snug text-black/75">
              A notebook kept on the trail: pencil, pressed leaves, tape, and a route sketched by hand. For people who want to get to
              know each walk slowly.
            </p>
          </div>
          <p className="text-sm text-black/60">
            {tiles.length} artifacts · <span aria-hidden="true">✦</span> {madeCount} made for this board · {tiles.length - madeCount}{" "}
            collected
          </p>
        </header>

        <ul className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {tiles.map((t, i) => (
            <li key={i} className="mb-6 break-inside-avoid">
              <figure
                className={`relative bg-[#fbf7ec] p-3 shadow-[0_1px_2px_rgba(0,0,0,.12),0_8px_18px_rgba(60,45,20,.10)] transition duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_2px_4px_rgba(0,0,0,.14),0_16px_28px_rgba(60,45,20,.16)] ${tilts[i % tilts.length]}`}
              >
                {t.kind === "made" && (
                  <span className="absolute right-2 top-1 text-sm text-[#2f4a6b]" title="Made for this board" aria-label="Made for this board">
                    ✦
                  </span>
                )}
                {t.kind === "photo" ? (
                  <Image
                    src={`/moodboards/field-notes/${t.file}`}
                    alt={t.caption}
                    width={photo(t.file).w}
                    height={photo(t.file).h}
                    className="h-auto w-full"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  made[t.id]
                )}
                <figcaption className="mt-2 font-[family-name:var(--fn-hand)] text-lg leading-tight text-black/70">{t.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <section className="mt-16 border-t border-black/15 pt-6 text-sm text-black/70">
          <h2 className="font-[family-name:var(--fn-hand)] text-3xl text-black">Collected photos</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {credits.map((c) => (
              <li key={c.file}>
                Photo by{" "}
                <a href={c.source} className="underline decoration-black/30 underline-offset-2 hover:decoration-black">
                  {c.author}
                </a>{" "}
                on Unsplash ({c.title})
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Used under the{" "}
            <a href="https://unsplash.com/license" className="underline decoration-black/30 underline-offset-2 hover:decoration-black">
              Unsplash License
            </a>
            . Everything marked ✦ was drawn or set for this board.
          </p>
        </section>
      </div>
    </main>
  );
}
