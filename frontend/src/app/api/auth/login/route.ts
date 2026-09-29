import { AppError, rateLimitedError } from "@/server/errors";
import {
  checkLoginLimit,
  clientIpFromRequest,
  recordLoginFailure,
  resetLoginFailures,
} from "@/server/rate-limit";
import { apiRoute, jsonSuccess } from "@/server/http";
import { login } from "@/server/services/auth.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return apiRoute(async () => {
    const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string };
    const email = typeof body.email === "string" && body.email.trim() ? body.email.trim() : null;
    const ip = clientIpFromRequest(request);

    // Cek limit SEBELUM validasi kredensial: IP/email yang terkunci tidak
    // memicu query database. Gagal 5x dalam 15 menit (per IP dan per email)
    // → 429 + header Retry-After.
    const limit = checkLoginLimit(ip, email);
    if (!limit.allowed) {
      const seconds = limit.retryAfterSec ?? 60;
      throw rateLimitedError(
        `Terlalu banyak percobaan login. Silakan coba lagi dalam ${seconds} detik.`,
        seconds,
      );
    }

    try {
      const data = await login(body.email, body.password);
      // Login berhasil → reset counter kegagalan untuk IP dan email ini.
      resetLoginFailures(ip, email);
      return jsonSuccess(data, { status: 200, message: "Login berhasil" });
    } catch (error) {
      // Hanya kredensial salah (401) / akun nonaktif (403) yang dihitung
      // sebagai kegagalan, agar error server (5xx) tidak mengunci user.
      if (error instanceof AppError && (error.statusCode === 401 || error.statusCode === 403)) {
        recordLoginFailure(ip, email);
      }
      throw error;
    }
  });
}
