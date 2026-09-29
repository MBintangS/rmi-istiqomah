const TOKEN_KEY = "rmi_admin_token";
// Disesuaikan dengan default JWT_EXPIRES_IN (7 hari).
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function sessionCookieValue(token: string): string {
  return `${TOKEN_KEY}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * JWT disimpan di localStorage (dipakai sebagai Bearer token untuk API)
 * DAN di-mirror ke cookie sesi agar sisi server (layout admin) bisa
 * meredirek request tanpa sesi ke /admin/login tanpa merender HTML panel
 * admin. Autentikasi API tetap memakai Bearer token; cookie hanya untuk
 * gate halaman (bukan sumber kebenaran sesi).
 */
export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  if (typeof document !== "undefined") {
    document.cookie = sessionCookieValue(token);
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  if (typeof document !== "undefined") {
    document.cookie = `${TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
  }
}

/** Tulis ulang cookie sesi dari token tersimpan (perpanjang masa berlaku). */
export function syncAuthCookie(token: string): void {
  if (typeof document !== "undefined") {
    document.cookie = sessionCookieValue(token);
  }
}
