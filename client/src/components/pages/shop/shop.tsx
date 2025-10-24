import { CommonPagination } from "@/components/common";
import { trpc } from "@/trpc/client";
import { ShopItem as Item, ShopItemType } from "@/types/shop.types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ShopItemCard } from "../../display/shop/shop-card/shop-card";

type ShopPageProps = {
  items: Item[];
  total: number;
};

export const ShopPage = ({ items, total }: ShopPageProps) => {
  const pageSize = 12;
  const router = useRouter();
  const { type, price, page } = router.query;

  const [selectedType, setSelectedType] = useState<ShopItemType | "All">(
    (type || "All") as ShopItemType
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    if (price) {
      const [min, max] = (price as string)
        .split("-")
        .map((v) => parseInt(v, 10));
      return [min, max] as [number, number];
    }
    return [0, 100];
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt((page as string) || "1")
  );

  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [debouncedRange, setDebouncedRange] = useState(priceRange);

  const onFilterClick = (filterValue: ShopItemType | "All") => {
    setSelectedType(filterValue);
    setCurrentPage(1);
  };

  const { data, isLoading } = trpc.artistRouter.get.useQuery(
    {
      page: currentPage,
      size: pageSize,
      artist: debouncedSearch || undefined,
      type: selectedType,
      price: `${debouncedRange[0]}-${debouncedRange[1]}`,
    },
    {
      placeholderData: (previousData) => previousData || { items, total },
      refetchOnWindowFocus: false,
    }
  );

  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 1000);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedRange(priceRange), 1000);
    return () => clearTimeout(handler);
  }, [priceRange]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();

      if (selectedType !== "All") params.set("type", selectedType);
      if (debouncedSearch) params.set("query", debouncedSearch);
      if (debouncedRange)
        params.set("price", `${debouncedRange[0]}-${debouncedRange[1]}`);
      if (currentPage > 1) params.set("page", currentPage.toString());

      router.replace(`/shop?${params.toString()}`, undefined, {
        shallow: true,
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [selectedType, debouncedSearch, priceRange, currentPage]);

  useEffect(() => {
    if (type) setSelectedType(type as ShopItemType);
    else setSelectedType("All");
  }, [type]);

  useEffect(() => {
    const pageFromQuery = parseInt((page as string) || "1");
    setCurrentPage(pageFromQuery);
  }, [page]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-8xl text-gray-900 mb-2 font-display">Shop</h1>
          <p className="text-gray-600">
            Discover music, vinyl, CDs, and exclusive merchandise from your
            favorite artists.
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
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 text-black rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === "All"}
                      onChange={() => onFilterClick("All")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      All Items
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === ShopItemType.CD}
                      onChange={() => onFilterClick(ShopItemType.CD)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">CDs</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === ShopItemType.VINYL}
                      onChange={() => onFilterClick(ShopItemType.VINYL)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Vinyl</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === ShopItemType.MERCH}
                      onChange={() => onFilterClick(ShopItemType.MERCH)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Merchandise
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$0</span>
                    <span>$100+</span>
                  </div>
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
                  Finding items that match your criteria.
                </p>
              </div>
            ) : data?.items && data.items.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.items.map((item) => (
                  <ShopItemCard key={item.id} item={item} />
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No items found
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
