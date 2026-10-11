// Twelve months as small printed squares; the best months carry a celadon plate.
import { t12 } from "./type";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function MonthStrip({ best }: { best: string[] }) {
  return (
    <div>
      <p className="sr-only">Best months: {best.join(", ")}</p>
      <div className="grid max-w-md grid-cols-12 gap-1" aria-hidden="true">
        {MONTHS.map((m) => {
          const on = best.includes(m);
          return (
            <span key={m} className={`${t12} grid h-9 place-items-center border !tracking-normal ${on ? "border-[#22333a] bg-[#c3d6c4] text-[#22333a]" : "border-[#6f8287]/40 font-normal text-[#4f5f66]"}`}>
              {m[0]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
