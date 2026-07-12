import { TentangKamiContent } from "@/components/tentang-kami/TentangKamiContent";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tentang Kami",
  description:
    "Profil Remaja Masjid Istiqomah (RMI), visi misi, sejarah, dan struktur kepengurusan.",
  path: "/tentang-kami",
});

export default function TentangKamiPage() {
  return (
    <>
      <PageHero
        title="Tentang Kami"
        description="Mengenal lebih dekat Remaja Masjid Istiqomah: profil, landasan, dan tim pengurus."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Tentang Kami" },
        ]}
      />

      <TentangKamiContent />
    </>
  );
}
