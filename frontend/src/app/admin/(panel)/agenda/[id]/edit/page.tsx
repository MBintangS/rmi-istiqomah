import { AdminAgendaEditView } from "@/components/admin/AdminAgendaEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface AdminAgendaEditPageProps {
  params: { id: string };
}

export default function AdminAgendaEditPage({ params }: AdminAgendaEditPageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Agenda"
        description="Perbarui jadwal agenda."
      />
      <AdminAgendaEditView id={params.id} />
    </>
  );
}
