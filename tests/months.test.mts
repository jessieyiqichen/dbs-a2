import { test } from "node:test";
import assert from "node:assert/strict";
import { monthRange } from "../src/lib/months.ts";

test("one run inside the year", () => {
  assert.equal(monthRange(["Jun", "Jul", "Aug", "Sep"]), "Jun – Sep");
});

test("a run across the new year stays whole", () => {
  assert.equal(monthRange(["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"]), "Nov – Apr");
});

test("separate runs are listed in the year's order", () => {
  assert.equal(monthRange(["Mar", "Apr", "May", "Oct", "Nov"]), "Mar – May, Oct – Nov");
  assert.equal(monthRange(["May", "Oct", "Nov"]), "May, Oct – Nov");
});

test("every month, or none", () => {
  assert.equal(monthRange(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]), "All year");
  assert.equal(monthRange([]), "");
});
