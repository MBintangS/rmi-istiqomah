import { PrayerTimesPageContent } from "@/components/ibadah/PrayerTimesPageContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Jadwal Sholat",
  description:
    "Jadwal sholat harian Kota Bogor. Imsak, Subuh, Dzuhur, Ashar, Maghrib, dan Isya.",
  path: "/ibadah/jadwal-sholat",
});

export default function JadwalSholatPage() {
  return <PrayerTimesPageContent />;
}
