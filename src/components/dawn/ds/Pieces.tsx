// Dawn: the card, catalogue rows, detail panel and UI states, filled with real trail data.
import Image from "next/image";
import type { ControlState } from "@/lib/contrast";
import { hikes, formatRange, type Hike } from "@/data/hikes";
import { PlateIcon } from "../PlateArt";
import { PrintingLoader } from "../PlateUI";
import { PlateLink, PrimaryButton, SecondaryButton } from "./Primitives";
import { DW, caps, display, focusForced, focusRing, slow, ui } from "./tokens";

const byId = (id: string) => hikes.find((h) => h.id === id) as Hike;
const no = (h: Hike) => `No. ${String(hikes.indexOf(h) + 1).padStart(2, "0")}`;
const PRINT = "/moodboards/dawn/clinton-river.jpg"; // a real photochrom of the Milford Track

/** Printed caption, set the way the prints set theirs. */
export function Caption({ h }: { h: Hike }) {
  return <p className={`${display} text-[13px] uppercase tracking-[0.12em] text-[#22333a]`}>{no(h)}. {h.name}, {h.country.join(", ")}.</p>;
}

/** Card: a mounted print. Hover brings the colour up; press sinks the mount. */
export function PrintCard({ id, photo, plateNote }: { id: string; photo: string; plateNote: string }) {
  const h = byId(id);
  return (
    <a href="#card" className={`group relative block bg-[#f6f9f7] p-3.5 shadow-[0_1px_0_rgba(34,51,58,.15)] ${slow} hover:shadow-[4px_4px_0_0_#c9dcdc] active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(34,51,58,.2)] ${focusRing}`}>
      <span className="relative block aspect-[4/3] overflow-hidden border-[3px] border-[#22333a]">
        <Image src={photo} alt={`Photochrom print: ${h.name}`} fill sizes="(min-width: 1024px) 40vw, 100vw" className={`object-cover ${slow} group-hover:saturate-[1.2]`} />
      </span>
      <span className="mt-3 block"><Caption h={h} /></span>
      <span className={`${ui} block text-xs text-[#4f5f66]`}>{plateNote}</span>
      <span className={`${ui} mt-3 block border-t border-[#22333a]/20 text-sm text-[#22333a]`}>
        {[
          ["Distance", `${formatRange(h.distance_km)} km, ${h.route}`],
          ["Days", formatRange(h.days)],
          ["High point", `${formatRange(h.max_elev_m)} m`],
        ].map(([k, v]) => (
          <span key={k} className="flex items-baseline justify-between gap-3 border-b border-dotted border-[#22333a]/25 py-1.5">
            <span className="text-[#4f5f66]">{k}</span>
            <span className={`${display} text-base`}>{v}</span>
          </span>
        ))}
      </span>
    </a>
  );
}

/** A small card in a forced state, for the grid. */
export function CardSwatch({ force }: { force: ControlState }) {
  const look: Partial<Record<ControlState, string>> = {
    rest: "shadow-[0_1px_0_rgba(34,51,58,.15)]",
    hover: "shadow-[4px_4px_0_0_#c9dcdc]",
    focus: `shadow-[0_1px_0_rgba(34,51,58,.15)] ${focusForced}`,
    pressed: "translate-y-px shadow-[inset_0_2px_4px_rgba(34,51,58,.2)]",
  };
  return (
    <span className={`relative flex items-center gap-2 bg-[#f6f9f7] p-1.5 ${look[force]}`}>
      <span className="relative block h-9 w-12 shrink-0 overflow-hidden border-2 border-[#22333a]">
        <Image src={PRINT} alt="" fill sizes="48px" className={`object-cover ${force === "hover" ? "saturate-[1.2]" : ""}`} />
      </span>
      <span className={`${display} text-sm leading-tight text-[#22333a]`}>Milford Track</span>
    </span>
  );
}

/* ---------- catalogue rows ---------- */

const rowState: Record<ControlState, string> = {
  rest: "",
  hover: "bg-[#c9dcdc]",
  focus: focusForced,
  pressed: "bg-[#8eaaa6]/60 shadow-[inset_0_2px_3px_rgba(34,51,58,.25)]",
  selected: "bg-[#c3d6c4] shadow-[inset_3px_0_0_0_#22333a]",
  disabled: "cursor-not-allowed text-[#4f5f66]",
};

/** List row: a line of the print catalogue: number, name, a dotted leader, distance. */
export function CatalogueRow({ id, force, note, compact = false }: { id: string; force?: ControlState; note?: string; compact?: boolean }) {
  const h = byId(id);
  const state = force ?? "rest";
  const disabled = state === "disabled";
  return (
    <a
      href="#rows"
      aria-disabled={disabled || undefined}
      className={`relative flex items-baseline gap-3 border-b border-[#22333a]/20 ${compact ? "px-1.5" : "px-3"} py-2.5 ${slow} ${rowState[state]} ${force ? "" : `hover:bg-[#c9dcdc] active:bg-[#8eaaa6]/60 active:shadow-[inset_0_2px_3px_rgba(34,51,58,.25)] ${focusRing}`}`}
    >
      {!compact && <span className={`${display} w-14 shrink-0 text-sm text-[#4f5f66]`}>{no(h)}</span>}
      <span className={`${display} ${compact ? "text-base" : "text-lg"} ${disabled ? "text-[#4f5f66] line-through" : "text-[#22333a]"}`}>{compact ? h.name.split(" ")[0] : h.name}</span>
      <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-[#22333a]/40" />
      <span className={`${ui} whitespace-nowrap ${compact ? "text-xs" : "text-sm"} text-[#4f5f66]`}>{note ?? `${formatRange(h.distance_km)} km`}</span>
    </a>
  );
}

/* ---------- detail panel ---------- */

/** Detail panel: the print, large, on its mount, with the catalogue facts beneath and one action. */
export function DetailPanel({ id }: { id: string }) {
  const h = byId(id);
  const facts: [string, string][] = [
    ["Route", `${h.start} to ${h.end}`],
    ["Distance", `${formatRange(h.distance_km)} km, ${h.route}`],
    ["High point", `${h.high_point}, ${formatRange(h.max_elev_m)} m`],
    ["Best months", h.best_months.join(", ")],
  ];
  return (
    <div role="dialog" aria-modal="false" aria-labelledby="dw-detail-title" className="relative bg-[#f6f9f7] p-5 shadow-[6px_6px_0_0_#c9dcdc]">
      <button type="button" className={`${caps} absolute right-4 top-4 border-b border-[#22333a]/40 pb-0.5 text-[#22333a] hover:border-[#22333a] active:translate-y-px ${focusRing}`}>
        Close
      </button>
      <Caption h={h} />
      <h3 id="dw-detail-title" className={`${display} mt-1 text-4xl leading-tight text-[#22333a]`}>{h.name}</h3>
      <div className="relative mt-4 aspect-[16/9] overflow-hidden border-[3px] border-[#22333a]">
        <Image src={PRINT} alt="Photochrom print of the Clinton River, Milford Track" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </div>
      <p className={`${ui} mt-1 text-xs text-[#4f5f66]`}>Clinton River, the track&apos;s first valley · Photoglob Co., c. 1890–1900</p>
      <p className={`${ui} mt-3 text-base leading-relaxed text-[#22333a]`}>{h.why}</p>
      <dl className={`${ui} mt-3 text-sm`}>
        {facts.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-dotted border-[#22333a]/25 py-1.5">
            <dt className="text-[#4f5f66]">{k}</dt>
            <dd className="text-[#22333a]">{v}</dd>
          </div>
        ))}
      </dl>
      <p className={`${display} mt-3 text-sm italic text-[#4f5f66]`}>{h.permit_note}</p>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <PrimaryButton>Add to my list</PrimaryButton>
        <PlateLink>Sources</PlateLink>
      </div>
    </div>
  );
}

/* ---------- UI states ---------- */

function StateCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="m-0 flex flex-col">
      <div className="flex min-h-64 flex-1 flex-col items-center justify-center gap-3 bg-[#f6f9f7] p-5 text-center">{children}</div>
      <figcaption className={`${caps} mt-2 text-[#4f5f66]`}>{title}</figcaption>
    </figure>
  );
}

export function UIStates() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StateCard title="Empty">
        <span className="grid h-20 w-28 place-items-center border-[1.5px] border-dashed border-[#4f5f66]"><PlateIcon name="camera" size={36} /></span>
        <p className={`${display} text-2xl text-[#22333a]`}>No prints in this drawer</p>
        <p className={`${ui} text-sm text-[#4f5f66]`}>No trail matches all four filters. Take one off to see more.</p>
        <SecondaryButton>Clear filters</SecondaryButton>
      </StateCard>
      <StateCard title="Loading">
        <div className="w-48"><PrintingLoader photo="/moodboards/dawn/te-anau-south-fjord.jpg" /></div>
      </StateCard>
      <StateCard title="Error">
        <span className={`${display} grid h-12 w-12 place-items-center border-[1.5px] border-[#22333a] bg-[#a7b4b1] text-2xl text-[#22333a] shadow-[3px_3px_0_0_#22333a]`}>!</span>
        <p className={`${display} text-2xl text-[#22333a]`}>This print didn&apos;t come through</p>
        <p className={`${ui} text-sm text-[#4f5f66]`}>The page didn&apos;t load. Check your connection and try again.</p>
        <SecondaryButton>Try again</SecondaryButton>
      </StateCard>
      <StateCard title="Success">
        <span className="grid h-12 w-12 place-items-center border-[1.5px] border-[#22333a] bg-[#8eaaa6]">
          <svg viewBox="0 0 16 16" className="h-6 w-6" aria-hidden="true"><path d="M2.5 8.5 L6.5 12 L13.5 3.5" fill="none" stroke={DW.text} strokeWidth="2" strokeLinecap="square" /></svg>
        </span>
        <p className={`${display} text-2xl text-[#22333a]`}>Added to your list</p>
        <p className={`${ui} text-sm text-[#4f5f66]`}>Milford Track is on your list.</p>
      </StateCard>
    </div>
  );
}
