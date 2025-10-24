import { Articles } from "@/components/display/articles/articles";
import { Featured } from "@/components/display/featured";
import { Shop } from "@/components/display/shop";
import { Article } from "@/types/article.types";
import { ShopItem } from "@/types/shop.types";

interface HomePageProps {
  artists?: ShopItem[];
}

export const HomePage = ({ artists }: HomePageProps) => {
  const article: Article = {
    title:
      "How The Power Of Manifestation Led Elena Rose To Her Debut Album, 'Bendito Verano'",
    subTitle:
      "The Venezuelan American artist uses the power of words as a driving force.",
    author: "Jayden Pyles",
    created: "10/12/25",
  };

  return (
    <div className="flex flex-col text-black max-w-7xl mx-auto pt-4 gap-4">
      <Featured article={article} />
      <Articles />

      <Shop artists={artists} />
    </div>
  );
};
