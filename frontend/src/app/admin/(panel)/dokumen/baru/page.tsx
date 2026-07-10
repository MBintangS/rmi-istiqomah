import { AdminDokumenForm } from "@/components/admin/AdminDokumenForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminDokumenBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Dokumen"
        description="Upload file dan atur status publikasi."
      />
      <AdminDokumenForm mode="create" />
    </>
  );
}
