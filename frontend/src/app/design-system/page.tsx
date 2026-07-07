import { Badge, Button, Card, Input, Label, Select, Textarea } from "@/components/ui";

const colors = [
  { name: "primary", className: "bg-primary", hex: "#4e830a" },
  { name: "primary-dark", className: "bg-primary-dark", hex: "#3c5e0a" },
  { name: "primary-light", className: "bg-primary-light", hex: "#6b9129" },
  { name: "secondary", className: "bg-secondary", hex: "#D4AF37" },
  { name: "secondary-alt", className: "bg-secondary-alt", hex: "#c0a34e" },
  { name: "background", className: "bg-background", hex: "#ebded3" },
  { name: "surface", className: "bg-surface", hex: "#F8FAFC" },
  { name: "foreground", className: "bg-foreground", hex: "#1F2937" },
  { name: "heading", className: "bg-heading", hex: "#23300a" },
  { name: "accent-green", className: "bg-accent-green", hex: "#94a658" },
  { name: "accent-green-2", className: "bg-accent-green-2", hex: "#477909" },
  { name: "accent-green-3", className: "bg-accent-green-3", hex: "#598712" },
];

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-2">
          <p className="text-caption font-medium text-primary">Dev Reference</p>
          <h1>Design System RMI</h1>
          <p className="text-body max-w-2xl text-foreground/80">
            Preview warna, tipografi, dan komponen UI untuk website Remaja Masjid Istiqomah.
          </p>
        </header>

        <section className="space-y-4">
          <h2>Form</h2>
          <div className="max-w-lg space-y-5 rounded-rmi bg-surface p-6 shadow-soft">
            <div className="space-y-2">
              <Label htmlFor="ds-name" required>
                Nama Lengkap
              </Label>
              <Input id="ds-name" name="name" placeholder="Masukkan nama Anda" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ds-email" required>
                Email
              </Label>
              <Input
                id="ds-email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                error
                aria-describedby="ds-email-error"
              />
              <p id="ds-email-error" className="text-sm text-red-600" role="alert">
                Email wajib diisi dengan format yang benar.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ds-subject">Subjek</Label>
              <Select id="ds-subject" name="subject" defaultValue="">
                <option value="" disabled>
                  Pilih subjek
                </option>
                <option value="kegiatan">Info Kegiatan</option>
                <option value="anggota">Pendaftaran Anggota</option>
                <option value="lainnya">Lainnya</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ds-message" required>
                Pesan
              </Label>
              <Textarea
                id="ds-message"
                name="message"
                placeholder="Tulis pesan Anda di sini..."
              />
            </div>

            <Button type="button">Kirim Pesan</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2>Button</h2>
          <div className="space-y-6 rounded-rmi bg-surface p-6 shadow-soft">
            <div className="space-y-3">
              <p className="text-caption text-foreground/60">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-caption text-foreground/60">Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-caption text-foreground/60">Disabled</p>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2>Badge</h2>
          <div className="flex flex-wrap gap-3 rounded-rmi bg-surface p-6 shadow-soft">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="category">Kategori Dakwah</Badge>
            <Badge variant="category">Kegiatan</Badge>
          </div>
        </section>

        <section className="space-y-4">
          <h2>Card</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card
              image={{
                src: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&q=80",
                alt: "Kegiatan remaja masjid",
              }}
              title="Isra Miraj"
              description="Peringatan Isra Miraj bersama jamaah dan kegiatan tausiyah remaja masjid."
              footer={<Button size="sm">Selengkapnya</Button>}
            />
            <Card
              title="Sanlat RMI"
              description="Pesantren kilat tahunan untuk meningkatkan pemahaman agama generasi muda."
              footer={
                <div className="flex items-center justify-between">
                  <Badge variant="category">Program</Badge>
                  <Button variant="outline" size="sm">
                    Detail
                  </Button>
                </div>
              }
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2>Warna</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colors.map((color) => (
              <div
                key={color.name}
                className="overflow-hidden rounded-rmi bg-surface shadow-soft"
              >
                <div className={`h-20 ${color.className}`} />
                <div className="space-y-1 p-3">
                  <p className="text-sm font-medium text-heading">{color.name}</p>
                  <p className="text-caption text-foreground/70">{color.hex}</p>
                  <p className="text-caption font-mono text-foreground/60">
                    {color.className}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2>Tipografi</h2>
          <div className="space-y-6 rounded-rmi bg-surface p-6 shadow-soft">
            <div>
              <p className="text-caption mb-1 text-foreground/60">H1 — Bold 700</p>
              <h1>Remaja Masjid Istiqomah</h1>
            </div>
            <div>
              <p className="text-caption mb-1 text-foreground/60">H2 — SemiBold 600</p>
              <h2>Program Unggulan Kami</h2>
            </div>
            <div>
              <p className="text-caption mb-1 text-foreground/60">H3 — SemiBold 600</p>
              <h3>Isra Miraj &amp; Maulid Nabi</h3>
            </div>
            <div>
              <p className="text-caption mb-1 text-foreground/60">Body — Regular 400</p>
              <p className="text-body max-w-2xl">
                RMI adalah wadah bagi generasi muda untuk berkontribusi dalam kegiatan masjid,
                mempererat ukhuwah, dan menyebarkan nilai-nilai Islami.
              </p>
            </div>
            <div>
              <p className="text-caption mb-1 text-foreground/60">Caption — Regular 400</p>
              <p className="text-caption">Terakhir diperbarui: 7 Juli 2026</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
