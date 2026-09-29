import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPendaftaranList } from "@/components/admin/AdminPendaftaranList";

export default function AdminPendaftaranPage() {
  return (
    <>
      <AdminPageHeader
        title="Pendaftaran"
        description="Buka periode pendaftaran untuk program yang sudah ada, lalu lihat peserta yang masuk."
      />
      <AdminPendaftaranList />
    </>
  );
}
