import type { PrayerTimesDay } from "@/types/api";

export const PRAYER_SLOTS = [
  { key: "imsak", label: "Imsak", kind: "penanda" },
  { key: "subuh", label: "Subuh", kind: "fardhu" },
  { key: "terbit", label: "Terbit", kind: "penanda" },
  { key: "dhuha", label: "Dhuha", kind: "penanda" },
  { key: "dzuhur", label: "Dzuhur", kind: "fardhu" },
  { key: "ashar", label: "Ashar", kind: "fardhu" },
  { key: "maghrib", label: "Maghrib", kind: "fardhu" },
  { key: "isya", label: "Isya", kind: "fardhu" },
] as const;

export type PrayerSlotKey = (typeof PRAYER_SLOTS)[number]["key"];
export type PrayerSlotKind = (typeof PRAYER_SLOTS)[number]["kind"];
export type PrayerSlotProgress = "past" | "next" | "later";

export const FARDHU_SLOTS = PRAYER_SLOTS.filter((slot) => slot.kind === "fardhu");
export const PENANDA_SLOTS = PRAYER_SLOTS.filter((slot) => slot.kind === "penanda");

export const WEEKDAY_SHORT_ID = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"] as const;

const NEXT_PRAYER_KEYS: PrayerSlotKey[] = ["subuh", "dzuhur", "ashar", "maghrib", "isya"];

export function todayInWib(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(now);
}

export function shiftIsoDate(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days));
  return date.toISOString().slice(0, 10);
}

export function shiftMonth(isoDate: string, months: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const cursor = new Date(Date.UTC(year, month - 1 + months, 1));
  const lastDay = new Date(
    Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 0),
  ).getUTCDate();
  return new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), Math.min(day, lastDay)))
    .toISOString()
    .slice(0, 10);
}

export function formatLongDateId(isoDate: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(`${isoDate}T00:00:00+07:00`));
}

export function formatWeekdayId(isoDate: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  }).format(new Date(`${isoDate}T00:00:00+07:00`));
}

export function formatClockWib(now = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
}

export function mondayWeekIndex(isoDate: string): number {
  const weekday = new Date(`${isoDate}T00:00:00+07:00`).getDay();
  return (weekday + 6) % 7;
}

export function formatCountdownId(minutes: number): string {
  if (minutes <= 0) return "sekarang";
  if (minutes < 60) return minutes === 1 ? "1 menit" : `${minutes} menit`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const hourLabel = hours === 1 ? "1 jam" : `${hours} jam`;
  if (rest === 0) return hourLabel;
  const minLabel = rest === 1 ? "1 menit" : `${rest} menit`;
  return `${hourLabel} ${minLabel}`;
}

function minutesFromClock(value: string): number {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

export function nowMinutesInWib(now = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

export function remainingMinutesUntil(clock: string, now = new Date()): number {
  return minutesFromClock(clock) - nowMinutesInWib(now);
}

export function getNextPrayerKey(
  times: PrayerTimesDay,
  isoDate: string,
  now = new Date(),
): PrayerSlotKey | null {
  if (isoDate !== todayInWib(now)) return null;
  const current = nowMinutesInWib(now);
  for (const key of NEXT_PRAYER_KEYS) {
    if (minutesFromClock(times[key]) > current) return key;
  }
  return null;
}

export function getSlotProgress(
  times: PrayerTimesDay,
  isoDate: string,
  key: PrayerSlotKey,
  now = new Date(),
): PrayerSlotProgress {
  const today = todayInWib(now);
  if (isoDate < today) return "past";
  if (isoDate > today) return "later";
  if (getNextPrayerKey(times, isoDate, now) === key) return "next";
  if (minutesFromClock(times[key]) <= nowMinutesInWib(now)) return "past";
  return "later";
}
