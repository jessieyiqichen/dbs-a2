"use client";

import { useState } from "react";

const EASE = "cubic-bezier(.45,0,.2,1)";

/**
 * A switch with a dawn in it. Off: a crescent moon low on a night track. On: the sun climbs along an arc
 * to the other end while the night fades into a day track. Everything cross-fades over ~0.9s.
 */
export default function SunToggle({ initial = false, label }: { initial?: boolean; label: string }) {
  const [on, setOn] = useState(initial);
  const t = `all .9s ${EASE}`;
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => setOn(!on)} className="group flex items-center gap-3 rounded-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b4fc4]">
      <span className="relative inline-block h-9 w-[70px] overflow-hidden rounded-full border border-white/70 shadow-[inset_0_1px_4px_rgba(46,49,80,.3)]">
        <span className="absolute inset-0" style={{ background: "linear-gradient(180deg,#2e3150,#4a43a6)", opacity: on ? 0 : 1, transition: t }} />
        <span className="absolute inset-0" style={{ background: "linear-gradient(180deg,#b8cdee,#f6eef4 70%,#fff3cf)", opacity: on ? 1 : 0, transition: t }} />
        <span className="absolute right-4 top-2 h-[2px] w-[2px] rounded-full bg-white" style={{ opacity: on ? 0 : 0.9, transition: t }} />
        <span className="absolute right-7 top-5 h-[2px] w-[2px] rounded-full bg-white" style={{ opacity: on ? 0 : 0.7, transition: t }} />
        <span className="absolute inset-x-0 bottom-0 h-3 bg-white/35 blur-[2px]" />
        {/* the body travels along an arc: x eases linearly-ish, y lifts in the middle */}
        <span
          className="absolute top-[7px] h-5 w-5"
          style={{ left: on ? 42 : 6, transition: `left .9s ${EASE}`, animation: on ? `dw-arc-up .9s ${EASE}` : `dw-arc-down .9s ${EASE}` }}
        >
          <span className="absolute -inset-3 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,241,184,.95), transparent 70%)", opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(.4)", transition: t }} />
          <span className="absolute inset-0 rounded-full bg-[#fff1b8]" style={{ opacity: on ? 1 : 0, transition: t }} />
          <span className="absolute inset-0 rounded-full bg-[#e8e6f5]" style={{ opacity: on ? 0 : 1, boxShadow: "0 0 8px 2px rgba(207,196,230,.55)", transition: t }} />
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#3a3a8a]" style={{ opacity: on ? 0 : 1, transform: on ? "translate(6px,-6px)" : "none", transition: t }} />
        </span>
      </span>
      <span className="text-sm">{label}</span>
      <style>{`
        @keyframes dw-arc-up { 0% { transform: translateY(6px) } 50% { transform: translateY(-3px) } 100% { transform: translateY(0) } }
        @keyframes dw-arc-down { 0% { transform: translateY(0) } 50% { transform: translateY(5px) } 100% { transform: translateY(0) } }
        @media (prefers-reduced-motion: reduce) { [role="switch"] * { transition: none !important; animation: none !important } }
      `}</style>
    </button>
  );
}
