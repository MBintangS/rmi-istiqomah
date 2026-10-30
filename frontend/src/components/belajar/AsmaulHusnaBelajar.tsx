"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { Input, Label } from "@/components/ui";
import { ASMAUL_HUSNA } from "@/data/belajar/asmaul-husna";

const rapikan = (text: string) => text.toLowerCase().replace(/[^a-z0-9 ]/g, "");

const INDEX = ASMAUL_HUSNA.map((nama) => ({
  nama,
  kunci: `${nama.nomor} ${rapikan(nama.latin)} ${rapikan(nama.latin).replace(/ /g, "")} ${rapikan(nama.arti)}`,
}));

export function AsmaulHusnaBelajar() {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const hasil = useMemo(() => {
    const q = rapikan(deferred.trim());
    if (!q) return ASMAUL_HUSNA;
    return INDEX.filter(({ kunci }) => kunci.includes(q)).map(({ nama }) => nama);
  }, [deferred]);

  return (
    <div className="space-y-8">
      <figure className="belajar-ruled rounded-[1.75rem] border border-foreground/10 bg-surface px-5 py-6 [--rule-gap:3.25rem] sm:px-8 sm:py-8">
        <blockquote>
          <p lang="ar" dir="rtl" className="font-arabic text-3xl leading-[3.25rem] text-heading sm:text-4xl sm:leading-[3.25rem]">
            وَلِلّٰهِ الْاَسْمَاۤءُ الْحُسْنٰى فَادْعُوْهُ بِهَا
          </p>
          <p className="mt-4 max-w-[60ch] text-sm text-foreground/75 sm:text-base">
            &ldquo;Dan Allah memiliki asmaul husna (nama-nama yang terbaik), maka bermohonlah kepada-Nya dengan
            menyebutnya.&rdquo;
          </p>
        </blockquote>
        <figcaption className="mt-2 text-xs text-foreground/60">QS. Al-A&apos;raf ayat 180</figcaption>
      </figure>

      <div className="flex flex-col gap-4 rounded-[1.75rem] bg-primary/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="max-w-[60ch] text-sm text-foreground/75">
          Sudah mengenal beberapa nama? Coba pasangkan nama Arab dengan artinya.
        </p>
        <Link
          href="/permainan/cocok-asmaul-husna"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Latihan di Cocok Asmaul Husna →
        </Link>
      </div>

      <div className="max-w-md space-y-2">
        <Label htmlFor="cari-asmaul-husna">Cari nama atau arti</Label>
        <Input
          id="cari-asmaul-husna"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Contoh: rahim, pengampun, 33"
          autoComplete="off"
        />
        <p className="text-xs text-foreground/60" aria-live="polite">
          {hasil.length === ASMAUL_HUSNA.length ? "Menampilkan 99 nama" : `${hasil.length} nama ditemukan`}
        </p>
      </div>

      {hasil.length ? (
        <ol dir="rtl" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((nama) => (
            <li
              key={nama.nomor}
              dir="ltr"
              className="flex items-start gap-4 rounded-2xl border border-foreground/10 bg-surface p-4 sm:p-5"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
                aria-label={`Nomor ${nama.nomor}`}
              >
                {nama.nomor}
              </span>
              <div className="min-w-0 flex-1">
                <p lang="ar" dir="rtl" className="font-arabic text-3xl leading-snug text-heading">
                  {nama.arab}
                </p>
                <p className="mt-1 font-display text-base font-bold text-heading">{nama.latin}</p>
                <p className="text-sm text-foreground/70">{nama.arti}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="rounded-2xl border border-dashed border-foreground/15 p-8 text-center">
          <p className="font-display text-base font-bold text-heading">Tidak ada nama yang cocok dengan &ldquo;{query}&rdquo;</p>
          <p className="mt-1 text-sm text-foreground/65">Coba kata lain, misalnya &ldquo;maha&rdquo; atau nomor 1 sampai 99.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Tampilkan semua nama
          </button>
        </div>
      )}
    </div>
  );
}
