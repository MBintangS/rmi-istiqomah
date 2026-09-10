import { DashboardContactMessages } from "@/components/admin/DashboardContactMessages";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminPesanKontakPage() {
  return (
    <>
      <AdminPageHeader
        title="Pesan kontak"
        description="Inbox pesan dari formulir halaman Kontak."
      />
      <DashboardContactMessages />
    </>
  );
}
