import { AdminKategoriList } from "@/components/admin/AdminKategoriList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminKategoriPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Kategori"
        description="Kategori untuk artikel, kegiatan, dan galeri."
      />
      <AdminKategoriList />
    </>
  );
}
