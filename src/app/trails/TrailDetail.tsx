"use client";
// One walk's own page. The large print leads; beside it the name, one line, three numbers and the one primary
// button. Below: the details behind tabs, every plate of the walk, the sources, and the walks either side.
import { useState } from "react";
import { elevation, formatRange, hikes, type Hike } from "@/data/hikes";
import { intros, introSources } from "@/data/intros";
import rawPhotos from "@/data/trailPhotos.json";
import { creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { EmbossStamp } from "@/components/dawn/PlateUI";
import { PlateTabs } from "@/components/dawn/ds/Interactive";
import { PlateLink, PrimaryButton } from "@/components/dawn/ds/Primitives";
import { HeroPlate, MonthStrip, NeighbourLink, PlateThumb, RouteLine } from "@/components/dawn/ds/Guide";
import { PlatesViewer } from "@/components/dawn/ds/Viewer";
import { plateNo, sourceLabel } from "./plate";
import { useTrails } from "./state";
import { coverIndex, neighbours } from "./walks";
import { t12, t12caption, t14, t17, t24, t48 } from "./type";

const photos = rawPhotos as Record<string, TrailPhoto[]>;

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
          <li key={p.file}><PlateThumb photo={p} n={i + 1} onClick={() => onOpen(i)} label={`Open plate ${i + 1}: ${p.place}`} /></li>
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
      {([["← Previous walk", nb.prev], ["Next walk →", nb.next]] as const).map(([label, w]) => (
        <NeighbourLink key={label} href={`/trails/${w.id}/`} label={label} name={w.name} photo={photos[w.id][coverIndex(photos[w.id])]} />
      ))}
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
      <p className="mt-8"><PlateLink href="/trails/#walks" size="note">← All twelve walks</PlateLink></p>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-end">
        <figure className="m-0 min-w-0">
          <HeroPlate photo={own[ci]} count={own.length} onOpen={() => setViewAt(ci)} label={`See all ${own.length} plates of ${h.name}`} priority />
          <figcaption className={`${t14} mt-3 text-[#4f5f66]`}>{creditLine(own[ci])}</figcaption>
        </figure>

        <div className="min-w-0 lg:pb-8">
          <p className={`${t12caption} text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")}</p>
          <h1 id="walk-title" className={`${t48} mt-2`}>{h.name}</h1>
          <p className={`${t17} mt-4 text-[#4f5f66]`}>{h.why}</p>
          <Facts h={h} />
          <div className="mt-8">
            <PrimaryButton selected={inList} onClick={() => toggleList(h.id)}>{inList ? "On your list" : "Add to my list"}</PrimaryButton>
          </div>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-14 lg:grid-cols-[1.45fr_1fr]">
        <div className="min-w-0"><Details h={h} /></div>
        <Plates list={own} onOpen={setViewAt} />
      </div>

      <section aria-labelledby="sources-h" className={`${t14} mt-20 border-t border-[#22333a]/20 pt-6 text-[#4f5f66]`}>
        <h2 id="sources-h" className={`${t12} text-[#22333a]`}>Sources</h2>
        <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {[...new Set([...h.sources, ...introSources(h.id)])].map((s) => (
            <li key={s}><PlateLink href={s} size="note" external>{sourceLabel(s)}</PlateLink></li>
          ))}
        </ul>
        {h.flags.length > 0 && <p className="mt-3 max-w-prose">Notes on the data: {h.flags.join("; ")}.</p>}
      </section>

      <MoreWalks id={h.id} />

      <PlatesViewer
        photos={own}
        at={viewAt}
        labelledBy="plates-title"
        onClose={() => setViewAt(null)}
        title={
          <>
            <p className={`${t12caption} text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")}</p>
            <h2 id="plates-title" className={`${t48} mt-2`}>{h.name}</h2>
          </>
        }
      />
    </article>
  );
}
