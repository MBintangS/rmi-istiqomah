import { Skeleton } from "@/components/ui";

/** Skeleton loading yang meniru layout detail kegiatan. */
export function KegiatanDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat kegiatan">
      <section className="border-b border-foreground/10 bg-background py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2 sm:mb-8">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-28" />
          </div>
          <Skeleton className="h-9 w-full max-w-xl sm:h-11" />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="mt-8 flex max-w-sm items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rotate-45" />
            <Skeleton className="h-px flex-1" />
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-10 aspect-[16/10] w-full rounded-rmi sm:aspect-[21/9]" />

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-8 lg:col-span-8">
              <div>
                <Skeleton className="mb-4 h-7 w-48" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-rmi border border-foreground/10 bg-surface p-6">
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
