import { AdminGaleriEditView } from "@/components/admin/AdminGaleriEditView";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

interface AdminGaleriEditPageProps {
  params: { id: string };
}

export default function AdminGaleriEditPage({ params }: AdminGaleriEditPageProps) {
  return (
    <>
      <AdminPageHeader
        title="Edit Album Galeri"
        description="Perbarui foto dan metadata album."
      />
      <AdminGaleriEditView id={params.id} />
    </>
  );
}
