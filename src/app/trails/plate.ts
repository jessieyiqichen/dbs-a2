// Shared helpers for the trail pages.
export const plateNo = (n: number) => `No. ${String(n).padStart(2, "0")}`;
export const host = (u: string) => new URL(u).hostname.replace(/^www\./, "");

/** "wikipedia · Everest base camps", "doc.govt.nz · milford track": which site, and which page on it. */
export function sourceLabel(u: string): string {
  const url = new URL(u);
  const site = url.hostname.replace(/^(www|en)\./, "").replace(/\.org$/, "") === "wikipedia" ? "wikipedia" : url.hostname.replace(/^www\./, "");
  const last = url.pathname.split("/").filter(Boolean).pop() ?? "";
  const page = decodeURIComponent(last).replace(/\.(htm|html|aspx)$/, "").replace(/[-_]+/g, " ").trim();
  return page ? `${site} · ${page}` : site;
}
