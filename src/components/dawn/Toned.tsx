// A trail photo. Photochrom prints are shown as they are; modern photos get treatment A, the photochrom look:
// half the colour lifted out, warm cream in the highlights, soft contrast, lifted blacks. Chosen 11 Oct 2026.
import Image from "next/image";

export type TrailPhoto = {
  file: string;
  kind: "photochrom" | "modern";
  alt: string;
  place: string;
  author: string;
  date?: string;
  license: string;
  source: string;
  w: number;
  h: number;
  cover: boolean;
};

export const TONE_FILTER = "saturate(.55) sepia(.28) contrast(.9) brightness(1.06)";
export const TONE_OVERLAY = "linear-gradient(180deg, #f6efd6 0%, #c1d1ad 45%, #b5a483 100%)";

export function TonedPhoto({ photo, sizes, priority = false, className = "" }: { photo: TrailPhoto; sizes: string; priority?: boolean; className?: string }) {
  const modern = photo.kind === "modern";
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image src={photo.file} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" style={modern ? { filter: TONE_FILTER } : undefined} />
      {modern && <span aria-hidden="true" className="absolute inset-0 opacity-55 mix-blend-soft-light" style={{ background: TONE_OVERLAY }} />}
    </span>
  );
}

/** One line of credit, as the prints carried theirs. */
export function creditLine(p: TrailPhoto): string {
  return p.kind === "photochrom" ? `${p.place} · photochrom, ${p.author}, ${p.date}` : `${p.place} · photo ${p.author} / Unsplash, toned`;
}
