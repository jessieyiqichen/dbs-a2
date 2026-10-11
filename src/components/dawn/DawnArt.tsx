// Dawn: icons and controls drawn around one idea, the moment the light comes back.
// Icon rules: a fine, slightly faded line over a soft watercolour wash that sits a little off the line,
// horizons that fade out at both ends, and one point of first light.

const T = "#2e3150";
const LIGHT = "#fff1b8"; // the first light: pale gold, decoration only

/** Shared gradients, glow and blur; render once per page. */
export function DawnDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="dw-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d7cdf0" />
          <stop offset="1" stopColor="#b3cdee" />
        </linearGradient>
        <linearGradient id="dw-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={T} stopOpacity="0" />
          <stop offset=".25" stopColor={T} stopOpacity=".7" />
          <stop offset=".75" stopColor={T} stopOpacity=".7" />
          <stop offset="1" stopColor={T} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="dw-glow">
          <stop offset="0" stopColor={LIGHT} stopOpacity="1" />
          <stop offset=".4" stopColor={LIGHT} stopOpacity=".6" />
          <stop offset="1" stopColor={LIGHT} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dw-warm" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={LIGHT} stopOpacity=".9" />
          <stop offset=".5" stopColor="#f3d9ef" stopOpacity=".5" />
          <stop offset="1" stopColor="#cfc4e6" stopOpacity="0" />
        </linearGradient>
        <filter id="dw-wash" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
        <filter id="dw-haze" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>
    </svg>
  );
}

/** The watercolour wash: blurred, a touch offset from the line. */
function Wash({ d }: { d: string }) {
  return <path d={d} fill="url(#dw-fill)" filter="url(#dw-wash)" transform="translate(1.3 1.6)" opacity=".95" />;
}
/** The fine line, never full black. */
function Line({ d, w = 1.25, o = 0.85 }: { d: string; w?: number; o?: number }) {
  return <path d={d} fill="none" stroke={T} strokeWidth={w} strokeOpacity={o} strokeLinecap="round" strokeLinejoin="round" />;
}
/** A horizon that fades out at both ends. */
function Horizon({ y, x1 = 4, x2 = 44 }: { y: number; x1?: number; x2?: number }) {
  const m = (x1 + x2) / 2;
  return <path d={`M${x1} ${y} C ${m - 8} ${y - 1.2}, ${m + 8} ${y + 1.2}, ${x2} ${y}`} fill="none" stroke="url(#dw-fade)" strokeWidth="1.2" strokeLinecap="round" />;
}
function Light({ x, y, r = 2 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 4} fill="url(#dw-glow)" />
      <circle cx={x} cy={y} r={r} fill={LIGHT} />
    </g>
  );
}

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
      <circle cx="24" cy="30" r="13" fill="url(#dw-glow)" />
      <Wash d="M14 31 C 14 24, 19 20, 24 20 C 29 20, 34 24, 34 31 Z" />
      <Line d="M14 31 C 14 24, 19 20, 24 20 C 29 20, 34 24, 34 31" />
      <Horizon y={31} />
      <Horizon y={37} x1={12} x2={36} />
      <Line d="M24 11 v3.5 M13.5 15.5 l2.2 2.2 M34.5 15.5 l-2.2 2.2" o={0.55} />
      <Light x={24} y={26} />
    </>
  ),
  moonset: (
    <>
      <Wash d="M27 9 C 18 10, 13 18, 15 26 C 17 33, 25 36, 32 32 C 25 31, 21 25, 22 19 C 23 14, 25 11, 27 9 Z" />
      <Line d="M27 9 C 18 10, 13 18, 15 26 C 17 33, 25 36, 32 32 C 25 31, 21 25, 22 19 C 23 14, 25 11, 27 9 Z" />
      <Horizon y={38} />
      <Light x={37} y={13} r={1.6} />
    </>
  ),
  ridges: (
    <>
      <Wash d="M4 33 C 9 30, 12 22, 16 19 C 19 21, 21 26, 24 27 C 27 23, 29 17, 32 16 C 36 19, 40 28, 44 33 Z" />
      <Line d="M4 33 C 9 30, 12 22, 16 19 C 19 21, 21 26, 24 27 C 27 23, 29 17, 32 16 C 36 19, 40 28, 44 33" />
      <Horizon y={38} />
      <Horizon y={43} x1={12} x2={36} />
      <Light x={32} y={9} />
    </>
  ),
  tent: (
    <>
      <circle cx="24" cy="32" r="10" fill="url(#dw-glow)" />
      <Wash d="M7 37 C 12 30, 18 18, 24 10 C 30 18, 36 30, 41 37 Z" />
      <Line d="M7 37 C 12 30, 18 18, 24 10 C 30 18, 36 30, 41 37" />
      <path d="M24 13 C 25 22, 27 30, 29 37 H19 C 21 30, 23 22, 24 13 Z" fill={LIGHT} opacity=".9" />
      <Horizon y={38} />
    </>
  ),
  lantern: (
    <>
      <Line d="M19 12 C 21 11, 27 11, 29 12 M24 6 v5" o={0.6} />
      <circle cx="24" cy="24" r="12" fill="url(#dw-glow)" />
      <Wash d="M17 15 C 17 13, 31 13, 31 15 C 33 21, 33 29, 31 34 C 29 36, 19 36, 17 34 C 15 29, 15 21, 17 15 Z" />
      <Line d="M17 15 C 17 13, 31 13, 31 15 C 33 21, 33 29, 31 34 C 29 36, 19 36, 17 34 C 15 29, 15 21, 17 15 Z" />
      <Line d="M20 39 C 22 40, 26 40, 28 39" o={0.55} />
      <Light x={24} y={25} r={2.6} />
    </>
  ),
  "morning-star": (
    <>
      <circle cx="24" cy="24" r="14" fill="url(#dw-glow)" />
      <Wash d="M24 7 C 25 18, 29 22, 41 24 C 29 26, 25 30, 24 41 C 23 30, 19 26, 7 24 C 19 22, 23 18, 24 7 Z" />
      <Line d="M24 7 C 25 18, 29 22, 41 24 C 29 26, 25 30, 24 41 C 23 30, 19 26, 7 24 C 19 22, 23 18, 24 7 Z" o={0.7} />
      <Light x={24} y={24} r={2.2} />
    </>
  ),
  dew: (
    <>
      <Wash d="M24 7 C 20 15, 13 21, 13 29 C 13 36, 18 40, 24 40 C 30 40, 35 36, 35 29 C 35 21, 28 15, 24 7 Z" />
      <Line d="M24 7 C 20 15, 13 21, 13 29 C 13 36, 18 40, 24 40 C 30 40, 35 36, 35 29 C 35 21, 28 15, 24 7 Z" />
      <Horizon y={44} x1={8} x2={40} />
      <Light x={19} y={27} r={1.8} />
    </>
  ),
  bird: (
    <>
      <Line d="M7 22 C 12 17, 18 18, 24 24 C 30 18, 36 17, 41 22" w={1.4} />
      <Line d="M15 31 C 17.5 28.5, 20 29, 22 31.5 C 24 29, 26.5 28.5, 29 31" o={0.5} />
      <Horizon y={39} />
      <Light x={37} y={10} r={1.6} />
    </>
  ),
  compass: (
    <>
      <Wash d="M24 7 C 33 7, 41 15, 41 24 C 41 33, 33 41, 24 41 C 15 41, 7 33, 7 24 C 7 15, 15 7, 24 7 Z" />
      <Line d="M24 7 C 33 7, 41 15, 41 24 C 41 33, 33 41, 24 41 C 15 41, 7 33, 7 24 C 7 15, 15 7, 24 7 Z" />
      <path d="M24 13 C 25.5 18, 27 21, 27.5 24 C 27 27, 25.5 30, 24 35 C 22.5 30, 21 27, 20.5 24 C 21 21, 22.5 18, 24 13 Z" fill="#fff" stroke={T} strokeOpacity=".8" strokeWidth="1.1" />
      <path d="M24 13 C 25.5 18, 27 21, 27.5 24 H20.5 C 21 21, 22.5 18, 24 13 Z" fill={T} opacity=".75" />
      <Light x={24} y={11} r={1.6} />
    </>
  ),
  boot: (
    <>
      <Wash d="M15 8 C 19 7, 24 7, 27 8 C 27 14, 27 19, 28 23 C 35 25, 40 29, 40 34 C 40 36, 39 37, 37 37 H11 C 10 33, 11 29, 14 26 C 15 20, 15 14, 15 8 Z" />
      <Line d="M15 8 C 19 7, 24 7, 27 8 C 27 14, 27 19, 28 23 C 35 25, 40 29, 40 34 C 40 36, 39 37, 37 37 H11 C 10 33, 11 29, 14 26 C 15 20, 15 14, 15 8 Z" />
      <Line d="M18 14 h6 M18 18.5 h6" o={0.55} />
      <Horizon y={41} />
      <Light x={36} y={11} r={1.6} />
    </>
  ),
  path: (
    <>
      <Horizon y={17} />
      <path d="M19 44 C 21 37, 29 33, 26 27 C 24 23, 22 20, 24 17" fill="none" stroke="url(#dw-fill)" strokeWidth="7" strokeLinecap="round" filter="url(#dw-wash)" />
      <Line d="M19 44 C 21 37, 29 33, 26 27 C 24 23, 22 20, 24 17" w={1.1} o={0.6} />
      <Light x={24} y={13} r={2.4} />
    </>
  ),
  clock: (
    <>
      <Wash d="M24 8 C 33 8, 40 15, 40 24 C 40 33, 33 40, 24 40 C 15 40, 8 33, 8 24 C 8 15, 15 8, 24 8 Z" />
      <Line d="M24 8 C 33 8, 40 15, 40 24 C 40 33, 33 40, 24 40 C 15 40, 8 33, 8 24 C 8 15, 15 8, 24 8 Z" />
      <Line d="M24 24 C 24 20, 24 17, 24 14 M24 24 C 21 26, 18 28, 16 29" w={1.6} />
      <Light x={24} y={44} r={1.4} />
    </>
  ),
  cloud: (
    <>
      <Wash d="M12 33 C 7 33, 6 26, 11 24 C 11 18, 18 15, 22 19 C 25 13, 35 14, 35 22 C 41 22, 42 33, 36 33 Z" />
      <Line d="M12 33 C 7 33, 6 26, 11 24 C 11 18, 18 15, 22 19 C 25 13, 35 14, 35 22 C 41 22, 42 33, 36 33 Z" />
      <Horizon y={39} x1={8} x2={40} />
      <Light x={34} y={12} r={1.8} />
    </>
  ),
  calendar: (
    <>
      <Wash d="M13 10 C 20 9, 28 9, 35 10 C 38 10, 40 12, 40 15 C 41 22, 41 30, 40 36 C 40 38, 38 40, 35 40 C 28 41, 20 41, 13 40 C 10 40, 8 38, 8 36 C 7 30, 7 22, 8 15 C 8 12, 10 10, 13 10 Z" />
      <Line d="M13 10 C 20 9, 28 9, 35 10 C 38 10, 40 12, 40 15 C 41 22, 41 30, 40 36 C 40 38, 38 40, 35 40 C 28 41, 20 41, 13 40 C 10 40, 8 38, 8 36 C 7 30, 7 22, 8 15 C 8 12, 10 10, 13 10 Z" />
      <Line d="M9 18 C 18 17.5, 30 17.5, 39 18 M16 6 v7 M32 6 v7" o={0.6} />
      <Line d="M16 33 C 16 28, 20 25, 24 25 C 28 25, 32 28, 32 33" o={0.7} />
      <Light x={24} y={30} r={1.6} />
    </>
  ),
  map: (
    <>
      <Wash d="M6 12 C 10 10, 14 9, 17 8 C 22 10, 26 11, 31 12 C 35 10, 39 9, 42 8 C 42 18, 42 28, 42 36 C 38 38, 35 39, 31 40 C 26 38, 22 37, 17 36 C 13 38, 9 39, 6 40 C 6 30, 6 20, 6 12 Z" />
      <Line d="M6 12 C 10 10, 14 9, 17 8 C 22 10, 26 11, 31 12 C 35 10, 39 9, 42 8 C 42 18, 42 28, 42 36 C 38 38, 35 39, 31 40 C 26 38, 22 37, 17 36 C 13 38, 9 39, 6 40 C 6 30, 6 20, 6 12 Z" />
      <path d="M11 31 C 16 25, 22 29, 26 23 S 34 16, 37 14" fill="none" stroke={T} strokeOpacity=".6" strokeWidth="1.1" strokeDasharray="1.5 3" strokeLinecap="round" />
      <Light x={37} y={14} r={1.8} />
    </>
  ),
  permit: (
    <>
      <Wash d="M7 15 C 18 14, 30 14, 41 15 C 41 18, 41 20, 41 21 C 38 22, 38 26, 41 27 C 41 29, 41 31, 41 33 C 30 34, 18 34, 7 33 C 7 31, 7 29, 7 27 C 10 26, 10 22, 7 21 C 7 19, 7 17, 7 15 Z" />
      <Line d="M7 15 C 18 14, 30 14, 41 15 C 41 18, 41 20, 41 21 C 38 22, 38 26, 41 27 C 41 29, 41 31, 41 33 C 30 34, 18 34, 7 33 C 7 31, 7 29, 7 27 C 10 26, 10 22, 7 21 C 7 19, 7 17, 7 15 Z" />
      <Line d="M13 22 C 17 21.6, 21 21.6, 25 22 M13 27 C 15.5 26.7, 18 26.7, 20 27" o={0.55} />
      <Light x={33} y={24} r={1.8} />
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

const EASE = "cubic-bezier(.45,0,.2,1)";

/** Start-time slider: the track runs from night to morning; the thumb is the sun, breathing slowly. */
export function StartSlider({ at = 0.62 }: { at?: number }) {
  return (
    <div className="py-3">
      <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#5d6180]">
        <span>4:00</span>
        <span>Start at 5:50</span>
        <span>7:00</span>
      </div>
      <div className="relative mt-4 h-2 rounded-full" style={{ background: "linear-gradient(90deg,#2e3150,#5b4fc4 40%,#cfc4e6 72%,#f6eef4 90%,#fff8e0)" }}>
        <span
          className="absolute top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full motion-safe:animate-[dw-pulse_6s_ease-in-out_infinite]"
          style={{ left: `${at * 100}%`, background: "radial-gradient(circle, rgba(255,241,184,.95), rgba(255,241,184,.35) 40%, transparent 70%)" }}
        />
        <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff1b8]" style={{ left: `${at * 100}%` }} />
      </div>
    </div>
  );
}

/** Progress as the sun's arc: the sun breathes where you are; the walked part of the sky is warmer. */
export function SunArc({ progress = 0.4, caption }: { progress?: number; caption: string }) {
  const a = Math.PI * (1 - progress);
  const x = 100 + 80 * Math.cos(a);
  const y = 96 - 80 * Math.sin(a);
  return (
    <svg viewBox="0 0 200 122" className="block h-auto w-full" role="img" aria-label={caption}>
      <defs>
        <linearGradient id="dw-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b4fc4" stopOpacity=".2" />
          <stop offset="1" stopColor="#5b4fc4" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <path d="M20 96 A80 80 0 0 1 180 96" fill="none" stroke="#cfc4e6" strokeWidth="1.2" strokeDasharray="1 5" strokeLinecap="round" />
      <path d={`M20 96 A80 80 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`} fill="none" stroke="url(#dw-arc)" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 96 C 60 94.5, 140 97.5, 198 96" fill="none" stroke="url(#dw-fade)" strokeWidth="1.3" />
      <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: `dw-pulse 6s ${EASE} infinite` }} className="dw-anim">
        <circle cx={x} cy={y} r="26" fill="url(#dw-glow)" />
      </g>
      <circle cx={x} cy={y} r="5.5" fill="#fff1b8" />
      <text x="100" y="116" textAnchor="middle" fontSize="9.5" letterSpacing="2" fill="#5d6180">
        {caption.toUpperCase()}
      </text>
    </svg>
  );
}

/** Loading: the sky warms, mist drifts, and the sun comes up out of a blur, then sinks back. */
export function SunriseLoader() {
  return (
    <svg viewBox="0 0 200 110" className="dw-anim block h-auto w-full overflow-hidden rounded-2xl" role="img" aria-label="Loading: the sky warms and a sun rises slowly behind the horizon">
      <defs>
        <clipPath id="dw-above">
          <rect width="200" height="74" />
        </clipPath>
      </defs>
      <rect width="200" height="110" fill="#e4dff3" />
      <rect width="200" height="110" fill="url(#dw-warm)" style={{ animation: `dw-warmup 7s ${EASE} infinite alternate` }} />
      <g clipPath="url(#dw-above)">
        <g style={{ animation: `dw-rise 7s ${EASE} infinite alternate` }}>
          <circle cx="100" cy="74" r="42" fill="url(#dw-glow)" />
          <circle cx="100" cy="74" r="12" fill="#fff1b8" style={{ animation: `dw-focus 7s ${EASE} infinite alternate` }} />
        </g>
      </g>
      <path d="M-10 74 C 60 72, 140 76, 210 74" fill="none" stroke="url(#dw-fade)" strokeWidth="1.3" />
      <g opacity=".7" filter="url(#dw-haze)">
        <path d="M-20 80 C 30 76, 90 84, 220 79" stroke="#fff" strokeWidth="6" fill="none" style={{ animation: `dw-mist 9s ${EASE} infinite alternate` }} />
        <path d="M-20 92 C 50 88, 120 96, 220 90" stroke="#fff" strokeWidth="5" fill="none" style={{ animation: `dw-mist 11s ${EASE} infinite alternate-reverse` }} />
      </g>
    </svg>
  );
}

/** Keyframes for the board; every loop is slow and stops under reduced motion. */
export const DAWN_KEYFRAMES = `
@keyframes dw-rise { from { transform: translateY(34px) } to { transform: translateY(4px) } }
@keyframes dw-focus { from { filter: blur(2.5px); opacity: .6 } to { filter: blur(0); opacity: 1 } }
@keyframes dw-warmup { from { opacity: .15 } to { opacity: 1 } }
@keyframes dw-mist { from { transform: translateX(-10px) } to { transform: translateX(12px) } }
@keyframes dw-pulse { 0%, 100% { scale: .85; opacity: .75 } 50% { scale: 1.12; opacity: 1 } }
@media (prefers-reduced-motion: reduce) { .dw-anim, .dw-anim * { animation: none !important } }
`;
