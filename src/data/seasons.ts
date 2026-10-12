// How good each month is for each walk, in three levels: best (the sourced best months), possible (open, the default),
// closed (officially closed, or the authority says ordinary walkers should not go). Researched 11 October 2026;
// every "closed" run and every note carries its sources.
import raw from "./seasons.json";

export type Level = "best" | "possible" | "closed";
export type SeasonNote = { months: string[]; level: Level; text: string; sources: string[] };
export type Season = { months: Record<string, Level>; notes: SeasonNote[] };

export const seasons = raw as Record<string, Season>;

export function seasonSources(id: string): string[] {
  return [...new Set((seasons[id]?.notes ?? []).flatMap((n) => n.sources))];
}
