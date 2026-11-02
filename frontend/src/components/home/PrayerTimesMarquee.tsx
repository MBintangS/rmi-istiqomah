"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import {
  FARDHU_SLOTS,
  formatLongDateId,
  formatShortDateId,
  getSlotProgress,
  todayInWib,
  type PrayerSlotProgress,
} from "@/lib/prayer-times";
import { cn } from "@/lib/utils";
import type { PrayerTimesDay } from "@/types/api";

/** Lima waktu wajib lebih pendek dari delapan slot, jadi tiap lintasan diulang agar loop tidak putus di layar lebar. */
const COPIES_PER_TRACK = 3;

function useMinuteTick() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function Diamond() {
  return <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-secondary/70" aria-hidden="true" />;
}

function SlotItem({ label, time, progress }: { label: string; time: string; progress: PrayerSlotProgress }) {
  const next = progress === "next";
  return (
    <span className={cn("inline-flex shrink-0 items-baseline gap-2", progress === "past" && "opacity-65")}>
      <span className={cn("text-xs font-medium uppercase tracking-[0.12em]", next ? "text-primary" : "text-foreground/75")}>
        {label}
      </span>
      <span className={cn("font-display text-sm font-bold tabular-nums", next ? "text-primary" : "text-heading")}>
        {time}
      </span>
      {next ? (
        <span className="self-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
          berikutnya
        </span>
      ) : null}
    </span>
  );
}

function Sequence({ times, date, now }: { times: PrayerTimesDay; date: string; now: Date }) {
  return (
    <>
      {FARDHU_SLOTS.map((slot) => (
        <span key={slot.key} className="inline-flex shrink-0 items-center gap-6">
          <Diamond />
          <SlotItem label={slot.label} time={times[slot.key]} progress={getSlotProgress(times, date, slot.key, now)} />
        </span>
      ))}
    </>
  );
}

export function PrayerTimesMarquee() {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();
  const reduce = mounted && !!prefersReduced;
  const now = useMinuteTick();
  const today = todayInWib(now);
  const { data, isError } = usePrayerTimes(today, "day");

  if (isError) return null;

  const ready = mounted && data;

  return (
    <section aria-label="Jadwal sholat hari ini" className="relative border-b border-foreground/10 bg-surface text-heading">
      <Link
        href="/ibadah/jadwal-sholat"
        className="group flex h-10 items-stretch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      >
        <span className="relative z-10 flex shrink-0 items-center gap-2 bg-primary px-4 text-xs font-semibold text-white sm:px-5">
          <span className="h-2 w-2 rotate-45 bg-secondary" aria-hidden="true" />
          {mounted ? (
            <span className="whitespace-nowrap">
              <span className="sm:hidden">{formatShortDateId(data?.date ?? today)}</span>
              <span className="hidden sm:inline">{formatLongDateId(data?.date ?? today)}</span>
              <span className="font-medium text-white/80"> · Bogor</span>
            </span>
          ) : (
            <span className="h-3 w-40 animate-pulse rounded bg-white/25" aria-hidden="true" />
          )}
        </span>

        {ready ? (
          <>
            <span className="sr-only">
              {FARDHU_SLOTS.map((slot) => `${slot.label} ${data.times[slot.key]}`).join(", ")}. Buka jadwal sholat
              lengkap.
            </span>
            {reduce ? (
              <span
                className="flex min-w-0 flex-1 items-center gap-6 overflow-x-auto whitespace-nowrap px-5"
                aria-hidden="true"
              >
                <Sequence times={data.times} date={data.date} now={now} />
              </span>
            ) : (
              <span
                className="flex min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
                aria-hidden="true"
              >
                <span className="flex w-max">
                  {[0, 1].map((track) => (
                    <span key={track} className="prayer-marquee-track flex items-center gap-6 pr-6">
                      {Array.from({ length: COPIES_PER_TRACK }, (_, copy) => (
                        <span key={copy} className="inline-flex items-center gap-6">
                          <Sequence times={data.times} date={data.date} now={now} />
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              </span>
            )}
          </>
        ) : (
          <span className="flex flex-1 items-center gap-3 px-5" aria-hidden="true">
            <span className="h-3 w-40 animate-pulse rounded bg-foreground/10" />
            <span className="hidden h-3 w-64 animate-pulse rounded bg-foreground/10 sm:block" />
          </span>
        )}
      </Link>
    </section>
  );
}
