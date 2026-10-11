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
