import { AdminProgramList } from "@/components/admin/AdminProgramList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminProgramPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Program"
        description="Program unggulan yang tampil di halaman Program."
      />
      <AdminProgramList />
    </>
  );
}
