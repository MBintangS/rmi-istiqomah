import { AdminArtikelForm } from "@/components/admin/AdminArtikelForm";

export default function AdminArtikelBaruPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Tambah Artikel</h2>
        <p className="text-body mt-1 text-foreground/70">
          Tulis artikel baru untuk website publik.
        </p>
      </div>
      <AdminArtikelForm mode="create" />
    </div>
  );
}
