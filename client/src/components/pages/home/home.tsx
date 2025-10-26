import { Articles } from "@/components/display/articles/articles";
import { Featured } from "@/components/display/featured";
import { Shop } from "@/components/display/shop";
import { Article } from "@/types/article.types";
import { ShopItem } from "@/types/shop.types";

interface HomePageProps {
  artists?: ShopItem[];
  articles?: Article[];
  previouslyViewed?: boolean;
}

export const HomePage = ({
  artists,
  articles,
  previouslyViewed,
}: HomePageProps) => {
  const featuredArticle = articles?.[0];
  const subFeatureArticles = articles?.slice(1, 4) || [];

  return (
    <div className="flex flex-col text-black max-w-7xl mx-auto pt-4 gap-4">
      {featuredArticle && <Featured article={featuredArticle} />}
      {subFeatureArticles.length > 0 && (
        <Articles articles={subFeatureArticles} />
      )}

      <Shop artists={artists} previouslyViewed={previouslyViewed} />
    </div>
  );
};
