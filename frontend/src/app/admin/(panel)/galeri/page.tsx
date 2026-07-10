import { AdminGaleriList } from "@/components/admin/AdminGaleriList";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminGaleriPage() {
  return (
    <>
      <AdminPageHeader
        title="Kelola Galeri"
        description="Upload banyak foto per album untuk halaman galeri dan preview beranda."
      />
      <AdminGaleriList />
    </>
  );
}
