import { AdminTestimoniForm } from "@/components/admin/AdminTestimoniForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminTestimoniBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Testimoni"
        description="Testimoni aktif tampil di beranda."
      />
      <AdminTestimoniForm mode="create" />
    </>
  );
}
