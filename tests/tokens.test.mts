// The Dawn colours live in @theme (globals.css); tokens.ts mirrors them for SVG and contrast checks. Keep them equal.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
const ts = readFileSync(new URL("../src/components/dawn/ds/tokens.ts", import.meta.url), "utf8");
const theme = (name: string) => css.match(new RegExp(`--color-dw-${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1];
const mirror = (key: string) => ts.match(new RegExp(`\\b${key}: "(#[0-9a-f]{6})"`, "i"))?.[1];

test("every Dawn colour in tokens.ts equals its @theme token", () => {
  const pairs: [string, string][] = [
    ["page", "page"], ["surface", "mount"], ["text", "ink"], ["muted", "muted"], ["border", "border"],
    ["accent", "loch"], ["accentHover", "loch-hover"], ["accentPressed", "loch-pressed"],
    ["celadon", "celadon"], ["aqua", "aqua"], ["loch", "loch-tint"], ["stone", "stone"],
  ];
  for (const [key, name] of pairs) {
    assert.ok(mirror(key), `tokens.ts has ${key}`);
    assert.equal(mirror(key), theme(name), `${key} = --color-dw-${name}`);
  }
});
