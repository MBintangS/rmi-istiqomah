import { TentangKamiContent } from "@/components/tentang-kami/TentangKamiContent";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
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
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Tentang Kami" },
            ]}
            className="mb-4"
          />
          <h2>Tentang Kami</h2>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Mengenal lebih dekat Remaja Masjid Istiqomah: profil, landasan, dan tim pengurus.
          </p>
        </div>
      </section>

      <TentangKamiContent />
    </>
  );
}
