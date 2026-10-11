import { test } from "node:test";
import assert from "node:assert/strict";
import { coverIndex, neighbours } from "../src/app/trails/walks.ts";

const all = [{ id: "a" }, { id: "b" }, { id: "c" }];

test("neighbours sit either side in catalogue order", () => {
  assert.deepEqual(neighbours(all, "b"), { prev: { id: "a" }, next: { id: "c" } });
});

test("neighbours wrap round at both ends", () => {
  assert.equal(neighbours(all, "a")?.prev.id, "c");
  assert.equal(neighbours(all, "c")?.next.id, "a");
});

test("an unknown walk has no neighbours", () => {
  assert.equal(neighbours(all, "zz"), null);
});

test("the viewer opens on the cover, or the first plate", () => {
  assert.equal(coverIndex([{ cover: false }, { cover: true }]), 1);
  assert.equal(coverIndex([{ cover: false }, { cover: false }]), 0);
});
