import type { Metadata } from "next";
import { ArticleList } from "@/components/articles/ArticleList";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getArticleCategories, getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel Islami",
  description: "Artikel dakwah, tips ibadah, dan kajian dari Remaja Masjid Istiqomah.",
};

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
          <h1>Artikel Islami</h1>
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
