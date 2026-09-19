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
        "p-[3px] sm:p-[6px]",
        "motion-safe:transition-[border-color,box-shadow] motion-safe:duration-200",
        "hover:border-secondary hover:shadow-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <div
        className={cn(
          "relative flex h-full items-center gap-3 px-3 py-2.5",
          "sm:min-h-[13.5rem] sm:flex-col sm:items-stretch sm:gap-0 sm:px-5 sm:py-4",
          quranFrameInner,
        )}
      >
        <span
          className="pointer-events-none absolute inset-x-8 top-0 hidden h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent sm:block"
          aria-hidden="true"
        />

        <div className="flex shrink-0 items-center sm:w-full sm:items-start sm:justify-between">
          <span className="sm:hidden">
            <SuratMedallion number={surat.number} size="sm" />
          </span>
          <span className="hidden sm:inline-flex">
            <SuratMedallion number={surat.number} />
          </span>
          <span className="hidden rounded-full border border-secondary/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary-alt sm:inline">
            {suratPlaceLabel(surat.revelationPlace)}
          </span>
        </div>

        <div className="min-w-0 flex-1 sm:mt-5 sm:flex sm:flex-1 sm:flex-col sm:items-center sm:text-center">
          <h2 className="font-display truncate text-sm font-bold tracking-tight text-heading sm:order-2 sm:mt-3 sm:text-center sm:text-lg">
            {surat.nameLatin}
          </h2>
          <p
            lang="ar"
            dir="rtl"
            className={cn(
              arabicClassName,
              "hidden font-bold leading-none text-heading sm:order-1 sm:mt-0 sm:block sm:text-center sm:text-[2rem]",
            )}
          >
            {surat.nameArabic}
          </p>
          <p className="mt-0.5 truncate text-caption text-foreground/65 sm:order-3 sm:mt-1 sm:text-center sm:text-sm">
            {surat.meaning}
          </p>
        </div>

        <div className="shrink-0 text-right sm:hidden">
          <p
            lang="ar"
            dir="rtl"
            className={cn(arabicClassName, "text-lg font-bold leading-none text-heading")}
          >
            {surat.nameArabic}
          </p>
          <p className="mt-1 text-[11px] tabular-nums text-primary">{surat.verseCount} ayat</p>
        </div>

        <p className="mt-0 hidden items-center justify-between pt-0 text-caption text-primary sm:mt-auto sm:flex sm:w-full sm:pt-5">
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
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3" aria-busy="true">
              {Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-[1.5rem] sm:h-56" />
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
                <ul className="grid gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
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
