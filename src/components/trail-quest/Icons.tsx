// Trail Quest icon set: one family, drawn for this project.
// Rules: 3px navy outline, one base colour, a darker shade on the side away from the light, one white highlight.

const N = "#1d2b53";
const S = 3; // outline width

export type IconName =
  | "boot"
  | "mountain"
  | "star"
  | "coin"
  | "gem"
  | "lock"
  | "trophy"
  | "compass"
  | "tent"
  | "backpack"
  | "flag"
  | "ticket"
  | "chest"
  | "clock"
  | "scroll"
  | "snow"
  | "sun"
  | "cloud"
  | "drop"
  | "gear"
  | "info"
  | "plus";

const art: Record<IconName, React.ReactNode> = {
  boot: (
    <>
      <path d="M14 6 h14 v18 c8 1 14 4 15 10 v4 H8 v-6 l4 -6 z" fill="#4cc3ff" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M28 24 c8 1 14 4 15 10 v4 h-10 v-6 c0 -4 -2 -6 -5 -8 z" fill="#2d9fe0" />
      <path d="M8 38 h35 v4 H8 z" fill={N} />
      <path d="M17 12 h8 M17 17 h8" stroke="#ffd23f" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="17" cy="9" rx="2.5" ry="1.5" fill="#fff" opacity=".8" />
    </>
  ),
  mountain: (
    <>
      <path d="M3 40 L19 12 L26 24 L31 17 L45 40 Z" fill="#8fa3d6" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M19 12 L29 30 L45 40 H30 Z" fill="#6f83bd" />
      <path d="M13 22 L19 12 L24 21 L21 19 L18 22 L16 20 Z" fill="#fff" stroke={N} strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 40 L19 12 L26 24 L31 17 L45 40 Z" fill="none" stroke={N} strokeWidth={S} strokeLinejoin="round" />
    </>
  ),
  star: (
    <>
      <path d="M24 4l6 12.5 13.7 1.8-10 9.5 2.6 13.6L24 34.8l-12.3 6.6 2.6-13.6-10-9.5 13.7-1.8z" fill="#ffd23f" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M24 4l6 12.5 13.7 1.8-10 9.5 2.6 13.6L24 34.8z" fill="#f5b800" />
      <path d="M24 4l6 12.5 13.7 1.8-10 9.5 2.6 13.6L24 34.8l-12.3 6.6 2.6-13.6-10-9.5 13.7-1.8z" fill="none" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="18" cy="18" rx="3" ry="2" fill="#fff" opacity=".85" transform="rotate(-30 18 18)" />
    </>
  ),
  coin: (
    <>
      <ellipse cx="24" cy="27" rx="18" ry="16" fill="#d4a90a" stroke={N} strokeWidth={S} />
      <ellipse cx="24" cy="23" rx="18" ry="16" fill="#ffd23f" stroke={N} strokeWidth={S} />
      <ellipse cx="24" cy="23" rx="12" ry="10.5" fill="none" stroke="#d4a90a" strokeWidth="2.5" />
      <path d="M24 15l2.4 5 5.4.7-4 3.7 1 5.4-4.8-2.6-4.8 2.6 1-5.4-4-3.7 5.4-.7z" fill="#fff6c7" />
      <ellipse cx="15" cy="15" rx="3" ry="1.6" fill="#fff" opacity=".8" transform="rotate(-30 15 15)" />
    </>
  ),
  gem: (
    <>
      <path d="M12 8 h24 l9 11 L24 43 L3 19 Z" fill="#7be48a" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M3 19 h42 M16 8 l-4 11 l12 24 l12 -24 l-4 -11" fill="none" stroke={N} strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 43 L36 19 H45 Z" fill="#2f9e44" opacity=".7" />
      <path d="M13 12 l4 -2" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  lock: (
    <>
      <path d="M15 21 v-6 a9 9 0 0 1 18 0 v6" fill="none" stroke={N} strokeWidth="8" />
      <path d="M15 21 v-6 a9 9 0 0 1 18 0 v6" fill="none" stroke="#c5cde0" strokeWidth="3.5" />
      <rect x="8" y="20" width="32" height="24" rx="6" fill="#ffd23f" stroke={N} strokeWidth={S} />
      <path d="M30 20 h4 a6 6 0 0 1 6 6 v12 a6 6 0 0 1 -6 6 h-4 z" fill="#f5b800" />
      <rect x="8" y="20" width="32" height="24" rx="6" fill="none" stroke={N} strokeWidth={S} />
      <path d="M24 29 a3 3 0 1 1 0.1 0 M24 31 v5" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="14" cy="25" rx="3" ry="1.6" fill="#fff" opacity=".8" />
    </>
  ),
  trophy: (
    <>
      <path d="M12 9 H6 a6 6 0 0 0 7 9 M36 9 h6 a6 6 0 0 1 -7 9" fill="none" stroke={N} strokeWidth={S} />
      <path d="M12 6 h24 v8 c0 9 -5 15 -12 15 s-12 -6 -12 -15 z" fill="#ffd23f" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M30 6 h6 v8 c0 9 -5 15 -12 15 c4 -3 6 -8 6 -15 z" fill="#f5b800" />
      <path d="M12 6 h24 v8 c0 9 -5 15 -12 15 s-12 -6 -12 -15 z" fill="none" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M20 29 h8 v6 h-8 z" fill="#f5b800" stroke={N} strokeWidth="2.5" />
      <rect x="13" y="35" width="22" height="8" rx="2" fill="#6741d9" stroke={N} strokeWidth={S} />
      <ellipse cx="17" cy="11" rx="2" ry="3" fill="#fff" opacity=".85" />
    </>
  ),
  compass: (
    <>
      <circle cx="24" cy="25" r="19" fill="#6741d9" stroke={N} strokeWidth={S} />
      <circle cx="24" cy="25" r="13" fill="#fff" stroke={N} strokeWidth="2.5" />
      <path d="M24 13 L28 25 L24 37 L20 25 Z" fill="#c5cde0" stroke={N} strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 13 L28 25 H20 Z" fill="#4cc3ff" stroke={N} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="25" r="2" fill={N} />
      <ellipse cx="13" cy="14" rx="3" ry="1.6" fill="#fff" opacity=".7" transform="rotate(-40 13 14)" />
    </>
  ),
  tent: (
    <>
      <path d="M4 40 L22 8 L44 40 Z" fill="#58d36b" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M22 8 L44 40 H30 Z" fill="#2f9e44" />
      <path d="M22 8 L29 40 H16 Z" fill="#1d2b53" />
      <path d="M4 40 L22 8 L44 40 Z" fill="none" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M2 41 h44" stroke={N} strokeWidth={S} strokeLinecap="round" />
      <path d="M12 26 l5 -9" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".8" />
    </>
  ),
  backpack: (
    <>
      <path d="M18 8 a6 6 0 0 1 12 0" fill="none" stroke={N} strokeWidth={S} />
      <rect x="9" y="9" width="30" height="34" rx="10" fill="#6741d9" stroke={N} strokeWidth={S} />
      <path d="M29 9 h0 a10 10 0 0 1 10 10 v14 a10 10 0 0 1 -10 10 z" fill="#5230b8" />
      <rect x="9" y="9" width="30" height="34" rx="10" fill="none" stroke={N} strokeWidth={S} />
      <rect x="15" y="26" width="18" height="12" rx="4" fill="#8a6cf0" stroke={N} strokeWidth="2.5" />
      <path d="M15 31 h18" stroke={N} strokeWidth="2" />
      <ellipse cx="15" cy="15" rx="3" ry="1.6" fill="#fff" opacity=".7" />
    </>
  ),
  flag: (
    <>
      <path d="M10 44 V5" stroke={N} strokeWidth="4" strokeLinecap="round" />
      <path d="M10 6 h28 l-6 8 l6 8 H10 z" fill="#ffd23f" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M10 14 h22 l6 8 H10 z" fill="#f5b800" />
      <path d="M10 6 h28 l-6 8 l6 8 H10 z" fill="none" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="10" cy="44" rx="7" ry="2.5" fill={N} />
    </>
  ),
  ticket: (
    <>
      <path d="M4 14 h40 v6 a4 4 0 0 0 0 8 v6 H4 v-6 a4 4 0 0 0 0 -8 z" fill="#4cc3ff" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M30 14 h14 v6 a4 4 0 0 0 0 8 v6 H30 z" fill="#2d9fe0" />
      <path d="M4 14 h40 v6 a4 4 0 0 0 0 8 v6 H4 v-6 a4 4 0 0 0 0 -8 z" fill="none" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M30 15 v18" stroke={N} strokeWidth="2" strokeDasharray="3 3" />
      <path d="M17 18l2 4.2 4.6.6-3.3 3.1.8 4.6-4.1-2.2-4.1 2.2.8-4.6-3.3-3.1 4.6-.6z" fill="#ffd23f" stroke={N} strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
  chest: (
    <>
      <path d="M6 22 a18 12 0 0 1 36 0 v2 H6 z" fill="#6741d9" stroke={N} strokeWidth={S} />
      <rect x="6" y="22" width="36" height="20" rx="3" fill="#8a6cf0" stroke={N} strokeWidth={S} />
      <path d="M30 22 h12 v17 a3 3 0 0 1 -3 3 h-9 z" fill="#6741d9" />
      <rect x="6" y="22" width="36" height="20" rx="3" fill="none" stroke={N} strokeWidth={S} />
      <path d="M14 11 v31 M34 11 v31" stroke="#ffd23f" strokeWidth="4" />
      <path d="M14 11 v31 M34 11 v31" stroke={N} strokeWidth="1" opacity=".4" />
      <rect x="20" y="20" width="8" height="10" rx="2" fill="#ffd23f" stroke={N} strokeWidth="2.5" />
      <ellipse cx="12" cy="17" rx="3" ry="1.5" fill="#fff" opacity=".7" />
    </>
  ),
  clock: (
    <>
      <circle cx="24" cy="25" r="19" fill="#4cc3ff" stroke={N} strokeWidth={S} />
      <circle cx="24" cy="25" r="14" fill="#fff" stroke={N} strokeWidth="2.5" />
      <path d="M24 16 v9 l6 4" stroke={N} strokeWidth="3" strokeLinecap="round" />
      <path d="M17 4 l-5 4 M31 4 l5 4" stroke={N} strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  scroll: (
    <>
      <rect x="9" y="8" width="30" height="32" rx="2" fill="#fff6d8" stroke={N} strokeWidth={S} />
      <rect x="5" y="6" width="38" height="6" rx="3" fill="#f5e3a6" stroke={N} strokeWidth={S} />
      <rect x="5" y="36" width="38" height="6" rx="3" fill="#f5e3a6" stroke={N} strokeWidth={S} />
      <path d="M14 30 c4 -8 8 2 12 -6 s6 -4 8 -8" fill="none" stroke="#6741d9" strokeWidth="2.6" strokeDasharray="2 4" strokeLinecap="round" />
      <circle cx="34" cy="16" r="3" fill="#58d36b" stroke={N} strokeWidth="2" />
    </>
  ),
  snow: (
    <>
      <path d="M24 4 v40 M7 14 l34 20 M41 14 L7 34" stroke={N} strokeWidth="7" strokeLinecap="round" />
      <path d="M24 4 v40 M7 14 l34 20 M41 14 L7 34" stroke="#9ee3ff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="5" fill="#fff" stroke={N} strokeWidth="2.5" />
    </>
  ),
  sun: (
    <>
      <g stroke={N} strokeWidth="6" strokeLinecap="round">
        <path d="M24 3 v6 M24 39 v6 M3 24 h6 M39 24 h6 M9 9 l4 4 M35 35 l4 4 M39 9 l-4 4 M9 39 l4 -4" />
      </g>
      <g stroke="#ffd23f" strokeWidth="2.5" strokeLinecap="round">
        <path d="M24 3 v6 M24 39 v6 M3 24 h6 M39 24 h6 M9 9 l4 4 M35 35 l4 4 M39 9 l-4 4 M9 39 l4 -4" />
      </g>
      <circle cx="24" cy="24" r="11" fill="#ffd23f" stroke={N} strokeWidth={S} />
      <ellipse cx="20" cy="20" rx="3" ry="2" fill="#fff" opacity=".8" />
    </>
  ),
  cloud: (
    <>
      <path d="M12 36 h24 a8 8 0 0 0 1 -16 a11 11 0 0 0 -21 -2 a8 8 0 0 0 -4 18 z" fill="#fff" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M14 33 h21" stroke="#c8efff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  drop: (
    <>
      <path d="M24 4 C 16 16, 10 22, 10 30 a14 14 0 0 0 28 0 c0 -8 -6 -14 -14 -26 z" fill="#4cc3ff" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <path d="M30 20 c4 5 8 7 8 12 a14 14 0 0 1 -12 12 c6 -4 8 -12 4 -24 z" fill="#2d9fe0" />
      <path d="M24 4 C 16 16, 10 22, 10 30 a14 14 0 0 0 28 0 c0 -8 -6 -14 -14 -26 z" fill="none" stroke={N} strokeWidth={S} strokeLinejoin="round" />
      <ellipse cx="17" cy="30" rx="2.5" ry="4" fill="#fff" opacity=".8" />
    </>
  ),
  gear: (
    <>
      <path
        d="M21 4h6l1 5 4 2 4-3 4 4-3 4 2 4 5 1v6l-5 1-2 4 3 4-4 4-4-3-4 2-1 5h-6l-1-5-4-2-4 3-4-4 3-4-2-4-5-1v-6l5-1 2-4-3-4 4-4 4 3 4-2z"
        fill="#c5cde0"
        stroke={N}
        strokeWidth={S}
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="7" fill="#6741d9" stroke={N} strokeWidth={S} />
    </>
  ),
  info: (
    <>
      <circle cx="24" cy="24" r="19" fill="#4cc3ff" stroke={N} strokeWidth={S} />
      <path d="M24 22 v12" stroke={N} strokeWidth="5" strokeLinecap="round" />
      <circle cx="24" cy="14" r="3" fill={N} />
      <ellipse cx="15" cy="14" rx="3" ry="1.6" fill="#fff" opacity=".7" transform="rotate(-40 15 14)" />
    </>
  ),
  plus: (
    <>
      <circle cx="24" cy="24" r="19" fill="#58d36b" stroke={N} strokeWidth={S} />
      <path d="M24 14 v20 M14 24 h20" stroke={N} strokeWidth="6" strokeLinecap="round" />
      <path d="M24 14 v20 M14 24 h20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
};

export const ICON_NAMES = Object.keys(art) as IconName[];

// For drawing an icon inside a larger SVG scene.
export function IconArt({ name, x, y, size }: { name: IconName; x: number; y: number; size: number }) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      {art[name]}
    </svg>
  );
}

export function Icon({ name, size = 32, label, className = "" }: { name: IconName; size?: number; label?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {art[name]}
    </svg>
  );
}
