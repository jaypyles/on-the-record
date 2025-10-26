import { Article } from "@/types/article.types";

interface ArticlePageProps {
  article: Article;
}

export const ArticlePage = ({ article }: ArticlePageProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-4 font-display">
            {article.title}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">{article.subTitle}</h2>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <span>By {article.author}</span>
            <span>{new Date(article.created).toLocaleDateString()}</span>
          </div>
          {article.image && (
            <img
              src={`/images/articles/${article.image}`}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
        </header>

        <div className="prose prose-lg max-w-none text-black text-lg">
          {article.content
            .replace(/^[“"'](.*)[”"']$/, "$1")
            .replace(/^"(.*)"$/, "$1")
            .replace(/""/g, '"')
            .replace(/\\n/g, "\n")
            .split("\n\n")
            .map((paragraph, idx) => {
              const html = paragraph.replace(/\*(.*?)\*/g, "<b>$1</b>");
              return (
                <p
                  key={idx}
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            })}
        </div>

        <footer className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-indigo-600">
            <span className="px-2 py-1 bg-gray-100 rounded-full capitalize">
              {article.type?.toLowerCase()}
            </span>
            {article.genre && (
              <span className="px-2 py-1 bg-gray-100 rounded-full">
                {article.genre}
              </span>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
};
