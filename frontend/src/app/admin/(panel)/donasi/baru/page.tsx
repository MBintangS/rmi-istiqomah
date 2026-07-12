import { AdminDonasiForm } from "@/components/admin/AdminDonasiForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminDonasiBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Rekening Donasi"
        description="Isi data rekening bank untuk halaman donasi."
      />
      <AdminDonasiForm mode="create" />
    </>
  );
}
