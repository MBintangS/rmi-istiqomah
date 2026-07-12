import { Skeleton } from "@/components/ui";

/** Skeleton loading yang meniru layout detail kegiatan. */
export function KegiatanDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat kegiatan">
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-28" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-9 w-full max-w-xl sm:h-10" />
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-10 overflow-hidden rounded-rmi shadow-soft">
            <Skeleton className="aspect-video w-full sm:aspect-[21/9]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <Skeleton className="mb-4 h-7 w-48" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Skeleton className="h-7 w-36" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <Skeleton key={i} className="aspect-square rounded-rmi" />
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="mb-4 h-7 w-24" />
                <Skeleton className="mb-4 h-4 w-56" />
                <Skeleton className="aspect-video w-full rounded-rmi" />
              </div>
            </div>

            <aside>
              <div className="rounded-rmi border border-foreground/10 bg-surface p-6 shadow-soft">
                <Skeleton className="mb-5 h-6 w-28" />
                <div className="space-y-5">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className={`h-4 ${i === 0 ? "w-40" : "w-28"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
