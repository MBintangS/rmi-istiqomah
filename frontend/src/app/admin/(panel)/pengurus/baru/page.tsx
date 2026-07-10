import { AdminPengurusForm } from "@/components/admin/AdminPengurusForm";

export default function AdminPengurusBaruPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Tambah Pengurus</h2>
        <p className="mt-1 text-body text-foreground/70">Isi data pengurus dan upload foto.</p>
      </div>
      <AdminPengurusForm mode="create" />
    </div>
  );
}
