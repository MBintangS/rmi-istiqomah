import "server-only";
import { Resend } from "resend";
import { emailConfig, escapeHtml } from "@/server/email/config";

export async function sendPasswordResetEmail(input: {
  name: string;
  email: string;
  token: string;
  expiresInMinutes: number;
}) {
  const config = emailConfig();
  const resetUrl = new URL("/reset-password", config.appUrl);
  resetUrl.searchParams.set("token", input.token);

  const safeName = escapeHtml(input.name);
  const safeUrl = escapeHtml(resetUrl.toString());
  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from,
    to: input.email,
    ...(config.replyTo ? { replyTo: config.replyTo } : {}),
    subject: "Reset password CMS RMI Istiqomah",
    text: [
      `Assalamu'alaikum ${input.name},`,
      "",
      "Kami menerima permintaan untuk mengatur ulang password akun CMS RMI Istiqomah.",
      `Buat password baru melalui tautan berikut: ${resetUrl.toString()}`,
      "",
      `Tautan ini hanya dapat digunakan sekali dan berlaku selama ${input.expiresInMinutes} menit.`,
      "Jika Anda tidak meminta reset password, abaikan email ini. Password akun Anda tidak berubah.",
    ].join("\n"),
    html: `
      <div style="margin:0;background:#f6f7f3;padding:32px 16px;font-family:Arial,sans-serif;color:#263019">
        <div style="margin:0 auto;max-width:560px;border:1px solid #e2e7da;border-radius:16px;background:#ffffff;padding:32px">
          <div style="margin:0 0 24px;text-align:center">
            <img
              src="https://www.rmiistiqomah.web.id/logo.png"
              width="72"
              height="72"
              alt="RMI Istiqomah"
              style="display:block;margin:0 auto 10px;width:72px;height:72px;border:0"
            />
            <p style="margin:0;font-size:14px;font-weight:700;letter-spacing:0.04em;color:#4e830a">RMI ISTIQOMAH</p>
          </div>
          <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#1f2917">Reset password</h1>
          <p style="margin:0 0 12px;line-height:1.7">Assalamu'alaikum ${safeName},</p>
          <p style="margin:0 0 24px;line-height:1.7">
            Kami menerima permintaan untuk mengatur ulang password akun CMS Anda. Buat password baru melalui tombol berikut.
          </p>
          <a href="${safeUrl}" style="display:inline-block;border-radius:10px;background:#4e830a;padding:13px 20px;color:#ffffff;text-decoration:none;font-weight:700">
            Buat password baru
          </a>
          <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#697060">
            Tautan hanya dapat digunakan sekali dan berlaku selama ${input.expiresInMinutes} menit.
            Jika Anda tidak meminta reset password, abaikan email ini. Password akun Anda tidak berubah.
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Resend gagal mengirim email: ${error.message}`);
  }
}
