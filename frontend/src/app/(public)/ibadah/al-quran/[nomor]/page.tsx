import { Amiri } from "next/font/google";
import { notFound } from "next/navigation";
import { QuranReaderContent } from "@/components/ibadah/QuranReaderContent";
import { buildPageMetadata } from "@/lib/seo";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

interface SuratPageProps {
  params: { nomor: string };
}

export function generateMetadata({ params }: SuratPageProps) {
  const nomor = Number(params.nomor);
  if (!Number.isInteger(nomor) || nomor < 1 || nomor > 114) {
    return buildPageMetadata({
      title: "Al-Qur'an",
      description: "Baca Al-Qur'an digital Remaja Masjid Istiqomah.",
      path: "/ibadah/al-quran",
    });
  }

  return buildPageMetadata({
    title: `Surat ${nomor}`,
    description: `Baca surat ke-${nomor} Al-Qur'an: Arab, latin, terjemah, dan tilawah.`,
    path: `/ibadah/al-quran/${nomor}`,
  });
}

export default function QuranSuratPage({ params }: SuratPageProps) {
  const nomor = Number(params.nomor);
  if (!Number.isInteger(nomor) || nomor < 1 || nomor > 114) {
    notFound();
  }

  return <QuranReaderContent nomor={nomor} arabicClassName={amiri.className} />;
}
