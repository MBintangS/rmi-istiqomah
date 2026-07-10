import { AdminDokumenEditView } from "@/components/admin/AdminDokumenEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface PageProps {
  params: { id: string };
}

export default function AdminDokumenEditPage({ params }: PageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Dokumen"
        description="Perbarui metadata atau ganti file."
      />
      <AdminDokumenEditView id={params.id} />
    </>
  );
}
