// WCAG 2.x contrast ratio, computed from the hex values so the numbers on the page can't drift from the colours.

const HEX = /^#([0-9a-f]{6})$/i;

function luminance(hex: string): number {
  const m = HEX.exec(hex);
  if (!m) throw new Error(`Not a 6-digit hex colour: ${hex}`);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/** "10.06:1" */
export function ratio(a: string, b: string): string {
  return `${contrast(a, b).toFixed(2)}:1`;
}

export type ControlState = "rest" | "hover" | "focus" | "pressed" | "selected" | "disabled";
export const CONTROL_STATES: ControlState[] = ["rest", "hover", "focus", "pressed", "selected", "disabled"];
