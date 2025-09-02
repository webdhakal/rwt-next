import React, { useState } from "react";
import Link from "next/link";
import Image from "@/components/common/AppImage";
import Button from "@/components/ui/Button";
import Icon from "@/components/common/AppIcon";

const ProductCard = ({ product, showQuickAdd = true }) => {
  const [isWishlisted, setIsWishlisted] = useState(
    product?.isWishlisted || false
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickAdd = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsAddingToCart(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon
          key={i}
          name="Star"
          size={12}
          className="text-yellow-400 fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon
          key="half"
          name="Star"
          size={12}
          className="text-yellow-400 fill-current opacity-50"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon
          key={`empty-${i}`}
          name="Star"
          size={12}
          className="text-gray-300"
        />
      );
    }

    return stars;
  };

  return (
    <div className="group relative bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <Link href="/product-detail-page" className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-surface">
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {product?.isNew && (
              <span className="px-2 py-1 bg-success text-white text-xs font-medium rounded">
                New
              </span>
            )}
            {product?.discount && (
              <span className="px-2 py-1 bg-error text-white text-xs font-medium rounded">
                -{product?.discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Icon
              name="Heart"
              size={16}
              className={`transition-colors duration-200 ${isWishlisted
                ? "text-red-500 fill-current"
                : "text-text-secondary"
                }`}
            />
          </button>

          {/* Quick View Button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
            >
              Quick View
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Vendor */}
          <div className="flex items-center space-x-1 mb-2">
            <Icon name="Store" size={12} className="text-text-secondary" />
            <span className="text-xs text-text-secondary hover:text-accent transition-colors duration-200">
              {product?.vendor}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-text-primary text-sm mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1">
              {renderStars(product?.rating)}
            </div>
            <span className="text-xs text-text-secondary">
              ({product?.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-text-primary">
              ${product?.price?.toFixed(2)}
            </span>
            {product?.originalPrice &&
              product?.originalPrice > product?.price && (
                <span className="text-sm text-text-secondary line-through">
                  ${product?.originalPrice?.toFixed(2)}
                </span>
              )}
          </div>

          {/* Quick Add Button */}
          {showQuickAdd && (
            <Button
              onClick={handleQuickAdd}
              loading={isAddingToCart}
              variant="outline"
              size="sm"
              fullWidth
              iconName="Plus"
              iconPosition="left"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {isAddingToCart ? "Adding..." : "Quick Add"}
            </Button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
