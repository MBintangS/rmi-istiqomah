import { AdminKegiatanForm } from "@/components/admin/AdminKegiatanForm";

export default function AdminKegiatanBaruPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Tambah Kegiatan</h2>
        <p className="text-body mt-1 text-foreground/70">Buat kegiatan baru untuk website publik.</p>
      </div>
      <AdminKegiatanForm mode="create" />
    </div>
  );
}
