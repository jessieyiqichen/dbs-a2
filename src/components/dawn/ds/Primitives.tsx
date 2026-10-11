// Dawn controls without client state. Rule for every control:
// rest = tint plate a little off register; hover = plates in register, colour lifts; pressed = sinks, a shade darker, ink pressed in;
// focus = solid key-ink ring; selected = a tint plate laid under, in register; disabled = unprinted (dashed key line, no plates).
import type { ControlState } from "@/lib/contrast";
import { DW, caps, display, focusForced, focusRing, focusRingField, slow, ui } from "./tokens";

type Forceable = { force?: ControlState; children?: React.ReactNode };

/* ---------- buttons ---------- */

const primaryBase = `${caps} inline-flex items-center px-5 py-3 ${slow}`;
const primaryState: Record<ControlState, string> = {
  rest: "bg-[#2c5868] text-[#f6f9f7] shadow-[3px_3px_0_0_#8eaaa6]",
  hover: "bg-[#356677] text-[#f6f9f7] shadow-[0_0_0_0_#8eaaa6]",
  focus: `bg-[#2c5868] text-[#f6f9f7] shadow-[3px_3px_0_0_#8eaaa6] ${focusForced}`,
  pressed: "translate-x-px translate-y-px bg-[#244a58] text-[#f6f9f7] shadow-[inset_0_2px_4px_rgba(0,0,0,.4)]",
  selected: "",
  disabled: "cursor-not-allowed border border-dashed border-[#4f5f66] bg-transparent text-[#4f5f66] shadow-none",
};
const primaryLive = `hover:bg-[#356677] hover:shadow-[0_0_0_0_#8eaaa6] active:translate-x-px active:translate-y-px active:bg-[#244a58] active:shadow-[inset_0_2px_4px_rgba(0,0,0,.4)] ${focusRing}`;

/** Primary: loch ink with its tint plate printed a little off. Hover brings it into register; press sinks it. */
export function PrimaryButton({ force, children = "See the walk" }: Forceable) {
  if (force) return <span className={`${primaryBase} ${primaryState[force]}`}>{children}</span>;
  return <button type="button" className={`${primaryBase} ${primaryState.rest} ${primaryLive}`}>{children}</button>;
}

const secondaryBase = `${caps} inline-flex items-center border px-5 py-3 ${slow}`;
const secondaryState: Record<ControlState, string> = {
  rest: "border-[#22333a] bg-[#f6f9f7] text-[#22333a] shadow-[3px_3px_0_0_#c3d6c4]",
  hover: "border-[#22333a] bg-[#c3d6c4] text-[#22333a] shadow-[0_0_0_0_#c3d6c4]",
  focus: `border-[#22333a] bg-[#f6f9f7] text-[#22333a] shadow-[3px_3px_0_0_#c3d6c4] ${focusForced}`,
  pressed: "translate-x-px translate-y-px border-[#22333a] bg-[#8eaaa6] text-[#22333a] shadow-[inset_0_2px_4px_rgba(34,51,58,.45)]",
  selected: "",
  disabled: "cursor-not-allowed border-dashed border-[#4f5f66] bg-transparent text-[#4f5f66] shadow-none",
};

/** Secondary: key-ink outline on the mount, a celadon plate off register. */
export function SecondaryButton({ force, children = "Later" }: Forceable) {
  if (force) return <span className={`${secondaryBase} ${secondaryState[force]}`}>{children}</span>;
  return (
    <button type="button" className={`${secondaryBase} ${secondaryState.rest} hover:bg-[#c3d6c4] hover:shadow-[0_0_0_0_#c3d6c4] active:translate-x-px active:translate-y-px active:bg-[#8eaaa6] active:shadow-[inset_0_2px_4px_rgba(34,51,58,.45)] ${focusRing}`}>
      {children}
    </button>
  );
}

/** Link: key ink with a loch underline printed slightly low; hover pulls it into register under the word. */
export function PlateLink({ force, children = "Read the route" }: Forceable) {
  const state: Partial<Record<ControlState, string>> = {
    rest: "decoration-[#8eaaa6] underline-offset-[6px]",
    hover: "decoration-[#22333a] underline-offset-[3px]",
    focus: `decoration-[#8eaaa6] underline-offset-[6px] ${focusForced}`,
    pressed: "bg-[#c9dcdc] decoration-[#22333a] underline-offset-[3px]",
  };
  const live = `hover:decoration-[#22333a] hover:underline-offset-[3px] active:bg-[#c9dcdc] ${focusRing}`;
  return (
    <a href="#links" className={`${ui} px-0.5 text-base font-semibold text-[#22333a] underline decoration-2 ${slow} ${state[force ?? "rest"]} ${force ? "" : live}`}>
      {children}
    </a>
  );
}

/* ---------- fields ---------- */

const fieldState: Record<ControlState, string> = {
  rest: "border-[#6f8287]",
  hover: "border-[#22333a]",
  focus: `border-[#22333a] ${focusForced}`,
  pressed: "border-[#22333a]",
  selected: "border-[#22333a]",
  disabled: "cursor-not-allowed border-dashed border-[#4f5f66] text-[#4f5f66]",
};
const fieldBase = `${ui} w-full border bg-[#f6f9f7] px-3 py-2.5 text-base text-[#22333a] ${slow} placeholder:font-[family-name:var(--dw-display)] placeholder:italic placeholder:text-[#4f5f66]`;
const fieldLive = `hover:border-[#22333a] ${focusRingField}`;

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className={`${caps} mb-1.5 block text-[#4f5f66]`}>{label}</span>
      {children}
    </label>
  );
}

/** Text input: a field set into the mount, like the caption box under a print. */
export function MountInput({ force, id, label = "Trail name", placeholder = "a trail or a country" }: { force?: ControlState; id: string; label?: string; placeholder?: string }) {
  return (
    <Field id={id} label={label}>
      <input id={id} type="text" placeholder={placeholder} disabled={force === "disabled"} className={`${fieldBase} ${fieldState[force ?? "rest"]} ${force ? "" : fieldLive}`} />
    </Field>
  );
}

/** Select: the same field with a fine key-line chevron. */
export function MountSelect({ force, id }: { force?: ControlState; id: string }) {
  return (
    <Field id={id} label="Best month">
      <span className="relative block">
        <select id={id} defaultValue="Jan" disabled={force === "disabled"} className={`${fieldBase} appearance-none pr-9 ${fieldState[force ?? "rest"]} ${force ? "" : fieldLive}`}>
          {["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <svg viewBox="0 0 14 8" className="pointer-events-none absolute right-3 top-1/2 h-2 w-3.5 -translate-y-1/2" aria-hidden="true">
          <path d="M1 1 L7 7 L13 1" fill="none" stroke={DW.text} strokeWidth="1.4" />
        </svg>
      </span>
    </Field>
  );
}

/* ---------- checkbox and radio ---------- */

/** Checkbox: a key-line square; checked, a loch plate fills it in register and a key tick is printed on top. */
export function PlateCheck({ force, label = "Huts on the way", defaultChecked = false }: { force?: ControlState; label?: string; defaultChecked?: boolean }) {
  const checked = force === "selected" || (!force && defaultChecked);
  const disabled = force === "disabled";
  const box =
    force === "hover" ? "!bg-[#c9dcdc] border-[#22333a]" :
    force === "pressed" ? "translate-x-px translate-y-px !bg-[#a7b4b1] border-[#22333a] shadow-[inset_0_2px_3px_rgba(34,51,58,.45)]" :
    force === "focus" ? `border-[#22333a] ${focusForced}` :
    disabled ? "border-dashed border-[#4f5f66]" : "border-[#22333a]";
  return (
    <label className={`group relative flex items-center gap-3 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
      <input type="checkbox" className="peer sr-only" defaultChecked={checked} disabled={disabled} />
      <span
        className={`relative grid h-5 w-5 shrink-0 place-items-center border-[1.5px] bg-[#f6f9f7] ${slow} peer-checked:!bg-[#8eaaa6] peer-checked:[&_.tick]:opacity-100 ${box} ${force ? "" : "group-hover:bg-[#c9dcdc] peer-active:translate-x-px peer-active:translate-y-px peer-active:bg-[#a7b4b1] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-[#22333a]"} ${checked ? "bg-[#8eaaa6]" : ""}`}
      >
        <svg viewBox="0 0 16 16" className={`tick h-3.5 w-3.5 transition-opacity duration-300 ${checked ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          <path d="M2.5 8.5 L6.5 12 L13.5 3.5" fill="none" stroke={DW.text} strokeWidth="2" strokeLinecap="square" />
        </svg>
      </span>
      <span className={`${ui} text-base ${disabled ? "text-[#4f5f66] line-through" : "text-[#22333a]"}`}>{label}</span>
    </label>
  );
}

/** Radio: a key-line ring; chosen, a loch dot sits in register at its centre. */
export function PlateRadio({ name, options, defaultValue }: { name: string; options: string[]; defaultValue: string }) {
  return (
    <fieldset className="flex flex-wrap gap-x-6 gap-y-3">
      <legend className="sr-only">How long</legend>
      {options.map((o) => (
        <label key={o} className="group relative flex cursor-pointer items-center gap-2.5">
          <input type="radio" name={name} value={o} defaultChecked={o === defaultValue} className="peer sr-only" />
          <span className={`relative grid h-5 w-5 place-items-center rounded-full border-[1.5px] border-[#22333a] bg-[#f6f9f7] ${slow} group-hover:bg-[#c9dcdc] peer-active:translate-y-px peer-active:bg-[#a7b4b1] peer-checked:[&_.dot]:scale-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-[#22333a]`}>
            <span className={`dot h-2.5 w-2.5 scale-0 rounded-full bg-[#2c5868] ${slow}`} />
          </span>
          <span className={`${ui} text-base text-[#22333a]`}>{o}</span>
        </label>
      ))}
    </fieldset>
  );
}

/** One radio option in a forced state, for the grid. */
export function RadioSwatch({ force, label = "A few days" }: { force: ControlState; label?: string }) {
  const ring =
    force === "hover" ? "!bg-[#c9dcdc]" :
    force === "pressed" ? "translate-y-px !bg-[#a7b4b1] shadow-[inset_0_2px_3px_rgba(34,51,58,.45)]" :
    force === "focus" ? focusForced :
    force === "disabled" ? "border-dashed !border-[#4f5f66]" : "";
  return (
    <span className="flex items-center gap-2.5">
      <span className={`grid h-5 w-5 place-items-center rounded-full border-[1.5px] border-[#22333a] bg-[#f6f9f7] ${ring}`}>
        {force === "selected" && <span className="h-2.5 w-2.5 rounded-full bg-[#2c5868]" />}
      </span>
      <span className={`${ui} whitespace-nowrap text-base ${force === "disabled" ? "text-[#4f5f66] line-through" : "text-[#22333a]"}`}>{label}</span>
    </span>
  );
}

/* ---------- small pieces ---------- */

/** Count badge: a number set in a small key-line box, like a plate number. */
export function CountBadge({ n }: { n: number }) {
  return <span className={`${display} inline-grid h-8 min-w-8 place-items-center border border-[#22333a] bg-[#f6f9f7] px-1.5 text-lg leading-none text-[#22333a] shadow-[2px_2px_0_0_#c9dcdc]`}>{n}</span>;
}

/** Search: "No." then the field, as in a print catalogue. */
export function CatalogueSearch({ id }: { id: string }) {
  return (
    <label htmlFor={id} className="flex items-stretch border border-[#6f8287] bg-[#f6f9f7] p-1 transition-colors duration-[600ms] focus-within:border-[#22333a] hover:border-[#22333a]">
      <span className={`${caps} grid place-items-center border-r border-[#6f8287]/50 px-3 text-[#4f5f66]`}>No.</span>
      <span className="sr-only">Search trails</span>
      <input id={id} type="search" placeholder="a trail, a country, a month…" className={`${ui} w-full bg-transparent px-3 py-2 text-base text-[#22333a] placeholder:font-[family-name:var(--dw-display)] placeholder:italic placeholder:text-[#4f5f66] ${focusRingField}`} />
    </label>
  );
}
