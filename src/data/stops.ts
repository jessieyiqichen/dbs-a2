// Stops along each walk, in walking order, researched 11 October 2026 from park, trail and tourism sources (then
// Wikipedia; Tiger Leaping Gorge has only travel guides). Every stop carries its sources; a day number appears only
// where an official itinerary gives one.
import raw from "./routeStops.json";

export type StopKind =
  | "pass" | "summit" | "crater" | "cables" | "lake" | "glacier" | "waterfall" | "bridge" | "hut" | "campsite"
  | "village" | "town" | "forest" | "viewpoint" | "junction" | "ruin" | "shrine";
export type Stop = { name: string; kind: StopKind; label?: string; note: string; day: number | null; turn?: boolean; sources: string[] };
export type Route = { finish: StopKind; stops: Stop[] };

export const routes = raw as Record<string, Route>;

/** The names of every stop, per walk, for search: "Namche" finds Everest Base Camp. */
export const PLACES: Record<string, string> = Object.fromEntries(Object.entries(routes).map(([id, r]) => [id, r.stops.map((s) => s.name).join(" ")]));

export function stopSources(id: string): string[] {
  return [...new Set((routes[id]?.stops ?? []).flatMap((s) => s.sources))];
}
