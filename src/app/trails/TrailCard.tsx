// A walk on the index: a mounted print with its caption. The print and name open the walk's own page;
// the list control sits under them, outside the link. Hover lifts the mount; press sinks it.
import Link from "next/link";
import { elevation, formatRange, type Hike } from "@/data/hikes";
import { TonedPhoto, type TrailPhoto } from "@/components/dawn/Toned";
import { focusRing, slow } from "@/components/dawn/ds/tokens";
import { ListToggle } from "./ListToggle";
import { plateNo } from "./plate";
import { t12caption, t14, t24 } from "./type";

export function TrailCard({ h, n, cover, inList, onToggleList }: { h: Hike; n: number; cover: TrailPhoto; inList: boolean; onToggleList: () => void }) {
  const days = formatRange(h.days);
  return (
    <article
      aria-labelledby={`${h.id}-card`}
      className={`flex w-full flex-col bg-[#f6f9f7] p-3.5 shadow-[0_1px_0_rgba(34,51,58,.15)] ${slow} has-[a:hover]:shadow-[5px_5px_0_0_#c9dcdc] has-[a:active]:translate-y-px has-[a:active]:shadow-[inset_0_2px_4px_rgba(34,51,58,.2)]`}
    >
      <Link href={`/trails/${h.id}/`} className={`group relative block ${focusRing}`}>
        <TonedPhoto photo={cover} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] border-[3px] border-[#22333a]" />
        <span className={`${t12caption} mt-4 block text-[#4f5f66]`}>{plateNo(n)}. {h.country.join(", ")}</span>
        <span id={`${h.id}-card`} className={`${t24} mt-1 block decoration-[#8eaaa6] decoration-2 underline-offset-4 group-hover:underline`}>{h.name}</span>
        <span className={`${t14} mt-2 block text-[#4f5f66]`}>
          {formatRange(h.distance_km)} km · {days} {h.days[1] === 1 ? "day" : "days"} · {elevation(h)}
        </span>
      </Link>
      <div className="mt-auto pt-4">
        <ListToggle on={inList} name={h.name} onToggle={onToggleList} />
      </div>
    </article>
  );
}
