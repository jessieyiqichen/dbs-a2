"use client";
// The contents page. Hierarchy: the walk's name first, then its number, then where and how long.
// One sentence chooses; walks that don't fit turn grey, nothing disappears.
import { formatRange, type Hike } from "@/data/hikes";
import { display, focusRing, slow } from "@/components/dawn/ds/tokens";
import { t14, t17, t24, t48 } from "./type";
import { LENGTHS, REGIONS, type Filters, type Length, type Region } from "./filters";
import { plateNo } from "./plate";

const selectCls = `${display} appearance-none border-b border-[#22333a]/50 bg-transparent pb-0.5 pr-5 text-[17px] italic text-[#22333a] ${slow} hover:border-[#22333a] hover:bg-[#c9dcdc]/60 active:bg-[#c9dcdc] focus:outline-none`;

function InlineSelect({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <span className="dw-within dw-crop relative inline-block">
      <label htmlFor={id} className="sr-only">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <svg viewBox="0 0 14 8" className="pointer-events-none absolute bottom-2.5 right-0.5 h-1.5 w-2.5" aria-hidden="true"><path d="M1 1 L7 7 L13 1" fill="none" stroke="#22333a" strokeWidth="1.6" /></svg>
    </span>
  );
}

export function Contents({ all, f, setF, matches }: { all: Hike[]; f: Filters; setF: (f: Filters) => void; matches: Set<string> }) {
  return (
    <section id="contents" aria-labelledby="contents-title" className="scroll-mt-8">
      <h2 id="contents-title" className={t48}>Contents</h2>

      <div className={`${t17} mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[#4f5f66]`}>
        <span>Show me walks</span>
        <InlineSelect id="pick-length" label="How long" value={f.lengths[0] ?? "any"} onChange={(v) => setF({ ...f, lengths: v === "any" ? [] : [v as Length] })}
          options={[{ value: "any", label: "of any length" }, ...LENGTHS.map((l) => ({ value: l.key, label: l.label.toLowerCase() }))]} />
        <InlineSelect id="pick-region" label="Where" value={f.regions[0] ?? "anywhere"} onChange={(v) => setF({ ...f, regions: v === "anywhere" ? [] : [v as Region] })}
          options={[{ value: "anywhere", label: "anywhere" }, ...REGIONS.map((r) => ({ value: r, label: `in ${r === "The Americas" ? "the Americas" : r}` }))]} />
        <InlineSelect id="pick-permit" label="Permit" value={f.noPermit ? "none" : "either"} onChange={(v) => setF({ ...f, noPermit: v === "none" })}
          options={[{ value: "either", label: "with or without a permit" }, { value: "none", label: "that need no permit" }]} />
        <span className={`${t14} ml-auto`} aria-live="polite">
          <span className="font-semibold text-[#22333a]">{matches.size}</span> of {all.length} fit
        </span>
      </div>

      <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((h, i) => {
          const fit = matches.has(h.id);
          return (
            <li key={h.id}>
              <a href={`#${h.id}`} aria-describedby={fit ? undefined : "no-fit"} className={`group relative block py-1 ${slow} active:translate-y-px ${focusRing}`}>
                <span className={`${t14} block text-[#4f5f66]`}>{plateNo(i + 1)}</span>
                <span className={`${t24} mt-0.5 block ${fit ? "text-[#22333a]" : "text-[#4f5f66]/80"}`}>
                  <span className={`underline decoration-1 underline-offset-[6px] ${slow} ${fit ? "decoration-[#8eaaa6] group-hover:decoration-[#22333a] group-hover:decoration-2" : "decoration-transparent group-hover:decoration-[#8eaaa6]"}`}>{h.name}</span>{" "}
                  <span aria-hidden="true" className={`inline-block ${slow} group-hover:translate-x-1`}>→</span>
                </span>
                <span className={`${t14} mt-1 block text-[#4f5f66]`}>{h.country.join(", ")} · {formatRange(h.days)} {h.days[1] === 1 ? "day" : "days"}</span>
              </a>
            </li>
          );
        })}
      </ol>
      <p id="no-fit" className="sr-only">Doesn&apos;t fit your choice</p>
    </section>
  );
}
