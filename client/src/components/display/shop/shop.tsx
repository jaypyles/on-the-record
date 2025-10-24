import { trpc } from "@/trpc/client";
import { ShopItem } from "@/types/shop.types";
import { ShopItemCard } from "./shop-card";

type ShopProps = {
  artists?: ShopItem[];
};

export const Shop = ({ artists }: ShopProps) => {
  const { data } = trpc.artistRouter.get.useQuery(
    {
      page: 1,
      size: 20,
      artist: "",
    },
    {
      initialData: artists,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <section className="min-h-screen flex flex-col items-start mt-32 bg-gray-50 px-8 pb-16">
      <h1 className="text-8xl text-black font-display mb-2">SHOP</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {data?.map((item) => <ShopItemCard key={item.id} item={item} />) ||
          "Loading..."}
      </div>
    </section>
  );
};
