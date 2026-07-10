import { AdminProgramEditView } from "@/components/admin/AdminProgramEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface PageProps {
  params: { slug: string };
}

export default function AdminProgramEditPage({ params }: PageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Program"
        description="Perbarui konten dan status program."
      />
      <AdminProgramEditView slug={params.slug} />
    </>
  );
}
