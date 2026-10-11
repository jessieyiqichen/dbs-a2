export type StyleId = "field-notes" | "dawn" | "trail-quest";

export type StyleMeta = {
  id: StyleId;
  name: string;
  keywords: [string, string, string];
  // Hub preview only; the full palettes live in each design system.
  swatches: [string, string, string, string, string];
  page: string; // the style's page colour, behind its "Aa"
  ink: string; // the style's text colour
};

export const styles: StyleMeta[] = [
  {
    id: "field-notes",
    name: "Field Notes",
    keywords: ["Handmade", "Curious", "Warm"],
    swatches: ["#f7f1e3", "#e9dcc0", "#55524b", "#4f6a3f", "#2f4a6b"],
    page: "#f7f1e3",
    ink: "#55524b",
  },
  {
    id: "dawn",
    name: "Dawn",
    keywords: ["Quiet", "Light", "Hopeful"],
    swatches: ["#e6edeb", "#c3d6c4", "#8eaaa6", "#2c5868", "#22333a"],
    page: "#e6edeb",
    ink: "#22333a",
  },
  {
    id: "trail-quest",
    name: "Trail Quest",
    keywords: ["Playful", "Bright", "Game-like"],
    swatches: ["#4cc3ff", "#58d36b", "#ffd23f", "#6741d9", "#1d2b53"],
    page: "#9ee3ff",
    ink: "#1d2b53",
  },
];
