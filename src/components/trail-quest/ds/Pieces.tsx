// Trail Quest: the level card, level rows, dialog, progress and UI states, filled with real trail data.
import type { ControlState } from "@/lib/contrast";
import { hikes, formatRange, type Hike } from "@/data/hikes";
import { Icon } from "../Icons";
import { GameButton, GameLink } from "./Primitives";
import { display, focusForced, focusRing, snappy, ui } from "./tokens";

const byId = (id: string) => hikes.find((h) => h.id === id) as Hike;
const level = (h: Hike) => hikes.indexOf(h) + 1;
const BOOTS: Record<Hike["difficulty"], number> = { easy: 1, moderate: 2, challenging: 3, strenuous: 4 };

/** Difficulty counted in boots, out of four. */
export function Boots({ h, size = 22 }: { h: Hike; size?: number }) {
  const n = BOOTS[h.difficulty];
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${h.difficulty}: ${n} of 4 boots`}>
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className={i <= n ? "" : "opacity-30 grayscale"}><Icon name="boot" size={size} /></span>
      ))}
    </span>
  );
}

function Scene() {
  return (
    <svg viewBox="0 0 240 70" className="block h-auto w-full" aria-hidden="true">
      <rect width="240" height="70" fill="#4cc3ff" />
      <circle cx="40" cy="22" r="10" fill="#ffd23f" stroke="#1d2b53" strokeWidth="3" />
      <path d="M110 70 L160 16 L220 70 Z" fill="#8fa3d6" stroke="#1d2b53" strokeWidth="3" />
      <path d="M148 29 L160 16 L173 29 Z" fill="#fff" />
      <path d="M0 50 C 60 32, 120 60, 240 44 V70 H0 Z" fill="#58d36b" stroke="#1d2b53" strokeWidth="3" />
    </svg>
  );
}

const cardLook: Partial<Record<ControlState, string>> = {
  rest: "shadow-[0_6px_0_#1d2b53]",
  hover: "-translate-y-1 shadow-[0_10px_0_#1d2b53]",
  focus: `shadow-[0_6px_0_#1d2b53] ${focusForced}`,
  pressed: "translate-y-1 shadow-[0_2px_0_#1d2b53]",
};

/** Card: each trail is a level, with its number, a little scene, its stats and difficulty in boots. */
export function LevelCard({ id }: { id: string }) {
  const h = byId(id);
  return (
    <a href="#card" className={`relative block rounded-[22px] border-[3px] border-[#1d2b53] bg-white ${snappy} ${cardLook.rest} hover:-translate-y-1 hover:shadow-[0_10px_0_#1d2b53] active:translate-y-1 active:shadow-[0_2px_0_#1d2b53] ${focusRing}`}>
      <span className="block overflow-hidden rounded-t-[19px]"><Scene /></span>
      <span className="relative block p-4 pt-7">
        <span className={`${display} absolute -top-6 left-4 grid h-12 w-12 place-items-center rounded-2xl border-[3px] border-[#1d2b53] bg-[#6741d9] text-xl text-white shadow-[0_4px_0_#1d2b53]`}>{level(h)}</span>
        <span className="absolute right-4 top-3"><Boots h={h} /></span>
        <span className={`${display} block text-2xl leading-tight text-[#1d2b53]`}>{h.name}</span>
        <span className={`${ui} block text-sm font-extrabold text-[#4a5a85]`}>{h.country.join(" · ")} · {h.route}</span>
        <span className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["KM", formatRange(h.distance_km), "#4cc3ff"],
            ["DAYS", formatRange(h.days), "#58d36b"],
            ["TOP", `${formatRange(h.max_elev_m)} m`, "#ffd23f"],
          ].map(([k, v, c]) => (
            <span key={k} className="block rounded-xl border-[3px] border-[#1d2b53] p-1.5 text-center text-[#1d2b53] shadow-[0_3px_0_#1d2b53]" style={{ background: c }}>
              <span className={`${ui} block text-[10px] font-black tracking-widest`}>{k}</span>
              <span className={`${display} block text-base leading-tight`}>{v}</span>
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}

export function CardSwatch({ force }: { force: ControlState }) {
  return (
    <span className={`relative flex items-center gap-2 rounded-2xl border-[3px] border-[#1d2b53] bg-white p-1.5 pr-3 ${cardLook[force]}`}>
      <span className={`${display} grid h-8 w-8 place-items-center rounded-xl border-[3px] border-[#1d2b53] bg-[#6741d9] text-sm text-white`}>5</span>
      <span className={`${display} text-sm leading-tight text-[#1d2b53]`}>Milford</span>
    </span>
  );
}

/* ---------- level rows ---------- */

const rowLook: Record<ControlState, string> = {
  rest: "bg-white shadow-[0_4px_0_#1d2b53]",
  hover: "-translate-y-0.5 bg-[#e6f8ff] shadow-[0_6px_0_#1d2b53]",
  focus: `bg-white shadow-[0_4px_0_#1d2b53] ${focusForced}`,
  pressed: "translate-y-1 bg-[#e6f8ff] shadow-none",
  selected: "bg-[#6741d9] text-white shadow-[0_4px_0_#1d2b53]",
  disabled: "cursor-not-allowed border-[#8e99b3] bg-[#d5dbe8] text-[#4a5a85] shadow-none",
};

/** List row: a level in the list. Selected turns grape; locked rows show a lock and why. */
export function LevelRow({ id, force, note, compact = false }: { id: string; force?: ControlState; note?: string; compact?: boolean }) {
  const h = byId(id);
  const state = force ?? "rest";
  const sel = state === "selected";
  const off = state === "disabled";
  return (
    <a
      href="#rows"
      aria-disabled={off || undefined}
      className={`relative flex items-center gap-2.5 rounded-2xl border-[3px] border-[#1d2b53] ${compact ? "p-1.5 pr-2.5" : "p-2 pr-3"} ${snappy} ${rowLook[state]} ${force ? "" : `hover:-translate-y-0.5 hover:bg-[#e6f8ff] hover:shadow-[0_6px_0_#1d2b53] active:translate-y-1 active:shadow-none ${focusRing}`}`}
    >
      <span className={`${display} grid ${compact ? "h-7 w-7 text-sm" : "h-9 w-9 text-base"} shrink-0 place-items-center rounded-xl border-[3px] border-[#1d2b53] ${off ? "bg-[#aab4c9] text-[#1d2b53]" : sel ? "bg-[#ffd23f] text-[#1d2b53]" : "bg-[#6741d9] text-white"}`}>
        {off ? <Icon name="lock" size={18} /> : level(h)}
      </span>
      <span className={`${display} min-w-0 flex-1 truncate ${compact ? "text-sm" : "text-lg"} ${sel ? "text-white" : off ? "text-[#4a5a85]" : "text-[#1d2b53]"}`}>{compact ? h.name.split(" ")[0] : h.name}</span>
      {(!compact || note) && <span className={`${ui} shrink-0 whitespace-nowrap ${compact ? "text-xs" : "text-sm"} font-black ${sel ? "text-white" : "text-[#4a5a85]"}`}>{note ?? `${formatRange(h.distance_km)} km`}</span>}
    </a>
  );
}

/* ---------- dialog ---------- */

/** Detail panel: a game pop-up with a ribbon title, the level's stats and one big Play button. */
export function LevelDialog({ id }: { id: string }) {
  const h = byId(id);
  return (
    <div role="dialog" aria-modal="false" aria-labelledby="tq-dialog-title" className="relative rounded-[26px] border-[3px] border-[#1d2b53] bg-white p-5 pt-9 shadow-[0_8px_0_#1d2b53]">
      <span className={`${display} absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border-[3px] border-[#1d2b53] bg-[#6741d9] px-5 py-1.5 text-lg uppercase tracking-wide text-white shadow-[0_4px_0_#1d2b53]`}>
        Level {level(h)}
      </span>
      <button type="button" aria-label="Close" className={`absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-full border-[3px] border-[#1d2b53] bg-white shadow-[0_4px_0_#1d2b53] ${snappy} hover:-translate-y-0.5 hover:bg-[#e6f8ff] active:translate-y-1 active:shadow-none ${focusRing}`}>
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true"><path d="M4 4 L16 16 M16 4 L4 16" stroke="#1d2b53" strokeWidth="4" strokeLinecap="round" /></svg>
      </button>
      <h3 id="tq-dialog-title" className={`${display} text-center text-3xl leading-tight text-[#1d2b53]`}>{h.name}</h3>
      <div className="mt-1 flex justify-center"><Boots h={h} size={26} /></div>
      <p className={`${ui} mt-3 text-center text-base font-bold text-[#1d2b53]`}>{h.why}</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["KM", formatRange(h.distance_km), "#4cc3ff"],
          ["DAYS", formatRange(h.days), "#58d36b"],
          ["TOP", `${formatRange(h.max_elev_m)} m`, "#ffd23f"],
        ].map(([k, v, c]) => (
          <div key={k} className="rounded-2xl border-[3px] border-[#1d2b53] p-2 text-center text-[#1d2b53] shadow-[0_4px_0_#1d2b53]" style={{ background: c }}>
            <p className={`${ui} text-[10px] font-black tracking-widest`}>{k}</p>
            <p className={`${display} text-lg leading-tight`}>{v}</p>
          </div>
        ))}
      </div>
      <p className={`${ui} mt-4 flex items-start gap-2 rounded-2xl bg-[#e6f8ff] p-3 text-sm font-bold text-[#1d2b53]`}>
        <span className="shrink-0"><Icon name="ticket" size={24} /></span>
        {h.permit_note}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
        <GameButton size="lg">Add to my list</GameButton>
        <GameLink>Sources</GameLink>
      </div>
    </div>
  );
}

/* ---------- progress ---------- */

/** Progress: altitude as a striped XP bar, with the level in a sun coin. */
export function AltitudeBar({ id = "inca-trail", at = 0.75 }: { id?: string; at?: number }) {
  const h = byId(id);
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`${display} z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-[3px] border-[#1d2b53] bg-[#ffd23f] text-xl text-[#1d2b53] shadow-[0_4px_0_#1d2b53]`}>{level(h)}</span>
        <div className="-ml-4 h-8 flex-1 overflow-hidden rounded-full border-[3px] border-[#1d2b53] bg-[#d5dbe8]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(at * 100)} aria-label="Altitude climbed">
          <div className="tq-stripes relative h-full rounded-full border-r-[3px] border-[#1d2b53]" style={{ width: `${at * 100}%`, background: "repeating-linear-gradient(-45deg, #58d36b 0 10px, #7be48a 10px 14px)", backgroundSize: "28px 100%" }}>
            <span className="absolute inset-x-2 top-1 h-1.5 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
      <p className={`${ui} mt-2 flex justify-between text-xs font-black text-[#1d2b53]`}>
        <span>{h.name.split(" to ")[0]} · altitude</span>
        <span className="text-[#6741d9]">{formatRange(h.max_elev_m)} m top</span>
      </p>
    </div>
  );
}

/* ---------- UI states ---------- */

function StateCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="m-0 flex flex-col">
      <div className="flex min-h-64 flex-1 flex-col items-center justify-center gap-3 rounded-[22px] border-[3px] border-[#1d2b53] bg-white p-5 text-center shadow-[0_6px_0_#1d2b53]">{children}</div>
      <figcaption className={`${ui} mt-3 text-sm font-black uppercase tracking-widest text-[#1d2b53]`}>{title}</figcaption>
    </figure>
  );
}

export function UIStates() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StateCard title="Empty">
        <Icon name="chest" size={56} />
        <p className={`${display} text-2xl text-[#1d2b53]`}>No levels here yet</p>
        <p className={`${ui} text-sm font-bold text-[#4a5a85]`}>No trail matches all four filters. Take one off to unlock more.</p>
        <GameButton tone="grape">Clear filters</GameButton>
      </StateCard>
      <StateCard title="Loading">
        <div className="flex gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="tq-hop inline-block" style={{ animationDelay: `${i * 0.15}s` }}><Icon name="boot" size={34} /></span>
          ))}
        </div>
        <p className={`${display} text-2xl text-[#1d2b53]`} role="status">Loading the map…</p>
        <div className="h-5 w-40 overflow-hidden rounded-full border-[3px] border-[#1d2b53] bg-[#d5dbe8]">
          <div className="tq-stripes h-full w-2/3 rounded-full" style={{ background: "repeating-linear-gradient(-45deg, #4cc3ff 0 10px, #9ee3ff 10px 14px)", backgroundSize: "28px 100%" }} />
        </div>
      </StateCard>
      <StateCard title="Error">
        <Icon name="cloud" size={56} />
        <p className={`${display} text-2xl text-[#1d2b53]`}>Connection lost</p>
        <p className={`${ui} text-sm font-bold text-[#4a5a85]`}>The map didn&apos;t load. Check your connection and try again.</p>
        <GameButton tone="grape">Retry</GameButton>
      </StateCard>
      <StateCard title="Success">
        <span className="tq-pop inline-block"><Icon name="trophy" size={56} /></span>
        <p className={`${display} text-2xl text-[#1d2b53]`}>Added to your list!</p>
        <p className={`${ui} text-sm font-bold text-[#4a5a85]`}>Milford Track is waiting on your map.</p>
        <GameButton tone="sun">Nice</GameButton>
      </StateCard>
    </div>
  );
}

export const TQ_KEYFRAMES = `
@keyframes tq-shine-move { from { transform: translateX(-120%) skewX(-20deg) } to { transform: translateX(320%) skewX(-20deg) } }
.tq-shine-wrap:hover .tq-shine { animation: tq-shine-move .7s ease-out }
@keyframes tq-stripes-move { to { background-position: 28px 0 } }
.tq-stripes { animation: tq-stripes-move .8s linear infinite }
@keyframes tq-hop-up { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
.tq-hop { animation: tq-hop-up .9s ease-in-out infinite }
@keyframes tq-pop-in { 0% { transform: scale(.3) } 70% { transform: scale(1.2) } 100% { transform: scale(1) } }
.tq-pop { animation: tq-pop-in .6s cubic-bezier(.34,1.56,.64,1) both }
@media (prefers-reduced-motion: reduce) { .tq-shine-wrap:hover .tq-shine, .tq-stripes, .tq-hop, .tq-pop { animation: none } }
`;
