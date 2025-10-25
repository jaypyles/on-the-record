import type { CartItem } from "@/types/cart.types";
import type { ShopItem } from "@/types/shop.types";

const CART_KEY = "local_cart";

let listeners: ((cart: CartItem[]) => void)[] = [];

export function subscribe(cb: (cart: CartItem[]) => void) {
  listeners.push(cb);

  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function notify(cart: CartItem[]) {
  listeners.forEach((cb) => cb(cart));
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notify([...cart]);
}

export function addToCart(item: ShopItem, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }

  saveCart(cart);
}

export function removeFromCart(itemId: string) {
  const cart = getCart().filter((item) => item.id !== itemId);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function loadCart(items: CartItem[]) {
  saveCart(items);
}
