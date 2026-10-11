// Field Notes: pieces that must look drawn, not built. Rule: no perfect shapes.
// Lines overshoot where they meet, curves wobble, marks are things a hand would make (ticks, loops, arrows), never an X or a ruled box.
import { G, INK, MOSS, Pencil } from "./FieldArt";

const hand = "font-[family-name:var(--fn-hand)]";

/** A tiny hut doodle, drawn above a route stop. */
function Hut({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-8 1 L0 -7 L8.5 1.5 M-5.5 -1 V7 H5.5 V-1.5 M-1.5 7 V3.5 H1.8 V7" />
    </g>
  );
}

/** Progress: the walked part of the route traced over in pencil, a hut at each night, and a curved arrow saying where you are. */
export function RouteProgress() {
  const route = "M14 80 C 50 88, 62 54, 96 58 C 130 62, 140 82, 168 66 S 222 32, 252 42 S 282 60, 290 52";
  const walked = "M14 80 C 50 88, 62 54, 96 58 C 113 60, 124 66, 134 69.5";
  const days = [
    { x: 52, label: "day 1", done: true },
    { x: 132, label: "day 2", now: true },
    { x: 210, label: "day 3" },
    { x: 272, label: "day 4" },
  ];
  return (
    <svg viewBox="0 0 300 124" className="block h-auto w-full" role="img" aria-label="Route progress: day 2 of 4, halfway between the first and second hut">
      <path d={walked} fill="none" stroke={MOSS} strokeWidth="7" strokeLinecap="round" opacity=".35" filter="url(#fn-wash)" />
      <Pencil w={1.2}>
        <path d={route} strokeDasharray="1 5" opacity=".8" />
      </Pencil>
      <Pencil w={1.7}>
        <path d={walked} />
        <path d="M15 81.5 C 48 88, 64 56, 95 59.5 C 118 62, 126 68, 133 70" opacity=".5" />
        <Hut x={96} y={46} />
        <Hut x={168} y={54} />
        <Hut x={252} y={30} />
        {/* start: a small scribbled dot; end: a flag on a bent stick */}
        <path d="M11 79 c2 -3 6 -1 5 2 c-1 3 -6 2 -5 -1 c1 -1 3 -1 3 0" />
        <path d="M290 52 C 290 40, 291 30, 290 18 M290 19 C 296 16, 300 22, 297 24 C 294 26, 296 28, 291 29" />
      </Pencil>
      {/* you are here: a quick curved arrow, the way people point in a notebook */}
      <g fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" filter="url(#fn-rough)">
        <path d="M122 20 C 134 19, 142 26, 141 38 C 140 48, 138 56, 136 63" />
        <path d="M130 57 C 132 60, 134 62, 136 64.5 C 138 62, 140 59, 142 57" />
        <circle cx="134" cy="69.5" r="3" fill={INK} stroke="none" />
      </g>
      <text x="34" y="24" fontSize="17" fill={INK} fontFamily="var(--fn-hand)">you are here</text>
      {days.map((d) => (
        <g key={d.label}>
          <text x={d.x} y="112" textAnchor="middle" fontSize="15" fill={d.done || d.now ? "#2b2a26" : "#625e56"} fontFamily="var(--fn-hand)">
            {d.label}
          </text>
          {d.done && <path d={`M${d.x + 20} 106 l3 4 l7 -10`} fill="none" stroke={MOSS} strokeWidth="2" strokeLinecap="round" filter="url(#fn-rough)" />}
          {d.now && <path d={`M${d.x - 22} 108 C ${d.x - 24} 96, ${d.x + 22} 95, ${d.x + 23} 106 C ${d.x + 24} 117, ${d.x - 20} 119, ${d.x - 23} 109 C ${d.x - 24} 104, ${d.x - 18} 100, ${d.x - 12} 99`} fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" filter="url(#fn-rough)" />}
        </g>
      ))}
    </svg>
  );
}

/** Loading: a mountain sketched the way a person would: two loose ridge strokes, the ground, hatching, then the sun. */
export function PencilLoader() {
  const strokes = [
    { c: "fn-s1", d: "M8 99 C 30 80, 50 54, 70 36 C 76 31, 80 33, 86 41 C 94 52, 98 58, 104 60", w: 1.8 },
    { c: "fn-s2", d: "M98 64 C 112 46, 126 24, 140 15 C 148 11, 154 18, 164 34 C 180 60, 196 82, 214 99", w: 1.8 },
    { c: "fn-s3", d: "M2 100 C 60 97, 150 102, 218 97", w: 1.3 },
    { c: "fn-s4", d: "M151 27 l-7 9 M156 35 l-10 12 M162 44 l-11 14 M168 53 l-12 15 M175 63 l-12 15 M182 73 l-11 13 M84 46 l-6 8 M90 53 l-7 9", w: 1 },
    { c: "fn-s5", d: "M186 22 C 186 16, 195 15, 196 21 C 197 27, 188 29, 186 24 C 185 21, 188 19, 190 19", w: 1.3 },
  ];
  return (
    <div>
      <svg viewBox="0 0 220 110" className="block h-auto w-full" role="img" aria-label="Loading: a pencil sketching a mountain">
        <g fill="none" stroke={G} strokeLinecap="round" strokeLinejoin="round" filter="url(#fn-pencil)">
          {strokes.map((s) => (
            <path key={s.c} className={s.c} d={s.d} strokeWidth={s.w} pathLength={100} />
          ))}
        </g>
      </svg>
      <p className={`${hand} text-center text-xl text-[#625e56]`}>sketching the route…</p>
    </div>
  );
}

const pill = "M17 5 C 30 3.5, 44 4, 50 5 C 61 6.5, 62 27, 48 29.5 C 36 31, 24 30.5, 15 29 C 2 27, 3 7, 18 5.2 C 23 4.6, 27 4.4, 31 4.6";
const knob = (cx: number) => `M${cx - 6} 10.5 C ${cx} 7, ${cx + 9} 10, ${cx + 9} 17 C ${cx + 9} 24, ${cx + 2} 27, ${cx - 4} 25.5 C ${cx - 10} 23.5, ${cx - 11} 14, ${cx - 4} 10 C ${cx - 2} 9, ${cx + 1} 9, ${cx + 2} 9.5`;

/** On: moss bleeds into a pencilled pill. Off: just the pencil. Nothing closes perfectly. */
export function WashToggle({ on, label }: { on: boolean; label: string }) {
  const cx = on ? 46 : 18;
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 64 34" className="h-9 w-[68px]" aria-hidden="true">
        {on && <path d="M9 15 C 10 7, 30 7.5, 46 7 C 60 7.5, 60 26, 46 27 C 30 28, 13 28.5, 9.5 22 Z" fill={MOSS} opacity=".55" filter="url(#fn-wash)" />}
        <circle cx={cx} cy="17" r="8" fill="#fbf7ec" />
        <circle cx={cx + 1.5} cy="18.5" r="7" fill="url(#fn-hatch)" opacity=".55" />
        <Pencil w={1.5}>
          <path d={pill} />
          <path d={knob(cx)} />
        </Pencil>
      </svg>
      <span className={`${hand} text-2xl ${on ? "text-[#2b2a26]" : "text-[#625e56]"}`}>{label}</span>
    </span>
  );
}

/** Paint chart: a pencilled box per colour, the paint bleeding a little past it. */
export function PaintSwatch({ name, hex, seed = 0 }: { name: string; hex: string; seed?: number }) {
  const blobs = [
    "M8 12 C 14 5, 44 6, 52 10 C 58 16, 57 40, 50 46 C 40 52, 14 50, 9 44 C 4 36, 3 18, 8 12 Z",
    "M10 9 C 24 4, 46 7, 53 13 C 57 22, 56 42, 47 48 C 34 52, 13 49, 8 41 C 5 30, 5 15, 10 9 Z",
    "M7 14 C 12 6, 40 4, 51 9 C 58 18, 58 38, 52 45 C 42 51, 16 52, 9 45 C 5 38, 3 22, 7 14 Z",
  ];
  return (
    <figure className="m-0">
      <svg viewBox="0 0 60 56" className="block h-auto w-full" aria-hidden="true">
        <path d={blobs[seed % blobs.length]} fill={hex} opacity=".9" stroke={hex} strokeWidth="2" strokeOpacity=".9" filter="url(#fn-wash)" />
        <Pencil w={1}>
          <path d="M5 6 C 22 5, 40 6.5, 56 5.5 M55 4 C 56 20, 55 36, 56 52 M57 51 C 40 52, 22 51, 4 52 M5 53 C 4 36, 5.5 20, 4.5 4" opacity=".7" />
        </Pencil>
      </svg>
      <figcaption className={`${hand} mt-1 text-base leading-tight`}>{name}</figcaption>
      <p className="text-[10px] tracking-wide text-black/50">{hex}</p>
    </figure>
  );
}

/** Paper tape: torn at both ends, a little see-through, never a pill. */
export function TapeLabel({ children, tint, tilt }: { children: React.ReactNode; tint: string; tilt: string }) {
  const torn = "polygon(4px 0, calc(100% - 3px) 0, 100% 18%, calc(100% - 4px) 36%, 100% 55%, calc(100% - 3px) 78%, 100% 100%, 3px 100%, 0 82%, 4px 62%, 0 44%, 3px 24%)";
  return (
    <span className={`inline-block ${tilt} drop-shadow-[0_1px_1px_rgba(60,45,20,.25)]`}>
      <span
        className={`block px-4 py-1 ${hand} text-xl text-[#2b2a26]`}
        style={{ clipPath: torn, backgroundColor: tint, backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.18) 0 2px, transparent 2px 7px)" }}
      >
        {children}
      </span>
    </span>
  );
}

/** A stack of papers: kraft, graph, ruled. */
export function PaperStack() {
  return (
    <div className="relative h-48">
      <div className="absolute inset-x-6 top-2 h-36 -rotate-6 bg-[#e3d2a8] shadow-[0_1px_2px_rgba(0,0,0,.15)]" style={{ backgroundImage: "radial-gradient(rgba(120,90,40,.18) 1px, transparent 1.4px)", backgroundSize: "5px 5px" }} />
      <div
        className="absolute inset-x-4 top-5 h-36 rotate-3 shadow-[0_1px_2px_rgba(0,0,0,.15)]"
        style={{ backgroundColor: "#f7f1e3", backgroundImage: "linear-gradient(#cfd8c4 1px, transparent 1px), linear-gradient(90deg, #cfd8c4 1px, transparent 1px)", backgroundSize: "10px 10px" }}
      />
      <div className="absolute inset-x-8 top-9 h-36 -rotate-1 border-l-2 border-[#2f4a6b]/50 shadow-[0_1px_3px_rgba(0,0,0,.18)]" style={{ background: "repeating-linear-gradient(#fbf7ec 0 17px, #c9d3df 17px 18px)" }}>
        <span className={`${hand} absolute left-3 top-1 text-xl text-[#2b2a26]`}>kraft · graph · ruled</span>
      </div>
    </div>
  );
}

// Each loader stroke has its own window in one 6s cycle, then everything holds and fades.
const windows: [number, number][] = [[0, 22], [16, 40], [36, 50], [48, 66], [62, 72]];
export const FIELD_KEYFRAMES =
  windows
    .map(([a, b], i) => `.fn-s${i + 1}{stroke-dasharray:100;animation:fn-s${i + 1} 6s cubic-bezier(.45,.05,.35,1) infinite}@keyframes fn-s${i + 1}{0%,${a}%{stroke-dashoffset:100;opacity:1}${b}%,88%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}`)
    .join("") + `@media (prefers-reduced-motion: reduce){${windows.map((_, i) => `.fn-s${i + 1}`).join(",")}{animation:none;stroke-dashoffset:0}}`;
