"use client";
// The two Dawn controls you can try on the board: tabs and a toggle.
import { useState } from "react";
import { T } from "./PlateArt";

const ui = "font-[family-name:var(--dw-ui)]";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#22333a]";
const ease = "cubic-bezier(.45,0,.2,1)";

/** Tabs: the chosen one gets a tint plate laid under it, a touch off register from its key rule. */
export function TintTabs({ tabs = ["Overview", "Route", "When to go"] }: { tabs?: string[] }) {
  const [at, setAt] = useState(0);
  return (
    <div role="tablist" aria-label="Trail sections" className="flex border-b border-[#22333a]">
      {tabs.map((t, i) => {
        const on = at === i;
        return (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => setAt(i)}
            className={`relative whitespace-nowrap px-2.5 pb-2 pt-2.5 text-sm ${ui} ${on ? "font-semibold text-[#22333a]" : "text-[#4f5f66] hover:text-[#22333a]"} ${focus}`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 top-1"
              style={{ background: T.celadon, transform: on ? "translate(3px, -3px)" : "translate(3px, 6px)", opacity: on ? 1 : 0, transition: `opacity 600ms ${ease}, transform 600ms ${ease}` }}
            />
            <span className="relative">{t}</span>
            <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[3px] bg-[#22333a]" style={{ transform: `scaleX(${on ? 1 : 0})`, transition: `transform 600ms ${ease}` }} />
          </button>
        );
      })}
    </div>
  );
}

/** Toggle: off, the track is a grey proof; on, the colour plates are laid in and the key disc slides across. */
export function ColourToggle({ label, initial = false }: { label: string; initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => setOn(!on)} className={`flex items-center gap-3 text-left ${focus}`}>
      <span className="relative block h-7 w-14 shrink-0 overflow-hidden border border-[#22333a]">
        <span className="absolute inset-0" style={{ background: "linear-gradient(180deg,#e1e5e4 0 45%,#b6bcbc 45% 100%)" }} />
        <span
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${T.aqua} 0 20%, ${T.celadon} 20% 45%, ${T.loch} 45% 100%)`, opacity: on ? 1 : 0, transition: `opacity 700ms ${ease}` }}
        />
        <span
          className="absolute top-[3px] h-5 w-5 rounded-full border border-[#22333a] bg-[#f6f9f7]"
          style={{ left: on ? "calc(100% - 23px)" : "3px", transition: `left 700ms ${ease}` }}
        />
      </span>
      <span className={`${ui} text-[15px] ${on ? "text-[#22333a]" : "text-[#4f5f66]"}`}>{label}</span>
    </button>
  );
}
