import { PageHero } from "@/components/layout/PageHero";
import { PendaftaranPageContent } from "@/components/pendaftaran/PendaftaranPageContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pendaftaran",
  description: "Daftar program Remaja Masjid Istiqomah yang sedang membuka pendaftaran.",
  path: "/pendaftaran",
});

export default function PendaftaranPage({
  searchParams,
}: {
  searchParams: { program?: string; periode?: string };
}) {
  return (
    <>
      <PageHero
        variant="utility"
        title="Pendaftaran"
        description={
          searchParams.periode
            ? "Isi data diri Anda untuk menyelesaikan pendaftaran."
            : "Pilih program yang sedang dibuka, lalu isi data diri Anda."
        }
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Pendaftaran" },
        ]}
      />
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-rmi border border-secondary/35 bg-surface p-5 sm:p-8">
            <PendaftaranPageContent programSlug={searchParams.program} periodeSlug={searchParams.periode} />
          </div>
        </div>
      </section>
    </>
  );
}
