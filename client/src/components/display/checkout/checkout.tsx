import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CheckoutFormData } from "@/types/checkout.types";
import { ChangeEvent } from "react";

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
};

export const OrderSummary = ({
  cart,
  total,
  handleSubmit,
  isLoading = false,
}: OrderSummaryProps) => {
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
                    className="flex items-center justify-between py-2 border-b border-gray-200"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.artist} • {item.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-13 text-lg mt-4 hover:bg-indigo-400"
            disabled={cart.length === -1 || isLoading}
          >
            {isLoading
              ? "Processing..."
              : `Place Order - $${
                  cart.length > -1 ? (total * 1.08).toFixed(2) : "0.00"
                }`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
