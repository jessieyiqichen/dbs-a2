<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Twelve Trails · DBS Assignment 2 (UI/UX & Visual Design)

## What and for whom
- A guide to twelve famous hikes around the world. Visitors: people who love hiking, from "just browsing" to "picking the next trip".
- They should be able to compare the twelve at a glance, filter them, and open one for its facts.

## Structure (the brief)
- `/` is the hub: links to three mood boards, three design systems, and the site.
- Three styles: **Field Notes** (handmade, curious, warm), **Dawn** (quiet, light, hopeful), **Trail Quest** (playful, bright, game-like).
- `/mood-boards/<style>/`: 25–30 artifacts each (collected or generated), the three must feel different.
- `/design-systems/<style>/`: colour roles with contrast ratios, type roles, spacing and shape, components in every state, UI states (empty, loading, error, success).
- `/trails/`: the site, in the chosen style; at least two faked interactions; every control in its states; accent only for the primary action; works at 390px and 1440px.

## Rules
- Next.js + Tailwind, static export. No database, accounts, external APIs or data storage. Push back on packages we don't need.
- Content: only facts in `src/data/hikes.json`, each with sources. Never invent numbers or personal experiences. Ranges mean sources disagree; say so.
- Images: only openly licensed (Wikimedia Commons, Unsplash, public-domain government) or generated; record author, licence and source for each.
- No orange or red in any palette.
- Every step is discussed and approved by the user before it is built. Small fixes to approved work are fine.
- Log every request, push-back and decision in `log.md` (Chinese). Pages, code and this file stay in English.
- Commits: one small step each; add files by name, never `git add -A`.

## Style specs (the five decisions; follow them exactly when building in a style)

### Field Notes — Handmade, Curious, Warm
- Palette roles: paper page `#f7f1e3`, kraft cards `#e9dcc0`, graphite text `#55524b` (6.92:1 on paper, 5.74:1 on kraft), muted text `#625e56` (5.73:1 / 4.75:1), ink-blue lines and links `#2f4a6b` (8.06:1), moss only for the primary action: button fill `#4f6a3f` with paper text (5.66:1); light moss `#6f8a5b` for large areas and decoration only (3.59:1, never behind body text).
- Type pair: Caveat for titles and labels; Crimson Pro for names, numbers and reading. Text is graphite, never black.
- Corners: 2px, paper edges, not rounded.
- Shadow: low and soft, like paper on a desk (`0 1px 2px rgba(0,0,0,.12), 0 8px 18px rgba(60,45,20,.10)`).
- Motion: 300ms, ease-out, settles straight; no bounce.

### Dawn — Quiet, Light, Hopeful
- Palette roles: haze page, a soft sky gradient `#e9e4f5 → #dfe8f5 → #f6f3f8`; frosted white surfaces (white at 60–80%, blurred); twilight text `#2e3150` (11.42:1 on haze); muted text `#5d6180` (5.48:1); lilac hairlines `#cfc4e6` (decorative only, never text); violet `#5b4fc4` only for the primary action, with white text (6.25:1).
- Type pair: Cormorant Garamond, light, for names and numbers; Mulish for everything else. Text is twilight, never black.
- Corners: 20px for cards; pills for buttons and chips.
- Shadow: no drop shadows; a soft lilac glow (`0 0 40px rgba(150,140,220,.18)`) and a hairline white border.
- Motion: 600–700ms, ease-in-out; fades and 2px lifts, nothing snaps.

### Trail Quest — Playful, Bright, Game-like (modern mobile game)
- Palette roles: night page `#1b1d4a` with soft electric/violet glows; card surfaces `#2a2e78`; white text (15.89:1 on night, 11.93:1 on card); muted text `#b9bdf0` (8.78:1 / 6.59:1); electric `#3b5bff` for selected states and secondary buttons (white text 5.09:1); lime `#5ef08a` only for the primary action, with `#14162b` text (12.13:1); sun `#ffe14d` only for stars, XP and rewards. Never red or orange.
- Type pair: Fredoka, bold, for names, numbers and buttons; Nunito (700–800) for everything else.
- Corners: 16–24px, chunky; pills for tags.
- Shadow: a hard bottom "depth" shadow with no blur (`0 6px 0` a darker shade) that collapses when pressed; soft glows only in the background.
- Motion: snappy, 150–200ms; buttons press down 4px; rewards overshoot (`cubic-bezier(.34,1.56,.64,1)`); respect reduced motion.
