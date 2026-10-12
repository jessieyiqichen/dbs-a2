"use client";
// The index: the title beside one opening print, then all twelve walks as mounted prints you can take in at a glance.
import { useMemo } from "react";
import { DAWN_FIELD } from "@/components/dawn/ds/tokens";
import { hikes } from "@/data/hikes";
import { PLACES } from "@/data/stops";
import rawPhotos from "@/data/trailPhotos.json";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { ListMark, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { PrintCard } from "@/components/dawn/ds/Pieces";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { NO_FILTERS, applyFilters } from "./filters";
import { FilterBar } from "./FilterBar";
import { useTrails } from "./state";
import { t12, t14, t17, t24, t48, t96 } from "./type";

const photos = rawPhotos as Record<string, TrailPhoto[]>;
// Mitre Peak: a Milford print that is not any card's cover, so the opening plate is not repeated below.
const OPENING = photos.milford.find((p) => p.place.startsWith("Mitre Peak")) as TrailPhoto;
const coverOf = (id: string) => photos[id].find((p) => p.cover) ?? photos[id][0];

export default function TrailsIndex() {
  const { list, toggleList, filters, setFilters } = useTrails();
  const shown = useMemo(() => applyFilters(hikes, filters, PLACES), [filters]);

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Phone: the title and one line printed over the opening print, its credit along the foot, so the first walk
          is on the first screen. */}
      <header className="relative -mx-5 sm:hidden">
        <figure className="relative m-0 h-[260px]">
          <TonedPhoto photo={OPENING} sizes="100vw" priority className="h-full w-full" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,37,43,0)_25%,rgba(22,37,43,.7)_58%,rgba(22,37,43,.92)_100%)]" />
          <div className="absolute inset-x-5 bottom-3 text-dw-mount">
            <h1 className={t96}>The Walking Atlas</h1>
            <p className={`${t17} mt-2 text-dw-page/90`}>Twelve famous walks, from a day on a volcano to a month across Spain.</p>
            <figcaption className="mt-3 font-[family-name:var(--dw-ui)] text-[11px] leading-[15px] text-dw-page/80">
              {/* the place, then who printed it and when, each kept whole */}
              {creditLine(OPENING).split(" · ").map((part) => <span key={part} className="block">{part}</span>)}
            </figcaption>
          </div>
        </figure>
      </header>

      {/* From 640px: the title beside the mounted print, on the dawn field (sky to first light), the full width of the window. */}
      <header className="relative isolate hidden grid-cols-1 items-center gap-8 py-14 sm:grid lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <span aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2" style={{ background: DAWN_FIELD }} />
        <div>
          <p className={`${t12} text-dw-ink`}>A guide to twelve famous walks</p>
          <h1 className={`${t96} mt-4`}>The Walking Atlas</h1>
          <p className={`${t24} mt-6 max-w-md italic text-dw-ink`}>From a day on a volcano to a month across Spain: twelve walks, set out like a box of old travel prints.</p>
        </div>
        <figure className="m-0">
          <div className="bg-dw-mount p-3.5 shadow-[0_1px_0_rgba(34,51,58,.15)]">
            <TonedPhoto photo={OPENING} sizes="(min-width: 1024px) 600px, 100vw" priority className="aspect-[4/3] border-[3px] border-dw-ink" />
          </div>
          <figcaption className={`${t14} mt-3 text-dw-ink`}>{creditLine(OPENING)}</figcaption>
        </figure>
      </header>

      <section id="walks" aria-labelledby="walks-title" className="scroll-mt-16 sm:mt-16">
        {/* on a phone the prints say this for themselves; the heading stays for screen readers */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 max-sm:sr-only">
          <h2 id="walks-title" className={t48}>The twelve walks</h2>
          <p className={`${t14} text-dw-muted`}>Choose a print to read about the walk.</p>
        </div>
        <FilterBar f={filters} setF={setFilters} shown={shown.length} total={hikes.length} />

        {shown.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <span className="grid h-20 w-28 place-items-center border-[1.5px] border-dashed border-dw-muted"><PlateIcon name="camera" size={36} /></span>
            <p className={t24}>No prints in this drawer</p>
            <p className={`${t14} text-dw-muted`}>{filters.query.trim() ? `No walk matches “${filters.query.trim()}” with these choices. Try another word, or take a filter off.` : "No walk fits all of these at once. Take a filter off."}</p>
            <SecondaryButton onClick={() => setFilters(NO_FILTERS)}>Clear filters</SecondaryButton>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:mt-10 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
            {shown.map((h) => (
              <li key={h.id} className="flex">
                <PrintCard
                  id={h.id}
                  photo={coverOf(h.id)}
                  href={`/trails/${h.id}/`}
                  mark={<ListMark selected={list.includes(h.id)} onClick={() => toggleList(h.id)} aria-label={`${h.name}: on my list`} />}
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
