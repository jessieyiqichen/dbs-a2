// Trail Quest controls without client state. One rule for every control:
// rest = raised on a hard ground shadow; hover = lifts higher and brightens, a shine sweeps across;
// pressed = drops onto its shadow and squashes; selected = grape, raised; disabled = locked grey;
// focus = game sparkles at the corners (see tokens).
import type { ControlState } from "@/lib/contrast";
import { Icon } from "../Icons";
import { TQ, display, focusForced, focusRing, focusWithin, pop, snappy, ui } from "./tokens";

type Tone = "grass" | "grape" | "sun";
const TONE: Record<Tone, { face: string; text: string; rest: string; hover: string; pressed: string }> = {
  grass: {
    face: "bg-[linear-gradient(#7be48a,#58d36b_55%,#47c25b)]",
    text: "text-[#1d2b53]",
    rest: "shadow-[0_6px_0_#2f9e44,0_8px_0_#1d2b53]",
    hover: "-translate-y-0.5 brightness-105 shadow-[0_8px_0_#2f9e44,0_10px_0_#1d2b53]",
    pressed: "translate-y-1.5 scale-y-95 shadow-[0_1px_0_#2f9e44,0_2px_0_#1d2b53]",
  },
  grape: {
    face: "bg-[linear-gradient(#8a6cf0,#6741d9_55%,#5a35c9)]",
    text: "text-white",
    rest: "shadow-[0_6px_0_#4527a8,0_8px_0_#1d2b53]",
    hover: "-translate-y-0.5 brightness-110 shadow-[0_8px_0_#4527a8,0_10px_0_#1d2b53]",
    pressed: "translate-y-1.5 scale-y-95 shadow-[0_1px_0_#4527a8,0_2px_0_#1d2b53]",
  },
  sun: {
    face: "bg-[linear-gradient(#ffe57a,#ffd23f_55%,#f5c518)]",
    text: "text-[#1d2b53]",
    rest: "shadow-[0_6px_0_#d4a90a,0_8px_0_#1d2b53]",
    hover: "-translate-y-0.5 brightness-105 shadow-[0_8px_0_#d4a90a,0_10px_0_#1d2b53]",
    pressed: "translate-y-1.5 scale-y-95 shadow-[0_1px_0_#d4a90a,0_2px_0_#1d2b53]",
  },
};
const LIVE: Record<Tone, string> = {
  grass: "hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_8px_0_#2f9e44,0_10px_0_#1d2b53] active:translate-y-1.5 active:scale-y-95 active:shadow-[0_1px_0_#2f9e44,0_2px_0_#1d2b53]",
  grape: "hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_8px_0_#4527a8,0_10px_0_#1d2b53] active:translate-y-1.5 active:scale-y-95 active:shadow-[0_1px_0_#4527a8,0_2px_0_#1d2b53]",
  sun: "hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_8px_0_#d4a90a,0_10px_0_#1d2b53] active:translate-y-1.5 active:scale-y-95 active:shadow-[0_1px_0_#d4a90a,0_2px_0_#1d2b53]",
};
const LOCKED = "cursor-not-allowed bg-[#d5dbe8] text-[#4a5a85] shadow-[0_6px_0_#aab4c9,0_8px_0_#8e99b3]";

/** A game button: glossy face, 3px navy outline, a hard ground shadow; a shine sweeps across on hover. */
export function GameButton({ tone = "grass", force, children, size = "md" }: { tone?: Tone; force?: ControlState; children: React.ReactNode; size?: "md" | "lg" }) {
  const t = TONE[tone];
  const s = size === "lg" ? "px-8 py-3 text-xl" : "px-5 py-2 text-base";
  const base = `tq-shine-wrap relative inline-flex items-center gap-2 overflow-visible rounded-2xl border-[3px] border-[#1d2b53] ${display} uppercase tracking-wide ${snappy} ${s}`;
  const look =
    force === "disabled" ? LOCKED :
    force === "hover" ? `${t.face} ${t.text} ${t.hover}` :
    force === "pressed" ? `${t.face} ${t.text} ${t.pressed}` :
    force === "focus" ? `${t.face} ${t.text} ${t.rest} ${focusForced}` :
    `${t.face} ${t.text} ${t.rest}`;
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-x-2 top-1 h-[38%] rounded-xl bg-white/35" />
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[13px]">
        <span className={`tq-shine absolute inset-y-0 left-0 w-1/3 bg-white/45 ${force === "hover" ? "translate-x-[120%] -skew-x-[20deg]" : "-translate-x-[120%] -skew-x-[20deg]"}`} />
      </span>
      {force === "disabled" && <Icon name="lock" size={22} />}
      <span className="relative">{children}</span>
    </>
  );
  if (force) return <span className={`${base} ${look}`}>{inner}</span>;
  return <button type="button" className={`${base} ${look} ${LIVE[tone]} ${focusRing}`}>{inner}</button>;
}

/** Link: navy, heavy grape underline; hover turns it grape and lifts; pressed pushes it down. */
export function GameLink({ force, children = "Trail sources" }: { force?: ControlState; children?: React.ReactNode }) {
  const look: Partial<Record<ControlState, string>> = {
    rest: "text-[#1d2b53] decoration-[#6741d9]",
    hover: "-translate-y-0.5 text-[#6741d9] decoration-[#6741d9]",
    focus: `text-[#1d2b53] decoration-[#6741d9] ${focusForced}`,
    pressed: "translate-y-0.5 text-[#4527a8] decoration-[#4527a8] decoration-[5px]",
  };
  return (
    <a href="#links" className={`relative inline-block ${ui} text-base font-black underline decoration-[3px] underline-offset-4 ${snappy} ${look[force ?? "rest"]} ${force ? "" : `hover:-translate-y-0.5 hover:text-[#6741d9] active:translate-y-0.5 active:text-[#4527a8] ${focusRing}`}`}>
      {children}
    </a>
  );
}

/* ---------- fields ---------- */

const fieldBase = `${ui} w-full rounded-2xl border-[3px] border-[#1d2b53] bg-white px-4 py-2.5 text-base font-extrabold text-[#1d2b53] outline-none shadow-[inset_0_4px_0_#e6ebf5] ${snappy} placeholder:font-bold placeholder:text-[#4a5a85]`;
const fieldLook: Record<ControlState, string> = {
  rest: "",
  hover: "bg-[#f3f9ff]",
  focus: "bg-[#f3f9ff]",
  pressed: "",
  selected: "",
  disabled: "cursor-not-allowed border-[#8e99b3] bg-[#d5dbe8] text-[#4a5a85] shadow-none",
};

function Field({ id, label, force, children }: { id: string; label: string; force?: ControlState; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className={`${ui} mb-1 block text-sm font-black text-[#1d2b53]`}>{label}</span>
      <span className={`block ${force === "focus" ? `${focusForced} relative` : force ? "relative" : focusWithin}`}>{children}</span>
    </label>
  );
}

export function GameInput({ force, id, label = "Trail name", placeholder = "Search a trail…" }: { force?: ControlState; id: string; label?: string; placeholder?: string }) {
  return (
    <Field id={id} label={label} force={force}>
      <input id={id} type="text" placeholder={placeholder} disabled={force === "disabled"} className={`${fieldBase} ${fieldLook[force ?? "rest"]} ${force ? "" : "hover:bg-[#f3f9ff] focus:bg-[#f3f9ff]"}`} />
    </Field>
  );
}

/** Select: the same field, with a round grape chevron button at the end. */
export function GameSelect({ force, id }: { force?: ControlState; id: string }) {
  const off = force === "disabled";
  return (
    <Field id={id} label="Best month" force={force}>
      <span className="relative block">
        <select id={id} defaultValue="Jul" disabled={off} className={`${fieldBase} appearance-none pr-14 ${fieldLook[force ?? "rest"]} ${force ? "" : "hover:bg-[#f3f9ff] focus:bg-[#f3f9ff]"}`}>
          {["Jun", "Jul", "Aug", "Sep"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <span className={`pointer-events-none absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border-[3px] border-[#1d2b53] ${off ? "bg-[#aab4c9]" : "bg-[#6741d9]"} shadow-[0_3px_0_#1d2b53]`}>
          <svg viewBox="0 0 12 8" className="h-2 w-3" aria-hidden="true"><path d="M1.5 1.5 L6 6 L10.5 1.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </span>
    </Field>
  );
}

/* ---------- checkbox and radio ---------- */

const boxLook: Record<ControlState, string> = {
  rest: "bg-white shadow-[0_3px_0_#1d2b53]",
  hover: "-translate-y-0.5 bg-[#e6f8ff] shadow-[0_5px_0_#1d2b53]",
  focus: `bg-white shadow-[0_3px_0_#1d2b53] ${focusForced}`,
  pressed: "translate-y-[3px] scale-90 bg-[#e6f8ff] shadow-none",
  selected: "bg-[#58d36b] shadow-[0_3px_0_#1d2b53]",
  disabled: "cursor-not-allowed border-[#8e99b3] bg-[#d5dbe8] shadow-none",
};

/** Checkbox: a chunky rounded box; checked fills with grass and pops a white tick. */
export function GameCheck({ force, label = "Huts on the way", defaultChecked = false }: { force?: ControlState; label?: string; defaultChecked?: boolean }) {
  const checked = force === "selected" || (!force && defaultChecked);
  const off = force === "disabled";
  return (
    <label className={`group relative flex items-center gap-3 ${off ? "cursor-not-allowed" : "cursor-pointer"}`}>
      <input type="checkbox" className="peer sr-only" defaultChecked={checked} disabled={off} />
      <span
        className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-[10px] border-[3px] border-[#1d2b53] ${snappy} ${pop} peer-checked:!bg-[#58d36b] peer-checked:[&_.tick]:scale-100 ${boxLook[force ?? (checked ? "selected" : "rest")]} ${force ? "" : "group-hover:-translate-y-0.5 group-hover:shadow-[0_5px_0_#1d2b53] peer-active:translate-y-[3px] peer-active:scale-90 peer-active:shadow-none tq-focus"}`}
      >
        <svg viewBox="0 0 16 16" className={`tick h-5 w-5 ${snappy} ${pop} ${checked ? "scale-100" : "scale-0"}`} aria-hidden="true">
          <path d="M3 8.5 L6.5 12 L13 4" fill="none" stroke="#1d2b53" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 8.5 L6.5 12 L13 4" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={`${ui} text-base font-black ${off ? "text-[#4a5a85]" : "text-[#1d2b53]"}`}>{label}</span>
      {off && <Icon name="lock" size={22} />}
    </label>
  );
}

/** Radio: a chunky round button; chosen, a grape gem sits in the middle. */
export function GameRadio({ name, options, defaultValue }: { name: string; options: string[]; defaultValue: string }) {
  return (
    <fieldset className="flex flex-wrap gap-x-6 gap-y-3">
      <legend className="sr-only">How long</legend>
      {options.map((o) => (
        <label key={o} className="group relative flex cursor-pointer items-center gap-2.5">
          <input type="radio" name={name} value={o} defaultChecked={o === defaultValue} className="peer sr-only" />
          <span className={`tq-focus relative grid h-8 w-8 place-items-center rounded-full border-[3px] border-[#1d2b53] bg-white shadow-[0_3px_0_#1d2b53] ${snappy} group-hover:-translate-y-0.5 group-hover:bg-[#e6f8ff] peer-active:translate-y-[3px] peer-active:shadow-none peer-checked:[&_.dot]:scale-100`}>
            <span className={`dot h-3.5 w-3.5 scale-0 rounded-full border-2 border-[#1d2b53] bg-[#6741d9] ${snappy} ${pop}`} />
          </span>
          <span className={`${ui} text-base font-black text-[#1d2b53]`}>{o}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function RadioSwatch({ force, label = "4 days" }: { force: ControlState; label?: string }) {
  const ring =
    force === "hover" ? "-translate-y-0.5 bg-[#e6f8ff] shadow-[0_5px_0_#1d2b53]" :
    force === "pressed" ? "translate-y-[3px] bg-[#e6f8ff] shadow-none" :
    force === "focus" ? `bg-white shadow-[0_3px_0_#1d2b53] ${focusForced}` :
    force === "disabled" ? "border-[#8e99b3] bg-[#d5dbe8]" : "bg-white shadow-[0_3px_0_#1d2b53]";
  return (
    <span className="flex items-center gap-2.5">
      <span className={`relative grid h-8 w-8 place-items-center rounded-full border-[3px] border-[#1d2b53] ${ring}`}>
        {force === "selected" && <span className="h-3.5 w-3.5 rounded-full border-2 border-[#1d2b53] bg-[#6741d9]" />}
      </span>
      <span className={`${ui} whitespace-nowrap text-base font-black ${force === "disabled" ? "text-[#4a5a85]" : "text-[#1d2b53]"}`}>{label}</span>
    </span>
  );
}

/* ---------- small pieces ---------- */

/** Count bubble: a sun-yellow coin with the number. */
export function CountBubble({ n }: { n: number | string }) {
  return <span className={`${display} inline-grid h-7 min-w-7 place-items-center rounded-full border-[3px] border-[#1d2b53] bg-[#ffd23f] px-1.5 text-sm text-[#1d2b53] shadow-[0_2px_0_#1d2b53]`}>{n}</span>;
}

/** Search: the field with a compass in a round button. */
export function GameSearch({ id }: { id: string }) {
  return (
    <label htmlFor={id} className={`${focusWithin} flex items-center gap-2 rounded-2xl border-[3px] border-[#1d2b53] bg-white p-1.5 pl-2 shadow-[0_4px_0_#1d2b53]`}>
      <Icon name="compass" size={30} />
      <span className="sr-only">Search trails</span>
      <input id={id} type="search" placeholder="Search a trail or a country…" className={`${ui} w-full bg-transparent py-1.5 text-base font-extrabold text-[#1d2b53] outline-none placeholder:font-bold placeholder:text-[#4a5a85]`} />
    </label>
  );
}

export { TQ };
