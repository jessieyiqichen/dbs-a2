// Twelve months as small printed squares; the best months carry a celadon plate.
import { ui } from "@/components/dawn/ds/tokens";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function MonthStrip({ best }: { best: string[] }) {
  return (
    <div>
      <p className="sr-only">Best months: {best.join(", ")}</p>
      <div className="grid max-w-md grid-cols-12 gap-1" aria-hidden="true">
        {MONTHS.map((m) => {
          const on = best.includes(m);
          return (
            <span key={m} className={`${ui} grid h-9 place-items-center border text-[11px] font-semibold ${on ? "border-[#22333a] bg-[#c3d6c4] text-[#22333a]" : "border-[#6f8287]/40 text-[#4f5f66]"}`}>
              {m[0]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
