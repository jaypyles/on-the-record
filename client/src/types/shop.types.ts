export enum ShopItemType {
  CD = "CD",
  VINYL = "Vinyl",
  SHIRT = "Shirt",
}

export type ShopItem = {
  title: string;
  price: number;
  artist: string;
  type: ShopItemType;
};
