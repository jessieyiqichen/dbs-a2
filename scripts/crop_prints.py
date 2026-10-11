# Crop the printed border (and the caption strip) off each photochrom scan used on the site.
import json, sys, os
from PIL import Image
root, out = sys.argv[1], sys.argv[2]
d = json.load(open(f"{root}/src/data/trailPhotos.json"))
def line_mean(px, w, h, side, i):
    if side in ("top", "bottom"):
        y = i if side == "top" else h - 1 - i
        v = [px[x, y] for x in range(0, w, 3)]
    else:
        x = i if side == "left" else w - 1 - i
        v = [px[x, y] for y in range(0, h, 3)]
    return sum(v) / len(v)
def line(px, w, h, side, i):
    if side in ("top", "bottom"):
        y = i if side == "top" else h - 1 - i
        return [px[x, y] for x in range(w // 8, w - w // 8, 2)]
    x = i if side == "left" else w - 1 - i
    return [px[x, y] for y in range(h // 8, h - h // 8, 2)]
def border(px, w, h, side):
    """The card the print is mounted on is one flat colour: a line belongs to it while nearly all of it matches the edge."""
    edge = sum(line(px, w, h, side, 0)) / len(line(px, w, h, side, 0))
    lim = (h if side in ("top", "bottom") else w) // 5
    for i in range(1, lim):
        v = line(px, w, h, side, i)
        if sum(abs(a - edge) < 14 for a in v) / len(v) < 0.6:
            return i
    return 0
done = {}
for walk, ps in d.items():
    for p in ps:
        if p["kind"] != "photochrom": continue
        src = f"{root}/public{p['file']}"
        im = Image.open(src).convert("RGB"); g = im.convert("L"); px = g.load(); w, h = im.size
        b = {s: border(px, w, h, s) for s in ("top", "bottom", "left", "right")}
        # a little more inside the line, so no dark or white hairline is left; the bottom also loses the printed caption
        pad = round(min(w, h) * 0.02)
        box = (b["left"] + pad, b["top"] + pad, w - b["right"] - pad, h - b["bottom"] - pad - round(h * 0.05))
        name = "pc-" + os.path.basename(p["file"])
        im.crop(box).save(f"{out}/{name}", quality=86)
        done[p["file"]] = (name, b, box)
for k, v in done.items(): print(k, v)
