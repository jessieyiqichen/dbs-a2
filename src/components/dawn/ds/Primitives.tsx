// Dawn controls without client state. Rule for every control:
// rest = tint plate a little off register; hover = plates in register, colour lifts; pressed = sinks, a shade darker, ink pressed in;
// focus = solid key-ink ring; selected = a tint plate laid under, in register; disabled = unprinted (dashed key line, no plates).
import Link from "next/link";
import type { ControlState } from "@/lib/contrast";
import { DW, caps, display, focusForced, focusRing, focusWithin, slow, ui } from "./tokens";

type Forceable = { force?: ControlState; children?: React.ReactNode };

/* ---------- buttons ---------- */

/** The printed tick: shown on anything selected (buttons, chips). */
export function Tick() {
  return (
    <svg viewBox="0 0 16 16" className="-ml-0.5 mr-1.5 inline-block h-3 w-3 shrink-0 align-[-1px]" aria-hidden="true">
      <path d="M2.5 8.5 L6.5 12 L13.5 3.5" fill="none" stroke="#22333a" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

/** Selected, for every button: a pine plate laid under in register, a key rule beneath, and a tick. */
const selectedLook = "border-dw-ink bg-dw-pine text-dw-ink shadow-[inset_0_-3px_0_0_var(--color-dw-ink)]";
const selectedLive = `active:translate-x-px active:translate-y-px active:bg-dw-lake active:shadow-[inset_0_2px_4px_rgba(34,51,58,.45)] ${focusRing}`;

/** `selected` makes a button a toggle (aria-pressed); `small` is for buttons that sit inside cards and panels. */
type ButtonProps = Forceable & { selected?: boolean; small?: boolean } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;
const pad = (small?: boolean) => (small ? "px-3 py-2" : "px-5 py-3");

const primaryBase = `${caps} relative inline-flex items-center border border-transparent ${slow}`;
const primaryState: Record<ControlState, string> = {
  rest: "bg-dw-loch text-dw-mount shadow-[3px_3px_0_0_var(--color-dw-lake)]",
  hover: "bg-dw-loch-hover text-dw-mount shadow-[0_0_0_0_var(--color-dw-lake)]",
  focus: `bg-dw-loch text-dw-mount shadow-[3px_3px_0_0_var(--color-dw-lake)] ${focusForced}`,
  pressed: "translate-x-px translate-y-px bg-dw-loch-pressed text-dw-mount shadow-[inset_0_2px_4px_rgba(0,0,0,.4)]",
  selected: selectedLook,
  disabled: "cursor-not-allowed !border-dashed !border-dw-muted bg-transparent text-dw-muted shadow-none",
};
const primaryLive = `hover:bg-dw-loch-hover hover:shadow-[0_0_0_0_var(--color-dw-lake)] active:translate-x-px active:translate-y-px active:bg-dw-loch-pressed active:shadow-[inset_0_2px_4px_rgba(0,0,0,.4)] ${focusRing}`;

/** Primary: loch ink with its tint plate printed a little off. Hover brings it into register; press sinks it.
 *  As a toggle, once chosen it gives up the loch: the thing is done, so the accent is free for the next action. */
export function PrimaryButton({ force, selected, small, children = "See the walk", ...rest }: ButtonProps) {
  if (force) return <span className={`${primaryBase} ${pad(small)} ${primaryState[force]}`}>{force === "selected" && <Tick />}{children}</span>;
  return (
    <button type="button" aria-pressed={selected} {...rest} className={`${primaryBase} ${pad(small)} ${selected ? `${primaryState.selected} ${selectedLive}` : `${primaryState.rest} ${primaryLive}`}`}>
      {selected && <Tick />}
      {children}
    </button>
  );
}

const secondaryBase = `${caps} relative inline-flex items-center border ${slow}`;
const secondaryState: Record<ControlState, string> = {
  rest: "border-dw-ink bg-dw-mount text-dw-ink shadow-[3px_3px_0_0_var(--color-dw-lake)]",
  hover: "border-dw-ink bg-dw-sky text-dw-ink shadow-[0_0_0_0_var(--color-dw-lake)]",
  focus: `border-dw-ink bg-dw-mount text-dw-ink shadow-[3px_3px_0_0_var(--color-dw-lake)] ${focusForced}`,
  pressed: "translate-x-px translate-y-px border-dw-ink bg-dw-lake text-dw-ink shadow-[inset_0_2px_4px_rgba(34,51,58,.45)]",
  selected: selectedLook,
  disabled: "cursor-not-allowed border-dashed border-dw-muted bg-transparent text-dw-muted shadow-none",
};
const secondaryLive = `hover:bg-dw-sky hover:shadow-[0_0_0_0_var(--color-dw-lake)] active:translate-x-px active:translate-y-px active:bg-dw-lake active:shadow-[inset_0_2px_4px_rgba(34,51,58,.45)] ${focusRing}`;

/** Secondary: key-ink outline on the mount, a pine plate off register. */
export function SecondaryButton({ force, selected, small, children = "Later", ...rest }: ButtonProps) {
  if (force) return <span className={`${secondaryBase} ${pad(small)} ${secondaryState[force]}`}>{force === "selected" && <Tick />}{children}</span>;
  return (
    <button type="button" aria-pressed={selected} {...rest} className={`${secondaryBase} ${pad(small)} ${selected ? `${secondaryState.selected} ${selectedLive}` : `${secondaryState.rest} ${secondaryLive}`}`}>
      {selected && <Tick />}
      {children}
    </button>
  );
}

/* ---------- link ---------- */

/** Link sizes, from the six: reading text, notes, and walk names. */
export type LinkSize = "reading" | "note" | "name";
const linkFace: Record<LinkSize, string> = {
  reading: `${ui} text-[16px] leading-[25px] font-semibold sm:text-[17px] sm:leading-[27px]`,
  note: `${ui} text-[14px] leading-[21px] font-semibold`,
  name: `${display} text-[20px] leading-[1.25] sm:text-[24px] sm:leading-[1.2]`,
};
const linkState: Record<ControlState, string> = {
  rest: "decoration-dw-lake underline-offset-[6px]",
  hover: "decoration-dw-ink underline-offset-[3px]",
  focus: `decoration-dw-lake underline-offset-[6px] ${focusForced}`,
  pressed: "bg-dw-lake decoration-dw-ink underline-offset-[3px]",
  selected: "",
  disabled: "",
};
const linkLive = `hover:decoration-dw-ink hover:underline-offset-[3px] active:bg-dw-lake ${focusRing}`;

/** The link look, for things that act as links but aren't anchors (a <summary>). */
export function plateLinkClass(size: LinkSize = "reading", force?: ControlState): string {
  return `${linkFace[size]} relative px-0.5 text-dw-ink underline decoration-2 ${slow} ${linkState[force ?? "rest"]} ${force ? "" : linkLive}`;
}

/** Link: key ink with a loch underline printed slightly low; hover pulls it into register under the word.
 *  Paths starting with "/" move within the site; `external` opens another site in a new tab. */
export function PlateLink({ force, children = "Read the route", href = "#links", size = "reading", external = false }: Forceable & { href?: string; size?: LinkSize; external?: boolean }) {
  const cls = plateLinkClass(size, force);
  if (href.startsWith("/") && !force) return <Link href={href} className={cls}>{children}</Link>;
  return <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>;
}

/* ---------- fields ---------- */

const fieldState: Record<ControlState, string> = {
  rest: "border-dw-border",
  hover: "border-dw-ink",
  focus: "border-dw-ink",
  pressed: "border-dw-ink",
  selected: "border-dw-ink",
  disabled: "cursor-not-allowed border-dashed border-dw-muted text-dw-muted",
};
const fieldBase = `${ui} w-full border bg-dw-mount outline-none px-3 py-2.5 text-base text-dw-ink ${slow} placeholder:font-[family-name:var(--dw-display)] placeholder:italic placeholder:text-dw-muted`;
const fieldLive = "hover:border-dw-ink focus:border-dw-ink";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className={`${caps} mb-1.5 block text-dw-muted`}>{label}</span>
      {children}
    </label>
  );
}

/** Text input: a field set into the mount, like the caption box under a print. */
export function MountInput({ force, id, label = "Trail name", placeholder = "a trail or a country" }: { force?: ControlState; id: string; label?: string; placeholder?: string }) {
  return (
    <Field id={id} label={label}>
      <span className={`block ${force === "focus" ? `${focusForced} relative` : force ? "relative" : focusWithin}`}>
        <input id={id} type="text" placeholder={placeholder} disabled={force === "disabled"} className={`${fieldBase} ${fieldState[force ?? "rest"]} ${force ? "" : fieldLive}`} />
      </span>
    </Field>
  );
}

/** Select: the same field with a fine key-line chevron. */
const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"].map((m) => ({ value: m, label: m }));

export function MountSelect({ force, id, label = "Best month", options = MONTHS, value, onChange }: { force?: ControlState; id: string; label?: string; options?: { value: string; label: string }[]; value?: string; onChange?: (v: string) => void }) {
  return (
    <Field id={id} label={label}>
      <span className={`block ${force === "focus" ? `${focusForced} relative` : force ? "relative" : focusWithin}`}>
        <select
          id={id}
          {...(value === undefined ? { defaultValue: options[2]?.value ?? options[0].value } : { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) })}
          disabled={force === "disabled"}
          className={`${fieldBase} appearance-none pr-9 ${fieldState[force ?? "rest"]} ${force ? "" : fieldLive}`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
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
    force === "hover" ? "!bg-dw-sky border-dw-ink" :
    force === "pressed" ? "translate-x-px translate-y-px !bg-dw-lake border-dw-ink shadow-[inset_0_2px_3px_rgba(34,51,58,.45)]" :
    force === "focus" ? `border-dw-ink ${focusForced}` :
    disabled ? "border-dashed border-dw-muted" : "border-dw-ink";
  return (
    <label className={`group relative flex items-center gap-3 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
      <input type="checkbox" className="peer sr-only" defaultChecked={checked} disabled={disabled} />
      <span
        className={`relative grid h-5 w-5 shrink-0 place-items-center border-[1.5px] bg-dw-mount ${slow} peer-checked:!bg-dw-pine peer-checked:[&_.tick]:opacity-100 ${box} ${force ? "" : "group-hover:bg-dw-sky peer-active:translate-x-px peer-active:translate-y-px peer-active:bg-dw-lake dw-crop"} ${checked ? "bg-dw-pine" : ""}`}
      >
        <svg viewBox="0 0 16 16" className={`tick h-3.5 w-3.5 transition-opacity duration-300 ${checked ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          <path d="M2.5 8.5 L6.5 12 L13.5 3.5" fill="none" stroke={DW.text} strokeWidth="2" strokeLinecap="square" />
        </svg>
      </span>
      <span className={`${ui} text-base ${disabled ? "text-dw-muted line-through" : "text-dw-ink"}`}>{label}</span>
    </label>
  );
}

/** Radio: a key-line ring; chosen, a key-ink dot sits in register at its centre (loch is kept for the primary action). */
export function PlateRadio({ name, options, defaultValue }: { name: string; options: string[]; defaultValue: string }) {
  return (
    <fieldset className="flex flex-wrap gap-x-6 gap-y-3">
      <legend className="sr-only">How long</legend>
      {options.map((o) => (
        <label key={o} className="group relative flex cursor-pointer items-center gap-2.5">
          <input type="radio" name={name} value={o} defaultChecked={o === defaultValue} className="peer sr-only" />
          <span className={`relative grid h-5 w-5 place-items-center rounded-full border-[1.5px] border-dw-ink bg-dw-mount ${slow} group-hover:bg-dw-sky peer-active:translate-y-px peer-active:bg-dw-lake peer-checked:[&_.dot]:scale-100 dw-crop`}>
            <span className={`dot h-2.5 w-2.5 scale-0 rounded-full bg-dw-ink ${slow}`} />
          </span>
          <span className={`${ui} text-base text-dw-ink`}>{o}</span>
        </label>
      ))}
    </fieldset>
  );
}

/** One radio option in a forced state, for the grid. */
export function RadioSwatch({ force, label = "A few days" }: { force: ControlState; label?: string }) {
  const ring =
    force === "hover" ? "!bg-dw-sky" :
    force === "pressed" ? "translate-y-px !bg-dw-lake shadow-[inset_0_2px_3px_rgba(34,51,58,.45)]" :
    force === "focus" ? focusForced :
    force === "disabled" ? "border-dashed !border-dw-muted" : "";
  return (
    <span className="flex items-center gap-2.5">
      <span className={`relative grid h-5 w-5 place-items-center rounded-full border-[1.5px] border-dw-ink bg-dw-mount ${ring}`}>
        {force === "selected" && <span className="h-2.5 w-2.5 rounded-full bg-dw-ink" />}
      </span>
      <span className={`${ui} whitespace-nowrap text-base ${force === "disabled" ? "text-dw-muted line-through" : "text-dw-ink"}`}>{label}</span>
    </span>
  );
}

/* ---------- small pieces ---------- */

/** Count badge: a number set in a small key-line box, like a plate number. */
export function CountBadge({ n, small = false }: { n: number; small?: boolean }) {
  if (small) return <span className={`${display} inline-grid h-5 min-w-5 place-items-center border border-dw-ink bg-dw-mount px-1 text-[14px] leading-none tracking-normal text-dw-ink`}>{n}</span>;
  return <span className={`${display} inline-grid h-8 min-w-8 place-items-center border border-dw-ink bg-dw-mount px-1.5 text-[17px] leading-none text-dw-ink shadow-[2px_2px_0_0_var(--color-dw-lake)]`}>{n}</span>;
}

/** Search: "No." then the field, as in a print catalogue. */
export function CatalogueSearch({ id, value, onChange, placeholder = "a trail, a country, a month…" }: { id: string; value?: string; onChange?: (v: string) => void; placeholder?: string }) {
  return (
    <label htmlFor={id} className="dw-crop dw-within relative flex items-stretch border border-dw-border bg-dw-mount p-1 transition-colors duration-[600ms] focus-within:border-dw-ink hover:border-dw-ink">
      <span className={`${caps} grid place-items-center border-r border-dw-border/50 px-3 text-dw-muted`}>No.</span>
      <span className="sr-only">Search trails</span>
      <input id={id} type="search" placeholder={placeholder} {...(value === undefined ? {} : { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value) })} className={`${ui} w-full bg-transparent px-3 py-2 text-base text-dw-ink placeholder:font-[family-name:var(--dw-display)] placeholder:italic placeholder:text-dw-muted outline-none`} />
    </label>
  );
}
