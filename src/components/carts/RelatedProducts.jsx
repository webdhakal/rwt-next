import React from "react";
import Link from "next/link";
import Icon from "@/components/common/AppIcon";
import Button from "@/components/ui/Button";
import Image from "@/components/common/AppImage";

const RelatedProducts = ({ onAddToCart }) => {
  const relatedProducts = [
    {
      id: 101,
      name: "Wireless Phone Charger",
      price: 29.99,
      originalPrice: 39.99,
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
      rating: 4.3,
      vendor: "TechStore Pro",
      badge: "Best Seller",
    },
    {
      id: 102,
      name: "Bluetooth Speaker",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      rating: 4.7,
      vendor: "AudioTech",
      badge: "New",
    },
    {
      id: 103,
      name: "USB-C Cable Set",
      price: 19.99,
      originalPrice: 24.99,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      rating: 4.5,
      vendor: "Cable Solutions",
    },
    {
      id: 104,
      name: "Phone Stand Holder",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop",
      rating: 4.4,
      vendor: "Desk Accessories",
    },
    {
      id: 105,
      name: "Portable Power Bank",
      price: 34.99,
      originalPrice: 44.99,
      image:
        "https://images.unsplash.com/photo-1609592806596-4d8c4e2b9b9f?w=300&h=300&fit=crop",
      rating: 4.6,
      vendor: "PowerTech",
      badge: "Popular",
    },
  ];

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-text-primary">
          You might also like
        </h2>
        <Link
          to="/product-listing-category-browse"
          className="text-accent hover:text-accent/80 transition-colors duration-200 text-sm font-medium flex items-center gap-1"
        >
          View all
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {relatedProducts?.map((product) => (
          <div
            key={product?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card hover:border-accent transition-all duration-200 group"
          >
            <div className="relative">
              <Link href="/product-detail-page" className="block">
                <div className="aspect-square bg-surface overflow-hidden">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </Link>

              {/* Badge */}
              {product?.badge && (
                <div
                  className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium ${
                    product?.badge === "Best Seller"
                      ? "bg-warning text-white"
                      : product?.badge === "New"
                      ? "bg-success text-white"
                      : product?.badge === "Popular"
                      ? "bg-accent text-white"
                      : "bg-muted text-text-secondary"
                  }`}
                >
                  {product?.badge}
                </div>
              )}
            </div>

            <div className="p-4">
              <Link href="/product-detail-page" className="block">
                <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
                  {product?.name}
                </h3>
              </Link>

              <Link
                href="/vendor-store-profile"
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-200 mb-3 inline-block"
              >
                by {product?.vendor}
              </Link>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={
                        i < Math.floor(product?.rating)
                          ? "text-warning fill-current"
                          : "text-border"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-text-secondary">
                  ({product?.rating})
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-text-primary">
                    ${product?.price}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-sm text-text-secondary line-through">
                      ${product?.originalPrice}
                    </span>
                  )}
                </div>

                {product?.originalPrice && (
                  <span className="text-xs text-success font-medium">
                    Save $
                    {(product?.originalPrice - product?.price)?.toFixed(2)}
                  </span>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleAddToCart(product)}
                iconName="Plus"
                iconPosition="left"
                iconSize={14}
                className="group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-200"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
