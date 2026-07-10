import { AdminDokumenEditView } from "@/components/admin/AdminDokumenEditView";

interface PageProps {
  params: { id: string };
}

export default function AdminDokumenEditPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Edit Dokumen</h2>
        <p className="mt-1 text-body text-foreground/70">Perbarui metadata atau ganti file.</p>
      </div>
      <AdminDokumenEditView id={params.id} />
    </div>
  );
}
