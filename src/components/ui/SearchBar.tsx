import React, { useState, useRef, useEffect } from 'react';
import useNavigate from 'next/navigation';
import Icon from '@/components/common/AppIcon';


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'product', label: 'iPhone 15 Pro', category: 'Electronics' },
    { type: 'product', label: 'Samsung Galaxy S24', category: 'Electronics' },
    { type: 'product', label: 'MacBook Air M2', category: 'Computers' },
    { type: 'vendor', label: 'TechStore Pro', type: 'vendor' },
    { type: 'vendor', label: 'Electronics Hub', type: 'vendor' },
    { type: 'category', label: 'Smartphones', type: 'category' },
    { type: 'category', label: 'Laptops', type: 'category' },
  ];

  useEffect(() => {
    if (query?.length > 1) {
      const filtered = mockSuggestions?.filter(item =>
        item?.label?.toLowerCase()?.includes(query?.toLowerCase())
      )?.slice(0, 6);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e?.target?.value);
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
    if (query?.length > 1) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsExpanded(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions?.[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef?.current?.blur();
        break;
    }
  };

  const handleSearch = () => {
    if (query?.trim()) {
      navigate(`/product-listing-category-browse?search=${encodeURIComponent(query?.trim())}`);
      setShowSuggestions(false);
      setIsExpanded(false);
      inputRef?.current?.blur();
      onSearch?.();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion?.type === 'vendor') {
      navigate('/vendor-store-profile');
    } else if (suggestion?.type === 'category') {
      navigate(`/product-listing-category-browse?category=${encodeURIComponent(suggestion?.label)}`);
    } else {
      navigate(`/product-listing-category-browse?search=${encodeURIComponent(suggestion?.label)}`);
    }
    setQuery(suggestion?.label);
    setShowSuggestions(false);
    setIsExpanded(false);
    onSearch?.();
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'vendor':
        return 'Store';
      case 'category':
        return 'Tag';
      default:
        return 'Package';
    }
  };

  return (
    <div className="relative w-full">
      <div className={`relative transition-all duration-200 ${isExpanded ? 'w-full' : 'w-full'}`}>
        <div className="relative">
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder="Search products, vendors, categories..."
            className="w-full pl-10 pr-10 py-2 bg-surface border border-border rounded-lg text-sm placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setShowSuggestions(false);
                inputRef?.current?.focus();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && suggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-modal z-dropdown animate-fade-in">
            <div className="py-2">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={`${suggestion?.type}-${suggestion?.label}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted transition-colors duration-200 ${index === selectedIndex ? 'bg-muted' : ''
                    }`}
                >
                  <Icon
                    name={getSuggestionIcon(suggestion?.type)}
                    size={16}
                    className="text-text-secondary flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text-primary truncate">
                      {suggestion?.label}
                    </div>
                    {suggestion?.category && (
                      <div className="text-xs text-text-secondary">
                        in {suggestion?.category}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-text-secondary capitalize">
                    {suggestion?.type}
                  </div>
                </button>
              ))}
            </div>

            {query?.trim() && (
              <>
                <div className="border-t border-border"></div>
                <button
                  onClick={handleSearch}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted transition-colors duration-200"
                >
                  <Icon name="Search" size={16} className="text-accent flex-shrink-0" />
                  <span className="text-sm text-accent font-medium">
                    Search for "{query}"
                  </span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;