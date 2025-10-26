import { useCart as useCartContext } from "@/contexts";
import { trpc } from "@/trpc/client";
import { CartItem } from "@/types/cart.types";
import { ShopItem } from "@/types/shop.types";

export const useCart = () => {
  const { cart, removeItem, total, clear, add, load } = useCartContext();

  const checkoutMutation = trpc.cartRouter.checkout.useMutation();
  const addMutation = trpc.cartRouter.add.useMutation();
  const removeFromCartMutation = trpc.cartRouter.remove.useMutation();
  const clearCartMutation = trpc.cartRouter.clear.useMutation();
  const getCartQuery = trpc.cartRouter.get.useQuery();
  const applyCodeMutation = trpc.cartRouter.verifyCode.useMutation();

  const onRemoveFromCart = (id: string) => {
    removeFromCartMutation.mutate({ id });
    removeItem(id);
  };

  const onClearCart = () => {
    clearCartMutation.mutate();
    clear();
  };

  const onAddToCart = (item: ShopItem) => {
    addMutation.mutate({ id: item.id });
    add(item);
  };

  const loadCart = (items: CartItem[]) => {
    load(items);
  };

  const onCheckout = async (discount_code: string) => {
    return await checkoutMutation.mutateAsync({ discount_code });
  };

  const onVerifyCode = (code: string) => {
    applyCodeMutation.mutate({ discount_code: code });
  };

  const { data: discountCodeData } = applyCodeMutation;

  return {
    onRemoveFromCart,
    onClearCart,
    cart,
    total,
    onAddToCart,
    clear,
    getCartQuery,
    loadCart,
    onCheckout,
    discountCodeData,
    onVerifyCode,
  };
};
