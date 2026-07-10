import { AdminBannerList } from "@/components/admin/AdminBannerList";

export default function AdminBannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Kelola Banner</h2>
        <p className="text-body mt-1 text-foreground/70">
          Banner aktif (urutan terkecil) dipakai sebagai gambar hero beranda.
        </p>
      </div>
      <AdminBannerList />
    </div>
  );
}
