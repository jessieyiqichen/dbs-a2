// Counting along a route map: the first and last points are its ends (start, finish); the ones between are its stops.

/** "Stop 3 of 7" for a point between the ends; null for the two ends, which are named by their own label. */
export function stopPosition(i: number, total: number): string | null {
  if (i <= 0 || i >= total - 1) return null;
  return `Stop ${i} of ${total - 2}`;
}
