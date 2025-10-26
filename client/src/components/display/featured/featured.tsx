import { Article } from "@/types/article.types";
import Image from "next/image";
import Link from "next/link";

type FeaturedProps = {
  article: Article;
};

export const Featured = ({ article }: FeaturedProps) => {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 bg-gray-50 p-6 rounded-xl transition-transform duration-200 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-gray-100"
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <p className="text-sm uppercase tracking-wider text-indigo-600 font-display">
            Featured
          </p>
          <div className="flex-1 h-px bg-indigo-300"></div>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-sans mb-2">
          {article.title}
        </h1>
        <p className="text-lg text-gray-700 font-sans mb-4">
          {article.subTitle}
        </p>
        <p className="text-sm text-gray-500 font-sans">
          by <span className="font-medium">{article.author}</span> |{" "}
          {new Date(article.created).toLocaleDateString()}
        </p>
      </div>

      <div className="shrink-0 w-full lg:w-96">
        <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg bg-gray-200">
          <Image
            src={`/images/articles/${article.image}`}
            alt="featured"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </Link>
  );
};
