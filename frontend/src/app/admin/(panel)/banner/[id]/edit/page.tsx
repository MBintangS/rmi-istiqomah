import { AdminBannerEditView } from "@/components/admin/AdminBannerEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface AdminBannerEditPageProps {
  params: { id: string };
}

export default function AdminBannerEditPage({ params }: AdminBannerEditPageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Banner"
        description="Perbarui gambar, urutan, dan status aktif."
      />
      <AdminBannerEditView id={params.id} />
    </>
  );
}
