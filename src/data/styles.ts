export type StyleId = "mist" | "summit" | "trailhead";

export type StyleMeta = {
  id: StyleId;
  name: string;
  keywords: [string, string, string];
  // A few swatches for the hub preview; the full palettes live in each design system.
  swatches: string[];
};

export const styles: StyleMeta[] = [
  { id: "mist", name: "Mist", keywords: ["Quiet", "Matte", "Restrained"], swatches: ["#f1f0eb", "#b9bcb6", "#3f5a4a", "#22262a"] },
  { id: "summit", name: "Summit", keywords: ["Bold", "Clear", "Decisive"], swatches: ["#f4c430", "#111111", "#fafaf7", "#2d5da8"] },
  { id: "trailhead", name: "Trailhead '74", keywords: ["Nostalgic", "Sun-faded", "Earthy"], swatches: ["#efe4cc", "#6b6b3a", "#c99a2e", "#8fb3c4"] },
];
