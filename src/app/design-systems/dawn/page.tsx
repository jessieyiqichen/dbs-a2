import type { Metadata } from "next";
import Link from "next/link";
import { Libre_Franklin, Old_Standard_TT } from "next/font/google";
import { CONTROL_STATES, ratio, type ControlState } from "@/lib/contrast";
import { hikes } from "@/data/hikes";
import { PlateDefs } from "@/components/dawn/PlateArt";
import { DayPlates, EmbossStamp, PLATE_KEYFRAMES } from "@/components/dawn/PlateUI";
import { DAWN_FOCUS_CSS, DW, caps, display, ui } from "@/components/dawn/ds/tokens";
import { CatalogueSearch, CountBadge, MountInput, MountSelect, PlateCheck, PlateLink, PlateRadio, PrimaryButton, RadioSwatch, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { ChipSwatch, PlateChips, PlateTabs, PlateToggle, TabSwatch } from "@/components/dawn/ds/Interactive";
import { CardSwatch, CatalogueRow, DetailPanel, PrintCard, UIStates } from "@/components/dawn/ds/Pieces";

const displayFont = Old_Standard_TT({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--dw-display" });
const uiFont = Libre_Franklin({ subsets: ["latin"], weight: ["400", "600"], variable: "--dw-ui" });

export const metadata: Metadata = { title: "Dawn · Design system · Twelve Trails" };

const milford = hikes.find((h) => h.id === "milford")!;

/* ---------- scaffolding ---------- */

function Section({ n, title, note, children }: { n: number; title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#22333a]/20 pt-8">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="self-center"><CountBadge n={n} /></span>
        <h2 className={`${display} text-4xl leading-none`}>{title}</h2>
        <p className={`${display} text-lg italic text-[#4f5f66]`}>{note}</p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Block({ title, note, children, className = "" }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#f6f9f7] p-5 ${className}`}>
      <p className={`${caps} text-[#22333a]`}>{title}</p>
      {note && <p className={`${display} mt-1 text-base italic text-[#4f5f66]`}>{note}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

/* ---------- 1. colour roles ---------- */

const ROLES = [
  { role: "Background", hex: DW.page, use: "The pale sky of the prints", checks: [] as [string, string, string][] },
  { role: "Surface", hex: DW.surface, use: "The mount a print sits on", checks: [] },
  { role: "Text", hex: DW.text, use: "Key-plate ink, never black", checks: [["on background", DW.text, DW.page], ["on surface", DW.text, DW.surface]] },
  { role: "Muted text", hex: DW.muted, use: "Captions, meta, placeholders", checks: [["on background", DW.muted, DW.page], ["on surface", DW.muted, DW.surface]] },
  { role: "Border", hex: DW.border, use: "Field and control edges", checks: [["on background (3:1 needed)", DW.border, DW.page]] },
  { role: "Accent", hex: DW.accent, use: "Loch, for the one primary action", checks: [["mount text on it", DW.surface, DW.accent]] },
  { role: "Tints", hex: DW.celadon, use: "Celadon, aqua, loch, stone: plates only, key ink on top", checks: [["key ink on celadon", DW.text, DW.celadon], ["key ink on loch", DW.text, DW.loch]] },
] satisfies { role: string; hex: string; use: string; checks: [string, string, string][] }[];

function ColourRoles() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ROLES.map((r) => (
        <div key={r.role} className="bg-[#f6f9f7] p-3">
          {r.role === "Tints" ? (
            <div className="grid h-20 grid-cols-4 border border-[#22333a]">
              {[DW.celadon, DW.aqua, DW.loch, DW.stone].map((c) => <span key={c} style={{ background: c }} />)}
            </div>
          ) : (
            <div className="h-20 border border-[#22333a] shadow-[3px_3px_0_0_#c9dcdc]" style={{ background: r.hex }} />
          )}
          <p className={`${display} mt-3 text-xl leading-none`}>{r.role}</p>
          <p className={`${ui} mt-1 text-xs text-[#4f5f66]`}>{r.role === "Tints" ? `${DW.celadon} ${DW.aqua} ${DW.loch} ${DW.stone}` : r.hex} · {r.use}</p>
          {r.checks.map(([label, fg, bg]) => (
            <p key={label} className={`${ui} text-xs`}>
              <span className="font-semibold">{ratio(fg, bg)}</span> <span className="text-[#4f5f66]">{label}</span>
            </p>
          ))}
        </div>
      ))}
      <div className="bg-[#f6f9f7] p-3">
        <p className={`${display} text-xl leading-none`}>Temperature</p>
        <p className={`${ui} mt-2 text-sm leading-relaxed text-[#4f5f66]`}>Only the cool half of the prints: sky, water, ice. Warm earth tones belong to Field Notes, so the two never read alike.</p>
      </div>
    </div>
  );
}

/* ---------- 2. type roles ---------- */

const TYPE = [
  { role: "Display", spec: "Old Standard 400 · 64 / 64", cls: `${display} text-[64px] leading-[1]`, sample: "Twelve Trails" },
  { role: "Heading", spec: "Old Standard 400 · 36 / 40", cls: `${display} text-[36px] leading-[1.1]`, sample: milford.name },
  { role: "Caption", spec: "Old Standard 400 · 13 / 18, capitals, +0.12em", cls: `${display} text-[13px] uppercase leading-[18px] tracking-[0.12em]`, sample: "No. 05. Milford Track, New Zealand." },
  { role: "Body", spec: "Libre Franklin 400 · 17 / 27", cls: `${ui} max-w-xl text-[17px] leading-[27px]`, sample: milford.why },
  { role: "Label", spec: "Libre Franklin 600 · 12 / 16, capitals, +0.16em", cls: `${ui} text-[12px] font-semibold uppercase leading-[16px] tracking-[0.16em]`, sample: "Best Nov – Apr" },
];

function TypeRoles() {
  return (
    <div className="divide-y divide-[#22333a]/15 bg-[#f6f9f7] px-5">
      {TYPE.map((t) => (
        <div key={t.role} className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr] sm:items-baseline">
          <div>
            <p className={`${display} text-xl leading-none`}>{t.role}</p>
            <p className={`${ui} mt-1 text-xs text-[#4f5f66]`}>{t.spec}</p>
          </div>
          <p className={`${t.cls} text-[#22333a]`}>{t.sample}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- 3. spacing and shape ---------- */

function SpacingShape() {
  const note = `${ui} mt-1 text-xs text-[#4f5f66]`;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Block title="Spacing" note="Seven steps, in px. Generous: the prints need air.">
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48].map((s) => (
            <div key={s} className="text-center">
              <div className="border border-[#22333a] bg-[#c9dcdc]" style={{ width: s, height: s }} />
              <p className={note}>{s}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Corners" note="Square, like a cut print. Only radios are round.">
        <div className="flex flex-wrap items-center gap-6">
          <div><div className="h-14 w-20 border border-[#22333a] bg-[#f6f9f7]" /><p className={note}>0 · everything</p></div>
          <div><div className="h-5 w-5 rounded-full border-[1.5px] border-[#22333a]" /><p className={note}>round · radios</p></div>
        </div>
      </Block>
      <Block title="Borders" note="Key lines, fine and even.">
        <div className="space-y-3">
          <div className="flex items-center gap-4"><span className="block h-10 w-28 border-[3px] border-[#22333a]" /><span className={note}>3px key edge · around every print</span></div>
          <div className="flex items-center gap-4"><span className="block h-10 w-28 border border-[#6f8287]" /><span className={note}>1px border · fields</span></div>
          <div className="flex items-center gap-4"><span className="block h-10 w-28 border border-dashed border-[#4f5f66]" /><span className={note}>Dashed · disabled, unprinted</span></div>
        </div>
      </Block>
      <Block title="Shadow" note="No soft shadows. Depth is a tint plate printed off register.">
        <div className="flex flex-wrap gap-8">
          <div><div className="h-16 w-28 border border-[#22333a] bg-[#f6f9f7] shadow-[3px_3px_0_0_#8eaaa6]" /><p className={note}>Rest · plate 3px off</p></div>
          <div><div className="h-16 w-28 border border-[#22333a] bg-[#f6f9f7]" /><p className={note}>Hover · in register</p></div>
          <div><div className="h-16 w-28 border border-[#22333a] bg-[#c9dcdc] shadow-[inset_0_2px_4px_rgba(34,51,58,.3)]" /><p className={note}>Pressed · ink pressed in</p></div>
        </div>
      </Block>
    </div>
  );
}

/* ---------- 4. components ---------- */

function Components() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Block title="Buttons and link" note="Loch is kept for the one primary action on a screen.">
        <div className="flex flex-wrap items-center gap-5">
          <PrimaryButton />
          <SecondaryButton />
          <PlateLink />
        </div>
      </Block>
      <Block title="Text input, select, search">
        <div className="grid gap-4 sm:grid-cols-2">
          <MountInput id="dw-in-live" />
          <MountSelect id="dw-sel-live" />
          <div className="sm:col-span-2"><CatalogueSearch id="dw-search-live" /></div>
        </div>
      </Block>
      <Block title="Checkboxes, radios, toggle">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-6">
            <PlateCheck defaultChecked label="Huts on the way" />
            <PlateCheck label="Permit needed" />
          </div>
          <PlateRadio name="dw-length" options={["Day hike", "A few days", "A month"]} defaultValue="A few days" />
          <div className="flex flex-wrap gap-6">
            <PlateToggle initial label="Show sunrise times" />
            <PlateToggle label="One way only" />
          </div>
        </div>
      </Block>
      <Block title="Tabs" note="Arrow keys move between them.">
        <PlateTabs
          tabs={["Overview", "Route", "When to go"]}
          panels={[
            <p key="o">{milford.why}</p>,
            <p key="r">{milford.start} to {milford.end}, {milford.route}.</p>,
            <p key="w">{milford.permit_note}</p>,
          ]}
        />
      </Block>
      <Block title="Filter chips" note="Each has its own tint plate. Tap to print it solid.">
        <PlateChips
          options={[
            { label: "Lakes", tint: DW.loch, on: true },
            { label: "Huts", tint: DW.stone },
            { label: "Glaciers", tint: DW.aqua },
            { label: "Forest", tint: DW.celadon, on: true },
            { label: "Oceania", tint: DW.aqua },
          ]}
        />
      </Block>
      <Block title="Badges">
        <div className="flex flex-wrap items-center gap-6">
          <div className="[&_svg]:h-24 [&_svg]:w-24"><EmbossStamp /></div>
          <span className={`${caps} border border-[#22333a] bg-[#c3d6c4] px-2.5 py-1 text-[#22333a]`}>Great Walk</span>
          <span className="flex items-center gap-2"><CountBadge n={12} /><span className={`${ui} text-sm text-[#4f5f66]`}>trails</span></span>
        </div>
      </Block>
      <Block title="Card" note="A mounted print. Hover brings the colour up.">
        <PrintCard id="milford" photo="/moodboards/dawn/clinton-river.jpg" plateNote="Clinton River, the track's first valley · Photoglob Co., c. 1890–1900" />
      </Block>
      <div className="space-y-4">
        <Block title="List rows" note="A page of the print catalogue. The chosen row gets a celadon plate.">
          <div className="mb-2 flex items-center gap-2"><CountBadge n={2} /><span className={`${ui} text-sm text-[#4f5f66]`}>trails in Oceania</span></div>
          <CatalogueRow id="milford" force="selected" />
          <CatalogueRow id="tongariro" />
        </Block>
        <Block title="Day progress" note="One plate per day walked; today is still a touch off.">
          <DayPlates day={2} of={4} />
        </Block>
      </div>
      <Block title="Detail panel" note="Opens over the list when a card or row is chosen." className="lg:col-span-2">
        <div className="max-w-xl"><DetailPanel id="milford" /></div>
      </Block>
    </div>
  );
}

/* ---------- 5. control states ---------- */

const STATE_NOTES: Record<ControlState, string> = {
  rest: "Nothing is happening to it: the plate sits a little off",
  hover: "The mouse is over it: plates come into register",
  focus: "Reached with Tab: crop marks at the corners",
  pressed: "While being clicked: sinks, ink pressed in",
  selected: "Chosen, and stays chosen: a tint plate laid under",
  disabled: "Can't be used right now: unprinted, dashed",
};

type Row = { name: string; render: (s: ControlState) => React.ReactNode | null };
const ROWS: Row[] = [
  { name: "Primary button", render: (s) => (s === "selected" ? null : <PrimaryButton force={s}>See</PrimaryButton>) },
  { name: "Secondary button", render: (s) => (s === "selected" ? null : <SecondaryButton force={s}>Later</SecondaryButton>) },
  { name: "Link", render: (s) => (s === "selected" || s === "disabled" ? null : <PlateLink force={s}>Sources</PlateLink>) },
  { name: "Filter chip", render: (s) => <ChipSwatch force={s} /> },
  { name: "Tab", render: (s) => <TabSwatch force={s} /> },
  { name: "Checkbox", render: (s) => <PlateCheck force={s} label="Huts" /> },
  { name: "Radio", render: (s) => <RadioSwatch force={s} label="4 days" /> },
  { name: "Toggle", render: (s) => <PlateToggle force={s} label="On" /> },
  { name: "Text input", render: (s) => (s === "pressed" || s === "selected" ? null : <div className="max-w-36"><MountInput force={s} id={`dw-in-${s}`} label="Trail" placeholder="name" /></div>) },
  { name: "Select", render: (s) => (s === "pressed" || s === "selected" ? null : <div className="max-w-36"><MountSelect force={s} id={`dw-sel-${s}`} /></div>) },
  { name: "Card", render: (s) => (s === "selected" || s === "disabled" ? null : <CardSwatch force={s} />) },
  { name: "List row", render: (s) => (s === "disabled" ? <CatalogueRow compact id="inca-trail" force={s} note="closed Feb" /> : <CatalogueRow compact id="milford" force={s} />) },
];

function ControlStates() {
  return (
    <div className="relative overflow-x-auto bg-[#f6f9f7] p-4">
      <table className="w-full min-w-[960px] table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-32" />
            {CONTROL_STATES.map((s) => (
              <th key={s} scope="col" className="pb-3 pr-3 text-left align-bottom">
                <span className={`${display} block text-xl font-normal capitalize text-[#22333a]`}>{s}</span>
                <span className={`${ui} block text-[11px] font-normal leading-snug text-[#4f5f66]`}>{STATE_NOTES[s]}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.name} className="border-t border-[#22333a]/15">
              <th scope="row" className={`${ui} py-5 pr-4 text-left text-sm font-normal text-[#4f5f66]`}>{r.name}</th>
              {CONTROL_STATES.map((s) => (
                <td key={s} className="py-5 pr-4 align-middle">{r.render(s) ?? <span className={`${ui} text-[#4f5f66]`} aria-label="Not used">—</span>}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- page ---------- */

export default function DawnSystem() {
  return (
    <main className={`${displayFont.variable} ${uiFont.variable} min-h-screen font-[family-name:var(--dw-ui)] text-[#22333a] [font-variant-numeric:lining-nums]`} style={{ background: "linear-gradient(180deg, #e6edeb 0%, #eaf0ee 45%, #f0f5f3 100%)" }}>
      <PlateDefs />
      <style>{PLATE_KEYFRAMES + DAWN_FOCUS_CSS}</style>
      <div className="mx-auto max-w-6xl space-y-14 px-5 pb-24 pt-10">
        <header>
          <div className={`${ui} flex flex-wrap gap-x-6 text-sm`}>
            <Link href="/" className="text-[#4f5f66] underline-offset-4 hover:text-[#22333a] hover:underline">← Hub</Link>
            <Link href="/mood-boards/dawn/" className="font-semibold text-[#22333a] underline decoration-[#8eaaa6] decoration-2 underline-offset-4 hover:decoration-[#22333a]">Built from the Dawn mood board →</Link>
          </div>
          <p className={`${caps} mt-8 text-[#4f5f66]`}>Design system · 2 of 3</p>
          <h1 className={`${display} mt-2 text-8xl leading-none`}>Dawn</h1>
          <p className={`${display} mt-3 text-3xl italic`}>Quiet, Light, Hopeful</p>
          <p className={`${ui} mt-3 max-w-2xl text-base leading-relaxed text-[#4f5f66]`}>
            Everything is made the way a photochrom was: flat colour plates laid slightly off register, a fine key line on top. Interaction
            brings the plates into register. Loch is kept for the one thing to do next.
          </p>
        </header>
        <Section n={1} title="Colour roles" note="Contrast is computed from the hex values.">
          <ColourRoles />
        </Section>
        <Section n={2} title="Type roles" note="Old Standard captions the prints; Libre Franklin does the work.">
          <TypeRoles />
        </Section>
        <Section n={3} title="Spacing and shape" note="Square, fine lines, depth from plates.">
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
