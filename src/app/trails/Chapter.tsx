// One chapter per walk. Kept to what helps someone decide: the plate, the story, three stops, three numbers, when to go.
// Sources and data notes live in the plates panel, one click away.
import { elevation, formatRange, type Hike } from "@/data/hikes";
import { intros } from "@/data/intros";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { PrimaryButton, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { focusRing, slow } from "@/components/dawn/ds/tokens";
import { MonthStrip } from "./MonthStrip";
import { plateNo } from "./plate";
import { t12, t12caption, t14, t17, t24, t48 } from "./type";

export function Chapter({ h, n, photos, inList, onToggleList, onOpenPlates, flip }: { h: Hike; n: number; photos: TrailPhoto[]; inList: boolean; onToggleList: () => void; onOpenPlates: () => void; flip: boolean }) {
  const t = intros[h.id];
  const cover = photos.find((p) => p.cover) ?? photos[0];
  return (
    <article id={h.id} aria-labelledby={`${h.id}-title`} className="scroll-mt-6 border-t border-[#22333a]/25 py-16">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
        <figure className={`m-0 ${flip ? "lg:order-2" : ""}`}>
          <button
            type="button"
            onClick={onOpenPlates}
            aria-label={`See all ${photos.length} plates of ${h.name}`}
            className={`group relative block w-full bg-[#f6f9f7] p-3.5 text-left ${slow} hover:shadow-[6px_6px_0_0_#c9dcdc] active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(34,51,58,.2)] ${focusRing}`}
          >
            <TonedPhoto photo={cover} sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[4/3] border-[3px] border-[#22333a]" />
            <span className={`${t12} absolute bottom-7 right-7 border border-[#22333a] bg-[#f6f9f7] px-2.5 py-1.5 text-[#22333a] ${slow} group-hover:bg-[#c3d6c4]`}>
              {photos.length} plates →
            </span>
          </button>
          <figcaption className={`${t14} mt-2 text-[#4f5f66]`}>{creditLine(cover)}</figcaption>
        </figure>

        <div className="min-w-0">
          <p className={`${t12caption} text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")}</p>
          <h2 id={`${h.id}-title`} className={`${t48} mt-2`}>{h.name}</h2>
          <div className={`${t17} mt-6 max-w-prose space-y-3`}>
            {t.intro.map((s) => <p key={s.text}>{s.text}</p>)}
          </div>

          <h3 className={`${t12} mt-8 text-[#22333a]`}>Along the way</h3>
          <ol className={`${t17} mt-3 space-y-2`}>
            {t.along_the_way.map((s, i) => (
              <li key={s.text} className="flex items-baseline gap-3">
                <span className={`${t12caption} grid h-6 w-6 shrink-0 place-items-center border border-[#22333a] bg-[#c3d6c4] text-[#22333a]`}>{i + 1}</span>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>

          <dl className="mt-8 grid grid-cols-[auto_auto_auto] justify-between gap-6 border-y border-[#22333a]/20 py-4">
            {[
              ["Distance", `${formatRange(h.distance_km)} km`],
              ["Days", formatRange(h.days)],
              ["High point", elevation(h)],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className={`${t12} text-[#4f5f66]`}>{k}</dt>
                <dd className={`${t24} mt-1 whitespace-nowrap`}>{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className={`${t12} mt-6 text-[#22333a]`}>Best months</h3>
          <div className="mt-3"><MonthStrip best={h.best_months} /></div>
          <p className={`${t14} mt-4 text-[#4f5f66]`}>
            <span className="font-semibold text-[#22333a]">Permits and booking:</span> {h.permit_note}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <PrimaryButton aria-pressed={inList} onClick={onToggleList}>{inList ? "On your list ✓" : "Add to my list"}</PrimaryButton>
            <SecondaryButton onClick={onOpenPlates}>See all {photos.length} plates</SecondaryButton>
          </div>
        </div>
      </div>
    </article>
  );
}
