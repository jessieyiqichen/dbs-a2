import raw from "./hikes.json";

export type Difficulty = "easy" | "moderate" | "challenging" | "strenuous";

export type Hike = {
  id: string;
  name: string;
  country: string[];
  continent: string;
  start: string;
  end: string;
  route: "one-way" | "loop" | "round trip";
  distance_km: [number, number];
  days: [number, number];
  high_point: string;
  max_elev_m: [number, number];
  ascent_m: number | null;
  best_months: string[];
  permit: boolean;
  permit_note: string;
  difficulty: Difficulty;
  lat: number;
  lon: number;
  why: string;
  sources: string[];
  flags: string[];
};

// Facts checked against official sources in October 2026; ranges mean sources disagree.
export const DATA_AS_OF = "October 2026";

export const hikes = raw as Hike[];

export function formatRange([min, max]: [number, number], unit = ""): string {
  const f = (n: number) => n.toLocaleString("en-US");
  return min === max ? `${f(min)}${unit}` : `${f(min)}–${f(max)}${unit}`;
}
