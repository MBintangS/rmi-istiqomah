import type { Metadata } from "next";
import Image from "next/image";
import { PengurusCard } from "@/components/about/PengurusCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { mockPengurus, mockSettings } from "@/data/mock";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Profil Remaja Masjid Istiqomah (RMI), visi misi, sejarah, dan struktur kepengurusan.",
};

const historyText =
  "RMI berdiri pada tahun 2015 sebagai wadah formal bagi remaja jamaah Masjid Istiqomah untuk aktif berorganisasi. Berawal dari kajian kecil dan kegiatan sosial sederhana, organisasi ini berkembang menjadi rumah bagi puluhan remaja yang ingin belajar berdakwah, berorganisasi, dan berkontribusi untuk kemajuan masjid.";

const aboutImage =
  "https://images.unsplash.com/photo-1591604466100-9dcb9cbdab0c?w=1000&q=80";

const activePengurus = mockPengurus
  .filter((item) => item.isActive)
  .sort((a, b) => a.order - b.order);

export default function TentangKamiPage() {
  const { siteName, about, vision, mission, stats } = mockSettings;

  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Tentang Kami" },
            ]}
            className="mb-4"
          />
          <h1>Tentang Kami</h1>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Mengenal lebih dekat {siteName} — profil, landasan, dan tim pengurus.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-rmi shadow-soft">
            <Image
              src={aboutImage}
              alt="Kegiatan Remaja Masjid Istiqomah"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-5">
            <p className="text-caption font-medium text-primary">Profil Organisasi</p>
            <h2>{siteName}</h2>
            <p className="text-body text-foreground/80">{about}</p>
            <p className="text-body text-foreground/80">
              Sejak {stats.establishedYear}, RMI telah menjadi motor penggerak kegiatan keagamaan
              dan sosial di lingkungan Masjid Istiqomah, dengan fokus pada pembinaan karakter
              remaja muslim yang aktif, kreatif, dan berakhlak mulia.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-caption font-medium text-primary">Visi &amp; Misi</p>
            <h2>Landasan Organisasi</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-rmi border border-primary/20 bg-primary/5 p-6 sm:p-8">
              <h3 className="mb-4 text-lg font-semibold text-primary">Visi</h3>
              <blockquote className="text-body border-l-4 border-secondary pl-4 text-heading italic">
                &ldquo;{vision}&rdquo;
              </blockquote>
            </div>

            <div className="rounded-rmi border border-foreground/10 bg-background p-6 sm:p-8">
              <h3 className="mb-4 text-lg font-semibold text-primary">Misi</h3>
              <ul className="space-y-3">
                {mission.map((item, index) => (
                  <li key={item} className="flex gap-3 text-body text-foreground/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-caption font-medium text-primary">Sejarah Singkat</p>
          <h2 className="mb-6">Perjalanan RMI</h2>
          <p className="text-body text-foreground/80">{historyText}</p>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-caption font-medium text-primary">Struktur Kepengurusan</p>
            <h2>Pengurus RMI</h2>
            <p className="text-body mx-auto mt-2 max-w-xl text-foreground/70">
              Periode kepengurusan {activePengurus[0]?.period ?? "2024–2026"}.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activePengurus.map((pengurus) => (
              <PengurusCard key={pengurus.id} pengurus={pengurus} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
