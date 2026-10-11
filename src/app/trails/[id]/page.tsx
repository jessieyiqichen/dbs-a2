import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hikes } from "@/data/hikes";
import TrailDetail from "../TrailDetail";

// Every walk's page is built to HTML at build time; there are no others.
export const dynamicParams = false;

export function generateStaticParams() {
  return hikes.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const h = hikes.find((x) => x.id === id);
  return h ? { title: `${h.name} · Twelve Trails`, description: h.why } : {};
}

export default async function TrailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!hikes.some((h) => h.id === id)) notFound();
  return <TrailDetail id={id} />;
}
