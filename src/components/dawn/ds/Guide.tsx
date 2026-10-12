// Dawn pieces made for the guide: the route line, the month strip, plate buttons and the next-walk link.
// Every plate you can choose follows the card states in tokens.ts.
import Link from "next/link";
import type { ControlState } from "@/lib/contrast";
import type { Hike } from "@/data/hikes";
import type { Route, StopKind } from "@/data/stops";
import type { Level, Season } from "@/data/seasons";
import { TonedPhoto, type TrailPhoto } from "../Toned";
import { PlateIcon, type PlateIconName } from "../PlateArt";
import { card, cardLive, colourUp } from "./tokens";
import { MONTHS, monthRange } from "@/lib/months";
import { t12, t12caption, t14, t24 } from "./type";
import { plateLinkClass } from "./Primitives";

/** The icon that names each of a walk's three figures, wherever they appear. */
export const FACT_ICON = { distance: "boot", days: "calendar", high: "mountain" } as const satisfies Record<string, PlateIconName>;

/** Each kind of stop, its icon and the word printed above it. Towns, villages, ruins and shrines share the map. */
export const STOP: Record<StopKind, { icon: PlateIconName; label: string }> = {
  pass: { icon: "mountain", label: "Pass" },
  summit: { icon: "mountain", label: "Summit" },
  crater: { icon: "mountain", label: "Crater" },
  cables: { icon: "mountain", label: "Cables" },
  lake: { icon: "lake", label: "Lake" },
  glacier: { icon: "lake", label: "Glacier" },
  waterfall: { icon: "waterfall", label: "Waterfall" },
  bridge: { icon: "bridge", label: "Bridge" },
  hut: { icon: "hut", label: "Hut" },
  campsite: { icon: "tent", label: "Camp" },
  village: { icon: "map", label: "Village" },
  town: { icon: "map", label: "Town" },
  forest: { icon: "pine", label: "Forest" },
  viewpoint: { icon: "camera", label: "Viewpoint" },
  junction: { icon: "compass", label: "Junction" },
  ruin: { icon: "map", label: "Ruin" },
  shrine: { icon: "map", label: "Shrine" },
};

export type RouteNode = { icon: PlateIconName; label: string; name: string; note?: string; end: boolean };

/** The start, each stop with its icon, kind and day, then the finish (back at the start for round trips). */
export function routeNodes(h: Pick<Hike, "start" | "end" | "route">, route: Route): RouteNode[] {
  const back = h.route === "round trip";
  return [
    { icon: "boot", label: "Start", name: h.start, end: true },
    ...route.stops.map((s) => ({
      icon: STOP[s.kind].icon,
      label: [s.label ?? STOP[s.kind].label, s.day ? `Day ${s.day}` : "", s.turn ? "Turn back here" : ""].filter(Boolean).join(" · "),
      name: s.name,
      note: s.note,
      end: false,
    })),
    { icon: back ? "boot" : STOP[route.finish].icon, label: back ? "Back at the start" : "Finish", name: h.end, end: true },
  ];
}

/** A stop on the route map. Rest: the mount with a pine plate off register; hover: an sky plate in register;
 *  pressed: sinks; selected: a pine plate in register with a key rule beneath. Ends are round. */
export const stopBase = "relative grid h-10 w-10 shrink-0 place-items-center border-[1.5px] border-dw-ink";
export const stopState: Record<ControlState, string> = {
  rest: "bg-dw-mount shadow-[2px_2px_0_0_var(--color-dw-lake)]",
  hover: "bg-dw-sky shadow-none",
  focus: "bg-dw-mount shadow-[2px_2px_0_0_var(--color-dw-lake)] dw-crop is-focus",
  pressed: "translate-y-px bg-dw-lake shadow-[inset_0_2px_4px_rgba(34,51,58,.45)]",
  selected: "bg-dw-pine shadow-[inset_0_-3px_0_0_var(--color-dw-ink)]",
  disabled: "",
};

/** One stop in a forced state, for the state table. */
export function StopSwatch({ force }: { force: ControlState }) {
  return <span className={`${stopBase} ${stopState[force]}`}><PlateIcon name="mountain" size={28} /></span>;
}

/** Each month is a small plate. Best: the deepest tint, printed, with a key rule beneath. Possible: a pale wash.
 *  Closed or not advised: left unprinted, a dashed outline, the same mark as a disabled control. */
const LEVEL: Record<Level, { label: string; look: string }> = {
  best: { label: "Best", look: "border-dw-ink bg-dw-lake text-dw-ink shadow-[inset_0_-3px_0_0_var(--color-dw-ink)]" },
  possible: { label: "Possible", look: "border-dw-border bg-dw-sky text-dw-ink" },
  closed: { label: "Closed or not advised", look: "border-dashed border-dw-border bg-transparent text-dw-muted" },
};

/** One line on top (the best range and any closure), twelve plates, a legend, and the reasons behind "Why these
 *  months?". Twelve to a row where there is room, otherwise six. Not a control. */
export function SeasonStrip({ season }: { season: Season }) {
  const levels = MONTHS.map((m) => season.months[m] ?? "possible");
  const best = MONTHS.filter((_, i) => levels[i] === "best");
  const closed = season.notes.filter((n) => n.level === "closed");
  const used = (["best", "possible", "closed"] as const).filter((l) => levels.includes(l));
  return (
    <div className="@container">
      <p className={`${t14} font-semibold text-dw-ink`}>
        Best {monthRange(best)}
        {closed.map((n) => <span key={n.text} className="font-normal text-dw-muted"> · {n.short ?? "closed"} {monthRange(n.months)}</span>)}
      </p>
      <ol className="mt-3 grid max-w-xl grid-cols-6 gap-1.5 @min-[34rem]:grid-cols-12">
        {MONTHS.map((m, i) => (
          <li key={m} className={`${t12caption} grid h-10 place-items-center border-[1.5px] !tracking-[0.06em] ${LEVEL[levels[i]].look}`}>
            <span aria-hidden="true">{m}</span>
            <span className="sr-only">{m}: {LEVEL[levels[i]].label}</span>
          </li>
        ))}
      </ol>
      <ul aria-hidden="true" className={`${t14} mt-2 flex flex-wrap gap-x-4 gap-y-1 text-dw-muted`}>
        {used.map((l) => (
          <li key={l} className="flex items-center gap-1.5">
            <span className={`inline-block h-3 w-5 border-[1.5px] ${LEVEL[l].look}`} />
            {LEVEL[l].label}
          </li>
        ))}
      </ul>
      {season.notes.length > 0 && (
        <details className="mt-3">
          <summary className={`w-fit cursor-pointer ${plateLinkClass("note")}`}>Why these months?</summary>
          <ul className={`${t14} mt-2 space-y-1 text-dw-muted`}>
            {season.notes.map((n) => (
              <li key={n.text}><span className="font-semibold text-dw-ink">{monthRange(n.months)}</span> · {n.text}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

/** A small plate you can choose: opens the viewer, or (with `selected`) shows which plate the viewer is on. */
export function PlateThumb({ photo, n, selected, force, onClick, label }: { photo: TrailPhoto; n: number; selected?: boolean; force?: ControlState; onClick?: () => void; label?: string }) {
  const on = force ? force === "selected" : !!selected;
  const look = force ? card[force] : on ? card.selected : card.rest;
  const body = (
    <>
      <TonedPhoto photo={photo} sizes="200px" className={`aspect-[4/3] border-2 border-dw-ink ${force === "hover" ? "saturate-[1.25]" : colourUp}`} />
      <span className={`${t14} mt-1 block truncate ${on ? "font-semibold text-dw-ink" : "text-dw-muted group-hover:text-dw-ink"}`}>{n}. {photo.place}</span>
    </>
  );
  if (force) return <span className={`relative block p-1.5 ${look}`}>{body}</span>;
  return (
    <button type="button" onClick={onClick} aria-label={label} aria-pressed={selected} className={`group block w-full p-1.5 text-left ${look} ${cardLive}`}>
      {body}
    </button>
  );
}

/** The large print at the top of a walk's page: itself the button to every plate, tagged "N plates →". On a phone it runs edge to edge, no mount. */
export function HeroPlate({ photo, count, onOpen, label, priority = false }: { photo: TrailPhoto; count: number; onOpen?: () => void; label: string; priority?: boolean }) {
  return (
    <button type="button" onClick={onOpen} aria-label={label} className={`group block w-full text-left sm:p-3.5 ${card.rest} ${cardLive}`}>
      <TonedPhoto photo={photo} sizes="(min-width: 1024px) 660px, 100vw" priority={priority} className={`aspect-[3/2] sm:aspect-[4/3] sm:border-[3px] sm:border-dw-ink ${colourUp}`} />
      <span className={`${t12} absolute bottom-3 right-3 flex items-center gap-1.5 border sm:bottom-7 sm:right-7 border-dw-ink bg-dw-mount px-3 py-2 transition-colors duration-[600ms] group-hover:bg-dw-pine`}><PlateIcon name="camera" size={20} />{count} plates →</span>
    </button>
  );
}

/** The walk before or after this one: a small mounted print and its name. */
export function NeighbourLink({ href, label, name, photo }: { href: string; label: string; name: string; photo: TrailPhoto }) {
  const body = (
    <>
      <TonedPhoto photo={photo} sizes="120px" className={`aspect-[4/3] w-full shrink-0 border-2 border-dw-ink sm:w-28 ${colourUp}`} />
      <span className="min-w-0">
        <span className={`${t12} block text-dw-muted`}>{label}</span>
        <span className={`${t24} mt-1 block decoration-dw-lake decoration-2 underline-offset-4 group-hover:underline`}>{name}</span>
      </span>
    </>
  );
  const cls = `group flex flex-col items-start gap-2 p-2 sm:flex-row sm:items-center sm:gap-4 sm:p-3 ${card.rest} ${cardLive}`;
  return href.startsWith("/") ? <Link href={href} className={cls}>{body}</Link> : <a href={href} className={cls}>{body}</a>;
}
