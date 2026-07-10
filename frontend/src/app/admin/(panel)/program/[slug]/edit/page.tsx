import { AdminProgramEditView } from "@/components/admin/AdminProgramEditView";

interface PageProps {
  params: { slug: string };
}

export default function AdminProgramEditPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Edit Program</h2>
        <p className="mt-1 text-body text-foreground/70">Perbarui konten dan status program.</p>
      </div>
      <AdminProgramEditView slug={params.slug} />
    </div>
  );
}
