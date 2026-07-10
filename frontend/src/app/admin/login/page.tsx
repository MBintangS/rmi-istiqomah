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
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-md rounded-rmi border border-foreground/10 bg-background p-6 shadow-soft sm:p-8">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            RMI
          </span>
          <h1 className="text-2xl font-semibold text-heading">Login Admin</h1>
          <p className="text-body mt-2 text-foreground/70">
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
