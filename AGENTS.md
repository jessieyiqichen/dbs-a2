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

## State rules (all three styles)
- The six control states are exactly the assignment's: rest, hover, focus, pressed, selected, disabled, shown "where they apply". Every interactive control in a design system gets a row in its state grid, with a dash where a state does not apply (buttons and links have no selected; text fields have no pressed or selected; links have no disabled).
- One rule per state inside a style, applied to every control; hover, pressed and selected must never look alike, and selected carries a non-colour mark (a tick, a rule, a circle).
- Focus is never a box drawn round the outside of a control (it reads as an extra layer). Each style marks focus in its own language, on the control itself (the toggle track, the checkbox box), never the control plus its label: Field Notes draws one ink-blue pen stroke underneath; Dawn puts printer's crop marks at the four corners; Trail Quest bobs a yellow selection arrow above. Text fields show it from a wrapper while the field has focus.
- The site imports these same components, so its states match the design system by construction.

## Style specs (the five decisions; follow them exactly when building in a style)

### Field Notes — Handmade, Curious, Warm
- Palette roles: background paper `#f7f1e3`; surface `#fbf7ec` (cards, panels); kraft `#e9dcc0` (unselected tabs, hover washes); text dark graphite `#3d3a34` (10.06:1 on paper, never black); muted `#625e56` (5.73:1); border pencil `#7d776b` (3.95:1, for controls); accent moss `#4f6a3f` only for the primary action, paper text (5.38:1), hover `#3f5732`, pressed `#36492b`; ink blue `#2f4a6b` for links, focus and margin notes (8.06:1); light moss `#6f8a5b` for watercolour only, never behind text. No red or orange: errors use ink blue and a circled "!", never colour alone.
- Type pair: Caveat for titles and labels; Crimson Pro for names, numbers and reading. Text is graphite, never black.
- Corners: 2px, paper edges, not rounded.
- Shadow: low and soft, like paper on a desk (`0 1px 2px rgba(0,0,0,.12), 0 8px 18px rgba(60,45,20,.10)`).
- Motion: 300ms, ease-out, settles straight; no bounce.
- Hover vs pressed: hover lifts the paper (rises 2px, shadow underneath); pressed pushes it into the page (sinks 2px, no drop shadow, an inner shadow, one shade darker). Never let the two look alike.
- Focus: one calm ink-blue pen stroke, never a wave (a wavy underline reads as a spelling error) and never two lines. Where a control already has a line under it (links, text fields, selects, search, list rows), that line itself turns into the stroke; where it has none (buttons, chips, checkbox, radio, toggle, card), the stroke is drawn underneath; index tabs get it under their label, inside the tab. Disabled: dashed pencil line, muted text, struck through where it is a word.
- Signature: everything is something from a trail notebook. Icons: a wobbly graphite pencil line, hatching on the side away from the light, one small watercolour dab (moss or ink blue). Tabs: index tabs on the notebook's edge. Single choice: the answer circled in pencil. Slider: a pencil ruler with a paperclip thumb. Toggle: on is a moss wash bleeding into a pencilled pill. Search: one ruled line. Badge: a perforated stamp. Progress: the walked part of the route traced over in pencil with a moss wash, a hut doodle at each night, a curved arrow for "you are here", the done day ticked and today circled. Loading: a mountain sketched in loose strokes, then hatching, then the sun. Palette: a paint chart (watercolour in pencilled boxes). Tape labels: torn ends. No perfect shapes: lines overshoot where they meet, curves wobble, marks are ticks, loops and arrows, never a geometric X, a ruled box or a smooth bell curve.

### Dawn — Quiet, Light, Hopeful (Photochrom: hand-coloured travel prints, c. 1890–1900)
- Source: Library of Congress Photochrom Print Collection (no known restrictions). Four of our trails have prints: Milford Track, Half Dome, Tour du Mont Blanc, West Highland Way. Avoid the peach and orange skies.
- Temperature rule: Dawn takes only the cool half of the prints (sky, water, ice). Warm earth tones (kraft, cream, moss, brown) belong to Field Notes, so the two never read alike.
- Palette roles: page is a pale sky `#e6edeb → #f0f5f3`; mount cards `#f6f9f7`; key ink text `#22333a` (12.36:1 on mount, 11.03:1 on page); muted text `#4f5f66` (6.27:1 / 5.59:1); control borders `#6f8287` (3.39:1 on page); loch `#2c5868` only for the primary action, with mount text (7.33:1), hover `#356677` (5.97:1), pressed `#244a58` (9.02:1). Tints, decoration only: celadon `#c3d6c4`, aqua `#c9dcdc`, loch tint `#8eaaa6`, stone `#a7b4b1` (key ink on each is at least 5.27:1).
- Type pair: Old Standard TT for names, numbers and printed captions (caps, tracked); Libre Franklin for everything else. Both are revivals of type from the prints' own years. Text is key ink, never black.
- Corners: square; a print has a 3px key-ink edge and sits on a cream mount.
- Shadow: none; depth is a tint plate printed 2–3px off register.
- States: rest = tint plate 2–3px off register; hover = the plate moves in under the control (its colour fills it); pressed = sinks 1px, a deeper tint, an inner shadow; focus = printer's crop marks at the four corners, in key ink; selected = a solid tint plate plus a key mark (tick or rule); disabled = unprinted: dashed key line, muted text, struck through.
- Motion: 600ms, `cubic-bezier(.45,0,.2,1)`; plates slide into register, colour fades in; nothing bounces or glows.
- Signature: everything is made the way a photochrom was: flat colour plates slightly off register with a litho grain, a fine key line on top. Interaction brings plates into register. Primary button: loch with its tint plate off; hover puts it in register. Tabs: a celadon plate slides under the chosen one. Toggle: square track and knob; off, the knob's loch-tint plate sits off register on a blank track; on, it locks into register and the track is printed in loch tint. Filters: printed labels; chosen ones drop into register. Route card: a mounted print with a numbered caption ("No. 05. MILFORD TRACK, NEW ZEALAND.") and catalogue rows of facts. Progress: one plate per day. Loading: the print comes up plate by plate, sky first. Badge: an embossed stamp. Search: "No." and a field with a mount bevel. Modern photos get the photochrom treatment (greyscale, then the print's tints in colour blend) so they sit with the old prints.

### Trail Quest — Playful, Bright, Game-like (a sunny modern mobile game)
- Palette roles: sky page, a gradient `#4cc3ff → #9ee3ff → #e6f8ff`, with drifting clouds and green hills; white card surfaces with a 3px navy outline; navy text `#1d2b53` (13.79:1 on white, 12.63:1 on pale sky), muted `#4a5a85` (6.79:1); grass `#58d36b` only for the primary action, with navy text (7.19:1); grape `#6741d9` for selected states and secondary buttons, white text (6.3:1); sun `#ffd23f` for stars, rewards and Claim (navy text 9.55:1). Never red or orange.
- Type pair: Fredoka, bold, outlined in navy, for titles, numbers and buttons; Nunito Black/ExtraBold for everything else.
- Corners: 16–26px, chunky; round icon buttons; every shape has a 3px navy outline.
- Shadow: a hard bottom depth shadow with no blur (`0 6px 0` a darker shade, then navy) that collapses when pressed; a white gloss band on buttons.
- States: rest = standing on a hard ground shadow; hover = lifts 2px, brightens, a shine sweeps across; pressed = drops onto its shadow and squashes; selected = grape, popped up (chips, tabs), grass with a white tick (checkbox, toggle), a grape gem (radio); disabled = locked: grey face, grey outline, a lock icon; focus = a sun-yellow selection arrow bobbing above the control, like a game-menu cursor (above the label for text fields).
- Motion: snappy, 150–200ms; buttons press down and squash; rewards pop with overshoot (`cubic-bezier(.34,1.56,.64,1)`); idle loops (clouds, pulse on the next level, stripes on bars) stop under reduced motion.

## The site (/trails), in Dawn
- A guide, not a search page: it reads like a book of old travel prints. Order: opening plate and title, Contents (a one-line chooser "Show me walks [of any length] [anywhere]" plus a no-permit toggle; entries that don't fit get a dashed square and grey italic, nothing disappears), then one chapter per walk (large plate, 2–3 sourced intro sentences, three stops along the way, distance / days / high point, best-months strip, permit line, "Add to my list" as the one loch button, "See all N plates", sources and data notes, back to contents), then "Before you go" with every credit.
- Interactions (faked in the browser, nothing stored): the contents chooser; jump links; the plates viewer (native dialog, Esc closes, arrow keys move); "Add to my list", counted in the header for this visit only.
- Intros: src/data/trailIntros.json, every sentence with its sources (researched 11 Oct 2026). Data notes shown to readers are written for readers, not for us.
- Photos: src/data/trailPhotos.json, 3–4 per trail in route order, one marked cover. Photochrom prints shown as they are; modern Unsplash photos get treatment A (src/components/dawn/Toned.tsx). Never use a photo whose recorded location is off the route.
- Heights use elevation(h): when no source publishes one (Kumano), the site says "not published" instead of guessing.
- Filtering logic lives in src/app/trails/filters.ts and is tested (npm test).
- Desktop first; phone layout to be adapted after desktop is approved.
