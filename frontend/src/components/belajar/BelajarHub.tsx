import Link from "next/link";
import { type ReactNode } from "react";
import { TOPIK_BELAJAR } from "@/data/belajar/topik";
import { cn } from "@/lib/utils";
import type { TopikBelajar } from "@/types/belajar";

const cardFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const LATIHAN: Partial<Record<TopikBelajar["slug"], { href: string; label: string }>> = {
  "huruf-hijaiyah": { href: "/permainan/kenal-hijaiyah", label: "Kenal Hijaiyah" },
  "tata-cara-wudu": { href: "/permainan/urutan-wudu", label: "Urutan Wudu" },
  "asmaul-husna": { href: "/permainan/cocok-asmaul-husna", label: "Cocok Asmaul Husna" },
};

const ARTEFAK: Record<TopikBelajar["slug"], { eyebrow: string; visual: ReactNode }> = {
  "huruf-hijaiyah": {
    eyebrow: "28 huruf",
    visual: (
      <span lang="ar" dir="rtl" className="font-arabic text-5xl leading-[3rem] text-heading">
        ا ب ت
      </span>
    ),
  },
  "tata-cara-wudu": {
    eyebrow: "8 langkah",
    visual: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 text-primary" fill="none" aria-hidden="true">
        <path d="M24 6c0 8-12 15-12 25a12 12 0 0 0 24 0C36 21 24 14 24 6Z" className="fill-current" />
        <path d="M19 31a5 5 0 0 0 5 5" stroke="white" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  "asmaul-husna": {
    eyebrow: "99 nama",
    visual: (
      <span lang="ar" dir="rtl" className="font-arabic text-5xl leading-[3rem] text-heading">
        ٩٩
      </span>
    ),
  },
};

function TopikCard({ topik }: { topik: TopikBelajar }) {
  const artefak = ARTEFAK[topik.slug];
  const latihan = LATIHAN[topik.slug];

  return (
    <li className="flex flex-col overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-surface">
      <Link
        href={`/belajar/${topik.slug}`}
        className={cn("group flex flex-1 flex-col px-6 pb-6 pt-6 transition-colors hover:bg-primary/[0.04] sm:px-7", cardFocus)}
      >
        <div className="belajar-ruled flex h-36 items-start justify-center rounded-2xl bg-background pt-12 [--rule-gap:3rem]" aria-hidden="true">
          {artefak.visual}
        </div>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{artefak.eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-heading">{topik.title}</h2>
        <p className="mt-2 text-sm text-foreground/70">{topik.summary}</p>
        <span className="mt-5 inline-flex items-center text-caption font-medium text-primary">
          Buka materi
          <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
      {latihan ? (
        <Link
          href={latihan.href}
          className={cn(
            "flex min-h-12 items-center border-t border-foreground/10 px-6 text-sm text-foreground/70 transition-colors hover:text-primary sm:px-7",
            cardFocus,
          )}
        >
          Latihan: permainan {latihan.label}
        </Link>
      ) : null}
    </li>
  );
}

export function BelajarHub() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {TOPIK_BELAJAR.map((topik) => (
        <TopikCard key={topik.slug} topik={topik} />
      ))}
    </ul>
  );
}
