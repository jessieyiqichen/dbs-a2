# Twelve Trails · Design, Build, Ship, Assignment 2

A guide to twelve famous hikes, for people who love hiking, from those just browsing to those picking their next trip.

- `/` the hub: three mood boards, three design systems, the site, my pick and why, and the browser check
- `/mood-boards/field-notes`, `/mood-boards/dawn`, `/mood-boards/trail-quest`
- `/design-systems/field-notes`, `/design-systems/dawn`, `/design-systems/trail-quest`
- `/trails` the site, in Dawn: twelve walks with search and filters, a page per walk, a list kept for the visit

Static Next.js and Tailwind (`output: "export"`): no database, accounts, APIs or storage.

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # filters, months, walks, tokens
npm run build   # static site in out/
```

`AGENTS.md` holds the brief and the design rules the agent followed; `log.md` records, in Chinese, each request and decision along the way. Photochrom prints are from the Library of Congress (no known restrictions); other photographs are from Unsplash (Unsplash License); every photograph is credited on the site.
