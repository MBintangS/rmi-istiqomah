"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Button, EmptyState, RichTextContent } from "@/components/ui";
import { useProgram } from "@/hooks/useProgram";
import { getApiErrorMessage } from "@/lib/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { mapProgramDetail } from "@/lib/mappers/program";
import { ProgramRelatedKegiatan } from "@/components/program/ProgramRelatedKegiatan";
import { ProgramDetailSkeleton } from "@/components/program/ProgramDetailSkeleton";

interface ProgramDetailViewProps {
  slug: string;
}

export function ProgramDetailView({ slug }: ProgramDetailViewProps) {
  const { data, isLoading, isError, error, refetch } = useProgram(slug);

  if (isLoading) {
    return <ProgramDetailSkeleton />;
  }

  if (isError) {
    const message = getApiErrorMessage(error);
    const isNotFound = message.toLowerCase().includes("tidak ditemukan");

    if (isNotFound) {
      notFound();
    }

    return (
      <EmptyState
        title="Gagal memuat program"
        description={message}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!data) {
    notFound();
  }

  const program = mapProgramDetail(data);

  return (
    <>
      <PageHero
        variant="detail"
        title={program.name}
        description={program.description}
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Program", href: "/program" },
          { label: program.name },
        ]}
      />

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-rmi sm:aspect-[21/9]">
            <Image
              src={program.image || PLACEHOLDER_IMAGE}
              alt={program.name}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1152px"
              priority
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-10 lg:col-span-8">
              <div>
                <h2 className="mb-4 text-2xl">Tentang Program</h2>
                {program.content ? (
                  <RichTextContent html={program.content} />
                ) : (
                  <p className="text-body text-foreground/80">{program.description}</p>
                )}
              </div>

              {program.galleryImages.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl">Galeri Kegiatan</h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {program.galleryImages.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="relative aspect-square overflow-hidden rounded-rmi bg-primary/10"
                      >
                        <Image
                          src={image || PLACEHOLDER_IMAGE}
                          alt={`Dokumentasi ${program.name} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-caption text-foreground/60">
                Dokumentasi lengkap tersedia di halaman{" "}
                <Link href="/galeri" className="font-medium text-primary hover:underline">
                  Galeri
                </Link>
                .
              </p>
            </div>

            <aside className="space-y-6 lg:col-span-4">
              {program.schedule.length > 0 && (
                <div className="rounded-rmi border border-foreground/10 bg-surface p-6">
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
              )}

              <div className="rounded-rmi bg-heading p-6 text-white">
                <h2 className="mb-2 text-lg text-white">Tertarik bergabung?</h2>
                <p className="text-body mb-4 text-white/80">
                  Hubungi pengurus RMI untuk informasi pendaftaran dan detail kegiatan.
                </p>
                <Button href="/kontak" variant="primary" className="w-full">
                  Info lebih lanjut
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ProgramRelatedKegiatan programName={program.name} programSlug={program.slug} />
    </>
  );
}
