"use client";
// The index: the title beside one opening print, then all twelve walks as mounted prints you can take in at a glance.
import { useMemo } from "react";
import { DAWN_FIELD } from "@/components/dawn/ds/tokens";
import { hikes } from "@/data/hikes";
import rawPhotos from "@/data/trailPhotos.json";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { SecondaryButton } from "@/components/dawn/ds/Primitives";
import { PrintCard } from "@/components/dawn/ds/Pieces";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { NO_FILTERS, applyFilters } from "./filters";
import { FilterBar } from "./FilterBar";
import { useTrails } from "./state";
import { t12, t14, t24, t48, t96 } from "./type";

const photos = rawPhotos as Record<string, TrailPhoto[]>;
// Mitre Peak: a Milford print that is not any card's cover, so the opening plate is not repeated below.
const OPENING = photos.milford.find((p) => p.place.startsWith("Mitre Peak")) as TrailPhoto;
const coverOf = (id: string) => photos[id].find((p) => p.cover) ?? photos[id][0];

export default function TrailsIndex() {
  const { list, toggleList, filters, setFilters } = useTrails();
  const shown = useMemo(() => applyFilters(hikes, filters), [filters]);

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Phone: the title is printed over the lower part of the opening print, so one screen holds both. */}
      <header className="relative -mx-5 sm:hidden">
        <figure className="m-0">
          <div className="relative h-[340px]">
            <TonedPhoto photo={OPENING} sizes="100vw" priority className="h-full w-full" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,37,43,0)_15%,rgba(22,37,43,.68)_45%,rgba(22,37,43,.92)_100%)]" />
            <div className="absolute inset-x-5 bottom-4 text-dw-mount">
              <p className={`${t12} text-dw-page`}>A guide to twelve famous walks</p>
              <h1 className={`${t96} mt-1`}>Twelve Trails</h1>
              <p className={`${t24} mt-2 italic text-dw-page`}>From a day on a volcano to a month across Spain: twelve walks, set out like a box of old travel prints.</p>
            </div>
          </div>
          <figcaption className={`${t14} mt-2 px-5 text-dw-muted`}>{creditLine(OPENING)}</figcaption>
        </figure>
      </header>

      {/* From 640px: the title beside the mounted print, on the dawn field (sky to first light), the full width of the window. */}
      <header className="relative isolate hidden grid-cols-1 items-center gap-8 py-14 sm:grid lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <span aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2" style={{ background: DAWN_FIELD }} />
        <div>
          <p className={`${t12} text-dw-ink`}>A guide to twelve famous walks</p>
          <h1 className={`${t96} mt-4`}>Twelve Trails</h1>
          <p className={`${t24} mt-6 max-w-md italic text-dw-ink`}>From a day on a volcano to a month across Spain: twelve walks, set out like a box of old travel prints.</p>
        </div>
        <figure className="m-0">
          <div className="bg-dw-mount p-3.5 shadow-[0_1px_0_rgba(34,51,58,.15)]">
            <TonedPhoto photo={OPENING} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[4/3] border-[3px] border-dw-ink" />
          </div>
          <figcaption className={`${t14} mt-3 text-dw-ink`}>{creditLine(OPENING)}</figcaption>
        </figure>
      </header>

      <section id="walks" aria-labelledby="walks-title" className="mt-8 scroll-mt-16 sm:mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="walks-title" className={t48}>The twelve walks</h2>
          <p className={`${t14} text-dw-muted`}>Choose a print to read about the walk.</p>
        </div>
        <FilterBar f={filters} setF={setFilters} shown={shown.length} total={hikes.length} />

        {shown.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <span className="grid h-20 w-28 place-items-center border-[1.5px] border-dashed border-dw-muted"><PlateIcon name="camera" size={36} /></span>
            <p className={t24}>No prints in this drawer</p>
            <p className={`${t14} text-dw-muted`}>No walk fits all of these at once. Take a filter off.</p>
            <SecondaryButton onClick={() => setFilters(NO_FILTERS)}>Clear filters</SecondaryButton>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:mt-10 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
            {shown.map((h) => (
              <li key={h.id} className="flex">
                <PrintCard
                  id={h.id}
                  photo={coverOf(h.id)}
                  href={`/trails/${h.id}/`}
                  footer={
                    <SecondaryButton small selected={list.includes(h.id)} onClick={() => toggleList(h.id)} aria-label={`${h.name}: on my list`}>
                      {list.includes(h.id) ? "On my list" : "+ My list"}
                    </SecondaryButton>
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
