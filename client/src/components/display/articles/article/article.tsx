import Link from "next/link";

interface ArticleProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export const Article: React.FC<ArticleProps> = ({
  title,
  description,
  image,
  href,
}) => {
  return (
    <Link href={href} className="block group">
      <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4 bg-white">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
};
