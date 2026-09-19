"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import {
  FARDHU_SLOTS,
  formatCountdownId,
  formatClockWib,
  getNextPrayerKey,
  remainingMinutesUntil,
  todayInWib,
} from "@/lib/prayer-times";
import { cn } from "@/lib/utils";

const cardFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function useNowTick(intervalMs = 30_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return new Date(now);
}

function MihrabArch() {
  return (
    <svg
      viewBox="0 0 320 52"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full text-secondary/55"
      aria-hidden="true"
    >
      <path
        d="M16 52 V30 C16 12 64 6 160 6 C256 6 304 12 304 30 V52"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function PrayerTimesCard() {
  const now = useNowTick();
  const today = todayInWib(now);
  const { data, isLoading } = usePrayerTimes(today, "day");
  const nextKey = useMemo(
    () => (data ? getNextPrayerKey(data.times, today, now) : null),
    [data, today, now],
  );
  const slot = nextKey ? FARDHU_SLOTS.find((item) => item.key === nextKey) : null;

  let eyebrow = "Kota Bogor · WIB";
  let title = "Jadwal Sholat";
  let timeLabel: string | null = null;
  let detail = "Buka untuk cek waktu sholat hari ini.";

  if (data && slot) {
    eyebrow = "Menuju";
    title = slot.label;
    timeLabel = data.times[slot.key];
    detail = `${formatCountdownId(remainingMinutesUntil(data.times[slot.key], now))} lagi`;
  } else if (data) {
    eyebrow = "Hari ini";
    title = "Sudah Waktu Isya";
    detail = "Istirahat dulu. Subuh menyusul besok.";
  }

  return (
    <Link
      href="/ibadah/jadwal-sholat"
      className={cn(
        "group relative flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink px-6 pb-7 pt-14 text-on-ink sm:min-h-[18rem] sm:px-8 sm:pb-8 lg:min-h-[20rem]",
        "transition-shadow hover:shadow-soft",
        cardFocus,
      )}
    >
      <MihrabArch />

      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>

      {isLoading && !data ? (
        <div className="mt-5 space-y-3" aria-hidden="true">
          <div className="h-12 w-40 animate-pulse rounded-md bg-on-ink/10" />
          <div className="h-10 w-28 animate-pulse rounded-md bg-on-ink/10" />
        </div>
      ) : (
        <>
          <h2 className="font-display mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-on-ink sm:text-5xl">
            {title}
          </h2>
          {timeLabel ? (
            <p className="mt-2 font-display text-4xl font-bold tabular-nums tracking-tight text-secondary sm:text-5xl">
              {timeLabel}
            </p>
          ) : null}
          <p className="mt-4 max-w-[28ch] text-sm text-on-ink/70">{detail}</p>
        </>
      )}

      <span className="mt-8 inline-flex items-center text-caption font-medium text-secondary">
        Buka jadwal
        <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </span>

      <p className="mt-3 text-[11px] sm:text-sm tabular-nums text-on-ink/45">{formatClockWib(now)} WIB</p>
    </Link>
  );
}

function QuranCard({ arabicClassName }: { arabicClassName: string }) {
  return (
    <Link
      href="/ibadah/al-quran"
      className={cn(
        "group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-surface px-6 py-7 sm:min-h-[28rem] sm:px-8 sm:py-8",
        "transition-shadow hover:shadow-soft",
        cardFocus,
      )}
    >
      <span
        className="absolute right-6 top-0 h-16 w-2 bg-secondary [clip-path:polygon(0_0,100%_0,100%_100%,50%_84%,0_100%)]"
        aria-hidden="true"
      />

      <p className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
        114 surat
      </p>

      <p
        lang="ar"
        dir="rtl"
        className={cn(
          arabicClassName,
          "mt-10 text-center text-6xl font-bold leading-none text-heading sm:mt-auto sm:text-7xl",
        )}
      >
        اقرأ
      </p>
      <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-secondary-alt">
        QS. Al-‘Alaq 96:1
      </p>

      <div className="mt-10 sm:mt-auto">
        <h2 className="font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
          {"Al-Qur'an"}
        </h2>
        <p className="mt-2 max-w-[28ch] text-sm text-foreground/65">
          Mushaf digital: pilih surat, baca ayat, dan dengar tilawah.
        </p>
        <span className="mt-5 inline-flex items-center text-caption font-medium text-primary">
          Buka mushaf
          <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function DoaCard({ arabicClassName }: { arabicClassName: string }) {
  return (
    <Link
      href="/ibadah/doa"
      className={cn(
        "group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-surface px-6 py-7 sm:min-h-[28rem] sm:px-8 sm:py-8",
        "transition-shadow hover:shadow-soft",
        cardFocus,
      )}
    >
      <span className="absolute bottom-8 left-0 top-8 w-1 rounded-full bg-secondary" aria-hidden="true" />

      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Kumpulan Doa</p>

      <p
        lang="ar"
        dir="rtl"
        className={cn(
          arabicClassName,
          "mt-10 pt-4 text-center text-5xl font-bold leading-snug text-heading sm:mt-auto sm:text-6xl",
        )}
      >
        رَبِّ زِدْنِي عِلْمًا
      </p>
      <p className="mt-6 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-secondary-alt">
        QS. Thaha 20:114
      </p>

      <div className="mt-10 sm:mt-auto">
        <h2 className="font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">Doa</h2>
        <p className="mt-2 max-w-[28ch] text-sm text-foreground/65">
          Cari doa tidur, perjalanan, ilmu, dan lainnya. Baca Arab, latin, dan artinya.
        </p>
        <span className="mt-5 inline-flex items-center text-caption font-medium text-primary">
          Buka kumpulan
          <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export function IbadahPageContent({ arabicClassName }: { arabicClassName: string }) {
  return (
    <div className="space-y-5">
      <PrayerTimesCard />
      <div className="grid gap-5 md:grid-cols-2">
        <DoaCard arabicClassName={arabicClassName} />
        <QuranCard arabicClassName={arabicClassName} />
      </div>
    </div>
  );
}
