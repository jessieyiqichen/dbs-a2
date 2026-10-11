import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Libre_Franklin, Old_Standard_TT } from "next/font/google";
import credits from "@/data/credits/dawn.json";
import modern from "@/data/credits/dawn-modern.json";
import { PLATE_ICON_NAMES, PlateDefs, PlateIcon, T } from "@/components/dawn/PlateArt";
import { CatalogueSearch, DayPlates, EmbossStamp, PLATE_KEYFRAMES, PhotochromTreatment, PlateButtons, PlateCard, PlateChips, PrintCaption, PrintingLoader } from "@/components/dawn/PlateUI";
import { ColourToggle, TintTabs } from "@/components/dawn/PlateControls";

// Old Standard is a revival of a late-1800s book face; Libre Franklin revives Franklin Gothic (1902). Both are from the prints' own years.
const display = Old_Standard_TT({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--dw-display" });
const ui = Libre_Franklin({ subsets: ["latin"], weight: ["400", "600"], variable: "--dw-ui" });

export const metadata: Metadata = { title: "Dawn · Mood board · Twelve Trails" };

type Credit = (typeof credits)[number];
const print = (file: string) => credits.find((c) => c.file === file) as Credit;
const src = (file: string) => `/moodboards/dawn/${file}`;
const PAGE = "linear-gradient(180deg, #e6edeb 0%, #eaf0ee 45%, #f0f5f3 100%)";

const PALETTE = [
  { name: "Key", hex: "#22333a", role: "Text, key lines · 12.36:1", swatch: "key", from: "Deep water, Milford Sound, darkened" },
  { name: "Loch", hex: "#2c5868", role: "The one action · 7.33:1", swatch: "loch", from: "Loch Linnhe, darkened for contrast" },
  { name: "Celadon", hex: T.celadon, role: "Tint", swatch: "celadon", from: "Sky over Mirror Lake, cooled" },
  { name: "Aqua", hex: T.aqua, role: "Tint", swatch: "aqua", from: "Sky over the Mer de Glace, cooled" },
  { name: "Loch tint", hex: T.loch, role: "Tint", swatch: "loch", from: "Loch Linnhe, as printed" },
  { name: "Stone", hex: T.stone, role: "Tint", swatch: null, from: "Derived: a cool grey for rock" },
];

/* ---------- pieces made for this board ---------- */

const made: Record<string, React.ReactNode> = {
  palette: (
    <div className="grid grid-cols-3 gap-x-3 gap-y-4">
      {PALETTE.map((c) => (
        <div key={c.hex}>
          <div className="relative h-16 border border-[#22333a]/30" style={{ background: c.hex }}>
            {c.swatch && <Image src={src(`swatch-${c.swatch}.jpg`)} alt="" width={120} height={120} className="absolute -bottom-2 -right-2 h-9 w-9 border-2 border-[#f6f9f7] object-cover" />}
          </div>
          <p className="mt-2 text-sm font-semibold">{c.name} <span className="font-normal text-[#4f5f66]">{c.hex}</span></p>
          <p className="text-[11px] leading-snug text-[#4f5f66]">{c.from}</p>
        </div>
      ))}
    </div>
  ),
  "type-display": (
    <div className="py-2">
      <p className="font-[family-name:var(--dw-display)] text-7xl leading-none">Aa</p>
      <p className="mt-3 font-[family-name:var(--dw-display)] text-3xl leading-tight">Milford Track</p>
      <p className="font-[family-name:var(--dw-display)] text-xl italic text-[#4f5f66]">53.5 km, one way, in four days</p>
    </div>
  ),
  "type-ui": (
    <div className="py-2">
      <p className="text-2xl font-semibold">Best November to April</p>
      <p className="mt-1 text-base text-[#4f5f66]">Huts must be booked for the Great Walks season; no camping; one direction only.</p>
    </div>
  ),
  caption: (
    <div className="space-y-3 py-2">
      <PrintCaption n={5} text="Milford Track, New Zealand" />
      <PrintCaption n={10} text="West Highland Way, Scotland" />
      <PrintCaption n={12} text="Half Dome, United States" />
    </div>
  ),
  "plate-card": <PlateCard id="milford" photo={src("clinton-river.jpg")} plateNote="Clinton River, the track's first valley · Photoglob Co., c. 1890–1900" />,
  buttons: <div className="py-3"><PlateButtons /></div>,
  "button-states": <PlateButtons showStates />,
  tabs: <div className="py-3"><TintTabs /></div>,
  toggle: (
    <div className="space-y-4 py-3">
      <ColourToggle initial label="Show sunrise times" />
      <ColourToggle label="Permit walks only (try it)" />
    </div>
  ),
  chips: <div className="py-3"><PlateChips /></div>,
  search: <div className="py-3"><CatalogueSearch /></div>,
  progress: <div className="py-3"><DayPlates day={2} of={4} /></div>,
  loader: <PrintingLoader photo={src("te-anau-south-fjord.jpg")} />,
  icons: (
    <div className="grid grid-cols-4 gap-x-2 gap-y-3 py-1">
      {PLATE_ICON_NAMES.map((n) => (
        <div key={n} className="flex flex-col items-center">
          <PlateIcon name={n} size={40} />
          <span className="mt-1 text-[10px] text-[#4f5f66]">{n}</span>
        </div>
      ))}
    </div>
  ),
  stamp: <div className="grid place-items-center py-2"><EmbossStamp /></div>,
  treatment: <PhotochromTreatment photo={src(modern[0].file)} />,
};

/* ---------- overview ---------- */

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block bg-[#22333a] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f6f9f7]">{children}</span>;
}

function Ref({ file, note, className = "" }: { file: string; note: string; className?: string }) {
  const c = print(file);
  return (
    <figure className={`m-0 flex flex-col bg-[#f6f9f7] p-2.5 ${className}`}>
      <div className="relative min-h-0 flex-1 overflow-hidden border-[3px] border-[#22333a]">
        <Image src={src(file)} alt={c.title} width={c.w} height={c.h} className="h-full w-full object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
      </div>
      <figcaption className="mt-2 text-sm text-[#4f5f66]">{note}</figcaption>
    </figure>
  );
}

function Overview() {
  return (
    <section aria-label="Overview" className="mt-8 grid gap-3 bg-[#d9e3e1] p-3 lg:grid-cols-[1.1fr_1fr_1fr] lg:grid-rows-[240px_auto_auto]">
      <div className="relative lg:row-span-2">
        <span className="absolute left-5 top-5 z-10"><Tag>References</Tag></span>
        <Ref file="clinton-river.jpg" note="Clinton River, Milford Track: colour laid on by hand" className="h-80 lg:h-full" />
      </div>
      <Ref file="te-anau-south-fjord.jpg" note="Lake Te Anau: almost no contrast" className="h-60 lg:h-auto" />
      <Ref file="mitre-peak.jpg" note="Mitre Peak: mist kept in the valleys" className="h-60 lg:h-auto" />
      <div className="bg-[#f6f9f7] p-5 lg:col-span-2">
        <Tag>Early decisions</Tag>
        <div className="mt-3 flex flex-wrap items-end gap-6">
          <p className="font-[family-name:var(--dw-display)] text-8xl leading-[0.8]">Aa</p>
          <div>
            <p className="font-[family-name:var(--dw-display)] text-4xl leading-none">
              53.5 km <span className="italic text-[#4f5f66]">Milford Track</span>
            </p>
            <p className="mt-2 max-w-md text-sm text-[#4f5f66]">Old Standard for names, numbers and captions; Libre Franklin for everything else. Both from the prints&apos; own years. Key ink for text, never black. Only the cool half of the prints: sky, water, ice.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 bg-[#f6f9f7] p-3 lg:col-span-2">
        {PALETTE.map((c) => (
          <div key={c.hex}>
            <div className="h-20 border border-[#22333a]/30" style={{ background: c.hex }} />
            <p className="mt-1 text-xs font-semibold">{c.name}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center gap-5 bg-[#f6f9f7] p-5">
        <ColourToggle initial label="Sunrise times" />
        <PlateButtons />
      </div>
    </section>
  );
}

/* ---------- the board ---------- */

type Tile = { kind: "photo"; file: string; caption: string } | { kind: "made"; id: keyof typeof made; caption: string };

const tiles: Tile[] = [
  { kind: "photo", file: "clinton-river.jpg", caption: "Clinton River, Milford Track: the first valley, coloured by hand" },
  { kind: "made", id: "palette", caption: "Palette: every colour sampled from a print, the small crop shows where" },
  { kind: "made", id: "plate-card", caption: "Route card as a mounted print: dark edge, printed caption, then the facts" },
  { kind: "photo", file: "mirror-lake.jpg", caption: "Mirror Lake, Yosemite: the celadon sky comes from here" },
  { kind: "made", id: "type-display", caption: "Old Standard: names and numbers, like the prints' captions" },
  { kind: "made", id: "buttons", caption: "Buttons: the tint plate sits a little off; hover brings it into register" },
  { kind: "photo", file: "mont-blanc-flegere.jpg", caption: "Mont Blanc from La Flégère: snow lit warm, valleys cool" },
  { kind: "made", id: "icons", caption: "Icons: flat tint plates, slightly off register, under a fine key line" },
  { kind: "photo", file: "te-anau-south-fjord.jpg", caption: "Lake Te Anau, South Fiord: still water, almost no contrast" },
  { kind: "made", id: "tabs", caption: "Tabs: a celadon plate slides under the chosen one (try it)" },
  { kind: "made", id: "type-ui", caption: "Libre Franklin: plain words for the practical parts" },
  { kind: "photo", file: "fort-william-ben-nevis.jpg", caption: "Fort William and Ben Nevis: where the West Highland Way ends" },
  { kind: "made", id: "toggle", caption: "Toggle: off, the plate sits off register; on, it locks in and the track is printed" },
  { kind: "made", id: "caption", caption: "Caption line: numbered and set in capitals, as the prints were" },
  { kind: "photo", file: "mitre-peak.jpg", caption: "Mitre Peak, Milford Sound: mist kept in the valleys" },
  { kind: "made", id: "progress", caption: "Progress: one plate per day; today is still a touch off register" },
  { kind: "photo", file: "mer-de-glace.jpg", caption: "Mer de Glace: three walkers on the ice, the mist colour" },
  { kind: "made", id: "chips", caption: "Filters: printed labels; chosen ones drop into register" },
  { kind: "made", id: "loader", caption: "Loading: the print comes up plate by plate, sky first" },
  { kind: "photo", file: "south-dome.jpg", caption: "South Dome, as Half Dome was once called: the same granite" },
  { kind: "made", id: "search", caption: "Search the catalogue: a field with a print-mount bevel" },
  { kind: "photo", file: "loch-lomond-tarbet.jpg", caption: "Loch Lomond from Tarbet: the West Highland Way follows the far shore" },
  { kind: "made", id: "stamp", caption: "Badge: an embossed stamp, pressed into the mount" },
  { kind: "made", id: "button-states", caption: "Button states: rest, in register, pressed, focus, unprinted" },
  { kind: "photo", file: "lake-te-anau.jpg", caption: "Lake Te Anau: celadon water, one small boat" },
  { kind: "made", id: "treatment", caption: "A modern photo joins the set: toned like the prints, half the colour out, warm cream highlights" },
  { kind: "photo", file: "chamonix-floria.jpg", caption: "The Chamonix valley, where the Tour du Mont Blanc begins" },
  { kind: "photo", file: "cleddau-valley.jpg", caption: "Cleddau Valley, Milford Sound: one figure for scale" },
  { kind: "photo", file: "milford-windbound.jpg", caption: "Milford Sound from Windbound Point: depth from paler, not darker" },
  { kind: "photo", file: "matterhorn-after-sunset.jpg", caption: "Matterhorn after sunset: the one warm print, kept for the light" },
];

export default function DawnBoard() {
  const madeCount = tiles.filter((t) => t.kind === "made").length;
  return (
    <main className={`${display.variable} ${ui.variable} min-h-screen font-[family-name:var(--dw-ui)] text-[#22333a] [font-variant-numeric:lining-nums]`} style={{ background: PAGE }}>
      <PlateDefs />
      <style>{PLATE_KEYFRAMES}</style>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10">
        <Link href="/" className="text-sm text-[#4f5f66] underline-offset-4 hover:text-[#22333a] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22333a]">
          ← Hub
        </Link>
        <header className="mt-8 flex flex-wrap items-end justify-between gap-6 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4f5f66]">Mood board · 2 of 3</p>
            <h1 className="mt-2 font-[family-name:var(--dw-display)] text-8xl leading-none">Dawn</h1>
            <p className="mt-3 font-[family-name:var(--dw-display)] text-3xl italic">Quiet, Light, Hopeful</p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#4f5f66]">
              Hand-coloured travel prints from around 1900, called photochroms: pale skies, still water, colour laid on one plate at a
              time. For people who just want to see the most beautiful paths in the world, and be moved a little.
            </p>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2c5868]">Evokes</p>
            <p className="font-[family-name:var(--dw-display)] text-3xl leading-tight">Opening a box of old travel prints and finding the walk you are about to take.</p>
          </div>
          <p className="text-sm text-[#4f5f66]">
            {tiles.length} artifacts · <span aria-hidden="true">✦</span> {madeCount} made for this board · {tiles.length - madeCount} collected
          </p>
        </header>

        <Overview />

        <h2 className="mt-16 font-[family-name:var(--dw-display)] text-5xl">All {tiles.length} artifacts</h2>
        <ul className="mt-6 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {tiles.map((t, i) => (
            <li key={i} className="mb-5 break-inside-avoid">
              <figure className="relative m-0 border border-[#22333a]/10 bg-[#f6f9f7] p-3">
                {t.kind === "made" && (
                  <span className="absolute right-2.5 top-1.5 text-xs text-[#2c5868]" title="Made for this board" aria-label="Made for this board">✦</span>
                )}
                {t.kind === "photo" ? (
                  <Image
                    src={src(t.file)}
                    alt={print(t.file).title}
                    width={print(t.file).w}
                    height={print(t.file).h}
                    className="h-auto w-full border-[3px] border-[#22333a]"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  made[t.id]
                )}
                <figcaption className="mt-2.5 text-sm leading-snug text-[#4f5f66]">{t.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <section className="mt-16 border-t border-[#22333a]/20 pt-6 text-sm text-[#4f5f66]">
          <h2 className="font-[family-name:var(--dw-display)] text-3xl text-[#22333a]">Collected prints</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {credits.map((c) => (
              <li key={c.file}>
                <a href={c.source} className="underline decoration-[#8eaaa6] underline-offset-2 hover:decoration-[#22333a]">{c.title}</a>, {c.author}, {c.date}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Photochrom prints from the Library of Congress Photochrom Print Collection: no known restrictions on publication. The modern photo in the
            treatment piece is by{" "}
            <a href={modern[0].source} className="underline decoration-[#8eaaa6] underline-offset-2 hover:decoration-[#22333a]">{modern[0].author}</a> on
            Unsplash (Unsplash License). Everything marked ✦ was drawn or set for this board; its colours are sampled from the prints.
          </p>
        </section>
      </div>
    </main>
  );
}
