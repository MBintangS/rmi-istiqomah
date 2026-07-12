"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button, EmptyState, Skeleton } from "@/components/ui";
import { useProgram } from "@/hooks/useProgram";
import { getApiErrorMessage } from "@/lib/api";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { mapProgramDetail } from "@/lib/mappers/program";

interface ProgramDetailViewProps {
  slug: string;
}

export function ProgramDetailView({ slug }: ProgramDetailViewProps) {
  const { data, isLoading, isError, error, refetch } = useProgram(slug);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="aspect-[21/9] w-full rounded-rmi" />
        <Skeleton variant="text" lines={8} />
      </div>
    );
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
              src={program.image || PLACEHOLDER_IMAGE}
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
                {program.content ? (
                  <div
                    className="text-body space-y-4 text-foreground/80 [&_p]:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: program.content }}
                  />
                ) : (
                  <p className="text-body text-foreground/80">{program.description}</p>
                )}
              </div>

              {program.galleryImages.length > 0 && (
                <div>
                  <h2 className="mb-4">Galeri Kegiatan</h2>
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

            <aside className="space-y-6">
              {program.schedule.length > 0 && (
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
              )}

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
