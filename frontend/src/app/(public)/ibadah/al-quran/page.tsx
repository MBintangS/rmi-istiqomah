import { Amiri } from "next/font/google";
import { QuranComingSoon } from "@/components/ibadah/QuranComingSoon";
import { buildPageMetadata } from "@/lib/seo";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = buildPageMetadata({
  title: "Al-Qur'an",
  description:
    "Mushaf digital Remaja Masjid Istiqomah sedang dirakit. Sementara ini, jaga waktu sholat dulu.",
  path: "/ibadah/al-quran",
  noIndex: true,
});

export default function AlQuranPage() {
  return <QuranComingSoon arabicClassName={amiri.className} />;
}
