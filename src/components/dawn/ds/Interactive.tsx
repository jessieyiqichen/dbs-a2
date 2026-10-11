"use client";
// Dawn controls that hold state: tabs, filter chips, toggle. Each also renders any single state for the grid.
import { useState } from "react";
import type { ControlState } from "@/lib/contrast";
import { DW, focusForced, focusRing, slow, ui } from "./tokens";
import { Tick } from "./Primitives";

/* ---------- tabs ---------- */

/** One tab in a forced state. Selected: a celadon plate under the label, a key rule beneath, in register. */
export function TabSwatch({ force, label = "Route" }: { force: ControlState; label?: string }) {
  const plate =
    force === "selected" ? { bg: DW.celadon, t: "translate(0,0)", o: 1 } :
    force === "hover" ? { bg: DW.aqua, t: "translate(0,0)", o: 1 } :
    force === "pressed" ? { bg: DW.loch, t: "translate(0,0)", o: 0.6 } : null;
  return (
    <span className={`relative inline-block px-3 pb-2 pt-2.5 ${ui} text-sm ${force === "selected" ? "font-semibold text-[#22333a]" : force === "disabled" ? "text-[#4f5f66] line-through" : "text-[#22333a]"} ${force === "focus" ? focusForced : ""} ${force === "pressed" ? "translate-y-px" : ""}`}>
      {plate && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 top-1" style={{ background: plate.bg, opacity: plate.o, transform: plate.t }} />}
      <span className="relative">{label}</span>
      <span aria-hidden="true" className={`absolute inset-x-0 -bottom-px h-[3px] ${force === "selected" ? "bg-[#22333a]" : "bg-transparent"}`} />
      <span aria-hidden="true" className={`absolute inset-x-0 -bottom-px h-px ${force === "disabled" ? "border-b border-dashed border-[#4f5f66]" : "bg-[#22333a]"}`} />
    </span>
  );
}

/** Tabs: the chosen one gets a celadon plate laid under it and a key rule. Arrow keys move between tabs. */
export function PlateTabs({ tabs, panels, idPrefix = "dw", panelClassName }: { tabs: string[]; panels: React.ReactNode[]; idPrefix?: string; panelClassName?: string }) {
  const [at, setAt] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Trail sections" className="flex border-b border-[#22333a]">
        {tabs.map((t, i) => {
          const on = at === i;
          return (
            <button
              key={t}
              id={`${idPrefix}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${idPrefix}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setAt(i)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const next = (at + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
                setAt(next);
                document.getElementById(`${idPrefix}-tab-${next}`)?.focus();
              }}
              className={`group relative whitespace-nowrap px-3 pb-2 pt-2.5 ${ui} text-sm ${on ? "font-semibold text-[#22333a]" : "text-[#22333a]"} active:translate-y-px ${focusRing}`}
            >
              <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 top-1 ${slow} ${on ? "translate-x-0 translate-y-0 bg-[#c3d6c4] opacity-100" : "translate-x-[3px] translate-y-[6px] bg-[#c9dcdc] opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-active:bg-[#8eaaa6]/60"}`} />
              <span className="relative">{t}</span>
              <span aria-hidden="true" className={`absolute inset-x-0 -bottom-px h-[3px] bg-[#22333a] ${slow} ${on ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`${idPrefix}-panel-${at}`} aria-labelledby={`${idPrefix}-tab-${at}`} className={panelClassName ?? `${ui} min-h-20 bg-[#f6f9f7] px-4 py-3 text-base leading-relaxed text-[#22333a]`}>
        {panels[at]}
      </div>
    </div>
  );
}

/* ---------- chips ---------- */

const chipState: Record<ControlState, string> = {
  rest: "border-[#22333a]/50 bg-transparent text-[#22333a] shadow-[2px_2px_0_0_var(--tint)]",
  hover: "border-[#22333a] text-[#22333a] shadow-[0_0_0_0_var(--tint)] [background:color-mix(in_srgb,var(--tint)_45%,transparent)]",
  focus: `border-[#22333a]/50 bg-transparent text-[#22333a] shadow-[2px_2px_0_0_var(--tint)] ${focusForced}`,
  pressed: "translate-x-px translate-y-px border-[#22333a] text-[#22333a] shadow-[inset_0_2px_4px_rgba(34,51,58,.45)] [background:var(--tint)]",
  selected: "border-[#22333a] font-semibold text-[#22333a] shadow-[inset_0_-3px_0_0_#22333a] [background:var(--tint)]",
  disabled: "cursor-not-allowed border-dashed border-[#4f5f66] bg-transparent text-[#4f5f66] line-through",
};
const chipBase = `${ui} relative inline-block border px-3 py-1.5 text-sm ${slow}`;

export function ChipSwatch({ force, label = "Lakes", tint = DW.loch }: { force: ControlState; label?: string; tint?: string }) {
  return (
    <span className={`${chipBase} ${chipState[force]}`} style={{ "--tint": tint } as React.CSSProperties}>
      {force === "selected" && <Tick />}
      {label}
    </span>
  );
}

/** One filter chip, controlled by its parent. */
export function PlateChip({ label, tint, on, onToggle }: { label: string; tint: string; on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onToggle}
      className={`${chipBase} ${on ? chipState.selected : `${chipState.rest} hover:border-[#22333a] hover:shadow-[0_0_0_0_var(--tint)] hover:[background:color-mix(in_srgb,var(--tint)_45%,transparent)]`} active:translate-x-px active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(34,51,58,.45)] active:[background:var(--tint)] ${focusRing}`}
      style={{ "--tint": tint } as React.CSSProperties}
    >
      {on && <Tick />}
      {label}
    </button>
  );
}

/** Filter chips: printed labels, each with its own tint plate. Chosen ones are printed solid, in register. */
export function PlateChips({ options }: { options: { label: string; tint: string; on?: boolean }[] }) {
  const [on, setOn] = useState(options.filter((o) => o.on).map((o) => o.label));
  return (
    <div role="group" aria-label="Filter trails" className="flex flex-wrap gap-2.5">
      {options.map((o) => (
        <PlateChip key={o.label} label={o.label} tint={o.tint} on={on.includes(o.label)} onToggle={() => setOn((cur) => (cur.includes(o.label) ? cur.filter((x) => x !== o.label) : [...cur, o.label]))} />
      ))}
    </div>
  );
}

/* ---------- toggle ---------- */

/** Toggle: square track and knob. Off, the knob's loch plate sits off register; on, it locks in and the track is printed. */
export function PlateToggle({ label, icon, initial = false, force, checked, onChange }: { label: string; icon?: React.ReactNode; initial?: boolean; force?: ControlState; checked?: boolean; onChange?: (on: boolean) => void }) {
  const [live, setLive] = useState(initial);
  const on = force ? force === "selected" : (checked ?? live);
  const disabled = force === "disabled";
  const move = "left 600ms cubic-bezier(.45,0,.2,1), box-shadow 600ms cubic-bezier(.45,0,.2,1), background-color 600ms cubic-bezier(.45,0,.2,1)";
  const knobShadow = on || force === "hover" ? `0 0 0 0 ${DW.loch}` : force === "pressed" ? `inset 0 1px 2px rgba(34,51,58,.4)` : `3px 3px 0 0 ${DW.loch}`;
  const track = (
    <span
      className={`relative block h-[26px] w-[50px] shrink-0 border-[1.5px] ${disabled ? "border-dashed border-[#4f5f66]" : "border-[#22333a]"} ${force ? "" : "group-hover:!bg-[#c9dcdc] group-active:!bg-[#a7b4b1] dw-crop"} ${on && !force ? "group-hover:!bg-[#8eaaa6]" : ""} ${force === "focus" ? focusForced : ""}`}
      style={{ background: on ? DW.loch : force === "pressed" ? DW.stone : force === "hover" ? DW.aqua : DW.surface, transition: move }}
    >
      <span
        className={`absolute top-[3px] h-[17px] w-[17px] border-[1.5px] bg-[#f6f9f7] ${disabled ? "border-dashed border-[#4f5f66]" : "border-[#22333a]"} ${force ? "" : "group-hover:!shadow-none group-active:translate-y-px"}`}
        style={{ left: on ? "calc(100% - 20px)" : "3px", boxShadow: disabled ? "none" : knobShadow, transition: move }}
      />
    </span>
  );
  const text = <span className={`${ui} inline-flex items-center gap-1.5 whitespace-nowrap text-[14px] ${disabled ? "text-[#4f5f66] line-through" : on ? "text-[#22333a]" : "text-[#4f5f66]"}`}>{icon}{label}</span>;
  if (force) return <span className="flex items-center gap-3">{track}{text}</span>;
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => (onChange ? onChange(!on) : setLive(!live))} className="group flex items-center gap-3 text-left outline-none">
      {track}
      {text}
    </button>
  );
}
