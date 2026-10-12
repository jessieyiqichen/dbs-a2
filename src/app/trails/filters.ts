// Filtering and sorting for the trail list. Pure functions, no UI.
import type { Hike } from "@/data/hikes";

export const REGIONS = ["Europe", "Asia", "Oceania", "The Americas"] as const;
export type Region = (typeof REGIONS)[number];

export const LENGTHS = [
  { key: "day", label: "1 day", min: 1, max: 1 },
  { key: "few", label: "2–5 days", min: 2, max: 5 },
  { key: "week", label: "6–14 days", min: 6, max: 14 },
  { key: "month", label: "A month", min: 15, max: Infinity },
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

/** Every length a walk's days reach: Tiger Leaping Gorge (1–2 days) is both "1 day" and "2–5 days". */
export function lengthsOf(h: Hike): Length[] {
  return LENGTHS.filter((l) => h.days[0] <= l.max && h.days[1] >= l.min).map((l) => l.key);
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
      (f.lengths.length === 0 || lengthsOf(h).some((l) => f.lengths.includes(l))) &&
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

/** Pick or unpick one option. Choosing every option means the same as All, so it is stored as All (empty). */
export function choose<T>(current: readonly T[], item: T, all: readonly T[]): T[] {
  const next = toggle(current, item);
  return next.length === all.length ? [] : next;
}

/** How many walks each option would leave, keeping the other group's choices and the permit switch. */
export function counts(all: Hike[], f: Filters): { regions: Record<Region, number>; lengths: Record<Length, number> } {
  const regions = Object.fromEntries(REGIONS.map((r) => [r, applyFilters(all, { ...f, regions: [r] }).length])) as Record<Region, number>;
  const lengths = Object.fromEntries(LENGTHS.map((l) => [l.key, applyFilters(all, { ...f, lengths: [l.key] }).length])) as Record<Length, number>;
  return { regions, lengths };
}
