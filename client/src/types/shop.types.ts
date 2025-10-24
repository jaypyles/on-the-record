export enum ShopItemType {
  CD = "CD",
  VINYL = "Vinyl",
  SHIRT = "Shirt",
}

export type ShopItem = {
  id: string;
  artist: string;
  title: string;
  price: number;
  type: ShopItemType;
  url: string;
  genre: string;
  format: string;
};

export type ServerShopItem = {
  id: number;
  band: string;
  title?: string;
  price: number;
  item_type: string;
  image_url: string;
  genre?: string;
  format?: string;
};
