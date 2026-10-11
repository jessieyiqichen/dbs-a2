// One chapter per walk. Three things carry it: the plate, the name with one line on why it matters, and three numbers.
// Everything else waits behind tabs: the story, the route, when to go.
import { elevation, formatRange, type Hike } from "@/data/hikes";
import { intros } from "@/data/intros";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { EmbossStamp } from "@/components/dawn/PlateUI";
import { PlateTabs } from "@/components/dawn/ds/Interactive";
import { PrimaryButton, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { focusRing, slow } from "@/components/dawn/ds/tokens";
import { MonthStrip } from "./MonthStrip";
import { RouteLine } from "./RouteLine";
import { plateNo } from "./plate";
import { t12, t12caption, t14, t17, t24, t48 } from "./type";

export function Chapter({ h, n, photos, inList, onToggleList, onOpenPlates, flip }: { h: Hike; n: number; photos: TrailPhoto[]; inList: boolean; onToggleList: () => void; onOpenPlates: () => void; flip: boolean }) {
  const t = intros[h.id];
  const cover = photos.find((p) => p.cover) ?? photos[0];
  return (
    <article id={h.id} aria-labelledby={`${h.id}-title`} className="scroll-mt-24 border-t border-[#22333a]/25 py-16">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.15fr_1fr]">
        <figure className={`m-0 ${flip ? "lg:order-2" : ""}`}>
          <button
            type="button"
            onClick={onOpenPlates}
            aria-label={`See all ${photos.length} plates of ${h.name}`}
            className={`group relative block w-full bg-[#f6f9f7] p-3.5 text-left ${slow} hover:shadow-[6px_6px_0_0_#c9dcdc] active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(34,51,58,.2)] ${focusRing}`}
          >
            <TonedPhoto photo={cover} sizes="(min-width: 1024px) 620px, 100vw" className="aspect-[4/3] border-[3px] border-[#22333a]" />
            <span className={`${t12} absolute bottom-7 right-7 border border-[#22333a] bg-[#f6f9f7] px-2.5 py-1.5 text-[#22333a] ${slow} group-hover:bg-[#c3d6c4]`}>{photos.length} plates →</span>
          </button>
          <figcaption className={`${t14} mt-2 text-[#4f5f66]`}>{creditLine(cover)}</figcaption>
        </figure>

        <div className="min-w-0">
          <p className={`${t12caption} text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")}</p>
          <h2 id={`${h.id}-title`} className={`${t48} mt-2`}>{h.name}</h2>
          <p className={`${t17} mt-4 max-w-prose text-[#4f5f66]`}>{h.why}</p>

          <dl className="mt-6 grid grid-cols-[auto_auto_auto] justify-start gap-x-10 gap-y-1">
            {[
              ["Distance", `${formatRange(h.distance_km)} km`],
              ["Days", formatRange(h.days)],
              ["High point", elevation(h)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className={`${t12} text-[#4f5f66]`}>{k}</dt>
                <dd className={`${t24} mt-1 whitespace-nowrap`}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <PlateTabs
              idPrefix={h.id}
              tabs={["The walk", "Along the way", "When to go"]}
              panelClassName="min-h-56 bg-[#f6f9f7] px-5 py-5 text-[#22333a]"
              panels={[
                <div key="walk" className={`${t17} space-y-3`}>
                  {t.intro.map((s) => <p key={s.text}>{s.text}</p>)}
                </div>,
                <RouteLine key="route" h={h} stops={t.along_the_way} />,
                <div key="when" className="flex flex-wrap items-start gap-6">
                  <div className="min-w-0 flex-1">
                    <p className={`${t12} text-[#4f5f66]`}>Best months</p>
                    <div className="mt-2"><MonthStrip best={h.best_months} /></div>
                    <p className={`${t14} mt-4 text-[#4f5f66]`}>{h.permit_note}</p>
                  </div>
                  <EmbossStamp text={h.permit ? "Permit needed" : "No permit needed"} uid={`${h.id}-stamp`} className="h-24 w-24 shrink-0" />
                </div>,
              ]}
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <PrimaryButton aria-pressed={inList} onClick={onToggleList}>{inList ? "On your list ✓" : "Add to my list"}</PrimaryButton>
            <SecondaryButton onClick={onOpenPlates}>See all {photos.length} plates</SecondaryButton>
          </div>
        </div>
      </div>
    </article>
  );
}
