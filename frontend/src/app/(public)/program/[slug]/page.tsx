import type { Metadata } from "next";
import { ProgramDetailView } from "@/components/program/ProgramDetailView";
import { fetchProgramBySlug } from "@/services/program.service";
import { buildPageMetadata } from "@/lib/seo";

interface ProgramDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProgramDetailPageProps): Promise<Metadata> {
  try {
    const program = await fetchProgramBySlug(params.slug);

    return buildPageMetadata({
      title: program.name,
      description:
        program.description ?? `Program ${program.name} — Remaja Masjid Istiqomah.`,
      path: `/program/${program.slug}`,
      image: program.image || undefined,
    });
  } catch {
    return buildPageMetadata({
      title: "Program Tidak Ditemukan",
      description: "Program yang Anda cari tidak ditemukan.",
      path: `/program/${params.slug}`,
      noIndex: true,
    });
  }
}

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  return <ProgramDetailView slug={params.slug} />;
}
