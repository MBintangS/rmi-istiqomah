import { AdminAgendaList } from "@/components/admin/AdminAgendaList";

export default function AdminAgendaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Kelola Agenda</h2>
        <p className="text-body mt-1 text-foreground/70">
          Agenda ringkas opsional; beranda publik memakai data kegiatan.
        </p>
      </div>
      <AdminAgendaList />
    </div>
  );
}
