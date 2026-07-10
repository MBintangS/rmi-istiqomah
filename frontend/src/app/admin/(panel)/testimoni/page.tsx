import { AdminTestimoniList } from "@/components/admin/AdminTestimoniList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminTestimoniPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Testimoni"
        description="Testimoni aktif tampil di beranda website."
      />
      <AdminTestimoniList />
    </>
  );
}
