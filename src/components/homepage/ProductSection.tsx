import React, { useState, useRef, ReactNode } from "react";
import Link from "next/link";
import ProductCard, { Product } from "./ProductCard";
import Button from "@/components/ui/Button";
import Icon from "@/components/common/AppIcon";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  sectionId?: string;
  children?: ReactNode;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  products = [],
  viewAllLink,
  sectionId,
  children
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
    large: 5,
  } as const;

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < products.length - itemsPerView.mobile;

  const scrollLeft = (): void => {
    if (canScrollLeft) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const scrollRight = (): void => {
    if (canScrollRight) {
      setCurrentIndex((prev) =>
        Math.min(products.length - itemsPerView.mobile, prev + 1)
      );
    }
  };

  const scrollToIndex = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-8 lg:py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-text-secondary">{subtitle}</p>}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous products"
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next products"
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>

          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
              >
                View All
              </Button>
            </Link>
          )}
        </div>
      </div>
      {/* Products Grid/Carousel */}
      <div className="relative">
        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {products?.map((product) => (
              <div
                key={product?.id}
                className="flex-shrink-0 w-48 sm:w-56"
                style={{ scrollSnapAlign: "start" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Mobile Scroll Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({
              length: Math.ceil(products?.length / itemsPerView?.mobile),
            })?.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index * itemsPerView?.mobile)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${Math.floor(currentIndex / itemsPerView?.mobile) === index
                  ? "bg-accent"
                  : "bg-border"
                  }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products?.slice(0, 10)?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
      {/* Mobile View All Button */}
      {viewAllLink && (
        <div className="lg:hidden text-center mt-6">
          <Link href={viewAllLink}>
            <Button
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View All {title}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
