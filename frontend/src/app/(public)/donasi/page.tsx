import { DonasiPageContent } from "@/components/donasi/DonasiPageContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Donasi",
  description: "Dukung kegiatan Remaja Masjid Istiqomah melalui donasi.",
  path: "/donasi",
});

export default function DonasiPage() {
  return <DonasiPageContent />;
}
