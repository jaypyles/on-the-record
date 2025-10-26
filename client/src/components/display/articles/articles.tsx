import { Article, ArticleType } from "@/types/article.types";
import { SubFeature } from "../featured/sub-feature";

interface ArticlesProps {
  articles?: Article[];
}

export const Articles = ({ articles }: ArticlesProps) => {
  const fallbackArticles: Article[] = [
    {
      id: "1",
      title: "Top 10 Albums of 2025",
      subTitle: "A curated list of this year's best albums you shouldn't miss.",
      image: "/images/carousel/carousel-2.jpg",
      created: "10/12/25",
      author: "Jayden Pyles",
      type: ArticleType.NEWS,
      href: "/articles/1",
      genre: "none",
      content: "This is a sample article content.",
    },
    {
      id: "2",
      title: "Rising Stars You Need to Know",
      subTitle: "Discover new artists who are making waves in the music scene.",
      image: "/images/carousel/carousel-3.jpg",
      created: "10/12/25",
      author: "Jayden Pyles",
      type: ArticleType.NEWS,
      href: "/articles/2",
      genre: "none",
      content: "This is a sample article content.",
    },
    {
      id: "3",
      title: "Vinyl Collector's Guide",
      subTitle:
        "Tips for building a vinyl collection that impresses every audiophile.",
      image: "/images/carousel/carousel-4.jpg",
      created: "10/12/25",
      author: "Jayden Pyles",
      type: ArticleType.RELEASE,
      href: "/articles/3",
      genre: "none",
      content: "This is a sample article content.",
    },
  ];

  const articleList =
    articles && articles.length > 0 ? articles : fallbackArticles;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articleList.map((article, index) => (
        <SubFeature key={index} article={article} />
      ))}
    </div>
  );
};
