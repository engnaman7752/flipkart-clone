import React from 'react';
import { useNavigate } from 'react-router-dom';
import RatingBadge from '../RatingBadge';

const ProductListCard = ({ product, isCompared, onCompareToggle }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const image = Array.isArray(product.images) ? product.images[0] : product.images;
  const price = parseFloat(product.price);
  const originalPrice = parseFloat(product.original_price || price * 1.25);
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  // Generate mock specs based on category
  const specs = product.category === 'Mobiles' ? [
    '8 GB RAM | 128 GB ROM | Expandable Upto 1 TB',
    '16.76 cm (6.6 inch) Full HD+ Display',
    '50MP + 2MP | 13MP Front Camera',
    '6000 mAh Battery',
    'Exynos 1330, Octa Core Processor'
  ] : [
    'Brand Warranty',
    '10 Days Return Policy',
    'Cash on Delivery available',
    'Free Delivery'
  ];

  return (
    <div 
      onClick={handleProductClick}
      className="flex flex-col sm:flex-row bg-white hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.12)] transition-shadow cursor-pointer p-6 gap-6 relative group border-b border-gray-100"
    >
      {/* Favorite Icon */}
      <div className="absolute top-6 right-6 text-gray-300 hover:text-gray-400 z-10 hidden sm:block">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </div>

      {/* Left Image Section */}
      <div className="w-[180px] flex-shrink-0 flex flex-col items-center gap-4">
        <div 
          className="w-[160px] h-[160px] flex items-center justify-center p-2 relative cursor-pointer"
          onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
        >
          <img src={image} alt={product.name} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id={`compare-${product.id}`} 
            className="w-3.5 h-3.5 cursor-pointer accent-[#2874f0]" 
            checked={isCompared}
            onChange={onCompareToggle}
            onClick={(e) => e.stopPropagation()} 
          />
          <label 
            htmlFor={`compare-${product.id}`} 
            className="text-[13px] text-[#212121] cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              onCompareToggle();
            }}
          >
            Add to Compare
          </label>
        </div>
      </div>

      {/* Middle Info Section */}
      <div className="flex-1 min-w-0 pr-8">
        <h2 
          className="text-[18px] font-medium text-[#212121] hover:text-[#2874f0] transition-colors mb-2 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
        >
          {product.name}
        </h2>
        <div className="flex items-center gap-2 mb-3">
          <RatingBadge rating={product.rating || 4.2} count={product.reviews || 8421} size="sm" />
        </div>
        
        <ul className="space-y-1.5 ml-4 text-[13px] text-[#212121]">
          {specs.map((spec, idx) => (
            <li key={idx} className="list-disc text-gray-400">
              <span className="text-[#212121]">{spec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Pricing Section */}
      <div className="w-[200px] flex-shrink-0 flex flex-col items-start sm:items-end">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[24px] font-medium text-[#212121]">₹{price.toLocaleString('en-IN')}</span>
          <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="FA" className="h-[21px] ml-1" />
        </div>
        <div className="flex items-center gap-2 text-[14px]">
          <span className="text-[#878787] line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
          <span className="text-[#388e3c] font-medium font-semibold">{discount}% off</span>
        </div>
        <div className="text-[12px] text-[#212121] mt-2">Free delivery</div>
        {discount > 20 && (
          <div className="text-[12px] text-[#388e3c] font-medium mt-1">Saver Deal</div>
        )}
        <div className="text-[12px] text-[#388e3c] font-medium mt-1">Bank Offer</div>
      </div>
    </div>
  );
};

export default ProductListCard;
