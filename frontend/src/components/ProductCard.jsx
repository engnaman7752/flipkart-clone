import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import RatingBadge from './RatingBadge';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useCartStore();

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white border border-gray-100 flex flex-col cursor-pointer relative group overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      {/* Image area */}
      <div className="aspect-square w-full flex items-center justify-center relative bg-white p-4">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist button */}
        <button
          type="button"
          id={`wishlist-${product.id}`}
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
            isInWishlist(product.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
          }`}
        >
          <svg className="h-[18px] w-[18px]" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Discount badge */}
        {discount >= 5 && (
          <span className="absolute top-2 left-2 bg-[#388e3c] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
            {discount}% off
          </span>
        )}
      </div>

      {/* Info area */}
      <div className="px-3 pb-3 pt-1 flex flex-col flex-grow">
        <p className="text-[11px] font-medium text-[#878787] truncate mb-0.5">{product.brand}</p>
        <h3 className="text-[13px] text-[#212121] line-clamp-2 font-normal mb-2 min-h-[2.5rem] leading-tight">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 flex-wrap mt-auto">
          <span className="text-[14px] font-bold text-[#212121]">
            ₹{parseFloat(product.price).toLocaleString('en-IN')}
          </span>
          {discount > 0 && (
            <>
              <span className="text-[12px] text-[#878787] line-through">
                ₹{parseFloat(product.mrp).toLocaleString('en-IN')}
              </span>
              <span className="text-[12px] font-medium text-[#388e3c]">{discount}% off</span>
            </>
          )}
        </div>

        {/* Rating below price */}
        <div className="mt-1.5">
          <RatingBadge rating={product.rating} count={product.rating_count} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
