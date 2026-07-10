import { AdminKegiatanList } from "@/components/admin/AdminKegiatanList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminKegiatanPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Kegiatan"
        description="Kegiatan yang dipublikasikan dengan status upcoming tampil di beranda."
      />
      <AdminKegiatanList />
    </>
  );
}
