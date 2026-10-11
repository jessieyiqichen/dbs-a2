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
/** Cards and plates (anything that is a print you can choose): rest lies flat on the page; hover lifts an aqua plate
 *  off register and brings the colour up; pressed sinks, ink pressed in; selected lays a celadon plate under, in
 *  register, with a key rule beneath. The same words as every other Dawn control. */
export const card = {
  rest: "bg-[#f6f9f7] shadow-[0_1px_0_rgba(34,51,58,.15)]",
  hover: "bg-[#f6f9f7] shadow-[4px_4px_0_0_#c9dcdc]",
  focus: "bg-[#f6f9f7] shadow-[0_1px_0_rgba(34,51,58,.15)] dw-crop is-focus",
  pressed: "bg-[#f6f9f7] translate-y-px shadow-[inset_0_2px_4px_rgba(34,51,58,.2)]",
  selected: "bg-[#c3d6c4] shadow-[inset_0_-3px_0_0_#22333a]",
  disabled: "",
} as const;
/** Live card states on the element itself. */
export const cardLive = `relative ${slow} hover:shadow-[4px_4px_0_0_#c9dcdc] active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(34,51,58,.2)] dw-crop focus-visible:outline-none`;
/** Live card states on a mount whose link sits inside it. */
export const cardLiveHas = `${slow} has-[a:hover]:shadow-[4px_4px_0_0_#c9dcdc] has-[a:active]:translate-y-px has-[a:active]:shadow-[inset_0_2px_4px_rgba(34,51,58,.2)]`;
/** The print inside a card brings its colour up when the card is hovered. */
export const colourUp = `${slow} group-hover:saturate-[1.25]`;

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
