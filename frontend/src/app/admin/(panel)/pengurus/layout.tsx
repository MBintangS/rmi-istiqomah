import { PengurusGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminOrganisasiPengurusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PengurusGuard>{children}</PengurusGuard>;
}
