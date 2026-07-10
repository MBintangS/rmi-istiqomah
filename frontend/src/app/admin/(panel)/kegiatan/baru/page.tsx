import { AdminKegiatanForm } from "@/components/admin/AdminKegiatanForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminKegiatanBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Kegiatan"
        description="Buat kegiatan baru untuk website publik."
      />
      <AdminKegiatanForm mode="create" />
    </>
  );
}
