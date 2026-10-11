// Two or three sentences and three stops per trail, researched in October 2026. Every line carries its sources.
import raw from "./trailIntros.json";

export type Sourced = { text: string; sources: string[] };
export type TrailIntro = { intro: Sourced[]; along_the_way: Sourced[] };

export const intros = raw as Record<string, TrailIntro>;

/** Unique hosts behind a trail's intro and stops, for a short "Sources" line. */
export function introSources(id: string): string[] {
  const t = intros[id];
  if (!t) return [];
  return [...new Set([...t.intro, ...t.along_the_way].flatMap((s) => s.sources))];
}
