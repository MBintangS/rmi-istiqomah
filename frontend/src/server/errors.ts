export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
    /** Jika diisi, handler merespons dengan header `Retry-After` (detik). */
    public retryAfterSec?: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

/** 429 + `Retry-After` untuk rate limiting. */
export function rateLimitedError(message: string, retryAfterSec: number): AppError {
  return new AppError(429, "RATE_LIMITED", message, undefined, retryAfterSec);
}
