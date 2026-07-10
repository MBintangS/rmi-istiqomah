import { AdminArtikelEditView } from "@/components/admin/AdminArtikelEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface AdminArtikelEditPageProps {
  params: { slug: string };
}

export default function AdminArtikelEditPage({ params }: AdminArtikelEditPageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Artikel"
        description="Perbarui konten dan status artikel."
      />
      <AdminArtikelEditView slug={params.slug} />
    </>
  );
}
