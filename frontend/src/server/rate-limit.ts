import { AppError } from "@/server/errors";

type Bucket = { count: number; resetAt: number };

const loginAttempts = new Map<string, Bucket>();

export function assertLoginRateLimit(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const current = loginAttempts.get(ip);

  if (!current || current.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (current.count >= 5) {
    throw new AppError(
      429,
      "TOO_MANY_REQUESTS",
      "Terlalu banyak percobaan login. Coba lagi dalam 15 menit.",
    );
  }

  current.count += 1;
}
