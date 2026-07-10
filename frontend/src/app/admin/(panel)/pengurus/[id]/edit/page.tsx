import { AdminPengurusEditView } from "@/components/admin/AdminPengurusEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface PageProps {
  params: { id: string };
}

export default function AdminPengurusEditPage({ params }: PageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Pengurus"
        description="Perbarui data pengurus."
      />
      <AdminPengurusEditView id={params.id} />
    </>
  );
}
