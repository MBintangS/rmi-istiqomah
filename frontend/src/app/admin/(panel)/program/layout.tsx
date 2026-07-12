import { SuperAdminGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminOrganisasiProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminGuard>{children}</SuperAdminGuard>;
}
