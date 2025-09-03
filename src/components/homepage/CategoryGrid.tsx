import Link from "next/link";
import React from "react";
import Image from "@/components/common/AppImage";
import Icon, { IconProps } from "@/components/common/AppIcon";

interface CategoryItem {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: IconProps['name'];
  productCount: string;
  color: string;
}

const CategoryGrid: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      id: 1,
      name: "Electronics",
      description: "Smartphones, laptops & gadgets",
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Smartphone",
      productCount: "2,500+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Clothing, shoes & accessories",
      image:
        "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Shirt",
      productCount: "3,200+",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 3,
      name: "Home & Garden",
      description: "Furniture, decor & tools",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Home",
      productCount: "1,800+",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "Sports & Fitness",
      description: "Equipment & activewear",
      image:
        "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Dumbbell",
      productCount: "950+",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      name: "Books & Media",
      description: "Books, movies & music",
      image:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Book",
      productCount: "4,100+",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: 6,
      name: "Health & Beauty",
      description: "Skincare, makeup & wellness",
      image:
        "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Heart",
      productCount: "1,600+",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <section className="py-8 lg:py-12">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
          Shop by Category
        </h2>
        <p className="text-text-secondary">
          Discover products across our most popular categories
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {categories?.map((category) => (
          <Link
            key={category?.id}
            href={`/product-listing-category-browse?category=${encodeURIComponent(
              category?.name
            )}`}
            className="group block"
          >
            <div className="relative overflow-hidden rounded-lg bg-surface border border-border hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              {/* Category Image */}
              <div className="relative h-32 sm:h-40 lg:h-32 overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category?.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                ></div>

                {/* Icon Overlay */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Icon
                    name={category?.icon}
                    size={16}
                    className="text-primary"
                  />
                </div>
              </div>

              {/* Category Info */}
              <div className="p-3 lg:p-4">
                <h3 className="font-semibold text-text-primary text-sm lg:text-base mb-1 group-hover:text-accent transition-colors duration-200">
                  {category?.name}
                </h3>
                <p className="text-xs lg:text-sm text-text-secondary mb-2 line-clamp-2">
                  {category?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-accent font-medium">
                    {category?.productCount} items
                  </span>
                  <Icon
                    name="ArrowRight"
                    size={14}
                    className="text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* View All Categories Link */}
      <div className="text-center mt-8">
        <Link
          href="/product-listing-category-browse"
          className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors duration-200"
        >
          <span>View All Categories</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
