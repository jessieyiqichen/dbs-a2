// The site's six type sizes, and nothing else. Hierarchy comes from these steps, not from new sizes.
//   96  the title              48  chapter and section titles     24  walk names, numbers, lead lines
//   17  reading text           14  notes, captions, credits       12  small capital labels and buttons
import { display, ui } from "@/components/dawn/ds/tokens";

export const t96 = `${display} text-[48px] leading-[1] sm:text-[96px] sm:leading-[0.95]`;
export const t48 = `${display} text-[48px] leading-[1.05]`;
export const t24 = `${display} text-[24px] leading-[1.2]`;
export const t17 = `${ui} text-[17px] leading-[27px]`;
export const t14 = `${ui} text-[14px] leading-[21px]`;
export const t12 = `${ui} text-[12px] leading-[16px] font-semibold uppercase tracking-[0.16em]`;
/** The printed caption line, e.g. "NO. 05. NEW ZEALAND" — small capitals in the display face. */
export const t12caption = `${display} text-[12px] leading-[16px] uppercase tracking-[0.14em]`;
