import { DashboardAnalytics } from "@/components/admin/DashboardAnalytics";
import { DashboardStatsGrid } from "@/components/admin/DashboardStatsGrid";
import { DashboardWelcome } from "@/components/admin/DashboardWelcome";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-7">
      <DashboardWelcome />
      <DashboardAnalytics />
      <DashboardStatsGrid />
    </div>
  );
}
