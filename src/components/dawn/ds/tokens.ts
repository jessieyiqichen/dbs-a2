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
/** Focus everywhere: crop marks at the four corners, the marks a printer puts round a print to show where to cut.
 *  The element needs a positioning context (`relative`, or already absolute). */
export const focusRing = "dw-crop focus-visible:outline-none";
export const focusForced = "dw-crop is-focus";
export const slow = "transition duration-[600ms] ease-[cubic-bezier(.45,0,.2,1)]";
/** Fields can't draw marks on themselves: their wrapper shows the crop marks while the field inside has focus. */
export const focusWithin = "dw-crop dw-within relative";

const mark = "linear-gradient(#22333a,#22333a)";
/** Crop-mark focus, shared by every Dawn control. Render once per page. */
export const DAWN_FOCUS_CSS = `
.dw-crop::after{content:"";position:absolute;inset:-7px;pointer-events:none;display:none;
background:${mark} top left/10px 2px,${mark} top left/2px 10px,${mark} top right/10px 2px,${mark} top right/2px 10px,
${mark} bottom left/10px 2px,${mark} bottom left/2px 10px,${mark} bottom right/10px 2px,${mark} bottom right/2px 10px;background-repeat:no-repeat}
.dw-crop:focus-visible::after,.dw-crop.is-focus::after,:focus-visible>.dw-crop::after,.peer:focus-visible~.dw-crop::after,.dw-within:focus-within::after{display:block;animation:dw-crop-in 300ms cubic-bezier(.45,0,.2,1)}
@keyframes dw-crop-in{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion: reduce){.dw-crop::after{animation:none!important}}
`;
