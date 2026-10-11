// Dawn: icons and controls drawn around one idea, the moment the light comes back.
// Icon rules: 1.5px twilight line, round caps, a lilac-to-sky fill, and one point of first light.

const T = "#2e3150";
const LIGHT = "#fff1b8"; // the first light: pale gold, decoration only

/** Shared gradients and glow; render once per page. */
export function DawnDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="dw-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfc4e6" />
          <stop offset="1" stopColor="#a9c3e6" />
        </linearGradient>
        <linearGradient id="dw-night-day" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e3150" />
          <stop offset=".45" stopColor="#5b4fc4" />
          <stop offset=".75" stopColor="#cfc4e6" />
          <stop offset="1" stopColor="#eef0fa" />
        </linearGradient>
        <radialGradient id="dw-glow">
          <stop offset="0" stopColor={LIGHT} stopOpacity="1" />
          <stop offset=".45" stopColor={LIGHT} stopOpacity=".55" />
          <stop offset="1" stopColor={LIGHT} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function Light({ x, y, r = 2.2 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 3.2} fill="url(#dw-glow)" />
      <circle cx={x} cy={y} r={r} fill={LIGHT} stroke={T} strokeWidth="1" />
    </g>
  );
}

const line = { fill: "none", stroke: T, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const fill = { fill: "url(#dw-fill)", stroke: T, strokeWidth: 1.5, strokeLinejoin: "round" as const };

export type DawnIconName =
  | "sunrise"
  | "moonset"
  | "ridges"
  | "tent"
  | "lantern"
  | "morning-star"
  | "dew"
  | "bird"
  | "compass"
  | "boot"
  | "path"
  | "clock"
  | "cloud"
  | "calendar"
  | "map"
  | "permit";

const art: Record<DawnIconName, React.ReactNode> = {
  sunrise: (
    <>
      <path d="M14 32 a10 10 0 0 1 20 0 Z" {...fill} />
      <path d="M6 32 h36 M12 38 h24" {...line} />
      <path d="M24 12 v5 M12 17 l3 3 M36 17 l-3 3" {...line} />
      <Light x={24} y={27} />
    </>
  ),
  moonset: (
    <>
      <path d="M28 10 a12 12 0 1 0 8 20 a9 9 0 1 1 -8 -20 z" {...fill} />
      <path d="M6 36 h36" {...line} />
      <Light x={38} y={12} r={1.8} />
    </>
  ),
  ridges: (
    <>
      <path d="M4 34 L16 18 L24 28 L32 16 L44 34 Z" {...fill} />
      <path d="M8 40 h32 M14 44 h20" {...line} opacity=".55" />
      <Light x={32} y={10} />
    </>
  ),
  tent: (
    <>
      <path d="M6 38 L24 10 L42 38 Z" {...fill} />
      <path d="M24 10 L30 38 H18 Z" fill={LIGHT} stroke={T} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 38 h44" {...line} />
      <circle cx="24" cy="32" r="7" fill="url(#dw-glow)" />
    </>
  ),
  lantern: (
    <>
      <path d="M18 12 h12 M24 6 v6" {...line} />
      <rect x="16" y="12" width="16" height="24" rx="6" {...fill} />
      <path d="M16 36 h16 M20 40 h8" {...line} />
      <Light x={24} y={24} r={3} />
    </>
  ),
  "morning-star": (
    <>
      <path d="M24 6 C 25 18, 30 23, 42 24 C 30 25, 25 30, 24 42 C 23 30, 18 25, 6 24 C 18 23, 23 18, 24 6 Z" {...fill} />
      <Light x={24} y={24} r={2.6} />
    </>
  ),
  dew: (
    <>
      <path d="M24 6 C 18 16, 12 22, 12 30 a12 12 0 0 0 24 0 c0 -8 -6 -14 -12 -24 z" {...fill} />
      <path d="M8 44 C 16 40, 32 40, 40 44" {...line} />
      <Light x={19} y={28} r={2} />
    </>
  ),
  bird: (
    <>
      <path d="M6 22 C 12 16, 18 18, 24 24 C 30 18, 36 16, 42 22" {...line} />
      <path d="M14 32 C 17 29, 20 30, 22 33 C 24 30, 27 29, 30 32" {...line} opacity=".6" />
      <path d="M4 40 h40" {...line} opacity=".4" />
      <Light x={38} y={10} r={1.8} />
    </>
  ),
  compass: (
    <>
      <circle cx="24" cy="24" r="17" {...fill} />
      <path d="M24 12 L28 24 L24 36 L20 24 Z" fill="#fff" stroke={T} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 12 L28 24 H20 Z" fill={T} />
      <Light x={24} y={12} r={1.8} />
    </>
  ),
  boot: (
    <>
      <path d="M14 8 h12 v16 c7 1 13 4 14 10 v4 H10 v-6 l4 -6 z" {...fill} />
      <path d="M10 38 h30 M17 14 h7 M17 19 h7" {...line} />
      <Light x={36} y={10} r={1.8} />
    </>
  ),
  path: (
    <>
      <path d="M4 18 h40" {...line} opacity=".55" />
      <path d="M20 44 C 22 36, 30 32, 26 26 C 24 22, 22 20, 24 18" fill="none" stroke={T} strokeWidth="7" strokeLinecap="round" />
      <path d="M20 44 C 22 36, 30 32, 26 26 C 24 22, 22 20, 24 18" fill="none" stroke="#cfc4e6" strokeWidth="4" strokeLinecap="round" />
      <Light x={24} y={14} r={2.6} />
    </>
  ),
  clock: (
    <>
      <circle cx="24" cy="25" r="17" {...fill} />
      <path d="M24 25 V13 M24 25 l-9 6" {...line} strokeWidth={2} />
      <Light x={24} y={42} r={1.8} />
    </>
  ),
  cloud: (
    <>
      <path d="M12 34 h24 a7 7 0 0 0 1 -14 a10 10 0 0 0 -19 -2 a7 7 0 0 0 -6 16 z" {...fill} />
      <path d="M8 40 h32" {...line} opacity=".5" />
      <Light x={34} y={14} r={2} />
    </>
  ),
  calendar: (
    <>
      <rect x="8" y="10" width="32" height="30" rx="6" {...fill} />
      <path d="M8 18 h32 M16 6 v8 M32 6 v8" {...line} />
      <path d="M16 32 a8 8 0 0 1 16 0" {...line} />
      <Light x={24} y={30} r={1.8} />
    </>
  ),
  map: (
    <>
      <path d="M6 12 L17 8 L31 12 L42 8 V36 L31 40 L17 36 L6 40 Z" {...fill} />
      <path d="M17 8 V36 M31 12 V40" {...line} opacity=".6" />
      <path d="M11 30 C 16 24, 22 28, 26 22 S 34 16, 37 14" fill="none" stroke={T} strokeWidth="1.5" strokeDasharray="2 3" strokeLinecap="round" />
      <Light x={37} y={14} r={2} />
    </>
  ),
  permit: (
    <>
      <path d="M6 14 h36 v7 a3 3 0 0 0 0 6 v7 H6 v-7 a3 3 0 0 0 0 -6 z" {...fill} />
      <path d="M30 15 v18" {...line} strokeDasharray="2 3" />
      <path d="M12 24 h12 M12 29 h8" {...line} />
      <Light x={36} y={24} r={2} />
    </>
  ),
};

export const DAWN_ICON_NAMES = Object.keys(art) as DawnIconName[];

export function DawnIcon({ name, size = 32, label }: { name: DawnIconName; size?: number; label?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {art[name]}
    </svg>
  );
}

/* ---------- controls with a dawn in them ---------- */

/** On: the sun is up and the track is day. Off: the moon is low and the track is night. */
export function SunToggle({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className="relative inline-block h-9 w-[68px] overflow-hidden rounded-full border border-white/70 shadow-[inset_0_1px_3px_rgba(46,49,80,.25)]"
        style={{ background: on ? "linear-gradient(180deg,#a9c3e6,#eef0fa)" : "linear-gradient(180deg,#2e3150,#5b4fc4)" }}
      >
        <span className="absolute inset-x-0 bottom-0 h-2.5 bg-white/40" />
        <span
          className={`absolute top-1.5 grid h-6 w-6 place-items-center rounded-full ${on ? "right-1.5 bg-[#fff1b8] shadow-[0_0_14px_6px_rgba(255,241,184,.85)]" : "left-1.5 bg-[#e8e6f5] shadow-[0_0_8px_2px_rgba(207,196,230,.6)]"}`}
        >
          {!on && <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full bg-[#2e3150]" />}
        </span>
        {!on && (
          <>
            <span className="absolute right-4 top-2 h-0.5 w-0.5 rounded-full bg-white" />
            <span className="absolute right-7 top-5 h-0.5 w-0.5 rounded-full bg-white" />
          </>
        )}
      </span>
      <span className="text-sm">{label}</span>
    </span>
  );
}

/** Start-time slider: the track runs from night to morning; the thumb is the sun. */
export function StartSlider({ at = 0.62 }: { at?: number }) {
  return (
    <div className="py-3">
      <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#5d6180]">
        <span>4:00</span>
        <span>Start at 5:50</span>
        <span>7:00</span>
      </div>
      <div className="relative mt-3 h-3 rounded-full" style={{ background: "linear-gradient(90deg,#2e3150,#5b4fc4 45%,#cfc4e6 75%,#eef0fa)" }}>
        <span className="absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-[#fff1b8] shadow-[0_0_18px_8px_rgba(255,241,184,.8)]" style={{ left: `${at * 100}%` }} />
      </div>
    </div>
  );
}

/** Progress as the sun's arc: how far along the walk you are. */
export function SunArc({ progress = 0.4, caption }: { progress?: number; caption: string }) {
  const a = Math.PI * (1 - progress);
  const x = 100 + 80 * Math.cos(a);
  const y = 96 - 80 * Math.sin(a);
  return (
    <svg viewBox="0 0 200 120" className="block h-auto w-full" role="img" aria-label={caption}>
      <path d="M20 96 A80 80 0 0 1 180 96" fill="none" stroke="#cfc4e6" strokeWidth="2" strokeDasharray="3 5" />
      <path d={`M20 96 A80 80 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`} fill="none" stroke="#5b4fc4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 96 h188" stroke={T} strokeWidth="1.5" />
      <circle cx={x} cy={y} r="22" fill="url(#dw-glow)" />
      <circle cx={x} cy={y} r="7" fill="#fff1b8" stroke={T} strokeWidth="1.2" />
      <text x="100" y="114" textAnchor="middle" fontSize="10" letterSpacing="2" fill="#5d6180">
        {caption.toUpperCase()}
      </text>
    </svg>
  );
}

/** Loading: the sun lifts behind the horizon and settles again. */
export function SunriseLoader() {
  return (
    <svg viewBox="0 0 160 90" className="block h-auto w-full" role="img" aria-label="Loading: a sun rising slowly behind the horizon">
      <defs>
        <clipPath id="dw-horizon">
          <rect width="160" height="62" />
        </clipPath>
      </defs>
      <g clipPath="url(#dw-horizon)">
        <g className="motion-safe:animate-[dw-rise_3.2s_ease-in-out_infinite]">
          <circle cx="80" cy="64" r="30" fill="url(#dw-glow)" />
          <circle cx="80" cy="64" r="11" fill="#fff1b8" stroke={T} strokeWidth="1.2" />
        </g>
      </g>
      <path d="M10 62 h140" stroke={T} strokeWidth="1.5" />
      <path d="M30 72 h100 M50 80 h60" stroke={T} strokeWidth="1.2" opacity=".35" />
    </svg>
  );
}
