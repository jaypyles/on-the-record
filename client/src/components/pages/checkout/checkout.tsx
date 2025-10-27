import { Checkout } from "@/components/display/checkout";
import { NewlyRegisteredModal } from "@/components/display/modals";
import { useCart } from "@/hooks/use-cart";
import type { CheckoutFormData } from "@/types/checkout.types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export const CheckoutPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const { cart, total, onCheckout, clear, discountCodeData, onVerifyCode } =
    useCart();
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
    discountCode: "",
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [discountCodeError, setDiscountCodeError] = useState<string>("");
  const [discountCodeTotal, setDiscountCodeTotal] = useState<number>(0);
  const [checkoutError, setCheckoutError] = useState<string>("");
  const [showNewlyRegisteredModal, setShowNewlyRegisteredModal] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyDiscountCode = () => {
    onVerifyCode(formData.discountCode);
  };

  const onBlurDiscountCode = () => {
    setDiscountCodeError("");
  };

  const handleSignUp = () => {
    setShowNewlyRegisteredModal(false);
    router.push("/login?new_register=true");
  };

  const handleContinueAsGuest = () => {
    setShowNewlyRegisteredModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onCheckout(formData.discountCode);
      setSuccess(true);
      setIsLoading(false);

      setTimeout(async () => {
        await router.push("/");
        clear();
      }, 3000);
    } catch (err: any) {
      console.error(err);
      setCheckoutError(err.message || "Something went wrong.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (discountCodeData && !discountCodeData.valid) {
      setDiscountCodeError(discountCodeData.message);
    }

    if (discountCodeData && discountCodeData.valid) {
      setDiscountCodeTotal(discountCodeData.discounted_total);
    }
  }, [discountCodeData]);

  useEffect(() => {
    if (status === "unauthenticated" && cart.length > 0) {
      const timer = setTimeout(() => {
        setShowNewlyRegisteredModal(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status, cart.length]);

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
            error={checkoutError}
            cart={cart}
            total={total}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            success={success}
            discount={discountCodeTotal}
            discountApplied={Boolean(
              discountCodeTotal &&
                discountCodeData &&
                discountCodeData.discount_code &&
                discountCodeData.discount_code === formData.discountCode
            )}
          >
            <Checkout.DiscountCodeInput
              formData={formData}
              handleInputChange={handleInputChange}
              onApplyCode={handleApplyDiscountCode}
              error={discountCodeError}
              onBlurInput={onBlurDiscountCode}
            />
          </Checkout.OrderSummary>
        </div>
      </div>

      <NewlyRegisteredModal
        isOpen={showNewlyRegisteredModal}
        onClose={handleContinueAsGuest}
        onSignUp={handleSignUp}
      />
    </div>
  );
};
