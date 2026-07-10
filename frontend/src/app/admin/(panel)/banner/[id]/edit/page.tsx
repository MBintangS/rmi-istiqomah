import { AdminBannerEditView } from "@/components/admin/AdminBannerEditView";

interface AdminBannerEditPageProps {
  params: { id: string };
}

export default function AdminBannerEditPage({ params }: AdminBannerEditPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-heading">Edit Banner</h2>
        <p className="text-body mt-1 text-foreground/70">Perbarui gambar, urutan, dan status aktif.</p>
      </div>
      <AdminBannerEditView id={params.id} />
    </div>
  );
}
