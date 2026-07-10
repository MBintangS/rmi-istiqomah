import { AdminDokumenForm } from "@/components/admin/AdminDokumenForm";

export default function AdminDokumenBaruPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Tambah Dokumen</h2>
        <p className="mt-1 text-body text-foreground/70">Upload file dan atur status publikasi.</p>
      </div>
      <AdminDokumenForm mode="create" />
    </div>
  );
}
