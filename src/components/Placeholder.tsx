import Link from "next/link";

export default function Placeholder({ title }: { title: string }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <Link href="/" className="text-sm text-black/60 underline-offset-4 hover:underline">
        ← Hub
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-black/60">In progress.</p>
    </main>
  );
}
