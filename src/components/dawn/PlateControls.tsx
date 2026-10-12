"use client";
// The two Dawn controls you can try on the board: tabs and a toggle.
import { useState } from "react";
import { T } from "./PlateArt";

const ui = "font-[family-name:var(--dw-ui)]";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-dw-ink";
const ease = "cubic-bezier(.45,0,.2,1)";

/** Tabs: the chosen one gets a tint plate laid under it, a touch off register from its key rule. */
export function TintTabs({ tabs = ["Overview", "Route", "When to go"] }: { tabs?: string[] }) {
  const [at, setAt] = useState(0);
  return (
    <div role="tablist" aria-label="Trail sections" className="flex border-b border-dw-ink">
      {tabs.map((t, i) => {
        const on = at === i;
        return (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => setAt(i)}
            className={`relative whitespace-nowrap px-2.5 pb-2 pt-2.5 text-sm ${ui} ${on ? "font-semibold text-dw-ink" : "text-dw-muted hover:text-dw-ink"} ${focus}`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 top-1"
              style={{ background: T.pine, transform: on ? "translate(3px, -3px)" : "translate(3px, 6px)", opacity: on ? 1 : 0, transition: `opacity 600ms ${ease}, transform 600ms ${ease}` }}
            />
            <span className="relative">{t}</span>
            <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[3px] bg-dw-ink" style={{ transform: `scaleX(${on ? 1 : 0})`, transition: `transform 600ms ${ease}` }} />
          </button>
        );
      })}
    </div>
  );
}

/** Toggle: square, like everything printed. Off, the knob's loch plate sits off register on a blank track;
 *  on, the plate locks into register and the track is printed in loch. Same rule as the buttons: in register means active. */
export function ColourToggle({ label, initial = false }: { label: string; initial?: boolean }) {
  const [on, setOn] = useState(initial);
  const move = `left 600ms ${ease}, box-shadow 600ms ${ease}, background-color 600ms ${ease}`;
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => setOn(!on)} className={`group flex items-center gap-3 text-left ${focus}`}>
      <span
        className="relative block h-[26px] w-[50px] shrink-0 border-[1.5px] border-dw-ink"
        style={{ background: on ? T.lake : "var(--color-dw-mount)", transition: move }}
      >
        <span
          className="absolute top-[3px] h-[17px] w-[17px] border-[1.5px] border-dw-ink bg-dw-mount"
          style={{ left: on ? "calc(100% - 20px)" : "3px", boxShadow: on ? `0 0 0 0 ${T.lake}` : `3px 3px 0 0 ${T.lake}`, transition: move }}
        />
      </span>
      <span className={`${ui} text-[15px] ${on ? "text-dw-ink" : "text-dw-muted"}`}>{label}</span>
    </button>
  );
}
