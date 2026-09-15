import { PengurusGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminOrganisasiProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PengurusGuard>{children}</PengurusGuard>;
}
