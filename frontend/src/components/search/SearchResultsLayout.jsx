import React, { useState } from 'react';
import SidebarFilters from './SidebarFilters';
import ProductListCard from './ProductListCard';
import ProductCard from '../ProductCard';
import { CATEGORIES } from '../../config/categories';

const SearchResultsLayout = ({ products, categoryFilter, searchQuery, onClearFilters }) => {
  const [sortBy, setSortBy] = useState('Relevance');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]); // [min, max]
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (product) => {
    setCompareList(prev => {
      if (prev.some(p => p.id === product.id)) return prev.filter(p => p.id !== product.id);
      if (prev.length < 4) return [...prev, product];
      alert('You can only compare up to 4 items');
      return prev;
    });
  };

  // Extract dynamic brands from the current products list
  const availableBrands = Array.from(new Set(
    (products || []).map(p => p.brand).filter(Boolean)
  )).sort();

  // Determine if we should use List view or Grid view
  // Mobiles, Electronics, Appliances, etc., usually use List view on Flipkart.
  const listViewCategories = ['Mobiles', 'Electronics', 'Appliances', 'Computers'];
  const isListView = categoryFilter ? listViewCategories.includes(categoryFilter) : false; // If search query but no category, default to Grid or we can try to guess. Let's default to List for generic searches unless we know it's a grid category.
  const displayMode = (categoryFilter && !isListView) ? 'grid' : 'list';

  const sortOptions = ['Relevance', 'Popularity', 'Price -- Low to High', 'Price -- High to Low', 'Newest First'];

  let filteredProducts = [...(products || [])];
  
  // Filter by Price
  filteredProducts = filteredProducts.filter(p => {
    const price = parseFloat(p.price) || 0;
    return price >= priceRange[0] && price <= priceRange[1];
  });

  // Filter by Brands
  if (selectedBrands.length > 0) {
    const brandsLower = selectedBrands.map(b => b.toLowerCase());
    filteredProducts = filteredProducts.filter(p => p.brand && brandsLower.includes(p.brand.toLowerCase()));
  }
  if (selectedRatings.length > 0) {
    const minRating = Math.min(...selectedRatings.map(r => parseInt(r[0])));
    filteredProducts = filteredProducts.filter(p => (p.rating || 4.2) >= minRating);
  }

  // Basic sorting logic (Frontend mock sorting)
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'Price -- Low to High') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'Price -- High to Low') return parseFloat(b.price) - parseFloat(a.price);
    return 0; // Default or Relevance
  });

  const getBreadcrumb = () => {
    if (categoryFilter) return `Home > ${categoryFilter}`;
    if (searchQuery) return `Home > Search Results`;
    return 'Home > All Products';
  };

  const getShowingText = () => {
    const total = sortedProducts.length;
    const queryText = searchQuery ? ` for "${searchQuery}"` : '';
    return `Showing 1 – ${total} of ${total} results${queryText}`;
  };

  return (
    <div className="max-w-[1248px] mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row gap-4 items-start">
      {/* Left Sidebar */}
      <SidebarFilters 
        categoryFilter={categoryFilter} 
        availableBrands={availableBrands}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onClearAll={() => {
          setSelectedBrands([]);
          setSelectedRatings([]);
          setPriceRange([0, 100000]);
        }}
      />

      {/* Right Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {/* Top Sort Bar */}
        <div className="bg-white shadow-sm p-4 border border-gray-100">
          <div className="text-[12px] text-[#878787] mb-2">{getBreadcrumb()}</div>
          <h1 className="text-[16px] font-medium text-[#212121] mb-3">{getShowingText()}</h1>
          <div className="flex items-center gap-6 text-[14px]">
            <span className="font-medium text-[#212121]">Sort By</span>
            {sortOptions.map(option => (
              <span 
                key={option}
                onClick={() => setSortBy(option)}
                className={`cursor-pointer ${sortBy === option ? 'text-[#2874f0] font-medium border-b-2 border-[#2874f0] pb-1' : 'text-[#212121] hover:text-[#2874f0]'}`}
              >
                {option}
              </span>
            ))}
          </div>
        </div>

        {/* Products Container */}
        {sortedProducts.length === 0 ? (
          <div className="bg-white shadow-sm flex flex-col items-center justify-center py-20 text-center">
            <svg className="h-16 w-16 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-[16px] font-medium text-[#212121] mb-1">No results found</h3>
            <p className="text-[13px] text-[#878787] mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={onClearFilters}
              className="bg-[#2874f0] text-white font-medium px-8 py-2.5 text-[13px] uppercase hover:bg-[#1a5dc7] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`bg-white shadow-sm ${displayMode === 'grid' ? 'grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-gray-100' : 'flex flex-col'}`}>
            {sortedProducts.map((product) => (
              displayMode === 'grid' 
                ? <ProductCard key={product.id} product={product} />
                : <ProductListCard 
                    key={product.id} 
                    product={product} 
                    isCompared={compareList.some(p => p.id === product.id)}
                    onCompareToggle={() => toggleCompare(product)}
                  />
            ))}
          </div>
        )}
      </div>

      {/* Floating Compare Banner */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 py-3 px-6 flex items-center justify-between animate-slide-up border-t border-gray-200">
          <div className="flex items-center gap-6 max-w-[1248px] mx-auto w-full justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[20px] font-medium text-[#212121]">Compare Products</span>
              <span className="text-[14px] text-gray-500">{compareList.length} items selected (Max 4)</span>
              
              <div className="flex gap-2 ml-4">
                {compareList.map(item => {
                  const img = Array.isArray(item.images) ? item.images[0] : item.images;
                  return (
                    <div key={item.id} className="relative w-12 h-12 border border-gray-200 bg-white flex items-center justify-center p-1 rounded">
                      <img src={img} alt={item.name} className="max-w-full max-h-full object-contain" />
                      <button 
                        onClick={() => toggleCompare(item)}
                        className="absolute -top-2 -right-2 bg-gray-300 rounded-full text-white w-4 h-4 flex items-center justify-center text-[10px] hover:bg-red-500"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setCompareList([])}
                className="text-[14px] font-medium text-[#212121] px-4 py-2 uppercase hover:text-[#2874f0]"
              >
                Remove All
              </button>
              <button 
                onClick={() => {
                  const ids = compareList.map(p => p.id).join(',');
                  window.location.href = `/compare?ids=${ids}`;
                }}
                className="bg-[#fb641b] text-white px-8 py-2 font-medium text-[14px] shadow-sm hover:shadow-md uppercase rounded-[2px]"
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsLayout;
