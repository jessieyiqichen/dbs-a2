// Field Notes: everything is something you would find in a trail notebook.
// Icon rules: a wobbly graphite line, hatching on the side away from the light, one small watercolour dab.

export const G = "#55524b"; // graphite
export const MOSS = "#6f8a5b";
export const INK = "#2f4a6b";

/** Shared filters and patterns; render once per page. */
export function FieldDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id="fn-rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>
        <filter id="fn-pencil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="8" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.1" result="mask" />
          <feComposite in="SourceGraphic" in2="mask" operator="in" result="grainy" />
          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="5" result="wobble" />
          <feDisplacementMap in="grainy" in2="wobble" scale="1.8" />
        </filter>
        <filter id="fn-wash" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" result="d" />
          <feGaussianBlur in="d" stdDeviation=".8" />
        </filter>
        <pattern id="fn-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <path d="M0 0 V4" stroke={G} strokeWidth="1" opacity=".7" />
        </pattern>
      </defs>
    </svg>
  );
}

/** A watercolour dab, sitting a little off the drawing. */
function Dab({ d, c = MOSS }: { d: string; c?: string }) {
  return <path d={d} fill={c} opacity=".45" filter="url(#fn-wash)" />;
}
function Hatch({ d }: { d: string }) {
  return <path d={d} fill="url(#fn-hatch)" filter="url(#fn-rough)" />;
}
export function Pencil({ children, w = 1.6 }: { children: React.ReactNode; w?: number }) {
  return (
    <g fill="none" stroke={G} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" filter="url(#fn-pencil)">
      {children}
    </g>
  );
}

export type FieldIconName =
  | "compass"
  | "boot"
  | "tent"
  | "mountain"
  | "map"
  | "binoculars"
  | "fern"
  | "pine"
  | "flower"
  | "feather"
  | "pencil"
  | "magnifier"
  | "clock"
  | "calendar"
  | "backpack"
  | "hut";

const art: Record<FieldIconName, React.ReactNode> = {
  compass: (
    <>
      <Dab d="M14 16 C 20 10, 32 12, 36 20 C 38 28, 30 36, 22 34 Z" c={INK} />
      <Hatch d="M24 9 A15 15 0 0 1 24 39 Z" />
      <Pencil>
        <path d="M24 8 C 33 8, 40 15, 40 24 C 40 33, 33 40, 24 40 C 15 40, 8 33, 8 24 C 8 15.5, 15 8.2, 24 8 Z" />
        <path d="M24 13 L28 24 L24 35 L20 24 Z" />
        <path d="M24 3 v4 M24 41 v4 M3 24 h4 M41 24 h4" />
      </Pencil>
      <path d="M24 13 L28 24 H20 Z" fill={INK} opacity=".8" />
    </>
  ),
  boot: (
    <>
      <Dab d="M16 10 h10 v14 c6 1 12 4 13 10 H12 Z" />
      <Hatch d="M27 22 c6 1 12 4 13 10 v3 h-9 v-6 c0 -3 -2 -5 -4 -7 z" />
      <Pencil>
        <path d="M15 8 h12 v16 c7 1 13 4 13.5 10 v4 H10 v-6 l4.5 -6 z" />
        <path d="M10 38 h30.5 M17 14 h7 M17 19 h7" />
        <path d="M12 42 l2 -3 M18 42 l2 -3 M24 42 l2 -3 M30 42 l2 -3 M36 42 l2 -3" strokeWidth={1.2} />
      </Pencil>
    </>
  ),
  tent: (
    <>
      <Dab d="M8 36 L24 12 L40 36 Z" />
      <Hatch d="M24 11 L41 37 H30 Z" />
      <Pencil>
        <path d="M6 38 L24 10 L42 38 Z" />
        <path d="M24 10 L29 38 M24 10 L19 38" />
        <path d="M3 38.5 h42" />
        <path d="M24 10 l-3 -5 M24 10 l3 -5" strokeWidth={1.2} />
      </Pencil>
    </>
  ),
  mountain: (
    <>
      <Dab d="M6 38 L18 18 L26 28 L32 20 L42 38 Z" c={INK} />
      <Hatch d="M18 16 L26 28 L22 38 H30 Z M32 18 L44 39 H36 Z" />
      <Pencil>
        <path d="M3 39 L18 15 L26 27 L32 18 L45 39 Z" />
        <path d="M14 21 l4 -6 l4 6 l-2 -1 l-2 2 l-2 -2 z" />
      </Pencil>
    </>
  ),
  map: (
    <>
      <Dab d="M9 14 L18 10 L30 14 L39 10 V34 L30 38 L18 34 L9 38 Z" />
      <Hatch d="M18 10 L30 14 V38 L18 34 Z" />
      <Pencil>
        <path d="M6 12 L17 8 L31 12 L42 8 V36 L31 40 L17 36 L6 40 Z" />
        <path d="M17 8 V36 M31 12 V40" strokeWidth={1.2} />
      </Pencil>
      <path d="M10 30 C 16 24, 22 30, 26 22 S 34 16, 37 14" fill="none" stroke={INK} strokeWidth="1.4" strokeDasharray="2 3" strokeLinecap="round" />
      <path d="M35 12 l4 4 M39 12 l-4 4" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  binoculars: (
    <>
      <Dab d="M8 24 a8 8 0 0 0 14 6 a8 8 0 0 0 4 0 a8 8 0 0 0 14 -6 Z" c={INK} />
      <Hatch d="M14 20 a8 8 0 0 1 0 16 Z M34 20 a8 8 0 0 1 0 16 Z" />
      <Pencil>
        <circle cx="14" cy="28" r="8" />
        <circle cx="34" cy="28" r="8" />
        <path d="M10 21 L13 10 h6 l2 12 M38 21 L35 10 h-6 l-2 12 M21 22 h6" />
      </Pencil>
    </>
  ),
  fern: (
    <>
      <Dab d="M24 42 C 22 30, 18 18, 12 8 C 26 14, 32 28, 24 42 Z" />
      <Pencil w={1.4}>
        <path d="M24 44 C 24 32, 20 18, 13 7" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 38 - i * 5.2;
          const x = 24 - i * 1.6;
          return <path key={i} d={`M${x} ${y} c -5 -1 -8 -4 -9 -7 M${x} ${y} c 5 -2 8 -5 9 -8`} />;
        })}
      </Pencil>
    </>
  ),
  pine: (
    <>
      <Dab d="M24 6 L36 34 H12 Z" />
      <Hatch d="M24 6 L37 35 H27 Z" />
      <Pencil>
        <path d="M24 5 L31 16 H27 L34 26 H29 L38 36 H10 L19 26 H14 L21 16 H17 Z" />
        <path d="M24 36 V43" strokeWidth={2.2} />
      </Pencil>
    </>
  ),
  flower: (
    <>
      <Dab d="M24 8 C 32 10, 34 20, 24 24 C 14 20, 16 10, 24 8 Z" c={INK} />
      <Pencil w={1.4}>
        <path d="M24 24 C 18 20, 18 12, 24 9 C 30 12, 30 20, 24 24 Z" />
        <path d="M24 24 C 20 26, 13 24, 12 18 C 18 16, 22 19, 24 24 Z" />
        <path d="M24 24 C 28 26, 35 24, 36 18 C 30 16, 26 19, 24 24 Z" />
        <path d="M24 24 C 24 32, 22 38, 24 44" />
        <path d="M23.5 34 C 19 33, 16 30, 15 27 M24 38 C 28 37, 31 34, 32 31" />
      </Pencil>
    </>
  ),
  feather: (
    <>
      <Dab d="M34 8 C 22 12, 14 24, 14 36 C 26 32, 36 20, 34 8 Z" />
      <Hatch d="M34 8 C 34 20, 28 30, 16 36 C 26 32, 36 20, 34 8 Z" />
      <Pencil>
        <path d="M35 7 C 22 11, 13 23, 13 37 C 26 33, 37 21, 35 7 Z" />
        <path d="M35 7 C 28 18, 18 30, 9 42" />
        <path d="M30 14 l4 3 M26 19 l5 3 M22 25 l5 2" strokeWidth={1.1} />
      </Pencil>
    </>
  ),
  pencil: (
    <>
      <Dab d="M12 32 L32 12 L38 18 L18 38 Z" c={MOSS} />
      <Hatch d="M32 12 L38 18 L18 38 L15 35 Z" />
      <Pencil>
        <path d="M11 31 L31 11 L37 17 L17 37 Z" />
        <path d="M11 31 L7 41 L17 37" />
        <path d="M28 14 L34 20" />
      </Pencil>
      <path d="M8.5 37.5 L7 41 L10.5 39.5 Z" fill={G} />
    </>
  ),
  magnifier: (
    <>
      <Dab d="M12 12 C 18 8, 28 10, 28 20 C 28 28, 18 30, 12 24 Z" c={INK} />
      <Pencil>
        <circle cx="20" cy="20" r="11" />
        <path d="M28 28 L41 41" strokeWidth={3.4} />
        <path d="M14 16 C 15 13, 18 12, 20 12" strokeWidth={1.1} />
      </Pencil>
    </>
  ),
  clock: (
    <>
      <Dab d="M24 9 C 32 9, 39 16, 38 24 C 30 26, 22 22, 24 9 Z" />
      <Hatch d="M24 9 A15 15 0 0 1 24 39 A15 15 0 0 0 24 9 Z" />
      <Pencil>
        <path d="M24 8.5 C 33 8, 40 15, 40 24 C 40 33, 33 40, 24 40 C 15 40.5, 8 33, 8 24 C 8 15, 15 9, 24 8.5 Z" />
        <path d="M24 24 V14 M24 24 L31 28" strokeWidth={2} />
      </Pencil>
    </>
  ),
  calendar: (
    <>
      <Dab d="M9 12 h30 v8 H9 Z" />
      <Pencil>
        <rect x="8" y="10" width="32" height="30" rx="2" />
        <path d="M8 19 h32 M16 6 v8 M32 6 v8" />
        <path d="M14 26 h4 M22 26 h4 M30 26 h4 M14 32 h4 M22 32 h4" strokeWidth={1.3} />
      </Pencil>
      <path d="M28 29 c3 -3 7 -2 7 2 c0 3 -5 4 -7 2" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  backpack: (
    <>
      <Dab d="M12 14 h24 v26 H12 Z" />
      <Hatch d="M30 12 a8 8 0 0 1 8 8 v18 a4 4 0 0 1 -4 4 h-4 Z" />
      <Pencil>
        <path d="M18 10 a6 6 0 0 1 12 0" />
        <rect x="10" y="10" width="28" height="32" rx="7" />
        <rect x="15" y="27" width="18" height="10" rx="2" />
        <path d="M15 31 h18" strokeWidth={1.2} />
      </Pencil>
    </>
  ),
  hut: (
    <>
      <Dab d="M8 22 L24 10 L40 22 V40 H8 Z" />
      <Hatch d="M24 10 L41 23 V41 H34 V23 Z" />
      <Pencil>
        <path d="M5 23 L24 8 L43 23" />
        <path d="M9 21 V41 H39 V21" />
        <path d="M20 41 V30 h8 V41" />
        <path d="M31 13 V8 h4 V16" />
      </Pencil>
      <rect x="12" y="26" width="5" height="5" fill={INK} opacity=".55" />
    </>
  ),
};

export const FIELD_ICON_NAMES = Object.keys(art) as FieldIconName[];

export function FieldIcon({ name, size = 32, label }: { name: FieldIconName; size?: number; label?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {art[name]}
    </svg>
  );
}

/* ---------- components that come out of a trail notebook ---------- */

const hand = "font-[family-name:var(--fn-hand)]";

/** Index tabs on the edge of a notebook; the chosen one sits in front. */
export function NotebookTabs() {
  const tabs = ["Overview", "Route", "When"];
  return (
    <div className="relative pt-2">
      <div className="flex gap-1 pl-2">
        {tabs.map((t, i) => (
          <span
            key={t}
            className={`relative -mb-px rounded-t-md border border-b-0 border-[#55524b]/40 px-4 pb-2 pt-1.5 ${hand} text-xl ${i === 0 ? "z-10 bg-[#fbf7ec] text-[#2b2a26]" : "translate-y-1 bg-[#e9dcc0] text-[#625e56]"}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="relative h-16 border border-[#55524b]/40 bg-[#fbf7ec] px-3 py-2 text-sm text-[#625e56]" style={{ backgroundImage: "repeating-linear-gradient(#fbf7ec 0 19px, #c9d3df 19px 20px)" }}>
        Four days, huts booked, one way only.
      </div>
    </div>
  );
}

/** Pick one: the chosen answer gets circled in pencil, as you would in a notebook. */
export function CircledChoice() {
  const opts = ["Day hike", "A few days", "A month"];
  return (
    <div className={`flex flex-wrap items-center gap-5 py-4 ${hand} text-2xl`}>
      {opts.map((o, i) => (
        <span key={o} className="relative px-1">
          {i === 1 && (
            <svg viewBox="0 0 120 50" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+24px)]" aria-hidden="true">
              <path d="M8 26 C 6 10, 40 4, 70 6 C 100 8, 116 18, 112 30 C 108 44, 60 48, 30 44 C 10 41, 4 32, 14 20" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" filter="url(#fn-rough)" />
            </svg>
          )}
          <span className={i === 1 ? "text-[#2b2a26]" : "text-[#625e56]"}>{o}</span>
        </span>
      ))}
    </div>
  );
}

/** A ruler in pencil; the thumb is a paperclip. */
export function RulerSlider({ at = 0.45 }: { at?: number }) {
  return (
    <div className="py-3">
      <div className={`flex justify-between ${hand} text-lg text-[#625e56]`}>
        <span>1 day</span>
        <span className="text-[#2b2a26]">up to 14 days</span>
        <span>30+</span>
      </div>
      <div className="relative mt-1">
        <svg viewBox="0 0 300 40" className="block h-auto w-full" aria-hidden="true">
          <rect x="2" y="8" width="296" height="26" rx="2" fill="#efe2bf" stroke={G} strokeWidth="1.4" filter="url(#fn-rough)" />
          {Array.from({ length: 31 }).map((_, i) => (
            <path key={i} d={`M${10 + i * 9.333} 8 v${i % 5 === 0 ? 12 : 6}`} stroke={G} strokeWidth="1" />
          ))}
        </svg>
        <svg viewBox="0 0 24 56" className="absolute -top-3 h-14 w-6 -translate-x-1/2" style={{ left: `${at * 100}%` }} aria-hidden="true">
          <path d="M8 44 V10 a7 7 0 0 1 14 0 V48 a10 10 0 0 1 -20 0 V16" fill="none" stroke="#8a8780" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

/** Search: one ruled line and a pencil. */
export function SearchLine() {
  return (
    <div className="flex items-end gap-2 py-4">
      <FieldIcon name="magnifier" size={30} />
      <div className="flex-1 border-b-2 border-[#2f4a6b]/60 pb-1">
        <span className={`${hand} text-2xl text-[#625e56]`}>where to next?</span>
      </div>
      <FieldIcon name="pencil" size={30} />
    </div>
  );
}

/** A perforated postage stamp as a badge. */
export function PermitStamp() {
  return (
    <div className="grid place-items-center py-3">
      <svg viewBox="0 0 120 140" className="h-36 w-auto -rotate-3 drop-shadow-[0_2px_3px_rgba(60,45,20,.35)]" role="img" aria-label="A postage stamp badge: permit needed">
        <defs>
          <mask id="fn-perf">
            <rect width="120" height="140" fill="#fff" />
            {Array.from({ length: 12 }).map((_, i) => (
              <g key={i} fill="#000">
                <circle cx={6 + i * 10} cy="3" r="3.2" />
                <circle cx={6 + i * 10} cy="137" r="3.2" />
              </g>
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <g key={i} fill="#000">
                <circle cx="3" cy={6 + i * 10} r="3.2" />
                <circle cx="117" cy={6 + i * 10} r="3.2" />
              </g>
            ))}
          </mask>
        </defs>
        <rect width="120" height="140" fill="#fbf7ec" mask="url(#fn-perf)" />
        <rect x="12" y="12" width="96" height="116" fill="#dfe6d6" stroke={G} strokeWidth="1.2" />
        <g transform="translate(36 22) scale(1)">
          <svg x="0" y="0" width="48" height="48" viewBox="0 0 48 48">
            {art.mountain}
          </svg>
        </g>
        <text x="60" y="94" textAnchor="middle" fontSize="20" fill={INK} fontFamily="var(--fn-hand)">
          Permit
        </text>
        <text x="60" y="114" textAnchor="middle" fontSize="20" fill={INK} fontFamily="var(--fn-hand)">
          needed
        </text>
        <circle cx="92" cy="30" r="20" fill="none" stroke={INK} strokeWidth="1.5" opacity=".55" strokeDasharray="3 2" />
      </svg>
    </div>
  );
}
