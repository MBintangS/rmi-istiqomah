import { AdminArtikelList } from "@/components/admin/AdminArtikelList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminArtikelPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Artikel"
        description="Buat, edit, publikasikan, atau hapus artikel Islami."
      />
      <AdminArtikelList />
    </>
  );
}
