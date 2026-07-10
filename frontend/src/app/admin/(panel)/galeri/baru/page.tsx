import { AdminGaleriForm } from "@/components/admin/AdminGaleriForm";

export default function AdminGaleriBaruPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Tambah Album Galeri</h2>
        <p className="text-body mt-1 text-foreground/70">Upload satu atau lebih foto sekaligus.</p>
      </div>
      <AdminGaleriForm mode="create" />
    </div>
  );
}
