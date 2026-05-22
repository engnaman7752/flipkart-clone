import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, fetchWishlist, toggleWishlist, addToCart } = useCartStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleMoveToCart = async (productId) => {
    await addToCart(productId);
    // Remove from wishlist after moving to cart
    await toggleWishlist(productId);
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white shadow-sm p-12 text-center">
          <svg className="h-20 w-20 text-gray-200 mx-auto mb-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-[20px] font-medium text-[#212121] mb-2">Empty Wishlist</h2>
          <p className="text-[#878787] mb-8 text-[14px]">You have no items saved in your wishlist. Start adding some!</p>
          <button
            id="wishlist-continue-shopping"
            onClick={() => navigate('/')}
            className="bg-[#2874f0] text-white font-medium px-10 py-3 text-[14px] uppercase tracking-wide hover:bg-[#1a5dc7] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1248px] mx-auto px-4 sm:px-6 py-4">
      <div className="bg-white shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-[18px] font-medium text-[#212121]">
            My Wishlist <span className="text-[#878787] text-[14px] font-normal">({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})</span>
          </h1>
        </div>

        {/* Wishlist items */}
        <div className="divide-y divide-gray-100">
          {wishlist.map((item) => {
            const discount = item.mrp
              ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
              : 0;

            return (
              <div key={item.product_id} className="px-6 py-5 flex flex-col sm:flex-row gap-5">
                {/* Image */}
                <div
                  onClick={() => navigate(`/product/${item.product_id}`)}
                  className="w-[120px] h-[120px] flex items-center justify-center p-2 border border-gray-100 cursor-pointer flex-shrink-0 hover:border-[#2874f0] transition-colors"
                >
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3
                    onClick={() => navigate(`/product/${item.product_id}`)}
                    className="text-[14px] font-normal text-[#212121] hover:text-[#2874f0] cursor-pointer line-clamp-2 mb-0.5 leading-snug"
                  >
                    {item.name}
                  </h3>
                  <p className="text-[12px] text-[#878787] mb-2">{item.brand}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#388e3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                      {item.rating} <span className="text-[9px]">★</span>
                    </span>
                    <span className="text-[#878787] text-[12px]">({item.rating_count?.toLocaleString('en-IN')})</span>
                  </div>

                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-[18px] font-bold text-[#212121]">₹{parseFloat(item.price).toLocaleString('en-IN')}</span>
                    {discount > 0 && (
                      <>
                        <span className="text-[13px] text-[#878787] line-through">₹{parseFloat(item.mrp).toLocaleString('en-IN')}</span>
                        <span className="text-[13px] font-medium text-[#388e3c]">{discount}% off</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3 sm:gap-4 flex-shrink-0 sm:w-[160px]">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item.product_id)}
                    id={`move-to-cart-${item.product_id}`}
                    className="bg-[#ff9f00] hover:bg-[#e08c00] text-white font-bold px-5 py-2.5 text-[13px] uppercase tracking-wide transition-colors w-full sm:w-auto text-center"
                  >
                    ADD TO CART
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item.product_id)}
                    className="text-[13px] font-medium text-[#212121] uppercase hover:text-red-500 transition-colors"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
