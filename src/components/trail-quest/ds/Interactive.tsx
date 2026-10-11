"use client";
// Trail Quest controls that hold state: tabs with counters, filter chips, toggle. Each also renders any single state for the grid.
import { useState } from "react";
import type { ControlState } from "@/lib/contrast";
import { Icon, type IconName } from "../Icons";
import { display, focusForced, focusRing, pop, snappy, ui } from "./tokens";

/* ---------- tabs ---------- */

const tabLook: Record<ControlState, string> = {
  rest: "bg-white text-[#1d2b53] shadow-[0_3px_0_#1d2b53]",
  hover: "-translate-y-0.5 bg-[#e6f8ff] text-[#1d2b53] shadow-[0_5px_0_#1d2b53]",
  focus: `bg-white text-[#1d2b53] shadow-[0_3px_0_#1d2b53] ${focusForced}`,
  pressed: "translate-y-[3px] bg-[#e6f8ff] text-[#1d2b53] shadow-none",
  selected: "-translate-y-1 bg-[#6741d9] text-white shadow-[0_5px_0_#1d2b53]",
  disabled: "cursor-not-allowed border-[#8e99b3] bg-[#d5dbe8] text-[#4a5a85] shadow-none",
};
const tabBase = `relative rounded-2xl border-[3px] border-[#1d2b53] px-3.5 py-2 ${ui} text-sm font-black ${snappy}`;

function Counter({ n, off }: { n: string; off?: boolean }) {
  return <span className={`absolute -right-2 -top-3 grid h-6 min-w-6 place-items-center rounded-full border-2 border-[#1d2b53] px-1 text-[11px] font-black ${off ? "bg-[#aab4c9] text-[#1d2b53]" : "bg-[#ffd23f] text-[#1d2b53]"}`}>{n}</span>;
}

export function TabSwatch({ force, label = "Day", n = "3" }: { force: ControlState; label?: string; n?: string }) {
  return (
    <span className={`${tabBase} inline-block ${tabLook[force]}`}>
      {label}
      <Counter n={n} off={force === "disabled"} />
    </span>
  );
}

/** Tabs: raised tiles with a coin counter; the chosen one pops up in grape. Arrow keys move between them. */
export function GameTabs({ tabs, panels }: { tabs: { label: string; n: string }[]; panels: React.ReactNode[] }) {
  const [at, setAt] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Trail groups" className="flex flex-wrap gap-3 pt-3">
        {tabs.map((t, i) => {
          const on = at === i;
          return (
            <button
              key={t.label}
              id={`tq-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`tq-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setAt(i)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const next = (at + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
                setAt(next);
                document.getElementById(`tq-tab-${next}`)?.focus();
              }}
              className={`${tabBase} ${pop} ${on ? tabLook.selected : `${tabLook.rest} hover:-translate-y-0.5 hover:bg-[#e6f8ff] hover:shadow-[0_5px_0_#1d2b53] active:translate-y-[3px] active:shadow-none`} ${focusRing}`}
            >
              {t.label}
              <Counter n={t.n} />
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`tq-panel-${at}`} aria-labelledby={`tq-tab-${at}`} className={`${ui} mt-4 rounded-2xl border-[3px] border-[#1d2b53] bg-white p-4 text-base font-bold text-[#1d2b53]`}>
        {panels[at]}
      </div>
    </div>
  );
}

/* ---------- chips ---------- */

const chipLook: Record<ControlState, string> = {
  rest: "bg-white text-[#1d2b53] shadow-[0_3px_0_#1d2b53]",
  hover: "-translate-y-0.5 bg-[#e6f8ff] text-[#1d2b53] shadow-[0_5px_0_#1d2b53]",
  focus: `bg-white text-[#1d2b53] shadow-[0_3px_0_#1d2b53] ${focusForced}`,
  pressed: "translate-y-[3px] scale-95 bg-[#e6f8ff] text-[#1d2b53] shadow-none",
  selected: "-translate-y-0.5 bg-[#6741d9] text-white shadow-[0_4px_0_#1d2b53]",
  disabled: "cursor-not-allowed border-[#8e99b3] bg-[#d5dbe8] text-[#4a5a85] shadow-none",
};
const chipBase = `relative inline-flex items-center gap-1.5 rounded-full border-[3px] border-[#1d2b53] py-1 pl-1.5 pr-3.5 ${ui} text-sm font-black ${snappy}`;

export function ChipSwatch({ force, label = "Huts", icon = "tent" }: { force: ControlState; label?: string; icon?: IconName }) {
  return (
    <span className={`${chipBase} ${chipLook[force]}`}>
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white"><Icon name={force === "disabled" ? "lock" : icon} size={20} /></span>
      {label}
    </span>
  );
}

/** Filter chips: round pills with an icon; chosen ones turn grape and pop up. */
export function GameChips({ options }: { options: { label: string; icon: IconName; on?: boolean }[] }) {
  const [on, setOn] = useState(options.filter((o) => o.on).map((o) => o.label));
  return (
    <div role="group" aria-label="Filter trails" className="flex flex-wrap gap-3">
      {options.map((o) => {
        const sel = on.includes(o.label);
        return (
          <button
            key={o.label}
            type="button"
            aria-pressed={sel}
            onClick={() => setOn((cur) => (sel ? cur.filter((x) => x !== o.label) : [...cur, o.label]))}
            className={`${chipBase} ${pop} ${sel ? chipLook.selected : `${chipLook.rest} hover:-translate-y-0.5 hover:bg-[#e6f8ff] hover:shadow-[0_5px_0_#1d2b53]`} active:translate-y-[3px] active:scale-95 active:shadow-none ${focusRing}`}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white"><Icon name={o.icon} size={20} /></span>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- toggle ---------- */

/** Toggle: a chunky pill; on, it turns grass and the knob springs across with a tick; off, grey with a cross. */
export function GameToggle({ label, initial = false, force }: { label: string; initial?: boolean; force?: ControlState }) {
  const [live, setLive] = useState(initial);
  const on = force ? force === "selected" : live;
  const off = force === "disabled";
  const track = off ? "border-[#8e99b3] bg-[#d5dbe8]" : on ? "bg-[#58d36b] shadow-[inset_0_-4px_0_#2f9e44]" : "bg-[#d5dbe8] shadow-[inset_0_-4px_0_#aab4c9]";
  const lift = force === "hover" ? "-translate-y-0.5" : force === "pressed" ? "translate-y-0.5" : "";
  const knob = force === "pressed" ? "scale-x-110 scale-y-90" : "";
  const body = (
    <span className={`tq-focus relative inline-block h-10 w-[72px] shrink-0 rounded-full border-[3px] border-[#1d2b53] ${snappy} ${track} ${lift} ${force === "focus" ? "is-focus" : ""} ${force ? "" : "group-hover:-translate-y-0.5 group-active:translate-y-0.5"}`}>
      <span
        className={`absolute top-0.5 grid h-7 w-7 place-items-center rounded-full border-[3px] border-[#1d2b53] bg-white ${display} text-sm ${pop} transition-[left,transform] duration-200 ${knob} ${on ? "text-[#1d2b53]" : "text-[#4a5a85]"} ${force ? "" : "group-active:scale-x-110 group-active:scale-y-90"}`}
        style={{ left: on ? "calc(100% - 30px)" : "2px" }}
      >
        {off ? <Icon name="lock" size={16} /> : on ? "✓" : "✕"}
      </span>
    </span>
  );
  const text = <span className={`${ui} whitespace-nowrap text-base font-black ${off || !on ? "text-[#4a5a85]" : "text-[#1d2b53]"}`}>{label}</span>;
  if (force) return <span className="flex items-center gap-3">{body}{text}</span>;
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => setLive(!live)} className="group flex items-center gap-3 text-left outline-none">
      {body}
      {text}
    </button>
  );
}
