import type { Metadata } from "next";
import { Suspense } from "react";
import { ActivateInvitationForm } from "@/components/auth/ActivateInvitationForm";
import { RmiLogo } from "@/components/brand/RmiLogo";
import { Spinner } from "@/components/ui";

export const metadata: Metadata = {
  title: "Aktivasi Akun",
  robots: { index: false, follow: false },
};

export default function ActivateAccountPage() {
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
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Aktivasi Akun</h1>
          <p className="mt-2 text-sm leading-relaxed text-foreground/65">
            Buat password untuk menyelesaikan aktivasi akun CMS RMI Istiqomah.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <Spinner label="Memuat form..." />
            </div>
          }
        >
          <ActivateInvitationForm />
        </Suspense>
      </main>
    </div>
  );
}
