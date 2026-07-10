import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminPengaturanPage() {
  return (
    <>
      <AdminPageHeader
        title="Pengaturan Situs"
        description="Profil, kontak, media sosial, dan statistik. Perubahan langsung memengaruhi footer dan halaman publik."
      />
      <AdminSettingsForm />
    </>
  );
}
