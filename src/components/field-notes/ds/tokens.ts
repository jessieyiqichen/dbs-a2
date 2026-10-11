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
/** Focus everywhere: a quick wavy ink line underneath, the way you underline something in a notebook.
 *  The element needs a positioning context (`relative`, or already absolute). */
export const focusRing = "fn-scrib focus-visible:outline-none";
export const focusForced = "fn-scrib is-focus";
/** Controls that already have a line under them (links, ruled fields, list rows): that line itself turns into the ink wave. */
export const focusLine = "fn-scrib fn-line focus-visible:outline-none";
export const focusLineForced = "fn-scrib fn-line is-focus";
/** Fields can't draw on themselves: their wrapper turns the field's ruled line into the wave while it has focus. */
export const focusWithin = "fn-scrib fn-within fn-line relative";
/** Tabs are paper tabs: the label inside gets underlined. */
export const focusInside = "fn-scrib fn-inside focus-visible:outline-none";

const wave = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M1 6 C 12 2, 22 9, 34 5 S 56 2, 68 6 S 90 8, 99 4" fill="none" stroke="#2f4a6b" stroke-width="2.4" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>',
);
/** Scribble focus, shared by every Field Notes control. Render once per page. */
export const FIELD_FOCUS_CSS = `
.fn-scrib::after{content:"";position:absolute;left:-4px;right:-4px;bottom:-13px;height:10px;pointer-events:none;opacity:0;
background:url("data:image/svg+xml,${wave}") center/100% 100% no-repeat;transition:opacity 300ms ease-out}
.fn-scrib:focus-visible::after,.fn-scrib.is-focus::after,:focus-visible>.fn-scrib::after,.peer:focus-visible~.fn-scrib::after,.fn-within:focus-within::after{opacity:1}
.fn-line::after{bottom:-4px}
.fn-inside::after{left:10px;right:10px;bottom:2px;height:8px}
.fn-line:focus-visible,.fn-line.is-focus{border-bottom-color:transparent!important;text-decoration-color:transparent!important}
.fn-line.is-focus :is(input,select),.fn-within:focus-within :is(input,select){border-bottom-color:transparent!important}
@media (prefers-reduced-motion: reduce){.fn-scrib::after{transition:none}}
`;
