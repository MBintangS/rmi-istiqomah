import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DashboardContactMessages } from "@/components/admin/DashboardContactMessages";
import { DashboardStatsGrid } from "@/components/admin/DashboardStatsGrid";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Ringkasan konten website Remaja Masjid Istiqomah."
      />
      <div className="space-y-8">
        <DashboardStatsGrid />
        <DashboardContactMessages />
      </div>
    </>
  );
}
