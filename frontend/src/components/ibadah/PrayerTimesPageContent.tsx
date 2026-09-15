"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Button, EmptyState, Skeleton } from "@/components/ui";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { getApiErrorMessage } from "@/lib/api";
import {
  FARDHU_SLOTS,
  PENANDA_SLOTS,
  WEEKDAY_SHORT_ID,
  formatClockWib,
  formatCountdownId,
  formatLongDateId,
  formatWeekdayId,
  getNextPrayerKey,
  getSlotProgress,
  mondayWeekIndex,
  remainingMinutesUntil,
  shiftIsoDate,
  shiftMonth,
  todayInWib,
  type PrayerSlotKey,
} from "@/lib/prayer-times";
import { cn } from "@/lib/utils";
import type { PrayerTimesDay } from "@/types/api";

function useNowTick(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return new Date(now);
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M15 6 9 12l6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

function MihrabArch() {
  return (
    <svg
      viewBox="0 0 320 52"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-secondary/55"
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

function NextPrayerPlaque({
  times,
  nextKey,
  selectedDate,
  today,
  now,
  onSelectDate,
}: {
  times: PrayerTimesDay;
  nextKey: PrayerSlotKey | null;
  selectedDate: string;
  today: string;
  now: Date;
  onSelectDate: (date: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const isToday = selectedDate === today;
  const slot = nextKey ? FARDHU_SLOTS.find((item) => item.key === nextKey) : null;
  const countdown =
    isToday && nextKey ? formatCountdownId(remainingMinutesUntil(times[nextKey], now)) : null;

  let eyebrow = "Jadwal hari ini";
  let title = "Sudah Waktu Isya";
  let timeLabel: string | null = null;
  let detail = "Istirahat dulu. Subuh menyusul besok.";

  if (!isToday && selectedDate < today) {
    eyebrow = "Sudah lewat";
    title = formatWeekdayId(selectedDate);
    timeLabel = `${times.subuh} – ${times.isya}`;
    detail = "Subuh sampai Isya. Buka hari ini untuk hitung mundur.";
  } else if (!isToday) {
    eyebrow = "Mendatang";
    title = formatWeekdayId(selectedDate);
    timeLabel = `${times.subuh} – ${times.isya}`;
    detail = "Subuh sampai Isya. Buka hari ini untuk hitung mundur.";
  } else if (slot && countdown) {
    eyebrow = "Menuju";
    title = slot.label;
    timeLabel = times[slot.key];
    detail = `${countdown} lagi`;
  }

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-5 pb-6 pt-14 text-on-ink sm:px-8 sm:pb-8 sm:pt-16">
      <MihrabArch />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
          {eyebrow}
        </p>
        <p className="text-caption tabular-nums text-on-ink/65">
          {formatClockWib(now)} WIB · Kota Bogor
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedDate}-${nextKey ?? "done"}`}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display mt-4 max-w-[18ch] text-4xl font-bold leading-[1.05] tracking-tight text-on-ink sm:text-6xl">
            {title}
          </h2>
          {timeLabel ? (
            <p
              className={cn(
                "mt-2 font-display font-bold tabular-nums tracking-tight text-secondary",
                slot ? "text-5xl sm:text-6xl" : "text-2xl sm:text-3xl",
              )}
            >
              {timeLabel}
            </p>
          ) : null}
          <p className="mt-4 max-w-[42ch] text-sm text-on-ink/70" aria-live="polite">
            {detail}
          </p>
        </motion.div>
      </AnimatePresence>

      {isToday && !nextKey ? (
        <Button
          variant="secondary"
          size="sm"
          className="relative mt-5"
          onClick={() => onSelectDate(shiftIsoDate(today, 1))}
        >
          Lihat jadwal besok
        </Button>
      ) : null}
    </div>
  );
}

function DateStepper({
  selectedDate,
  today,
  onSelectDate,
}: {
  selectedDate: string;
  today: string;
  onSelectDate: (date: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 text-heading transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Hari sebelumnya"
          onClick={() => onSelectDate(shiftIsoDate(selectedDate, -1))}
        >
          <ChevronIcon direction="left" />
        </button>
        <p className="min-w-0 flex-1 text-center font-display text-lg font-semibold capitalize leading-tight text-heading sm:text-xl">
          {formatLongDateId(selectedDate)}
        </p>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 text-heading transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Hari berikutnya"
          onClick={() => onSelectDate(shiftIsoDate(selectedDate, 1))}
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
      <Button
        variant={selectedDate === today ? "secondary" : "outline"}
        size="sm"
        disabled={selectedDate === today}
        onClick={() => onSelectDate(today)}
      >
        Hari ini
      </Button>
    </div>
  );
}

function FardhuTrack({
  times,
  selectedDate,
  now,
}: {
  times: PrayerTimesDay;
  selectedDate: string;
  now: Date;
}) {
  return (
    <ol className="relative space-y-1">
      {FARDHU_SLOTS.map((slot) => {
        const progress = getSlotProgress(times, selectedDate, slot.key, now);
        return (
          <li key={slot.key}>
            <div
              className={cn(
                "relative grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-2xl px-1 py-3 sm:gap-4 sm:px-2",
                progress === "next" && "bg-secondary/20",
                progress === "past" && "opacity-50",
              )}
            >
              <span className="relative flex justify-center">
                <span
                  className={cn(
                    "h-3 w-3 rotate-45 border",
                    progress === "next" &&
                      "border-secondary bg-secondary motion-safe:animate-pulse",
                    progress === "past" && "border-primary/40 bg-primary/30",
                    progress === "later" && "border-primary bg-background",
                  )}
                  aria-hidden="true"
                />
              </span>
              <div>
                <p className="font-display text-xl font-semibold tracking-tight text-heading sm:text-2xl">
                  {slot.label}
                </p>
                {progress === "next" ? (
                  <p className="text-caption font-medium text-primary">Sedang menuju waktu ini</p>
                ) : null}
              </div>
              <p
                className={cn(
                  "font-display text-2xl font-bold tabular-nums tracking-tight sm:text-3xl",
                  progress === "next" ? "text-primary" : "text-heading",
                )}
              >
                {times[slot.key]}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function MonthCalendar({
  days,
  monthName,
  year,
  selectedDate,
  today,
  onSelectDate,
  isFetching,
}: {
  days: PrayerTimesDay[];
  monthName: string;
  year: number;
  selectedDate: string;
  today: string;
  onSelectDate: (date: string) => void;
  isFetching: boolean;
}) {
  const leadingBlanks = days.length ? mondayWeekIndex(days[0].date) : 0;
  const cells: Array<PrayerTimesDay | null> = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...days,
  ];

  return (
    <div className={cn("rounded-[1.5rem] border border-foreground/10 bg-surface p-4 sm:p-5", isFetching && "opacity-80")}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Kalender bulan
          </p>
          <h3 className="font-display text-xl font-semibold text-heading">
            {monthName} {year}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-heading transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Bulan sebelumnya"
            onClick={() => onSelectDate(shiftMonth(selectedDate, -1))}
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-heading transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Bulan berikutnya"
            onClick={() => onSelectDate(shiftMonth(selectedDate, 1))}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/50">
        {WEEKDAY_SHORT_ID.map((label) => (
          <span key={label} className="py-1">
            {label}
          </span>
        ))}
      </div>

      <div role="grid" aria-label={`Kalender ${monthName} ${year}`} className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} role="gridcell" />;
          }

          const selected = day.date === selectedDate;
          const isToday = day.date === today;

          return (
            <button
              key={day.date}
              type="button"
              role="gridcell"
              aria-selected={selected}
              aria-current={isToday ? "date" : undefined}
              aria-label={formatLongDateId(day.date)}
              onClick={() => onSelectDate(day.date)}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center rounded-xl text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                selected && "bg-secondary text-ink",
                !selected && isToday && "border border-primary text-primary",
                !selected && !isToday && "text-heading hover:bg-primary/10",
              )}
            >
              {day.day}
            </button>
          );
        })}
      </div>

      <label className="mt-4 block text-caption text-foreground/55">
        Lompat ke tanggal
        <input
          type="date"
          value={selectedDate}
          onChange={(event) => onSelectDate(event.target.value)}
          className="mt-1 w-full cursor-pointer rounded-rmi border border-foreground/15 bg-background px-3 py-2 text-body text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </label>
    </div>
  );
}

export function PrayerTimesPageContent() {
  const [selectedDate, setSelectedDate] = useState(() => todayInWib());
  const now = useNowTick(1000);
  const today = todayInWib(now);
  const { data, isLoading, isError, error, refetch, isFetching } = usePrayerTimes(
    selectedDate,
    "month",
  );
  const nextKey = useMemo(
    () => (data ? getNextPrayerKey(data.times, selectedDate, now) : null),
    [data, selectedDate, now],
  );

  return (
    <>
      <PageHero
        title="Jadwal Sholat"
        description="Waktu sholat Kota Bogor. Lihat yang berikutnya, atau pilih hari lain."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Ibadah", href: "/ibadah" },
          { label: "Jadwal Sholat" },
        ]}
      />

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {isLoading && !data ? (
            <div className="space-y-6" aria-busy="true">
              <Skeleton className="h-56 w-full rounded-[1.75rem]" />
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
                <Skeleton className="h-80 rounded-[1.5rem]" />
                <Skeleton className="h-80 rounded-[1.5rem]" />
              </div>
            </div>
          ) : isError || !data ? (
            <EmptyState
              title="Jadwal tidak bisa dimuat"
              description={getApiErrorMessage(error, "Periksa koneksi, lalu coba lagi.")}
              actionLabel="Coba lagi"
              onAction={() => refetch()}
            />
          ) : (
            <div className="space-y-8">
              <NextPrayerPlaque
                times={data.times}
                nextKey={nextKey}
                selectedDate={selectedDate}
                today={today}
                now={now}
                onSelectDate={setSelectedDate}
              />

              <DateStepper
                selectedDate={selectedDate}
                today={today}
                onSelectDate={setSelectedDate}
              />

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:items-start">
                <div className="rounded-[1.5rem] border border-foreground/10 bg-surface px-3 py-4 sm:px-5 sm:py-5">
                  <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    Sholat wajib
                  </p>
                  <FardhuTrack times={data.times} selectedDate={selectedDate} now={now} />
                  <ul className="mt-4 grid grid-cols-3 gap-2 border-t border-foreground/10 pt-4">
                    {PENANDA_SLOTS.map((slot) => (
                      <li key={slot.key} className="px-1 text-center">
                        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/50">
                          {slot.label}
                        </p>
                        <p className="mt-1 font-display text-lg font-semibold tabular-nums text-heading">
                          {data.times[slot.key]}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 px-1 text-caption text-foreground/50">
                    Sumber: EQuran.id · Bimas Islam Kemenag
                  </p>
                </div>

                {data.days ? (
                  <MonthCalendar
                    days={data.days}
                    monthName={data.monthName}
                    year={data.year}
                    selectedDate={selectedDate}
                    today={today}
                    onSelectDate={setSelectedDate}
                    isFetching={isFetching && !isLoading}
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
