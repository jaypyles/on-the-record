import { autoForwardProcedure } from "@/server/trpc";
import { ServerShopItem, ShopItem, ShopItemType } from "@/types/shop.types";

export const recentlyViewed = autoForwardProcedure.query(async ({ ctx }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/artists/recently-viewed`,
    {
      headers: {
        ...ctx.forwardHeaders,
        "Content-Type": "application/json",
      },
    }
  );

  const data: {
    items: ServerShopItem[];
    total: number;
    previously_viewed: boolean;
  } = await res.json();

  if (!res.ok) {
    throw new Error((data as any).detail || "Failed to fetch artists");
  }

  return {
    items: data.items.map<ShopItem>((item) => ({
      id: item.id.toString(),
      artist: item.band,
      title: item.title || "",
      price: item.price,
      type: item.item_type as ShopItemType,
      url: item.image_url,
      genre: item.genre || "",
      format: item.format || "",
      image: item.image,
    })),
    total: data.total,
    previously_viewed: data.previously_viewed,
  };
});
