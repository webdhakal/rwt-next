import React, { useState } from "react";
import Link from "next/link";
import Image from "@/components/common/AppImage";
import Icon, { IconProps } from "@/components/common/AppIcon";
import { Button } from "@/shadcn/ui/button";

interface Vendor {
  id: number;
  name: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  categories: string[];
  isVerified: boolean;
  joinedYear: number;
}

const VendorSpotlight: React.FC = () => {
  const [currentVendorIndex, setCurrentVendorIndex] = useState<number>(0);
  const featuredVendors: Vendor[] = [
    {
      id: 1,
      name: "TechHub Electronics",
      description:
        "Premium electronics and gadgets with 5+ years of excellence in customer service and quality products.",
      logo: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      banner:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
      rating: 4.8,
      reviewCount: 2847,
      productCount: 1250,
      categories: ["Electronics", "Gadgets", "Accessories"],
      isVerified: true,
      joinedYear: 2019,
    },
    {
      id: 2,
      name: "Fashion Forward",
      description:
        "Trendy clothing and accessories for the modern lifestyle. Curated collections from emerging designers.",
      logo: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      banner:
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
      rating: 4.6,
      reviewCount: 1923,
      productCount: 890,
      categories: ["Fashion", "Accessories", "Shoes"],
      isVerified: true,
      joinedYear: 2020,
    },
    {
      id: 3,
      name: "Home Essentials Co.",
      description:
        "Transform your living space with our carefully selected home decor, furniture, and lifestyle products.",
      logo: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
      banner:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1",
      rating: 4.7,
      reviewCount: 1456,
      productCount: 675,
      categories: ["Home", "Furniture", "Decor"],
      isVerified: true,
      joinedYear: 2018,
    },
  ];

  const nextVendor = (): void => {
    setCurrentVendorIndex((prev) =>
      prev === featuredVendors.length - 1 ? 0 : prev + 1
    );
  };

  const prevVendor = (): void => {
    setCurrentVendorIndex((prev) =>
      prev === 0 ? featuredVendors.length - 1 : prev - 1
    );
  };

  const currentVendor = featuredVendors[currentVendorIndex];

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={14}
          className="text-yellow-400 fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon
          key="half"
          name="Star"
          size={14}
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
          size={14}
          className="text-gray-300"
        />
      );
    }

    return stars;
  };

  return (
    <section className="py-8 lg:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
            Featured Vendors
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Discover trusted sellers who consistently deliver quality products
            and exceptional customer service
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredVendors?.map((vendor) => (
            <div
              key={vendor?.id}
              className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Vendor Banner */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={vendor?.banner}
                  alt={`${vendor?.name} banner`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Verified Badge */}
                {vendor?.isVerified && (
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
                    <Icon name="CheckCircle" size={12} />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Vendor Info */}
              <div className="p-6">
                {/* Logo and Basic Info */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative -mt-8">
                    <div className="w-16 h-16 rounded-full border-4 border-background overflow-hidden bg-surface">
                      <Image
                        src={vendor?.logo}
                        alt={`${vendor?.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-text-primary text-lg mb-1 truncate">
                      {vendor?.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(vendor?.rating)}
                      </div>
                      <span className="text-sm text-text-secondary">
                        {vendor?.rating} ({vendor?.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                  {vendor?.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-surface rounded">
                    <div className="font-semibold text-text-primary">
                      {vendor?.productCount?.toLocaleString()}
                    </div>
                    <div className="text-xs text-text-secondary">Products</div>
                  </div>
                  <div className="text-center p-2 bg-surface rounded">
                    <div className="font-semibold text-text-primary">
                      {new Date()?.getFullYear() - vendor?.joinedYear}+ years
                    </div>
                    <div className="text-xs text-text-secondary">
                      Experience
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {vendor?.categories?.slice(0, 3)?.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link href="/vendor-store-profile">
                  <Button
                    variant="outline"
                    size="lg"
                    icon="Store"
                    iconPosition="left"
                    className="group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-200"
                  >
                    Visit Store
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Vendors */}
        <div className="text-center mt-8 lg:mt-12">
          <Link href="/vendor-store-profile">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Explore All Vendors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VendorSpotlight;
