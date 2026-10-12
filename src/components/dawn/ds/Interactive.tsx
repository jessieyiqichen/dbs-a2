"use client";
// Dawn controls that hold state: tabs, filter chips, toggle. Each also renders any single state for the grid.
import { useState } from "react";
import type { ControlState } from "@/lib/contrast";
import { DW, focusForced, focusRing, slow, ui } from "./tokens";
import { Tick } from "./Primitives";
import { PlateIcon } from "../PlateArt";
import { stopBase, stopState, type RouteNode } from "./Guide";
import { t12, t14, t24 } from "./type";

/* ---------- tabs ---------- */

/** One tab in a forced state. Selected: a pine plate under the label, a key rule beneath, in register. */
export function TabSwatch({ force, label = "Route" }: { force: ControlState; label?: string }) {
  const plate =
    force === "selected" ? { bg: DW.sun, t: "translate(0,0)", o: 1 } :
    force === "hover" ? { bg: DW.sky, t: "translate(0,0)", o: 1 } :
    force === "pressed" ? { bg: DW.lake, t: "translate(0,0)", o: 0.6 } : null;
  return (
    <span className={`relative inline-block px-3 pb-2 pt-2.5 ${ui} text-sm ${force === "selected" ? "font-semibold text-dw-ink" : force === "disabled" ? "text-dw-muted line-through" : "text-dw-ink"} ${force === "focus" ? focusForced : ""} ${force === "pressed" ? "translate-y-px" : ""}`}>
      {plate && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 top-1" style={{ background: plate.bg, opacity: plate.o, transform: plate.t }} />}
      <span className="relative">{label}</span>
      <span aria-hidden="true" className={`absolute inset-x-0 -bottom-px h-[3px] ${force === "selected" ? "bg-dw-ink" : "bg-transparent"}`} />
      <span aria-hidden="true" className={`absolute inset-x-0 -bottom-px h-px ${force === "disabled" ? "border-b border-dashed border-dw-muted" : "bg-dw-ink"}`} />
    </span>
  );
}

/** Tabs: the chosen one gets a pine plate laid under it and a key rule. Arrow keys move between tabs. */
export function PlateTabs({ tabs, panels, idPrefix = "dw", panelClassName }: { tabs: string[]; panels: React.ReactNode[]; idPrefix?: string; panelClassName?: string }) {
  const [at, setAt] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Trail sections" className="flex border-b border-dw-ink">
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
              className={`group relative whitespace-nowrap px-3 pb-2 pt-2.5 ${ui} text-sm ${on ? "font-semibold text-dw-ink" : "text-dw-ink"} active:translate-y-px ${focusRing}`}
            >
              <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 top-1 ${slow} ${on ? "translate-x-0 translate-y-0 bg-dw-sun opacity-100" : "translate-x-[3px] translate-y-[6px] bg-dw-sky opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-active:bg-dw-lake/60"}`} />
              <span className="relative">{t}</span>
              <span aria-hidden="true" className={`absolute inset-x-0 -bottom-px h-[3px] bg-dw-ink ${slow} ${on ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`${idPrefix}-panel-${at}`} aria-labelledby={`${idPrefix}-tab-${at}`} className={panelClassName ?? `${ui} min-h-20 bg-dw-mount px-4 py-3 text-base leading-relaxed text-dw-ink`}>
        {panels[at]}
      </div>
    </div>
  );
}

/* ---------- chips ---------- */

const chipState: Record<ControlState, string> = {
  rest: "border-dw-ink/50 bg-transparent text-dw-ink shadow-[2px_2px_0_0_var(--tint)]",
  hover: "border-dw-ink text-dw-ink shadow-[0_0_0_0_var(--tint)] [background:color-mix(in_srgb,var(--tint)_45%,transparent)]",
  focus: `border-dw-ink/50 bg-transparent text-dw-ink shadow-[2px_2px_0_0_var(--tint)] ${focusForced}`,
  pressed: "translate-x-px translate-y-px border-dw-ink text-dw-ink shadow-[inset_0_2px_4px_rgba(34,51,58,.45)] [background:var(--tint)]",
  selected: "border-dw-ink font-semibold text-dw-ink shadow-[inset_0_-3px_0_0_var(--color-dw-ink)] [background:var(--tint)]",
  disabled: "cursor-not-allowed border-dashed border-dw-muted bg-transparent text-dw-muted line-through",
};
const chipBase = `${ui} relative inline-block border px-3 py-1.5 text-sm ${slow}`;

export function ChipSwatch({ force, label = "Lakes", tint = DW.lake }: { force: ControlState; label?: string; tint?: string }) {
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
      className={`${chipBase} ${on ? chipState.selected : `${chipState.rest} hover:border-dw-ink hover:shadow-[0_0_0_0_var(--tint)] hover:[background:color-mix(in_srgb,var(--tint)_45%,transparent)]`} active:translate-x-px active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(34,51,58,.45)] active:[background:var(--tint)] ${focusRing}`}
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
  const knobShadow = on || force === "hover" ? `0 0 0 0 ${DW.lake}` : force === "pressed" ? `inset 0 1px 2px rgba(34,51,58,.4)` : `3px 3px 0 0 ${DW.lake}`;
  const track = (
    <span
      className={`relative block h-[26px] w-[50px] shrink-0 border-[1.5px] ${disabled ? "border-dashed border-dw-muted" : "border-dw-ink"} ${force ? "" : "group-hover:!bg-dw-sky group-active:!bg-dw-lake dw-crop"} ${on && !force ? "group-hover:!bg-dw-sun" : ""} ${force === "focus" ? focusForced : ""}`}
      style={{ background: on ? DW.sun : force === "pressed" ? DW.lake : force === "hover" ? DW.sky : DW.surface, transition: move }}
    >
      <span
        className={`absolute top-[3px] h-[17px] w-[17px] border-[1.5px] bg-dw-mount ${disabled ? "border-dashed border-dw-muted" : "border-dw-ink"} ${force ? "" : "group-hover:!shadow-none group-active:translate-y-px"}`}
        style={{ left: on ? "calc(100% - 20px)" : "3px", boxShadow: disabled ? "none" : knobShadow, transition: move }}
      />
    </span>
  );
  const text = <span className={`${ui} inline-flex items-center gap-1.5 whitespace-nowrap text-[14px] ${disabled ? "text-dw-muted line-through" : on ? "text-dw-ink" : "text-dw-muted"}`}>{icon}{label}</span>;
  if (force) return <span className="flex items-center gap-3">{track}{text}</span>;
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => (onChange ? onChange(!on) : setLive(!live))} className="group flex items-center gap-3 text-left outline-none">
      {track}
      {text}
    </button>
  );
}

/* ---------- route map ---------- */

/** Along the way as a map: one key line threading every stop's icon; choose a stop to read about it beneath.
 *  Arrow keys move along the line. On a phone the line slides sideways. */
export function RouteMap({ nodes, idPrefix }: { nodes: RouteNode[]; idPrefix: string }) {
  const [at, setAt] = useState(0);
  const move = (e: React.KeyboardEvent<HTMLDivElement>, by: number) => {
    e.preventDefault();
    const next = Math.min(nodes.length - 1, Math.max(0, at + by));
    setAt(next);
    e.currentTarget.querySelectorAll("button")[next]?.focus();
  };
  const n = nodes[at];
  return (
    <div>
      <p className={`${t12} text-dw-muted`}>{nodes.length - 2} stops · choose one to read about it</p>
      <div className="-mx-2 overflow-x-auto px-2 py-3 [scrollbar-width:none]">
        <div
          role="group"
          aria-label="Stops along the way"
          className="relative flex justify-between gap-3"
          style={{ minWidth: `${nodes.length * 3.25}rem` }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") move(e, 1);
            if (e.key === "ArrowLeft") move(e, -1);
          }}
        >
          <span aria-hidden="true" className="absolute inset-x-5 top-1/2 h-[2px] -translate-y-1/2 bg-dw-ink" />
          {nodes.map((s, i) => (
            <button
              key={i}
              id={`${idPrefix}-stop-${i}`}
              type="button"
              aria-pressed={i === at}
              aria-label={`${i + 1} of ${nodes.length}: ${s.name} (${s.label})`}
              onClick={() => setAt(i)}
              className={`${stopBase} ${s.end ? "rounded-full" : ""} ${slow} ${i === at ? stopState.selected : `${stopState.rest} hover:bg-dw-sky hover:shadow-none`} active:translate-y-px active:bg-dw-lake active:shadow-[inset_0_2px_4px_rgba(34,51,58,.45)] ${focusRing}`}
            >
              <PlateIcon name={s.icon} size={28} />
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite" className="mt-2 min-h-28 border-t border-dw-ink/20 pt-3">
        <p className={`${t12} text-dw-muted`}>{at + 1} of {nodes.length} · {n.label}</p>
        <p className={`${t24} mt-1`}>{n.name}</p>
        {n.note && <p className={`${t14} mt-1 text-dw-muted`}>{n.note}</p>}
      </div>
    </div>
  );
}
