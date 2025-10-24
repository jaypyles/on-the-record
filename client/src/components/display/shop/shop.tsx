import { ShopItem, ShopItemType } from "@/types/shop.types";
import { ShopItemCard } from "./shop-card";

export const Shop = () => {
  const items: ShopItem[] = [
    {
      id: "1",
      title: "Blurryface Vinyl",
      artist: "Twenty One Pilots",
      price: 29.99,
      type: ShopItemType.VINYL,
    },
    {
      id: "2",
      title: "Scaled And Icy CD",
      artist: "Twenty One Pilots",
      price: 14.99,
      type: ShopItemType.CD,
    },
    {
      id: "3",
      title: "Electric Tour Tee",
      artist: "DJ Snake",
      price: 24.99,
      type: ShopItemType.SHIRT,
    },
    {
      id: "4",
      title: "Happier Than Ever Vinyl",
      artist: "Billie Eilish",
      price: 32.99,
      type: ShopItemType.VINYL,
    },
    {
      id: "5",
      title: "Dawn FM CD",
      artist: "The Weeknd",
      price: 15.99,
      type: ShopItemType.CD,
    },
    {
      id: "6",
      title: "Justice World Tour Tee",
      artist: "Justin Bieber",
      price: 26.99,
      type: ShopItemType.SHIRT,
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-start mt-32 bg-gray-50 px-8 pb-16">
      <h1 className="text-8xl text-black font-display mb-2">SHOP</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {items.map((item, index) => (
          <ShopItemCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};
