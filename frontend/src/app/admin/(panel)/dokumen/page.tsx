import { AdminDokumenList } from "@/components/admin/AdminDokumenList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminDokumenPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Dokumen"
        description="Upload dan kelola dokumen publik untuk diunduh jamaah."
      />
      <AdminDokumenList />
    </>
  );
}
