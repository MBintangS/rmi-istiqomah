import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPesertaList } from "@/components/admin/AdminPesertaList";

interface PageProps {
  params: { id: string };
}

export default function AdminPesertaPage({ params }: PageProps) {
  return (
    <>
      <AdminPageHeader title="Peserta" description="Daftar orang yang mendaftar pada periode ini." />
      <AdminPesertaList id={params.id} />
    </>
  );
}
