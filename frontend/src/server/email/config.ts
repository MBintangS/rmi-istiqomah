import "server-only";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  const appUrl = (process.env.APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL)
    ?.trim()
    .replace(/\/$/, "");

  if (!apiKey || !from || !appUrl) {
    throw new Error("Konfigurasi email belum lengkap");
  }

  return {
    apiKey,
    from,
    appUrl,
    replyTo: process.env.EMAIL_REPLY_TO?.trim() || undefined,
  };
}
