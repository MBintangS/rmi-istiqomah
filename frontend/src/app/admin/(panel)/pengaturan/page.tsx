import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";

export default function AdminPengaturanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Pengaturan Situs</h2>
        <p className="mt-1 text-body text-foreground/70">
          Profil, kontak, media sosial, dan statistik — perubahan langsung memengaruhi footer dan
          halaman publik.
        </p>
      </div>
      <AdminSettingsForm />
    </div>
  );
}
