import { CartService } from "@/lib/services";
import type { CartItem } from "@/types/cart.types";
import type { ShopItem } from "@/types/shop.types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextValue {
  cart: CartItem[];
  add: (item: ShopItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: number;
  load: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(CartService.getCart());

  useEffect(() => {
    const unsubscribe = CartService.subscribe((newCart) => {
      setCart([...newCart]);
    });

    return unsubscribe;
  }, []);

  const add = (item: ShopItem, quantity: number = 1) => {
    CartService.addToCart(item, quantity);
  };

  const removeItem = (id: string) => {
    CartService.removeFromCart(id);
  };

  const clear = () => {
    CartService.clearCart();
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const load = (items: CartItem[]) => {
    CartService.loadCart(items);
  };

  return (
    <CartContext.Provider value={{ cart, add, removeItem, clear, total, load }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
