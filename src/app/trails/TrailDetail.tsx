"use client";
// One walk's own page. The large print leads; beside it the name, one line, three numbers and the one primary
// button. Below: the details behind tabs, every plate of the walk, the sources, and the walks either side.
import { useState } from "react";
import Link from "next/link";
import { elevation, formatRange, hikes, type Hike } from "@/data/hikes";
import { intros, introSources } from "@/data/intros";
import rawPhotos from "@/data/trailPhotos.json";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { EmbossStamp } from "@/components/dawn/PlateUI";
import { PlateTabs } from "@/components/dawn/ds/Interactive";
import { PrimaryButton } from "@/components/dawn/ds/Primitives";
import { focusRing, slow } from "@/components/dawn/ds/tokens";
import { MonthStrip } from "./MonthStrip";
import { RouteLine } from "./RouteLine";
import { TrailDialog } from "./TrailDialog";
import { plateNo, sourceLabel } from "./plate";
import { useTrails } from "./state";
import { coverIndex, neighbours } from "./walks";
import { t12, t12caption, t14, t17, t24, t48 } from "./type";

const photos = rawPhotos as Record<string, TrailPhoto[]>;
const link = `relative underline decoration-[#8eaaa6] decoration-2 underline-offset-4 hover:text-[#22333a] hover:decoration-[#22333a] ${focusRing}`;

function Facts({ h }: { h: Hike }) {
  return (
    <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-[#22333a]/20 py-4">
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
  );
}

function Details({ h }: { h: Hike }) {
  const t = intros[h.id];
  return (
    <PlateTabs
      idPrefix={h.id}
      tabs={["The walk", "Along the way", "When to go"]}
      panelClassName="min-h-64 pt-6 text-[#22333a]"
      panels={[
        <div key="walk" className={`${t17} max-w-prose space-y-4`}>
          {t.intro.map((s) => <p key={s.text}>{s.text}</p>)}
          <p className={`${t14} text-[#4f5f66]`}>{h.start} to {h.end} · {h.route}</p>
        </div>,
        <RouteLine key="route" h={h} stops={t.along_the_way} />,
        <div key="when" className="flex flex-wrap items-start gap-8">
          <div className="min-w-0 flex-1">
            <p className={`${t12} text-[#4f5f66]`}>Best months</p>
            <div className="mt-2"><MonthStrip best={h.best_months} /></div>
            <p className={`${t14} mt-4 max-w-prose text-[#4f5f66]`}>{h.permit_note}</p>
          </div>
          <EmbossStamp text={h.permit ? "Permit needed" : "No permit needed"} uid={`${h.id}-stamp`} className="h-24 w-24 shrink-0" />
        </div>,
      ]}
    />
  );
}

function Plates({ list, onOpen }: { list: TrailPhoto[]; onOpen: (i: number) => void }) {
  return (
    <section aria-labelledby="plates-h">
      <h2 id="plates-h" className={t24}>The plates</h2>
      <p className={`${t14} mt-1 text-[#4f5f66]`}>{list.length} photographs, in route order.</p>
      <ul className="mt-4 grid grid-cols-2 gap-4">
        {list.map((p, i) => (
          <li key={p.file}>
            <button type="button" onClick={() => onOpen(i)} aria-label={`Open plate ${i + 1}: ${p.place}`} className={`group relative block w-full text-left ${slow} active:translate-y-px ${focusRing}`}>
              <span className={`block border-2 border-[#22333a] ${slow} group-hover:shadow-[4px_4px_0_0_#c9dcdc]`}>
                <TonedPhoto photo={p} sizes="200px" className="aspect-[4/3]" />
              </span>
              <span className={`${t14} mt-1 block truncate text-[#4f5f66] group-hover:text-[#22333a]`}>{i + 1}. {p.place}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MoreWalks({ id }: { id: string }) {
  const nb = neighbours(hikes, id);
  if (!nb) return null;
  return (
    <nav aria-label="More walks" className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {([["← Previous walk", nb.prev], ["Next walk →", nb.next]] as const).map(([label, w]) => {
        const cover = photos[w.id][coverIndex(photos[w.id])];
        return (
          <Link key={label} href={`/trails/${w.id}/`} className={`group relative flex items-center gap-4 bg-[#f6f9f7] p-3 shadow-[0_1px_0_rgba(34,51,58,.15)] ${slow} hover:shadow-[5px_5px_0_0_#c9dcdc] active:translate-y-px ${focusRing}`}>
            <TonedPhoto photo={cover} sizes="120px" className="aspect-[4/3] w-28 shrink-0 border-2 border-[#22333a]" />
            <span className="min-w-0">
              <span className={`${t12} block text-[#4f5f66]`}>{label}</span>
              <span className={`${t24} mt-1 block decoration-[#8eaaa6] decoration-2 underline-offset-4 group-hover:underline`}>{w.name}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function TrailDetail({ id }: { id: string }) {
  const { list, toggleList } = useTrails();
  const [viewAt, setViewAt] = useState<number | null>(null);
  const h = hikes.find((x) => x.id === id) as Hike;
  const n = hikes.indexOf(h) + 1;
  const own = photos[h.id];
  const ci = coverIndex(own);
  const inList = list.includes(h.id);

  return (
    <article aria-labelledby="walk-title" className="mx-auto max-w-6xl px-5">
      <p className={`${t14} mt-8`}><Link href="/trails/#walks" className={`${link} text-[#4f5f66]`}>← All twelve walks</Link></p>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-end">
        <figure className="m-0 min-w-0">
          <button type="button" onClick={() => setViewAt(ci)} aria-label={`See all ${own.length} plates of ${h.name}`} className={`group relative block w-full bg-[#f6f9f7] p-3.5 text-left shadow-[6px_6px_0_0_#c9dcdc] ${slow} hover:shadow-[10px_10px_0_0_#c9dcdc] active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(34,51,58,.2)] ${focusRing}`}>
            <TonedPhoto photo={own[ci]} sizes="(min-width: 1024px) 660px, 100vw" priority className="aspect-[4/3] border-[3px] border-[#22333a]" />
            <span className={`${t12} absolute bottom-7 right-7 border border-[#22333a] bg-[#f6f9f7] px-3 py-2 ${slow} group-hover:bg-[#c3d6c4]`}>{own.length} plates →</span>
          </button>
          <figcaption className={`${t14} mt-3 text-[#4f5f66]`}>{creditLine(own[ci])}</figcaption>
        </figure>

        <div className="min-w-0 lg:pb-8">
          <p className={`${t12caption} text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")}</p>
          <h1 id="walk-title" className={`${t48} mt-2`}>{h.name}</h1>
          <p className={`${t17} mt-4 text-[#4f5f66]`}>{h.why}</p>
          <Facts h={h} />
          <div className="mt-8">
            <PrimaryButton aria-pressed={inList} onClick={() => toggleList(h.id)}>{inList ? "On your list ✓" : "Add to my list"}</PrimaryButton>
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-14 lg:grid-cols-[1.45fr_1fr]">
        <div className="min-w-0"><Details h={h} /></div>
        <Plates list={own} onOpen={setViewAt} />
      </div>

      <section aria-labelledby="sources-h" className={`${t14} mt-20 border-t border-[#22333a]/20 pt-6 text-[#4f5f66]`}>
        <h2 id="sources-h" className={`${t12} text-[#22333a]`}>Sources</h2>
        <ul className="mt-2 grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {[...new Set([...h.sources, ...introSources(h.id)])].map((s) => (
            <li key={s}><a href={s} target="_blank" rel="noreferrer" className={link}>{sourceLabel(s)}</a></li>
          ))}
        </ul>
        {h.flags.length > 0 && <p className="mt-3 max-w-prose">Notes on the data: {h.flags.join("; ")}.</p>}
      </section>

      <MoreWalks id={h.id} />

      <TrailDialog h={h} n={n} photos={own} at={viewAt} onClose={() => setViewAt(null)} />
    </article>
  );
}
