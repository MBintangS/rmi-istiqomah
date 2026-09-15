import { PengurusGuard } from "@/components/admin/SuperAdminGuard";

export default function AdminOrganisasiTestimoniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PengurusGuard>{children}</PengurusGuard>;
}
