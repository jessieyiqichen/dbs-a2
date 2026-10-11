"use client";
// The index: the title beside one opening print, then all twelve walks as mounted prints you can take in at a glance.
import { useMemo } from "react";
import { hikes } from "@/data/hikes";
import rawPhotos from "@/data/trailPhotos.json";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { SecondaryButton } from "@/components/dawn/ds/Primitives";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { focusRing } from "@/components/dawn/ds/tokens";
import { NO_FILTERS, applyFilters } from "./filters";
import { FilterBar } from "./FilterBar";
import { TrailCard } from "./TrailCard";
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
      <header className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className={`${t12} text-[#4f5f66]`}>A guide to twelve famous walks</p>
          <h1 className={`${t96} mt-4`}>Twelve Trails</h1>
          <p className={`${t24} mt-6 max-w-md italic text-[#4f5f66]`}>From a day on a volcano to a month across Spain: twelve walks, set out like a box of old travel prints.</p>
          <a href="#walks" className={`${t12} relative mt-8 inline-block underline decoration-[#8eaaa6] decoration-2 underline-offset-[6px] hover:decoration-[#22333a] hover:underline-offset-[3px] ${focusRing}`}>See the twelve walks ↓</a>
        </div>
        <figure className="m-0">
          <div className="bg-[#f6f9f7] p-3.5 shadow-[6px_6px_0_0_#c9dcdc]">
            <TonedPhoto photo={OPENING} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[4/3] border-[3px] border-[#22333a]" />
          </div>
          <figcaption className={`${t14} mt-3 text-[#4f5f66]`}>{creditLine(OPENING)}</figcaption>
        </figure>
      </header>

      <section id="walks" aria-labelledby="walks-title" className="mt-28 scroll-mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="walks-title" className={t48}>The twelve walks</h2>
          <p className={`${t14} text-[#4f5f66]`}>Choose a print to read about the walk.</p>
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
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((h) => (
              <li key={h.id} className="flex">
                <TrailCard h={h} n={hikes.indexOf(h) + 1} cover={coverOf(h.id)} inList={list.includes(h.id)} onToggleList={() => toggleList(h.id)} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
