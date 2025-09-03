import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "@/components/common/AppImage";
import Button from "@/components/ui/Button";
import Icon from "@/components/common/AppIcon";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const bannerData = [
    {
      id: 1,
      title: "Summer Sale Extravaganza",
      subtitle: "Up to 70% off on electronics and gadgets",
      description:
        "Discover amazing deals on smartphones, laptops, and smart home devices from top brands.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ctaText: "Shop Now",
      ctaLink: "/product-listing-category-browse?category=Electronics",
      bgColor: "from-blue-600 to-purple-700",
    },
    {
      id: 2,
      title: "Fashion Forward",
      subtitle: "New arrivals from premium brands",
      description:
        "Explore the latest trends in clothing, accessories, and footwear for every style.",
      image:
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ctaText: "Explore Collection",
      ctaLink: "/product-listing-category-browse?category=Fashion",
      bgColor: "from-pink-500 to-rose-600",
    },
    {
      id: 3,
      title: "Home & Living",
      subtitle: "Transform your space with style",
      description:
        "Find furniture, decor, and home essentials to create your perfect living environment.",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ctaText: "Shop Home",
      ctaLink: "/product-listing-category-browse?category=Home",
      bgColor: "from-green-500 to-teal-600",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, bannerData?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerData?.length) % bannerData?.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] overflow-hidden rounded-lg bg-surface">
      {/* Banner Slides */}
      <div className="relative w-full h-full">
        {bannerData?.map((banner, index) => (
          <div
            key={banner?.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${banner?.bgColor} opacity-90`}
            ></div>
            <Image
              src={banner?.image}
              alt={banner?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">
                  {banner?.title}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-4 opacity-90">
                  {banner?.subtitle}
                </p>
                <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-80 max-w-2xl mx-auto">
                  {banner?.description}
                </p>
                <Link href={banner?.ctaLink}>
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
                  >
                    {banner?.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
        aria-label="Previous slide"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
        aria-label="Next slide"
      >
        <Icon name="ChevronRight" size={20} />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerData?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
              ? "bg-white scale-110"
              : "bg-white/50 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          <Icon name={isAutoPlaying ? "Pause" : "Play"} size={14} />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
