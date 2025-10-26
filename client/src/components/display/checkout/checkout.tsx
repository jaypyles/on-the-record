import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CheckoutFormData } from "@/types/checkout.types";
import { ChangeEvent, useEffect, useState } from "react";

type ContactInformationProps = {
  formData: CheckoutFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ContactInformation = ({
  formData,
  handleInputChange,
}: ContactInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-display font-normal">
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email" className="mb-2">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

type ShippingInformationProps = {
  formData: CheckoutFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ShippingInformation = ({
  formData,
  handleInputChange,
}: ShippingInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal font-display text-3xl">
          Shipping Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="mb-2">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="mb-2">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address" className="mb-2">
            Address
          </Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="123 Main St"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city" className="mb-2">
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="New York"
              required
            />
          </div>
          <div>
            <Label htmlFor="state" className="mb-2">
              State
            </Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="NY"
              required
            />
          </div>
          <div>
            <Label htmlFor="zipCode" className="mb-2">
              ZIP Code
            </Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="10001"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="country" className="mb-2">
            Country
          </Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="United States"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

type PaymentInformationProps = {
  formData: CheckoutFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PaymentInformation = ({
  formData,
  handleInputChange,
}: PaymentInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal font-display text-3xl">
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="cardNumber" className="mb-2">
            Card Number
          </Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div>
          <Label htmlFor="nameOnCard" className="mb-2">
            Name on Card
          </Label>
          <Input
            id="nameOnCard"
            name="nameOnCard"
            value={formData.nameOnCard}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate" className="mb-2">
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type OrderSummaryProps = {
  cart: any[];
  total: number;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  success: boolean;
  children?: React.ReactNode;
  discount?: number;
  discountApplied: boolean;
  error: string;
};

export const OrderSummary = ({
  cart,
  total,
  handleSubmit,
  isLoading = false,
  success = false,
  children,
  discount,
  discountApplied,
  error,
}: OrderSummaryProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const fullTotal =
    discount && discountApplied ? discount * 1.08 : total * 1.08;

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal font-display text-3xl">
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <Button
              className="w-full h-13 text-lg mt-4 hover:bg-indigo-400"
              disabled
            >
              Loading...
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-normal font-display text-3xl">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Your cart is empty
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-4 border-b border-gray-200"
                  >
                    {/* Item image */}
                    <div className="w-24 h-24 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={`/images/items/${item.image}`}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* Item details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.artist} • {item.type}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <div className="mt-2 text-right">
                        <p className="text-lg font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {children}

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    {discount && discountApplied ? (
                      <div className="flex gap-2">
                        <span className="line-through">
                          ${total.toFixed(2)}
                        </span>
                        <span className="text-green-400">
                          ${discount.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span>${total.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>
                      $
                      {(
                        (discount && discountApplied ? discount : total) * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total</span>
                    <div className="flex justify-between text-sm">
                      {discount && discountApplied ? (
                        <div className="flex gap-2">
                          <span className="line-through">
                            ${total.toFixed(2)}
                          </span>
                          <span className="text-green-400">
                            ${fullTotal.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span>${fullTotal.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-13 text-lg mt-4 hover:bg-indigo-400"
            disabled={cart.length === 0 || isLoading}
          >
            {isLoading
              ? "Processing..."
              : success
              ? "Checkout was successful. Sending you back home."
              : error && !discountApplied
              ? error
              : `Place Order - $${
                  cart.length > 0 ? fullTotal.toFixed(2) : "0.00"
                }`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

type DiscountCodeInputProps = {
  formData: CheckoutFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onApplyCode: () => void;
  onBlurInput: () => void;
  error?: string;
};

export const DiscountCodeInput = ({
  formData,
  handleInputChange,
  onApplyCode,
  error,
  onBlurInput,
}: DiscountCodeInputProps) => {
  return (
    <div>
      <Label htmlFor="discountCode" className="mb-2">
        Discount Code
      </Label>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-full">
          <Input
            id="discountCode"
            name="discountCode"
            value={formData.discountCode}
            onChange={handleInputChange}
            placeholder="AB34FF"
            maxLength={6}
            minLength={6}
            required
            onBlur={onBlurInput}
          />

          {formData.discountCode && error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
        <Button onClick={onApplyCode}>Apply</Button>
      </div>
    </div>
  );
};
