// The end matter of every trail page: how the facts were checked, and where every photograph came from.
import { DATA_AS_OF, hikes } from "@/data/hikes";
import rawPhotos from "@/data/trailPhotos.json";
import type { TrailPhoto } from "@/components/dawn/Toned";
import { PlateLink, plateLinkClass } from "@/components/dawn/ds/Primitives";
import { t14, t24 } from "./type";

const photos = rawPhotos as Record<string, TrailPhoto[]>;

export function Colophon() {
  return (
    <footer className={`${t14} mx-auto mt-24 max-w-6xl px-5 pb-16 text-[#4f5f66]`}>
      <div className="border-t border-[#22333a] pt-6">
        <h2 className={`${t24} text-[#22333a]`}>Before you go</h2>
        <p className="mt-2 max-w-prose">
          Facts were checked against official park, trail and tourism sources in {DATA_AS_OF}; where sources disagree, both numbers are shown, and each walk&apos;s page lists its
          sources and notes. Rules, closures and permits change, so check them before you travel. Your list lasts for this visit only: nothing is stored.
        </p>
        <p className="mt-2 max-w-prose">
          Photochrom prints: Library of Congress, Photochrom Print Collection (no known restrictions). Other photographs: Unsplash (Unsplash License), toned to sit with the prints.
        </p>
        <details className="mt-3">
          <summary className={`w-fit cursor-pointer ${plateLinkClass("note")}`}>Every photograph and its credit</summary>
          <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {hikes.flatMap((h) => photos[h.id].map((p) => (
              <li key={p.file}>
                {h.name}: <PlateLink href={p.source} size="note" external>{p.place}</PlateLink>, {p.kind === "photochrom" ? `${p.author}, ${p.date}` : `${p.author} / Unsplash`}
              </li>
            )))}
          </ul>
        </details>
      </div>
    </footer>
  );
}
