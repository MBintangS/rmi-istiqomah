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
            Preview warna, tipografi, dan token desain untuk website Remaja Masjid Istiqomah.
          </p>
        </header>

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
            <div>
              <p className="text-caption mb-1 text-foreground/60">Button — Medium 500</p>
              <span className="text-button inline-block rounded-full bg-primary px-5 py-2.5 text-white">
                Lihat Kegiatan
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2>Utility Classes</h2>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-primary px-4 py-2 text-sm text-white">
              bg-primary
            </span>
            <span className="rounded-full bg-secondary px-4 py-2 text-sm text-heading">
              bg-secondary
            </span>
            <span className="rounded-full border border-accent-green-2 px-4 py-2 text-sm text-primary">
              text-primary
            </span>
            <span className="rounded-full bg-surface px-4 py-2 text-sm text-secondary shadow-soft">
              text-secondary
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
