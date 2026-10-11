// Shared helpers for the trail pages.
export const plateNo = (n: number) => `No. ${String(n).padStart(2, "0")}`;
export const host = (u: string) => new URL(u).hostname.replace(/^www\./, "");
