import { AdminTestimoniEditView } from "@/components/admin/AdminTestimoniEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface PageProps {
  params: { id: string };
}

export default function AdminTestimoniEditPage({ params }: PageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Testimoni"
        description="Perbarui isi atau status testimoni."
      />
      <AdminTestimoniEditView id={params.id} />
    </>
  );
}
