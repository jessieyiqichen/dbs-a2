"use client";
// Field Notes controls that hold state: index tabs, tape chips, the wash toggle.
import { useState } from "react";
import type { ControlState } from "@/lib/contrast";
import { FN, focusForced, focusInside, focusRing, hand } from "./tokens";

/* ---------- index tabs ---------- */

const tabBase = `relative -mb-px rounded-t-[3px] border border-b-0 px-4 pb-2 pt-1.5 ${hand} text-xl transition duration-300 ease-out`;
const tabState: Record<ControlState, string> = {
  rest: "translate-y-1 border-[#7d776b]/60 bg-[#e9dcc0] text-[#625e56]",
  hover: "translate-y-0.5 border-[#7d776b] bg-[#efe4cb] text-[#3d3a34]",
  focus: "fn-scrib fn-inside is-focus translate-y-1 border-[#7d776b]/60 bg-[#e9dcc0] text-[#625e56]",
  pressed: "translate-y-1.5 border-[#7d776b] bg-[#dccaa3] text-[#3d3a34] shadow-[inset_0_2px_3px_rgba(60,45,20,.3)]",
  selected: "z-10 translate-y-0 border-[#7d776b] bg-[#fbf7ec] text-[#3d3a34]",
  disabled: "translate-y-1 cursor-not-allowed border-dashed border-[#7d776b]/60 bg-transparent text-[#625e56] line-through decoration-1",
};

/** A single tab in a forced state, for the state grid. */
export function TabSwatch({ force, label = "Route" }: { force: ControlState; label?: string }) {
  return (
    <span className="inline-flex border-b border-[#7d776b] pl-1">
      <span className={`${tabBase} ${tabState[force]}`}>{label}</span>
    </span>
  );
}

/** Index tabs on the notebook's edge; the chosen one comes to the front and joins the page. */
export function IndexTabs({ tabs, panels }: { tabs: string[]; panels: React.ReactNode[] }) {
  const [at, setAt] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Trail notes" className="flex gap-1 pl-2">
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`fn-tab-${i}`}
            aria-selected={at === i}
            aria-controls={`fn-panel-${i}`}
            tabIndex={at === i ? 0 : -1}
            onClick={() => setAt(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const next = (at + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
                setAt(next);
                document.getElementById(`fn-tab-${next}`)?.focus();
              }
            }}
            className={`${tabBase} ${at === i ? tabState.selected : `${tabState.rest} hover:translate-y-0.5 hover:bg-[#efe4cb] hover:text-[#3d3a34] active:translate-y-1.5 active:bg-[#dccaa3]`} ${focusInside}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`fn-panel-${at}`}
        aria-labelledby={`fn-tab-${at}`}
        className="relative min-h-24 border border-[#7d776b] bg-[#fbf7ec] px-4 pb-3 pt-[3px]"
        style={{ backgroundImage: "repeating-linear-gradient(#fbf7ec 0 27px, #c9d3df 27px 28px)" }}
      >
        {panels[at]}
      </div>
    </div>
  );
}

/* ---------- tape chips ---------- */

const torn = "polygon(4px 0, calc(100% - 3px) 0, 100% 18%, calc(100% - 4px) 36%, 100% 55%, calc(100% - 3px) 78%, 100% 100%, 3px 100%, 0 82%, 4px 62%, 0 44%, 3px 24%)";
const chipBase = `inline-block px-4 py-1 ${hand} text-xl transition duration-300 ease-out`;
const chipState: Record<ControlState, string> = {
  rest: "bg-[#e9dcc0]/60 text-[#625e56]",
  hover: "-translate-y-0.5 bg-[#e9dcc0] text-[#3d3a34]",
  focus: "bg-[#e9dcc0]/60 text-[#625e56]",
  pressed: "translate-y-0.5 bg-[#d4bf93] text-[#3d3a34]",
  selected: "-rotate-2 bg-[#cfdcc4] text-[#3d3a34]",
  disabled: "cursor-not-allowed bg-transparent text-[#625e56] line-through decoration-1",
};

function Tape({ state, children }: { state: ControlState; children: React.ReactNode }) {
  return (
    <span className={`${chipBase} ${chipState[state]}`} style={{ clipPath: torn, backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.18) 0 2px, transparent 2px 7px)" }}>
      {children}
    </span>
  );
}

export function ChipSwatch({ force, label = "huts" }: { force: ControlState; label?: string }) {
  const wrap = force === "focus" ? `${focusForced} relative` : "";
  const edge = force === "disabled" ? "outline-1 outline-dashed outline-[#7d776b]" : force === "pressed" ? "" : force === "hover" ? "drop-shadow-[0_4px_4px_rgba(60,45,20,.3)]" : "drop-shadow-[0_1px_1px_rgba(60,45,20,.25)]";
  return (
    <span className={`inline-block ${wrap} ${edge}`}>
      <Tape state={force}>{label}</Tape>
    </span>
  );
}

/** Filter chips: strips of tape. Chosen ones are stuck down in moss, a little crooked. */
export function TapeChips({ options, initial }: { options: string[]; initial: string[] }) {
  const [on, setOn] = useState<string[]>(initial);
  const flip = (o: string) => setOn((cur) => (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]));
  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filter trails">
      {options.map((o) => {
        const sel = on.includes(o);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={sel}
            onClick={() => flip(o)}
            className={`group relative drop-shadow-[0_1px_1px_rgba(60,45,20,.25)] transition hover:-translate-y-0.5 hover:drop-shadow-[0_4px_4px_rgba(60,45,20,.3)] active:translate-y-0.5 active:drop-shadow-none ${focusRing}`}
          >
            <span className={`${chipBase} ${sel ? chipState.selected : `${chipState.rest} group-hover:bg-[#e9dcc0] group-hover:text-[#3d3a34] group-active:bg-[#d4bf93]`}`} style={{ clipPath: torn, backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.18) 0 2px, transparent 2px 7px)" }}>
              {o}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- toggle ---------- */

/** Toggle: a pencilled pill; on, moss watercolour bleeds into it and the knob moves across.
 *  `force` draws one state for the grid: hover darkens the pencil, pressed squashes the knob, selected is on. */
export function WashSwitch({ label, initial = false, disabled = false, force }: { label: string; initial?: boolean; disabled?: boolean; force?: ControlState }) {
  const [live, setLive] = useState(initial);
  const on = force ? force === "selected" : live;
  const off = force === "disabled" || disabled;
  const cx = on ? 46 : 18;
  const knob = force === "pressed" ? "scale(1.15, .85)" : "scale(1)";
  const svg = (
    <span className={`relative shrink-0 ${force === "focus" ? focusForced : force ? "" : "fn-scrib"}`}>
    <svg viewBox="0 0 64 34" className="block h-9 w-[68px] overflow-visible" aria-hidden="true">
      <path d="M9 15 C 10 7, 30 7.5, 46 7 C 60 7.5, 60 26, 46 27 C 30 28, 13 28.5, 9.5 22 Z" fill={FN.wash} filter="url(#fn-wash)" style={{ opacity: on ? 0.55 : force === "pressed" ? 0.2 : 0, transition: "opacity 300ms ease-out" }} />
      <g style={{ transform: `translateX(${cx - 18}px)`, transition: "transform 300ms ease-out" }}>
        <g style={{ transform: knob, transformOrigin: "18px 17px", transformBox: "view-box", transition: "transform 150ms ease-out" }} className={force ? "" : "group-active:[transform:scale(1.15,.85)]"}>
          <circle cx="18" cy="17" r="8" fill="#fbf7ec" />
          <circle cx="19.5" cy="18.5" r="7" fill="url(#fn-hatch)" opacity=".55" />
          <path d="M12 10.5 C 18 7, 27 10, 27 17 C 27 24, 20 27, 14 25.5 C 8 23.5, 7 14, 14 10 C 16 9, 19 9, 20 9.5" fill="none" stroke="#55524b" strokeWidth="1.5" strokeLinecap="round" filter="url(#fn-pencil)" />
        </g>
      </g>
      <path
        d="M17 5 C 30 3.5, 44 4, 50 5 C 61 6.5, 62 27, 48 29.5 C 36 31, 24 30.5, 15 29 C 2 27, 3 7, 18 5.2 C 23 4.6, 27 4.4, 31 4.6"
        fill="none"
        stroke={force === "hover" ? "#3d3a34" : "#55524b"}
        strokeWidth={force === "hover" ? 2.2 : 1.5}
        strokeLinecap="round"
        strokeDasharray={off ? "4 4" : undefined}
        filter="url(#fn-pencil)"
        className={force ? "" : "transition-[stroke-width] duration-300 group-hover:[stroke-width:2.2]"}
      />
    </svg>
    </span>
  );
  const text = <span className={`${hand} whitespace-nowrap text-2xl ${off ? "text-[#625e56] line-through decoration-1" : on ? "text-[#3d3a34]" : "text-[#625e56]"}`}>{label}</span>;
  if (force) {
    return <span className="flex items-center gap-3">{svg}{text}</span>;
  }
  return (
    <button type="button" role="switch" aria-checked={on} disabled={off} onClick={() => setLive(!live)} className="group flex items-center gap-3 text-left outline-none disabled:cursor-not-allowed">
      {svg}
      {text}
    </button>
  );
}
