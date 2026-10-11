export type StyleId = "field-notes" | "dawn" | "trail-quest";

export type StyleMeta = {
  id: StyleId;
  name: string;
  keywords: [string, string, string];
  // A few swatches for the hub preview; the full palettes live in each design system.
  swatches: string[];
};

export const styles: StyleMeta[] = [
  { id: "field-notes", name: "Field Notes", keywords: ["Handmade", "Curious", "Warm"], swatches: ["#e9dcc0", "#55524b", "#6f8a5b", "#2f4a6b"] },
  { id: "dawn", name: "Dawn", keywords: ["Quiet", "Light", "Hopeful"], swatches: ["#e9ece2", "#c1d1ad", "#8ea69d", "#35585a"] },
  { id: "trail-quest", name: "Trail Quest", keywords: ["Playful", "Bright", "Game-like"], swatches: ["#14162b", "#3b5bff", "#5ef08a", "#ffe14d"] },
];
