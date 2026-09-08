import { Skeleton } from "@/components/ui";

/** Skeleton loading yang meniru layout detail program. */
export function ProgramDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat program">
      <section className="border-b border-foreground/10 bg-background py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2 sm:mb-8">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-28" />
          </div>
          <Skeleton className="h-9 w-full max-w-md sm:h-11" />
          <div className="mt-4 max-w-2xl space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-10 aspect-[16/10] w-full rounded-rmi sm:aspect-[21/9]" />

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 lg:col-span-8">
              <Skeleton className="mb-4 h-7 w-44" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-rmi bg-heading/10 p-6">
                <Skeleton className="mb-3 h-6 w-40" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="h-10 w-full rounded-full" />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
