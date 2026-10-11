// Run with: npm test  (Node 24 strips the types itself; no test packages needed)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { applyFilters, fold, isFiltered, lengthOf, NO_FILTERS, regionOf, toggle } from "../src/app/trails/filters.ts";

const hikes = JSON.parse(readFileSync(new URL("../src/data/hikes.json", import.meta.url), "utf8"));
const ids = (list: { id: string }[]) => list.map((h) => h.id);
const byId = (id: string) => hikes.find((h: { id: string }) => h.id === id);

test("no filters keeps all twelve in catalogue order", () => {
  assert.deepEqual(ids(applyFilters(hikes, NO_FILTERS)), ids(hikes));
});

test("search ignores case and accents", () => {
  assert.equal(fold("Þórsmörk"), "thorsmork");
  assert.deepEqual(ids(applyFilters(hikes, { ...NO_FILTERS, query: "THORSMORK" })), ["laugavegur"]);
  assert.deepEqual(ids(applyFilters(hikes, { ...NO_FILTERS, query: "new zealand" })), ["milford", "tongariro"]);
});

test("regions: the two Americas count as one", () => {
  assert.equal(regionOf(byId("w-trek")), "The Americas");
  assert.equal(regionOf(byId("half-dome")), "The Americas");
  assert.deepEqual(ids(applyFilters(hikes, { ...NO_FILTERS, regions: ["The Americas"] })), ["inca-trail", "w-trek", "half-dome"]);
});

test("length uses the shortest way to walk it", () => {
  assert.equal(lengthOf(byId("tiger-leaping")), "day");
  assert.equal(lengthOf(byId("ebc")), "weeks");
  assert.equal(lengthOf(byId("tmb")), "days");
});

test("chips within a group OR, across groups AND", () => {
  const r = applyFilters(hikes, { ...NO_FILTERS, regions: ["Europe", "Oceania"], lengths: ["day"] });
  assert.deepEqual(ids(r), ["tongariro"]);
});

test("no-permit toggle drops permit walks", () => {
  const r = applyFilters(hikes, { ...NO_FILTERS, noPermit: true });
  assert.ok(r.every((h) => !h.permit));
  assert.ok(r.length > 0 && r.length < hikes.length);
});

test("sorts", () => {
  assert.equal(applyFilters(hikes, { ...NO_FILTERS, sort: "shortest" })[0].id, "tongariro");
  assert.equal(applyFilters(hikes, { ...NO_FILTERS, sort: "longest" })[0].id, "camino");
  assert.equal(applyFilters(hikes, { ...NO_FILTERS, sort: "highest" })[0].id, "ebc");
});

test("nothing matches gives an empty list, and filters report themselves", () => {
  assert.deepEqual(applyFilters(hikes, { ...NO_FILTERS, query: "atlantis" }), []);
  assert.equal(isFiltered(NO_FILTERS), false);
  assert.equal(isFiltered({ ...NO_FILTERS, noPermit: true }), true);
});

test("toggle adds then removes, without changing the original", () => {
  const start = ["Europe"] as const;
  assert.deepEqual(toggle(start, "Asia"), ["Europe", "Asia"]);
  assert.deepEqual(toggle(start, "Europe"), []);
  assert.deepEqual(start, ["Europe"]);
});
