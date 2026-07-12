import { DashboardContactMessages } from "@/components/admin/DashboardContactMessages";
import { DashboardStatsGrid } from "@/components/admin/DashboardStatsGrid";
import { DashboardWelcome } from "@/components/admin/DashboardWelcome";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-7">
      <DashboardWelcome />
      <DashboardStatsGrid />
      <DashboardContactMessages />
    </div>
  );
}
