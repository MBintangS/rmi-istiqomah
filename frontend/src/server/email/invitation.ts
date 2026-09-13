import "server-only";
import { Resend } from "resend";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailConfig() {
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

export async function sendInvitationEmail(input: {
  name: string;
  email: string;
  token: string;
  expiresInHours: number;
}) {
  const config = emailConfig();
  const activationUrl = new URL("/aktivasi-akun", config.appUrl);
  activationUrl.searchParams.set("token", input.token);

  const safeName = escapeHtml(input.name);
  const safeUrl = escapeHtml(activationUrl.toString());
  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from,
    to: input.email,
    ...(config.replyTo ? { replyTo: config.replyTo } : {}),
    subject: "Aktifkan akun pengurus RMI Istiqomah",
    text: [
      `Assalamu'alaikum ${input.name},`,
      "",
      "Anda diundang untuk menjadi pengurus website RMI Istiqomah.",
      `Buat password akun Anda melalui tautan berikut: ${activationUrl.toString()}`,
      "",
      `Tautan ini hanya dapat digunakan sekali dan berlaku selama ${input.expiresInHours} jam.`,
      "Jika Anda tidak mengenali undangan ini, abaikan email ini.",
    ].join("\n"),
    html: `
      <div style="margin:0;background:#f6f7f3;padding:32px 16px;font-family:Arial,sans-serif;color:#263019">
        <div style="margin:0 auto;max-width:560px;border:1px solid #e2e7da;border-radius:16px;background:#ffffff;padding:32px">
          <p style="margin:0 0 20px;font-size:14px;font-weight:700;color:#4e830a">RMI ISTIQOMAH</p>
          <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#1f2917">Aktifkan akun pengurus</h1>
          <p style="margin:0 0 12px;line-height:1.7">Assalamu'alaikum ${safeName},</p>
          <p style="margin:0 0 24px;line-height:1.7">
            Anda diundang untuk menjadi pengurus website RMI Istiqomah. Silakan buat password akun Anda melalui tombol berikut.
          </p>
          <a href="${safeUrl}" style="display:inline-block;border-radius:10px;background:#4e830a;padding:13px 20px;color:#ffffff;text-decoration:none;font-weight:700">
            Aktifkan akun
          </a>
          <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#697060">
            Tautan hanya dapat digunakan sekali dan berlaku selama ${input.expiresInHours} jam.
            Jika Anda tidak mengenali undangan ini, abaikan email ini.
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Resend gagal mengirim email: ${error.message}`);
  }
}
