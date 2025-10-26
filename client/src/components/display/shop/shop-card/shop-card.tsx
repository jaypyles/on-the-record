import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Twillio } from "@/lib/services";
import { ShopItem, ShopItemType } from "@/types/shop.types";
import { TrackingEvents } from "@/types/track.types";
import Image from "next/image";
import Link from "next/link";

interface ShopItemProps {
  item: ShopItem;
}

export const ShopItemCard = ({ item }: ShopItemProps) => {
  const { onAddToCart } = useCart();

  console.log({ item });

  const onClick = () => {
    Twillio.segment.track(TrackingEvents.CLICKED_SHOP_ITEM, item);
  };

  return (
    <Link
      href={`/shop/${item.id}`}
      onClick={onClick}
      className="flex flex-col bg-gray-50 rounded-xl overflow-hidden max-w-xs relative p-6 shadow-sm border
   cursor-pointer"
    >
      <div className="h-56 w-full bg-gray-100 relative">
        <Image
          src={`/images/items/${item.image}`}
          alt={
            item.type === ShopItemType.VINYL.toLowerCase()
              ? "Vinyl Cover"
              : item.type === ShopItemType.CD.toLowerCase()
              ? "CD Cover"
              : "Shirt Image"
          }
          fill
          style={{ objectFit: "contain" }}
          className="absolute"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.artist}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-bold">
            ${item.price.toFixed(2)}
          </span>
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-medium">
            {item.type}
          </span>
        </div>
      </div>
      <Button
        className="cursor-pointer hover:bg-indigo-400"
        onClick={(e) => {
          e.preventDefault();
          onAddToCart(item);
        }}
      >
        Add to Cart
      </Button>
    </Link>
  );
};
