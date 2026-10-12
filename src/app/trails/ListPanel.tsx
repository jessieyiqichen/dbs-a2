"use client";
// The visitor's list, in a side panel opened from the top bar: each walk as a catalogue row that opens its page,
// with Remove beside it; an empty state when nothing is on it. Moving to another page closes the panel.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { formatRange, hikes } from "@/data/hikes";
import { CatalogueRow } from "@/components/dawn/ds/Pieces";
import { PlateLink, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { SidePanel } from "@/components/dawn/ds/Viewer";
import { PlateIcon } from "@/components/dawn/PlateArt";
import { useTrails } from "./state";
import { t14, t24, t48 } from "./type";

export function ListPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { list, toggleList } = useTrails();
  const path = usePathname();
  useEffect(() => onClose(), [path]); // eslint-disable-line react-hooks/exhaustive-deps -- close only when the page changes
  const walks = hikes.filter((h) => list.includes(h.id));
  return (
    <SidePanel open={open} onClose={onClose} titleId="list-title" title={<h2 id="list-title" className={t48}>My list</h2>}>
      <p className={`${t14} mt-2 text-dw-muted`} aria-live="polite">
        {walks.length === 0 ? "No walks yet." : `${walks.length} ${walks.length === 1 ? "walk" : "walks"}, in catalogue order.`}
      </p>
      {walks.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <span className="grid h-20 w-28 place-items-center border-[1.5px] border-dashed border-dw-muted"><PlateIcon name="boot" size={36} /></span>
          <p className={t24}>Nothing on your list yet</p>
          <p className={`${t14} text-dw-muted`}>Add a walk from its card or its page.</p>
          <span onClick={onClose}><PlateLink href="/trails/#walks" size="note">See the twelve walks</PlateLink></span>
        </div>
      ) : (
        <ul className="mt-4 border-t border-dw-ink/20">
          {walks.map((h) => (
            <li key={h.id} className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <CatalogueRow id={h.id} href={`/trails/${h.id}/`} onClick={onClose} note={`${formatRange(h.days)} ${h.days[1] === 1 ? "day" : "days"}`} />
              </div>
              <SecondaryButton small onClick={() => toggleList(h.id)} aria-label={`Remove ${h.name} from my list`}>Remove</SecondaryButton>
            </li>
          ))}
        </ul>
      )}
      <p className={`${t14} mt-8 text-dw-muted`}>Your list lasts for this visit only: a reload clears it, and nothing is stored.</p>
    </SidePanel>
  );
}
