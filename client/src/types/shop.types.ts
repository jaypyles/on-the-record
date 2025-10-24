export enum ShopItemType {
  CD = "CD",
  VINYL = "Vinyl",
  SHIRT = "Shirt",
}

export type ShopItem = {
  id: string
  title: string;
  price: number;
  artist: string;
  type: ShopItemType;
};
