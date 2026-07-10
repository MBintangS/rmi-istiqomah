import { AdminKegiatanList } from "@/components/admin/AdminKegiatanList";

export default function AdminKegiatanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Kelola Kegiatan</h2>
        <p className="text-body mt-1 text-foreground/70">
          Kegiatan yang dipublikasikan dengan status upcoming tampil di beranda.
        </p>
      </div>
      <AdminKegiatanList />
    </div>
  );
}
