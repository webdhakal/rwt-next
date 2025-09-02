import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/AppIcon';

const CartIndicator = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock cart data - in real app this would come from context/state management
  useEffect(() => {
    // Simulate cart count from localStorage or context
    const mockCartCount = 3;
    setCartCount(mockCartCount);
  }, []);

  // Simulate cart count updates
  const handleCartUpdate = (newCount) => {
    setIsAnimating(true);
    setCartCount(newCount);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Link
      href="/shopping-cart"
      className="relative flex items-center space-x-2 p-2 text-text-secondary hover:text-primary transition-colors duration-200 group"
    >
      <div className="relative">
        <Icon
          name="ShoppingCart"
          size={20}
          className="group-hover:scale-105 transition-transform duration-200"
        />

        {/* Cart Count Badge */}
        {cartCount > 0 && (
          <div
            className={`absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-accent text-white text-xs font-medium rounded-full flex items-center justify-center transition-all duration-300 ${isAnimating ? 'scale-125' : 'scale-100'
              }`}
          >
            <span className="leading-none">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          </div>
        )}
      </div>

      {/* Cart Label - Desktop Only */}
      <span className="hidden lg:inline text-sm font-medium">
        Cart
      </span>
    </Link>
  );
};

export default CartIndicator;