// TEMPORARY: the two Trail Quest focus options on real controls, for choosing. Remove once one is picked.
import { GameButton, GameCheck, GameInput, GameLink, RadioSwatch } from "@/components/trail-quest/ds/Primitives";
import { ChipSwatch, GameToggle, TabSwatch } from "@/components/trail-quest/ds/Interactive";
import { LevelRow } from "@/components/trail-quest/ds/Pieces";
import { display, ui } from "@/components/trail-quest/ds/tokens";

const OPTIONS = [
  { id: "sparkle", name: "A · Sparkles", note: "Two yellow sparkles at the corners, gently twinkling, like a highlighted item in a game." },
  { id: "pointer", name: "B · Selection arrow", note: "A yellow arrow bobs above the control, like the cursor in a game menu." },
];

export default function FocusTrial() {
  return (
    <section className="rounded-[26px] border-[3px] border-dashed border-[#1d2b53] bg-white/80 p-5">
      <p className={`${display} text-3xl text-[#1d2b53]`}>Focus: pick one</p>
      <p className={`${ui} text-sm font-bold text-[#4a5a85]`}>The same real controls in their focus state, two ways. Temporary; this block goes once one is chosen.</p>
      {OPTIONS.map((o) => (
        <div key={o.id} data-tqf={o.id === "pointer" ? "pointer" : undefined} className="mt-5 border-t-[3px] border-[#1d2b53]/15 pt-4">
          <p className={`${display} text-2xl text-[#1d2b53]`}>{o.name}</p>
          <p className={`${ui} text-sm font-bold text-[#4a5a85]`}>{o.note}</p>
          <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-10 px-3">
            <GameButton force="focus">Play</GameButton>
            <GameButton tone="grape" force="focus">Map</GameButton>
            <GameLink force="focus">Sources</GameLink>
            <ChipSwatch force="focus" />
            <TabSwatch force="focus" />
            <GameCheck force="focus" label="Huts" />
            <RadioSwatch force="focus" />
            <GameToggle force="focus" label="On" />
            <div className="w-40"><GameInput force="focus" id={`tqf-${o.id}`} label="Trail" placeholder="Name" /></div>
            <div className="w-44"><LevelRow compact id="milford" force="focus" /></div>
          </div>
        </div>
      ))}
    </section>
  );
}
