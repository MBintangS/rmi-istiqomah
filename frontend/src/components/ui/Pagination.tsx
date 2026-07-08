import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Paginasi"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-caption rounded-rmi border border-foreground/20 px-3 py-1.5 font-medium text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="sm:hidden">Prev</span>
        <span className="hidden sm:inline">Sebelumnya</span>
      </button>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "text-caption flex h-9 w-9 items-center justify-center rounded-rmi border font-medium transition-colors",
              page === currentPage
                ? "border-primary bg-primary text-white"
                : "border-foreground/20 text-foreground hover:border-primary hover:text-primary",
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-caption rounded-rmi border border-foreground/20 px-3 py-1.5 font-medium text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="sm:hidden">Next</span>
        <span className="hidden sm:inline">Selanjutnya</span>
      </button>
    </nav>
  );
}
