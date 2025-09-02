import React, { useState } from "react";
import { useNavigate } from "next/navigation";
import Icon from "@/components/common/AppIcon";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const OrderSummary = ({
  subtotal,
  tax,
  shipping,
  discount = 0,
  total,
  itemCount,
  onPromoCodeApply,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const navigate = useNavigate();

  const handlePromoSubmit = async (e) => {
    e?.preventDefault();
    if (!promoCode?.trim()) return;

    setIsApplyingPromo(true);
    setPromoError("");
    setPromoSuccess("");

    // Mock promo code validation
    const validPromoCodes = {
      SAVE10: {
        discount: 0.1,
        type: "percentage",
        message: "10% discount applied!",
      },
      FREESHIP: {
        discount: shipping,
        type: "fixed",
        message: "Free shipping applied!",
      },
      WELCOME20: {
        discount: 0.2,
        type: "percentage",
        message: "20% welcome discount applied!",
      },
    };

    setTimeout(() => {
      const promo = validPromoCodes?.[promoCode?.toUpperCase()];
      if (promo) {
        const discountAmount =
          promo?.type === "percentage"
            ? subtotal * promo?.discount
            : promo?.discount;

        onPromoCodeApply(discountAmount, promoCode);
        setPromoSuccess(promo?.message);
        setPromoCode("");
      } else {
        setPromoError("Invalid promo code. Please try again.");
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleCheckout = () => {
    navigate("/checkout-process");
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        Order Summary
      </h2>
      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-medium text-text-primary">
            ${subtotal?.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-success">
            <span>Discount</span>
            <span>-${discount?.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Estimated Tax</span>
          <span className="font-medium text-text-primary">
            ${tax?.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-text-secondary">Shipping</span>
            <Icon name="Info" size={14} className="text-text-secondary" />
          </div>
          <span className="font-medium text-text-primary">
            {shipping === 0 ? "FREE" : `$${shipping?.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-text-primary">
              Total
            </span>
            <span className="text-xl font-bold text-text-primary">
              ${total?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {/* Promo Code Section */}
      <div className="mb-6">
        <form onSubmit={handlePromoSubmit} className="space-y-3">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            error={promoError}
            className="text-sm"
          />

          {promoSuccess && (
            <div className="flex items-center gap-2 text-success text-sm">
              <Icon name="CheckCircle" size={16} />
              <span>{promoSuccess}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="outline"
            size="sm"
            fullWidth
            loading={isApplyingPromo}
            disabled={!promoCode?.trim()}
            iconName="Tag"
            iconPosition="left"
            iconSize={14}
          >
            Apply Promo Code
          </Button>
        </form>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={handleCheckout}
        iconName="CreditCard"
        iconPosition="left"
        iconSize={18}
        className="mb-4"
      >
        Proceed to Checkout
      </Button>
      {/* Security & Policies */}
      <div className="space-y-3 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure checkout with SSL encryption</span>
        </div>

        <div className="flex items-center gap-2">
          <Icon name="RotateCcw" size={16} className="text-accent" />
          <span>30-day return policy</span>
        </div>

        <div className="flex items-center gap-2">
          <Icon name="Truck" size={16} className="text-accent" />
          <span>Free shipping on orders over $50</span>
        </div>
      </div>
      {/* Help Links */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-col gap-2 text-sm">
          <button className="text-accent hover:text-accent/80 transition-colors duration-200 text-left">
            Need help with your order?
          </button>
          <button className="text-accent hover:text-accent/80 transition-colors duration-200 text-left">
            Shipping & Return Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
