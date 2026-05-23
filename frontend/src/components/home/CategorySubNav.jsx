import React, { useRef } from 'react';
import useCartStore from '../../store/cartStore';
import { CATEGORIES } from '../../config/categories';

const CategorySubNav = ({ categoryFilter }) => {
  const { setSearchQuery } = useCartStore();
  const scrollRef = useRef(null);

  if (!categoryFilter) return null;

  const categoryData = CATEGORIES.find(c => c.filter === categoryFilter);
  if (!categoryData || !categoryData.subcategories || categoryData.subcategories.length === 0) return null;

  // Flatten subcategory items for the top scrolling bar
  const items = categoryData.subcategories.reduce((acc, sub) => {
    return acc.concat(sub.items);
  }, []);

  // Filter out to max 15 items for the scroll bar
  const displayItems = items.slice(0, 15);

  const getImageUrl = (index) => {
    // Generate a deterministically random-looking image from unsplash for variety
    const ids = [
      '1515886657613-9f3515b0c78f', // valid
      '1514989940723-e8e51635b782', // valid
      '1596461404969-9ae70f2830c1', // valid
      '1542291026-7eec264c27ff', // valid
      '1487222477894-8943e31ef7b2', // valid
      '1524592094714-0f0654e20314', // valid
      '1505740420928-5e560c06d30e', // valid
      '1523275335684-37898b6baf30', // valid
      '1496747611176-843222e1e57c', // valid
      '1546435770-a3e426bf472b', // valid
      '1550639525-c97d455acf70', // valid
      '1608231387042-66d1773070a5', // valid
      '1524805444758-089113d48a6d', // valid
      '1579586337278-3befd40fd17a', // valid
      '1518002171953-a080ee817e1f'  // valid
    ];
    return `https://images.unsplash.com/photo-${ids[index % ids.length]}?w=100&h=100&fit=crop`;
  };

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm mb-4">
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 py-4">
        
        {/* Horizontal Scrolling Tiles */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none gap-4 sm:gap-6 pb-2"
        >
          {displayItems.map((item, idx) => (
            <div 
              key={item}
              onClick={() => setSearchQuery(item)}
              className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0 w-20"
            >
              <div className="w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] bg-[#fdf0f0] rounded-2xl overflow-hidden group-hover:shadow-md transition-shadow">
                <img 
                  src={getImageUrl(idx)} 
                  alt={item} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[11px] sm:text-[12px] font-medium text-[#212121] text-center leading-tight line-clamp-2">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Shop for Loved Ones Section (Show only for Fashion to match request, or generic) */}
        {categoryFilter === 'Fashion' && (
          <div className="mt-8 mb-4">
            <h2 className="text-[18px] sm:text-[20px] font-medium text-[#212121] mb-4">Shop for loved ones</h2>
            <div className="flex overflow-x-auto scrollbar-none gap-4">
              <div className="w-[160px] sm:w-[200px] flex-shrink-0 cursor-pointer group" onClick={() => setSearchQuery('Men')}>
                <div className="bg-[#fcf5e5] rounded-xl overflow-hidden relative pt-[100%]">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop" alt="Men" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="text-center mt-2 text-[14px] sm:text-[16px] font-medium text-[#212121]">Men</h3>
              </div>
              <div className="w-[160px] sm:w-[200px] flex-shrink-0 cursor-pointer group" onClick={() => setSearchQuery('Women')}>
                <div className="bg-[#fcecf1] rounded-xl overflow-hidden relative pt-[100%]">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop" alt="Women" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="text-center mt-2 text-[14px] sm:text-[16px] font-medium text-[#212121]">Women</h3>
              </div>
              <div className="w-[160px] sm:w-[200px] flex-shrink-0 cursor-pointer group" onClick={() => setSearchQuery('Gen Z')}>
                <div className="bg-[#eaf4fc] rounded-xl overflow-hidden relative pt-[100%]">
                  <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop" alt="Gen Z drips" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#00ff7f] text-black text-[12px] font-bold px-3 py-1 rounded-sm">spoyl</div>
                </div>
                <h3 className="text-center mt-2 text-[14px] sm:text-[16px] font-medium text-[#212121]">Gen Z drips</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySubNav;
