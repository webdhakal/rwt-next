import React from 'react';
import Icon from '@/components/common/AppIcon';

const MobileMenuToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-md"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div className="relative w-5 h-5">
        {/* Hamburger Icon */}
        <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}>
          <Icon name="Menu" size={20} />
        </div>

        {/* Close Icon */}
        <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`}>
          <Icon name="X" size={20} />
        </div>
      </div>
    </button>
  );
};

export default MobileMenuToggle;