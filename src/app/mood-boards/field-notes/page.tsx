import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Crimson_Pro } from "next/font/google";
import credits from "@/data/credits/field-notes.json";
import { CircledChoice, FIELD_ICON_NAMES, FieldDefs, FieldIcon, NotebookTabs, PermitStamp, RulerSlider, SearchLine } from "@/components/field-notes/FieldArt";
import { FIELD_KEYFRAMES, PaintSwatch, PaperStack, PencilLoader, RouteProgress, TapeLabel, WashToggle } from "@/components/field-notes/FieldSketches";

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

const made: Record<string, React.ReactNode> = {
  palette: (
    <div className="grid grid-cols-5 gap-1.5">
      {PALETTE.map((c, i) => (
        <PaintSwatch key={c.hex} name={c.name} hex={c.hex} seed={i} />
      ))}
    </div>
  ),
  "type-hand": (
    <div className="py-4 text-center">
      <p className="font-[family-name:var(--fn-hand)] text-8xl leading-none">Aa</p>
      <p className="mt-2 text-xs tracking-wide text-black/60">Caveat · the hand</p>
    </div>
  ),
  "type-serif": (
    <div className="py-3">
      <p className="font-[family-name:var(--fn-serif)] text-5xl leading-none">4,215 m</p>
      <p className="mt-2 font-[family-name:var(--fn-serif)] text-lg italic text-black/70">Dead Woman&apos;s Pass, Inca Trail</p>
      <p className="mt-2 text-xs tracking-wide text-black/60">Crimson Pro · the facts</p>
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
  "profile-sketch": (
    <div>
      <svg viewBox="0 0 260 130" role="img" aria-label="Pencil sketch of the Inca Trail's profile, highest at Dead Woman's Pass, 4,215 m" className="h-auto w-full">
        <path d="M8 112 C 30 104, 46 92, 62 70 C 74 52, 84 34, 92 30 C 100 28, 104 44, 114 62 C 122 74, 130 70, 140 56 C 148 46, 154 52, 162 66 C 170 78, 178 70, 188 64 C 198 60, 206 76, 220 92 C 232 104, 244 108, 252 110 L 252 116 L 8 116 Z" fill="url(#fn-hatch)" opacity=".35" />
        <g fill="none" stroke="#55524b" strokeLinecap="round" strokeLinejoin="round" filter="url(#fn-pencil)">
          <path d="M8 112 C 30 104, 46 92, 62 70 C 74 52, 84 34, 92 30 C 100 28, 104 44, 114 62 C 122 74, 130 70, 140 56 C 148 46, 154 52, 162 66 C 170 78, 178 70, 188 64 C 198 60, 206 76, 220 92 C 232 104, 244 108, 252 110" strokeWidth={1.8} />
          <path d="M10 113 C 34 104, 48 90, 63 71 C 76 52, 85 36, 93 31.5 C 99 30, 104 42, 113 60" strokeWidth={1} opacity=".55" />
          <path d="M4 117 C 70 115, 180 118, 256 116" strokeWidth={1.1} />
        </g>
        <g fill="none" stroke="#2f4a6b" strokeWidth={1.5} strokeLinecap="round" filter="url(#fn-rough)">
          <path d="M108 11 C 100 10, 95 16, 94 26" />
          <path d="M90 21 C 91.5 23, 93 25, 94 27 C 95.5 25, 97 23.5, 99 22" />
        </g>
        <text x="111" y="15" fontSize="17" fill="#2f4a6b" fontFamily="var(--fn-hand)">Dead Woman&apos;s Pass</text>
        <text x="112" y="31" fontSize="14" fill="#2f4a6b" fontFamily="var(--fn-serif)">4,215 m</text>
        <text x="8" y="129" fontSize="13" fill="#625e56" fontFamily="var(--fn-hand)">Km 82</text>
        <text x="252" y="129" textAnchor="end" fontSize="13" fill="#625e56" fontFamily="var(--fn-hand)">Sun Gate</text>
      </svg>
      <p className="mt-1 font-[family-name:var(--fn-hand)] text-lg">Inca Trail, sketched: only the high point is to scale</p>
    </div>
  ),
  "tape-chip": (
    <div className="flex flex-wrap items-center gap-3 py-4">
      <TapeLabel tint="#e8dfc6" tilt="-rotate-2">moderate</TapeLabel>
      <TapeLabel tint="#cfdcc4" tilt="rotate-1">4 days</TapeLabel>
      <TapeLabel tint="#c9d4e2" tilt="-rotate-1">huts</TapeLabel>
    </div>
  ),
  "stamp-button": (
    <div className="py-5 text-center">
      <span className="inline-block rotate-[-2deg] border-2 border-[#3f5732] bg-[#4f6a3f] px-5 py-2 font-[family-name:var(--fn-serif)] text-lg uppercase tracking-[0.18em] text-[#fbf7ec]">
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
  icons: (
    <div className="grid grid-cols-4 gap-x-2 gap-y-2 py-2">
      {FIELD_ICON_NAMES.map((n) => (
        <div key={n} className="flex flex-col items-center">
          <FieldIcon name={n} size={44} />
          <span className="font-[family-name:var(--fn-hand)] text-base leading-none text-black/60">{n}</span>
        </div>
      ))}
    </div>
  ),
  tabs: <NotebookTabs />,
  choice: <CircledChoice />,
  ruler: <RulerSlider />,
  toggle: (
    <div className="space-y-2 py-3">
      <WashToggle on label="huts only" />
      <WashToggle on={false} label="day hikes" />
    </div>
  ),
  search: <SearchLine />,
  stamp: <PermitStamp />,
  progress: <RouteProgress />,
  loader: <PencilLoader />,
  papers: <PaperStack />,
};


/* ---------- overview: references, early decisions, palette, one component ---------- */

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block bg-[#2f4a6b] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fbf7ec]">{children}</span>;
}

function Ref({ file, note, className = "" }: { file: string; note: string; className?: string }) {
  const c = photo(file);
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <Image src={`/moodboards/field-notes/${file}`} alt={note} width={c.w} height={c.h} className="h-full w-full object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-8 font-[family-name:var(--fn-hand)] text-xl text-[#fbf7ec]">{note}</figcaption>
    </figure>
  );
}

function Overview() {
  return (
    <section aria-label="Overview" className="mt-8 grid gap-3 bg-[#e6dbc2] p-3 lg:grid-cols-[1.1fr_1fr_1fr] lg:grid-rows-[220px_auto_auto]">
      <div className="relative lg:row-span-2">
        <span className="absolute left-3 top-3 z-10"><Tag>References</Tag></span>
        <Ref file="notebook-map.jpg" note="Field notebook: kraft for every card" className="h-72 lg:h-full" />
      </div>
      <Ref file="fern.jpg" note="Fern: one green, for the one action" className="h-56 lg:h-auto" />
      <Ref file="tree-sketch.jpg" note="Pencil: lines drawn, not ruled" className="h-56 lg:h-auto" />
      <div className="bg-[#fbf7ec] p-5 lg:col-span-2">
        <Tag>Early decisions</Tag>
        <div className="mt-3 flex flex-wrap items-end gap-6">
          <p className="font-[family-name:var(--fn-hand)] text-8xl leading-[0.8]">Aa</p>
          <div>
            <p className="font-[family-name:var(--fn-serif)] text-4xl leading-none">
              4,215 m <span className="italic text-black/60">Dead Woman&apos;s Pass</span>
            </p>
            <p className="mt-2 max-w-md text-base text-black/70">Caveat for titles and labels, Crimson Pro for names, numbers and reading. Graphite text, never black.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 bg-[#fbf7ec] p-4 lg:col-span-2">
        {PALETTE.map((c, i) => (
          <PaintSwatch key={c.hex} name={c.name} hex={c.hex} seed={i + 1} />
        ))}
      </div>
      <div className="flex flex-col justify-center gap-4 bg-[#fbf7ec] p-5">
        <p className="flex items-center gap-3 font-[family-name:var(--fn-hand)] text-2xl">
          <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
            <path d="M4 5 L24 4 L23 24 L5 23 Z" />
            <path d="M8 14 l5 6 l11 -16" stroke="#6f8a5b" strokeWidth={3} />
          </svg>
          Permit needed
        </p>
        <span className="block border-2 border-[#3f5732] bg-[#4f6a3f] py-2 text-center font-[family-name:var(--fn-serif)] text-lg uppercase tracking-[0.18em] text-[#fbf7ec]">
          Open the trail →
        </span>
      </div>
    </section>
  );
}

/* ---------- the board, in reading order ---------- */

type Tile = { kind: "photo"; file: string; caption: string } | { kind: "made"; id: keyof typeof made; caption: string };

const tiles: Tile[] = [
  { kind: "photo", file: "notebook-map.jpg", caption: "Field notebook on a map: kraft for every card" },
  { kind: "made", id: "palette", caption: "Paint chart: kraft, paper, graphite, moss, ink; one accent" },
  { kind: "photo", file: "fern.jpg", caption: "Fern: the only green, kept for the one action" },
  { kind: "made", id: "type-hand", caption: "Caveat: the hand, for titles and labels" },
  { kind: "photo", file: "birch-path.jpg", caption: "Birch path: pale light and plenty of air" },
  { kind: "made", id: "icons", caption: "Pencil icons: wobbly graphite, hatched shade, one watercolour dab" },
  { kind: "photo", file: "pressed-petals.jpg", caption: "Pressed petals: things kept between pages" },
  { kind: "made", id: "ruled-note", caption: "Ruled note: facts written down plainly" },
  { kind: "made", id: "tape-chip", caption: "Tape labels: torn ends, filters as tape, not pills" },
  { kind: "photo", file: "tree-sketch.jpg", caption: "Trees in pencil: graphite for text, never black" },
  { kind: "made", id: "type-serif", caption: "Crimson Pro: a book serif for names and numbers" },
  { kind: "photo", file: "alpine-hut.jpg", caption: "Hut above the treeline: shelter and warmth" },
  { kind: "made", id: "tabs", caption: "Tabs: index tabs on the notebook\u2019s edge" },
  { kind: "made", id: "choice", caption: "Pick one: the answer gets circled in pencil" },
  { kind: "photo", file: "compass.jpg", caption: "Brass compass: warmth in the small things" },
  { kind: "made", id: "page-card", caption: "Clipped card: a card is a page" },
  { kind: "photo", file: "flower-notebook.jpg", caption: "Drawn cover: illustration over icons" },
  { kind: "made", id: "ruler", caption: "Slider: a pencil ruler, a paperclip for the thumb" },
  { kind: "made", id: "toggle", caption: "Toggle: on is a wash of moss inside the pencil line" },
  { kind: "photo", file: "mossy-birch.jpg", caption: "Light on moss: soft, low shadows" },
  { kind: "made", id: "checkbox", caption: "Drawn ticks: controls that feel handmade" },
  { kind: "made", id: "papers", caption: "Kraft, graph and ruled paper, stacked" },
  { kind: "made", id: "search", caption: "Search: one ruled line and a pencil" },
  { kind: "photo", file: "sketchbook.jpg", caption: "Pen landscape: thin ink lines for borders" },
  { kind: "made", id: "stamp-button", caption: "Stamped button: the one primary action" },
  { kind: "made", id: "profile-sketch", caption: "Elevation by hand: charts drawn, not plotted" },
  { kind: "photo", file: "swiss-trail.jpg", caption: "Up the ridge: what the notebook is for" },
  { kind: "made", id: "stamp", caption: "Badge: a perforated stamp" },
  { kind: "made", id: "progress", caption: "Progress: the walked part traced over, an arrow for now" },
  { kind: "made", id: "loader", caption: "Loading: a pencil sketching the mountain" },
];

const tilts = ["-rotate-1", "rotate-1", "rotate-0", "-rotate-[0.6deg]", "rotate-[0.8deg]"];

export default function FieldNotesBoard() {
  const madeCount = tiles.filter((t) => t.kind === "made").length;
  return (
    <main
      className={`${hand.variable} ${serif.variable} min-h-screen font-[family-name:var(--fn-serif)] text-[#2b2a26]`}
      style={{ background: "#efe6d0" }}
    >
      <FieldDefs />
      <style>{FIELD_KEYFRAMES}</style>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10">
        <Link
          href="/"
          className="text-sm text-black/60 underline-offset-4 hover:text-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4a6b]"
        >
          ← Hub
        </Link>
        <header className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-black/15 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-black/60">Mood board · 1 of 3</p>
            <h1 className="mt-1 font-[family-name:var(--fn-hand)] text-7xl leading-none">Field Notes</h1>
            <p className="mt-3 text-2xl">Handmade, Curious, Warm</p>
            <p className="mt-3 max-w-xl text-lg leading-snug text-black/75">
              A notebook kept on the trail: pencil, pressed leaves, tape, and a route sketched by hand. For people who want to get to
              know each walk slowly.
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[#2f4a6b]">Evokes</p>
            <p className="font-[family-name:var(--fn-hand)] text-3xl leading-tight">Turning the pages of a well-used notebook in a mountain hut.</p>
          </div>
          <p className="text-sm text-black/60">
            {tiles.length} artifacts · <span aria-hidden="true">✦</span> {madeCount} made for this board · {tiles.length - madeCount}{" "}
            collected
          </p>
        </header>

        <Overview />

        <h2 className="mt-14 font-[family-name:var(--fn-hand)] text-4xl">All {tiles.length} artifacts</h2>
        <ul className="mt-6 columns-2 gap-3 sm:gap-6 lg:columns-3 xl:columns-4">
          {tiles.map((t, i) => (
            <li key={i} className="mb-3 break-inside-avoid sm:mb-6">
              <figure
                className={`relative bg-[#fbf7ec] p-2 sm:p-3 shadow-[0_1px_2px_rgba(0,0,0,.12),0_8px_18px_rgba(60,45,20,.10)] transition duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_2px_4px_rgba(0,0,0,.14),0_16px_28px_rgba(60,45,20,.16)] ${tilts[i % tilts.length]}`}
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
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                  />
                ) : (
                  // on a phone the tile is half the screen: the piece keeps its own layout and is shown smaller, like a thumbnail
                  <div className="max-sm:[zoom:.62]">{made[t.id]}</div>
                )}
                <figcaption className="mt-2 font-[family-name:var(--fn-hand)] text-base leading-tight text-black/70 sm:text-lg">{t.caption}</figcaption>
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
