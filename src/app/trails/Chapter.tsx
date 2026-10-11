// One chapter per walk: a large plate, its story in two or three sourced sentences, three stops, and the facts.
import { elevation, formatRange, type Hike } from "@/data/hikes";
import { intros, introSources } from "@/data/intros";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { PrimaryButton, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { caps, display, focusRing, ui } from "@/components/dawn/ds/tokens";
import { MonthStrip } from "./MonthStrip";
import { host, plateNo } from "./plate";

const TINTS = ["#c3d6c4", "#c9dcdc", "#8eaaa6"];

export function Chapter({ h, n, photos, inList, onToggleList, onOpenPlates, flip }: { h: Hike; n: number; photos: TrailPhoto[]; inList: boolean; onToggleList: () => void; onOpenPlates: () => void; flip: boolean }) {
  const t = intros[h.id];
  const cover = photos.find((p) => p.cover) ?? photos[0];
  const sources = [...new Set([...h.sources, ...introSources(h.id)])];
  return (
    <article id={h.id} aria-labelledby={`${h.id}-title`} className="scroll-mt-6 border-t border-[#22333a]/25 py-14">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
        <figure className={`m-0 bg-[#f6f9f7] p-3.5 ${flip ? "lg:order-2" : ""}`}>
          <TonedPhoto photo={cover} sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[4/3] border-[3px] border-[#22333a]" />
          <figcaption className={`${ui} mt-2 text-xs text-[#4f5f66]`}>
            {creditLine(cover)}
          </figcaption>
        </figure>

        <div className="min-w-0">
          <p className={`${display} text-[13px] uppercase tracking-[0.12em] text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")}</p>
          <h2 id={`${h.id}-title`} className={`${display} mt-1 text-5xl leading-[1.05]`}>{h.name}</h2>
          <div className={`${ui} mt-5 max-w-prose space-y-3 text-[17px] leading-[27px]`}>
            {t.intro.map((s) => <p key={s.text}>{s.text}</p>)}
          </div>

          <h3 className={`${caps} mt-7 text-[#22333a]`}>Along the way</h3>
          <ol className={`${ui} mt-2 space-y-2 text-base`}>
            {t.along_the_way.map((s, i) => (
              <li key={s.text} className="flex items-baseline gap-3">
                <span className={`${display} grid h-6 w-6 shrink-0 place-items-center border border-[#22333a] text-sm`} style={{ background: TINTS[i] }}>{i + 1}</span>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>

          <dl className="mt-7 grid grid-cols-3 gap-4 border-y border-[#22333a]/20 py-4">
            {[
              ["Distance", `${formatRange(h.distance_km)} km`, h.route],
              ["Days", formatRange(h.days), "walking days"],
              ["High point", elevation(h), h.high_point],
            ].map(([k, v, note]) => (
              <div key={k} className="min-w-0">
                <dt className={`${caps} text-[11px] text-[#4f5f66]`}>{k}</dt>
                <dd className={`${display} mt-1 text-2xl leading-tight`}>{v}</dd>
                <dd className={`${ui} mt-0.5 text-xs text-[#4f5f66]`}>{note}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <p className={`${caps} mb-2 text-[11px] text-[#4f5f66]`}>Best months</p>
            <MonthStrip best={h.best_months} />
          </div>
          <p className={`${ui} mt-4 text-sm text-[#22333a]`}>
            <span className="font-semibold">{h.permit ? "Permit or booking needed." : "No permit needed."}</span> {h.permit_note}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <PrimaryButton aria-pressed={inList} onClick={onToggleList}>{inList ? "On your list ✓" : "Add to my list"}</PrimaryButton>
            {photos.length > 1 && <SecondaryButton onClick={onOpenPlates}>See all {photos.length} plates</SecondaryButton>}
          </div>

          <p className={`${ui} mt-6 text-xs text-[#4f5f66]`}>
            Sources:{" "}
            {sources.map((s, i) => (
              <span key={s}>
                {i > 0 && " · "}
                <a href={s} target="_blank" rel="noreferrer" className="underline decoration-[#8eaaa6] underline-offset-2 hover:text-[#22333a] hover:decoration-[#22333a]">{host(s)}</a>
              </span>
            ))}
            {h.flags.length > 0 && <> · Notes: {h.flags.join("; ")}.</>}
          </p>
          <a href="#contents" className={`${ui} relative mt-3 inline-block text-xs text-[#4f5f66] underline-offset-4 hover:text-[#22333a] hover:underline ${focusRing}`}>Back to contents ↑</a>
        </div>
      </div>
    </article>
  );
}
