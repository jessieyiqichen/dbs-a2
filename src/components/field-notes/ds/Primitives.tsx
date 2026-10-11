// Field Notes controls without client state. Each takes `force` so the state grid can show any state;
// without it, the control responds live to hover, focus and press.
import type { ControlState } from "@/lib/contrast";
import { FieldIcon } from "../FieldArt";
import { FN, focusForced, focusRing, hand, serif } from "./tokens";

type Forceable = { force?: ControlState; children?: React.ReactNode };

/** A rectangle drawn in pencil: the line wobbles a little, nothing is ruled. */
export function PencilFrame({ dashed = false, className = "text-[#7d776b]" }: { dashed?: boolean; className?: string }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`} aria-hidden="true">
      <rect width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray={dashed ? "5 4" : undefined} filter="url(#fn-rough)" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* ---------- buttons ---------- */

const primaryBase = `${serif} relative inline-flex items-center gap-2 border-2 px-5 py-2.5 text-[15px] font-semibold uppercase tracking-[0.16em] transition duration-300 ease-out`;
const primaryState: Record<ControlState, string> = {
  rest: "border-[#3f5732] bg-[#4f6a3f] text-[#f7f1e3] shadow-[0_2px_0_#3f5732]",
  hover: "-translate-y-0.5 border-[#3f5732] bg-[#3f5732] text-[#f7f1e3] shadow-[0_4px_0_#2e4025,0_8px_14px_rgba(60,45,20,.25)]",
  focus: `border-[#3f5732] bg-[#4f6a3f] text-[#f7f1e3] shadow-[0_2px_0_#3f5732] ${focusForced}`,
  pressed: "translate-y-0.5 border-[#2e4025] bg-[#36492b] text-[#f7f1e3]/90 shadow-[inset_0_3px_5px_rgba(0,0,0,.45)]",
  selected: "",
  disabled: "cursor-not-allowed border-dashed border-[#7d776b] bg-transparent text-[#625e56] shadow-none",
};
const primaryLive = `hover:-translate-y-0.5 hover:bg-[#3f5732] hover:shadow-[0_4px_0_#2e4025,0_8px_14px_rgba(60,45,20,.25)] active:translate-y-0.5 active:border-[#2e4025] active:bg-[#36492b] active:shadow-[inset_0_3px_5px_rgba(0,0,0,.45)] ${focusRing}`;

/** Primary: a moss stamp. Hover lifts it off the page; press stamps it down. */
export function PrimaryButton({ force, children = "Open the trail" }: Forceable) {
  if (force) return <span className={`${primaryBase} ${primaryState[force]}`}>{children}</span>;
  return <button type="button" className={`${primaryBase} ${primaryState.rest} ${primaryLive}`}>{children}</button>;
}

const secondaryBase = `${hand} relative inline-flex items-center px-5 py-1.5 text-2xl leading-tight transition duration-300 ease-out`;
const secondaryState: Record<ControlState, string> = {
  rest: "text-[#3d3a34]",
  hover: "-translate-y-0.5 bg-[#e9dcc0]/70 text-[#3d3a34] shadow-[0_6px_12px_rgba(60,45,20,.18)]",
  focus: `text-[#3d3a34] ${focusForced}`,
  pressed: "translate-y-0.5 bg-[#dccaa3] text-[#3d3a34] shadow-[inset_0_2px_4px_rgba(60,45,20,.35)]",
  selected: "",
  disabled: "cursor-not-allowed text-[#625e56]",
};

/** Secondary: written by hand, inside a pencilled box. Hover leaves a kraft wash. */
export function SecondaryButton({ force, children = "Save for later" }: Forceable) {
  const frame = <PencilFrame dashed={force === "disabled"} className={force === "hover" || force === "pressed" ? "text-[#3d3a34]" : "text-[#7d776b] group-hover:text-[#3d3a34]"} />;
  if (force) return <span className={`${secondaryBase} ${secondaryState[force]}`}>{frame}{children}</span>;
  return (
    <button type="button" className={`group ${secondaryBase} ${secondaryState.rest} hover:-translate-y-0.5 hover:bg-[#e9dcc0]/70 hover:shadow-[0_6px_12px_rgba(60,45,20,.18)] active:translate-y-0.5 active:bg-[#dccaa3] active:shadow-[inset_0_2px_4px_rgba(60,45,20,.35)] ${focusRing}`}>
      {frame}
      {children}
    </button>
  );
}

/** Link: hover darkens the pencil underline and steps the arrow forward; pressed presses the ink in (darker, with a wash behind). */
export function NoteLink({ force, children = "Read the route notes" }: Forceable) {
  const state: Partial<Record<ControlState, string>> = {
    rest: "text-[#2f4a6b] decoration-[#2f4a6b]/40",
    hover: "text-[#2f4a6b] decoration-[#2f4a6b] decoration-2",
    focus: `text-[#2f4a6b] decoration-[#2f4a6b]/40 ${focusForced}`,
    pressed: "bg-[#2f4a6b]/15 text-[#1f3550] decoration-[#1f3550] decoration-2",
  };
  const live = `hover:decoration-[#2f4a6b] hover:decoration-2 active:bg-[#2f4a6b]/15 active:text-[#1f3550] ${focusRing}`;
  const arrow = force === "hover" ? "translate-x-1" : force === "pressed" ? "translate-x-0.5" : "group-hover:translate-x-1";
  return (
    <a href="#links" className={`group ${serif} inline-flex items-baseline gap-1 px-0.5 text-lg underline decoration-1 underline-offset-4 transition duration-300 ${state[force ?? "rest"]} ${force ? "" : live}`}>
      {children}
      <span aria-hidden="true" className={`transition-transform duration-300 ${arrow}`}>→</span>
    </a>
  );
}

/* ---------- form fields ---------- */

const lineState: Record<ControlState, string> = {
  rest: "border-[#7d776b]",
  hover: "border-[#3d3a34]",
  focus: `border-[#2f4a6b] bg-[#2f4a6b]/10 ${focusForced}`,
  pressed: "border-[#2f4a6b]",
  selected: "border-[#2f4a6b]",
  disabled: "cursor-not-allowed border-dashed border-[#7d776b] text-[#625e56]",
};
const fieldBase = `${serif} w-full border-0 border-b-2 bg-transparent px-1 pb-1 pt-1 text-lg text-[#3d3a34] transition-colors duration-300 placeholder:font-[family-name:var(--fn-hand)] placeholder:text-xl placeholder:text-[#625e56]`;

/** Text input: one ruled line. Focus turns the line ink blue and leaves a faint wash. */
export function RuledInput({ force, label = "Trail name", placeholder = "where to next?", id }: { force?: ControlState; label?: string; placeholder?: string; id: string }) {
  const state = force ?? "rest";
  return (
    <label htmlFor={id} className="block">
      <span className={`${hand} text-xl text-[#3d3a34]`}>{label}</span>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        disabled={force === "disabled"}
        className={`${fieldBase} ${lineState[state]} ${force ? "" : "hover:border-[#3d3a34] focus:border-[#2f4a6b] focus:bg-[#2f4a6b]/10 ${focusRing}"}`}
      />
    </label>
  );
}

/** Select: the same ruled line, with a caret drawn by hand. */
export function RuledSelect({ force, id }: { force?: ControlState; id: string }) {
  const state = force ?? "rest";
  return (
    <label htmlFor={id} className="block">
      <span className={`${hand} text-xl text-[#3d3a34]`}>Best month</span>
      <span className="relative block">
        <select
          id={id}
          disabled={force === "disabled"}
          defaultValue="Jul"
          className={`${fieldBase} appearance-none pr-8 ${lineState[state]} ${force ? "" : "hover:border-[#3d3a34] focus:border-[#2f4a6b] focus:bg-[#2f4a6b]/10 ${focusRing}"}`}
        >
          {["Jun", "Jul", "Aug", "Sep"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <svg viewBox="0 0 20 12" className="pointer-events-none absolute bottom-3 right-1 h-3 w-5" aria-hidden="true">
          <path d="M2 2 C 6 6, 8 8, 10 10 C 12 7, 15 5, 18 1.5" fill="none" stroke="#3d3a34" strokeWidth="1.8" strokeLinecap="round" filter="url(#fn-rough)" />
        </svg>
      </span>
    </label>
  );
}

/* ---------- checkbox and radio ---------- */

/** Checkbox: a pencilled box; checked, a moss tick that overshoots the box, as a real tick does. */
export function TickBox({ force, label = "Permit needed", defaultChecked = false }: { force?: ControlState; label?: string; defaultChecked?: boolean }) {
  const checked = force === "selected" || (!force && defaultChecked);
  const disabled = force === "disabled";
  return (
    <label className={`group relative flex items-center gap-3 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
      <input type="checkbox" className="peer sr-only" defaultChecked={checked} disabled={disabled} />
      <span
        className={`relative h-7 w-7 shrink-0 transition duration-300 peer-checked:[&_.tick]:opacity-100 ${force === "hover" ? "bg-[#e9dcc0]/70" : force === "pressed" ? "" : "group-hover:bg-[#e9dcc0]/70"} ${force === "pressed" ? "scale-[.82] bg-[#dccaa3] shadow-[inset_0_2px_3px_rgba(60,45,20,.35)]" : "peer-active:scale-[.82] peer-active:bg-[#dccaa3]"} ${force === "focus" ? focusForced : "peer-focus-visible:outline-2 peer-focus-visible:outline-dashed peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#2f4a6b]"}`}
      >
        <PencilFrame dashed={disabled} className={force === "hover" ? "text-[#3d3a34]" : "text-[#7d776b] group-hover:text-[#3d3a34]"} />
        <svg viewBox="0 0 28 28" className={`tick absolute -right-1 -top-2 h-8 w-8 transition-opacity duration-300 ${checked ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          <path d="M5 15 l6 7 l14 -19" fill="none" stroke={FN.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#fn-rough)" />
        </svg>
      </span>
      <span className={`${hand} text-2xl ${disabled ? "text-[#625e56] line-through decoration-1" : "text-[#3d3a34]"}`}>{label}</span>
    </label>
  );
}

/** Radio: the chosen answer gets circled in pencil. */
export function CircleRadio({ name, options, defaultValue, force }: { name: string; options: string[]; defaultValue: string; force?: ControlState }) {
  return (
    <fieldset className="flex flex-wrap gap-x-6 gap-y-2">
      <legend className="sr-only">How long</legend>
      {options.map((o) => {
        const isDefault = o === defaultValue;
        const disabled = force === "disabled" && !isDefault;
        return (
          <label key={o} className={`group relative inline-flex px-2 py-1 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <input type="radio" name={name} value={o} defaultChecked={isDefault} disabled={disabled} className="peer sr-only" />
            <svg viewBox="0 0 120 50" preserveAspectRatio="none" className={`pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+16px)] transition-opacity duration-300 peer-checked:hidden ${force === "hover" && !isDefault ? "opacity-40" : "opacity-0 group-hover:opacity-40"}`} aria-hidden="true">
              <path d="M8 26 C 6 10, 40 4, 70 6 C 100 8, 116 18, 112 30 C 108 44, 60 48, 30 44 C 10 41, 4 32, 14 20" fill="none" stroke={FN.ink} strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <svg viewBox="0 0 120 50" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+16px)] opacity-0 transition-opacity duration-300 peer-checked:opacity-100" aria-hidden="true">
              <path d="M8 26 C 6 10, 40 4, 70 6 C 100 8, 116 18, 112 30 C 108 44, 60 48, 30 44 C 10 41, 4 32, 14 20" fill="none" stroke={FN.ink} strokeWidth="2.2" strokeLinecap="round" filter="url(#fn-rough)" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className={`${hand} relative text-2xl peer-checked:text-[#3d3a34] ${disabled ? "text-[#625e56] line-through" : "text-[#625e56]"} peer-focus-visible:outline-2 peer-focus-visible:outline-dashed peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#2f4a6b] ${force === "focus" && isDefault ? focusForced : ""}`}>
              {o}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

const LOOP = "M8 26 C 6 10, 40 4, 70 6 C 100 8, 116 18, 112 30 C 108 44, 60 48, 30 44 C 10 41, 4 32, 14 20";

/** One radio option in a forced state, for the state grid. */
export function RadioSwatch({ force, label = "A few days" }: { force: ControlState; label?: string }) {
  const loop = force === "selected" ? { o: 1, dash: undefined, w: 2.2 } : force === "hover" ? { o: 0.4, dash: "4 4", w: 1.6 } : force === "pressed" ? { o: 1, dash: "4 4", w: 1.6 } : null;
  return (
    <span className={`relative inline-flex px-2 py-1 ${force === "focus" ? focusForced : ""} ${force === "pressed" ? "translate-y-px" : ""}`}>
      {loop && (
        <svg viewBox="0 0 120 50" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+16px)]" style={{ opacity: loop.o }} aria-hidden="true">
          <path d={LOOP} fill={force === "pressed" ? "rgba(47,74,107,.14)" : "none"} stroke={FN.ink} strokeWidth={loop.w} strokeDasharray={loop.dash} strokeLinecap="round" filter={loop.dash ? undefined : "url(#fn-rough)"} vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      <span className={`${hand} relative whitespace-nowrap text-2xl ${force === "disabled" ? "text-[#625e56] line-through decoration-1" : force === "rest" || force === "focus" ? "text-[#625e56]" : "text-[#3d3a34]"}`}>{label}</span>
    </span>
  );
}

/* ---------- small pieces ---------- */

/** Count badge: a number circled in ink, as you would tally in a notebook. */
export function CountBadge({ n }: { n: number }) {
  return (
    <span className="relative inline-grid h-9 w-9 place-items-center">
      <svg viewBox="0 0 40 40" className="absolute inset-0" aria-hidden="true">
        <path d="M20 4 C 31 3, 37 12, 36 21 C 35 31, 27 37, 18 36 C 8 35, 3 27, 5 17 C 7 9, 14 4, 24 5" fill="none" stroke={FN.ink} strokeWidth="1.8" strokeLinecap="round" filter="url(#fn-rough)" />
      </svg>
      <span className={`${serif} relative text-base font-semibold text-[#2f4a6b]`}>{n}</span>
    </span>
  );
}

/** Search: a magnifier drawn in pencil and one ruled line. */
export function SearchField({ id }: { id: string }) {
  return (
    <label htmlFor={id} className="flex items-end gap-2">
      <FieldIcon name="magnifier" size={30} />
      <span className="sr-only">Search trails</span>
      <input id={id} type="search" placeholder="search a trail or a country" className={`${fieldBase} ${lineState.rest} hover:border-[#3d3a34] focus:border-[#2f4a6b] focus:bg-[#2f4a6b]/10 ${focusRing}`} />
    </label>
  );
}
