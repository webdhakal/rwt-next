import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/AppIcon';
import SearchBar from './SearchBar';
import CartIndicator from './CartIndicator';
import MobileMenuToggle from './MobileMenuToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Categories', path: '/product-listing-category-browse', icon: 'Grid3X3' },
    { label: 'Vendors', path: '/vendor-store-profile', icon: 'Store' },
    { label: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart' }
  ];

  // const isActivePath = (path) => {
  //   return location?.pathname === path;
  // };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-header bg-background border-b border-border transition-all duration-300 ${isScrolled ? 'h-header-mobile lg:h-header-desktop shadow-card' : 'h-header-mobile lg:h-header-desktop'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
                onClick={closeMobileMenu}
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingBag" size={20} color="white" className="lg:w-6 lg:h-6" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-primary">RWT HUB</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems?.slice(0, 3)?.map((item) => (
                <Link
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-primary hover:bg-muted/50`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              {/* <SearchBar onSearch={() => { }} /> */}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Icon - Mobile */}
              <button className="lg:hidden p-2 text-text-secondary hover:text-primary transition-colors duration-200">
                <Icon name="Search" size={20} />
              </button>

              {/* Cart Indicator */}
              <CartIndicator />

              {/* Account - Desktop */}
              <Link
                href="/account"
                className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-primary hover:bg-muted/50 transition-colors duration-200"
              >
                <Icon name="User" size={18} />
                <span>Account</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden">
                <MobileMenuToggle
                  isOpen={isMobileMenuOpen}
                  onToggle={handleMobileMenuToggle}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-modal bg-black/50 backdrop-blur-subtle">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background shadow-modal animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-lg font-semibold text-primary">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-border">
                <SearchBar onSearch={closeMobileMenu} />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-4">
                <div className="space-y-2">
                  {navigationItems?.map((item) => (
                    <Link
                      key={item?.path}
                      href={item?.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${isActivePath(item?.path)
                        ? 'text-primary bg-muted' : 'text-text-secondary hover:text-primary hover:bg-muted/50'
                        }`}
                    >
                      <Icon name={item?.icon} size={20} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}

                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-text-secondary hover:text-primary hover:bg-muted/50 transition-colors duration-200"
                  >
                    <Icon name="User" size={20} />
                    <span>Account</span>
                  </Link>
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-border">
                <div className="text-xs text-text-secondary text-center">
                  RWT HUB © 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;