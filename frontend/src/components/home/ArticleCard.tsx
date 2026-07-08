import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui";
import type { Artikel } from "@/types";
import { formatArticleDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Artikel;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const hasThumbnail = Boolean(article.thumbnail);

  return (
    <Link
      href={`/artikel/${article.slug}`}
      className={cn(
        "group block overflow-hidden rounded-rmi bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-primary/10">
        {hasThumbnail ? (
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-caption font-medium text-primary/60">Artikel RMI</span>
          </div>
        )}
      </div>

      <div className="space-y-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="category">{article.category.name}</Badge>
          <time
            className="text-caption text-foreground/60"
            dateTime={article.publishedAt}
          >
            {formatArticleDate(article.publishedAt)}
          </time>
        </div>
        <h3 className="text-lg font-semibold text-heading transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="text-body line-clamp-2 text-foreground/80">{article.excerpt}</p>
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
