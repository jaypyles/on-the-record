import { trpc } from "@/trpc/client";
import { ShopItem } from "@/types/shop.types";
import { useEffect } from "react";
import { ShopItemCard } from "./shop-card";

type ShopProps = {
  artists?: ShopItem[];
  previouslyViewed?: boolean;
};

export const Shop = ({ artists, previouslyViewed }: ShopProps) => {
  // NOTE: this is really odd behavior, its because the old data is cached and then you login
  // so it has old cached data from the guest user, if I had more time I would probably fix this.

  const utils = trpc.useContext();
  const { data } = trpc.artistRouter.recentlyViewed.useQuery(undefined, {
    initialData: {
      items: artists || [],
      total: artists?.length || 0,
      previously_viewed: false,
    },
  });

  useEffect(() => {
    utils.artistRouter.recentlyViewed.invalidate();
  }, [utils]);

  return (
    <section className="min-h-screen flex flex-col items-start mt-32 bg-gray-50 px-8 pb-16">
      <div className="w-full mb-8">
        <h1 className="text-8xl text-black font-display mb-4">SHOP</h1>
        {previouslyViewed && (
          <div className="flex items-center gap-3 mb-6">
            <p className="text-sm uppercase tracking-wider text-indigo-600 font-display">
              Previously viewed
            </p>
            <div className="flex-1 h-px bg-indigo-300"></div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {data?.items?.map((item) => (
          <ShopItemCard key={item.id} item={item} />
        )) || "Loading..."}
      </div>
    </section>
  );
};
