import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../config/categories';
import CategoryIcon from './CategoryIcon';
import useCartStore from '../../store/cartStore';

const CategoryStrip = ({ categoryFilter, onSelect }) => {
  const navigate = useNavigate();
  const { setSearchQuery } = useCartStore();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const isSelected = (filter) => {
    if (filter === '') return !categoryFilter;
    return categoryFilter === filter;
  };

  const handleMouseEnter = useCallback((filter) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (filter === '') { setHoveredCategory(null); return; }
    hoverTimeoutRef.current = setTimeout(() => setHoveredCategory(filter), 150);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setHoveredCategory(null), 200);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredCategory(null), 150);
  }, []);

  useEffect(() => () => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); }, []);

  const handleCategoryClick = (filter) => onSelect(filter);

  const handleSubcategoryClick = (catFilter, subcatItem) => {
    setHoveredCategory(null);
    onSelect(catFilter);
    setSearchQuery(subcatItem);
    if (catFilter) navigate('/');
  };

  const hoveredCat = CATEGORIES.find(c => c.filter === hoveredCategory);

  return (
    /* Flipkart white category bar with bottom separator */
    <div className="bg-white shadow-sm w-full flex justify-center relative z-40 fk-category-strip">
      <div className="max-w-[1248px] w-full mx-auto px-2 flex items-stretch overflow-x-auto scrollbar-none fk-category-row">
        {CATEGORIES.map(({ label, displayLabel, filter, icon }) => {
          const active = isSelected(filter);
          const hovered = hoveredCategory === filter;
          return (
            <div
              key={filter || 'for-you'}
              className="relative flex-shrink-0"
              onMouseEnter={() => handleMouseEnter(filter)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                title={label}
                onClick={() => handleCategoryClick(filter)}
                className="flex flex-col items-center justify-center pt-3 pb-2 px-3 sm:px-4 gap-1 group min-w-[72px] sm:min-w-[80px] relative"
              >
                {/* Icon */}
                <div className="w-[52px] h-[52px] flex items-center justify-center">
                  <CategoryIcon type={icon} active={active || hovered} />
                </div>

                {/* Label */}
                <span
                  className={`text-[11px] sm:text-[12px] font-medium leading-tight text-center w-full truncate whitespace-nowrap ${
                    active || hovered ? 'text-[#2874f0]' : 'text-[#212121]'
                  }`}
                >
                  {displayLabel}
                </span>

                {/* Active / hover underline — Flipkart uses a solid bottom border on the button itself */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-150 ${
                    active ? 'bg-[#2874f0]' : hovered ? 'bg-[#2874f0]/40' : 'bg-transparent'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Hover mega-dropdown */}
      {hoveredCat && hoveredCat.subcategories?.length > 0 && (
        <div
          ref={dropdownRef}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
          className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50"
          style={{ animation: 'fadeSlideDown 0.15s ease-out' }}
        >
          <div className="max-w-[1248px] mx-auto px-6 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-4">
              {hoveredCat.subcategories.map((subcat) => (
                <div key={subcat.name}>
                  <h4 className="text-[11px] font-bold text-[#878787] mb-2 uppercase tracking-wider pb-1 border-b border-gray-100">
                    {subcat.name}
                  </h4>
                  <ul className="space-y-1.5">
                    {subcat.items.map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => handleSubcategoryClick(hoveredCat.filter, item)}
                          className="text-[12px] text-[#212121] hover:text-[#2874f0] transition-colors w-full text-left py-0.5 truncate"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryStrip;
