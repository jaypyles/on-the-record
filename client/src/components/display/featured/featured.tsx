import Image from "next/image";

interface FeaturedProps {
  article: {
    title: string;
    subTitle: string;
    author: string;
    created: string;
  };
}

export const Featured = ({ article }: FeaturedProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 bg-gray-50 p-6 rounded-xl">
      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Featured label + bar */}
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

      {/* Image */}
      <div className="flex-shrink-0">
        <Image
          src="/images/carousel/carousel-1.jpg"
          alt="featured"
          width={400}
          height={400}
          className="rounded-lg object-cover shadow-lg"
        />
      </div>
    </div>
  );
};
