import { AdminArtikelList } from "@/components/admin/AdminArtikelList";

export default function AdminArtikelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Kelola Artikel</h2>
        <p className="text-body mt-1 text-foreground/70">
          Buat, edit, publikasikan, atau hapus artikel Islami.
        </p>
      </div>
      <AdminArtikelList />
    </div>
  );
}
