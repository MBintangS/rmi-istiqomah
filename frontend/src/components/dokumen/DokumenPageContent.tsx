"use client";

import { Badge, EmptyState, SkeletonList } from "@/components/ui";
import { useDokumen } from "@/hooks/useDokumen";
import { getApiErrorMessage } from "@/lib/api";
import { formatFileSize } from "@/lib/format-file-size";
import { mapDokumenListItem } from "@/lib/mappers/dokumen";

export function DokumenPageContent() {
  const { data, isLoading, isError, error, refetch } = useDokumen({ limit: 50 });

  if (isLoading) {
    return <SkeletonList count={4} />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat dokumen"
        description={getApiErrorMessage(error, "Periksa koneksi dan pastikan backend API berjalan.")}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  const documents = (data?.items ?? []).map(mapDokumenListItem);

  if (documents.length === 0) {
    return (
      <EmptyState
        title="Belum ada dokumen"
        description="Dokumen publik RMI akan tampil di sini setelah diunggah."
      />
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
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
            {doc.description && (
              <p className="text-body text-foreground/80">{doc.description}</p>
            )}
            <p className="text-caption text-foreground/60">{formatFileSize(doc.fileSize)}</p>
          </div>

          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="text-button inline-flex shrink-0 items-center justify-center rounded-rmi border border-primary bg-transparent px-5 py-2.5 font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Unduh
          </a>
        </article>
      ))}
    </div>
  );
}
