import { AdminKegiatanEditView } from "@/components/admin/AdminKegiatanEditView";

interface AdminKegiatanEditPageProps {
  params: { slug: string };
}

export default function AdminKegiatanEditPage({ params }: AdminKegiatanEditPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Edit Kegiatan</h2>
        <p className="text-body mt-1 text-foreground/70">Perbarui detail dan status publikasi.</p>
      </div>
      <AdminKegiatanEditView slug={params.slug} />
    </div>
  );
}
