// The small "my list" control on a card. Same rules as every Dawn control: hover lifts a celadon plate,
// press sinks it, selected lays the celadon plate under in register; focus is the crop marks.
import { focusRing, slow } from "@/components/dawn/ds/tokens";
import { t12 } from "./type";

export function ListToggle({ on, name, onToggle }: { on: boolean; name: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `${name} is on your list; take it off` : `Add ${name} to my list`}
      onClick={onToggle}
      className={`${t12} relative inline-flex items-center gap-2 border border-[#22333a] px-3 py-2 ${slow} ${
        on ? "bg-[#c3d6c4] shadow-[inset_3px_0_0_0_#22333a]" : "bg-[#f6f9f7] shadow-[2px_2px_0_0_#c3d6c4] hover:bg-[#c3d6c4] hover:shadow-none"
      } active:translate-x-px active:translate-y-px active:bg-[#8eaaa6] active:shadow-[inset_0_2px_4px_rgba(34,51,58,.45)] ${focusRing}`}
    >
      <span aria-hidden="true">{on ? "✓" : "+"}</span>
      {on ? "On my list" : "My list"}
    </button>
  );
}
