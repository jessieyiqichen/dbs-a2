import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fredoka, Nunito } from "next/font/google";
import credits from "@/data/credits/trail-quest.json";
import { Icon, IconArt, ICON_NAMES, type IconName } from "@/components/trail-quest/Icons";
import { AchievementBadge, LevelMap } from "@/components/trail-quest/GameArt";

const display = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--tq-display" });
const ui = Nunito({ subsets: ["latin"], weight: ["600", "800", "900"], variable: "--tq-ui" });

export const metadata: Metadata = { title: "Trail Quest · Mood board · The Walking Atlas" };

type Credit = (typeof credits)[number];
const photo = (file: string) => credits.find((c) => c.file === file) as Credit;

const NAVY = "#1d2b53";
const PALETTE = [
  { name: "Sky", hex: "#4cc3ff", ink: NAVY },
  { name: "Cloud", hex: "#ffffff", ink: NAVY },
  { name: "Grass", hex: "#58d36b", ink: NAVY },
  { name: "Sun", hex: "#ffd23f", ink: NAVY },
  { name: "Grape", hex: "#6741d9", ink: "#fff" },
  { name: "Navy", hex: NAVY, ink: "#fff" },
];

// Keyframes for the board; all of them stop when the visitor asks for reduced motion.
const KEYFRAMES = `
@keyframes tq-drift { from { transform: translateX(-10%) } to { transform: translateX(110%) } }
@keyframes tq-stripes { to { background-position: 28px 0 } }
@keyframes tq-ping { 0% { transform: scale(1); opacity: .7 } 100% { transform: scale(1.9); opacity: 0 } }
@keyframes tq-hop { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes tq-wiggle { 0%,100% { transform: rotate(0) } 25% { transform: rotate(-4deg) } 75% { transform: rotate(4deg) } }
@keyframes tq-pop { 0% { transform: scale(0) } 70% { transform: scale(1.25) } 100% { transform: scale(1) } }
@keyframes tq-shine { from { transform: translateX(-120%) skewX(-20deg) } to { transform: translateX(220%) skewX(-20deg) } }
@keyframes tq-spin { to { transform: rotate(360deg) } }
@keyframes tq-twinkle { 0%,100% { transform: scale(.6); opacity: .5 } 50% { transform: scale(1.15); opacity: 1 } }
@keyframes tq-confetti { 0% { transform: translateY(-10px) rotate(0); opacity: 1 } 100% { transform: translateY(60px) rotate(240deg); opacity: 0 } }
.tq-wiggle:hover { animation: tq-wiggle .35s ease-in-out }
.tq-shine-wrap:hover .tq-shine { animation: tq-shine .8s ease-out }
@media (prefers-reduced-motion: reduce) { .tq-anim, .tq-anim *, .tq-wiggle:hover, .tq-shine-wrap:hover .tq-shine { animation: none !important } }
`;

/* ---------- shared game parts ---------- */

const outlined = "font-[family-name:var(--tq-display)] font-bold text-white [paint-order:stroke_fill] [-webkit-text-stroke:6px_#1d2b53] [text-shadow:0_5px_0_#1d2b53]";

function GameButton({ children, tone = "grass", size = "md" }: { children: React.ReactNode; tone?: "grass" | "grape" | "sun" | "off"; size?: "md" | "lg" }) {
  const t = {
    grass: "bg-[linear-gradient(#7be48a,#58d36b_55%,#47c25b)] text-[#1d2b53] shadow-[0_6px_0_#2f9e44,0_8px_0_#1d2b53]",
    grape: "bg-[linear-gradient(#8a6cf0,#6741d9_55%,#5a35c9)] text-white shadow-[0_6px_0_#4527a8,0_8px_0_#1d2b53]",
    sun: "bg-[linear-gradient(#ffe57a,#ffd23f_55%,#f5c518)] text-[#1d2b53] shadow-[0_6px_0_#d4a90a,0_8px_0_#1d2b53]",
    off: "bg-[#d5dbe8] text-[#4a5a85] shadow-[0_6px_0_#aab4c9,0_8px_0_#8e99b3]",
  }[tone];
  const s = size === "lg" ? "px-9 py-3.5 text-2xl" : "px-6 py-2.5 text-lg";
  return (
    <span
      className={`tq-shine-wrap tq-wiggle relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border-[3px] border-[#1d2b53] font-[family-name:var(--tq-display)] font-bold uppercase tracking-wide transition-transform duration-150 active:translate-y-1.5 active:scale-y-95 ${t} ${s}`}
    >
      <span className="pointer-events-none absolute inset-x-2 top-1 h-[38%] rounded-xl bg-white/35" />
      <span className="tq-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/50" style={{ transform: "translateX(-120%) skewX(-20deg)" }} />
      <span className="relative">{children}</span>
    </span>
  );
}

function Star({ on = true, size = 28, delay = 0 }: { on?: boolean; size?: number; delay?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={on ? { animation: `tq-pop .5s ${delay}s both cubic-bezier(.34,1.56,.64,1)` } : undefined}>
      <path
        d="M12 2.2l3 6.1 6.7.9-4.9 4.6 1.3 6.6L12 17.1l-6.1 3.3 1.3-6.6L2.3 9.2 9 8.3z"
        fill={on ? "#ffd23f" : "#d5dbe8"}
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {on && <path d="M9.5 8.8 L11.2 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />}
    </svg>
  );
}

const tile = "rounded-[26px] border-[3px] border-[#1d2b53] bg-white shadow-[0_6px_0_#1d2b53]";

/* ---------- pieces made for this board ---------- */

const made: Record<string, React.ReactNode> = {
  palette: (
    <div className="grid grid-cols-6 gap-1.5">
      {PALETTE.map((c) => (
        <div key={c.hex}>
          <div className="h-16 rounded-xl border-[3px] border-[#1d2b53]" style={{ background: c.hex }} />
          <p className="mt-1 text-[11px] font-black">{c.name}</p>
        </div>
      ))}
    </div>
  ),
  "type-display": (
    <div className="py-3 text-center">
      <p className={`${outlined} -rotate-3 text-7xl leading-none`}>Aa</p>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[#4a5a85]">Fredoka · outlined like a game title</p>
    </div>
  ),
  "type-ui": (
    <div className="space-y-1 py-2">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4a5a85]">Best months</p>
      <p className="text-2xl font-black">Jun → Sep</p>
      <p className="text-xs font-extrabold text-[#4a5a85]">Nunito Black · readable at a glance</p>
    </div>
  ),
  hud: (
    <div className="flex flex-wrap items-center gap-2 py-3">
      {(
        [
          ["boot", "5/5"],
          ["mountain", "4,215 m"],
          ["star", "23"],
        ] as [IconName, string][]
      ).map(([i, v]) => (
        <span key={v} className="flex items-center gap-1 rounded-full border-[3px] border-[#1d2b53] bg-[#1d2b53] py-0.5 pl-0.5 pr-3 text-sm font-black text-white">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white">
            <Icon name={i} size={24} />
          </span>
          {v}
        </span>
      ))}
      <Icon name="plus" size={34} label="Add" />
    </div>
  ),
  "level-card": (
    <div className="overflow-hidden rounded-2xl border-[3px] border-[#1d2b53]">
      <svg viewBox="0 0 240 70" className="block h-auto w-full" aria-hidden="true">
        <rect width="240" height="70" fill="#4cc3ff" />
        <path d="M120 70 L170 18 L230 70 Z" fill="#8fa3d6" stroke={NAVY} strokeWidth="3" />
        <path d="M158 31 L170 18 L183 31 Z" fill="#fff" />
        <path d="M0 50 C 60 32, 120 60, 240 44 V70 H0 Z" fill="#58d36b" stroke={NAVY} strokeWidth="3" />
      </svg>
      <div className="relative bg-white p-3 pt-6">
        <span className="absolute -top-6 left-3 grid h-12 w-12 place-items-center rounded-2xl border-[3px] border-[#1d2b53] bg-[#6741d9] font-[family-name:var(--tq-display)] text-xl font-bold text-white shadow-[0_4px_0_#1d2b53]">
          7
        </span>
        <span className="absolute right-3 top-2 flex">
          <Star size={22} />
          <Star size={22} delay={0.15} />
          <Star size={22} on={false} />
        </span>
        <p className="font-[family-name:var(--tq-display)] text-2xl font-bold leading-tight">Tour du Mont Blanc</p>
        <p className="text-sm font-extrabold text-[#4a5a85]">165–170 km · 3 countries · loop</p>
      </div>
    </div>
  ),
  "button-set": (
    <div className="flex flex-col items-center gap-5 py-4">
      <GameButton size="lg">▶ Play</GameButton>
      <div className="flex flex-wrap justify-center gap-3">
        <GameButton tone="grape">Map</GameButton>
        <GameButton tone="sun">Claim</GameButton>
        <GameButton tone="off">Locked</GameButton>
      </div>
    </div>
  ),
  "round-buttons": (
    <div className="flex items-center justify-center gap-3 py-4">
      {(["info", "gear", "chest"] as IconName[]).map((g) => (
        <span key={g} className="tq-wiggle relative grid h-16 w-16 place-items-center rounded-full border-[3px] border-[#1d2b53] bg-white shadow-[0_5px_0_#1d2b53]">
          <Icon name={g} size={40} />
        </span>
      ))}
    </div>
  ),
  "xp-bar": (
    <div className="tq-anim py-3">
      <div className="flex items-center gap-2">
        <span className="z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-[3px] border-[#1d2b53] bg-[#ffd23f] font-[family-name:var(--tq-display)] text-xl font-bold shadow-[0_4px_0_#1d2b53]">
          9
        </span>
        <div className="-ml-4 h-8 flex-1 overflow-hidden rounded-full border-[3px] border-[#1d2b53] bg-[#d5dbe8]">
          <div
            className="relative h-full w-[75%] rounded-full border-r-[3px] border-[#1d2b53]"
            style={{
              background: "repeating-linear-gradient(-45deg, #58d36b 0 10px, #7be48a 10px 14px)",
              backgroundSize: "28px 100%",
              animation: "tq-stripes .8s linear infinite",
            }}
          >
            <span className="absolute inset-x-2 top-1 h-1.5 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
      <p className="mt-2 flex justify-between text-xs font-black">
        <span>Inca Trail · altitude</span>
        <span className="text-[#6741d9]">4,215 m</span>
      </p>
    </div>
  ),
  badges: (
    <div className="grid grid-cols-2 gap-x-2 gap-y-3 py-2">
      <AchievementBadge id="b1" tier="stone" icon="boot" label="Day Tripper" stars={1} />
      <AchievementBadge id="b2" tier="silver" icon="ticket" label="Permit Holder" stars={2} />
      <AchievementBadge id="b3" tier="gold" icon="mountain" label="4,000 m Club" stars={3} />
      <AchievementBadge id="b4" tier="gem" icon="compass" label="Pilgrim" stars={0} locked />
    </div>
  ),
  tabs: (
    <div className="flex gap-2 py-4">
      {[
        ["All", "12", true],
        ["Day", "3", false],
        ["Multi-day", "9", false],
      ].map(([l, n, on]) => (
        <span
          key={l as string}
          className={`relative rounded-2xl border-[3px] border-[#1d2b53] px-3.5 py-2 text-sm font-black ${on ? "-translate-y-1 bg-[#6741d9] text-white shadow-[0_5px_0_#1d2b53]" : "bg-white shadow-[0_3px_0_#1d2b53]"}`}
        >
          {l}
          <span className="absolute -right-2 -top-3 grid h-6 min-w-6 place-items-center rounded-full border-2 border-[#1d2b53] bg-[#ffd23f] px-1 text-[11px] text-[#1d2b53]">{n}</span>
        </span>
      ))}
    </div>
  ),
  toggle: (
    <div className="space-y-3 py-3">
      <span className="flex items-center gap-3">
        <span className="relative inline-block h-10 w-[72px] rounded-full border-[3px] border-[#1d2b53] bg-[#58d36b] shadow-[inset_0_-4px_0_#2f9e44]">
          <span className="absolute right-0.5 top-0.5 grid h-7 w-7 place-items-center rounded-full border-[3px] border-[#1d2b53] bg-white text-sm font-black">✓</span>
        </span>
        <span className="text-sm font-black">Permit trails</span>
      </span>
      <span className="flex items-center gap-3">
        <span className="relative inline-block h-10 w-[72px] rounded-full border-[3px] border-[#1d2b53] bg-[#d5dbe8] shadow-[inset_0_-4px_0_#aab4c9]">
          <span className="absolute left-0.5 top-0.5 grid h-7 w-7 place-items-center rounded-full border-[3px] border-[#1d2b53] bg-white text-sm font-black text-[#4a5a85]">✕</span>
        </span>
        <span className="text-sm font-black text-[#4a5a85]">Day hikes only</span>
      </span>
    </div>
  ),
  difficulty: (
    <div className="space-y-2 py-2 text-sm font-black">
      {[
        ["Moderate", 2],
        ["Challenging", 3],
        ["Strenuous", 4],
      ].map(([l, n]) => (
        <div key={l as string} className="flex items-center justify-between">
          <span>{l}</span>
          <span className="flex gap-0.5" aria-label={`${n} of 4 boots`}>
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className={i <= (n as number) ? "" : "opacity-30 grayscale"}>
                <Icon name="boot" size={26} />
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  ),
  stats: (
    <div className="grid grid-cols-3 gap-2 py-2">
      {[
        ["KM", "165–170", "#4cc3ff"],
        ["DAYS", "7–11", "#58d36b"],
        ["PEAK", "2,537 m", "#ffd23f"],
      ].map(([k, v, c]) => (
        <div key={k} className="rounded-2xl border-[3px] border-[#1d2b53] p-2 text-center shadow-[0_4px_0_#1d2b53]" style={{ background: c }}>
          <p className="text-[10px] font-black tracking-widest">{k}</p>
          <p className="font-[family-name:var(--tq-display)] text-lg font-bold leading-tight">{v}</p>
        </div>
      ))}
    </div>
  ),
  locked: (
    <div className="relative overflow-hidden rounded-2xl border-[3px] border-[#1d2b53] bg-[#d5dbe8] p-4 pb-5">
      <p className="font-[family-name:var(--tq-display)] text-2xl font-bold text-[#4a5a85]">Half Dome</p>
      <p className="pr-12 text-sm font-extrabold text-[#4a5a85]">Cables up late May to mid-October</p>
      <span className="absolute -right-2 top-2 rotate-12">
        <Icon name="lock" size={60} />
      </span>
      <div className="mt-3">
        <GameButton tone="grape">Enter lottery</GameButton>
      </div>
    </div>
  ),
  reward: (
    <div className="tq-anim relative overflow-hidden rounded-2xl border-[3px] border-[#1d2b53] bg-[radial-gradient(circle_at_50%_30%,#fff6c7,#ffd23f)] p-4 text-center">
      {["#6741d9", "#58d36b", "#4cc3ff", "#fff", "#6741d9", "#58d36b"].map((c, i) => (
        <span key={i} className="absolute top-2 h-2.5 w-1.5 rounded-sm" style={{ left: `${12 + i * 15}%`, background: c, animation: `tq-confetti 1.6s ${i * 0.2}s ease-in infinite` }} />
      ))}
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6741d9]">New badge!</p>
      <p className={`${outlined} mt-1 text-3xl`}>Over 4,000 m</p>
      <div className="mt-4">
        <GameButton tone="sun">Claim</GameButton>
      </div>
    </div>
  ),
  ring: (
    <div className="tq-anim grid place-items-center py-2">
      <svg viewBox="0 0 130 130" className="h-40 w-40" role="img" aria-label="Progress ring, five of twelve trails, with a trophy">
        <defs>
          <linearGradient id="tq-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#58d36b" />
            <stop offset="1" stopColor="#4cc3ff" />
          </linearGradient>
        </defs>
        <g style={{ transformOrigin: "65px 65px", animation: "tq-spin 12s linear infinite" }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d="M65 4 L68 14 L62 14 Z" fill="#ffd23f" transform={`rotate(${i * 30} 65 65)`} />
          ))}
        </g>
        <circle cx="65" cy="65" r="44" fill="#fff" stroke={NAVY} strokeWidth="3" />
        <circle cx="65" cy="65" r="38" fill="none" stroke="#d5dbe8" strokeWidth="10" />
        <circle cx="65" cy="65" r="38" fill="none" stroke="url(#tq-ring)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(5 / 12) * 238.8} 238.8`} transform="rotate(-90 65 65)" />
        <IconArt name="trophy" x={51} y={36} size={28} />
        <text x="65" y="84" textAnchor="middle" fontSize="15" fontWeight="800" fill={NAVY}>
          5 / 12
        </text>
      </svg>
    </div>
  ),
  "icon-sheet": (
    <div className="grid grid-cols-5 gap-x-1 gap-y-2 py-2">
      {ICON_NAMES.map((n) => (
        <div key={n} className="flex flex-col items-center">
          <Icon name={n} size={36} />
          <span className="mt-0.5 text-[9px] font-black uppercase tracking-wide text-[#4a5a85]">{n}</span>
        </div>
      ))}
    </div>
  ),
  "sky-scene": (
    <svg viewBox="0 0 260 150" className="tq-anim block h-auto w-full rounded-2xl" role="img" aria-label="A bright sky with a sun, drifting clouds and green hills">
      <rect width="260" height="150" fill="#4cc3ff" />
      <g style={{ transformOrigin: "200px 40px", animation: "tq-spin 20s linear infinite" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x="198" y="2" width="4" height="12" rx="2" fill="#ffd23f" transform={`rotate(${i * 36} 200 40)`} />
        ))}
      </g>
      <circle cx="200" cy="40" r="20" fill="#ffd23f" stroke={NAVY} strokeWidth="3" />
      <g style={{ animation: "tq-drift 14s linear infinite" }}>
        <ellipse cx="10" cy="50" rx="28" ry="11" fill="#fff" />
        <ellipse cx="28" cy="43" rx="18" ry="13" fill="#fff" />
      </g>
      <path d="M0 110 C 70 80, 150 120, 260 92 V150 H0 Z" fill="#8ee06b" stroke={NAVY} strokeWidth="3" />
      <path d="M0 132 C 90 110, 170 140, 260 120 V150 H0 Z" fill="#58d36b" stroke={NAVY} strokeWidth="3" />
    </svg>
  ),
};

/* ---------- overview: references, early decisions, palette, one component ---------- */

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block -rotate-2 rounded-xl border-[3px] border-[#1d2b53] bg-[#ffd23f] px-3 py-0.5 text-xs font-black uppercase tracking-[0.12em] shadow-[0_3px_0_#1d2b53]">{children}</span>;
}

function Ref({ file, note, className = "" }: { file: string; note: string; className?: string }) {
  const c = photo(file);
  return (
    <figure className={`relative overflow-hidden rounded-[22px] border-[3px] border-[#1d2b53] shadow-[0_6px_0_#1d2b53] ${className}`}>
      <Image src={`/moodboards/trail-quest/${file}`} alt={note} width={c.w} height={c.h} className="h-full w-full object-cover" sizes="(min-width: 1024px) 30vw, 100vw" />
      <figcaption className="absolute inset-x-3 bottom-3 rounded-xl border-2 border-[#1d2b53] bg-white px-3 py-1 text-sm font-black">{note}</figcaption>
    </figure>
  );
}

function Overview() {
  return (
    <section aria-label="Overview" className="mt-10 grid gap-5 rounded-[34px] border-[3px] border-[#1d2b53] bg-white/55 p-5 backdrop-blur lg:grid-cols-[1.1fr_1fr_1fr] lg:grid-rows-[230px_auto_auto]">
      <div className="relative lg:row-span-2">
        <span className="absolute left-3 top-3 z-10">
          <Tag>References</Tag>
        </span>
        <Ref file="summit-jump.jpg" note="Summit jump: every trail is a win" className="h-72 lg:h-full" />
      </div>
      <Ref file="peyto-lake.jpg" note="Peyto blue: colour turned up" className="h-56 lg:h-auto" />
      <Ref file="green-hill.jpg" note="Green hill: the level-select world" className="h-56 lg:h-auto" />
      <div className={`${tile} p-5 lg:col-span-2`}>
        <Tag>Early decisions</Tag>
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <p className={`${outlined} -rotate-3 text-8xl leading-[0.85]`}>Aa</p>
          <div>
            <p className="font-[family-name:var(--tq-display)] text-4xl font-bold leading-none">
              Level 12 <span className="text-[#6741d9]">· 769–800 km</span>
            </p>
            <p className="mt-2 max-w-md text-sm font-extrabold text-[#4a5a85]">Fredoka, outlined in navy, for titles, numbers and buttons; Nunito Black for everything else. Navy text, never black.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 lg:col-span-2">
        {PALETTE.map((c) => (
          <div key={c.hex} className="flex h-28 items-end rounded-2xl border-[3px] border-[#1d2b53] p-2 shadow-[0_4px_0_#1d2b53]" style={{ background: c.hex, color: c.ink }}>
            <span className="text-sm font-black">{c.name}</span>
          </div>
        ))}
      </div>
      <div className={`${tile} flex flex-col items-center justify-center gap-5 p-5`}>
        <span className="flex gap-1">
          <Star size={34} />
          <Star size={40} delay={0.15} />
          <Star size={34} on={false} />
        </span>
        <GameButton size="lg">▶ Play</GameButton>
      </div>
    </section>
  );
}

/* ---------- the board ---------- */

type Tile = { kind: "photo"; file: string; caption: string } | { kind: "made"; id: keyof typeof made; caption: string } | { kind: "map"; caption: string };

const tiles: Tile[] = [
  { kind: "map", caption: "Level map: a sandy road, glossy stops, a flag at the top" },
  { kind: "made", id: "palette", caption: "Sky, cloud, grass, sun, grape, navy: grass is the go button" },
  { kind: "made", id: "icon-sheet", caption: "Our own icon set: navy outline, one shade, one highlight" },
  { kind: "photo", file: "turquoise-lake.jpg", caption: "Turquoise lake: colour turned up" },
  { kind: "made", id: "button-set", caption: "Buttons are glossy, outlined, and press down" },
  { kind: "made", id: "type-display", caption: "Fredoka with a navy outline: title-screen type" },
  { kind: "made", id: "hud", caption: "A HUD: boots, altitude, stars" },
  { kind: "photo", file: "arms-up.jpg", caption: "Arms up: the feeling after the last climb" },
  { kind: "made", id: "level-card", caption: "Each trail is a level card with its own scene" },
  { kind: "made", id: "xp-bar", caption: "Altitude as a moving XP bar" },
  { kind: "made", id: "badges", caption: "Achievements in four tiers: stone, silver, gold, gem" },
  { kind: "photo", file: "snow-jump.jpg", caption: "Snow jump: energy, mid-air" },
  { kind: "made", id: "tabs", caption: "Filters as raised tabs with counters" },
  { kind: "made", id: "reward", caption: "A reward screen: confetti, then Claim" },
  { kind: "photo", file: "rainbow-tent.jpg", caption: "Rainbow camp: the end-of-level screen" },
  { kind: "made", id: "toggle", caption: "Toggles with a tick or a cross in the knob" },
  { kind: "made", id: "locked", caption: "Locked: a permit is the key" },
  { kind: "photo", file: "scramble.jpg", caption: "Scramble: hands on rock, a boss stage" },
  { kind: "made", id: "difficulty", caption: "Difficulty counted in boots" },
  { kind: "made", id: "stats", caption: "Stats as coloured blocks" },
  { kind: "made", id: "round-buttons", caption: "Round icon buttons that wobble on hover" },
  { kind: "photo", file: "glacier-lake.jpg", caption: "Glacier lake: saturated, but cool" },
  { kind: "made", id: "ring", caption: "Progress: a trophy and a turning sunburst" },
  { kind: "made", id: "type-ui", caption: "Nunito Black: labels you read in a glance" },
  { kind: "photo", file: "blue-ice.jpg", caption: "Blue ice: chunky, glossy shapes" },
  { kind: "made", id: "sky-scene", caption: "The world: sun, drifting clouds, two hills" },
  { kind: "photo", file: "peyto-lake.jpg", caption: "Peyto blue: one hero colour" },
  { kind: "photo", file: "green-hill.jpg", caption: "Green hill: the level-select world" },
  { kind: "photo", file: "summit-jump.jpg", caption: "Summit jump: every trail is a win" },
];

export default function TrailQuestBoard() {
  const madeCount = tiles.filter((t) => t.kind !== "photo").length;
  return (
    <main
      className={`${display.variable} ${ui.variable} relative min-h-screen overflow-hidden font-[family-name:var(--tq-ui)] text-[#1d2b53]`}
      style={{ background: "linear-gradient(180deg, #4cc3ff 0%, #9ee3ff 30%, #e6f8ff 60%, #f4fcff 100%)" }}
    >
      <style>{KEYFRAMES}</style>
      <div className="tq-anim pointer-events-none absolute inset-x-0 top-0 h-96" aria-hidden="true">
        {[
          [60, 18, 0],
          [180, 9, -6],
          [120, 26, -12],
        ].map(([y, dur, delay], i) => (
          <div key={i} className="absolute left-0" style={{ top: y, animation: `tq-drift ${dur * 4}s ${delay}s linear infinite` }}>
            <div className="relative h-10 w-28">
              <span className="absolute bottom-0 left-0 h-7 w-28 rounded-full bg-white/90" />
              <span className="absolute bottom-3 left-6 h-10 w-12 rounded-full bg-white/90" />
              <span className="absolute bottom-2 left-14 h-8 w-10 rounded-full bg-white/90" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-10">
        <Link
          href="/"
          className="rounded-xl border-[3px] border-[#1d2b53] bg-white px-3 py-1 text-sm font-black shadow-[0_3px_0_#1d2b53] hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#6741d9] active:translate-y-0.5 active:shadow-none"
        >
          ← Hub
        </Link>
        <header className="mt-8 flex flex-wrap items-end justify-between gap-6 pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#1d2b53]/80">Mood board · 3 of 3</p>
            <h1 className={`${outlined} mt-3 -rotate-2 text-7xl leading-none sm:text-8xl`} style={{ animation: "tq-pop .6s both cubic-bezier(.34,1.56,.64,1)" }}>
              Trail <span className="text-[#ffd23f]">Quest</span>
            </h1>
            <p className="mt-5 font-[family-name:var(--tq-display)] text-3xl font-bold">Playful, Bright, Game-like</p>
            <p className="mt-2 max-w-xl text-base font-extrabold leading-relaxed text-[#1d2b53]/80">
              A sunny mobile game where each famous walk is a level: a road over green hills, stars, badges, an altitude bar, buttons
              you can almost feel. For people who want to collect these trails and treat each one as a challenge.
            </p>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-[#6741d9]">Evokes</p>
            <p className="font-[family-name:var(--tq-display)] text-3xl font-bold leading-tight">Unlocking the next level on a bright morning, and the little chime.</p>
          </div>
          <p className="rounded-2xl border-[3px] border-[#1d2b53] bg-white px-4 py-2 text-sm font-black shadow-[0_4px_0_#1d2b53]">
            {tiles.length} artifacts · <span aria-hidden="true">✦</span> {madeCount} made · {tiles.length - madeCount} collected
          </p>
        </header>

        <Overview />

        <section aria-label="The world" className={`${tile} mt-12 grid items-center gap-8 p-6 md:grid-cols-[minmax(0,420px)_1fr]`}>
          <div className="relative">
            <span className="absolute -right-2 -top-4 z-10 grid h-7 w-7 place-items-center rounded-full border-2 border-[#1d2b53] bg-[#ffd23f] text-xs" title="Made for this board" aria-label="Made for this board">
              ✦
            </span>
            <LevelMap />
          </div>
          <div>
            <Tag>The world</Tag>
            <p className={`${outlined} mt-4 text-5xl leading-tight`}>Twelve trails, one road</p>
            <p className="mt-3 max-w-md text-base font-extrabold text-[#4a5a85]">
              Three floating islands, ordered from the gentlest walk to the hardest. Stepping stones lead past finished levels with
              their stars, to the next one, where the hiker waits; locked levels need a permit, and Everest Base Camp is the boss on
              the summit.
            </p>
            <div className="mt-6">{made.hud}</div>
            <div className="mt-4 flex flex-wrap gap-4">
              <GameButton size="lg">▶ Play W Trek</GameButton>
            </div>
          </div>
        </section>

        <h2 className={`${outlined} mt-16 text-5xl`}>All {tiles.length} artifacts</h2>
        <ul className="mt-8 columns-2 gap-3 sm:gap-6 lg:columns-3 xl:columns-4">
          {tiles.filter((t) => t.kind !== "map").map((t, i) => (
            <li key={i} className="mb-3 break-inside-avoid sm:mb-6">
              <figure className={`relative p-2 sm:p-3 transition-transform duration-200 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1.5 hover:-rotate-1 ${tile}`}>
                {t.kind !== "photo" && (
                  <span className="absolute -right-2 -top-3 z-10 grid h-7 w-7 place-items-center rounded-full border-2 border-[#1d2b53] bg-[#ffd23f] text-xs" title="Made for this board" aria-label="Made for this board">
                    ✦
                  </span>
                )}
                {t.kind === "photo" ? (
                  <Image
                    src={`/moodboards/trail-quest/${t.file}`}
                    alt={t.caption}
                    width={photo(t.file).w}
                    height={photo(t.file).h}
                    className="h-auto w-full rounded-2xl border-2 border-[#1d2b53]"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                  />
                ) : t.kind === "made" ? (
                  // on a phone the tile is half the screen: the piece keeps its own layout and is shown smaller, like a thumbnail
                  <div className="max-sm:[zoom:.62]">{made[t.id]}</div>
                ) : null}
                <figcaption className="mt-2 text-xs font-extrabold leading-snug text-[#4a5a85] sm:text-sm">{t.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <section className={`${tile} mt-16 p-6 text-sm font-bold text-[#4a5a85]`}>
          <h2 className="font-[family-name:var(--tq-display)] text-3xl font-bold text-[#1d2b53]">Collected photos</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {credits.map((c) => (
              <li key={c.file}>
                Photo by{" "}
                <a href={c.source} className="underline decoration-[#4cc3ff] decoration-2 underline-offset-2 hover:text-[#1d2b53] hover:decoration-[#6741d9]">
                  {c.author}
                </a>{" "}
                on Unsplash ({c.title})
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Used under the{" "}
            <a href="https://unsplash.com/license" className="underline decoration-[#4cc3ff] decoration-2 underline-offset-2 hover:text-[#1d2b53] hover:decoration-[#6741d9]">
              Unsplash License
            </a>
            . Everything marked ✦ was drawn or set for this board.
          </p>
        </section>
      </div>
    </main>
  );
}
