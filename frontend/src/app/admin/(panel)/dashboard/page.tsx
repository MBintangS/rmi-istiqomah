import { DashboardStatsGrid } from "@/components/admin/DashboardStatsGrid";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Dashboard</h2>
        <p className="text-body mt-1 text-foreground/70">
          Ringkasan konten website Remaja Masjid Istiqomah.
        </p>
      </div>
      <DashboardStatsGrid />
    </div>
  );
}
