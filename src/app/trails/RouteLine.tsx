// Along the way, drawn as a route rather than written as a list: start, three stops, finish, on one key line.
import type { Hike } from "@/data/hikes";
import type { Sourced } from "@/data/intros";
import { t12, t12caption, t17 } from "./type";

export function RouteLine({ h, stops }: { h: Hike; stops: Sourced[] }) {
  const nodes = [
    { mark: "S", label: h.start, end: true },
    ...stops.map((s, i) => ({ mark: String(i + 1), label: s.text, end: false })),
    { mark: "F", label: h.end, end: true },
  ];
  return (
    <ol>
      {nodes.map((n, i) => (
        <li key={i} className="relative flex items-start gap-4 py-2">
          {/* the line runs between marks only: up from every mark but the first, down from every mark but the last */}
          {i > 0 && <span aria-hidden="true" className="absolute left-[13px] top-0 h-[22px] w-[2px] bg-[#22333a]" />}
          {i < nodes.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[13px] top-[22px] w-[2px] bg-[#22333a]" />}
          <span
            aria-hidden="true"
            className={`${t12caption} relative z-10 grid h-7 w-7 shrink-0 place-items-center border-[1.5px] border-[#22333a] ${n.end ? "rounded-full bg-[#f6f9f7]" : "bg-[#c3d6c4] shadow-[2px_2px_0_0_#8eaaa6]"}`}
          >
            {n.mark}
          </span>
          <span className="min-w-0 pt-0.5">
            {n.end && <span className={`${t12} block text-[#4f5f66]`}>{i === 0 ? "Start" : "Finish"}</span>}
            <span className={`${t17} block`}>{n.label}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
