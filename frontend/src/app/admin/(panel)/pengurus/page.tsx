import { AdminPengurusList } from "@/components/admin/AdminPengurusList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminPengurusPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Pengurus"
        description="Data pengurus aktif yang tampil di halaman Tentang Kami."
      />
      <AdminPengurusList />
    </>
  );
}
