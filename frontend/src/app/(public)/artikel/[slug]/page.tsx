import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/home/ArticleCard";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { Badge } from "@/components/ui";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { formatArticleDate } from "@/lib/format-date";
import {
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
} from "@/lib/articles";

interface ArtikelDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ArtikelDetailPageProps): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
  };
}

export default function ArtikelDetailPage({ params }: ArtikelDetailPageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article, 3);
  const articlePath = `/artikel/${article.slug}`;

  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Artikel Islami", href: "/artikel" },
              { label: article.title },
            ]}
            className="mb-4"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="category">{article.category.name}</Badge>
            <time className="text-caption text-foreground/60" dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
          </div>
          <h1 className="mt-3">{article.title}</h1>
          <p className="text-body mt-2 text-foreground/70">Oleh {article.author}</p>
        </div>
      </section>

      <article className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {article.thumbnail && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-rmi shadow-soft">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <p className="text-body mb-8 text-lg text-foreground/80">{article.excerpt}</p>

          <div
            className="text-body space-y-4 text-foreground/80 [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <ShareButtons title={article.title} path={articlePath} className="mt-10 border-t border-foreground/10 pt-6" />
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8">Artikel Terkait</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
