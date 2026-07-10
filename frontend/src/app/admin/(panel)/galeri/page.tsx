import { AdminGaleriList } from "@/components/admin/AdminGaleriList";

export default function AdminGaleriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Kelola Galeri</h2>
        <p className="text-body mt-1 text-foreground/70">
          Upload banyak foto per album untuk halaman galeri dan preview beranda.
        </p>
      </div>
      <AdminGaleriList />
    </div>
  );
}
