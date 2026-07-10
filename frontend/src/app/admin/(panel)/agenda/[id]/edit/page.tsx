import { AdminAgendaEditView } from "@/components/admin/AdminAgendaEditView";

interface AdminAgendaEditPageProps {
  params: { id: string };
}

export default function AdminAgendaEditPage({ params }: AdminAgendaEditPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Edit Agenda</h2>
        <p className="text-body mt-1 text-foreground/70">Perbarui jadwal agenda.</p>
      </div>
      <AdminAgendaEditView id={params.id} />
    </div>
  );
}
