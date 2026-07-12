import { AdminDonasiList } from "@/components/admin/AdminDonasiList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminDonasiPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Donasi"
        description="Rekening aktif tampil di halaman donasi publik."
      />
      <AdminDonasiList />
    </>
  );
}
