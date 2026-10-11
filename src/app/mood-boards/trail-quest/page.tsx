import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fredoka, Nunito } from "next/font/google";
import credits from "@/data/credits/trail-quest.json";

const display = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--tq-display" });
const ui = Nunito({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--tq-ui" });

export const metadata: Metadata = { title: "Trail Quest · Mood board · Twelve Trails" };

type Credit = (typeof credits)[number];
const photo = (file: string) => credits.find((c) => c.file === file) as Credit;

const PALETTE = [
  { name: "Night", hex: "#1b1d4a", ink: "#fff" },
  { name: "Card", hex: "#2a2e78", ink: "#fff" },
  { name: "Electric", hex: "#3b5bff", ink: "#fff" },
  { name: "Lime", hex: "#5ef08a", ink: "#14162b" },
  { name: "Sun", hex: "#ffe14d", ink: "#14162b" },
];

const card = "rounded-3xl bg-[#2a2e78] shadow-[0_6px_0_#151745]";
const press =
  "inline-block rounded-2xl bg-[#5ef08a] px-7 py-3 font-[family-name:var(--tq-display)] text-xl font-bold uppercase tracking-wide text-[#14162b] shadow-[0_6px_0_#2fb860] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_0_#2fb860] active:translate-y-1 active:shadow-[0_2px_0_#2fb860]";

/* ---------- pieces made for this board ---------- */

function Star({ on = true, size = 28 }: { on?: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill={on ? "#ffe14d" : "#3b3f99"} stroke={on ? "#e0b800" : "#4b52c4"} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function Badge({ label, fill, icon }: { label: string; fill: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="grid h-16 w-16 place-items-center rounded-2xl text-[#14162b] shadow-[0_4px_0_rgba(0,0,0,.35)]" style={{ background: fill }}>
        {icon}
      </span>
      <span className="text-center text-[11px] font-extrabold leading-tight">{label}</span>
    </div>
  );
}

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#14162b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const made: Record<string, React.ReactNode> = {
  palette: (
    <div className="grid grid-cols-5 gap-1.5">
      {PALETTE.map((c) => (
        <div key={c.hex}>
          <div className="h-20 rounded-2xl border-2 border-white/15" style={{ background: c.hex }} />
          <p className="mt-1.5 text-xs font-extrabold">{c.name}</p>
          <p className="text-[10px] text-[#b9bdf0]">{c.hex}</p>
        </div>
      ))}
    </div>
  ),
  "type-display": (
    <div className="py-4 text-center">
      <p className="font-[family-name:var(--tq-display)] text-8xl font-bold leading-none text-[#ffe14d] [text-shadow:0_5px_0_#b38f00]">Aa</p>
      <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#b9bdf0]">Fredoka · bold and round</p>
    </div>
  ),
  "type-ui": (
    <div className="space-y-1 py-3">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#b9bdf0]">Best months</p>
      <p className="text-2xl font-extrabold">Jun → Sep</p>
      <p className="text-xs font-bold text-[#b9bdf0]">Nunito · for everything else</p>
    </div>
  ),
  "level-card": (
    <div className={`${card} p-4`}>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#3b5bff] px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider">Level 7</span>
        <span className="flex gap-0.5">
          <Star />
          <Star />
          <Star on={false} />
        </span>
      </div>
      <p className="mt-3 font-[family-name:var(--tq-display)] text-3xl font-bold leading-none">Tour du Mont Blanc</p>
      <p className="mt-1.5 text-sm font-bold text-[#b9bdf0]">165–170 km · 3 countries · loop</p>
    </div>
  ),
  "xp-bar": (
    <div className="py-3">
      <div className="flex items-baseline justify-between">
        <span className="font-[family-name:var(--tq-display)] text-lg font-bold">Altitude</span>
        <span className="text-sm font-extrabold text-[#ffe14d]">4,215 m</span>
      </div>
      <div className="mt-2 h-5 overflow-hidden rounded-full bg-[#14162b] p-1">
        <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-[#5ef08a] to-[#ffe14d]" />
      </div>
      <p className="mt-2 text-xs font-bold text-[#b9bdf0]">Inca Trail · 2nd highest of the twelve</p>
    </div>
  ),
  badges: (
    <div className="grid grid-cols-3 gap-2 py-2">
      <Badge label="4,000 m club" fill="#ffe14d" icon={icon("M3 20 L10 8 L14 14 L17 10 L21 20 Z")} />
      <Badge label="Permit holder" fill="#5ef08a" icon={icon("M7 4 h10 v16 H7 Z M10 9 h4 M10 13 h4")} />
      <Badge label="One way only" fill="#8fb3ff" icon={icon("M4 12 h14 M13 6 l6 6 l-6 6")} />
    </div>
  ),
  "start-button": (
    <div className="py-5 text-center">
      <span className={press}>Start →</span>
    </div>
  ),
  "ghost-button": (
    <div className="flex items-center justify-center gap-3 py-5">
      <span className="rounded-2xl border-2 border-[#4b52c4] px-6 py-2.5 font-[family-name:var(--tq-display)] text-lg font-semibold">Later</span>
      <span className="rounded-2xl bg-[#3b5bff] px-6 py-2.5 font-[family-name:var(--tq-display)] text-lg font-semibold shadow-[0_5px_0_#2238b8]">Map</span>
    </div>
  ),
  difficulty: (
    <div className="space-y-2 py-2 text-sm font-extrabold">
      {[
        ["Moderate", 2],
        ["Challenging", 3],
        ["Strenuous", 4],
      ].map(([l, n]) => (
        <div key={l as string} className="flex items-center justify-between">
          <span>{l}</span>
          <span className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className={`h-3.5 w-6 rounded-full ${i <= (n as number) ? "bg-[#5ef08a]" : "bg-[#3b3f99]"}`} />
            ))}
          </span>
        </div>
      ))}
    </div>
  ),
  segmented: (
    <div className="py-4">
      <div className="flex rounded-2xl bg-[#14162b] p-1.5 text-sm font-extrabold">
        <span className="flex-1 rounded-xl bg-[#3b5bff] py-2 text-center shadow-[0_3px_0_#2238b8]">All 12</span>
        <span className="flex-1 py-2 text-center text-[#b9bdf0]">Day</span>
        <span className="flex-1 py-2 text-center text-[#b9bdf0]">Multi-day</span>
      </div>
    </div>
  ),
  toggle: (
    <div className="flex items-center gap-3 py-5">
      <span className="relative inline-block h-9 w-16 rounded-full bg-[#5ef08a] shadow-[inset_0_-3px_0_#2fb860]">
        <span className="absolute right-1 top-1 h-7 w-7 rounded-full bg-white shadow-[0_3px_0_rgba(0,0,0,.25)]" />
      </span>
      <span className="text-sm font-extrabold">Permit trails only</span>
    </div>
  ),
  "level-map": (
    <svg viewBox="0 0 260 200" className="block h-auto w-full" role="img" aria-label="A winding level map with twelve stops">
      <path d="M20 180 C 80 180, 60 130, 120 130 S 220 120, 200 80 S 90 70, 80 40 S 180 10, 240 24" fill="none" stroke="#3b3f99" strokeWidth="10" strokeLinecap="round" />
      <path d="M20 180 C 80 180, 60 130, 120 130 S 200 125, 205 100" fill="none" stroke="#5ef08a" strokeWidth="10" strokeLinecap="round" />
      {[
        [20, 180, 1],
        [70, 162, 1],
        [120, 130, 1],
        [175, 126, 1],
        [205, 100, 1],
        [190, 74, 0],
        [130, 70, 0],
        [86, 46, 0],
        [120, 26, 0],
        [170, 18, 0],
        [210, 18, 0],
        [240, 24, 0],
      ].map(([x, y, done], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="11" fill={done ? "#ffe14d" : "#2a2e78"} stroke={done ? "#e0b800" : "#4b52c4"} strokeWidth="3" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill={done ? "#14162b" : "#b9bdf0"}>
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  ),
  stats: (
    <div className="grid grid-cols-3 gap-2 py-2">
      {[
        ["Km", "165–170"],
        ["Days", "7–11"],
        ["Peak", "2,537 m"],
      ].map(([k, v]) => (
        <div key={k} className="rounded-2xl bg-[#14162b] p-2.5 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#b9bdf0]">{k}</p>
          <p className="mt-0.5 font-[family-name:var(--tq-display)] text-lg font-bold leading-tight">{v}</p>
        </div>
      ))}
    </div>
  ),
  locked: (
    <div className={`${card} relative overflow-hidden p-4`}>
      <div className="opacity-40">
        <p className="font-[family-name:var(--tq-display)] text-2xl font-bold">Half Dome</p>
        <p className="text-sm font-bold">Cables up late May to mid-October</p>
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <span className="flex items-center gap-2 rounded-full bg-[#14162b] px-4 py-1.5 text-sm font-extrabold">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#ffe14d" strokeWidth="2.5" aria-hidden="true">
            <path d="M6 11 h12 v9 H6 Z M8.5 11 V8 a3.5 3.5 0 0 1 7 0 v3" />
          </svg>
          Permit lottery
        </span>
      </div>
    </div>
  ),
  toast: (
    <div className="py-4">
      <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-[#14162b] shadow-[0_6px_0_rgba(0,0,0,.3)]">
        <Star size={34} />
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#3b5bff]">New badge</p>
          <p className="font-[family-name:var(--tq-display)] text-xl font-bold leading-tight">Over 4,000 m</p>
        </div>
      </div>
    </div>
  ),
  glow: (
    <div className="relative h-44 overflow-hidden rounded-3xl bg-[#1b1d4a]">
      <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#3b5bff] opacity-70 blur-3xl" />
      <div className="absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-[#8f6bff] opacity-60 blur-3xl" />
      <div className="absolute bottom-6 left-16 h-16 w-16 rounded-full bg-[#5ef08a] opacity-40 blur-2xl" />
    </div>
  ),
  bounce: (
    <div className="grid h-40 place-items-center">
      <span className="motion-safe:animate-bounce">
        <Star size={56} />
      </span>
    </div>
  ),
  ring: (
    <div className="grid place-items-center py-3">
      <svg viewBox="0 0 120 120" className="h-36 w-36" role="img" aria-label="Progress ring, five of twelve trails">
        <circle cx="60" cy="60" r="48" fill="none" stroke="#14162b" strokeWidth="14" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="#5ef08a" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${(5 / 12) * 301.6} 301.6`} transform="rotate(-90 60 60)" />
        <text x="60" y="58" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff" fontFamily="var(--tq-display)">
          5/12
        </text>
        <text x="60" y="78" textAnchor="middle" fontSize="10" fontWeight="800" fill="#b9bdf0">
          TRAILS
        </text>
      </svg>
    </div>
  ),
};

/* ---------- overview: references, early decisions, palette, one component ---------- */

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-[#ffe14d] px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#14162b]">{children}</span>;
}

function Ref({ file, note, className = "" }: { file: string; note: string; className?: string }) {
  const c = photo(file);
  return (
    <figure className={`relative overflow-hidden rounded-3xl shadow-[0_6px_0_#151745] ${className}`}>
      <Image src={`/moodboards/trail-quest/${file}`} alt={note} width={c.w} height={c.h} className="h-full w-full object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
      <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-[#14162b]/85 px-3 py-1.5 text-sm font-extrabold">{note}</figcaption>
    </figure>
  );
}

function Overview() {
  return (
    <section aria-label="Overview" className="mt-8 grid gap-4 rounded-[32px] bg-[#14162b]/60 p-4 lg:grid-cols-[1.1fr_1fr_1fr] lg:grid-rows-[220px_auto_auto]">
      <div className="relative lg:row-span-2">
        <span className="absolute left-3 top-3 z-10"><Tag>References</Tag></span>
        <Ref file="summit-jump.jpg" note="Summit jump: every trail is a win" className="h-72 lg:h-full" />
      </div>
      <Ref file="glacier-lake.jpg" note="Glacier lake: saturated, but cool" className="h-56 lg:h-auto" />
      <Ref file="blue-ice.jpg" note="Blue ice: chunky, glossy shapes" className="h-56 lg:h-auto" />
      <div className={`${card} p-5 lg:col-span-2`}>
        <Tag>Early decisions</Tag>
        <div className="mt-3 flex flex-wrap items-end gap-6">
          <p className="font-[family-name:var(--tq-display)] text-8xl font-bold leading-[0.8] text-[#ffe14d] [text-shadow:0_5px_0_#b38f00]">Aa</p>
          <div>
            <p className="font-[family-name:var(--tq-display)] text-4xl font-bold leading-none">
              Level 12 <span className="text-[#5ef08a]">· 769–800 km</span>
            </p>
            <p className="mt-2 max-w-md text-sm font-bold text-[#b9bdf0]">Fredoka for names, numbers and buttons; Nunito, heavy, for everything else. White text on night blue.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 lg:col-span-2">
        {PALETTE.map((c) => (
          <div key={c.hex} className="flex h-28 items-end rounded-2xl border-2 border-white/15 p-3 shadow-[0_4px_0_rgba(0,0,0,.35)]" style={{ background: c.hex, color: c.ink }}>
            <span className="text-sm font-extrabold">{c.name}</span>
          </div>
        ))}
      </div>
      <div className={`${card} flex flex-col items-center justify-center gap-5 p-5`}>
        <span className="flex items-center gap-1">
          <Star />
          <Star />
          <Star on={false} />
        </span>
        <span className={press}>Start →</span>
      </div>
    </section>
  );
}

/* ---------- the board ---------- */

type Tile = { kind: "photo"; file: string; caption: string } | { kind: "made"; id: keyof typeof made; caption: string };

const tiles: Tile[] = [
  { kind: "made", id: "palette", caption: "Night, card, electric, lime, sun: lime is the go button" },
  { kind: "photo", file: "turquoise-lake.jpg", caption: "Turquoise lake: colour turned up" },
  { kind: "made", id: "level-card", caption: "Each trail is a level card" },
  { kind: "made", id: "type-display", caption: "Fredoka: round, bold, a little bouncy" },
  { kind: "photo", file: "arms-up.jpg", caption: "Arms up: the feeling after the last climb" },
  { kind: "made", id: "start-button", caption: "The big button presses down 4px" },
  { kind: "made", id: "xp-bar", caption: "Altitude as an XP bar" },
  { kind: "photo", file: "peyto-lake.jpg", caption: "Peyto blue: one hero colour" },
  { kind: "made", id: "badges", caption: "Facts become badges" },
  { kind: "made", id: "level-map", caption: "Twelve trails, twelve levels" },
  { kind: "photo", file: "snow-jump.jpg", caption: "Snow jump: energy, mid-air" },
  { kind: "made", id: "segmented", caption: "Filters as a segmented switch" },
  { kind: "made", id: "stats", caption: "Stats in chunky tiles" },
  { kind: "photo", file: "green-hill.jpg", caption: "Green hill: the level-select backdrop" },
  { kind: "made", id: "locked", caption: "Locked: a permit is the key" },
  { kind: "made", id: "difficulty", caption: "Difficulty as filled pips" },
  { kind: "photo", file: "scramble.jpg", caption: "Scramble: hands on rock, a boss stage" },
  { kind: "made", id: "toast", caption: "Success pops in as a toast" },
  { kind: "made", id: "toggle", caption: "Toggle: fat and clicky" },
  { kind: "photo", file: "rainbow-tent.jpg", caption: "Rainbow camp: a reward screen" },
  { kind: "made", id: "ring", caption: "Progress ring: 5 of 12" },
  { kind: "made", id: "ghost-button", caption: "Secondary: outline or electric, never lime" },
  { kind: "photo", file: "blue-ice.jpg", caption: "Blue ice: glossy, chunky shapes" },
  { kind: "made", id: "bounce", caption: "Motion: snappy, with a bounce" },
  { kind: "made", id: "type-ui", caption: "Nunito, heavy: labels you can read at a glance" },
  { kind: "photo", file: "glacier-lake.jpg", caption: "Glacier lake: saturated, but cool" },
  { kind: "made", id: "glow", caption: "Night-blue with soft glows" },
  { kind: "photo", file: "summit-jump.jpg", caption: "Summit jump: every trail is a win" },
];

export default function TrailQuestBoard() {
  const madeCount = tiles.filter((t) => t.kind === "made").length;
  return (
    <main
      className={`${display.variable} ${ui.variable} min-h-screen font-[family-name:var(--tq-ui)] text-white`}
      style={{ background: "radial-gradient(1200px 600px at 10% -10%, #3b5bff55, transparent), radial-gradient(900px 500px at 100% 10%, #8f6bff44, transparent), #1b1d4a" }}
    >
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10">
        <Link
          href="/"
          className="text-sm font-bold text-[#b9bdf0] underline-offset-4 hover:text-white hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe14d]"
        >
          ← Hub
        </Link>
        <header className="mt-8 flex flex-wrap items-end justify-between gap-6 pb-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#b9bdf0]">Mood board · 3 of 3</p>
            <h1 className="mt-2 font-[family-name:var(--tq-display)] text-7xl font-bold leading-none text-[#ffe14d] [text-shadow:0_6px_0_#b38f00] sm:text-8xl">
              Trail Quest
            </h1>
            <p className="mt-4 font-[family-name:var(--tq-display)] text-3xl font-semibold">Playful, Bright, Game-like</p>
            <p className="mt-3 max-w-xl text-base font-bold leading-relaxed text-[#b9bdf0]">
              A modern mobile game where each famous walk is a level: stars, badges, an altitude bar, a big button that presses down.
              For people who want to collect these trails and treat each one as a challenge.
            </p>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.24em] text-[#5ef08a]">Evokes</p>
            <p className="font-[family-name:var(--tq-display)] text-3xl font-semibold leading-tight">Unlocking the next level and hearing the little chime.</p>
          </div>
          <p className="text-sm font-bold text-[#b9bdf0]">
            {tiles.length} artifacts · <span aria-hidden="true">✦</span> {madeCount} made for this board · {tiles.length - madeCount}{" "}
            collected
          </p>
        </header>

        <Overview />

        <h2 className="mt-16 font-[family-name:var(--tq-display)] text-5xl font-bold">All {tiles.length} artifacts</h2>
        <ul className="mt-6 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {tiles.map((t, i) => (
            <li key={i} className="mb-5 break-inside-avoid">
              <figure className={`relative p-3 transition-transform duration-200 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1 hover:scale-[1.02] ${card}`}>
                {t.kind === "made" && (
                  <span className="absolute right-3 top-2 text-xs text-[#ffe14d]" title="Made for this board" aria-label="Made for this board">
                    ✦
                  </span>
                )}
                {t.kind === "photo" ? (
                  <Image
                    src={`/moodboards/trail-quest/${t.file}`}
                    alt={t.caption}
                    width={photo(t.file).w}
                    height={photo(t.file).h}
                    className="h-auto w-full rounded-2xl"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  made[t.id]
                )}
                <figcaption className="mt-2 text-sm font-bold leading-snug text-[#b9bdf0]">{t.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <section className="mt-16 border-t-2 border-[#2a2e78] pt-6 text-sm font-bold text-[#b9bdf0]">
          <h2 className="font-[family-name:var(--tq-display)] text-3xl font-bold text-white">Collected photos</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {credits.map((c) => (
              <li key={c.file}>
                Photo by{" "}
                <a href={c.source} className="underline decoration-[#4b52c4] underline-offset-2 hover:text-white hover:decoration-[#ffe14d]">
                  {c.author}
                </a>{" "}
                on Unsplash ({c.title})
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Used under the{" "}
            <a href="https://unsplash.com/license" className="underline decoration-[#4b52c4] underline-offset-2 hover:text-white hover:decoration-[#ffe14d]">
              Unsplash License
            </a>
            . Everything marked ✦ was drawn or set for this board.
          </p>
        </section>
      </div>
    </main>
  );
}
