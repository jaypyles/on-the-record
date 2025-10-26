import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export function CartButton() {
  const { cart, total, onClearCart, onRemoveFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const handleCheckoutClick = async () => {
    router.push("/checkout");
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative inline-block">
      <Button variant="ghost" onClick={() => setOpen(!open)}>
        🛒 {cart.length} {cart.length === 1 ? "item" : "items"}
      </Button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-1.5 w-80 bg-white border rounded shadow-lg z-50 p-4"
        >
          {cart.length === 0 ? (
            <p className="text-center py-4 text-black">Your cart is empty</p>
          ) : (
            <div>
              <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto no-scrollbar">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <div>
                      <p className="font-medium text-black">{item.title}</p>
                      <p className="text-sm text-black">{item.artist}</p>
                      <p className="text-sm text-black">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex flex-col items-end text-black">
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        className="text-red-500 text-xs mt-1"
                        onClick={() => onRemoveFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-between font-semibold">
                <span className="text-black">Total:</span>
                <span className="text-black">${total.toFixed(2)}</span>
              </div>

              <div className="mt-4 flex justify-between">
                <Button size="sm" onClick={onClearCart}>
                  Clear
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleCheckoutClick}
                >
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
