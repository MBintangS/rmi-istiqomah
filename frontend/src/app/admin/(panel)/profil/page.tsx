import { AdminProfileForm } from "@/components/admin/AdminProfileForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminProfilPage() {
  return (
    <>
      <AdminPageHeader
        title="Profil"
        description="Ubah nama, email, password, dan foto akun CMS Anda."
      />
      <AdminProfileForm />
    </>
  );
}
