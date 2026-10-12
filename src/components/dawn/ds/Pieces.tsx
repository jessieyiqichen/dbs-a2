// Dawn: the card, catalogue rows, detail panel and UI states, filled with real trail data.
import Image from "next/image";
import type { ControlState } from "@/lib/contrast";
import { hikes, elevation, formatRange, type Hike } from "@/data/hikes";
import { PlateIcon } from "../PlateArt";
import { FACT_ICON } from "./Guide";
import Link from "next/link";
import { TonedPhoto, type TrailPhoto } from "../Toned";
import { PlateLink, PrimaryButton, SecondaryButton } from "./Primitives";
import { DW, caps, card, cardLiveHas, colourUp, display, focusForced, focusRing, slow, ui } from "./tokens";
import { t12caption, t14, t24 } from "./type";

const byId = (id: string) => hikes.find((h) => h.id === id) as Hike;
const no = (h: Hike) => `No. ${String(hikes.indexOf(h) + 1).padStart(2, "0")}`;
const PRINT = "/moodboards/dawn/clinton-river.jpg"; // a real photochrom of the Milford Track
const DEMO_PHOTO: TrailPhoto = { file: PRINT, kind: "photochrom", alt: "Photochrom print of the Clinton River, Milford Track", place: "Clinton River", author: "Photoglob Co.", date: "c. 1890–1900", license: "No known restrictions", source: "", w: 1024, h: 756, cover: true };

/** Printed caption, set the way the prints set theirs. */
export function Caption({ h }: { h: Hike }) {
  return <p className={`${t12caption} text-dw-ink`}>{no(h)}. {h.name}, {h.country.join(", ")}.</p>;
}

/** Card: a mounted print. The print and its caption are one link; `footer` (a small button) sits under it, outside
 *  the link. Hover lifts an sky plate and brings the colour up; press sinks the mount. */
export function PrintCard({ id, photo, href = "#card", footer, sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 120px" }: { id: string; photo: TrailPhoto; href?: string; footer?: React.ReactNode; sizes?: string }) {
  const h = byId(id);
  // On a phone the print sits beside its caption, so a screen shows several walks; from 640px it stands above it.
  const inner = (
    <>
      <TonedPhoto photo={photo} sizes={sizes} className={`row-span-3 aspect-[4/3] self-start border-2 border-dw-ink sm:border-[3px] ${colourUp}`} />
      <span className={`${t12caption} block text-dw-muted sm:mt-4`}>{no(h)}. {h.country.join(", ")}</span>
      <span id={`${h.id}-card`} className={`${t24} mt-1 block underline decoration-dw-lake decoration-2 underline-offset-[6px] ${slow} group-hover:decoration-dw-ink group-hover:underline-offset-[3px]`}>{h.name}</span>
      <span className={`${t14} mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-dw-muted`}>
        {/* each figure with its icon, kept whole when the line wraps */}
        {([[FACT_ICON.distance, `${formatRange(h.distance_km)} km`], [FACT_ICON.days, `${formatRange(h.days)} ${h.days[1] === 1 ? "day" : "days"}`], [FACT_ICON.high, elevation(h)]] as const).map(([icon, x]) => (
          <span key={icon} className="inline-flex items-center gap-1 whitespace-nowrap"><PlateIcon name={icon} size={20} />{x}</span>
        ))}
      </span>
    </>
  );
  const cls = `group relative grid grid-cols-[5rem_1fr] content-start gap-x-3 sm:block ${focusRing}`;
  return (
    <article aria-labelledby={`${h.id}-card`} className={`flex w-full flex-col p-2.5 sm:p-3.5 ${card.rest} ${cardLiveHas}`}>
      {href.startsWith("/") ? <Link href={href} className={cls}>{inner}</Link> : <a href={href} className={cls}>{inner}</a>}
      {footer && <div className="mt-auto pl-[5.75rem] pt-1.5 sm:pl-0 sm:pt-4">{footer}</div>}
    </article>
  );
}

/** A small card in a forced state, for the grid. Selected is what a chosen plate in the viewer looks like. */
export function CardSwatch({ force }: { force: ControlState }) {
  return (
    <span className={`relative flex items-center gap-2 p-1.5 ${card[force]}`}>
      <span className="relative block h-9 w-12 shrink-0 overflow-hidden border-2 border-dw-ink">
        <Image src={PRINT} alt="" fill sizes="48px" className={`object-cover ${force === "hover" ? "saturate-[1.25]" : ""}`} />
      </span>
      <span className={`${t14} leading-tight text-dw-ink ${force === "selected" ? "font-semibold" : ""}`}>Milford Track</span>
    </span>
  );
}

/* ---------- catalogue rows ---------- */

const rowState: Record<ControlState, string> = {
  rest: "",
  hover: "bg-dw-sky",
  focus: focusForced,
  pressed: "bg-dw-lake/60 shadow-[inset_0_2px_3px_rgba(34,51,58,.25)]",
  selected: "bg-dw-sun shadow-[inset_0_-3px_0_0_var(--color-dw-ink)]",
  disabled: "cursor-not-allowed text-dw-muted",
};

/** List row: a line of the print catalogue: number, name, a dotted leader, distance. `muted` greys a row that doesn't fit a choice but stays usable. */
export function CatalogueRow({ id, force, note, compact = false, href = "#rows", onClick, muted = false }: { id: string; force?: ControlState; note?: string; compact?: boolean; href?: string; onClick?: () => void; muted?: boolean }) {
  const h = byId(id);
  const state = force ?? "rest";
  const disabled = state === "disabled";
  const cls = `relative flex min-w-0 items-baseline border-b border-dw-ink/20 ${compact ? "gap-1.5 px-1.5" : "gap-3 px-3"} py-2.5 ${slow} ${rowState[state]} ${force ? "" : `hover:bg-dw-sky active:bg-dw-lake/60 active:shadow-[inset_0_2px_3px_rgba(34,51,58,.25)] ${focusRing}`}`;
  const body = (
    <>
      {!compact && <span className={`${display} w-14 shrink-0 text-sm text-dw-muted`}>{no(h)}</span>}
      <span className={`${display} ${compact ? "text-base" : "text-[17px]"} ${disabled ? "text-dw-muted line-through" : muted ? "italic text-dw-muted" : "text-dw-ink"}`}>{compact ? h.name.split(" ")[0] : h.name}</span>
      <span aria-hidden="true" className={`${compact ? "min-w-0" : "min-w-4"} flex-1 translate-y-[-3px] border-b border-dotted border-dw-ink/40`} />
      <span className={`${ui} whitespace-nowrap ${compact ? "text-xs" : "text-sm"} text-dw-muted`}>{note ?? `${formatRange(h.distance_km)} km`}</span>
    </>
  );
  // paths in the site move without a reload, so the visitor's list survives
  if (href.startsWith("/") && !disabled) return <Link href={href} onClick={onClick} className={cls}>{body}</Link>;
  return <a href={href} onClick={onClick} aria-disabled={disabled || undefined} className={cls}>{body}</a>;
}

/* ---------- detail panel ---------- */

/** Detail panel: the print, large, on its mount, with the catalogue facts beneath and one action. */
export function DetailPanel({ id }: { id: string }) {
  const h = byId(id);
  const facts: [string, string][] = [
    ["Route", `${h.start} to ${h.end}`],
    ["Distance", `${formatRange(h.distance_km)} km, ${h.route}`],
    ["High point", h.max_elev_m ? `${h.high_point}, ${elevation(h)}` : h.high_point],
    ["Best months", h.best_months.join(", ")],
  ];
  return (
    <div role="dialog" aria-modal="false" aria-labelledby="dw-detail-title" className="relative bg-dw-mount p-5 shadow-[6px_6px_0_0_var(--color-dw-lake)]">
      <span className="absolute right-4 top-4"><SecondaryButton small>Close</SecondaryButton></span>
      <Caption h={h} />
      <h3 id="dw-detail-title" className={`${display} mt-1 text-4xl leading-tight text-dw-ink`}>{h.name}</h3>
      <div className="relative mt-4 aspect-[16/9] overflow-hidden border-[3px] border-dw-ink">
        <Image src={PRINT} alt="Photochrom print of the Clinton River, Milford Track" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </div>
      <p className={`${ui} mt-1 text-xs text-dw-muted`}>Clinton River, the track&apos;s first valley · Photoglob Co., c. 1890–1900</p>
      <p className={`${ui} mt-3 text-base leading-relaxed text-dw-ink`}>{h.why}</p>
      <dl className={`${ui} mt-3 text-sm`}>
        {facts.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-dotted border-dw-ink/25 py-1.5">
            <dt className="text-dw-muted">{k}</dt>
            <dd className="text-dw-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <p className={`${display} mt-3 text-sm italic text-dw-muted`}>{h.permit_note}</p>
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
      <div className="flex min-h-44 flex-1 flex-col items-center justify-center gap-3 max-sm:[zoom:.72] sm:min-h-64 bg-dw-mount p-5 text-center">{children}</div>
      <figcaption className={`${caps} mt-2 text-dw-muted`}>{title}</figcaption>
    </figure>
  );
}

export function UIStates() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-4">
      <StateCard title="Empty">
        <span className="grid h-20 w-28 place-items-center border-[1.5px] border-dashed border-dw-muted"><PlateIcon name="camera" size={36} /></span>
        <p className={`${display} text-2xl text-dw-ink`}>No prints in this drawer</p>
        <p className={`${ui} text-sm text-dw-muted`}>No trail matches all four filters. Take one off to see more.</p>
        <SecondaryButton>Clear filters</SecondaryButton>
      </StateCard>
      <StateCard title="Loading">
        <div className="w-48">
          <TonedPhoto photo={DEMO_PHOTO} sizes="200px" force="loading" className="aspect-[4/3] border-[3px] border-dw-ink" />
          <p className={`${ui} mt-2 text-sm text-dw-muted`} role="status">Printing the colour, one plate at a time…</p>
        </div>
      </StateCard>
      <StateCard title="Error">
        <span className={`${display} grid h-12 w-12 place-items-center border-[1.5px] border-dw-ink bg-dw-heather text-2xl text-dw-ink shadow-[3px_3px_0_0_var(--color-dw-ink)]`}>!</span>
        <p className={`${display} text-2xl text-dw-ink`}>This print didn&apos;t come through</p>
        <p className={`${ui} text-sm text-dw-muted`}>The page didn&apos;t load. Check your connection and try again.</p>
        <SecondaryButton>Try again</SecondaryButton>
      </StateCard>
      <StateCard title="Success">
        <span className="grid h-12 w-12 place-items-center border-[1.5px] border-dw-ink bg-dw-lake">
          <svg viewBox="0 0 16 16" className="h-6 w-6" aria-hidden="true"><path d="M2.5 8.5 L6.5 12 L13.5 3.5" fill="none" stroke={DW.text} strokeWidth="2" strokeLinecap="square" /></svg>
        </span>
        <p className={`${display} text-2xl text-dw-ink`}>Added to your list</p>
        <p className={`${ui} text-sm text-dw-muted`}>Milford Track is on your list.</p>
      </StateCard>
    </div>
  );
}
