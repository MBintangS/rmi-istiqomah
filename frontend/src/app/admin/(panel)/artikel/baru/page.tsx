import { AdminArtikelForm } from "@/components/admin/AdminArtikelForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminArtikelBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Artikel"
        description="Tulis artikel baru untuk website publik."
      />
      <AdminArtikelForm mode="create" />
    </>
  );
}
