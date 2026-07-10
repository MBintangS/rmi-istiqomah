import { AdminPengurusEditView } from "@/components/admin/AdminPengurusEditView";

interface PageProps {
  params: { id: string };
}

export default function AdminPengurusEditPage({ params }: PageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Edit Pengurus</h2>
        <p className="mt-1 text-body text-foreground/70">Perbarui data pengurus.</p>
      </div>
      <AdminPengurusEditView id={params.id} />
    </div>
  );
}
