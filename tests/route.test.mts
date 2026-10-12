// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { stopPosition } from "../src/lib/route.ts";

test("the two ends of a route are not counted as stops", () => {
  assert.equal(stopPosition(0, 9), null);
  assert.equal(stopPosition(8, 9), null);
});

test("stops between the ends count from 1, out of the same number the map's heading gives", () => {
  assert.equal(stopPosition(1, 9), "Stop 1 of 7");
  assert.equal(stopPosition(7, 9), "Stop 7 of 7");
});
