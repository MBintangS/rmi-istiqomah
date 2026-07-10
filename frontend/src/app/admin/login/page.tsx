import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Spinner } from "@/components/ui";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(78,131,10,0.08),_transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-rmi border border-foreground/10 bg-background p-6 shadow-soft sm:p-8">
        <div className="mb-8">
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            RMI
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Login Admin</h1>
          <p className="mt-2 text-sm text-foreground/65">
            Masuk ke panel CMS Remaja Masjid Istiqomah.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <Spinner label="Memuat form..." />
            </div>
          }
        >
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
