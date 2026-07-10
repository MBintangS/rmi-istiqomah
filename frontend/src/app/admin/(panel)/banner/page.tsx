import { AdminBannerList } from "@/components/admin/AdminBannerList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminBannerPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Banner"
        description="Banner aktif (urutan terkecil) dipakai sebagai gambar hero beranda."
      />
      <AdminBannerList />
    </>
  );
}
