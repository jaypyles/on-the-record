import { Twillio } from "@/lib/services";
import { ShopItem, ShopItemType } from "@/types/shop.types";
import { TrackingEvents } from "@/types/track.types";
import Link from "next/link";

interface ShopItemProps {
  item: ShopItem;
}

export const ShopItemCard = ({ item }: ShopItemProps) => {
  const onClick = () => {
    Twillio.segment.track(TrackingEvents.CLICKED_SHOP_ITEM, item);
  };

  return (
    <Link
      href={`/shop/${item.id}`}
      onClick={onClick}
      className="flex flex-col bg-gray-50 rounded-xl overflow-hidden max-w-xs relative p-6
   cursor-pointer"
    >
      <div className="h-56 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        {item.type === ShopItemType.VINYL
          ? "Vinyl Cover"
          : item.type === ShopItemType.CD
          ? "CD Cover"
          : "Shirt Image"}
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
    </Link>
  );
};
