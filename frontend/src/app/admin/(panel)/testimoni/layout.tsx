import { SuperAdminGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminOrganisasiTestimoniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminGuard>{children}</SuperAdminGuard>;
}
