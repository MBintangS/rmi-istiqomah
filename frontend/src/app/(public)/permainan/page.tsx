import { PermainanHub } from "@/components/permainan/PermainanHub";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Permainan",
  description:
    "Permainan Islami dari Remaja Masjid Istiqomah: kenal hijaiyah, urutan wudu, cari kata, cocok asmaul husna, kuis, dan kasus akhlak.",
  path: "/permainan",
});

export default function PermainanPage() {
  return <PermainanHub />;
}
