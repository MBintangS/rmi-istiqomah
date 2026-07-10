import { AdminTestimoniEditView } from "@/components/admin/AdminTestimoniEditView";

interface PageProps {
  params: { id: string };
}

export default function AdminTestimoniEditPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Edit Testimoni</h2>
        <p className="mt-1 text-body text-foreground/70">Perbarui isi atau status testimoni.</p>
      </div>
      <AdminTestimoniEditView id={params.id} />
    </div>
  );
}
