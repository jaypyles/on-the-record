import { publicProcedure } from "@/server/trpc";
import { ServerShopItem, ShopItem, ShopItemType } from "@/types/shop.types";
import { z } from "zod";

export const get = publicProcedure
  .input(
    z.object({
      page: z.number().min(1).optional().default(1),
      size: z.number().min(1).max(100).optional().default(20),
      artist: z.string().optional(),
      type: z.string().optional(),
      price: z.string().optional(),
    })
  )
  .query(async ({ input }) => {
    const { page, size, artist, type, price } = input;

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    if (artist) params.append("artist", artist);
    if (type) params.append("type", type);
    if (price) params.append("price", price);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/artists?${params.toString()}`
    );

    const data: { items: ServerShopItem[]; total: number } = await res.json();

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
      })),
      total: data.total,
    };
  });
