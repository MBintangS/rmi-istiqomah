import { AdminBannerForm } from "@/components/admin/AdminBannerForm";

export default function AdminBannerBaruPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Tambah Banner</h2>
        <p className="text-body mt-1 text-foreground/70">Upload gambar untuk hero beranda.</p>
      </div>
      <AdminBannerForm mode="create" />
    </div>
  );
}
