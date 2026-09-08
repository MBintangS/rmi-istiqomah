import { Skeleton } from "@/components/ui";

/** Skeleton loading yang meniru layout detail artikel. */
export function ArtikelDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat artikel">
      <section className="border-b border-foreground/10 bg-background py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2 sm:mb-8">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-2" />
            <Skeleton className="h-3.5 w-32" />
          </div>
          <Skeleton className="h-9 w-full max-w-2xl sm:h-11" />
          <Skeleton className="mt-4 h-5 w-40" />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </section>

      <article className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-[68ch] px-4 sm:px-6 lg:px-8">
          <Skeleton className="mb-8 aspect-[16/10] w-full rounded-rmi" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/5" />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-foreground/10 pt-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </div>
      </article>
    </div>
  );
}
