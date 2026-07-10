import { AdminAgendaList } from "@/components/admin/AdminAgendaList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminAgendaPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Agenda"
        description="Agenda ringkas opsional; beranda publik memakai data kegiatan."
      />
      <AdminAgendaList />
    </>
  );
}
