import Link from "next/link";
import { Caveat, Fredoka, Old_Standard_TT } from "next/font/google";
import { styles, type StyleId } from "@/data/styles";

// Each style's own display face, so the design-system cards show their "Aa" truthfully.
const caveat = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--hub-fn" });
const oldStandard = Old_Standard_TT({ subsets: ["latin"], weight: ["400"], variable: "--hub-dw" });
const fredoka = Fredoka({ subsets: ["latin"], weight: ["700"], variable: "--hub-tq" });
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
function StyleCard({ href, preview, name, note }: { href: string; preview: React.ReactNode; name: string; note: string }) {
  return (
    <Link href={href} className={card}>
      {preview}
      <span className="flex items-baseline justify-between gap-3 px-4 pt-3">
        <span className="whitespace-nowrap font-medium">{name}</span>
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

const card =
  "group flex h-full flex-col overflow-hidden rounded-lg border border-black/15 bg-white transition hover:border-black/40 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:translate-y-px";

export default function Hub() {
  return (
    <main className={`${caveat.variable} ${oldStandard.variable} ${fredoka.variable} mx-auto w-full max-w-3xl px-5 py-14`}>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-black/60">UI/UX &amp; Visual Design · Hub</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Twelve Trails</h1>
      <p className="mt-3 max-w-xl text-black/70">
        A guide to twelve famous hikes around the world. Three visual styles were explored, each with a mood board and a
        design system; the site is built in the one that won.
      </p>

      <div className="mt-10">
        <Section n={1} title="Mood boards">
          <ul className="grid gap-3 sm:grid-cols-3">
            {styles.map((s) => (
              <li key={s.id}>
                <StyleCard href={`/mood-boards/${s.id}/`} preview={<Stripes colors={s.swatches} />} name={s.name} note={s.keywords.join(" · ")} />
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
                  name={s.name}
                  note="Colour, type, components, states"
                  preview={
                    <span className="flex h-14 items-center justify-between border-b border-black/10 px-4" style={{ background: s.page }} aria-hidden="true">
                      <span className={`${FACE[s.id]} text-3xl leading-none`} style={{ color: s.ink }}>Aa</span>
                      <span className="flex gap-1">
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

        <Section n={3} title="The site">
          <Link
            href="/trails/"
            className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:translate-y-px"
          >
            Open Twelve Trails →
          </Link>
        </Section>
      </div>
    </main>
  );
}
