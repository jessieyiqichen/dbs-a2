// Which walk comes before and after another, in catalogue order; the ends wrap round. Pure, no UI.
export function neighbours<T extends { id: string }>(all: readonly T[], id: string): { prev: T; next: T } | null {
  const i = all.findIndex((x) => x.id === id);
  if (i < 0 || all.length === 0) return null;
  return { prev: all[(i - 1 + all.length) % all.length], next: all[(i + 1) % all.length] };
}

/** Where the viewer opens: the cover plate, or the first plate if none is marked. */
export function coverIndex(photos: readonly { cover: boolean }[]): number {
  return Math.max(0, photos.findIndex((p) => p.cover));
}
