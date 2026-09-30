import { AppError } from "@/server/errors";

type Bucket = { count: number; resetAt: number };

const loginAttempts = new Map<string, Bucket>();
const passwordResetRequests = new Map<string, Bucket>();
const passwordResetSubmits = new Map<string, Bucket>();

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function assertBucket(bucket: Map<string, Bucket>, key: string, max: number, windowMs: number, message: string) {
  const now = Date.now();
  const current = bucket.get(key);

  if (!current || current.resetAt < now) {
    bucket.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (current.count >= max) {
    throw new AppError(429, "TOO_MANY_REQUESTS", message);
  }

  current.count += 1;
}

export function assertLoginRateLimit(request: Request) {
  assertBucket(
    loginAttempts,
    clientIp(request),
    5,
    15 * 60 * 1000,
    "Terlalu banyak percobaan login. Coba lagi dalam 15 menit.",
  );
}

export function assertPasswordResetRequestLimit(request: Request, email: string) {
  const message = "Terlalu banyak permintaan reset password. Coba lagi dalam 1 jam.";
  const windowMs = 60 * 60 * 1000;
  assertBucket(passwordResetRequests, `ip:${clientIp(request)}`, 3, windowMs, message);
  assertBucket(passwordResetRequests, `email:${email.trim().toLowerCase()}`, 3, windowMs, message);
}

export function assertPasswordResetSubmitLimit(request: Request) {
  assertBucket(
    passwordResetSubmits,
    clientIp(request),
    10,
    15 * 60 * 1000,
    "Terlalu banyak percobaan reset password. Coba lagi dalam 15 menit.",
  );
}
