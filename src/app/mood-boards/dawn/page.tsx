import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import credits from "@/data/credits/dawn.json";
import skies from "@/data/dawn-skies.json";
import { DAWN_ICON_NAMES, DAWN_KEYFRAMES, DawnDefs, DawnIcon, StartSlider, SunArc, SunriseLoader } from "@/components/dawn/DawnArt";
import SunToggle from "@/components/dawn/SunToggle";
import { PhotoBookPreview } from "@/components/dawn/PhotoBook";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--dw-display" });
const ui = Mulish({ subsets: ["latin"], weight: ["300", "400", "600"], variable: "--dw-ui" });

export const metadata: Metadata = { title: "Dawn · Mood board · Twelve Trails" };

type Credit = (typeof credits)[number];
const photo = (file: string) => credits.find((c) => c.file === file) as Credit;

const TWILIGHT = "#2e3150";
const PALETTE = [
  { name: "Haze", hex: "#f6f3f8", dark: false },
  { name: "Lilac", hex: "#cfc4e6", dark: false },
  { name: "Sky", hex: "#a9c3e6", dark: false },
  { name: "Violet", hex: "#5b4fc4", dark: true },
  { name: "Twilight", hex: "#2e3150", dark: true },
];
const SKY = "linear-gradient(180deg, #e9e4f5 0%, #dfe8f5 55%, #f6f3f8 100%)";
const glass = "rounded-[20px] border border-white/70 bg-white/60 backdrop-blur-md shadow-[0_0_40px_rgba(150,140,220,.18)]";

/* ---------- pieces made for this board ---------- */

const made: Record<string, React.ReactNode> = {
  palette: (
    <div className="grid grid-cols-5 gap-1.5">
      {PALETTE.map((c) => (
        <div key={c.hex}>
          <div className="h-20 rounded-xl border border-black/5" style={{ background: c.hex }} />
          <p className="mt-1.5 text-xs font-semibold">{c.name}</p>
          <p className="text-[10px] tracking-wide text-[#5d6180]">{c.hex}</p>
        </div>
      ))}
    </div>
  ),
  "first-light": (
    <div className="flex h-44 items-end rounded-2xl p-4" style={{ background: "linear-gradient(180deg, #4a4f8a 0%, #8f8fd0 35%, #cfc4e6 65%, #eef0fa 100%)" }}>
      <span className="font-[family-name:var(--dw-display)] text-2xl italic text-white">first light</span>
    </div>
  ),
  "type-display": (
    <div className="py-4 text-center">
      <p className="font-[family-name:var(--dw-display)] text-8xl font-light leading-none">Aa</p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#5d6180]">Cormorant Garamond · light</p>
    </div>
  ),
  "type-name": (
    <div className="py-3">
      <p className="font-[family-name:var(--dw-display)] text-5xl font-light leading-none">Laugavegur</p>
      <p className="mt-2 font-[family-name:var(--dw-display)] text-2xl italic text-[#5d6180]">1,050–1,100 m at Hrafntinnusker</p>
    </div>
  ),
  "type-ui": (
    <div className="space-y-2 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5d6180]">Best months</p>
      <p className="text-xl font-light">June to September</p>
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#5d6180]">Mulish · for everything else</p>
    </div>
  ),
  ridges: (
    <div className="grid grid-cols-5 gap-2 py-1">
      {(Object.entries(skies) as [string, string[]][]).map(([file, stops]) => (
        <div key={file}>
          <div className="h-28 rounded-full" style={{ background: `linear-gradient(180deg, ${stops.join(", ")})` }} />
          <Image src={`/moodboards/dawn/${file}.jpg`} alt="" width={photo(`${file}.jpg`).w} height={photo(`${file}.jpg`).h} className="mt-2 aspect-square w-full rounded-full object-cover" sizes="60px" />
        </div>
      ))}
    </div>
  ),
  icons: (
    <div className="grid grid-cols-4 gap-x-2 gap-y-3 py-2">
      {DAWN_ICON_NAMES.map((n) => (
        <div key={n} className="flex flex-col items-center">
          <DawnIcon name={n} size={40} />
          <span className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#5d6180]">{n}</span>
        </div>
      ))}
    </div>
  ),
  chips: (
    <div className="flex flex-wrap gap-2 py-4">
      <span className="flex items-center gap-1.5 rounded-full bg-white/80 py-1.5 pl-2 pr-4 text-sm shadow-[0_0_22px_rgba(255,241,184,.9),0_0_0_1px_#cfc4e6]">
        <DawnIcon name="sunrise" size={22} />
        Day hikes
      </span>
      <span className="rounded-full border border-[#cfc4e6] bg-white/40 px-4 py-1.5 text-sm text-[#5d6180]">Multi-day</span>
      <span className="rounded-full border border-[#cfc4e6] bg-white/40 px-4 py-1.5 text-sm text-[#5d6180]">Permit</span>
    </div>
  ),
  buttons: (
    <div className="flex flex-wrap items-center gap-3 py-5">
      <span
        className="relative overflow-hidden rounded-full px-7 py-3 [background-position:0_15%] hover:[background-position:0_60%] text-sm font-semibold text-white shadow-[0_0_28px_rgba(91,79,196,.35)] transition-[box-shadow,background-position] duration-[1200ms] [transition-timing-function:cubic-bezier(.45,0,.2,1)] hover:shadow-[0_0_40px_rgba(255,241,184,.7)]"
        style={{ backgroundImage: "linear-gradient(0deg, #fff1b8 0%, #cfc4e6 18%, #5b4fc4 45%, #2e3150 100%)", backgroundSize: "100% 260%" }}
      >
        See the walk
      </span>
      <span className="rounded-full border border-white/80 bg-white/50 px-6 py-3 text-sm backdrop-blur">Later</span>
      <span className="grid h-11 w-11 place-items-center rounded-full border border-white/80 bg-white/50 backdrop-blur">
        <DawnIcon name="map" size={24} label="Map" />
      </span>
    </div>
  ),
  tabs: (
    <div className="flex gap-6 py-5 text-sm">
      <span className="relative pb-2 font-semibold">
        Overview
        <span className="absolute inset-x-[-6px] -bottom-0.5 h-[3px] rounded-full bg-[#fff1b8] shadow-[0_0_12px_4px_rgba(255,241,184,.9)] motion-safe:animate-[dw-pulse_6s_ease-in-out_infinite]" />
      </span>
      <span className="pb-2 text-[#5d6180]">Route</span>
      <span className="pb-2 text-[#5d6180]">When to go</span>
    </div>
  ),
  search: (
    <div className="py-4">
      <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-3 shadow-[0_0_30px_rgba(150,140,220,.18)] backdrop-blur">
        <DawnIcon name="compass" size={22} />
        <span className="font-[family-name:var(--dw-display)] text-lg italic text-[#5d6180]">Where will you be at sunrise?</span>
      </div>
    </div>
  ),
  slider: <StartSlider />,
  "sun-arc": (
    <div className="py-2">
      <SunArc progress={0.4} caption="Day 2 of 4 · Milford Track" />
    </div>
  ),
  "glass-card": (
    <div className="rounded-2xl p-3" style={{ background: "linear-gradient(160deg, #cfc4e6, #a9c3e6)" }}>
      <div className={`${glass} relative overflow-hidden p-4 transition duration-700 hover:shadow-[0_0_50px_rgba(255,241,184,.6)]`}>
        <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(#fff1b8,transparent_70%)]" />
        <div className="flex items-start justify-between">
          <p className="font-[family-name:var(--dw-display)] text-3xl font-light leading-none">Milford Track</p>
          <DawnIcon name="tent" size={30} />
        </div>
        <p className="mt-2 text-sm text-[#5d6180]">53.5 km · 4 days · November to April</p>
        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-[#5b4fc4]/50 to-transparent" />
        <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#5d6180]">Huts booked · one way only</p>
      </div>
    </div>
  ),
  toggle: (
    <div className="space-y-3 py-4">
      <SunToggle initial label="Show sunrise times" />
      <SunToggle label="Permit walks only (tap me)" />
    </div>
  ),
  profile: (
    <div className="relative py-4 pl-1">
      <span className="absolute right-2 top-3 h-12 w-12 rounded-full bg-[radial-gradient(#fff1b8,transparent_68%)]" />
      {[
        ["53.5", "km, one way"],
        ["4", "days, huts booked"],
        ["1,140–1,154", "metres at Mackinnon Pass"],
      ].map(([n, l], i) => (
        <div key={l} className={i ? "mt-3 border-t border-[#cfc4e6] pt-3" : ""}>
          <p className="font-[family-name:var(--dw-display)] text-4xl font-light leading-none">{n}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#5d6180]">{l}</p>
        </div>
      ))}
    </div>
  ),
  hours: (
    <div className="py-4">
      <div className="flex justify-between">
        {["#2e3150", "#5b4fc4", "#8f8fd0", "#cfc4e6", "#eef0fa"].map((c) => (
          <span key={c} className="h-9 w-9 rounded-full border border-black/5" style={{ background: c }} />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-[#5d6180]">
        <span>4:30</span>
        <span>5:00</span>
        <span>5:30</span>
        <span>6:00</span>
        <span>6:30</span>
      </div>
    </div>
  ),
  breathe: (
    <div className="py-2">
      <SunriseLoader />
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-[#5d6180]">Loading the walk…</p>
    </div>
  ),
};

/* ---------- overview: references, early decisions, palette, one component ---------- */

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-[#2e3150] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">{children}</span>;
}

function Ref({ file, note, className = "" }: { file: string; note: string; className?: string }) {
  const c = photo(file);
  return (
    <figure className={`relative overflow-hidden rounded-[20px] ${className}`}>
      <Image src={`/moodboards/dawn/${file}`} alt={note} width={c.w} height={c.h} className="h-full w-full object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
      <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-white/75 px-3 py-1 text-sm backdrop-blur">{note}</figcaption>
    </figure>
  );
}

function Overview() {
  return (
    <section aria-label="Overview" className="mt-8 grid gap-3 rounded-[28px] bg-white/40 p-3 lg:grid-cols-[1.1fr_1fr_1fr] lg:grid-rows-[220px_auto_auto]">
      <div className="relative lg:row-span-2">
        <span className="absolute left-3 top-3 z-10"><Tag>References</Tag></span>
        <Ref file="layered-ridges.jpg" note="Layered ridges: depth from paler, not darker" className="h-72 lg:h-full" />
      </div>
      <Ref file="cloud-sea.jpg" note="Cloud sea: lilac, never orange" className="h-56 lg:h-auto" />
      <Ref file="lone-boat.jpg" note="Lone boat: space around one thing" className="h-56 lg:h-auto" />
      <div className={`${glass} p-5 lg:col-span-2`}>
        <Tag>Early decisions</Tag>
        <div className="mt-3 flex flex-wrap items-end gap-6">
          <p className="font-[family-name:var(--dw-display)] text-8xl font-light leading-[0.8]">Aa</p>
          <div>
            <p className="font-[family-name:var(--dw-display)] text-4xl font-light leading-none">
              19.4 km <span className="italic text-[#5d6180]">across Tongariro</span>
            </p>
            <p className="mt-2 max-w-md text-sm text-[#5d6180]">Cormorant Garamond, light, for names and numbers; Mulish for everything else. Twilight text, never black.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 lg:col-span-2">
        {PALETTE.map((c) => (
          <div key={c.hex} className="flex h-28 items-end rounded-2xl border border-black/5 p-3" style={{ background: c.hex, color: c.dark ? "#fff" : TWILIGHT }}>
            <span className="text-sm font-semibold">{c.name}</span>
          </div>
        ))}
      </div>
      <div className={`${glass} flex flex-col justify-center gap-4 p-5`}>
        <SunToggle initial label="Sunrise times" />
        <span
          className="block rounded-full py-3 text-center text-sm font-semibold text-white shadow-[0_0_28px_rgba(91,79,196,.35)]"
          style={{ backgroundImage: "linear-gradient(0deg, #fff1b8 0%, #cfc4e6 18%, #5b4fc4 45%, #2e3150 100%)", backgroundSize: "100% 260%", backgroundPosition: "0 15%" }}
        >
          See the walk
        </span>
      </div>
    </section>
  );
}

/* ---------- the board ---------- */

type Tile = { kind: "photo"; file: string; caption: string } | { kind: "made"; id: keyof typeof made; caption: string };

const tiles: Tile[] = [
  { kind: "photo", file: "pale-valley.jpg", caption: "Pale valley: the page is mostly air" },
  { kind: "made", id: "palette", caption: "Haze, lilac, sky, violet, twilight: one accent" },
  { kind: "made", id: "type-display", caption: "Cormorant, light: names whispered, not shouted" },
  { kind: "photo", file: "lavender-fog-trees.jpg", caption: "Lavender fog: the colour of waiting" },
  { kind: "made", id: "first-light", caption: "First light: the only gradient that matters" },
  { kind: "photo", file: "fog-island.jpg", caption: "Fog island: one subject, lots of grey" },
  { kind: "made", id: "type-name", caption: "Names and numbers, set large and thin" },
  { kind: "made", id: "chips", caption: "Filters: the chosen one catches the light" },
  { kind: "photo", file: "lone-tree-fog.jpg", caption: "Lone tree: emptiness is the layout" },
  { kind: "made", id: "ridges", caption: "Skies sampled from the photos, top to bottom: where the palette comes from" },
  { kind: "made", id: "type-ui", caption: "Mulish: small labels, wide tracking" },
  { kind: "photo", file: "misty-lake.jpg", caption: "Misty lake: reflections, not shadows" },
  { kind: "made", id: "glass-card", caption: "Glass card: a horizon line, light leaking in" },
  { kind: "made", id: "tabs", caption: "Tabs: the selected one is a line of first light" },
  { kind: "made", id: "slider", caption: "Start time: night to morning, the sun as the thumb" },
  { kind: "photo", file: "cliff-in-cloud.jpg", caption: "Cliff in cloud: the foreground can wait" },
  { kind: "made", id: "buttons", caption: "The main button rises like a sunrise on hover" },
  { kind: "made", id: "icons", caption: "Dawn icons: a fine line over a soft wash, horizons that fade, one point of light" },
  { kind: "photo", file: "misty-birches.jpg", caption: "Misty birches: soft, layered light" },
  { kind: "made", id: "toggle", caption: "Toggle: tap it; the sun climbs an arc as night fades to day" },
  { kind: "made", id: "profile", caption: "Numbers, quietly: thin, large, with air between" },
  { kind: "photo", file: "lilac-dusk.jpg", caption: "Lilac dusk: the one darker note" },
  { kind: "made", id: "hours", caption: "4:30 to 6:30: colour changes slowly" },
  { kind: "photo", file: "fog-meadow.jpg", caption: "Fog meadow: texture without contrast" },
  { kind: "made", id: "breathe", caption: "Loading: the sky warms, mist drifts, the sun comes out of a blur" }
  ,{ kind: "made", id: "sun-arc", caption: "Progress as the sun\u2019s arc across the day" },
  { kind: "photo", file: "cloud-sea.jpg", caption: "Cloud sea: above it all, quietly" },
  { kind: "made", id: "search", caption: "Search asks where you will be at sunrise" },
  { kind: "photo", file: "lone-boat.jpg", caption: "Lone boat: space around one thing" },
  { kind: "photo", file: "layered-ridges.jpg", caption: "Layered ridges: the palette, in a photo" },
];

export default function DawnBoard() {
  const madeCount = tiles.filter((t) => t.kind === "made").length;
  return (
    <main className={`${display.variable} ${ui.variable} min-h-screen font-[family-name:var(--dw-ui)] text-[#2e3150] [font-variant-numeric:lining-nums]`} style={{ background: SKY }}>
      <DawnDefs />
      <style>{DAWN_KEYFRAMES}</style>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10">
        <Link
          href="/"
          className="text-sm text-[#5d6180] underline-offset-4 hover:text-[#2e3150] hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b4fc4]"
        >
          ← Hub
        </Link>
        <header className="mt-8 flex flex-wrap items-end justify-between gap-6 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5d6180]">Mood board · 2 of 3</p>
            <h1 className="mt-2 font-[family-name:var(--dw-display)] text-8xl font-light leading-none">Dawn</h1>
            <p className="mt-3 font-[family-name:var(--dw-display)] text-3xl italic">Quiet, Light, Hopeful</p>
            <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-[#5d6180]">
              The hour before a long walk: cloud in the valley, the sky turning from violet to pale blue. For people who just want to
              see the most beautiful paths in the world, and be moved a little.
            </p>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5b4fc4]">Evokes</p>
            <p className="font-[family-name:var(--dw-display)] text-3xl font-light leading-tight">Stepping out of the tent before sunrise, the valley still under cloud.</p>
          </div>
          <p className="text-sm text-[#5d6180]">
            {tiles.length} artifacts · <span aria-hidden="true">✦</span> {madeCount} made for this board · {tiles.length - madeCount}{" "}
            collected
          </p>
        </header>

        <PhotoBookPreview />

        <Overview />

        <h2 className="mt-16 font-[family-name:var(--dw-display)] text-5xl font-light">All {tiles.length} artifacts</h2>
        <ul className="mt-6 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {tiles.map((t, i) => (
            <li key={i} className="mb-5 break-inside-avoid">
              <figure className={`relative p-3 transition duration-700 ease-in-out hover:-translate-y-0.5 hover:bg-white/80 ${glass}`}>
                {t.kind === "made" && (
                  <span className="absolute right-3 top-2 text-xs text-[#5b4fc4]" title="Made for this board" aria-label="Made for this board">
                    ✦
                  </span>
                )}
                {t.kind === "photo" ? (
                  <Image
                    src={`/moodboards/dawn/${t.file}`}
                    alt={t.caption}
                    width={photo(t.file).w}
                    height={photo(t.file).h}
                    className="h-auto w-full rounded-xl"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  made[t.id]
                )}
                <figcaption className="mt-2 text-sm font-light leading-snug text-[#5d6180]">{t.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <section className="mt-16 border-t border-[#cfc4e6] pt-6 text-sm text-[#5d6180]">
          <h2 className="font-[family-name:var(--dw-display)] text-3xl font-light text-[#2e3150]">Collected photos</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {credits.map((c) => (
              <li key={c.file}>
                Photo by{" "}
                <a href={c.source} className="underline decoration-[#cfc4e6] underline-offset-2 hover:decoration-[#5b4fc4]">
                  {c.author}
                </a>{" "}
                on Unsplash ({c.title})
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Used under the{" "}
            <a href="https://unsplash.com/license" className="underline decoration-[#cfc4e6] underline-offset-2 hover:decoration-[#5b4fc4]">
              Unsplash License
            </a>
            . Everything marked ✦ was drawn or set for this board.
          </p>
        </section>
      </div>
    </main>
  );
}
