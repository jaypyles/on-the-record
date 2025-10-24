import { Article } from "@/types/article.types";
import Image from "next/image";
import Link from "next/link";

interface SubFeatureProps {
  article: Article;
}

export const SubFeature = ({ article }: SubFeatureProps) => {
  return (
    <Link
      href={article.href ?? ""}
      className="flex flex-col bg-gray-50 p-6 rounded-xl max-w-sm relative
  not-first:before:content-[''] not-first:before:absolute not-first:before:top-0 
  not-first:before:left-0 not-first:before:w-px not-first:before:h-full 
  not-first:before:bg-gray-300"
    >
      {/* Featured label + bar */}
      <div className="flex items-center gap-3 mb-4">
        <p className="text-sm uppercase tracking-wider text-indigo-600 font-display">
          {article.type}
        </p>
        <div className="flex-1 h-px bg-indigo-300"></div>
      </div>

      {/* Text Content */}
      <h1 className="text-2xl font-bold text-gray-900 font-sans mb-2">
        {article.title}
      </h1>
      <p className="text-sm text-gray-500 font-sans mb-4">
        by <span className="font-medium">{article.author}</span> |{" "}
        {new Date(article.created).toLocaleDateString()}
      </p>

      {/* Image at bottom */}
      <div className="mt-auto">
        <Image
          src={article.image ?? ""}
          alt="subfeature"
          width={400}
          height={400}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>
    </Link>
  );
};
