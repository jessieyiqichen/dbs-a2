// Dawn = Photochrom: hand-coloured travel prints, c. 1890–1900.
// Every drawing is made like the prints were: flat colour plates laid down slightly out of register,
// then a fine dark key line on top. Colours are sampled from the prints themselves.

export const KEY = "#22333a"; // key plate: text and lines, darkened from deep water (12.36:1 on mount)
export const MUTED = "#4f5f66"; // 6.27:1 on mount
export const BORDER = "#6f8287"; // control borders, 3.39:1 on the page
export const MOUNT = "#f6f9f7"; // the card a print is mounted on, cooled
export const SKY = "#e6edeb"; // page
export const LOCH = "#2c5868"; // primary action, Loch Linnhe darkened for contrast (7.33:1 with mount)
// Dawn keeps only the cool half of the prints (sky, water, ice); the warm earth tones belong to Field Notes.
export const T = {
  pine: "#b7cea5", // the meadow by Mirror Lake, as printed
  sky: "#d5e5f0", // sky over the Mer de Glace, cooled toward blue
  lake: "#79a8b8", // water of Milford Sound, lightened and cooled
  heather: "#bdb8d4", // derived: a cool lilac for rock in shadow
};

/** Shared filter: the mottled grain of a litho stone. Render once per page. */
export function PlateDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id="dw-litho" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="4" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.15" result="mask" />
          <feComposite in="SourceGraphic" in2="mask" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

/** A plate shifted off register, as on the prints, with the stone's grain in it. */
function Plates({ children }: { children: React.ReactNode }) {
  return (
    <g transform="translate(2.4 1.8)" filter="url(#dw-litho)">
      {children}
    </g>
  );
}
function Key({ children }: { children: React.ReactNode }) {
  return (
    <g fill="none" stroke={KEY} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  );
}

export type PlateIconName =
  | "mountain" | "lake" | "waterfall" | "pine" | "hut" | "tent" | "boot" | "compass"
  | "map" | "sunrise" | "cloud" | "bridge" | "camera" | "permit" | "calendar" | "clock";

/* eslint-disable react/jsx-key -- each entry is a fixed [plates, key] pair, never rendered as a list */
const art: Record<PlateIconName, [React.ReactNode, React.ReactNode]> = {
  mountain: [
    <>
      <path d="M5 38 L19 15 L27 26 L33 18 L44 38 Z" fill={T.heather} />
      <path d="M15.5 21 L19 15 L22.5 20.5 Z" fill={MOUNT} />
    </>,
    <>
      <path d="M5 38 L19 15 L27 26 L33 18 L44 38" />
      <path d="M15.5 21 L18 22 L19.5 20 L22.5 20.5" />
      <path d="M3 38 H45" />
    </>,
  ],
  lake: [
    <>
      <path d="M4 27 C 12 18, 18 20, 24 23 C 30 17, 38 18, 44 27 Z" fill={T.pine} />
      <path d="M4 27 H44 V39 H4 Z" fill={T.lake} />
    </>,
    <>
      <path d="M4 27 C 12 18, 18 20, 24 23 C 30 17, 38 18, 44 27" />
      <path d="M3 27 H45 M10 32 H22 M27 32 H38 M15 36 H33" />
    </>,
  ],
  waterfall: [
    <>
      <path d="M4 12 H31 L29 19 H4 Z M36 22 H44 V40 H36 Z" fill={T.heather} />
      <path d="M21 15 C 23 24, 23 32, 25 40 H33 C 31 31, 31 23, 29 15 Z" fill={T.sky} />
      <ellipse cx="29" cy="40" rx="15" ry="3.5" fill={T.lake} />
    </>,
    <>
      <path d="M4 12 H31 L29 19 H4 M44 22 H37 V38" />
      <path d="M22 16 C 24 25, 24 32, 25.5 38 M27 17 C 28.5 26, 28.5 32, 30 38" />
      <path d="M15 40 C 22 43, 36 43, 43 40 M21 37 L19.5 35.5 M33.5 37 L35 35.5" />
    </>,
  ],
  pine: [
    <path d="M24 6 L33 19 H28 L36 30 H12 L20 19 H15 Z" fill={T.pine} />,
    <>
      <path d="M24 6 L33 19 H28 L36 30 H12 L20 19 H15 Z" />
      <path d="M24 30 V40 M17 40 H31" />
    </>,
  ],
  hut: [
    <>
      <path d="M7 22 L24 9 L41 22 Z" fill={T.heather} />
      <path d="M11 22 H37 V39 H11 Z" fill={T.sky} />
    </>,
    <>
      <path d="M6 23 L24 9 L42 23 M11 21 V39 H37 V21" />
      <path d="M20 39 V30 H28 V39 M14 26 H18 V30 H14 Z" />
    </>,
  ],
  tent: [
    <path d="M6 38 L22 10 L42 38 Z" fill={T.sky} />,
    <>
      <path d="M5 38 L22 10 L43 38 Z M22 10 L28 38" />
      <path d="M22 10 L19 5 M3 38 H45" />
    </>,
  ],
  boot: [
    <path d="M14 8 H26 V27 L39 31 C 42 32, 42 38, 38 38 H12 Z" fill={T.heather} />,
    <>
      <path d="M14 8 H26 V27 L38 30.5 C 42 31.5, 42.5 38, 38 38 H12 C 12 30, 14 20, 14 8 Z" />
      <path d="M17 14 H23 M17 19 H23 M12 34 H41" />
    </>,
  ],
  compass: [
    <>
      <circle cx="24" cy="24" r="16" fill={T.sky} />
      <path d="M24 10 L28 24 H20 Z" fill={T.lake} />
    </>,
    <>
      <circle cx="24" cy="24" r="16" />
      <path d="M24 10 L28 24 L24 38 L20 24 Z M20 24 H28" />
      <path d="M24 3 V6 M24 42 V45 M3 24 H6 M42 24 H45" />
    </>,
  ],
  map: [
    <>
      <path d="M6 12 L17 8 V36 L6 40 Z M31 12 L42 8 V36 L31 40 Z" fill={T.pine} />
      <path d="M17 8 L31 12 V40 L17 36 Z" fill={T.sky} />
    </>,
    <>
      <path d="M6 12 L17 8 L31 12 L42 8 V36 L31 40 L17 36 L6 40 Z M17 8 V36 M31 12 V40" />
      <path d="M10 30 C 14 26, 18 30, 22 24 S 30 20, 37 16" strokeDasharray="2 3" />
    </>,
  ],
  sunrise: [
    <>
      <path d="M3 30 H45 V16 H3 Z" fill={T.pine} opacity=".7" />
      <path d="M13 30 A11 11 0 0 1 35 30 Z" fill={T.sky} />
    </>,
    <>
      <path d="M13 30 A11 11 0 0 1 35 30" />
      <path d="M3 30 H45 M10 36 H38 M17 41 H31" />
      <path d="M24 9 V13 M12 14 L14.5 17 M36 14 L33.5 17" />
    </>,
  ],
  cloud: [
    <path d="M10 33 C 3 33, 3 23, 11 23 C 11 14, 23 12, 26 19 C 30 14, 39 17, 37 24 C 44 24, 45 33, 38 33 Z" fill={T.sky} />,
    <>
      <path d="M10 33 C 3 33, 3 23, 11 23 C 11 14, 23 12, 26 19 C 30 14, 39 17, 37 24 C 44 24, 45 33, 38 33 Z" />
      <path d="M14 38 H34" />
    </>,
  ],
  bridge: [
    <>
      <path d="M3 34 H45 V41 H3 Z" fill={T.lake} />
      <path d="M8 26 C 16 16, 32 16, 40 26 Z" fill={T.heather} opacity=".6" />
    </>,
    <>
      <path d="M3 26 H45 M8 26 C 16 16, 32 16, 40 26" />
      <path d="M8 26 V34 M40 26 V34 M16 20.5 V26 M24 18.5 V26 M32 20.5 V26" />
      <path d="M3 34 H45 M10 38 H20 M27 38 H38" />
    </>,
  ],
  camera: [
    <>
      <path d="M8 14 H40 V38 H8 Z" fill={T.heather} />
      <circle cx="24" cy="26" r="7" fill={T.lake} />
    </>,
    <>
      <path d="M8 14 H40 V38 H8 Z M17 14 V10 H31 V14" />
      <circle cx="24" cy="26" r="7" />
      <circle cx="24" cy="26" r="3" />
      <path d="M34 18 H37" />
    </>,
  ],
  permit: [
    <path d="M6 14 H42 V20 C 39 20, 39 28, 42 28 V34 H6 V28 C 9 28, 9 20, 6 20 Z" fill={T.sky} />,
    <>
      <path d="M6 14 H42 V20 C 39 20, 39 28, 42 28 V34 H6 V28 C 9 28, 9 20, 6 20 Z" />
      <path d="M15 21 H31 M15 26 H27 M34 14 V34" strokeDasharray="0" />
    </>,
  ],
  calendar: [
    <>
      <path d="M7 11 H41 V19 H7 Z" fill={T.lake} />
      <path d="M7 19 H41 V40 H7 Z" fill={T.sky} />
    </>,
    <>
      <path d="M7 11 H41 V40 H7 Z M7 19 H41 M15 7 V14 M33 7 V14" />
      <path d="M14 26 H17 M22.5 26 H25.5 M31 26 H34 M14 33 H17 M22.5 33 H25.5" />
    </>,
  ],
  clock: [
    <circle cx="24" cy="24" r="16" fill={T.pine} />,
    <>
      <circle cx="24" cy="24" r="16" />
      <path d="M24 13 V24 L31 29" />
      <path d="M24 9 V10.5 M39 24 H37.5 M24 39 V37.5 M9 24 H10.5" />
    </>,
  ],
};
/* eslint-enable react/jsx-key */

export const PLATE_ICON_NAMES = Object.keys(art) as PlateIconName[];

export function PlateIcon({ name, size = 36, label }: { name: PlateIconName; size?: number; label?: string }) {
  const [plates, key] = art[name];
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <Plates>{plates}</Plates>
      <Key>{key}</Key>
    </svg>
  );
}
