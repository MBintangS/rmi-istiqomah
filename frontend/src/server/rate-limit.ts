import "server-only";

/**
 * Rate limiter login in-memory dengan dua lapis pelacakan:
 * 1. Per IP   — 5 percobaan / 15 menit (melindungi endpoint secara umum).
 * 2. Per email — 5 kegagalan / 15 menit (lockout akun; tidak bisa di-bypass
 *    dengan rotasi IP saat menargetkan satu email admin).
 *
 * Catatan: store in-memory berarti counter di-reset saat proses/serverless
 * instance restart. Untuk lockout yang tahan restart, perlu storage bersama
 * (mis. Redis).
 */

export const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 menit
export const LOGIN_MAX_IP_ATTEMPTS = 5;
export const LOGIN_MAX_EMAIL_ATTEMPTS = 5;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // evict entri kedaluwarsa tiap 5 menit

const ipAttempts = new Map<string, number[]>();
const emailAttempts = new Map<string, number[]>();
let lastCleanup = 0;

/** IP klien dari header proxy (Vercel/nginx). Sama untuk semua subdomain. */
export function clientIpFromRequest(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function normalizeEmailKey(email: string): string {
  return email.trim().toLowerCase();
}

function pruneExpired(timestamps: number[], now: number): number[] {
  return timestamps.filter((ts) => now - ts < LOGIN_WINDOW_MS);
}

function evictExpired(map: Map<string, number[]>, now: number): void {
  map.forEach((timestamps, key) => {
    const fresh = pruneExpired(timestamps, now);
    if (fresh.length === 0) {
      map.delete(key);
    } else {
      map.set(key, fresh);
    }
  });
}

function maybeCleanup(): void {
  const now = Date.now();
  if (now - lastCleanup >= CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    evictExpired(ipAttempts, now);
    evictExpired(emailAttempts, now);
  }
}

function retryAfterFor(timestamps: number[], now: number): number {
  const oldest = timestamps[0];
  return Math.max(1, Math.ceil((LOGIN_WINDOW_MS - (now - oldest)) / 1000));
}

function checkBucket(
  map: Map<string, number[]>,
  key: string,
  maxAttempts: number,
  now: number,
): { allowed: boolean; retryAfterSec?: number } {
  const timestamps = pruneExpired(map.get(key) ?? [], now);
  map.set(key, timestamps);

  if (timestamps.length < maxAttempts) {
    return { allowed: true };
  }

  return { allowed: false, retryAfterSec: retryAfterFor(timestamps, now) };
}

function recordInBucket(map: Map<string, number[]>, key: string, now: number): void {
  const timestamps = pruneExpired(map.get(key) ?? [], now);
  timestamps.push(now);
  map.set(key, timestamps);
}

export interface LoginLimitCheck {
  allowed: boolean;
  retryAfterSec?: number;
  scope: "ip" | "email" | null;
}

/**
 * Cek apakah kombinasi IP + email masih boleh mencoba login.
 * Dipanggil SEBELUM validasi kredensial agar IP/email yang terkunci
 * tidak memicu query database.
 */
export function checkLoginLimit(ip: string, email: string | null): LoginLimitCheck {
  maybeCleanup();
  const now = Date.now();

  const ipCheck = checkBucket(ipAttempts, ip, LOGIN_MAX_IP_ATTEMPTS, now);
  if (!ipCheck.allowed) {
    return { allowed: false, retryAfterSec: ipCheck.retryAfterSec, scope: "ip" };
  }

  if (email) {
    const emailCheck = checkBucket(
      emailAttempts,
      normalizeEmailKey(email),
      LOGIN_MAX_EMAIL_ATTEMPTS,
      now,
    );
    if (!emailCheck.allowed) {
      return { allowed: false, retryAfterSec: emailCheck.retryAfterSec, scope: "email" };
    }
  }

  return { allowed: true, scope: null };
}

/** Catat satu kegagalan login (kredensial salah / akun tidak aktif). */
export function recordLoginFailure(ip: string, email: string | null): void {
  const now = Date.now();
  recordInBucket(ipAttempts, ip, now);
  if (email) {
    recordInBucket(emailAttempts, normalizeEmailKey(email), now);
  }
}

/** Reset counter kegagalan setelah login berhasil. */
export function resetLoginFailures(ip: string, email: string | null): void {
  ipAttempts.delete(ip);
  if (email) {
    emailAttempts.delete(normalizeEmailKey(email));
  }
}
