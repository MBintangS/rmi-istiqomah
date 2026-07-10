import { AdminArtikelEditView } from "@/components/admin/AdminArtikelEditView";

interface AdminArtikelEditPageProps {
  params: { slug: string };
}

export default function AdminArtikelEditPage({ params }: AdminArtikelEditPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Edit Artikel</h2>
        <p className="text-body mt-1 text-foreground/70">Perbarui konten dan status artikel.</p>
      </div>
      <AdminArtikelEditView slug={params.slug} />
    </div>
  );
}
