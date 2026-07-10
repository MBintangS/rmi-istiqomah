import { AdminBannerForm } from "@/components/admin/AdminBannerForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminBannerBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Banner"
        description="Upload gambar untuk hero beranda."
      />
      <AdminBannerForm mode="create" />
    </>
  );
}
