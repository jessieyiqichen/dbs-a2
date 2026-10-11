// Two or three sentences per trail, researched in October 2026. Every line carries its sources. Stops live in stops.ts.
import raw from "./trailIntros.json";

export type Sourced = { text: string; sources: string[] };
export type TrailIntro = { intro: Sourced[] };

export const intros = raw as Record<string, TrailIntro>;

/** Unique sources behind a trail's intro. */
export function introSources(id: string): string[] {
  const t = intros[id];
  if (!t) return [];
  return [...new Set(t.intro.flatMap((s) => s.sources))];
}
