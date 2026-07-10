import { AdminTestimoniForm } from "@/components/admin/AdminTestimoniForm";

export default function AdminTestimoniBaruPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Tambah Testimoni</h2>
        <p className="mt-1 text-body text-foreground/70">Testimoni aktif tampil di beranda.</p>
      </div>
      <AdminTestimoniForm mode="create" />
    </div>
  );
}
