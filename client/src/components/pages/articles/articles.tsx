import { Article, ArticleType } from "@/types/article.types";
import { useState } from "react";

export const ArticlesPage = () => {
  const [selectedType, setSelectedType] = useState<ArticleType | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample articles data - in a real app, this would come from an API
  const articleList: Article[] = [
    {
      title: "Top 10 Albums of 2025",
      subTitle: "A curated list of this year's best albums you shouldn't miss.",
      image: "/images/carousel/carousel-2.jpg",
      created: "10/12/25",
      author: "Jayden Pyles",
      type: ArticleType.NEWS,
      href: "/articles/1",
    },
    {
      title: "Rising Stars You Need to Know",
      subTitle: "Discover new artists who are making waves in the music scene.",
      image: "/images/carousel/carousel-3.jpg",
      created: "10/12/25",
      author: "Jayden Pyles",
      type: ArticleType.NEWS,
      href: "/articles/2",
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
    },
    {
      title: "New Album Release: Midnight Dreams",
      subTitle:
        "The latest album from indie sensation Luna Moon is finally here.",
      image: "/images/carousel/carousel-1.jpg",
      created: "10/11/25",
      author: "Sarah Chen",
      type: ArticleType.RELEASE,
      href: "/articles/4",
    },
    {
      title: "Music Industry Trends 2025",
      subTitle:
        "What's shaping the future of music production and distribution.",
      image: "/images/carousel/carousel-5.jpg",
      created: "10/10/25",
      author: "Mike Rodriguez",
      type: ArticleType.NEWS,
      href: "/articles/5",
    },
  ];

  const filteredArticles = articleList.filter((article) => {
    const matchesType = selectedType === "All" || article.type === selectedType;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-8xl text-gray-900 mb-2 font-display">Articles</h1>
          <p className="text-gray-600">
            Stay updated with the latest music news, releases, and industry
            insights.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h3>

              {/* Search */}
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
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
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
                      onChange={() => setSelectedType("All")}
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
                      onChange={() => setSelectedType(ArticleType.NEWS)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">News</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedType === ArticleType.RELEASE}
                      onChange={() => setSelectedType(ArticleType.RELEASE)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Releases</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Articles List */}
          <div className="flex-1">
            {filteredArticles.length > 0 ? (
              <div className="space-y-6">
                {filteredArticles.map((article, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border overflow-hidden"
                  >
                    <div className="flex">
                      {/* Article Image */}
                      <div className="w-48 h-32 shrink-0">
                        <img
                          src={article.image ?? ""}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Article Content */}
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                          <a href={article.href ?? "#"} className="block">
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

                        <p className="text-gray-600 line-clamp-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};
