import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/common/AppIcon";
import Button from "@/components/ui/Button";
import Image from "@/components/common/AppImage";

const SavedItems = ({ savedItems, onMoveToCart, onRemoveFromSaved }) => {
  const [movingItems, setMovingItems] = useState(new Set());

  const handleMoveToCart = async (itemId) => {
    setMovingItems((prev) => new Set(prev)?.add(itemId));
    await onMoveToCart(itemId);
    setMovingItems((prev) => {
      const newSet = new Set(prev);
      newSet?.delete(itemId);
      return newSet;
    });
  };

  const handleRemove = (itemId) => {
    onRemoveFromSaved(itemId);
  };

  if (!savedItems || savedItems?.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
          <Icon name="Heart" size={24} className="text-accent" />
          Saved for Later ({savedItems?.length})
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedItems?.map((item) => (
          <div
            key={item?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-200 group"
          >
            <div className="relative">
              <Link href="/product-detail-page" className="block">
                <div className="aspect-square bg-surface overflow-hidden">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </Link>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item?.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text-secondary hover:text-error hover:bg-background transition-all duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="p-4">
              <Link href="/product-detail-page" className="block">
                <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
                  {item?.name}
                </h3>
              </Link>

              <Link
                href="/vendor-store-profile"
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-200 mb-3 inline-block"
              >
                by {item?.vendor}
              </Link>

              {/* Variants */}
              {item?.variants && item?.variants?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item?.variants?.map((variant, index) => (
                    <span
                      key={index}
                      className="text-xs bg-muted text-text-secondary px-2 py-1 rounded-md"
                    >
                      {variant?.name}: {variant?.value}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-text-primary">
                    ${item?.price?.toFixed(2)}
                  </span>
                  {item?.originalPrice && (
                    <span className="text-sm text-text-secondary line-through">
                      ${item?.originalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div
                  className={`text-xs px-2 py-1 rounded-md ${
                    item?.stock > 10
                      ? "bg-success/10 text-success"
                      : item?.stock > 0
                      ? "bg-warning/10 text-warning"
                      : "bg-error/10 text-error"
                  }`}
                >
                  {item?.stock > 10
                    ? "In Stock"
                    : item?.stock > 0
                    ? `${item?.stock} left`
                    : "Out of Stock"}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleMoveToCart(item?.id)}
                  disabled={item?.stock === 0 || movingItems?.has(item?.id)}
                  loading={movingItems?.has(item?.id)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  iconSize={14}
                  className="flex-1"
                >
                  Move to Cart
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemove(item?.id)}
                  iconName="Trash2"
                  iconSize={14}
                  className="text-text-secondary hover:text-error"
                ></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItems;
