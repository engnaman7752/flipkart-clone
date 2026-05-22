import { useMemo } from 'react';
import ProductCard from '../ProductCard';

const ProductGridSection = ({
  products,
  categoryFilter,
  searchQuery,
  onClearFilters,
}) => {
  const sectionTitle = categoryFilter
    ? `Best of ${categoryFilter}`
    : searchQuery
      ? `Results for "${searchQuery}"`
      : 'Recommended for you';

  // Group by category when no filter/search is active
  const groupedProducts = useMemo(() => {
    if (!products?.length) return {};
    const groups = {};
    products.forEach((p) => {
      const cat = p.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [products]);

  const categoryOrder = [
    'Mobiles', 'Electronics', 'Fashion', 'Beauty', 'Home & Kitchen',
    'Appliances', 'Toys', 'Food & Health', 'Sports', 'Auto Accessories',
    '2 Wheelers', 'Books', 'Furniture', 'Grocery',
  ];

  const sortedCategories = useMemo(() => {
    return Object.keys(groupedProducts).sort((a, b) => {
      const ai = categoryOrder.indexOf(a);
      const bi = categoryOrder.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [groupedProducts]);

  const isFiltered = !!(categoryFilter || searchQuery);

  return (
    <div id="products-grid-section" className="max-w-[1248px] mx-auto px-4 sm:px-6 mt-4 pb-8 scroll-mt-[72px]">

      {/* ── Section header ── */}
      <div className="bg-white px-5 py-3 border-b border-gray-100 flex items-center justify-between mb-px">
        <h1 className="text-[18px] font-medium text-[#212121]">{sectionTitle}</h1>
        <div className="flex items-center gap-4">
          {isFiltered && (
            <button
              type="button"
              id="clear-filters-btn"
              onClick={onClearFilters}
              className="text-[12px] text-[#2874f0] font-semibold hover:underline flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
          {products?.length > 0 && (
            <span className="text-[12px] text-[#878787] font-medium">
              {products.length} results
            </span>
          )}
        </div>
      </div>

      {/* ── Empty state ── */}
      {products?.length === 0 && (
        <div className="bg-white flex flex-col items-center justify-center py-20 text-center">
          <svg className="h-16 w-16 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-[16px] font-medium text-[#212121] mb-1">No results found</h3>
          <p className="text-[13px] text-[#878787] mb-6">Try adjusting your search or filters.</p>
          <button
            type="button"
            onClick={onClearFilters}
            className="bg-[#2874f0] text-white font-medium px-8 py-2.5 text-[13px] uppercase hover:bg-[#1a5dc7] transition-colors"
          >
            View All Products
          </button>
        </div>
      )}

      {/* ── Product grid ── */}
      {products?.length > 0 && (
        <div className="bg-white">
          {isFiltered ? (
            /* Single category/search — flat grid with dividers between rows */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 divide-x divide-y divide-gray-100">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* No filter — grouped by category */
            <div>
              {sortedCategories.map((cat, catIdx) => (
                <div key={cat}>
                  {/* Category divider header */}
                  <div className={`px-5 py-3 flex items-center justify-between bg-white ${catIdx > 0 ? 'border-t border-gray-100' : ''}`}>
                    <h2 className="text-[16px] font-medium text-[#212121]">{cat}</h2>
                    <span className="text-[11px] text-[#878787]">
                      {groupedProducts[cat].length} products
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 divide-x divide-y divide-gray-100 border-t border-gray-100">
                    {groupedProducts[cat].map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGridSection;
