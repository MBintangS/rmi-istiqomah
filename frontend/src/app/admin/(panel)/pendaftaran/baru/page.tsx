import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPendaftaranForm } from "@/components/admin/AdminPendaftaranForm";

export default function AdminPendaftaranBaruPage() {
  return (
    <>
      <AdminPageHeader title="Buka pendaftaran" description="Pilih program, judul, dan tanggal periode." />
      <AdminPendaftaranForm mode="create" />
    </>
  );
}
