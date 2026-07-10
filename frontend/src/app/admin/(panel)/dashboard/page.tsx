import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DashboardStatsGrid } from "@/components/admin/DashboardStatsGrid";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Ringkasan konten website Remaja Masjid Istiqomah."
      />
      <DashboardStatsGrid />
    </>
  );
}
