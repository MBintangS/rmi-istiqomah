import { AdminAgendaForm } from "@/components/admin/AdminAgendaForm";

export default function AdminAgendaBaruPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Tambah Agenda</h2>
        <p className="text-body mt-1 text-foreground/70">
          Buat agenda ringkas, opsional terhubung ke kegiatan.
        </p>
      </div>
      <AdminAgendaForm mode="create" />
    </div>
  );
}
