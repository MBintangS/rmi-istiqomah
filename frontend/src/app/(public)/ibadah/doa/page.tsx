import { Amiri } from "next/font/google";
import { DoaPageContent } from "@/components/ibadah/DoaPageContent";
import { buildPageMetadata } from "@/lib/seo";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = buildPageMetadata({
  title: "Doa",
  description: "Kumpulan doa dan dzikir Remaja Masjid Istiqomah. Cari, baca, dan salin.",
  path: "/ibadah/doa",
});

export default function DoaPage() {
  return <DoaPageContent arabicClassName={amiri.className} />;
}
