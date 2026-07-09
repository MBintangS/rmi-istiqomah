import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui";
import { getProgramBySlug, getProgramSlugs } from "@/lib/programs";
import { buildPageMetadata } from "@/lib/seo";

interface ProgramDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getProgramSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProgramDetailPageProps): Metadata {
  const program = getProgramBySlug(params.slug);

  if (!program) {
    return buildPageMetadata({
      title: "Program Tidak Ditemukan",
      description: "Program yang Anda cari tidak ditemukan.",
      path: `/program/${params.slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: program.name,
    description: program.description,
    path: `/program/${program.slug}`,
    image: program.image || undefined,
  });
}

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const program = getProgramBySlug(params.slug);

  if (!program) {
    notFound();
  }

  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Program", href: "/program" },
              { label: program.name },
            ]}
            className="mb-4"
          />
          <h2>{program.name}</h2>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">{program.description}</p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-10 aspect-video overflow-hidden rounded-rmi shadow-soft sm:aspect-[21/9]">
            <Image
              src={program.image}
              alt={program.name}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1152px"
              priority
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <h2 className="mb-4">Tentang Program</h2>
                <div
                  className="text-body space-y-4 text-foreground/80 [&_p]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: program.content }}
                />
              </div>

              <div>
                <h2 className="mb-4">Galeri Kegiatan</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {program.galleryImages.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="relative aspect-square overflow-hidden rounded-rmi bg-primary/10"
                    >
                      <Image
                        src={image}
                        alt={`Dokumentasi ${program.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-caption mt-3 text-foreground/60">
                  Galeri lengkap akan tersedia di halaman{" "}
                  <Link href="/galeri" className="font-medium text-primary hover:underline">
                    Galeri
                  </Link>
                  .
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-rmi border border-foreground/10 bg-surface p-6 shadow-soft">
                <h2 className="mb-4 text-lg">Jadwal</h2>
                <dl className="space-y-4">
                  {program.schedule.map((item) => (
                    <div key={item.label}>
                      <dt className="text-caption font-medium text-primary">{item.label}</dt>
                      <dd className="text-body mt-1 text-foreground/80">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-rmi border border-primary/20 bg-primary/5 p-6">
                <h2 className="mb-2 text-lg">Tertarik bergabung?</h2>
                <p className="text-body mb-4 text-foreground/80">
                  Hubungi pengurus RMI untuk informasi pendaftaran dan detail kegiatan.
                </p>
                <Button href="/kontak" className="w-full">
                  Info lebih lanjut
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
