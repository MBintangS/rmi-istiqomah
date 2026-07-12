"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge, EmptyState, RichTextContent } from "@/components/ui";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useKegiatanBySlug } from "@/hooks/useKegiatanBySlug";
import { useSettingsValue } from "@/hooks/useSettings";
import { formatEventDate } from "@/lib/format-date";
import { eventStatusLabels } from "@/lib/events";
import { getApiErrorMessage } from "@/lib/api";
import { mapKegiatanListItem } from "@/lib/mappers/kegiatan";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { KegiatanDokumentasi } from "@/components/kegiatan/KegiatanDokumentasi";
import { KegiatanDetailSkeleton } from "@/components/kegiatan/KegiatanDetailSkeleton";

interface KegiatanDetailViewProps {
  slug: string;
}

export function KegiatanDetailView({ slug }: KegiatanDetailViewProps) {
  const { data, isLoading, isError, error, refetch } = useKegiatanBySlug(slug);
  const settings = useSettingsValue();

  if (isLoading) {
    return <KegiatanDetailSkeleton />;
  }

  if (isError) {
    const message = getApiErrorMessage(error);
    const isNotFound = message.toLowerCase().includes("tidak ditemukan");

    if (isNotFound) {
      notFound();
    }

    return (
      <EmptyState
        title="Gagal memuat kegiatan"
        description={message}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  if (!data) {
    notFound();
  }

  const event = mapKegiatanListItem(data);
  const status = eventStatusLabels[event.status];
  const mapEmbed = event.locationMap ?? settings.googleMapsEmbed;
  const plainDescription = event.description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: plainDescription,
    startDate: event.dateStart,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: event.thumbnail || PLACEHOLDER_IMAGE,
  };

  return (
    <>
      <JsonLd data={eventLd} />
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Kegiatan", href: "/kegiatan" },
              { label: event.title },
            ]}
            className="mb-4"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={status.variant}>{status.label}</Badge>
            <Badge variant="category">{event.category.name}</Badge>
          </div>
          <h2 className="mt-3">{event.title}</h2>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-10 aspect-video overflow-hidden rounded-rmi shadow-soft sm:aspect-[21/9]">
            <Image
              src={event.thumbnail || PLACEHOLDER_IMAGE}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1152px"
              priority
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <h3 className="mb-4">Deskripsi Kegiatan</h3>
                <RichTextContent html={event.description} />
              </div>

              <KegiatanDokumentasi eventId={event.id} eventTitle={event.title} />

              {event.location && (
                <div>
                  <h3 className="mb-4">Lokasi</h3>
                  <p className="text-body mb-4 text-foreground/80">{event.location}</p>
                  <div className="relative aspect-video overflow-hidden rounded-rmi border border-foreground/10 bg-surface">
                    <iframe
                      src={mapEmbed}
                      title={`Peta lokasi ${event.title}`}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-rmi border border-foreground/10 bg-surface p-6 shadow-soft">
                <h2 className="mb-4 text-lg">Informasi</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-caption font-medium text-primary">Tanggal</dt>
                    <dd className="text-body mt-1 text-foreground/80">
                      <time dateTime={event.dateStart}>{formatEventDate(event.dateStart)}</time>
                      {event.dateEnd && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <time dateTime={event.dateEnd}>{formatEventDate(event.dateEnd)}</time>
                        </>
                      )}
                    </dd>
                  </div>
                  {event.time && (
                    <div>
                      <dt className="text-caption font-medium text-primary">Waktu</dt>
                      <dd className="text-body mt-1 text-foreground/80">{event.time} WIB</dd>
                    </div>
                  )}
                  {event.location && (
                    <div>
                      <dt className="text-caption font-medium text-primary">Lokasi</dt>
                      <dd className="text-body mt-1 text-foreground/80">{event.location}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-caption font-medium text-primary">Status</dt>
                    <dd className="mt-1">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
