import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui";
import type { Artikel } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { formatArticleDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Artikel;
  className?: string;
  /** card = list pages; featured / list = editorial layouts */
  variant?: "card" | "featured" | "list";
}

export function ArticleCard({ article, className, variant = "card" }: ArticleCardProps) {
  const thumbnail = article.thumbnail || PLACEHOLDER_IMAGE;

  if (variant === "featured") {
    return (
      <Link
        href={`/artikel/${article.slug}`}
        className={cn(
          "group grid overflow-hidden rounded-rmi bg-background md:grid-cols-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className,
        )}
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-primary/10 md:aspect-auto md:min-h-[20rem]">
          <Image
            src={thumbnail}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4 border border-foreground/10 border-t-0 p-6 md:border-l-0 md:border-t md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="category">{article.category.name}</Badge>
            <time className="text-caption text-foreground/70" dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-heading transition-colors group-hover:text-primary sm:text-3xl">
            {article.title}
          </h3>
          <p className="text-body line-clamp-3 text-foreground/80">{article.excerpt}</p>
          <span className="text-caption inline-flex items-center font-medium text-primary">
            Baca artikel
            <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <Link
        href={`/artikel/${article.slug}`}
        className={cn(
          "group block border-b border-foreground/10 py-6 transition-colors last:border-b-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className,
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="category">{article.category.name}</Badge>
          <time className="text-caption text-foreground/70" dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt)}
          </time>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-heading transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="text-body mt-2 line-clamp-2 text-foreground/75">{article.excerpt}</p>
        <span className="text-caption mt-3 inline-flex items-center font-medium text-primary">
          Baca artikel
          <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/artikel/${article.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-rmi border border-foreground/10 bg-surface transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-primary/10">
        <Image
          src={thumbnail}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col space-y-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="category">{article.category.name}</Badge>
          <time className="text-caption text-foreground/70" dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt)}
          </time>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug text-heading transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="text-body line-clamp-2 text-foreground/80">{article.excerpt}</p>
        <span className="text-caption mt-auto inline-flex items-center pt-1 font-medium text-primary">
          Baca artikel
          <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
