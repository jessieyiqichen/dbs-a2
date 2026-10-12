"use client";
// One walk's own page. The large print leads; beside it the name, one line, three numbers and the one primary
// button. Below: the details behind tabs, every plate of the walk, the sources, and the walks either side.
import { useState } from "react";
import { elevation, formatRange, hikes, type Hike } from "@/data/hikes";
import { intros, introSources } from "@/data/intros";
import { routes, stopSources } from "@/data/stops";
import rawPhotos from "@/data/trailPhotos.json";
import { creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { EmbossStamp } from "@/components/dawn/PlateUI";
import { PlateTabs, RouteMap } from "@/components/dawn/ds/Interactive";
import { PlateLink, PrimaryButton } from "@/components/dawn/ds/Primitives";
import { FACT_ICON, HeroPlate, NeighbourLink, PlateThumb, SeasonStrip, routeNodes } from "@/components/dawn/ds/Guide";
import { seasonSources, seasons } from "@/data/seasons";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { PlatesViewer } from "@/components/dawn/ds/Viewer";
import { plateNo, sourceLabel } from "./plate";
import { useTrails } from "./state";
import { coverIndex, neighbours } from "./walks";
import { t12, t12caption, t14, t17, t24, t48 } from "./type";

const photos = rawPhotos as Record<string, TrailPhoto[]>;

function Facts({ h }: { h: Hike }) {
  return (
    <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-y border-dw-ink/20 py-3 sm:mt-8 sm:gap-x-10 sm:gap-y-4 sm:py-4">
      {([
        ["Distance", `${formatRange(h.distance_km)} km`, FACT_ICON.distance],
        ["Days", formatRange(h.days), FACT_ICON.days],
        ["High point", elevation(h), FACT_ICON.high],
      ] as const).map(([k, v, icon]) => (
        <div key={k}>
          <dt className={`${t12} flex items-center gap-1.5 text-dw-muted`}><PlateIcon name={icon} size={22} />{k}</dt>
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
      panelClassName="min-h-64 pt-6 text-dw-ink"
      panels={[
        <div key="walk" className={`${t17} max-w-prose space-y-4`}>
          {t.intro.map((s) => <p key={s.text}>{s.text}</p>)}
          <p className={`${t14} text-dw-muted`}>{h.start} to {h.end} · {h.route}</p>
        </div>,
        <RouteMap key="route" nodes={routeNodes(h, routes[h.id])} idPrefix={h.id} />,
        <div key="when" className="flex flex-wrap items-start gap-8">
          <div className="min-w-0 flex-1">
            <p className={`${t12} flex items-center gap-1.5 text-dw-muted`}><PlateIcon name="sunrise" size={22} />Month by month</p>
            <div className="mt-2"><SeasonStrip season={seasons[h.id]} /></div>
            <p className={`${t14} mt-4 max-w-prose text-dw-muted`}>{h.permit_note}</p>
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
      <h2 id="plates-h" className={`${t24} flex items-center gap-2`}><PlateIcon name="camera" size={28} />The plates</h2>
      <p className={`${t14} mt-1 text-dw-muted`}>{list.length} photographs, in route order.</p>
      {/* a sliding strip on a phone; two columns from 640px */}
      <ul className="-mx-5 mt-2 flex gap-3 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:mx-0 sm:mt-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:p-0">
        {list.map((p, i) => (
          <li key={p.file} className="w-40 shrink-0 sm:w-auto"><PlateThumb photo={p} n={i + 1} onClick={() => onOpen(i)} label={`Open plate ${i + 1}: ${p.place}`} /></li>
        ))}
      </ul>
    </section>
  );
}

function MoreWalks({ id }: { id: string }) {
  const nb = neighbours(hikes, id);
  if (!nb) return null;
  return (
    <nav aria-label="More walks" className="mt-10 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-6">
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
      <p className="mt-4 sm:mt-8"><PlateLink href="/trails/#walks" size="note">← All twelve walks</PlateLink></p>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:mt-6 sm:gap-10 lg:grid-cols-[1.45fr_1fr] lg:items-end">
        <figure className="m-0 -mx-5 min-w-0 sm:mx-0">
          <HeroPlate photo={own[ci]} count={own.length} onOpen={() => setViewAt(ci)} label={`See all ${own.length} plates of ${h.name}`} priority />
          <figcaption className={`${t14} mt-2 px-5 text-dw-muted sm:mt-3 sm:px-0`}>{creditLine(own[ci])}</figcaption>
        </figure>

        <div className="min-w-0 lg:pb-8">
          <p className={`${t12caption} text-dw-muted`}>{plateNo(n)}. {h.country.join(", ")}</p>
          <h1 id="walk-title" className={`${t48} mt-2`}>{h.name}</h1>
          <p className={`${t17} mt-3 text-dw-muted sm:mt-4`}>{h.why}</p>
          <Facts h={h} />
          {/* full width on a phone, where the thumb reaches for it */}
          <div className="mt-5 [&>button]:w-full [&>button]:justify-center sm:mt-8 sm:[&>button]:w-auto">
            <PrimaryButton selected={inList} onClick={() => toggleList(h.id)}>{inList ? "On your list" : "Add to my list"}</PrimaryButton>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-24 sm:gap-14 lg:grid-cols-[1.45fr_1fr]">
        <div className="min-w-0"><Details h={h} /></div>
        <Plates list={own} onOpen={setViewAt} />
      </div>

      <section aria-labelledby="sources-h" className={`${t14} mt-10 sm:mt-20 border-t border-dw-ink/20 pt-6 text-dw-muted`}>
        <h2 id="sources-h" className={`${t12} text-dw-ink`}>Sources</h2>
        <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {[...new Set([...h.sources, ...introSources(h.id), ...stopSources(h.id), ...seasonSources(h.id)])].map((s) => (
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
            <p className={`${t12caption} text-dw-muted`}>{plateNo(n)}. {h.country.join(", ")}</p>
            <h2 id="plates-title" className={`${t48} mt-2`}>{h.name}</h2>
          </>
        }
      />
    </article>
  );
}
