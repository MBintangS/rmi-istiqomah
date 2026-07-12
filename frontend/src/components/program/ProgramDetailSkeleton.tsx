import { Skeleton } from "@/components/ui";

/** Skeleton loading yang meniru layout detail program. */
export function ProgramDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat program">
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-28" />
          </div>
          <Skeleton className="h-9 w-full max-w-md sm:h-10" />
          <div className="mt-3 max-w-2xl space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-10 overflow-hidden rounded-rmi shadow-soft">
            <Skeleton className="aspect-video w-full sm:aspect-[21/9]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <Skeleton className="mb-4 h-7 w-44" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>
              <Skeleton className="h-4 w-72" />
            </div>

            <aside className="space-y-6">
              <div className="rounded-rmi border border-primary/20 bg-primary/5 p-6">
                <Skeleton className="mb-3 h-6 w-40" />
                <div className="mb-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-10 w-full rounded-rmi" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-2 h-7 w-48" />
          <Skeleton className="mb-6 h-4 w-64" />
          <div className="grid gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex gap-4 rounded-rmi border border-foreground/10 bg-background p-4 sm:p-5"
              >
                <Skeleton className="h-14 w-14 shrink-0 rounded-rmi sm:h-[4.5rem] sm:w-[4.5rem]" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
