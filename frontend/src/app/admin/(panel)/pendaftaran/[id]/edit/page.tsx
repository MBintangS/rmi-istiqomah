import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPendaftaranEditView } from "@/components/admin/AdminPendaftaranEditView";

interface PageProps {
  params: { id: string };
}

export default function AdminPendaftaranEditPage({ params }: PageProps) {
  return (
    <>
      <AdminPageHeader title="Edit pendaftaran" description="Perbarui program, judul, tanggal, atau status terbit." />
      <AdminPendaftaranEditView id={params.id} />
    </>
  );
}
