import type { Metadata } from "next";
import { Libre_Franklin, Old_Standard_TT } from "next/font/google";
import { CONTROL_STATES, ratio, type ControlState } from "@/lib/contrast";
import { hikes } from "@/data/hikes";
import { PLATE_ICON_NAMES, PlateDefs, PlateIcon, type PlateIconName } from "@/components/dawn/PlateArt";
import { DayPlates, EmbossStamp, PLATE_KEYFRAMES } from "@/components/dawn/PlateUI";
import { DAWN_FIELD, DAWN_FOCUS_CSS, DW, caps, display, ui } from "@/components/dawn/ds/tokens";
import { CatalogueSearch, CountBadge, MountInput, MountSelect, PlateCheck, PlateLink, PlateRadio, PrimaryButton, RadioSwatch, SecondaryButton } from "@/components/dawn/ds/Primitives";
import { ChipSwatch, PlateChips, PlateTabs, PlateToggle, RouteMap, TabSwatch } from "@/components/dawn/ds/Interactive";
import { CardSwatch, CatalogueRow, DetailPanel, UIStates } from "@/components/dawn/ds/Pieces";
import { HeroPlate, NeighbourLink, PlateThumb, SeasonStrip, StopSwatch, routeNodes } from "@/components/dawn/ds/Guide";
import { seasons } from "@/data/seasons";
import { Gallery } from "@/components/dawn/ds/Viewer";
import { AddToListDemo, CardDemo, SidePanelDemo } from "@/components/dawn/ds/Demos";
import { t12, t12caption, t14, t17, t24, t48, t96 } from "@/components/dawn/ds/type";
import { routes } from "@/data/stops";
import rawPhotos from "@/data/trailPhotos.json";
import { TonedPhoto, type TrailPhoto } from "@/components/dawn/Toned";

const displayFont = Old_Standard_TT({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--dw-display" });
const uiFont = Libre_Franklin({ subsets: ["latin"], weight: ["400", "600"], variable: "--dw-ui" });

export const metadata: Metadata = { title: "Dawn · Design system · Twelve Trails" };

const milford = hikes.find((h) => h.id === "milford")!;
const photos = rawPhotos as Record<string, TrailPhoto[]>;
const plates = photos.milford;
const cover = plates.find((p) => p.cover) ?? plates[0];

/* ---------- scaffolding ---------- */

function Section({ n, title, note, children }: { n: number; title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-dw-ink/20 pt-8">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="self-center"><CountBadge n={n} /></span>
        <h2 className={`${display} text-4xl leading-none`}>{title}</h2>
        <p className={`${display} text-lg italic text-dw-muted`}>{note}</p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Block({ title, note, children, className = "" }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-dw-mount p-5 ${className}`}>
      <p className={`${caps} text-dw-ink`}>{title}</p>
      {note && <p className={`${display} mt-1 text-base italic text-dw-muted`}>{note}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

/* ---------- 1. colour roles ---------- */

const ROLES = [
  { role: "Background", hex: DW.page, use: "A white page for reading", checks: [] as [string, string, string][] },
  { role: "Dawn field", hex: DW.dawnTop, use: "Sky to first light, behind the opening and the bar", checks: [["key ink at the top", DW.text, DW.dawnTop], ["key ink at the horizon", DW.text, DW.dawnLow]] },
  { role: "Surface", hex: DW.surface, use: "The mount a print sits on", checks: [] },
  { role: "Text", hex: DW.text, use: "Key-plate ink, never black", checks: [["on background", DW.text, DW.page], ["on surface", DW.text, DW.surface]] },
  { role: "Muted text", hex: DW.muted, use: "Captions, meta, placeholders", checks: [["on background", DW.muted, DW.page], ["on surface", DW.muted, DW.surface]] },
  { role: "Border", hex: DW.border, use: "Field and control edges", checks: [["on background (3:1 needed)", DW.border, DW.page]] },
  { role: "Accent", hex: DW.accent, use: "Loch, for the one primary action", checks: [["mount text on it", DW.surface, DW.accent]] },
  { role: "Tints", hex: DW.sun, use: "Sun (selected, best), sky (hover), lake (pressed), pine and heather (chips): plates only, key ink on top", checks: [["key ink on sun", DW.text, DW.sun], ["key ink on lake", DW.text, DW.lake]] },
] satisfies { role: string; hex: string; use: string; checks: [string, string, string][] }[];

function ColourRoles() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {ROLES.map((r) => (
        <div key={r.role} className="bg-dw-mount p-3">
          {r.role === "Tints" ? (
            <div className="grid h-12 grid-cols-5 border border-dw-ink sm:h-20">
              {[DW.sun, DW.sky, DW.lake, DW.pine, DW.heather].map((c) => <span key={c} style={{ background: c }} />)}
            </div>
          ) : r.role === "Dawn field" ? (
            <div className="h-12 border border-dw-ink sm:h-20" style={{ background: DAWN_FIELD }} />
          ) : (
            <div className="h-12 border border-dw-ink shadow-[3px_3px_0_0_var(--color-dw-lake)] sm:h-20" style={{ background: r.hex }} />
          )}
          <p className={`${display} mt-3 text-xl leading-none`}>{r.role}</p>
          <p className={`${ui} mt-1 text-xs text-dw-muted`}>{r.role === "Tints" ? `${DW.sun} ${DW.sky} ${DW.lake} ${DW.pine} ${DW.heather}` : r.role === "Dawn field" ? `${DW.dawnTop} → ${DW.dawnLow}` : r.hex} · {r.use}</p>
          {r.checks.map(([label, fg, bg]) => (
            <p key={label} className={`${ui} text-xs`}>
              <span className="font-semibold">{ratio(fg, bg)}</span> <span className="text-dw-muted">{label}</span>
            </p>
          ))}
        </div>
      ))}
      <div className="bg-dw-mount p-3">
        <p className={`${display} text-xl leading-none`}>Temperature</p>
        <p className={`${ui} mt-2 text-sm leading-relaxed text-dw-muted`}>Sky to first light: blue fields and white pages, gold only for what is chosen. No kraft, cream or moss: those belong to Field Notes, so the two never read alike.</p>
      </div>
    </div>
  );
}

/* ---------- 2. type roles ---------- */

const TYPE = [
  { role: "Title · 96", spec: "Old Standard 400 · 96 / 91 (112 on wide screens, 40 on phones) · once per page", cls: t96, sample: "Twelve Trails" },
  { role: "Section · 48", spec: "Old Standard 400 · 48 / 50 (32 on phones) · section titles, a walk's name on its page", cls: t48, sample: milford.name },
  { role: "Name · 24", spec: "Old Standard 400 · 24 / 29 (20 on phones) · walk names on cards, numbers, lead lines", cls: t24, sample: "53.5 km · 4 days" },
  { role: "Reading · 17", spec: "Libre Franklin 400 · 17 / 27 (16 / 25 on phones) · everything read as text", cls: `${t17} max-w-xl`, sample: milford.why },
  { role: "Note · 14", spec: "Libre Franklin 400 · 14 / 21 · captions, credits, chips, tabs", cls: t14, sample: "Clinton River · photochrom, Photoglob Co., c. 1890–1900" },
  { role: "Label · 12", spec: "Libre Franklin 600 · 12 / 16, capitals, +0.16em · labels and buttons", cls: t12, sample: "Best months" },
  { role: "Caption · 12", spec: "Old Standard 400 · 12 / 16, capitals, +0.14em · the printed caption", cls: t12caption, sample: "No. 05. New Zealand" },
];

function TypeRoles() {
  return (
    <div className="divide-y divide-dw-ink/15 bg-dw-mount px-5">
      {TYPE.map((t) => (
        <div key={t.role} className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr] sm:items-baseline">
          <div>
            <p className={`${display} text-xl leading-none`}>{t.role}</p>
            <p className={`${ui} mt-1 text-xs text-dw-muted`}>{t.spec}</p>
          </div>
          <p className={`${t.cls} text-dw-ink`}>{t.sample}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- 3. spacing and shape ---------- */

function SpacingShape() {
  const note = `${ui} mt-1 text-xs text-dw-muted`;
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Block title="Spacing" note="Seven steps, in px. Generous: the prints need air.">
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48].map((s) => (
            <div key={s} className="text-center">
              <div className="border border-dw-ink bg-dw-sky" style={{ width: s, height: s }} />
              <p className={note}>{s}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Corners" note="Square, like a cut print. Only radios are round.">
        <div className="flex flex-wrap items-center gap-6">
          <div><div className="h-14 w-20 border border-dw-ink bg-dw-mount" /><p className={note}>0 · everything</p></div>
          <div><div className="h-5 w-5 rounded-full border-[1.5px] border-dw-ink" /><p className={note}>round · radios</p></div>
        </div>
      </Block>
      <Block title="Borders" note="Key lines, fine and even.">
        <div className="space-y-3">
          <div className="flex items-center gap-4"><span className="block h-10 w-28 border-[3px] border-dw-ink" /><span className={note}>3px key edge · around every print</span></div>
          <div className="flex items-center gap-4"><span className="block h-10 w-28 border border-dw-border" /><span className={note}>1px border · fields</span></div>
          <div className="flex items-center gap-4"><span className="block h-10 w-28 border border-dashed border-dw-muted" /><span className={note}>Dashed · disabled, unprinted</span></div>
        </div>
      </Block>
      <Block title="Shadow" note="No soft shadows. Depth is a tint plate printed off register.">
        <div className="flex flex-wrap gap-8">
          <div><div className="h-16 w-28 border border-dw-ink bg-dw-mount shadow-[3px_3px_0_0_var(--color-dw-lake)]" /><p className={note}>Rest · plate 3px off</p></div>
          <div><div className="h-16 w-28 border border-dw-ink bg-dw-mount" /><p className={note}>Hover · in register</p></div>
          <div><div className="h-16 w-28 border border-dw-ink bg-dw-sky shadow-[inset_0_2px_4px_rgba(34,51,58,.3)]" /><p className={note}>Pressed · ink pressed in</p></div>
        </div>
      </Block>
    </div>
  );
}

/* ---------- 4. components ---------- */

// Where the site puts each icon. Cloud waits for a stop that is truly cloud forest by name.
const ICON_USE: Partial<Record<PlateIconName, string>> = {
  boot: "Distance · route start",
  calendar: "Days",
  mountain: "High point · passes, summits",
  compass: "Filter: where · junctions",
  clock: "Filter: how long",
  permit: "Filter: no permit",
  camera: "Plates · viewpoints",
  sunrise: "Best months",
  hut: "Huts, refuges, guesthouses",
  lake: "Lakes, glaciers",
  waterfall: "Waterfalls",
  bridge: "Bridges",
  tent: "Camps",
  pine: "Forests",
  map: "Towns, villages, sites",
};

function Icons() {
  return (
    <ul className="grid grid-cols-4 gap-x-3 gap-y-4 sm:grid-cols-8">
      {PLATE_ICON_NAMES.map((n) => (
        <li key={n} className="flex flex-col items-center text-center">
          <PlateIcon name={n} size={40} />
          <span className={`${ui} mt-1 text-xs font-semibold text-dw-ink`}>{n}</span>
          <span className={`${ui} text-[11px] leading-tight text-dw-muted ${ICON_USE[n] ? "" : "italic"}`}>{ICON_USE[n] ?? "not on the site yet"}</span>
        </li>
      ))}
    </ul>
  );
}

function Components() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Block title="Buttons and links" note="Loch is kept for the one primary action on a screen. Chosen, a button gives the loch up.">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-5">
            <AddToListDemo />
            <SecondaryButton>Later</SecondaryButton>
            <SecondaryButton small>Clear all</SecondaryButton>
            <SecondaryButton small selected>On my list</SecondaryButton>
          </div>
          <div className="flex flex-wrap items-baseline gap-6">
            <PlateLink>Read the route</PlateLink>
            <PlateLink size="note">wikipedia · Milford Track</PlateLink>
            <PlateLink size="name">Twelve Trails</PlateLink>
          </div>
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
            { label: "Lakes", tint: DW.lake, on: true },
            { label: "Huts", tint: DW.heather },
            { label: "Glaciers", tint: DW.sky },
            { label: "Forest", tint: DW.pine, on: true },
            { label: "Oceania", tint: DW.sky },
          ]}
        />
      </Block>
      <Block title="Icons" note="Drawn like the prints: tint plates a little off register under a fine key line. Each sits beside a word, never alone." className="lg:col-span-2">
        <Icons />
      </Block>
      <Block title="Badges">
        <div className="flex flex-wrap items-center gap-6">
          <div className="[&_svg]:h-24 [&_svg]:w-24"><EmbossStamp /></div>
          <span className={`${caps} border border-dw-ink bg-dw-pine px-2.5 py-1 text-dw-ink`}>Great Walk</span>
          <span className="flex items-center gap-2"><CountBadge n={12} /><span className={`${ui} text-sm text-dw-muted`}>trails</span></span>
        </div>
      </Block>
      <Block title="Card" note="A mounted print; the print and name open the walk. The list button sits outside the link.">
        <div className="max-w-sm"><CardDemo id="milford" photo={cover} /></div>
      </Block>
      <div className="space-y-4">
        <Block title="List rows" note="A page of the print catalogue. The chosen row gets a pine plate.">
          <div className="mb-2 flex items-center gap-2"><CountBadge n={2} /><span className={`${ui} text-sm text-dw-muted`}>trails in Oceania</span></div>
          <CatalogueRow id="milford" force="selected" />
          <CatalogueRow id="tongariro" />
        </Block>
        <Block title="Day progress" note="One plate per day walked; today is still a touch off.">
          <DayPlates day={2} of={4} />
        </Block>
      </div>
      <Block title="Photo: loading, shown, failed" note="Every photo prints its plates while it loads, sky first; the colour fades in once it arrives; a photo that fails says so in the frame." className="lg:col-span-2">
        <div className="grid grid-cols-3 gap-3">
          {(["loading", "ready", "error"] as const).map((st) => (
            <figure key={st} className="m-0">
              <TonedPhoto photo={cover} sizes="300px" force={st === "ready" ? undefined : st} className="aspect-[4/3] border-[3px] border-dw-ink" />
              <figcaption className={`${ui} mt-1 text-xs text-dw-muted`}>{st === "loading" ? "Loading" : st === "ready" ? "Shown" : "Failed to load"}</figcaption>
            </figure>
          ))}
        </div>
      </Block>
      <Block title="Hero plate" note="The large print on a walk's page. It is the button to every plate.">
        <div className="relative"><HeroPlate photo={cover} count={plates.length} label={`See all ${plates.length} plates of Milford Track`} /></div>
      </Block>
      <div className="space-y-4">
        <Block title="Plate thumbnails" note="Small prints that open the viewer. The plate on view is selected.">
          <div className="grid grid-cols-2 gap-3">
            <PlateThumb photo={plates[0]} n={1} label={`Plate 1: ${plates[0].place}`} />
            <PlateThumb photo={plates[1]} n={2} selected label={`Plate 2: ${plates[1].place}`} />
          </div>
        </Block>
        <Block title="Next-walk link" note="The walks either side, at the foot of a walk's page.">
          <NeighbourLink href="#next" label="Next walk →" name="Tongariro Alpine Crossing" photo={photos.tongariro[0]} />
        </Block>
      </div>
      <Block title="Plates viewer" note="Every photograph of a walk, in route order. Opens as a dialog: Esc or Close shuts it, arrow keys move." className="lg:col-span-2">
        <Gallery
          photos={plates}
          start={1}
          title={
            <>
              <p className={`${t12caption} text-dw-muted`}>No. 05. New Zealand</p>
              <p className={`${t48} mt-2`}>{milford.name}</p>
            </>
          }
        />
      </Block>
      <Block title="Route map" note="Along the way: one line through every stop's icon; choose a stop to read about it. Arrow keys move.">
        <RouteMap nodes={routeNodes(milford, routes.milford)} idPrefix="ds-route" />
      </Block>
      <Block title="Season plates and stamp" note="A plate per month: best printed deep with a rule beneath, possible a pale wash, closed left unprinted (dashed). One line of words on top; the reasons wait behind Why. Neither is a control.">
        <div className="flex flex-wrap items-start gap-6">
          <div className="min-w-0 flex-1"><SeasonStrip season={seasons.milford} /></div>
          <div className="[&_svg]:h-24 [&_svg]:w-24"><EmbossStamp text="Permit needed" uid="ds-stamp" /></div>
        </div>
      </Block>
      <Block title="Side panel" note="Slides in from the right over a dimmed page; Esc, Close or a click outside shuts it, and focus returns to the button. The site uses it for My list.">
        <SidePanelDemo />
      </Block>
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
  { name: "Primary button", render: (s) => <PrimaryButton force={s}>{s === "selected" ? "On list" : "Add"}</PrimaryButton> },
  { name: "Secondary button", render: (s) => <SecondaryButton force={s} small>{s === "selected" ? "On list" : "My list"}</SecondaryButton> },
  { name: "Link", render: (s) => (s === "selected" || s === "disabled" ? null : <PlateLink force={s}>Sources</PlateLink>) },
  { name: "Filter chip", render: (s) => <ChipSwatch force={s} /> },
  { name: "Tab", render: (s) => <TabSwatch force={s} /> },
  { name: "Checkbox", render: (s) => <PlateCheck force={s} label="Huts" /> },
  { name: "Radio", render: (s) => <RadioSwatch force={s} label="4 days" /> },
  { name: "Toggle", render: (s) => <PlateToggle force={s} label="On" /> },
  { name: "Text input", render: (s) => (s === "pressed" || s === "selected" ? null : <div className="max-w-36"><MountInput force={s} id={`dw-in-${s}`} label="Trail" placeholder="name" /></div>) },
  { name: "Select", render: (s) => (s === "pressed" || s === "selected" ? null : <div className="max-w-36"><MountSelect force={s} id={`dw-sel-${s}`} /></div>) },
  { name: "Card", render: (s) => (s === "selected" || s === "disabled" ? null : <CardSwatch force={s} />) },
  { name: "Route stop", render: (s) => (s === "disabled" ? null : <StopSwatch force={s} />) },
  { name: "Plate thumbnail", render: (s) => (s === "disabled" ? null : <div className="max-w-32"><PlateThumb force={s} photo={plates[0]} n={1} /></div>) },
  { name: "List row", render: (s) => (s === "disabled" ? <CatalogueRow compact id="inca-trail" force={s} note="closed Feb" /> : <CatalogueRow compact id="milford" force={s} />) },
];

function ControlStates() {
  return (
    <div className="relative overflow-x-auto bg-dw-mount p-4">
      <table className="w-full min-w-[960px] table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-32" />
            {CONTROL_STATES.map((s) => (
              <th key={s} scope="col" className="pb-3 pr-3 text-left align-bottom">
                <span className={`${display} block text-xl font-normal capitalize text-dw-ink`}>{s}</span>
                <span className={`${ui} block text-[11px] font-normal leading-snug text-dw-muted`}>{STATE_NOTES[s]}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.name} className="border-t border-dw-ink/15">
              <th scope="row" className={`${ui} py-5 pr-4 text-left text-sm font-normal text-dw-muted`}>{r.name}</th>
              {CONTROL_STATES.map((s) => (
                <td key={s} className="py-5 pr-4 align-middle">{r.render(s) ?? <span className={`${ui} text-dw-muted`} aria-label="Not used">—</span>}</td>
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
    <main className={`${displayFont.variable} ${uiFont.variable} min-h-screen font-[family-name:var(--dw-ui)] text-dw-ink [font-variant-numeric:lining-nums]`} style={{ background: "linear-gradient(180deg, var(--color-dw-page) 0%, var(--color-dw-page-mid) 45%, var(--color-dw-page-low) 100%)" }}>
      <PlateDefs />
      <style>{PLATE_KEYFRAMES + DAWN_FOCUS_CSS}</style>
      <div className="mx-auto max-w-6xl space-y-14 px-5 pb-24 pt-10">
        <header>
          <div className={`${ui} flex flex-wrap gap-x-6 text-sm`}>
            <PlateLink href="/" size="note">← Hub</PlateLink>
            <PlateLink href="/mood-boards/dawn/" size="note">Built from the Dawn mood board →</PlateLink>
            <PlateLink href="/trails/" size="note">The site built from it →</PlateLink>
          </div>
          <p className={`${caps} mt-8 text-dw-muted`}>Design system · 2 of 3</p>
          <h1 className={`${display} mt-2 text-8xl leading-none`}>Dawn</h1>
          <p className={`${display} mt-3 text-3xl italic`}>Quiet, Light, Hopeful</p>
          <p className={`${ui} mt-3 max-w-2xl text-base leading-relaxed text-dw-muted`}>
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
