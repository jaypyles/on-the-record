import { CommonPagination } from "@/components/common";
import { Twillio } from "@/lib/services";
import { trpc } from "@/trpc/client";
import { Article, ArticleType } from "@/types/article.types";
import { TrackingEvents } from "@/types/track.types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ArticlesPageProps = {
  articles: Article[];
  total: number;
};

export const ArticlesPage = ({ articles, total }: ArticlesPageProps) => {
  const pageSize = 6;
  const router = useRouter();
  const { type, query, page } = router.query;

  const [selectedType, setSelectedType] = useState<ArticleType | "All">(
    (type || "All") as ArticleType
  );
  const [searchQuery, setSearchQuery] = useState((query as string) || "");
  const [currentPage, setCurrentPage] = useState(
    parseInt((page as string) || "1")
  );

  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  const { data, isLoading } = trpc.articleRouter.get.useQuery(
    {
      page: currentPage,
      size: pageSize,
      title: debouncedSearch || undefined,
      type: selectedType,
    },
    {
      placeholderData: (
        previousData: { items: Article[]; total: number } | undefined
      ) => previousData || { items: articles, total },
      refetchOnWindowFocus: false,
    }
  );

  const totalPages = Math.ceil((data?.total || total) / pageSize);

  const onClickArticle = (article: Article) => {
    Twillio.segment.track(TrackingEvents.CLICKED_ARTICLE, article);
    router.push(`/articles/${article.id}`);
  };

  const onClickFilter = (filterValue: ArticleType | "All") => {
    setSelectedType(filterValue);
    setCurrentPage(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();

      if (selectedType !== "All") params.set("type", selectedType);
      if (debouncedSearch) params.set("query", debouncedSearch);
      if (currentPage > 1) params.set("page", currentPage.toString());

      router.replace(`/articles?${params.toString()}`, undefined, {
        shallow: true,
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [selectedType, debouncedSearch, currentPage]);

  useEffect(() => {
    if (type) setSelectedType(type as ArticleType);
    else setSelectedType("All");
  }, [type]);

  useEffect(() => {
    const pageFromQuery = parseInt((page as string) || "1");
    setCurrentPage(pageFromQuery);
  }, [page]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 1000);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-8xl text-gray-900 mb-2 font-display">Articles</h1>
          <p className="text-gray-600">
            Stay updated with the latest music news, releases, and industry
            insights.
          </p>
        </div>

        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 text-black rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedType === "All"}
                      onChange={() => onClickFilter("All")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      All Articles
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedType === ArticleType.NEWS}
                      onChange={() => onClickFilter(ArticleType.NEWS)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">News</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedType === ArticleType.RELEASE}
                      onChange={() => onClickFilter(ArticleType.RELEASE)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Releases</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Searching...
                </h3>
                <p className="text-gray-500">
                  Finding articles that match your criteria.
                </p>
              </div>
            ) : data?.items && data.items.length > 0 ? (
              <div className="flex flex-col space-y-6">
                {data.items.map((article: Article) => (
                  <div
                    className="bg-white rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => onClickArticle(article)}
                    key={article.id}
                  >
                    <div className="flex">
                      <div className="w-48 aspect-3/2 shrink-0 relative overflow-hidden bg-gray-200">
                        <img
                          src={`/images/articles/${article.image}`}
                          alt={article.title}
                          className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                          <a
                            href={article.href ?? "#"}
                            className="block truncate"
                          >
                            {article.title}
                          </a>
                        </h3>

                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs uppercase tracking-wider text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded">
                            {article.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            by {article.author} •{" "}
                            {new Date(article.created).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-gray-600 truncate">
                          {article.subTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}

            <div className="mt-4 w-full flex justify-center">
              <CommonPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
