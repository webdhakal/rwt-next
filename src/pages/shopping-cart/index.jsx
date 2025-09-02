import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import BreadcrumbNavigation from "@/components/ui/BreadcrumbNavigation";
import CartItem from "@/components/carts/CartItem";
import OrderSummary from "@/components/carts/OrderSummary";
import EmptyCart from "@/components/carts/EmptyCart";
import RelatedProducts from "@/components/carts/RelatedProducts";
import SavedItems from "@/components/carts/SavedItems";
import Icon from "@/components/common/AppIcon";
import Button from "@/components/ui/Button";
import Head from "next/head";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [showUndoRemove, setShowUndoRemove] = useState(null);

  // Mock cart data
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "iPhone 15 Pro Max 256GB - Natural Titanium",
        vendor: "Apple Store Official",
        price: 1199.99,
        originalPrice: 1299.99,
        quantity: 1,
        stock: 15,
        image:
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        variants: [
          { name: "Color", value: "Natural Titanium" },
          { name: "Storage", value: "256GB" },
        ],
        deliveryInfo: "Free delivery by Dec 30",
      },
      {
        id: 2,
        name: "AirPods Pro (2nd Generation) with MagSafe Case",
        vendor: "Apple Store Official",
        price: 249.99,
        quantity: 2,
        stock: 8,
        image:
          "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
        variants: [{ name: "Color", value: "White" }],
        deliveryInfo: "Free delivery by Dec 28",
      },
      {
        id: 3,
        name: "MacBook Air 13-inch M2 Chip - Midnight",
        vendor: "TechStore Pro",
        price: 1099.99,
        originalPrice: 1199.99,
        quantity: 1,
        stock: 3,
        image:
          "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
        variants: [
          { name: "Color", value: "Midnight" },
          { name: "Memory", value: "8GB" },
          { name: "Storage", value: "256GB SSD" },
        ],
        deliveryInfo: "Free delivery by Jan 2",
      },
    ];

    const mockSavedItems = [
      {
        id: 4,
        name: "iPad Pro 12.9-inch M2 Chip",
        vendor: "Apple Store Official",
        price: 1099.99,
        originalPrice: 1199.99,
        stock: 12,
        image:
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        variants: [
          { name: "Color", value: "Space Gray" },
          { name: "Storage", value: "128GB" },
        ],
      },
      {
        id: 5,
        name: "Apple Watch Series 9 GPS",
        vendor: "WearTech Hub",
        price: 399.99,
        stock: 0,
        image:
          "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
        variants: [
          { name: "Size", value: "45mm" },
          { name: "Color", value: "Midnight" },
        ],
      },
    ];

    setCartItems(mockCartItems);
    setSavedItems(mockSavedItems);
  }, []);

  // Calculate totals
  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item?.price * item?.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping - discount;
  const itemCount = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((items) =>
      items?.map((item) =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    const itemToRemove = cartItems?.find((item) => item?.id === itemId);
    setCartItems((items) => items?.filter((item) => item?.id !== itemId));

    // Show undo option
    setShowUndoRemove({
      item: itemToRemove,
      timeout: setTimeout(() => setShowUndoRemove(null), 5000),
    });
  };

  const handleUndoRemove = () => {
    if (showUndoRemove) {
      setCartItems((items) => [...items, showUndoRemove?.item]);
      clearTimeout(showUndoRemove?.timeout);
      setShowUndoRemove(null);
    }
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems?.find((item) => item?.id === itemId);
    if (itemToSave) {
      setCartItems((items) => items?.filter((item) => item?.id !== itemId));
      setSavedItems((items) => [...items, { ...itemToSave, quantity: 1 }]);
    }
  };

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedItems?.find((item) => item?.id === itemId);
    if (itemToMove && itemToMove?.stock > 0) {
      setSavedItems((items) => items?.filter((item) => item?.id !== itemId));
      setCartItems((items) => [...items, { ...itemToMove, quantity: 1 }]);
    }
  };

  const handleRemoveFromSaved = (itemId) => {
    setSavedItems((items) => items?.filter((item) => item?.id !== itemId));
  };

  const handlePromoCodeApply = (discountAmount, promoCode) => {
    setDiscount(discountAmount);
    setAppliedPromoCode(promoCode);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems?.find((item) => item?.id === product?.id);
    if (existingItem) {
      handleQuantityChange(product?.id, existingItem?.quantity + 1);
    } else {
      setCartItems((items) => [
        ...items,
        { ...product, quantity: 1, stock: 10 },
      ]);
    }
  };

  const breadcrumbs = [
    { label: "Home", path: "/homepage" },
    { label: "Shopping Cart", path: "/shopping-cart" },
  ];

  if (cartItems?.length === 0 && !showUndoRemove) {
    return (
      <>
        <Head>
          <title>Shopping Cart - EcommerceHub</title>
          <meta
            name="description"
            content="Review and manage your selected items before checkout. Secure shopping cart with easy quantity adjustments and promo code support."
          />
          <meta
            name="keywords"
            content="shopping cart, checkout, ecommerce, online shopping, cart management"
          />
        </Head>

        <div className="min-h-screen bg-background">
          <Header />
          <EmptyCart />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"}) -
          EcommerceHub
        </title>
        <meta
          name="description"
          content={`Review your ${itemCount} selected items totaling $${total?.toFixed(
            2
          )}. Secure checkout with multiple payment options and free shipping available.`}
        />
        <meta
          name="keywords"
          content="shopping cart, checkout, ecommerce, online shopping, cart management, secure payment"
        />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Shopping Cart
              </h1>
              <p className="text-text-secondary">
                {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            {cartItems?.length > 0 && (
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => window.location?.reload()}
                >
                  Refresh Cart
                </Button>
              </div>
            )}
          </div>

          {/* Undo Remove Notification */}
          {showUndoRemove && (
            <div className="mb-6 p-4 bg-muted border border-border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Trash2" size={20} className="text-text-secondary" />
                <span className="text-text-primary">
                  "{showUndoRemove?.item?.name}" removed from cart
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleUndoRemove}
                iconName="Undo"
                iconPosition="left"
                iconSize={14}
              >
                Undo
              </Button>
            </div>
          )}

          {/* Cart Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems?.map((item) => (
                  <CartItem
                    key={item?.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    onSaveForLater={handleSaveForLater}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                discount={discount}
                total={total}
                itemCount={itemCount}
                onPromoCodeApply={handlePromoCodeApply}
              />
            </div>
          </div>

          {/* Saved Items */}
          <SavedItems
            savedItems={savedItems}
            onMoveToCart={handleMoveToCart}
            onRemoveFromSaved={handleRemoveFromSaved}
          />

          {/* Related Products */}
          <RelatedProducts onAddToCart={handleAddToCart} />
        </main>
      </div>
    </>
  );
};

export default ShoppingCart;
