// "Nov – Apr" from a walk's best months, read round the year; separate runs are joined with commas. Pure, no UI.
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export function monthRange(best: readonly string[]): string {
  const on = MONTHS.map((m) => best.includes(m));
  if (on.every(Boolean)) return "All year";
  if (!on.some(Boolean)) return "";
  // start reading just after a month that is off, so a run across December stays whole
  const from = (on.indexOf(false) + 1) % 12;
  const runs: string[] = [];
  for (let k = 0; k < 12; k++) {
    const i = (from + k) % 12;
    if (!on[i] || (k > 0 && on[(i + 11) % 12])) continue;
    let j = i;
    while (on[(j + 1) % 12] && (j + 1) % 12 !== from) j = (j + 1) % 12;
    runs.push(i === j ? MONTHS[i] : `${MONTHS[i]} – ${MONTHS[j]}`);
  }
  return runs.join(", ");
}
