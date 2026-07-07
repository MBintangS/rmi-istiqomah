export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6">
      <h1 className="text-primary">RMI</h1>
      <p className="text-body text-center text-foreground/80">
        Remaja Masjid Istiqomah
      </p>
      <a
        href="/design-system"
        className="text-button text-secondary underline-offset-4 hover:underline"
      >
        Lihat Design System →
      </a>
    </main>
  );
}
