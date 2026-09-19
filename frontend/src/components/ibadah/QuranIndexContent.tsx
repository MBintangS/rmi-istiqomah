"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  QuranPlaceFilter,
  QuranSearchField,
  SuratMedallion,
  quranFrameInner,
  quranFrameOuter,
} from "@/components/ibadah/quran-ui";
import { PageHero } from "@/components/layout/PageHero";
import { EmptyState, Skeleton } from "@/components/ui";
import { useQuranCatalog } from "@/hooks/useQuran";
import { getApiErrorMessage } from "@/lib/api";
import { filterQuranSurat, suratPlaceLabel } from "@/lib/quran";
import { cn } from "@/lib/utils";
import type { QuranRevelationPlace, QuranSuratSummary } from "@/types/api";

function QuranSuratCard({
  surat,
  arabicClassName,
}: {
  surat: QuranSuratSummary;
  arabicClassName: string;
}) {
  return (
    <Link
      href={`/ibadah/al-quran/${surat.number}`}
      className={cn(
        "group flex h-full cursor-pointer flex-col",
        quranFrameOuter,
        "motion-safe:transition-[border-color,box-shadow] motion-safe:duration-200",
        "hover:border-secondary hover:shadow-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <div className={cn("relative flex h-full min-h-[13.5rem] flex-col px-4 py-4 sm:px-5", quranFrameInner)}>
        <span
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent"
          aria-hidden="true"
        />

        <div className="flex items-start justify-between gap-3">
          <SuratMedallion number={surat.number} />
          <span className="rounded-full border border-secondary/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary-alt">
            {suratPlaceLabel(surat.revelationPlace)}
          </span>
        </div>

        <p
          lang="ar"
          dir="rtl"
          className={cn(
            arabicClassName,
            "mt-5 text-center text-[1.85rem] font-bold leading-none text-heading sm:text-[2rem]",
          )}
        >
          {surat.nameArabic}
        </p>
        <h2 className="font-display mt-3 text-center text-lg font-bold tracking-tight text-heading">
          {surat.nameLatin}
        </h2>
        <p className="mt-1 text-center text-sm text-foreground/65">{surat.meaning}</p>

        <p className="mt-auto flex items-center justify-between pt-5 text-caption text-primary">
          <span>{surat.verseCount} ayat</span>
          <span className="inline-flex items-center font-medium">
            Baca
            <span
              className="ml-1 text-primary/70 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </p>
      </div>
    </Link>
  );
}

export function QuranIndexContent({ arabicClassName }: { arabicClassName: string }) {
  const { data, isLoading, isError, error, refetch } = useQuranCatalog();
  const [query, setQuery] = useState("");
  const [place, setPlace] = useState<QuranRevelationPlace | "">("");

  const counts = useMemo(() => {
    const items = data?.items ?? [];
    return {
      all: items.length,
      mekah: items.filter((item) => item.revelationPlace === "Mekah").length,
      madinah: items.filter((item) => item.revelationPlace === "Madinah").length,
    };
  }, [data]);

  const filtered = useMemo(
    () => filterQuranSurat(data?.items ?? [], { query, place }),
    [data, query, place],
  );

  const hasFilter = Boolean(query.trim() || place);

  return (
    <>
      <PageHero
        title="Al-Qur'an"
        description="Pilih surat, lalu baca Arab, latin, dan terjemah."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Ibadah", href: "/ibadah" },
          { label: "Al-Qur'an" },
        ]}
      />

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {isLoading && !data ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} className="h-56 rounded-[1.5rem]" />
              ))}
            </div>
          ) : isError || !data ? (
            <EmptyState
              title="Daftar surat tidak bisa dimuat"
              description={getApiErrorMessage(error, "Periksa koneksi, lalu coba lagi.")}
              actionLabel="Coba lagi"
              onAction={() => refetch()}
            />
          ) : (
            <div className="space-y-6">
              <div className={quranFrameOuter} role="search">
                <div className={cn(quranFrameInner, "space-y-4 p-4 sm:p-5")}>
                  <QuranSearchField
                    id="quran-search"
                    label="Cari surat"
                    value={query}
                    onChange={setQuery}
                    placeholder="Nama, arti, atau nomor — misalnya Yasin atau 36"
                  />
                  <QuranPlaceFilter value={place} onChange={setPlace} counts={counts} />
                  <p className="text-caption text-foreground/55" aria-live="polite">
                    {hasFilter
                      ? `${filtered.length} dari ${counts.all} surat`
                      : `${filtered.length} surat`}
                  </p>
                </div>
              </div>

              {filtered.length === 0 ? (
                <EmptyState
                  title="Tidak ada surat yang cocok"
                  description="Ubah kata kunci, atau tampilkan semua tempat turun."
                  actionLabel="Hapus filter"
                  onAction={() => {
                    setQuery("");
                    setPlace("");
                  }}
                />
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((surat) => (
                    <li key={surat.number}>
                      <QuranSuratCard surat={surat} arabicClassName={arabicClassName} />
                    </li>
                  ))}
                </ul>
              )}

              <p className="text-caption text-foreground/45">Sumber: EQuran.id</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
