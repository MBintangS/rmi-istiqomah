import { AdminPenggunaList } from "@/components/admin/AdminPenggunaList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SuperAdminGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminPenggunaPage() {
  return (
    <SuperAdminGuard>
      <AdminPageHeader
        title="Kelola Pengguna"
        description="Akun admin dan superadmin untuk akses CMS."
      />
      <AdminPenggunaList />
    </SuperAdminGuard>
  );
}
