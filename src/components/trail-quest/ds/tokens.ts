// Trail Quest design tokens: a sunny modern mobile game. Every shape has a 3px navy outline and a hard ground shadow.
export const TQ = {
  sky: "#4cc3ff", // top of the page sky
  skyMid: "#9ee3ff",
  skyLow: "#e6f8ff", // where most text sits on the page
  surface: "#ffffff", // cards, panels
  text: "#1d2b53", // navy
  muted: "#4a5a85", // only on white or pale sky
  border: "#1d2b53", // 3px outline on every shape
  accent: "#58d36b", // grass: the one primary action, navy text
  accentDeep: "#2f9e44", // its ground shadow
  grape: "#6741d9", // selected and secondary, white text
  grapeDeep: "#4527a8",
  sun: "#ffd23f", // stars, rewards, counters
  sunDeep: "#d4a90a",
  off: "#d5dbe8", // locked and disabled
  offDeep: "#aab4c9",
} as const;

export const display = "font-[family-name:var(--tq-display)] font-bold";
export const ui = "font-[family-name:var(--tq-ui)]";
/** Snappy press: buttons drop onto their shadow and squash. */
export const snappy = "transition duration-150 ease-out";
export const pop = "[transition-timing-function:cubic-bezier(.34,1.56,.64,1)]";

/** Focus: a bobbing selection arrow above the control, never a box around it. The element needs a positioning context. */
export const focusRing = "tq-focus focus-visible:outline-none";
export const focusForced = "tq-focus is-focus";
export const focusWithin = "tq-focus tq-within relative";

const svg = (body: string, vb: string) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${body}</svg>`)}")`;
const POINTER = svg('<path d="M2 2 H20 L11 15 Z" fill="#ffd23f" stroke="#1d2b53" stroke-width="2.6" stroke-linejoin="round"/><path d="M6 4.5 H11" stroke="#fff" stroke-width="2" stroke-linecap="round"/>', "0 0 22 17");

const SHOWN = [".tq-focus:focus-visible::after", ".tq-focus.is-focus::after", ":focus-visible>.tq-focus::after", ".peer:focus-visible~.tq-focus::after", ".tq-within:focus-within::after"];
/** Focus: a sun-yellow selection arrow bobs above the control, like the cursor in a game menu.
 *  It exists only while focused, so it never widens the page. */
export const TQ_FOCUS_CSS = `
.tq-focus::after{content:"";position:absolute;pointer-events:none;display:none;left:50%;top:-24px;width:22px;height:17px;
background:${POINTER} center/contain no-repeat;transform:translateX(-50%)}
${SHOWN.join(",")}{display:block;animation:tq-focus-in 150ms ease-out,tq-focus-bob .9s 150ms ease-in-out infinite}
@keyframes tq-focus-in{from{opacity:0}to{opacity:1}}
@keyframes tq-focus-bob{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-5px)}}
@media (prefers-reduced-motion: reduce){.tq-focus::after{animation:none!important}}
`;
