import { ShopItem } from "./shop.types";

export type CartItem = ShopItem & { quantity: number };
