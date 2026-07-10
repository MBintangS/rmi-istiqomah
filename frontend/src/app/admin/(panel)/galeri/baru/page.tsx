import { AdminGaleriForm } from "@/components/admin/AdminGaleriForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminGaleriBaruPage() {
  return (
    <>
      <AdminPageHeader
        title="Tambah Album Galeri"
        description="Upload satu atau lebih foto sekaligus."
      />
      <AdminGaleriForm mode="create" />
    </>
  );
}
