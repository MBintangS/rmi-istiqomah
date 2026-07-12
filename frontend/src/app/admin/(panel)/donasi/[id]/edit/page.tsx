import { AdminDonasiEditView } from "@/components/admin/AdminDonasiEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface AdminDonasiEditPageProps {
  params: { id: string };
}

export default function AdminDonasiEditPage({ params }: AdminDonasiEditPageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Rekening Donasi"
        description="Perbarui data rekening bank."
      />
      <AdminDonasiEditView id={params.id} />
    </>
  );
}
