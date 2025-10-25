import { Checkout } from "@/components/display/checkout";
import { useCart } from "@/hooks/use-cart";
import type { CheckoutFormData } from "@/types/checkout.types";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export const CheckoutPage = () => {
  const router = useRouter();
  const { cart, total, onCheckout, clear } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onCheckout();
      setSuccess(true);
      setIsLoading(false);

      setTimeout(async () => {
        await router.push("/");
        clear();
      }, 3000);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-gray-900 font-display">
            Checkout
          </h1>
          <p className="mt-2 text-gray-600">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Checkout.ContactInformation
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <Checkout.ShippingInformation
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <Checkout.PaymentInformation
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>

          <Checkout.OrderSummary
            cart={cart}
            total={total}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            success={success}
          />
        </div>
      </div>
    </div>
  );
};
