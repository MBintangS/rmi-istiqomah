import { AdminKegiatanEditView } from "@/components/admin/AdminKegiatanEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface AdminKegiatanEditPageProps {
  params: { slug: string };
}

export default function AdminKegiatanEditPage({ params }: AdminKegiatanEditPageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Kegiatan"
        description="Perbarui detail dan status publikasi."
      />
      <AdminKegiatanEditView slug={params.slug} />
    </>
  );
}
