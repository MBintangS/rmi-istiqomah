import { AdminPengurusForm } from "@/components/admin/AdminPengurusForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminPengurusBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Pengurus"
        description="Isi data pengurus dan upload foto."
      />
      <AdminPengurusForm mode="create" />
    </>
  );
}
