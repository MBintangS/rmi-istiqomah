import { AdminProgramForm } from "@/components/admin/AdminProgramForm";

export default function AdminProgramBaruPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Tambah Program</h2>
        <p className="mt-1 text-body text-foreground/70">Buat program baru dengan konten lengkap.</p>
      </div>
      <AdminProgramForm mode="create" />
    </div>
  );
}
