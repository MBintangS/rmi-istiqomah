import { SuperAdminGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminOrganisasiPengurusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminGuard>{children}</SuperAdminGuard>;
}
