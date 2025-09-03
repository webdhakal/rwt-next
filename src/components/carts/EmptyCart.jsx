import React from "react";
import Link from "next/link";
import Icon from "@/components/common/AppIcon";
import Button from "@/components/ui/Button";
import Image from "@/components/common/AppImage";

const EmptyCart = () => {
  const suggestedCategories = [
    {
      name: "Electronics",
      icon: "Smartphone",
      path: "/product-listing-category-browse?category=electronics",
    },
    {
      name: "Fashion",
      icon: "Shirt",
      path: "/product-listing-category-browse?category=fashion",
    },
    {
      name: "Home & Garden",
      icon: "Home",
      path: "/product-listing-category-browse?category=home",
    },
    {
      name: "Sports",
      icon: "Dumbbell",
      path: "/product-listing-category-browse?category=sports",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5,
      vendor: "TechStore Pro",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.8,
      vendor: "FitTech Hub",
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 149.99,
      originalPrice: 179.99,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      rating: 4.6,
      vendor: "Kitchen Essentials",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Empty Cart Illustration */}
      <div className="text-center mb-12">
        <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={64} className="text-text-secondary" />
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Your cart is empty
        </h1>
        <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. Start
          shopping to fill it up!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            iconName="Search"
            iconPosition="left"
            iconSize={18}
            asChild
          >
            <Link href="/product-listing-category-browse">Browse Products</Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            iconName="Home"
            iconPosition="left"
            iconSize={18}
            asChild
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
      {/* Suggested Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-text-primary mb-6 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {suggestedCategories?.map((category) => (
            <Link
              key={category?.name}
              to={category?.path}
              className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-card hover:border-accent transition-all duration-200 group"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                <Icon name={category?.icon} size={24} className="text-accent" />
              </div>
              <h3 className="font-medium text-text-primary group-hover:text-accent transition-colors duration-200">
                {category?.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      {/* Featured Products */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-6 text-center">
          You Might Like These
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts?.map((product) => (
            <div
              key={product?.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card hover:border-accent transition-all duration-200 group"
            >
              <Link href="/product-detail-page" className="block">
                <div className="aspect-square bg-surface overflow-hidden">
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
                    {product?.name}
                  </h3>

                  <p className="text-sm text-text-secondary mb-3">
                    by {product?.vendor}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={
                            i < Math.floor(product?.rating)
                              ? "text-warning fill-current"
                              : "text-border"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-secondary">
                      ({product?.rating})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
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

                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Plus"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
