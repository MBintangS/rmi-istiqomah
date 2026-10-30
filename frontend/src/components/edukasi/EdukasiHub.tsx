import Link from "next/link";
import { PERMAINAN_CATALOG } from "@/data/permainan/catalog";
import { TOPIK_BELAJAR } from "@/data/belajar/topik";
import { cn } from "@/lib/utils";

const cardFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const DOOR = [
  { height: "h-24 sm:h-28", tone: "bg-secondary" },
  { height: "h-32 sm:h-36", tone: "bg-primary" },
  { height: "h-40 sm:h-44", tone: "bg-on-ink/15" },
];

function Arrow() {
  return (
    <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
      →
    </span>
  );
}

function PermainanCard() {
  return (
    <Link
      href="/permainan"
      className={cn(
        "group relative flex min-h-[24rem] flex-col overflow-hidden rounded-[1.75rem] bg-ink px-6 pt-7 text-on-ink transition-shadow hover:shadow-soft sm:min-h-[28rem] sm:px-8 sm:pt-8",
        cardFocus,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
        {PERMAINAN_CATALOG.length} permainan
      </p>
      <h2 className="mt-4 font-play text-4xl font-semibold leading-tight text-on-ink sm:text-5xl">Permainan</h2>
      <p className="mt-3 max-w-[32ch] text-sm text-on-ink/70 sm:text-base">
        Tebak huruf, susun urutan wudu, cari kata, cocokkan asmaul husna, jawab kuis, dan pilih sikap terbaik.
      </p>
      <span className="mt-5 inline-flex items-center text-caption font-medium text-secondary">
        Mulai bermain
        <Arrow />
      </span>

      <div className="mt-auto flex items-end justify-center gap-3 pt-10" aria-hidden="true">
        {DOOR.map((door, i) => (
          <span
            key={door.tone}
            className={cn(
              "w-16 rounded-t-[999px] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 sm:w-20",
              door.height,
              door.tone,
            )}
            style={{ transitionDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    </Link>
  );
}

function BelajarCard() {
  return (
    <Link
      href="/belajar"
      className={cn(
        "group relative flex min-h-[24rem] flex-col overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-surface px-6 py-7 transition-shadow hover:shadow-soft sm:min-h-[28rem] sm:px-8 sm:py-8",
        cardFocus,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
        {TOPIK_BELAJAR.length} materi
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-heading sm:text-5xl">Belajar</h2>
      <p className="mt-3 max-w-[32ch] text-sm text-foreground/65 sm:text-base">
        Materi singkat tentang huruf hijaiyah, tata cara wudu, dan asmaul husna.
      </p>
      <span className="mt-5 inline-flex items-center text-caption font-medium text-primary">
        Mulai belajar
        <Arrow />
      </span>

      <div
        className="belajar-ruled mt-auto h-28 rounded-2xl bg-background px-5 pt-12 [--rule-gap:3rem] sm:px-6"
        aria-hidden="true"
      >
        <p lang="ar" dir="rtl" className="font-arabic text-5xl leading-[3rem] text-heading">
          ا ب ت ث
        </p>
      </div>
    </Link>
  );
}

export function EdukasiHub() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <BelajarCard />
      <PermainanCard />
    </div>
  );
}
