// Dawn pieces made for the guide: the route line, the month strip, plate buttons and the next-walk link.
// Every plate you can choose follows the card states in tokens.ts.
import Link from "next/link";
import type { ControlState } from "@/lib/contrast";
import type { Hike } from "@/data/hikes";
import type { Sourced } from "@/data/intros";
import { TonedPhoto, type TrailPhoto } from "../Toned";
import { card, cardLive, colourUp } from "./tokens";
import { t12, t12caption, t14, t17, t24 } from "./type";

/** Along the way, drawn as a route rather than written as a list: start, three stops, finish, on one key line. */
export function RouteLine({ h, stops }: { h: Pick<Hike, "start" | "end">; stops: Pick<Sourced, "text">[] }) {
  const nodes = [
    { mark: "S", label: h.start, end: true },
    ...stops.map((s, i) => ({ mark: String(i + 1), label: s.text, end: false })),
    { mark: "F", label: h.end, end: true },
  ];
  return (
    <ol>
      {nodes.map((n, i) => (
        <li key={i} className="relative flex items-start gap-4 py-2">
          {/* the line runs between marks only: up from every mark but the first, down from every mark but the last */}
          {i > 0 && <span aria-hidden="true" className="absolute left-[13px] top-0 h-[22px] w-[2px] bg-[#22333a]" />}
          {i < nodes.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[13px] top-[22px] w-[2px] bg-[#22333a]" />}
          <span
            aria-hidden="true"
            className={`${t12caption} relative z-10 grid h-7 w-7 shrink-0 place-items-center border-[1.5px] border-[#22333a] ${n.end ? "rounded-full bg-[#f6f9f7]" : "bg-[#c3d6c4] shadow-[2px_2px_0_0_#8eaaa6]"}`}
          >
            {n.mark}
          </span>
          <span className="min-w-0 pt-0.5">
            {n.end && <span className={`${t12} block text-[#4f5f66]`}>{i === 0 ? "Start" : "Finish"}</span>}
            <span className={`${t17} block`}>{n.label}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Twelve months as small printed squares; the best months carry a celadon plate. Not a control. */
export function MonthStrip({ best }: { best: string[] }) {
  return (
    <div>
      <p className="sr-only">Best months: {best.join(", ")}</p>
      <div className="grid max-w-md grid-cols-12 gap-1" aria-hidden="true">
        {MONTHS.map((m) => {
          const on = best.includes(m);
          return (
            <span key={m} className={`${t12} grid h-9 place-items-center border !tracking-normal ${on ? "border-[#22333a] bg-[#c3d6c4] text-[#22333a]" : "border-[#6f8287]/40 font-normal text-[#4f5f66]"}`}>
              {m[0]}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** A small plate you can choose: opens the viewer, or (with `selected`) shows which plate the viewer is on. */
export function PlateThumb({ photo, n, selected, force, onClick, label }: { photo: TrailPhoto; n: number; selected?: boolean; force?: ControlState; onClick?: () => void; label?: string }) {
  const on = force ? force === "selected" : !!selected;
  const look = force ? card[force] : on ? card.selected : card.rest;
  const body = (
    <>
      <TonedPhoto photo={photo} sizes="200px" className={`aspect-[4/3] border-2 border-[#22333a] ${force === "hover" ? "saturate-[1.25]" : colourUp}`} />
      <span className={`${t14} mt-1 block truncate ${on ? "font-semibold text-[#22333a]" : "text-[#4f5f66] group-hover:text-[#22333a]"}`}>{n}. {photo.place}</span>
    </>
  );
  if (force) return <span className={`relative block p-1.5 ${look}`}>{body}</span>;
  return (
    <button type="button" onClick={onClick} aria-label={label} aria-pressed={selected} className={`group block w-full p-1.5 text-left ${look} ${cardLive}`}>
      {body}
    </button>
  );
}

/** The large print at the top of a walk's page: itself the button to every plate, tagged "N plates →". */
export function HeroPlate({ photo, count, onOpen, label, priority = false }: { photo: TrailPhoto; count: number; onOpen?: () => void; label: string; priority?: boolean }) {
  return (
    <button type="button" onClick={onOpen} aria-label={label} className={`group block w-full p-3.5 text-left ${card.rest} ${cardLive}`}>
      <TonedPhoto photo={photo} sizes="(min-width: 1024px) 660px, 100vw" priority={priority} className={`aspect-[4/3] border-[3px] border-[#22333a] ${colourUp}`} />
      <span className={`${t12} absolute bottom-7 right-7 border border-[#22333a] bg-[#f6f9f7] px-3 py-2 transition-colors duration-[600ms] group-hover:bg-[#c3d6c4]`}>{count} plates →</span>
    </button>
  );
}

/** The walk before or after this one: a small mounted print and its name. */
export function NeighbourLink({ href, label, name, photo }: { href: string; label: string; name: string; photo: TrailPhoto }) {
  const body = (
    <>
      <TonedPhoto photo={photo} sizes="120px" className={`aspect-[4/3] w-28 shrink-0 border-2 border-[#22333a] ${colourUp}`} />
      <span className="min-w-0">
        <span className={`${t12} block text-[#4f5f66]`}>{label}</span>
        <span className={`${t24} mt-1 block decoration-[#8eaaa6] decoration-2 underline-offset-4 group-hover:underline`}>{name}</span>
      </span>
    </>
  );
  const cls = `group flex items-center gap-4 p-3 ${card.rest} ${cardLive}`;
  return href.startsWith("/") ? <Link href={href} className={cls}>{body}</Link> : <a href={href} className={cls}>{body}</a>;
}
