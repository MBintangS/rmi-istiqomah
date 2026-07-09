import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";
import { ArticleCard } from "@/components/home/ArticleCard";
import { mockArticles } from "@/data/mock";

const latestArticles = mockArticles
  .filter((article) => article.status === "published")
  .sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  .slice(0, 4);

export function LatestArticlesSection() {
  const [featured, ...rest] = latestArticles;

  return (
    <MotionSection tone="slide" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h2>Artikel Islami RMI</h2>
          <p className="text-body mt-4 text-foreground/70">
            Bacaan ringan seputar dakwah, tips ibadah, dan kajian untuk remaja muslim.
          </p>
          <div className="mt-6">
            <Button href="/artikel" variant="outline" size="sm">
              Semua Artikel
            </Button>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {featured && (
            <div className="lg:col-span-7">
              <ArticleCard article={featured} variant="featured" />
            </div>
          )}
          <div className="space-y-1 lg:col-span-5">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} variant="list" />
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
