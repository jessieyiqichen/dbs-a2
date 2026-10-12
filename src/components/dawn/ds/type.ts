// Dawn's six type roles, used by the site and the design system alike, and nothing else. Hierarchy comes from these steps, not from new sizes.
// Each role has a phone size and a size from 640px up (phone → desktop):
//   title 30 → 96 (112 wide)   section 24 → 48   names, numbers, lead lines 17 → 24
//   reading 15 → 17            notes 13 → 14     small capital labels and buttons 11 → 12
// (Text fields stay 16px on phones so the browser doesn't zoom in when you type.)
import { display, ui } from "./tokens";

export const t96 = `${display} text-[30px] leading-[1.1] sm:text-[96px] sm:leading-[0.95] lg:text-[112px] lg:leading-[0.92]`;
export const t48 = `${display} text-[24px] leading-[1.15] sm:text-[48px] sm:leading-[1.05]`;
export const t24 = `${display} text-[17px] leading-[1.3] sm:text-[24px] sm:leading-[1.2]`;
export const t17 = `${ui} text-[15px] leading-[23px] sm:text-[17px] sm:leading-[27px]`;
export const t14 = `${ui} text-[13px] leading-[19px] sm:text-[14px] sm:leading-[21px]`;
export const t12 = `${ui} text-[11px] leading-[15px] font-semibold uppercase tracking-[0.14em] sm:text-[12px] sm:leading-[16px] sm:tracking-[0.16em]`;
/** The printed caption line, e.g. "NO. 05. NEW ZEALAND" — small capitals in the display face. */
export const t12caption = `${display} text-[11px] leading-[15px] uppercase tracking-[0.12em] sm:text-[12px] sm:leading-[16px] sm:tracking-[0.14em]`;
