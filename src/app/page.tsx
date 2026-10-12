import Image from "next/image";
import Link from "next/link";
import { Caveat, Fredoka, Newsreader, Old_Standard_TT } from "next/font/google";
import { styles, type StyleId } from "@/data/styles";

// Each style's own display face, so the design-system cards show their "Aa" truthfully.
const caveat = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--hub-fn" });
const oldStandard = Old_Standard_TT({ subsets: ["latin"], weight: ["400"], variable: "--hub-dw" });
const fredoka = Fredoka({ subsets: ["latin"], weight: ["700"], variable: "--hub-tq" });
// The hub's own voice: a quiet book serif that belongs to none of the three styles, so none is favoured.
const newsreader = Newsreader({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--hub-serif" });
const serif = "font-[family-name:var(--hub-serif)]";
const FACE: Record<StyleId, string> = {
  "field-notes": "font-[family-name:var(--hub-fn)]",
  dawn: "font-[family-name:var(--hub-dw)]",
  "trail-quest": "font-[family-name:var(--hub-tq)]",
};

function Stripes({ colors }: { colors: string[] }) {
  return (
    <span className="flex h-14 border-b border-black/10" aria-hidden="true">
      {colors.map((c) => (
        <span key={c} className="flex-1" style={{ background: c }} />
      ))}
    </span>
  );
}

/** One card shape for every style link, so the three line up: a preview band, the name and arrow, one quiet line. */
function StyleCard({ href, preview, name, note, picked = false }: { href: string; preview: React.ReactNode; name: string; note: string; picked?: boolean }) {
  return (
    <Link href={href} className={`${card} relative ${picked ? "border-black/50" : ""}`}>
      {picked && <span className="absolute right-2 top-2 z-10 bg-foreground px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-background">Picked</span>}
      {preview}
      <span className="flex items-baseline justify-between gap-3 px-4 pt-3">
        <span className={`${serif} whitespace-nowrap text-lg`}>{name}</span>
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
      <span className="px-4 pb-3 pt-0.5 text-xs text-black/60">{note}</span>
    </Link>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-black/10 py-8">
      <h2 className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-black/60">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-foreground text-[10px] text-background">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

// What was checked on the site, one line each. Kept to what was actually tried.
const CHECKS: [string, string][] = [
  ["Both widths", "Every page fits at 1440 and at 390, with no sideways scrolling."],
  ["Keyboard", "Tab reaches every control in reading order and shows Dawn's crop marks; arrow keys move through tabs and the route map."],
  ["Search and filters", "\"Namche\" and \"thorsmork\" find their walks; each filter shows how many walks it leaves; Clear all brings back twelve."],
  ["My list", "Adding a walk lights up My list and its count; the side panel lists and removes walks; a reload clears it."],
  ["Plates viewer", "Opens on the chosen plate; arrow keys move; Esc closes it and focus returns."],
];

const SHOTS: [string, string][] = [
  ["hub", "Hub"],
  ["trails", "The Walking Atlas"],
  ["milford", "A walk: Milford Track"],
];

const card =
  "group flex h-full flex-col overflow-hidden rounded-sm border border-black/15 bg-white transition hover:border-black/40 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:translate-y-px";

const button =
  "inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:translate-y-px";

export default function Hub() {
  return (
    <main className={`${caveat.variable} ${oldStandard.variable} ${fredoka.variable} ${newsreader.variable} mx-auto w-full max-w-4xl px-5 py-14`}>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-black/60">UI/UX &amp; Visual Design · Hub</p>
      <h1 className={`${serif} mt-2 text-5xl leading-tight`}>The Walking Atlas</h1>
      <p className="mt-3 max-w-2xl text-black/70">
        A guide to twelve famous hikes around the world, for people who love hiking, from those just browsing to those
        picking their next trip. Three visual styles were explored, each with a mood board and a design system; the site is
        built in the one I picked.
      </p>

      <div className="mt-10">
        <Section n={1} title="Mood boards">
          <ul className="grid gap-3 sm:grid-cols-3">
            {styles.map((s) => (
              <li key={s.id}>
                <StyleCard href={`/mood-boards/${s.id}/`} picked={s.id === "dawn"} preview={<Stripes colors={s.swatches} />} name={s.name} note={s.keywords.join(" · ")} />
              </li>
            ))}
          </ul>
        </Section>

        <Section n={2} title="Design systems">
          <ul className="grid gap-3 sm:grid-cols-3">
            {styles.map((s) => (
              <li key={s.id}>
                <StyleCard
                  href={`/design-systems/${s.id}/`}
                  picked={s.id === "dawn"}
                  name={s.name}
                  note="Colour, type, components, states"
                  preview={
                    <span className="flex h-14 items-center justify-between border-b border-black/10 px-4" style={{ background: s.page }} aria-hidden="true">
                      <span className={`${FACE[s.id]} text-3xl leading-none`} style={{ color: s.ink }}>Aa</span>
                      <span className="flex gap-1 pr-14">
                        {s.swatches.slice(2, 5).map((c) => (
                          <span key={c} className="h-4 w-4 rounded-full border border-black/10" style={{ background: c }} />
                        ))}
                      </span>
                    </span>
                  }
                />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-black/60">Each one is built from its mood board.</p>
        </Section>

        <Section n={3} title="My pick, and the site">
          <div className="grid items-center gap-8 md:grid-cols-[1.25fr_1fr]">
            <Link href="/trails/" aria-label="Open The Walking Atlas" className="group block border border-black/15 bg-white p-2 transition hover:border-black/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:translate-y-px">
              <Image src="/browser-check/trails-1440.jpg" alt="The Walking Atlas, its first screen at 1440 wide" width={1440} height={900} className="h-auto w-full" />
            </Link>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-black/60">Picked</p>
              <h3 className={`${serif} mt-1 text-4xl`}>Dawn</h3>
              <ol className="mt-4 space-y-3 text-black/80">
                <li>
                  <span className="font-medium text-foreground">The style and the subject are the same thing.</span> These are old, famous walks, and
                  photochrom printers photographed four of them around 1900: the Milford Track, Mont Blanc, the West Highland Way and Half Dome. The site
                  uses those real prints.
                </li>
                <li>
                  <span className="font-medium text-foreground">The photos lead, and it reads quietly.</span> Plenty of space and plain controls let people
                  take their time, whether they are just browsing or picking their next trip.
                </li>
              </ol>
              <Link href="/trails/" className={`${button} mt-6`}>Open The Walking Atlas <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Section>

        <Section n={4} title="Browser check">
          <p className="text-sm text-black/60">Checked in Chrome at 1440 and 390 wide, and with the keyboard only.</p>
          <dl className="mt-3 divide-y divide-black/10 border-y border-black/10 text-sm">
            {CHECKS.map(([what, result]) => (
              <div key={what} className="grid gap-x-4 py-2 sm:grid-cols-[9rem_1fr]">
                <dt className="font-medium text-foreground">{what}</dt>
                <dd className="text-black/75">{result}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-black/60">The first screen of each page, at 1440 and at 390. Open one to see it full size.</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-4">
            {SHOTS.map(([file, name]) => (
              <li key={file}>
                <p className="mb-1 text-xs text-black/60">{name}</p>
                <span className="flex items-end gap-2">
                  {[1440, 390].map((w) => (
                    <a
                      key={w}
                      href={`/browser-check/${file}-${w}.jpg`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${name} at ${w} wide, full size`}
                      className="block border border-black/15 transition hover:border-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                    >
                      <Image src={`/browser-check/${file}-${w}.jpg`} alt="" width={w === 1440 ? 1440 : 390} height={w === 1440 ? 900 : 844} className="h-28 w-auto" />
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </main>
  );
}
