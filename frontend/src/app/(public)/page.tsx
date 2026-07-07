import { Button } from "@/components/ui";
import { mockSettings } from "@/data/mock";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 bg-background px-6 py-16 text-center">
      <p className="text-caption font-medium text-primary">{mockSettings.tagline}</p>
      <h1 className="max-w-2xl text-primary">{mockSettings.siteName}</h1>
      <p className="text-body max-w-xl text-foreground/80">{mockSettings.about}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/kegiatan">Lihat Kegiatan</Button>
        <Button href="/kontak" variant="secondary">
          Gabung Bersama Kami
        </Button>
      </div>
    </div>
  );
}
