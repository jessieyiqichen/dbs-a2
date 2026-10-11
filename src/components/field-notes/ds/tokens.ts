// Field Notes design tokens. Every colour role, with the reason it exists.
export const FN = {
  page: "#f7f1e3", // background: notebook paper
  surface: "#fbf7ec", // cards and panels: a fresh page
  kraft: "#e9dcc0", // secondary surface: the cover, unselected tabs
  text: "#3d3a34", // dark graphite, never black
  muted: "#625e56", // soft graphite
  border: "#7d776b", // pencil line on controls (3:1 or more on the page)
  accent: "#4f6a3f", // moss: the one primary action
  accentHover: "#3f5732",
  accentPressed: "#36492b",
  ink: "#2f4a6b", // ink blue: links, focus, notes in the margin
  wash: "#6f8a5b", // light moss: watercolour, decoration only
} as const;

export const hand = "font-[family-name:var(--fn-hand)]";
export const serif = "font-[family-name:var(--fn-serif)]";
/** Focus everywhere: a dashed ink loop around the thing, like a pencil ring in the margin. */
export const focusRing = "focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-offset-4 focus-visible:outline-[#2f4a6b]";
export const focusForced = "outline-2 outline-dashed outline-offset-4 outline-[#2f4a6b]";
