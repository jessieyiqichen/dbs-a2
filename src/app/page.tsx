import Link from "next/link";
import { styles } from "@/data/styles";

function Swatches({ colors }: { colors: string[] }) {
  return (
    <span className="flex" aria-hidden="true">
      {colors.map((c) => (
        <span key={c} className="h-6 w-6 border border-black/10" style={{ background: c }} />
      ))}
    </span>
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
  "flex items-center justify-between gap-4 rounded-lg border border-black/15 bg-white px-4 py-3 transition hover:border-black/40 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:translate-y-px";

export default function Hub() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
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
                <Link href={`/mood-boards/${s.id}/`} className={card}>
                  <Swatches colors={s.swatches} />
                  <span className="text-sm font-medium">{s.name} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section n={2} title="Design systems">
          <ul className="grid gap-3 sm:grid-cols-3">
            {styles.map((s) => (
              <li key={s.id}>
                <Link href={`/design-systems/${s.id}/`} className={card}>
                  <span className="text-lg">Aa</span>
                  <Swatches colors={s.swatches.slice(0, 3)} />
                  <span className="text-sm font-medium">{s.name} →</span>
                </Link>
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
