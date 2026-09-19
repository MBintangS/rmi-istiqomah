"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { QuranAyahPlayButton, QuranAudioBar } from "@/components/ibadah/QuranAudioBar";
import {
  QuranSearchField,
  SuratMedallion,
  quranFrameInner,
  quranFrameOuter,
} from "@/components/ibadah/quran-ui";
import { Button, Drawer, EmptyState, Skeleton } from "@/components/ui";
import { useQuranAudio } from "@/hooks/useQuranAudio";
import { useQuranCatalog, useQuranSurat } from "@/hooks/useQuran";
import { useQuranPrefs } from "@/hooks/useQuranPrefs";
import { getApiErrorMessage } from "@/lib/api";
import { filterQuranSurat, suratPlaceLabel } from "@/lib/quran";
import { cn } from "@/lib/utils";
import type { QuranSuratNeighbor, QuranSuratSummary } from "@/types/api";

function SuratAdjacentNav({
  previous,
  next,
}: {
  previous: QuranSuratNeighbor | null;
  next: QuranSuratNeighbor | null;
}) {
  return (
    <nav aria-label="Surat sebelumnya dan berikutnya" className="grid grid-cols-2 gap-2">
      {previous ? (
        <Link
          href={`/ibadah/al-quran/${previous.number}`}
          className="inline-flex min-h-10 max-w-full items-center justify-self-start truncate rounded-full border border-secondary/35 px-3 text-caption font-medium text-primary hover:border-secondary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          ← {previous.nameLatin}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/ibadah/al-quran/${next.number}`}
          className="inline-flex min-h-10 max-w-full items-center justify-self-end truncate rounded-full border border-secondary/35 px-3 text-caption font-medium text-primary hover:border-secondary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {next.nameLatin} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function SuratNavList({
  items,
  active,
  arabicClassName,
  searchId,
  onNavigate,
}: {
  items: QuranSuratSummary[];
  active: number;
  arabicClassName: string;
  searchId: string;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => filterQuranSurat(items, { query }), [items, query]);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (query.trim()) return;
    const item = activeRef.current?.closest("li");
    const container = listRef.current;
    if (!item || !container) return;
    container.scrollTop = Math.max(0, item.offsetTop - container.clientHeight / 3);
  }, [active, query, filtered.length]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-secondary/20 p-3">
        <QuranSearchField
          id={searchId}
          label="Cari di daftar"
          value={query}
          onChange={setQuery}
          placeholder="Nama atau nomor"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="p-4">
          <EmptyState
            title="Tidak ada surat yang cocok"
            description="Ubah kata kunci, atau hapus pencarian."
            actionLabel="Hapus pencarian"
            onAction={() => setQuery("")}
          />
        </div>
      ) : (
        <ul ref={listRef} className="relative min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
          {filtered.map((surat) => {
            const current = surat.number === active;
            return (
              <li key={surat.number}>
                <Link
                  ref={current ? activeRef : undefined}
                  href={`/ibadah/al-quran/${surat.number}`}
                  aria-current={current ? "page" : undefined}
                  onClick={onNavigate}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-[1rem] border px-2.5 py-2",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    current
                      ? "border-secondary bg-secondary/20"
                      : "border-transparent hover:border-secondary/30 hover:bg-primary/5",
                  )}
                >
                  <SuratMedallion number={surat.number} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-heading">{surat.nameLatin}</span>
                    <span className="flex items-baseline justify-between gap-2">
                      <span
                        lang="ar"
                        dir="rtl"
                        className={cn(arabicClassName, "truncate text-sm text-heading/80")}
                      >
                        {surat.nameArabic}
                      </span>
                      <span className="shrink-0 text-caption text-foreground/50">{surat.verseCount} ayat</span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function QuranReaderContent({
  nomor,
  arabicClassName,
}: {
  nomor: number;
  arabicClassName: string;
}) {
  const catalog = useQuranCatalog();
  const { data, isLoading, isError, error, refetch } = useQuranSurat(nomor);
  const { prefs, setPrefs } = useQuranPrefs();
  const audio = useQuranAudio(data?.audioFull, data?.verses, prefs.qariId);
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    audio.stop();
    // Stop when switching surat. audio.stop is stable enough for this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nomor]);

  const qari = catalog.data?.qari ?? [];
  const items = catalog.data?.items ?? [];

  return (
    <section className="bg-background pb-[max(8rem,calc(env(safe-area-inset-bottom)+6.5rem))] pt-8 sm:pb-16 sm:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-caption text-foreground/70">
          <Link href="/ibadah" className="hover:text-primary">
            Ibadah
          </Link>
          <span className="mx-1.5 text-foreground/30">/</span>
          <Link href="/ibadah/al-quran" className="hover:text-primary">
            {"Al-Qur'an"}
          </Link>
          {data ? (
            <>
              <span className="mx-1.5 text-foreground/30">/</span>
              <span className="font-medium text-foreground">{data.nameLatin}</span>
            </>
          ) : null}
        </nav>

        <div className="mb-4 lg:hidden">
          <Button type="button" variant="outline" size="sm" className="min-h-11" onClick={() => setListOpen(true)}>
            Pilih surat
          </Button>
        </div>

        {isError || (!isLoading && !data) ? (
          <EmptyState
            title="Surat tidak bisa dimuat"
            description={getApiErrorMessage(error, "Periksa nomor surat, lalu coba lagi.")}
            actionLabel="Coba lagi"
            onAction={() => refetch()}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,1fr)] lg:items-start">
            <aside className={cn("hidden max-h-[calc(100vh-8rem)] lg:sticky lg:top-20 lg:block", quranFrameOuter)}>
              <div className={cn("flex h-full max-h-[calc(100vh-8.75rem)] min-h-0 flex-col overflow-hidden", quranFrameInner)}>
                {catalog.isLoading && !items.length ? (
                  <div className="space-y-2 p-4">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                  </div>
                ) : (
                  <SuratNavList
                    items={items}
                    active={nomor}
                    arabicClassName={arabicClassName}
                    searchId="quran-nav-search-aside"
                  />
                )}
              </div>
            </aside>

            <div className="min-w-0 space-y-4">
              {isLoading && !data ? (
                <Skeleton className="h-[32rem] rounded-[1.75rem]" />
              ) : data ? (
                <>
                  <header className={quranFrameOuter}>
                    <div className={cn("relative px-4 py-4 sm:px-5", quranFrameInner)}>
                      <span
                        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="grid grid-cols-2 items-center gap-3 sm:gap-5">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <SuratMedallion number={data.number} size="sm" />
                            <span className="rounded-full border border-secondary/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary-alt">
                              {suratPlaceLabel(data.revelationPlace)}
                            </span>
                            <span className="text-caption text-foreground/50">{data.verseCount} ayat</span>
                          </div>
                          <h1 className="font-display mt-2 text-xl font-bold tracking-tight text-heading sm:text-2xl">
                            {data.nameLatin}
                          </h1>
                          <p className="mt-1 text-sm text-foreground/65">{data.meaning}</p>
                        </div>
                        <p
                          lang="ar"
                          dir="rtl"
                          className={cn(
                            arabicClassName,
                            "text-right text-2xl font-bold leading-tight text-heading sm:text-3xl",
                          )}
                        >
                          {data.nameArabic}
                        </p>
                      </div>
                      <div className="mt-3">
                        <SuratAdjacentNav previous={data.previous} next={data.next} />
                      </div>
                    </div>
                  </header>

                  <div className="fixed inset-x-0 bottom-0 z-30 border-t border-secondary/25 bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:sticky lg:top-[80px] lg:z-20 lg:border-0 lg:bg-transparent lg:p-0 lg:pb-0 lg:backdrop-blur-none">
                    <QuranAudioBar
                      qari={qari}
                      qariId={prefs.qariId}
                      onQariChange={(qariId) => setPrefs((current) => ({ ...current, qariId }))}
                      showLatin={prefs.showLatin}
                      showTranslation={prefs.showTranslation}
                      onToggleLatin={() =>
                        setPrefs((current) => ({ ...current, showLatin: !current.showLatin }))
                      }
                      onToggleTranslation={() =>
                        setPrefs((current) => ({ ...current, showTranslation: !current.showTranslation }))
                      }
                      surahPlaying={audio.isPlaying({ kind: "surah" })}
                      onToggleSurah={() => audio.play({ kind: "surah" })}
                    />
                  </div>

                  <ol className="space-y-3">
                    {data.verses.map((ayat) => {
                      const playing = audio.isPlaying({ kind: "ayah", number: ayat.number });
                      return (
                        <li
                          key={ayat.number}
                          id={`ayat-${ayat.number}`}
                          className={cn(quranFrameOuter, "scroll-mt-28 lg:scroll-mt-32", playing && "border-secondary")}
                        >
                          <div className={cn("relative px-4 py-5 sm:px-6", quranFrameInner)}>
                            <div className="flex items-start justify-between gap-3">
                              <SuratMedallion number={ayat.number} size="sm" />
                              <QuranAyahPlayButton
                                playing={playing}
                                onClick={() => audio.play({ kind: "ayah", number: ayat.number })}
                              />
                            </div>
                            <p
                              lang="ar"
                              dir="rtl"
                              className={cn(
                                arabicClassName,
                                "mt-4 text-right text-[1.65rem] font-bold leading-[2.05] text-heading sm:text-[1.9rem]",
                              )}
                            >
                              {ayat.arabic}
                            </p>
                            {prefs.showLatin ? (
                              <p className="mt-3 text-sm italic leading-relaxed text-foreground/65">{ayat.latin}</p>
                            ) : null}
                            {prefs.showTranslation ? (
                              <p className="mt-3 text-body text-foreground/80">{ayat.translation}</p>
                            ) : null}
                          </div>
                        </li>
                      );
                    })}
                  </ol>

                  <div className={quranFrameOuter}>
                    <div className={cn("px-4 py-4 sm:px-5", quranFrameInner)}>
                      <SuratAdjacentNav previous={data.previous} next={data.next} />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>

      <Drawer
        open={listOpen}
        onClose={() => setListOpen(false)}
        title="Pilih surat"
        side="left"
        contentClassName="flex h-full min-h-0 flex-col overflow-hidden p-0"
      >
        <SuratNavList
          items={items}
          active={nomor}
          arabicClassName={arabicClassName}
          searchId="quran-nav-search-drawer"
          onNavigate={() => setListOpen(false)}
        />
      </Drawer>
    </section>
  );
}
