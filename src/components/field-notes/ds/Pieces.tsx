// Field Notes: the card, list rows, detail panel and UI states, filled with real trail data.
import type { ControlState } from "@/lib/contrast";
import { hikes, formatRange, type Hike } from "@/data/hikes";
import { FieldIcon, PermitStamp } from "../FieldArt";
import { PencilLoader } from "../FieldSketches";
import { PrimaryButton, SecondaryButton, NoteLink, PencilFrame } from "./Primitives";
import { FN, focusForced, focusRing, hand, serif } from "./tokens";

const byId = (id: string) => hikes.find((h) => h.id === id) as Hike;
const months = (h: Hike) => `${h.best_months[0]}–${h.best_months[h.best_months.length - 1]}`;

/** Tape label for a trail's difficulty. */
export function DifficultyTape({ h }: { h: Hike }) {
  const tint = h.difficulty === "moderate" ? "#cfdcc4" : h.difficulty === "challenging" ? "#e8dfc6" : "#c9d4e2";
  return (
    <span
      className={`inline-block -rotate-2 px-3 py-0.5 ${hand} text-lg text-[#3d3a34] drop-shadow-[0_1px_1px_rgba(60,45,20,.25)]`}
      style={{ background: tint, clipPath: "polygon(4px 0, calc(100% - 3px) 0, 100% 30%, calc(100% - 4px) 60%, 100% 100%, 3px 100%, 0 70%, 4px 40%)" }}
    >
      {h.difficulty}
    </span>
  );
}

/** Card: a page clipped into the notebook. Hover picks it up off the desk. */
export function TrailCard({ id, force }: { id: string; force?: ControlState }) {
  const h = byId(id);
  const lifted = force === "hover";
  return (
    <a
      href="#card"
      className={`group relative block bg-[#fbf7ec] p-5 shadow-[0_1px_2px_rgba(0,0,0,.12),0_8px_18px_rgba(60,45,20,.10)] transition duration-300 ease-out ${lifted ? "-translate-y-1 -rotate-[0.6deg] shadow-[0_2px_4px_rgba(0,0,0,.12),0_14px_26px_rgba(60,45,20,.16)]" : "hover:-translate-y-1 hover:-rotate-[0.6deg] hover:shadow-[0_2px_4px_rgba(0,0,0,.12),0_14px_26px_rgba(60,45,20,.16)]"} ${force === "focus" ? focusForced : focusRing}`}
    >
      <svg viewBox="0 0 30 60" className="absolute -top-4 right-6 h-12 w-6" fill="none" stroke="#8a8780" strokeWidth={2.5} aria-hidden="true">
        <path d="M8 40 V10 a7 7 0 0 1 14 0 V48 a10 10 0 0 1 -20 0 V16" />
      </svg>
      <div className="flex items-start gap-3">
        <FieldIcon name="mountain" size={40} />
        <div>
          <p className={`${serif} text-2xl font-semibold leading-tight text-[#3d3a34]`}>{h.name}</p>
          <p className={`${hand} text-xl text-[#625e56]`}>{h.country.join(", ")}</p>
        </div>
      </div>
      <p className={`${serif} mt-3 text-base leading-relaxed text-[#3d3a34]`}>{h.why}</p>
      <p className={`${hand} mt-3 text-xl text-[#3d3a34]`}>
        {formatRange(h.distance_km)} km · {formatRange(h.days)} days · {months(h)}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <DifficultyTape h={h} />
        <span className={`${serif} text-[#2f4a6b] underline decoration-[#2f4a6b]/40 underline-offset-4 group-hover:decoration-[#2f4a6b]`}>Read the notes →</span>
      </div>
    </a>
  );
}

/* ---------- list rows ---------- */

const rowState: Record<ControlState, string> = {
  rest: "",
  hover: "bg-[#6f8a5b]/15",
  focus: focusForced,
  pressed: "bg-[#6f8a5b]/25",
  selected: "border-l-2 border-l-[#2f4a6b] bg-[#2f4a6b]/[0.05]",
  disabled: "cursor-not-allowed text-[#625e56]",
};

/** List row: one ruled line of the notebook. Hover is a highlighter pass in moss; chosen rows are ticked in ink. */
export function TrailRow({ id, force, note, compact = false }: { id: string; force?: ControlState; note?: string; compact?: boolean }) {
  const h = byId(id);
  const state = force ?? "rest";
  const disabled = state === "disabled";
  return (
    <a
      href="#rows"
      aria-disabled={disabled || undefined}
      className={`grid items-center border-b ${compact ? "grid-cols-[1rem_1fr_auto] gap-2 px-1" : "grid-cols-[1.5rem_1fr_auto] gap-3"} border-[#c9d3df] ${compact ? "" : "px-2"} py-2.5 transition-colors duration-300 ${rowState[state]} ${force ? "" : `hover:bg-[#6f8a5b]/15 active:bg-[#6f8a5b]/25 ${focusRing}`}`}
    >
      <span aria-hidden="true">
        {state === "selected" && (
          <svg viewBox="0 0 24 24" className={compact ? "h-4 w-4" : "h-5 w-5"}>
            <path d="M4 13 l5 6 l11 -15" fill="none" stroke={FN.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" filter="url(#fn-rough)" />
          </svg>
        )}
      </span>
      <span>
        <span className={`${serif} ${compact ? "text-base" : "text-lg"} ${disabled ? "text-[#625e56]" : "text-[#3d3a34]"}`}>{compact ? h.name.split(" ")[0] : h.name}</span>
        {!compact && <span className={`${hand} ml-2 text-lg text-[#625e56]`}>{note ?? h.country.join(", ")}</span>}
      </span>
      <span className={`${serif} ${compact ? "text-sm" : "text-base"} whitespace-nowrap text-[#625e56]`}>{compact && note ? note : `${formatRange(h.distance_km)} km`}</span>
    </a>
  );
}

/* ---------- detail panel ---------- */

/** Detail panel: a page that opens over the list, with a close written by hand. */
export function DetailPanel({ id }: { id: string }) {
  const h = byId(id);
  const facts: [string, string][] = [
    ["Distance", `${formatRange(h.distance_km)} km, ${h.route}`],
    ["Days", formatRange(h.days)],
    ["High point", `${h.high_point}, ${formatRange(h.max_elev_m)} m`],
    ["Best months", h.best_months.join(", ")],
  ];
  return (
    <div role="dialog" aria-modal="false" aria-labelledby="fn-detail-title" className="relative bg-[#fbf7ec] p-6 shadow-[0_2px_4px_rgba(0,0,0,.12),0_18px_40px_rgba(60,45,20,.18)]">
      <button type="button" className={`absolute right-4 top-3 inline-flex items-center gap-1 ${hand} text-xl text-[#625e56] hover:text-[#3d3a34] ${focusRing}`}>
        close
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <path d="M4 5 C 8 9, 12 12, 16 16 M15 4 C 12 8, 8 12, 5 15.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" filter="url(#fn-rough)" />
        </svg>
      </button>
      <p className={`${hand} text-xl text-[#625e56]`}>{h.country.join(", ")} · {h.continent}</p>
      <h3 id="fn-detail-title" className={`${hand} text-4xl font-semibold leading-tight text-[#3d3a34]`}>{h.name}</h3>
      <p className={`${serif} mt-2 text-base leading-relaxed text-[#3d3a34]`}>{h.why}</p>
      <dl className="mt-4 border-t border-[#c9d3df]">
        {facts.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-[#c9d3df] py-1.5">
            <dt className={`${hand} text-lg text-[#625e56]`}>{k}</dt>
            <dd className={`${serif} text-base text-[#3d3a34]`}>{v}</dd>
          </div>
        ))}
      </dl>
      <p className={`${serif} mt-3 text-sm italic text-[#625e56]`}>{h.permit_note}</p>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <PrimaryButton>Open the trail</PrimaryButton>
        <NoteLink>Sources</NoteLink>
      </div>
    </div>
  );
}

/* ---------- UI states ---------- */

function StateCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="m-0 flex flex-col">
      <div className="relative flex min-h-64 flex-1 flex-col items-center justify-center gap-3 bg-[#fbf7ec] p-5 text-center" style={{ backgroundImage: "repeating-linear-gradient(#fbf7ec 0 27px, #dfe5ec 27px 28px)" }}>
        {children}
      </div>
      <figcaption className={`${hand} mt-2 text-xl text-[#625e56]`}>{title}</figcaption>
    </figure>
  );
}

function CircledMark({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-grid h-12 w-12 place-items-center">
      <svg viewBox="0 0 40 40" className="absolute inset-0" aria-hidden="true">
        <path d="M20 4 C 31 3, 37 12, 36 21 C 35 31, 27 37, 18 36 C 8 35, 3 27, 5 17 C 7 9, 14 4, 24 5" fill="none" stroke={FN.ink} strokeWidth="2" strokeLinecap="round" filter="url(#fn-rough)" />
      </svg>
      <span className={`${hand} relative text-3xl text-[#2f4a6b]`}>{children}</span>
    </span>
  );
}

export function UIStates() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StateCard title="Empty">
        <FieldIcon name="map" size={44} />
        <p className={`${hand} text-3xl text-[#3d3a34]`}>Nothing on this page yet</p>
        <p className={`${serif} text-base text-[#625e56]`}>No trail matches all four filters. Try taking one off.</p>
        <SecondaryButton>Clear filters</SecondaryButton>
      </StateCard>
      <StateCard title="Loading">
        <div className="w-44" role="status">
          <PencilLoader />
        </div>
      </StateCard>
      <StateCard title="Error">
        <CircledMark>!</CircledMark>
        <p className={`${hand} text-3xl text-[#3d3a34]`}>Couldn&apos;t open these notes</p>
        <p className={`${serif} text-base text-[#625e56]`}>The page didn&apos;t load. Check your connection and try again.</p>
        <SecondaryButton>Try again</SecondaryButton>
      </StateCard>
      <StateCard title="Success">
        <svg viewBox="0 0 120 70" className="h-16 w-28 -rotate-6" role="img" aria-label="Stamped: saved">
          <rect x="4" y="6" width="112" height="58" rx="3" fill="none" stroke={FN.accent} strokeWidth="3" filter="url(#fn-rough)" />
          <text x="60" y="46" textAnchor="middle" fontSize="28" fontWeight="600" fill={FN.accent} fontFamily="var(--fn-serif)" letterSpacing="4">SAVED</text>
        </svg>
        <p className={`${hand} text-3xl text-[#3d3a34]`}>Added to your list</p>
        <p className={`${serif} text-base text-[#625e56]`}>Laugavegur Trail is on your list.</p>
      </StateCard>
    </div>
  );
}

export { PermitStamp, PencilFrame };
