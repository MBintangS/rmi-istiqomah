import { AdminGaleriEditView } from "@/components/admin/AdminGaleriEditView";

interface AdminGaleriEditPageProps {
  params: { id: string };
}

export default function AdminGaleriEditPage({ params }: AdminGaleriEditPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Edit Album Galeri</h2>
        <p className="text-body mt-1 text-foreground/70">Perbarui foto dan metadata album.</p>
      </div>
      <AdminGaleriEditView id={params.id} />
    </div>
  );
}
