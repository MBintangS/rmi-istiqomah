import { Skeleton } from "@/components/ui";

/** Skeleton loading yang meniru layout detail artikel. */
export function ArtikelDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat artikel">
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-32" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="mt-4 h-9 w-full max-w-2xl sm:h-10" />
          <Skeleton className="mt-3 h-5 w-40" />
        </div>
      </section>

      <article className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8 overflow-hidden rounded-rmi shadow-soft">
            <Skeleton className="aspect-video w-full" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-foreground/10 pt-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </article>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-8 h-8 w-44" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-rmi border border-foreground/10 bg-background shadow-soft"
              >
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
