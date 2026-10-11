// Filtering and sorting for the trail list. Pure functions, no UI.
import type { Hike } from "@/data/hikes";

export const REGIONS = ["Europe", "Asia", "Oceania", "The Americas"] as const;
export type Region = (typeof REGIONS)[number];

export const LENGTHS = [
  { key: "day", label: "In a day" },
  { key: "days", label: "A few days" },
  { key: "weeks", label: "Two weeks or more" },
] as const;
export type Length = (typeof LENGTHS)[number]["key"];

export const SORTS = [
  { key: "catalogue", label: "Catalogue order" },
  { key: "shortest", label: "Shortest first" },
  { key: "longest", label: "Longest first" },
  { key: "highest", label: "Highest first" },
] as const;
export type Sort = (typeof SORTS)[number]["key"];

export type Filters = { query: string; regions: Region[]; lengths: Length[]; noPermit: boolean; sort: Sort };
export const NO_FILTERS: Filters = { query: "", regions: [], lengths: [], noPermit: false, sort: "catalogue" };

export function regionOf(h: Hike): Region {
  return h.continent.endsWith("America") ? "The Americas" : (h.continent as Region);
}

/** Judged by the shortest way to walk it: Tiger Leaping Gorge (1–2 days) counts as a day. */
export function lengthOf(h: Hike): Length {
  if (h.days[0] <= 1) return "day";
  return h.days[0] >= 12 ? "weeks" : "days";
}

/** Lower case, accents dropped, so "thorsmork" finds "Þórsmörk" and "winay" finds "Wiñay". */
export function fold(s: string): string {
  return s
    .replace(/[Þþ]/g, "th")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function matches(h: Hike, query: string): boolean {
  const q = fold(query.trim());
  if (!q) return true;
  return fold([h.name, ...h.country, h.continent, h.start, h.end, h.high_point].join(" ")).includes(q);
}

const order: Record<Sort, (a: Hike, b: Hike) => number> = {
  catalogue: () => 0,
  shortest: (a, b) => a.distance_km[0] - b.distance_km[0],
  longest: (a, b) => b.distance_km[1] - a.distance_km[1],
  highest: (a, b) => (b.max_elev_m?.[1] ?? -1) - (a.max_elev_m?.[1] ?? -1),
};

/** Within a group (regions, lengths) any chip matches; across groups all must. */
export function applyFilters(all: Hike[], f: Filters): Hike[] {
  const kept = all.filter(
    (h) =>
      matches(h, f.query) &&
      (f.regions.length === 0 || f.regions.includes(regionOf(h))) &&
      (f.lengths.length === 0 || f.lengths.includes(lengthOf(h))) &&
      (!f.noPermit || !h.permit),
  );
  return [...kept].sort(order[f.sort]);
}

export function isFiltered(f: Filters): boolean {
  return f.query.trim() !== "" || f.regions.length > 0 || f.lengths.length > 0 || f.noPermit;
}

export function toggle<T>(list: readonly T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}
