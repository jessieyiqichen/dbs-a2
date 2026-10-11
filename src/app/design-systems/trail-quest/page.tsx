import type { Metadata } from "next";
import Link from "next/link";
import { Fredoka, Nunito } from "next/font/google";
import { CONTROL_STATES, ratio, type ControlState } from "@/lib/contrast";
import { hikes } from "@/data/hikes";
import { AchievementBadge } from "@/components/trail-quest/GameArt";
import { TQ, TQ_FOCUS_CSS, display, ui } from "@/components/trail-quest/ds/tokens";
import { CountBubble, GameButton, GameCheck, GameInput, GameLink, GameRadio, GameSearch, GameSelect, RadioSwatch } from "@/components/trail-quest/ds/Primitives";
import { ChipSwatch, GameChips, GameTabs, GameToggle, TabSwatch } from "@/components/trail-quest/ds/Interactive";
import { AltitudeBar, Boots, CardSwatch, LevelCard, LevelDialog, LevelRow, TQ_KEYFRAMES, UIStates } from "@/components/trail-quest/ds/Pieces";
import FocusTrial from "./FocusTrial";

const displayFont = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--tq-display" });
const uiFont = Nunito({ subsets: ["latin"], weight: ["600", "800", "900"], variable: "--tq-ui" });

export const metadata: Metadata = { title: "Trail Quest · Design system · Twelve Trails" };

const tmb = hikes.find((h) => h.id === "tmb")!;
const outlined = `${display} text-white [paint-order:stroke_fill] [-webkit-text-stroke:6px_#1d2b53] [text-shadow:0_5px_0_#1d2b53]`;

/* ---------- scaffolding ---------- */

function Section({ n, title, note, children }: { n: number; title: string; note: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <CountBubble n={n} />
        <h2 className={`${outlined} text-4xl leading-none`}>{title}</h2>
        <p className={`${ui} text-base font-extrabold text-[#1d2b53]`}>{note}</p>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Block({ title, note, children, className = "" }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[22px] border-[3px] border-[#1d2b53] bg-white p-5 shadow-[0_6px_0_#1d2b53] ${className}`}>
      <p className={`${display} text-xl text-[#1d2b53]`}>{title}</p>
      {note && <p className={`${ui} text-sm font-bold text-[#4a5a85]`}>{note}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

/* ---------- 1. colour roles ---------- */

const ROLES = [
  { role: "Background", hex: TQ.skyLow, use: `Sky, ${TQ.sky} at the top to ${TQ.skyLow} where text sits`, checks: [["navy on the top sky", TQ.text, TQ.sky], ["navy on the low sky", TQ.text, TQ.skyLow]] as [string, string, string][] },
  { role: "Surface", hex: TQ.surface, use: "Cards and panels, always outlined", checks: [] },
  { role: "Text", hex: TQ.text, use: "Navy, also every outline", checks: [["on surface", TQ.text, TQ.surface]] },
  { role: "Muted text", hex: TQ.muted, use: "Only on white or the low sky", checks: [["on surface", TQ.muted, TQ.surface], ["on the low sky", TQ.muted, TQ.skyLow]] },
  { role: "Border", hex: TQ.border, use: "3px navy outline on every shape", checks: [["against the top sky", TQ.border, TQ.sky]] },
  { role: "Accent", hex: TQ.accent, use: "Grass, for the one primary action", checks: [["navy text on it", TQ.text, TQ.accent]] },
  { role: "Selected", hex: TQ.grape, use: "Grape: chosen tabs and chips, secondary buttons", checks: [["white text on it", "#ffffff", TQ.grape]] },
  { role: "Reward", hex: TQ.sun, use: "Sun: counters, stars, Claim", checks: [["navy text on it", TQ.text, TQ.sun]] },
] satisfies { role: string; hex: string; use: string; checks: [string, string, string][] }[];

function ColourRoles() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ROLES.map((r) => (
        <div key={r.role} className="rounded-[22px] border-[3px] border-[#1d2b53] bg-white p-3 shadow-[0_5px_0_#1d2b53]">
          <div className="h-16 rounded-2xl border-[3px] border-[#1d2b53]" style={{ background: r.role === "Background" ? `linear-gradient(${TQ.sky}, ${TQ.skyMid}, ${TQ.skyLow})` : r.hex }} />
          <p className={`${display} mt-2 text-lg text-[#1d2b53]`}>{r.role}</p>
          <p className={`${ui} text-xs font-bold text-[#4a5a85]`}>{r.hex} · {r.use}</p>
          {r.checks.map(([label, fg, bg]) => (
            <p key={label} className={`${ui} text-xs font-bold text-[#1d2b53]`}>
              <span className="font-black">{ratio(fg, bg)}</span> <span className="text-[#4a5a85]">{label}</span>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------- 2. type roles ---------- */

const TYPE = [
  { role: "Display", spec: "Fredoka 700 · 56 / 56, white with a 6px navy outline", cls: `${outlined} text-[56px] leading-[1]`, sample: "Twelve Trails" },
  { role: "Heading", spec: "Fredoka 700 · 30 / 34", cls: `${display} text-[30px] leading-[34px]`, sample: tmb.name },
  { role: "Number", spec: "Fredoka 700 · 24 / 28", cls: `${display} text-[24px] leading-[28px]`, sample: "165–170 km" },
  { role: "Body", spec: "Nunito 700 · 16 / 24", cls: `${ui} max-w-xl text-[16px] font-bold leading-[24px]`, sample: tmb.why },
  { role: "Label", spec: "Nunito 900 · 12 / 16, capitals, +0.1em", cls: `${ui} text-[12px] font-black uppercase leading-[16px] tracking-[0.1em]`, sample: "Best Jun – Sep · No permit" },
];

function TypeRoles() {
  return (
    <div className="divide-y-[3px] divide-[#1d2b53]/10 rounded-[22px] border-[3px] border-[#1d2b53] bg-white px-5 shadow-[0_6px_0_#1d2b53]">
      {TYPE.map((t) => (
        <div key={t.role} className="grid gap-2 py-4 sm:grid-cols-[13rem_1fr] sm:items-center">
          <div>
            <p className={`${display} text-lg text-[#1d2b53]`}>{t.role}</p>
            <p className={`${ui} text-xs font-bold text-[#4a5a85]`}>{t.spec}</p>
          </div>
          <p className={`${t.cls} ${t.role === "Display" ? "" : "text-[#1d2b53]"}`}>{t.sample}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- 3. spacing and shape ---------- */

function SpacingShape() {
  const note = `${ui} mt-1 text-xs font-bold text-[#4a5a85]`;
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Block title="Spacing" note="Seven steps, in px. Chunky: 12 and 24 do most of the work.">
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48].map((s) => (
            <div key={s} className="text-center">
              <div className="rounded-[4px] border-2 border-[#1d2b53] bg-[#4cc3ff]" style={{ width: Math.max(s, 6), height: Math.max(s, 6) }} />
              <p className={note}>{s}</p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Corners" note="Round and chunky. Nothing is sharp.">
        <div className="flex flex-wrap items-end gap-5">
          <div><div className="h-12 w-16 rounded-xl border-[3px] border-[#1d2b53] bg-white" /><p className={note}>12 · counters, chip icons</p></div>
          <div><div className="h-12 w-16 rounded-2xl border-[3px] border-[#1d2b53] bg-white" /><p className={note}>16 · buttons, fields</p></div>
          <div><div className="h-12 w-16 rounded-[22px] border-[3px] border-[#1d2b53] bg-white" /><p className={note}>22–26 · cards, dialogs</p></div>
          <div><div className="h-12 w-12 rounded-full border-[3px] border-[#1d2b53] bg-white" /><p className={note}>round · icon buttons</p></div>
        </div>
      </Block>
      <Block title="Borders" note="One rule: a 3px navy outline on every shape.">
        <div className="flex flex-wrap items-center gap-5">
          <div className="h-12 w-24 rounded-2xl border-[3px] border-[#1d2b53] bg-white" />
          <p className={`${ui} text-sm font-bold text-[#1d2b53]`}>Disabled shapes swap navy for a grey outline (#8e99b3).</p>
        </div>
      </Block>
      <Block title="Shadow" note="A hard ground shadow, no blur. Press drops the button onto it.">
        <div className="flex flex-wrap items-end gap-6">
          <div><GameButton force="rest">Rest</GameButton><p className={`${note} mt-3`}>6px colour + 2px navy</p></div>
          <div><GameButton force="hover">Hover</GameButton><p className={`${note} mt-3`}>lifts to 8 + 2</p></div>
          <div><GameButton force="pressed">Press</GameButton><p className={`${note} mt-3`}>drops to 1 + 1</p></div>
        </div>
      </Block>
    </div>
  );
}

/* ---------- 4. components ---------- */

function Components() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Block title="Buttons and link" note="Grass is kept for the one primary action. Grape is secondary; sun only for rewards.">
        <div className="flex flex-wrap items-center gap-4 pb-2">
          <GameButton>Play</GameButton>
          <GameButton tone="grape">Map</GameButton>
          <GameButton tone="sun">Claim</GameButton>
          <GameLink />
        </div>
      </Block>
      <Block title="Text input, select, search">
        <div className="grid gap-4 sm:grid-cols-2">
          <GameInput id="tq-in-live" />
          <GameSelect id="tq-sel-live" />
          <div className="sm:col-span-2"><GameSearch id="tq-search-live" /></div>
        </div>
      </Block>
      <Block title="Checkboxes, radios, toggle">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-6"><GameCheck defaultChecked /><GameCheck label="Permit needed" /></div>
          <GameRadio name="tq-length" options={["Day", "A few days", "A month"]} defaultValue="A few days" />
          <div className="flex flex-wrap gap-6"><GameToggle initial label="Show stars" /><GameToggle label="Loops only" /></div>
        </div>
      </Block>
      <Block title="Tabs" note="Arrow keys move between them. Counters are coins.">
        <GameTabs
          tabs={[{ label: "All", n: "12" }, { label: "Day", n: "3" }, { label: "Multi-day", n: "9" }]}
          panels={[<p key="a">Twelve trails, from a 19.4 km day to the 769–800 km Camino.</p>, <p key="d">Tongariro, Tiger Leaping Gorge, Half Dome.</p>, <p key="m">The other nine take two days or more.</p>]}
        />
      </Block>
      <Block title="Filter chips" note="Tap to pick; chosen chips turn grape and pop up.">
        <GameChips options={[{ label: "Huts", icon: "tent", on: true }, { label: "Permit", icon: "ticket" }, { label: "Snow", icon: "snow" }, { label: "Loop", icon: "compass", on: true }]} />
      </Block>
      <Block title="Badges" note="Achievements in tiers; coins for counts; boots for difficulty.">
        <div className="flex flex-wrap items-center gap-5">
          <div className="w-28"><AchievementBadge id="ds1" tier="gold" icon="mountain" label="4,000 m Club" stars={3} /></div>
          <div className="w-28"><AchievementBadge id="ds2" tier="gem" icon="compass" label="Pilgrim" stars={0} locked /></div>
          <div className="space-y-2">
            <span className="flex items-center gap-2"><CountBubble n={12} /><span className={`${ui} text-sm font-black text-[#1d2b53]`}>trails</span></span>
            <Boots h={tmb} />
          </div>
        </div>
      </Block>
      <Block title="Card" note="Each trail is a level. Hover lifts it off the ground.">
        <div className="pt-4"><LevelCard id="tmb" /></div>
      </Block>
      <div className="space-y-5">
        <Block title="List rows" note="Levels in a list; the chosen one turns grape.">
          <div className="mb-3 flex items-center gap-2"><CountBubble n={4} /><span className={`${ui} text-sm font-black text-[#1d2b53]`}>levels in Europe</span></div>
          <div className="space-y-3">
            <LevelRow id="tmb" force="selected" />
            <LevelRow id="laugavegur" />
            <LevelRow id="whw" />
          </div>
        </Block>
        <Block title="Progress" note="Altitude as a striped XP bar.">
          <AltitudeBar />
        </Block>
      </div>
      <Block title="Detail panel" note="A pop-up over the map when a level is chosen." className="lg:col-span-2">
        <div className="mx-auto max-w-lg pt-6"><LevelDialog id="tmb" /></div>
      </Block>
    </div>
  );
}

/* ---------- 5. control states ---------- */

const STATE_NOTES: Record<ControlState, string> = {
  rest: "Standing on its ground shadow",
  hover: "Lifts higher and brightens; a shine sweeps",
  focus: "Reached with Tab: sparkles at the corners",
  pressed: "Drops onto its shadow and squashes",
  selected: "Turns grape and pops up",
  disabled: "Locked: grey, with a lock",
};

type Row = { name: string; render: (s: ControlState) => React.ReactNode | null };
const ROWS: Row[] = [
  { name: "Primary button", render: (s) => (s === "selected" ? null : <GameButton force={s}>Play</GameButton>) },
  { name: "Secondary button", render: (s) => (s === "selected" ? null : <GameButton tone="grape" force={s}>Map</GameButton>) },
  { name: "Link", render: (s) => (s === "selected" || s === "disabled" ? null : <GameLink force={s}>Sources</GameLink>) },
  { name: "Filter chip", render: (s) => <ChipSwatch force={s} /> },
  { name: "Tab", render: (s) => <TabSwatch force={s} /> },
  { name: "Checkbox", render: (s) => <GameCheck force={s} label="Huts" /> },
  { name: "Radio", render: (s) => <RadioSwatch force={s} /> },
  { name: "Toggle", render: (s) => <GameToggle force={s} label="On" /> },
  { name: "Text input", render: (s) => (s === "pressed" || s === "selected" ? null : <div className="max-w-36"><GameInput force={s} id={`tq-in-${s}`} label="Trail" placeholder="Name" /></div>) },
  { name: "Select", render: (s) => (s === "pressed" || s === "selected" ? null : <div className="max-w-36"><GameSelect force={s} id={`tq-sel-${s}`} /></div>) },
  { name: "Card", render: (s) => (s === "selected" || s === "disabled" ? null : <CardSwatch force={s} />) },
  { name: "List row", render: (s) => (s === "disabled" ? <LevelRow compact id="inca-trail" force={s} note="Feb" /> : <LevelRow compact id="milford" force={s} />) },
];

function ControlStates() {
  return (
    <div className="relative overflow-x-auto rounded-[22px] border-[3px] border-[#1d2b53] bg-white p-4 shadow-[0_6px_0_#1d2b53]">
      <table className="w-full min-w-[960px] table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-32" />
            {CONTROL_STATES.map((s) => (
              <th key={s} scope="col" className="pb-4 pr-3 text-left align-bottom">
                <span className={`${display} block text-lg capitalize text-[#1d2b53]`}>{s}</span>
                <span className={`${ui} block text-[11px] font-bold leading-snug text-[#4a5a85]`}>{STATE_NOTES[s]}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.name} className="border-t-[3px] border-[#1d2b53]/10">
              <th scope="row" className={`${ui} py-6 pr-4 text-left text-sm font-black text-[#1d2b53]`}>{r.name}</th>
              {CONTROL_STATES.map((s) => (
                <td key={s} className="py-6 pr-4 align-middle">{r.render(s) ?? <span className={`${ui} font-black text-[#4a5a85]`} aria-label="Not used">—</span>}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- page ---------- */

export default function TrailQuestSystem() {
  return (
    <main className={`${displayFont.variable} ${uiFont.variable} min-h-screen text-[#1d2b53]`} style={{ background: `linear-gradient(180deg, ${TQ.sky} 0px, ${TQ.skyMid} 420px, ${TQ.skyLow} 900px, ${TQ.skyLow} 100%)` }}>
      <style>{TQ_FOCUS_CSS + TQ_KEYFRAMES}</style>
      <div className="mx-auto max-w-6xl space-y-14 px-5 pb-24 pt-10">
        <header>
          <div className={`${ui} flex flex-wrap gap-x-6 text-sm font-black`}>
            <Link href="/" className="text-[#1d2b53] underline-offset-4 hover:underline">← Hub</Link>
            <Link href="/mood-boards/trail-quest/" className="text-[#1d2b53] underline decoration-[#6741d9] decoration-[3px] underline-offset-4 hover:text-[#6741d9]">Built from the Trail Quest mood board →</Link>
          </div>
          <p className={`${ui} mt-8 text-xs font-black uppercase tracking-[0.2em] text-[#1d2b53]`}>Design system · 3 of 3</p>
          <h1 className={`${outlined} mt-2 text-7xl leading-none`}>Trail Quest</h1>
          <p className={`${display} mt-3 text-2xl text-[#1d2b53]`}>Playful, Bright, Game-like</p>
          <p className={`${ui} mt-2 max-w-2xl text-base font-bold text-[#1d2b53]`}>
            A sunny mobile game. Every shape has a 3px navy outline and stands on a hard ground shadow; pressing drops it down. Grass is kept for the one thing to do next.
          </p>
        </header>
        <FocusTrial />
        <Section n={1} title="Colour roles" note="Contrast is computed from the hex values.">
          <ColourRoles />
        </Section>
        <Section n={2} title="Type roles" note="Fredoka shouts the names; Nunito explains.">
          <TypeRoles />
        </Section>
        <Section n={3} title="Spacing and shape" note="Round, outlined, standing on the ground.">
          <SpacingShape />
        </Section>
        <Section n={4} title="Components" note="Everything the site needs, filled with real trails. Try them.">
          <Components />
        </Section>
        <Section n={5} title="Control states" note="A dash means the state doesn't apply.">
          <ControlStates />
        </Section>
        <Section n={6} title="UI states" note="Empty, loading, error, success.">
          <UIStates />
        </Section>
      </div>
    </main>
  );
}
