import React, { useState } from 'react';

const SidebarFilters = ({ categoryFilter, availableBrands = [], selectedBrands, setSelectedBrands, selectedRatings, setSelectedRatings, priceRange, setPriceRange, onClearAll }) => {
  // Local state to mock the expanding/collapsing filter groups
  const [expanded, setExpanded] = useState({ brand: true, customerRating: true, discount: true });
  const [showAllBrands, setShowAllBrands] = useState(false);

  const toggleFilter = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Generate dynamic options for the dropdowns to always support the current slider values
  const baseMinOptions = [0, 500, 1000, 2000, 5000, 10000, 20000, 30000];
  const minOptions = Array.from(new Set([...baseMinOptions.filter(v => v < priceRange[1]), priceRange[0]])).sort((a, b) => a - b);

  const baseMaxOptions = [1000, 2000, 5000, 10000, 20000, 50000, 100000];
  const maxOptions = Array.from(new Set([...baseMaxOptions.filter(v => v > priceRange[0]), priceRange[1]])).sort((a, b) => a - b);

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleRatingToggle = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  return (
    <div className="w-full bg-white shadow-sm pb-8 border border-gray-100 hidden md:block" style={{ width: '270px', minWidth: '270px' }}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-[18px] font-medium text-[#212121]">Filters</h2>
        {(selectedBrands.length > 0 || selectedRatings.length > 0) && (
          <span onClick={onClearAll} className="text-[12px] font-medium text-[#2874f0] uppercase cursor-pointer">Clear all</span>
        )}
      </div>

      {/* Categories tree */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-[12px] font-medium text-[#212121] uppercase tracking-wider mb-2">Categories</h3>
        {categoryFilter && (
          <div className="text-[14px] text-[#878787] mb-1 flex items-center gap-1 cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            All Categories
          </div>
        )}
        <div className="text-[14px] font-medium text-[#212121] ml-4 cursor-pointer">{categoryFilter || 'All Categories'}</div>
      </div>

      {/* Price Slider Mock */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-[12px] font-medium text-[#212121] uppercase tracking-wider mb-4">Price</h3>
        
        {/* Dual Range Input */}
        <div className="relative h-1 mb-6 mt-4 mx-2">
          <style>{`
            .fk-range-slider::-webkit-slider-thumb {
              pointer-events: auto;
              width: 15px;
              height: 15px;
              border-radius: 50%;
              background: #fff;
              border: 1px solid #c2c2c2;
              cursor: pointer;
              -webkit-appearance: none;
              box-shadow: 0 1px 2px rgba(0,0,0,0.2);
            }
          `}</style>
          {/* Track background */}
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-200 rounded-lg"></div>
          {/* Active track color */}
          <div 
            className="absolute top-0 bottom-0 bg-[#2874f0] rounded-lg" 
            style={{ 
              left: `${(priceRange[0]/100000)*100}%`, 
              right: `${100 - (priceRange[1]/100000)*100}%` 
            }}
          ></div>
          
          <input 
            type="range" 
            min="0" 
            max="100000" 
            step="500"
            value={priceRange[0]} 
            onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value), priceRange[1] - 500), priceRange[1]])}
            className="absolute top-0 left-0 w-full h-1 appearance-none bg-transparent pointer-events-none fk-range-slider"
            style={{ zIndex: priceRange[0] > 90000 ? 5 : 3 }}
          />
          <input 
            type="range" 
            min="0" 
            max="100000" 
            step="500"
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value), priceRange[0] + 500)])}
            className="absolute top-0 left-0 w-full h-1 appearance-none bg-transparent pointer-events-none fk-range-slider"
            style={{ zIndex: 4 }}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <select 
            className="border border-gray-200 text-[#212121] text-[14px] py-1 px-2 rounded-sm w-full outline-none"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          >
            {minOptions.map(val => (
              <option key={`min-${val}`} value={val}>
                {val === 0 ? 'Min' : `₹${val}`}
              </option>
            ))}
          </select>
          <span className="text-[#878787] text-[14px]">to</span>
          <select 
            className="border border-gray-200 text-[#212121] text-[14px] py-1 px-2 rounded-sm w-full outline-none"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          >
            {maxOptions.map(val => (
              <option key={`max-${val}`} value={val}>
                {val >= 100000 ? '100000+' : `₹${val}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Flipkart Assured */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4 text-[#2874f0] cursor-pointer" id="f-assured" />
        <label htmlFor="f-assured" className="cursor-pointer flex items-center gap-1.5">
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Flipkart Assured" className="h-[21px]" />
        </label>
      </div>

      {/* Brand Filter */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleFilter('brand')}>
          <h3 className="text-[12px] font-medium text-[#212121] uppercase tracking-wider">Brand</h3>
          <svg className={`w-4 h-4 text-gray-500 transition-transform ${expanded.brand ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
        {expanded.brand && (
          <div className="space-y-2 mt-2">
            <div className="relative mb-3">
              <svg className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search Brand" className="w-full border-b border-gray-200 pb-1 pl-7 text-[13px] outline-none placeholder:text-gray-400" />
            </div>
            {availableBrands.length === 0 && (
              <div className="text-[12px] text-gray-400 mt-2">No brands available</div>
            )}
            {availableBrands.slice(0, showAllBrands ? undefined : 6).map(brand => (
              <div key={brand} className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id={`brand-${brand}`} 
                  className="w-4 h-4 text-[#2874f0] cursor-pointer" 
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                <label htmlFor={`brand-${brand}`} className="text-[14px] text-[#212121] cursor-pointer flex-1">{brand}</label>
              </div>
            ))}
            {!showAllBrands && availableBrands.length > 6 && (
              <div 
                className="text-[12px] text-[#2874f0] font-medium mt-2 cursor-pointer uppercase"
                onClick={() => setShowAllBrands(true)}
              >
                {availableBrands.length - 6} MORE
              </div>
            )}
          </div>
        )}
      </div>

      {/* Customer Ratings */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between cursor-pointer mb-3" onClick={() => toggleFilter('customerRating')}>
          <h3 className="text-[12px] font-medium text-[#212121] uppercase tracking-wider">Customer Ratings</h3>
          <svg className={`w-4 h-4 text-gray-500 transition-transform ${expanded.customerRating ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
        {expanded.customerRating && (
          <div className="space-y-2 mt-2">
            {['4★ & above', '3★ & above', '2★ & above', '1★ & above'].map(rating => (
              <div key={rating} className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id={`rating-${rating}`} 
                  className="w-4 h-4 text-[#2874f0] cursor-pointer" 
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingToggle(rating)}
                />
                <label htmlFor={`rating-${rating}`} className="text-[14px] text-[#212121] cursor-pointer flex-1">{rating}</label>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default SidebarFilters;
