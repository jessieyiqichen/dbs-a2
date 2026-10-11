import type { Metadata } from "next";
import Link from "next/link";
import { Caveat, Crimson_Pro } from "next/font/google";
import { CONTROL_STATES, ratio, type ControlState } from "@/lib/contrast";
import { hikes } from "@/data/hikes";
import { FieldDefs, FieldIcon } from "@/components/field-notes/FieldArt";
import { FIELD_KEYFRAMES, RouteProgress } from "@/components/field-notes/FieldSketches";
import { FIELD_FOCUS_CSS, FN, hand, serif } from "@/components/field-notes/ds/tokens";
import { CircleRadio, CountBadge, NoteLink, PencilFrame, PrimaryButton, RadioSwatch, RuledInput, RuledSelect, SearchField, SecondaryButton, TickBox } from "@/components/field-notes/ds/Primitives";
import { ChipSwatch, IndexTabs, TabSwatch, TapeChips, WashSwitch } from "@/components/field-notes/ds/Interactive";
import { CardSwatch, DetailPanel, DifficultyTape, PermitStamp, TrailCard, TrailRow, UIStates } from "@/components/field-notes/ds/Pieces";

const handFont = Caveat({ subsets: ["latin"], weight: ["400", "600"], variable: "--fn-hand" });
const serifFont = Crimson_Pro({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--fn-serif" });

export const metadata: Metadata = { title: "Field Notes · Design system · Twelve Trails" };

const laugavegur = hikes.find((h) => h.id === "laugavegur")!;

/* ---------- section scaffolding ---------- */

function Section({ n, title, note, children }: { n: number; title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#c9d3df] pt-8">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="self-center"><CountBadge n={n} /></span>
        <h2 className={`${hand} text-5xl font-semibold leading-none`}>{title}</h2>
        <p className={`${serif} text-lg italic text-[#625e56]`}>{note}</p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Block({ title, note, children, className = "" }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#fbf7ec] p-5 shadow-[0_1px_2px_rgba(0,0,0,.08)] ${className}`}>
      <p className={`${hand} text-2xl font-semibold text-[#3d3a34]`}>{title}</p>
      {note && <p className={`${serif} text-sm italic text-[#625e56]`}>{note}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

/* ---------- 1. colour roles ---------- */

const ROLES = [
  { role: "Background", hex: FN.page, use: "The notebook page", checks: [] as [string, string, string][] },
  { role: "Surface", hex: FN.surface, use: "Cards, panels: a fresh page", checks: [] },
  { role: "Text", hex: FN.text, use: "Dark graphite, never black", checks: [["on background", FN.text, FN.page], ["on surface", FN.text, FN.surface]] },
  { role: "Muted text", hex: FN.muted, use: "Notes, meta, placeholders", checks: [["on background", FN.muted, FN.page], ["on surface", FN.muted, FN.surface]] },
  { role: "Border", hex: FN.border, use: "Pencil lines on controls", checks: [["on background (3:1 needed)", FN.border, FN.page]] },
  { role: "Accent", hex: FN.accent, use: "Moss, for the one primary action", checks: [["paper text on it", FN.page, FN.accent]] },
  { role: "Ink", hex: FN.ink, use: "Links, focus, notes in the margin", checks: [["on background", FN.ink, FN.page]] },
  { role: "Wash", hex: FN.wash, use: "Watercolour only, never behind text", checks: [] },
] satisfies { role: string; hex: string; use: string; checks: [string, string, string][] }[];

function ColourRoles() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {ROLES.map((r) => (
        <div key={r.role} className="bg-[#fbf7ec] p-3">
          <div className="relative h-12 sm:h-20" style={{ background: r.hex }}>
            <PencilFrame className="text-[#7d776b]" />
          </div>
          <p className={`${hand} mt-2 text-2xl font-semibold leading-none`}>{r.role}</p>
          <p className={`${serif} text-sm text-[#625e56]`}>{r.hex} · {r.use}</p>
          {r.checks.map(([label, fg, bg]) => (
            <p key={label} className={`${serif} text-sm`}>
              <span className="font-semibold">{ratio(fg, bg)}</span> <span className="text-[#625e56]">{label}</span>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------- 2. type roles ---------- */

const TYPE = [
  { role: "Display", spec: "Caveat 600 · 56 / 56", cls: `${hand} text-[56px] font-semibold leading-[1]`, sample: "Twelve Trails" },
  { role: "Heading", spec: "Caveat 600 · 36 / 40", cls: `${hand} text-[36px] font-semibold leading-[1.1]`, sample: laugavegur.name },
  { role: "Number", spec: "Crimson Pro 600 · 32 / 36", cls: `${serif} text-[32px] font-semibold leading-[1.1]`, sample: "54–55 km" },
  { role: "Body", spec: "Crimson Pro 400 · 18 / 28", cls: `${serif} text-[18px] leading-[28px] max-w-xl`, sample: laugavegur.why },
  { role: "Label", spec: "Caveat 400 · 22 / 26", cls: `${hand} text-[22px] leading-[26px]`, sample: "Best months · Jun–Sep" },
];

function TypeRoles() {
  return (
    <div className="divide-y divide-[#c9d3df] bg-[#fbf7ec] px-5">
      {TYPE.map((t) => (
        <div key={t.role} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:items-baseline">
          <div>
            <p className={`${hand} text-2xl font-semibold leading-none`}>{t.role}</p>
            <p className={`${serif} text-sm text-[#625e56]`}>{t.spec}</p>
          </div>
          <p className={`${t.cls} text-[#3d3a34]`}>{t.sample}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- 3. spacing and shape ---------- */

function SpacingShape() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Block title="Spacing" note="Seven steps, in px. Most gaps are 12 or 24.">
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48].map((s) => (
            <div key={s} className="text-center">
              <div className="bg-[#6f8a5b]/40" style={{ width: s, height: s }} />
              <p className={`${serif} mt-1 text-sm text-[#625e56]`}>{s}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Corners" note="Paper has almost none; tape has none.">
        <div className="flex flex-wrap items-center gap-6">
          <div className="text-center"><div className="h-14 w-20 rounded-[2px] border border-[#7d776b] bg-[#fbf7ec]" /><p className={`${serif} mt-1 text-sm text-[#625e56]`}>2px · cards, tabs</p></div>
          <div className="text-center"><DifficultyTape h={laugavegur} /><p className={`${serif} mt-2 text-sm text-[#625e56]`}>0 · torn tape</p></div>
          <div className="text-center"><div className="h-8 w-16 rounded-full border border-[#7d776b]" /><p className={`${serif} mt-1 text-sm text-[#625e56]`}>pill · toggle only</p></div>
        </div>
      </Block>
      <Block title="Borders" note="Lines are drawn, not ruled.">
        <div className="space-y-4">
          <div className="flex items-center gap-4"><span className="relative block h-10 w-28"><PencilFrame /></span><span className={`${serif} text-sm text-[#625e56]`}>Pencil line, 1.6px, slightly wobbly · controls</span></div>
          <div className="flex items-center gap-4"><span className="block h-10 w-28 border-b-2 border-[#7d776b]" /><span className={`${serif} text-sm text-[#625e56]`}>Ruled line, 2px · inputs, list rows</span></div>
          <div className="flex items-center gap-4"><span className="relative block h-10 w-28"><PencilFrame dashed /></span><span className={`${serif} text-sm text-[#625e56]`}>Dashed · disabled, never printed</span></div>
        </div>
      </Block>
      <Block title="Shadow" note="Paper on a desk: low and soft. Picked up on hover.">
        <div className="flex flex-wrap gap-8 pb-2 pt-2">
          <div className="h-20 w-32 bg-[#fbf7ec] shadow-[0_1px_2px_rgba(0,0,0,.12),0_8px_18px_rgba(60,45,20,.10)]"><p className={`${serif} p-2 text-sm text-[#625e56]`}>Resting</p></div>
          <div className="h-20 w-32 -translate-y-1 -rotate-[0.6deg] bg-[#fbf7ec] shadow-[0_2px_4px_rgba(0,0,0,.12),0_14px_26px_rgba(60,45,20,.16)]"><p className={`${serif} p-2 text-sm text-[#625e56]`}>Picked up</p></div>
        </div>
      </Block>
    </div>
  );
}

/* ---------- 4. components ---------- */

function Components() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Block title="Buttons and link" note="Moss is kept for the one primary action on a screen.">
        <div className="flex flex-wrap items-center gap-5">
          <PrimaryButton />
          <SecondaryButton />
          <NoteLink />
        </div>
      </Block>
      <Block title="Text input, select, search">
        <div className="grid gap-5 sm:grid-cols-2">
          <RuledInput id="fn-in-live" />
          <RuledSelect id="fn-sel-live" />
          <div className="sm:col-span-2"><SearchField id="fn-search-live" /></div>
        </div>
      </Block>
      <Block title="Checkboxes, radios, toggle">
        <div className="space-y-3">
          <TickBox defaultChecked label="Permit needed" />
          <TickBox label="Huts on the way" />
          <CircleRadio name="fn-length" options={["Day hike", "A few days", "A month"]} defaultValue="A few days" />
          <WashSwitch initial label="Show best months" />
          <WashSwitch label="One way only" />
        </div>
      </Block>
      <Block title="Tabs" note="Arrow keys move between them.">
        <IndexTabs
          tabs={["Overview", "Route", "When"]}
          panels={[
            <p key="o" className={`${serif} text-base leading-7`}>{laugavegur.why}</p>,
            <p key="r" className={`${serif} text-base leading-7`}>{laugavegur.start} to {laugavegur.end}, {laugavegur.route}.</p>,
            <p key="w" className={`${serif} text-base leading-7`}>{laugavegur.permit_note}</p>,
          ]}
        />
      </Block>
      <Block title="Filter chips" note="Tap to stick a strip of tape down; tap again to lift it.">
        <TapeChips options={["huts", "day hike", "permit", "Europe", "Asia"]} initial={["huts"]} />
      </Block>
      <Block title="Badges">
        <div className="flex flex-wrap items-center gap-6">
          <div className="[&_svg]:h-24 [&_svg]:w-auto"><PermitStamp /></div>
          <DifficultyTape h={laugavegur} />
          <span className="flex items-center gap-2"><CountBadge n={12} /><span className={`${hand} text-xl text-[#625e56]`}>trails</span></span>
        </div>
      </Block>
      <Block title="Card" note="One trail, clipped in. Hover picks it up.">
        <div className="pt-4"><TrailCard id="laugavegur" /></div>
      </Block>
      <Block title="List rows" note="Hover is a highlighter pass; the chosen row is ticked.">
        <div className="mb-2 flex items-center gap-2"><CountBadge n={4} /><span className={`${hand} text-xl text-[#625e56]`}>trails in Europe</span></div>
        <TrailRow id="tmb" />
        <TrailRow id="laugavegur" force="selected" />
        <TrailRow id="whw" />
        <TrailRow id="camino" />
      </Block>
      <Block title="Detail panel" note="Opens over the list when a row or card is chosen." className="lg:col-span-1">
        <DetailPanel id="laugavegur" />
      </Block>
      <Block title="Route progress" note="The walked part traced over; today circled.">
        <RouteProgress />
        <div className="mt-6 flex items-center gap-3">
          <FieldIcon name="boot" size={36} />
          <p className={`${serif} text-base text-[#625e56]`}>Used on a trail page to show where a day ends, not a live tracker.</p>
        </div>
      </Block>
    </div>
  );
}

/* ---------- 5. control states ---------- */

type Row = { name: string; render: (s: ControlState) => React.ReactNode | null };
const ROWS: Row[] = [
  { name: "Primary button", render: (s) => (s === "selected" ? null : <PrimaryButton force={s}>Open</PrimaryButton>) },
  { name: "Secondary button", render: (s) => (s === "selected" ? null : <SecondaryButton force={s}>Save</SecondaryButton>) },
  { name: "Link", render: (s) => (s === "selected" || s === "disabled" ? null : <NoteLink force={s}>Sources</NoteLink>) },
  { name: "Filter chip", render: (s) => <ChipSwatch force={s} /> },
  { name: "Tab", render: (s) => <TabSwatch force={s} /> },
  { name: "Checkbox", render: (s) => <TickBox force={s} label="huts" /> },
  { name: "Radio", render: (s) => <RadioSwatch force={s} label="4 days" /> },
  { name: "Toggle", render: (s) => <WashSwitch force={s} label="on" /> },
  { name: "Text input", render: (s) => (s === "pressed" || s === "selected" ? null : <div className="w-full max-w-36"><RuledInput force={s} id={`fn-in-${s}`} label="Trail" placeholder="name" /></div>) },
  { name: "Select", render: (s) => (s === "pressed" || s === "selected" ? null : <div className="w-full max-w-36"><RuledSelect force={s} id={`fn-sel-${s}`} /></div>) },
  { name: "Card", render: (s) => (s === "selected" || s === "disabled" ? null : <CardSwatch force={s} />) },
  { name: "List row", render: (s) => s === "disabled" ? <TrailRow compact id="inca-trail" force={s} note="closed Feb" /> : <TrailRow compact id="milford" force={s} /> },
];

const STATE_NOTES: Record<ControlState, string> = {
  rest: "Nothing is happening to it",
  hover: "The mouse is over it: the paper lifts",
  focus: "Reached with Tab: one ink pen stroke under it",
  pressed: "While being clicked: pressed into the page",
  selected: "Chosen, and stays chosen",
  disabled: "Can't be used right now: dashed, muted",
};

function ControlStates() {
  return (
    <div className="relative overflow-x-auto bg-[#fbf7ec] p-4">
      <table className="w-full min-w-[960px] table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-32" />
            {CONTROL_STATES.map((s) => (
              <th key={s} scope="col" className="pb-3 pr-3 text-left align-bottom">
                <span className={`${hand} block text-2xl font-semibold capitalize text-[#3d3a34]`}>{s}</span>
                <span className={`${serif} block text-xs font-normal italic leading-snug text-[#625e56]`}>{STATE_NOTES[s]}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.name} className="border-t border-[#c9d3df]">
              <th scope="row" className={`${hand} py-5 pr-4 text-left text-xl font-normal text-[#625e56]`}>{r.name}</th>
              {CONTROL_STATES.map((s) => (
                <td key={s} className="py-5 pr-4 align-middle">{r.render(s) ?? <span className={`${serif} text-[#625e56]`} aria-label="Not used">—</span>}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- page ---------- */

export default function FieldNotesSystem() {
  return (
    <main className={`${handFont.variable} ${serifFont.variable} min-h-screen bg-[#f7f1e3] text-[#3d3a34]`}>
      <FieldDefs />
      <style>{FIELD_KEYFRAMES + FIELD_FOCUS_CSS}</style>
      <div className="mx-auto max-w-6xl space-y-14 px-5 pb-24 pt-10">
        <header>
          <div className={`${serif} flex flex-wrap gap-x-6 text-base`}>
            <Link href="/" className="text-[#625e56] underline-offset-4 hover:text-[#3d3a34] hover:underline">← Hub</Link>
            <Link href="/mood-boards/field-notes/" className="text-[#2f4a6b] underline decoration-[#2f4a6b]/40 underline-offset-4 hover:decoration-[#2f4a6b]">Built from the Field Notes mood board →</Link>
          </div>
          <p className={`${serif} mt-8 text-sm uppercase tracking-[0.2em] text-[#625e56]`}>Design system · 1 of 3</p>
          <h1 className={`${hand} text-7xl font-semibold leading-none`}>Field Notes</h1>
          <p className={`${serif} mt-2 text-2xl italic`}>Handmade, Curious, Warm</p>
          <p className={`${serif} mt-3 max-w-2xl text-lg text-[#625e56]`}>
            Everything is something from a trail notebook: pencil lines that wobble, tape, stamps, ruled pages. No perfect shapes; moss is
            kept for the one thing to do next.
          </p>
        </header>
        <Section n={1} title="Colour roles" note="Contrast is computed from the hex values.">
          <ColourRoles />
        </Section>
        <Section n={2} title="Type roles" note="Caveat writes; Crimson Pro tells the facts.">
          <TypeRoles />
        </Section>
        <Section n={3} title="Spacing and shape" note="Paper, pencil, tape.">
          <SpacingShape />
        </Section>
        <Section n={4} title="Components" note="Everything the site needs, filled with real trails. Try them.">
          <Components />
        </Section>
        <Section n={5} title="Control states" note="Rest, hover, focus, pressed, selected, disabled. A dash means the state doesn't apply.">
          <ControlStates />
        </Section>
        <Section n={6} title="UI states" note="Empty, loading, error, success.">
          <UIStates />
        </Section>
      </div>
    </main>
  );
}
