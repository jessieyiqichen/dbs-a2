"use client";
// The contents page: twelve numbered walks. A one-line chooser dims the walks that don't fit; nothing disappears.
import { formatRange, type Hike } from "@/data/hikes";
import { PlateToggle } from "@/components/dawn/ds/Interactive";
import { caps, display, focusRing, slow, ui } from "@/components/dawn/ds/tokens";
import { LENGTHS, REGIONS, type Filters, type Length, type Region } from "./filters";
import { plateNo } from "./plate";

const selectCls = `${display} appearance-none border-b-2 border-[#22333a] bg-transparent px-1 pb-0.5 pr-6 text-2xl italic text-[#22333a] ${slow} hover:border-[#2c5868] hover:text-[#2c5868] focus:outline-none dw-crop`;

function InlineSelect({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <span className="relative inline-block">
      <label htmlFor={id} className="sr-only">{label}</label>
      <span className="dw-within dw-crop relative inline-block">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg viewBox="0 0 14 8" className="pointer-events-none absolute bottom-3 right-1 h-2 w-3" aria-hidden="true"><path d="M1 1 L7 7 L13 1" fill="none" stroke="#22333a" strokeWidth="1.6" /></svg>
      </span>
    </span>
  );
}

export function Contents({ all, f, setF, matches }: { all: Hike[]; f: Filters; setF: (f: Filters) => void; matches: Set<string> }) {
  const length = f.lengths[0] ?? "any";
  const region = f.regions[0] ?? "anywhere";
  return (
    <section id="contents" aria-labelledby="contents-title" className="scroll-mt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#22333a] pb-3">
        <h2 id="contents-title" className={`${display} text-4xl`}>Contents</h2>
        <p className={`${ui} text-sm text-[#4f5f66]`} aria-live="polite">
          <span className="font-semibold text-[#22333a]">{matches.size}</span> of {all.length} walks fit
        </p>
      </div>

      <div className={`${display} mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-2xl`}>
        <span>Show me walks</span>
        <InlineSelect id="pick-length" label="How long" value={length} onChange={(v) => setF({ ...f, lengths: v === "any" ? [] : [v as Length] })}
          options={[{ value: "any", label: "of any length" }, ...LENGTHS.map((l) => ({ value: l.key, label: l.label.toLowerCase() }))]} />
        <InlineSelect id="pick-region" label="Where" value={region} onChange={(v) => setF({ ...f, regions: v === "anywhere" ? [] : [v as Region] })}
          options={[{ value: "anywhere", label: "anywhere" }, ...REGIONS.map((r) => ({ value: r, label: `in ${r === "The Americas" ? "the Americas" : r}` }))]} />
      </div>
      <div className="mt-4">
        <PlateToggle label="Only walks without a permit" checked={f.noPermit} onChange={(noPermit) => setF({ ...f, noPermit })} />
      </div>

      <ol className="mt-8 grid grid-cols-1 gap-x-10 md:grid-cols-2">
        {all.map((h, i) => {
          const fit = matches.has(h.id);
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-describedby={fit ? undefined : "no-fit"}
                className={`relative flex items-baseline gap-3 border-b border-[#22333a]/20 py-3 ${slow} hover:bg-[#c9dcdc] active:bg-[#8eaaa6]/50 ${focusRing}`}
              >
                <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 translate-y-[-2px] border ${fit ? "border-[#22333a] bg-[#c3d6c4]" : "border-dashed border-[#6f8287]"}`} />
                <span className={`${display} w-12 shrink-0 text-sm text-[#4f5f66]`}>{plateNo(i + 1)}</span>
                <span className={`${display} text-xl ${fit ? "text-[#22333a]" : "italic text-[#4f5f66]"}`}>{h.name}</span>
                <span aria-hidden="true" className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-[#22333a]/40" />
                <span className={`${ui} shrink-0 whitespace-nowrap text-sm text-[#4f5f66]`}>{h.country[0]}{h.country.length > 1 ? " +" : ""} · {formatRange(h.days)} {h.days[1] === 1 ? "day" : "days"}</span>
              </a>
            </li>
          );
        })}
      </ol>
      <p id="no-fit" className="sr-only">Doesn&apos;t fit your choice</p>
      <p className={`${caps} mt-4 text-[11px] text-[#4f5f66]`}>Filled squares fit your choice; dashed ones don&apos;t. Every walk still has its chapter below.</p>
    </section>
  );
}
