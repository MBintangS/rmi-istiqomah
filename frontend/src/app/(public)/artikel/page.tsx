import { ArticleList } from "@/components/articles/ArticleList";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getArticleCategories, getPublishedArticles } from "@/lib/articles";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Artikel Islami",
  description: "Artikel dakwah, tips ibadah, dan kajian dari Remaja Masjid Istiqomah.",
  path: "/artikel",
});

export default function ArtikelIndexPage() {
  const articles = getPublishedArticles();
  const categories = getArticleCategories();

  return (
    <>
      <section className="border-b border-foreground/10 bg-surface py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Artikel Islami" },
            ]}
            className="mb-4"
          />
          <h2>Artikel Islami</h2>
          <p className="text-body mt-3 max-w-2xl text-foreground/70">
            Bacaan ringan seputar dakwah, tips ibadah, dan kajian untuk remaja muslim.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ArticleList articles={articles} categories={categories} />
        </div>
      </section>
    </>
  );
}
