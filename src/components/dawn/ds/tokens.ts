// Dawn design tokens: the cool half of the photochrom prints (sky, water, ice).
export const DW = {
  page: "#e6edeb", // background: pale sky
  surface: "#f6f9f7", // the mount a print sits on
  text: "#22333a", // key plate ink
  muted: "#4f5f66",
  border: "#6f8287", // control borders, 3:1 or more on the page
  accent: "#2c5868", // loch: the one primary action
  accentHover: "#356677",
  accentPressed: "#244a58",
  celadon: "#c3d6c4",
  aqua: "#c9dcdc",
  loch: "#8eaaa6",
  stone: "#a7b4b1",
} as const;

export const display = "font-[family-name:var(--dw-display)]";
export const ui = "font-[family-name:var(--dw-ui)]";
export const caps = `${ui} whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em]`;
/** Focus everywhere: a solid key-ink ring, like the rule around a mounted print. */
export const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#22333a]";
export const focusForced = "outline outline-2 outline-offset-[3px] outline-[#22333a]";
export const slow = "transition duration-[600ms] ease-[cubic-bezier(.45,0,.2,1)]";
/** Fields show the ring on any focus, mouse included. */
export const focusRingField = "focus:outline focus:outline-2 focus:outline-offset-[3px] focus:outline-[#22333a]";
