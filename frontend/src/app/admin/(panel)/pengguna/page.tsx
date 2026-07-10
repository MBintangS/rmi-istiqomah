import { AdminPenggunaList } from "@/components/admin/AdminPenggunaList";
import { SuperAdminGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminPenggunaPage() {
  return (
    <SuperAdminGuard>
      <AdminPenggunaList />
    </SuperAdminGuard>
  );
}
