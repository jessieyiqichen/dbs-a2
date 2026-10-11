// Dawn's six type roles, used by the site and the design system alike, and nothing else. Hierarchy comes from these steps, not from new sizes.
// Each role has a phone size and a size from 640px up (phone → desktop):
//   title 40 → 96 (112 wide)   section 32 → 48   names, numbers, lead lines 20 → 24
//   reading 16 → 17            notes 14          small capital labels and buttons 12
import { display, ui } from "./tokens";

export const t96 = `${display} text-[40px] leading-[1.05] sm:text-[96px] sm:leading-[0.95] lg:text-[112px] lg:leading-[0.92]`;
export const t48 = `${display} text-[32px] leading-[1.1] sm:text-[48px] sm:leading-[1.05]`;
export const t24 = `${display} text-[20px] leading-[1.25] sm:text-[24px] sm:leading-[1.2]`;
export const t17 = `${ui} text-[16px] leading-[25px] sm:text-[17px] sm:leading-[27px]`;
export const t14 = `${ui} text-[14px] leading-[21px]`;
export const t12 = `${ui} text-[12px] leading-[16px] font-semibold uppercase tracking-[0.16em]`;
/** The printed caption line, e.g. "NO. 05. NEW ZEALAND" — small capitals in the display face. */
export const t12caption = `${display} text-[12px] leading-[16px] uppercase tracking-[0.14em]`;
