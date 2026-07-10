import { AdminAgendaForm } from "@/components/admin/AdminAgendaForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminAgendaBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Agenda"
        description="Buat agenda ringkas, opsional terhubung ke kegiatan."
      />
      <AdminAgendaForm mode="create" />
    </>
  );
}
