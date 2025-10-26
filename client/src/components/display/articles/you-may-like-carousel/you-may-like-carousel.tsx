import { ShopItemCard } from "@/components/display/shop/shop-card/shop-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ShopItem, ShopItemType } from "@/types/shop.types";

interface Artist {
  id: string;
  band: string;
  title: string;
  item_type: string;
  image_url: string;
  genre: string;
  format: string;
  price: number;
  image: string;
}

interface YouMayLikeCarouselProps {
  artists: Artist[];
}

// Helper function to transform artist data to ShopItem format
const transformArtistToShopItem = (artist: Artist): ShopItem => {
  // Map item_type to ShopItemType enum
  let type: ShopItemType;
  switch (artist.item_type.toLowerCase()) {
    case "cd":
      type = ShopItemType.CD;
      break;
    case "vinyl":
      type = ShopItemType.VINYL;
      break;
    case "shirt":
      type = ShopItemType.SHIRT;
      break;
    default:
      type = ShopItemType.MERCH;
  }

  return {
    id: artist.id,
    artist: artist.band,
    title: artist.title,
    price: artist.price,
    type: type,
    url: `/shop/${artist.id}`,
    genre: artist.genre,
    format: artist.format,
    image: artist.image,
  };
};

export const YouMayLikeCarousel = ({ artists }: YouMayLikeCarouselProps) => {
  if (!artists || artists.length === 0) {
    return null;
  }

  const shopItems = artists.map(transformArtistToShopItem);

  return (
    <div className="mt-12 w-3/4">
      <h2 className="text-3xl font-display text-gray-900 mb-6 text-center">
        YOU MAY LIKE
      </h2>
      <Carousel
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {shopItems.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <div>
                <ShopItemCard item={item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
