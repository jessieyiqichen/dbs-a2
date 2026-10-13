import { IconArt, type IconName } from "./Icons";

const N = "#1d2b53";
const STAR = "M12 2.2l3 6.1 6.7.9-4.9 4.6 1.3 6.6L12 17.1l-6.1 3.3 1.3-6.6L2.3 9.2 9 8.3z";

/* ---------- the level map ---------- */

type Stop = { x: number; y: number; name: string; state: "done" | "now" | "locked" | "boss"; stars?: number };

// Ordered from the gentlest walk to the hardest, so the summit is the boss level.
const STOPS: Stop[] = [
  { x: 92, y: 520, name: "Tongariro", state: "done", stars: 3 },
  { x: 220, y: 488, name: "Kumano Kodo", state: "done", stars: 2 },
  { x: 132, y: 420, name: "Laugavegur", state: "done", stars: 3 },
  { x: 236, y: 352, name: "Milford", state: "done", stars: 2 },
  { x: 120, y: 300, name: "W Trek", state: "now" },
  { x: 236, y: 232, name: "Mont Blanc", state: "locked" },
  { x: 132, y: 170, name: "Inca Trail", state: "locked" },
  { x: 214, y: 92, name: "Everest BC", state: "boss" },
];

function stones(a: Stop, b: Stop) {
  // Stepping stones along a gentle S-curve between two stops.
  const out: [number, number][] = [];
  const mx = (a.x + b.x) / 2 + (a.x < b.x ? -28 : 28);
  for (let t = 0.22; t < 0.82; t += 0.15) {
    const x = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * mx + t * t * b.x;
    const y = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * ((a.y + b.y) / 2) + t * t * b.y;
    out.push([x, y]);
  }
  return out;
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="2" width="6" height="10" fill="#5b4a8a" stroke={N} strokeWidth="2" />
      <path d="M0 -26 L14 4 H-14 Z" fill="#2f9e44" stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M0 -26 L14 4 H0 Z" fill="#237a35" />
      <path d="M0 -26 L14 4 H-14 Z" fill="none" stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M-4 -12 l3 -6" stroke="#9ff0a9" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Island({ d, side, top, sideColor }: { d: string; side: string; top: string; sideColor: string }) {
  return (
    <g>
      <path d={side} fill={sideColor} stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <path d={d} fill={top} stroke={N} strokeWidth="3" strokeLinejoin="round" />
    </g>
  );
}

function Islet({ x, y, w }: { x: number; y: number; w: number }) {
  // A small floating rock that holds a level between the big islands.
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${-w} 2 C ${-w} 14, ${w} 14, ${w} 2 L ${w * 0.6} 22 C ${w * 0.3} 34, ${-w * 0.3} 34, ${-w * 0.6} 22 Z`} fill="#6f7bb8" stroke={N} strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="0" cy="2" rx={w} ry="11" fill="#8ee06b" stroke={N} strokeWidth="3" />
      <path d={`M${-w * 0.5} ${-2} q 6 -4 12 0`} stroke="#c9f5b0" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Hiker({ x, y }: { x: number; y: number }) {
  return (
    <g style={{ animation: "tq-hop .9s ease-in-out infinite" }}>
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="2" rx="12" ry="3.5" fill={N} opacity=".25" />
        <rect x="-9" y="-30" width="9" height="16" rx="3" fill="#4cc3ff" stroke={N} strokeWidth="2.5" />
        <path d="M-6 -2 v-10 M5 -2 v-10" stroke={N} strokeWidth="5" strokeLinecap="round" />
        <rect x="-8" y="-28" width="16" height="17" rx="6" fill="#58d36b" stroke={N} strokeWidth="2.5" />
        <circle cx="0" cy="-38" r="9" fill="#ffe0c7" stroke={N} strokeWidth="2.5" />
        <path d="M-10 -40 a10 9 0 0 1 20 0 h4 l-2 3 h-22 z" fill="#6741d9" stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="-3" cy="-37" r="1.4" fill={N} />
        <circle cx="4" cy="-37" r="1.4" fill={N} />
        <path d="M-2 -33 q2 2 4 0" stroke={N} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M8 -24 l8 -10" stroke={N} strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
  );
}

function Node({ s, i }: { s: Stop; i: number }) {
  const big = s.state === "boss" ? 1.3 : s.state === "now" ? 1.15 : 1;
  const [top, side] =
    s.state === "done" ? ["#ffd23f", "#d4a90a"] : s.state === "now" ? ["#58d36b", "#2f9e44"] : s.state === "boss" ? ["#8a6cf0", "#5230b8"] : ["#d5dbe8", "#8e99b3"];
  return (
    <g transform={`translate(${s.x} ${s.y}) scale(${big})`}>
      {s.state === "now" && <ellipse cx="0" cy="0" rx="26" ry="17" fill="none" stroke="#fff" strokeWidth="4" style={{ transformOrigin: "0 0", animation: "tq-ping 1.3s ease-out infinite" }} />}
      <path d="M-22 0 v9 a22 13 0 0 0 44 0 v-9" fill={side} stroke={N} strokeWidth="3" />
      <ellipse cx="0" cy="0" rx="22" ry="13" fill={top} stroke={N} strokeWidth="3" />
      <ellipse cx="-7" cy="-4" rx="7" ry="3" fill="#fff" opacity=".55" />
      {s.state === "locked" ? (
        <IconArt name="lock" x={-10} y={-14} size={20} />
      ) : s.state === "boss" ? (
        <g>
          <path d="M-3 -6 V-40" stroke={N} strokeWidth="3" strokeLinecap="round" />
          <path d="M-3 -40 h22 l-5 6 l5 6 h-22 z" fill="#ffd23f" stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M-12 -7 l3 -8 l4 5 l4 -7 l4 7 l4 -5 l3 8 z" fill="#ffd23f" stroke={N} strokeWidth="2.2" strokeLinejoin="round" />
        </g>
      ) : (
        <text x="0" y="5" textAnchor="middle" fontSize="15" fontWeight="800" fill={N} fontFamily="var(--tq-display)">
          {i + 1}
        </text>
      )}
      {s.state === "done" &&
        [0, 1, 2].map((k) => (
          <path key={k} d={STAR} transform={`translate(${-22 + k * 15} ${k === 1 ? -38 : -33}) scale(.6)`} fill={k < (s.stars ?? 0) ? "#ffd23f" : "#fff"} stroke={N} strokeWidth="2.6" strokeLinejoin="round" />
        ))}
    </g>
  );
}

function Banner({ s }: { s: Stop }) {
  const w = s.name.length * 6.6 + 18;
  const y = s.y + (s.state === "boss" ? 26 : 22);
  const fill = s.state === "locked" ? "#8e99b3" : s.state === "boss" ? "#6741d9" : s.state === "now" ? "#2f9e44" : "#1d2b53";
  return (
    <g transform={`translate(${s.x - w / 2} ${y})`}>
      <path d={`M-6 3 h8 v12 h-8 l4 -6 z M${w - 2} 3 h8 l-4 6 l4 6 h-8 z`} fill={fill} stroke={N} strokeWidth="2" strokeLinejoin="round" opacity=".85" />
      <rect x="0" y="0" width={w} height="16" rx="3" fill={fill} stroke={N} strokeWidth="2" />
      <text x={w / 2} y="12" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#fff" fontFamily="var(--tq-ui)">
        {s.name}
      </text>
    </g>
  );
}

/** `uid` keeps the gradient id unique when the map is drawn more than once on a page. */
export function LevelMap({ uid = "tqm" }: { uid?: string }) {
  return (
    <svg viewBox="0 0 340 600" className="tq-anim block h-auto w-full" role="img" aria-label="A game map of three floating islands. Stepping stones lead past eight levels, from Tongariro at the bottom to Everest Base Camp, the boss level, on the snowy summit.">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4cc3ff" />
          <stop offset=".6" stopColor="#9ee3ff" />
          <stop offset="1" stopColor="#e6f8ff" />
        </linearGradient>
      </defs>
      <rect width="340" height="600" rx="22" fill={`url(#${uid}-sky)`} />
      <IconArt name="sun" x={14} y={14} size={48} />
      {[
        [40, 22, 0],
        [150, 30, -8],
      ].map(([y, d, delay], k) => (
        <g key={k} style={{ animation: `tq-drift ${d}s ${delay}s linear infinite` }}>
          <IconArt name="cloud" x={-60} y={y} size={56} />
        </g>
      ))}
      <path d="M278 60 q5 -5 10 0 q5 -5 10 0 M250 120 q4 -4 8 0 q4 -4 8 0" stroke={N} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* top island: the summit */}
      <Island d="M150 150 L214 40 L300 150 C 270 168, 180 168, 150 150 Z" side="M150 150 C 180 168, 270 168, 300 150 L 286 186 C 250 204, 196 204, 166 186 Z" top="#a9b6e3" sideColor="#6f7bb8" />
      <path d="M190 82 L214 40 L240 84 L228 78 L216 90 L204 78 Z" fill="#fff" stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M214 40 L300 150 C 285 158, 265 162, 250 163 Z" fill="#8a97cf" opacity=".6" />

      {/* middle island: forest and river */}
      <Island d="M40 260 C 80 220, 260 210, 320 250 C 300 300, 90 320, 40 260 Z" side="M40 260 C 90 320, 300 300, 320 250 L 300 300 C 240 344, 100 348, 56 304 Z" top="#58d36b" sideColor="#6f7bb8" />
      <path d="M60 268 C 120 262, 160 282, 210 266 S 280 260, 300 262" fill="none" stroke={N} strokeWidth="12" strokeLinecap="round" />
      <path d="M60 268 C 120 262, 160 282, 210 266 S 280 260, 300 262" fill="none" stroke="#4cc3ff" strokeWidth="7" strokeLinecap="round" />
      <path d="M160 262 h22 v16 h-22 z" fill="#c9b8ff" stroke={N} strokeWidth="2" />
      <path d="M164 262 v16 M170 262 v16 M176 262 v16" stroke={N} strokeWidth="1.4" />
      <Tree x={70} y={250} />
      <Tree x={292} y={238} s={0.9} />
      <Tree x={282} y={290} s={1.1} />
      <Tree x={60} y={292} s={0.85} />

      {/* bottom island: meadow and lake */}
      <Island d="M20 470 C 60 420, 300 410, 330 460 C 320 540, 60 560, 20 470 Z" side="M20 470 C 60 560, 320 540, 330 460 L 312 520 C 260 590, 80 596, 36 540 Z" top="#8ee06b" sideColor="#6f7bb8" />
      <ellipse cx="262" cy="530" rx="44" ry="16" fill="#4cc3ff" stroke={N} strokeWidth="3" />
      <path d="M240 528 h14 M266 534 h18" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" style={{ animation: "tq-hop 2s ease-in-out infinite" }} />
      <Tree x={40} y={474} s={0.9} />
      <Tree x={300} y={466} />
      <IconArt name="tent" x={62} y={498} size={34} />
      {[
        [70, 440],
        [190, 452],
        [210, 540],
        [110, 556],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <circle cx={x} cy={y} r="2.6" fill="#fff" stroke={N} strokeWidth="1.2" />
          <circle cx={x + 6} cy={y + 3} r="2.2" fill="#ffd23f" stroke={N} strokeWidth="1.2" />
        </g>
      ))}

      <Islet x={132} y={426} w={40} />
      <Islet x={236} y={358} w={40} />
      <Islet x={132} y={176} w={36} />

      {/* stepping stones */}
      {STOPS.slice(0, -1).map((a, i) =>
        stones(a, STOPS[i + 1]).map(([x, y], k) => (
          <g key={`${i}-${k}`}>
            <ellipse cx={x} cy={y + 2.5} rx="7" ry="4.5" fill={N} />
            <ellipse cx={x} cy={y} rx="7" ry="4.5" fill={i < 4 ? "#fff6c7" : "#e6e9f2"} stroke={N} strokeWidth="2" />
          </g>
        )),
      )}

      <IconArt name="chest" x={258} y={318} size={34} />
      <path d="M296 322 l4 -6 M300 330 l7 -2 M292 314 l1 -7" stroke="#ffd23f" strokeWidth="2.6" strokeLinecap="round" />

      {STOPS.map((s, i) => (
        <Node key={s.name} s={s} i={i} />
      ))}
      {STOPS.map((s) => (
        <Banner key={`b-${s.name}`} s={s} />
      ))}
      <Hiker x={120} y={290} />
      <g transform="translate(140 236)">
        <path d="M0 0 h40 a8 8 0 0 1 8 8 v10 a8 8 0 0 1 -8 8 h-26 l-10 8 l2 -8 h-6 a8 8 0 0 1 -8 -8 v-10 a8 8 0 0 1 8 -8 z" fill="#fff" stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
        <text x="20" y="18" textAnchor="middle" fontSize="13" fontWeight="800" fill={N} fontFamily="var(--tq-display)">
          GO!
        </text>
      </g>
    </svg>
  );
}

/* ---------- achievement badges ---------- */

type Tier = "stone" | "silver" | "gold" | "gem";

const TIER: Record<Tier, { rim: [string, string]; field: string; glow?: string; wings?: boolean }> = {
  stone: { rim: ["#d5dbe8", "#8e99b3"], field: "#7d88b8" },
  silver: { rim: ["#ffffff", "#aab4c9"], field: "#4cc3ff" },
  gold: { rim: ["#fff0a6", "#f5b800"], field: "#6741d9", glow: "#ffd23f", wings: true },
  gem: { rim: ["#b8ffcb", "#2f9e44"], field: "#1d2b53", glow: "#58d36b", wings: true },
};

export function AchievementBadge({ tier, icon, label, stars, locked = false, id }: { tier: Tier; icon: IconName; label: string; stars: number; locked?: boolean; id: string }) {
  const t = TIER[tier];
  const shield = "M60 18 L96 30 V62 C96 86 80 100 60 110 C40 100 24 86 24 62 V30 Z";
  const inner = "M60 28 L86 37 V62 C86 80 74 91 60 99 C46 91 34 80 34 62 V37 Z";
  return (
    <svg viewBox="0 0 120 150" className={`tq-shine-wrap h-auto w-full ${locked ? "grayscale" : ""}`} role="img" aria-label={`${label} badge, ${tier} tier${locked ? ", locked" : ""}`}>
      <defs>
        <linearGradient id={`rim-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.rim[0]} />
          <stop offset="1" stopColor={t.rim[1]} />
        </linearGradient>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0" stopColor={t.glow ?? "#fff"} stopOpacity=".8" />
          <stop offset="1" stopColor={t.glow ?? "#fff"} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`clip-${id}`}>
          <path d={inner} />
        </clipPath>
      </defs>
      {t.glow && !locked && (
        <g className="tq-anim" style={{ transformOrigin: "60px 64px", animation: "tq-spin 14s linear infinite" }}>
          <circle cx="60" cy="64" r="56" fill={`url(#glow-${id})`} />
          {Array.from({ length: 8 }).map((_, k) => (
            <path key={k} d="M60 6 L64 22 L56 22 Z" fill={t.glow} opacity=".55" transform={`rotate(${k * 45} 60 64)`} />
          ))}
        </g>
      )}
      {t.wings && (
        <g fill="#fff" stroke={N} strokeWidth="2.5" strokeLinejoin="round">
          <path d="M26 44 C 6 40, 0 54, 4 66 C 12 62, 16 64, 22 70 C 14 74, 14 82, 20 86 C 24 80, 28 78, 30 78 Z" />
          <path d="M94 44 C 114 40, 120 54, 116 66 C 108 62, 104 64, 98 70 C 106 74, 106 82, 100 86 C 96 80, 92 78, 90 78 Z" />
          <path d="M10 60 l12 4 M14 76 l10 0 M110 60 l-12 4 M106 76 l-10 0" fill="none" strokeWidth="1.8" />
        </g>
      )}
      <path d={shield} transform="translate(0 5)" fill={N} />
      <path d={shield} fill={`url(#rim-${id})`} stroke={N} strokeWidth="3.5" strokeLinejoin="round" />
      <path d={inner} fill={t.field} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M34 37 L60 28 L86 37 V48 C 70 44, 50 44, 34 52 Z" fill="#fff" opacity=".18" />
      <IconArt name={icon} x={38} y={42} size={44} />
      <g clipPath={`url(#clip-${id})`}>
        <rect className="tq-shine" x="20" y="20" width="18" height="100" fill="#fff" opacity=".45" style={{ transform: "translateX(-120%) skewX(-20deg)" }} />
      </g>
      {Array.from({ length: 3 }).map((_, k) => (
        <path
          key={k}
          d={STAR}
          transform={`translate(${36 + k * 16} ${k === 1 ? 0 : 5}) scale(${k === 1 ? 0.85 : 0.7})`}
          fill={k < stars && !locked ? "#ffd23f" : "#fff"}
          stroke={N}
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      ))}
      <g transform="translate(0 108)">
        <path d="M8 6 h18 v18 h-18 l6 -9 z M112 6 h-18 v18 h18 l-6 -9 z" fill={locked ? "#8e99b3" : "#5230b8"} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 0 h80 l4 6 v14 l-4 6 h-80 l-4 -6 v-14 z" fill={locked ? "#aab4c9" : "#6741d9"} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
        <text x="60" y="18" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff" fontFamily="var(--tq-display)">
          {label}
        </text>
      </g>
      {!locked &&
        [
          [22, 26],
          [100, 22],
          [96, 96],
        ].map(([x, y], k) => (
          <path key={k} className="tq-anim" d={`M${x} ${y - 6} L${x + 1.6} ${y - 1.6} L${x + 6} ${y} L${x + 1.6} ${y + 1.6} L${x} ${y + 6} L${x - 1.6} ${y + 1.6} L${x - 6} ${y} L${x - 1.6} ${y - 1.6} Z`} fill="#fff" stroke={N} strokeWidth="1.4" style={{ transformOrigin: `${x}px ${y}px`, animation: `tq-twinkle 1.8s ${k * 0.5}s ease-in-out infinite` }} />
        ))}
      {locked && <IconArt name="lock" x={44} y={48} size={32} />}
    </svg>
  );
}
