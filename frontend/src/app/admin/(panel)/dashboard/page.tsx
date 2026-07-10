import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-rmi border border-foreground/10 bg-surface p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-heading">Selamat datang di CMS RMI</h2>
        <p className="text-body mt-2 text-foreground/70">
          Panel admin siap digunakan. Modul dashboard statistik dan CRUD konten akan
          dilanjutkan di sprint berikutnya.
        </p>
      </div>
    </div>
  );
}
