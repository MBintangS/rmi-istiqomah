import { AdminProgramForm } from "@/components/admin/AdminProgramForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminProgramBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Program"
        description="Buat program baru dengan konten lengkap."
      />
      <AdminProgramForm mode="create" />
    </>
  );
}
