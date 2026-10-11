"use client";
// Twelve Trails, set out like a book of old travel prints: an opening plate, a contents page, then one chapter per walk.
import { useMemo, useState } from "react";
import Link from "next/link";
import { DATA_AS_OF, hikes } from "@/data/hikes";
import rawPhotos from "@/data/trailPhotos.json";
import { TonedPhoto, creditLine, type TrailPhoto } from "@/components/dawn/Toned";
import { CountBadge, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { focusRing } from "@/components/dawn/ds/tokens";
import { t12, t14, t24, t96 } from "./type";
import { NO_FILTERS, applyFilters, toggle, type Filters } from "./filters";
import { ContentsDrawer } from "./ContentsDrawer";
import { Chapter } from "./Chapter";
import { TrailDialog } from "./TrailDialog";

const photos = rawPhotos as Record<string, TrailPhoto[]>;
const OPENING = photos.milford.find((p) => p.cover) as TrailPhoto;

export default function TrailsApp() {
  const [f, setF] = useState<Filters>(NO_FILTERS);
  const [openId, setOpenId] = useState<string | null>(null);
  const [list, setList] = useState<string[]>([]);
  const [contentsOpen, setContentsOpen] = useState(false);
  const matches = useMemo(() => new Set(applyFilters(hikes, f).map((h) => h.id)), [f]);
  const open = hikes.find((h) => h.id === openId) ?? null;
  const flip = (id: string) => setList((cur) => toggle(cur, id));

  return (
    <>
    <div className="sticky top-0 z-30 border-b border-[#22333a]/15 bg-[#e6edeb]/95">
      <div className={`${t14} mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3`}>
        <Link href="/" className={`relative text-[#4f5f66] underline-offset-4 hover:text-[#22333a] hover:underline ${focusRing}`}>← Hub</Link>
        <div className="flex items-center gap-5">
          <p className="flex items-center gap-2" aria-live="polite">
            <CountBadge n={list.length} />
            <span className="text-[#4f5f66]">on your list</span>
          </p>
          <SecondaryButton aria-haspopup="dialog" onClick={() => setContentsOpen(true)}>Contents</SecondaryButton>
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-4">
      <header className="mt-10 grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className={`${t12} text-[#4f5f66]`}>A guide to twelve famous walks</p>
          <h1 className={`${t96} mt-3`}>Twelve Trails</h1>
          <p className={`${t24} mt-6 max-w-md italic text-[#4f5f66]`}>
            From a day on a volcano to a month across Spain: twelve walks, set out like a box of old travel prints.
          </p>
          <div className="mt-8">
            <SecondaryButton aria-haspopup="dialog" onClick={() => setContentsOpen(true)}>Open the contents</SecondaryButton>
          </div>
        </div>
        <figure className="m-0 bg-[#f6f9f7] p-3.5">
          <TonedPhoto photo={OPENING} sizes="(min-width: 1024px) 640px, 100vw" priority className="aspect-[4/3] border-[3px] border-[#22333a]" />
          <figcaption className={`${t14} mt-2 text-[#4f5f66]`}>{creditLine(OPENING)}</figcaption>
        </figure>
      </header>


      <div className="mt-20">
        {hikes.map((h, i) => (
          <Chapter
            key={h.id}
            h={h}
            n={i + 1}
            photos={photos[h.id]}
            flip={i % 2 === 1}
            inList={list.includes(h.id)}
            onToggleList={() => flip(h.id)}
            onOpenPlates={() => setOpenId(h.id)}
          />
        ))}
      </div>

      <ContentsDrawer open={contentsOpen} onClose={() => setContentsOpen(false)} all={hikes} f={f} setF={setF} matches={matches} />

      <TrailDialog
        h={open}
        n={open ? hikes.indexOf(open) + 1 : 0}
        photos={open ? photos[open.id] : []}
        inList={!!open && list.includes(open.id)}
        onToggleList={() => open && flip(open.id)}
        onClose={() => setOpenId(null)}
      />

      <footer className={`${t14} border-t border-[#22333a] pt-6 text-[#4f5f66]`}>
        <h2 className={`${t24} text-[#22333a]`}>Before you go</h2>
        <p className="mt-2 max-w-prose">
          Facts were checked against official park, trail and tourism sources in {DATA_AS_OF}; where sources disagree, both numbers are shown, and each walk&apos;s plates panel lists its
          sources and notes. Rules, closures and permits change, so check them before you travel. Your list lasts for this visit only: nothing is stored.
        </p>
        <p className="mt-2 max-w-prose">
          Photochrom prints: Library of Congress, Photochrom Print Collection (no known restrictions). Other photographs: Unsplash (Unsplash License), toned to sit with the prints.
        </p>
        <details className="mt-3">
          <summary className="cursor-pointer text-[#22333a] underline decoration-[#8eaaa6] underline-offset-4">Every photograph and its credit</summary>
          <ul className="mt-2 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {hikes.flatMap((h) => photos[h.id].map((p) => (
              <li key={p.file}>
                {h.name}: <a href={p.source} target="_blank" rel="noreferrer" className="underline decoration-[#8eaaa6] underline-offset-2 hover:decoration-[#22333a]">{p.place}</a>, {p.kind === "photochrom" ? `${p.author}, ${p.date}` : `${p.author} / Unsplash`}
              </li>
            )))}
          </ul>
        </details>
      </footer>
    </div>
    </>
  );
}
