import type { Metadata } from "next";
import { Badge } from "@/components/ui";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { mockDokumen } from "@/data/mock";

export const metadata: Metadata = {
  title: "Dokumen",
  description: "Unduh dokumen publik Remaja Masjid Istiqomah.",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const publishedDocuments = mockDokumen
  .filter((doc) => doc.isPublished)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export default function DokumenPage() {
  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Dokumen" },
            ]}
            className="mb-4"
          />
          <h1>Dokumen Publik</h1>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Unduh proposal, panduan, laporan, dan formulir kegiatan RMI.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {publishedDocuments.map((doc) => (
              <article
                key={doc.id}
                className="flex flex-col gap-4 rounded-rmi border border-foreground/10 bg-surface p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-heading">{doc.name}</h2>
                    <Badge variant="category">{doc.category}</Badge>
                    <Badge variant="default">{doc.fileType.toUpperCase()}</Badge>
                  </div>
                  <p className="text-body text-foreground/80">{doc.description}</p>
                  <p className="text-caption text-foreground/60">{formatFileSize(doc.fileSize)}</p>
                </div>

                <a
                  href={doc.fileUrl}
                  className="text-button inline-flex shrink-0 items-center justify-center rounded-rmi border border-primary bg-transparent px-5 py-2.5 font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  Unduh
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
