import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { ArticleCard } from "@/components/home/ArticleCard";
import { mockArticles } from "@/data/mock";

const latestArticles = mockArticles
  .filter((article) => article.status === "published")
  .sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  .slice(0, 6);

export function LatestArticlesSection() {
  return (
    <MotionSection className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-caption font-medium text-primary">Berita Terbaru</p>
            <h2>Artikel Islami RMI</h2>
            <p className="text-body mt-2 max-w-xl text-foreground/70">
              Bacaan ringan seputar dakwah, tips ibadah, dan kajian untuk remaja muslim.
            </p>
          </div>
          <Button href="/artikel" variant="outline" size="sm">
            Semua Artikel
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
