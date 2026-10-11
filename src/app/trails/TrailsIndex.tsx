"use client";
// The index: the title beside one opening print, then all twelve walks as mounted prints you can take in at a glance.
import { useMemo } from "react";
import { hikes } from "@/data/hikes";
import rawPhotos from "@/data/trailPhotos.json";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { PlateLink, SecondaryButton } from "@/components/dawn/ds/Primitives";
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
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,37,43,0)_20%,rgba(22,37,43,.55)_50%,rgba(22,37,43,.9)_100%)]" />
            <div className="absolute inset-x-5 bottom-4 text-[#f6f9f7]">
              <p className={`${t12} text-[#e6edeb]`}>A guide to twelve famous walks</p>
              <h1 className={`${t96} mt-1`}>Twelve Trails</h1>
              <p className={`${t24} mt-2 italic text-[#e6edeb]`}>From a day on a volcano to a month across Spain: twelve walks, set out like a box of old travel prints.</p>
            </div>
          </div>
          <figcaption className={`${t14} mt-2 px-5 text-[#4f5f66]`}>{creditLine(OPENING)}</figcaption>
        </figure>
      </header>

      {/* From 640px: the title beside the mounted print. */}
      <header className="mt-14 hidden grid-cols-1 items-center gap-8 sm:grid lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div>
          <p className={`${t12} text-[#4f5f66]`}>A guide to twelve famous walks</p>
          <h1 className={`${t96} mt-4`}>Twelve Trails</h1>
          <p className={`${t24} mt-6 max-w-md italic text-[#4f5f66]`}>From a day on a volcano to a month across Spain: twelve walks, set out like a box of old travel prints.</p>
          <p className="mt-8"><PlateLink href="#walks" size="note">See the twelve walks ↓</PlateLink></p>
        </div>
        <figure className="m-0">
          <div className="bg-[#f6f9f7] p-3.5 shadow-[0_1px_0_rgba(34,51,58,.15)]">
            <TonedPhoto photo={OPENING} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[4/3] border-[3px] border-[#22333a]" />
          </div>
          <figcaption className={`${t14} mt-3 text-[#4f5f66]`}>{creditLine(OPENING)}</figcaption>
        </figure>
      </header>

      <section id="walks" aria-labelledby="walks-title" className="mt-8 scroll-mt-16 sm:mt-28">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="walks-title" className={t48}>The twelve walks</h2>
          <p className={`${t14} hidden text-[#4f5f66] sm:block`}>Choose a print to read about the walk.</p>
        </div>
        <FilterBar f={filters} setF={setFilters} shown={shown.length} total={hikes.length} />

        {shown.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <span className="grid h-20 w-28 place-items-center border-[1.5px] border-dashed border-[#4f5f66]"><PlateIcon name="camera" size={36} /></span>
            <p className={t24}>No prints in this drawer</p>
            <p className={`${t14} text-[#4f5f66]`}>No walk fits all of these at once. Take a filter off.</p>
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
