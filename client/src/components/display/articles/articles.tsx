import { Article, ArticleType } from "@/types/article.types";
import { SubFeature } from "../featured/sub-feature";

export const Articles = () => {
  const articleList: Article[] = [
    {
      title: "Top 10 Albums of 2025",
      subTitle: "A curated list of this year's best albums you shouldn’t miss.",
      image: "/images/carousel/carousel-2.jpg",
      created: "10/12/25",
      author: "Jayden Pyles",
      type: ArticleType.NEWS,
      href: "/articles/1",
      genre: "none",
    },
    {
      title: "Rising Stars You Need to Know",
      subTitle: "Discover new artists who are making waves in the music scene.",
      image: "/images/carousel/carousel-3.jpg",
      created: "10/12/25",
      author: "Jayden Pyles",
      type: ArticleType.NEWS,
      href: "/articles/2",
      genre: "none",
    },
    {
      title: "Vinyl Collector's Guide",
      subTitle:
        "Tips for building a vinyl collection that impresses every audiophile.",
      image: "/images/carousel/carousel-4.jpg",
      created: "10/12/25",
      author: "Jayden Pyles",
      type: ArticleType.RELEASE,
      href: "/articles/3",
      genre: "none",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articleList.map((article, index) => (
        <SubFeature key={index} article={article} />
      ))}
    </div>
  );
};
