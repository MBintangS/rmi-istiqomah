import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { RmiLogo } from "@/components/brand/RmiLogo";

export const metadata: Metadata = {
  title: "Lupa Password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(78,131,10,0.08),_transparent_55%)]"
        aria-hidden="true"
      />
      <main className="relative w-full max-w-md rounded-rmi border border-foreground/10 bg-background p-6 shadow-soft sm:p-8">
        <div className="mb-8">
          <div className="mb-4">
            <RmiLogo size={44} priority />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Lupa Password</h1>
          <p className="mt-2 text-sm leading-relaxed text-foreground/65">
            Masukkan email akun CMS. Jika akun sudah aktif, kami mengirim tautan untuk membuat
            password baru.
          </p>
        </div>
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
