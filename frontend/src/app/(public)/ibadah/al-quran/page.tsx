import { Amiri } from "next/font/google";
import { QuranIndexContent } from "@/components/ibadah/QuranIndexContent";
import { buildPageMetadata } from "@/lib/seo";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = buildPageMetadata({
  title: "Al-Qur'an",
  description:
    "Baca 114 surat Al-Qur'an: Arab, latin, terjemah Indonesia, dan tilawah. Remaja Masjid Istiqomah.",
  path: "/ibadah/al-quran",
});

export default function AlQuranPage() {
  return <QuranIndexContent arabicClassName={amiri.className} />;
}
