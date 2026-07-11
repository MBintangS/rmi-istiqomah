"use client";

import { ProgramCard } from "@/components/home/ProgramCard";
import { EmptyState, SkeletonList } from "@/components/ui";
import { usePrograms } from "@/hooks/usePrograms";
import { getApiErrorMessage } from "@/lib/api";
import { mapProgramListItem } from "@/lib/mappers/program";

export function ProgramPageContent() {
  const { data, isLoading, isError, error, refetch } = usePrograms();

  if (isLoading) {
    return <SkeletonList count={3} />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Gagal memuat program"
        description={getApiErrorMessage(error, "Periksa koneksi dan pastikan backend API berjalan.")}
        actionLabel="Coba lagi"
        onAction={() => refetch()}
      />
    );
  }

  const programs = (data ?? []).map(mapProgramListItem);

  if (programs.length === 0) {
    return (
      <EmptyState
        title="Belum ada program"
        description="Program unggulan RMI akan tampil di sini setelah ditambahkan."
      />
    );
  }

  return (
    <div className="grid gap-6">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
}
