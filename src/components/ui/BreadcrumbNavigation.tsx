import React from "react";
import Link from "next/navigation";
import Icon from "@/components/common/AppIcon";

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Default breadcrumb mapping based on routes
  const routeBreadcrumbs = {
    "/": [{ label: "Home", path: "/" }],
    "/product-listing-category-browse": [
      { label: "Home", path: "/" },
      { label: "Categories", path: "/product-listing-category-browse" },
    ],
    "/product-detail-page": [
      { label: "Home", path: "/" },
      { label: "Categories", path: "/product-listing-category-browse" },
      { label: "Product Details", path: "/product-detail-page" },
    ],
    "/vendor-store-profile": [
      { label: "Home", path: "/" },
      { label: "Vendors", path: "/vendor-store-profile" },
    ],
    "/shopping-cart": [
      { label: "Home", path: "/" },
      { label: "Shopping Cart", path: "/shopping-cart" },
    ],
    "/checkout-process": [
      { label: "Home", path: "/" },
      { label: "Cart", path: "/shopping-cart" },
      { label: "Checkout", path: "/checkout-process" },
    ],
  };

  // Use custom breadcrumbs if provided, otherwise use route-based breadcrumbs
  const breadcrumbs =
    customBreadcrumbs || routeBreadcrumbs?.[location?.pathname] || [];

  // Don't render breadcrumbs if there's only one item (current page) or none
  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav
      className="flex items-center space-x-1 text-sm text-text-secondary mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          const isClickable = breadcrumb?.path && !isLast;

          return (
            <li
              key={breadcrumb?.path || breadcrumb?.label}
              className="flex items-center"
            >
              {index > 0 && (
                <Icon
                  name="ChevronRight"
                  size={14}
                  className="mx-2 text-text-secondary/60 flex-shrink-0"
                />
              )}
              {isClickable ? (
                <Link
                  to={breadcrumb?.path}
                  className="hover:text-primary transition-colors duration-200 truncate max-w-[150px] sm:max-w-none"
                  title={breadcrumb?.label}
                >
                  {breadcrumb?.label}
                </Link>
              ) : (
                <span
                  className={`truncate max-w-[150px] sm:max-w-none ${isLast
                    ? "text-text-primary font-medium"
                    : "text-text-secondary"
                    }`}
                  title={breadcrumb?.label}
                >
                  {breadcrumb?.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;
