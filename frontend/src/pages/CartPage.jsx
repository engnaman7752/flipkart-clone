import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import PageContainer from '../components/PageContainer';
import PriceSummary from '../components/PriceSummary';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, fetchCart, updateQty, removeFromCart, toggleWishlist, isInWishlist, showToast } = useCartStore();

  const handleSaveForLater = async (productId) => {
    if (!isInWishlist(productId)) {
      await toggleWishlist(productId);
    } else {
      showToast('Item saved for later', 'info');
    }
    await removeFromCart(productId);
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const totalMRP = cartItems?.reduce((acc, item) => acc + parseFloat(item.mrp) * item.quantity, 0) || 0;
  const totalPrice = cartItems?.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0) || 0;
  const discount = totalMRP - totalPrice;
  const itemCount = cartItems?.reduce((acc, i) => acc + i.quantity, 0) || 0;

  if (!cartItems || cartItems.length === 0) {
    return (
      <PageContainer className="max-w-4xl">
        <div className="bg-white shadow-sm p-8 sm:p-16 text-center">
          <img
            src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt="Empty Cart"
            className="mx-auto h-36 sm:h-44 mb-6 object-contain"
          />
          <h2 className="text-[20px] font-medium text-[#212121] mb-2">Your cart is empty!</h2>
          <p className="text-[#878787] mb-8 text-[14px]">Add items to it now.</p>
          <button
            type="button"
            id="cart-shop-now"
            onClick={() => navigate('/')}
            className="bg-[#2874f0] text-white font-medium px-12 py-3 text-[14px] uppercase tracking-wide hover:bg-[#1a5dc7] transition-colors"
          >
            Shop Now
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row gap-4 items-start">

        {/* ── Cart items ── */}
        <div className="flex-grow w-full bg-white shadow-sm">
          {/* Header */}
          <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
            <h1 className="text-[18px] font-medium text-[#212121]">
              My Cart <span className="text-[#878787] text-[14px] font-normal">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
            </h1>
          </div>

          {/* Item list */}
          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => {
              const itemDiscount = item.mrp > item.price
                ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
                : 0;
              return (
                <div key={item.product_id} className="px-6 py-5 flex flex-col sm:flex-row gap-4">
                  {/* Image + qty */}
                  <div className="flex flex-row sm:flex-col items-center gap-4 flex-shrink-0 sm:w-[120px]">
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${item.product_id}`)}
                      className="w-[80px] h-[80px] flex items-center justify-center p-1 border border-gray-100 hover:border-[#2874f0] transition-colors"
                    >
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </button>

                    {/* Qty stepper */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => updateQty(item.product_id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-[#212121] font-bold hover:border-[#2874f0] hover:text-[#2874f0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-[13px] font-semibold text-[#212121] border border-gray-200 py-0.5 rounded-sm bg-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.product_id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-[#212121] font-bold hover:border-[#2874f0] hover:text-[#2874f0] transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3
                      onClick={() => navigate(`/product/${item.product_id}`)}
                      className="text-[14px] font-normal text-[#212121] hover:text-[#2874f0] cursor-pointer line-clamp-2 mb-1 leading-snug"
                    >
                      {item.name}
                    </h3>
                    <p className="text-[12px] text-[#878787] mb-3">
                      Seller: <span className="text-[#2874f0]">Flipkart Retail</span>
                    </p>

                    <div className="flex items-baseline gap-2 mb-4 flex-wrap">
                      <span className="text-[18px] font-bold text-[#212121]">
                        ₹{parseFloat(item.price).toLocaleString('en-IN')}
                      </span>
                      {itemDiscount > 0 && (
                        <>
                          <span className="text-[13px] text-[#878787] line-through">
                            ₹{parseFloat(item.mrp).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[13px] font-medium text-[#388e3c]">{itemDiscount}% off</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-[13px] font-medium text-[#212121] uppercase hover:text-red-500 transition-colors"
                      >
                        REMOVE
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveForLater(item.product_id)}
                        className="text-[13px] font-medium text-[#212121] uppercase hover:text-[#2874f0] transition-colors"
                      >
                        SAVE FOR LATER
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Place order bar */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-white shadow-sm">
            <button
              type="button"
              id="cart-place-order"
              onClick={() => navigate('/checkout')}
              className="bg-[#fb641b] hover:bg-[#e05615] text-white font-bold px-12 py-3.5 text-[14px] uppercase tracking-wide transition-colors"
            >
              PLACE ORDER
            </button>
          </div>
        </div>

        <PriceSummary
          itemCount={itemCount}
          totalMRP={totalMRP}
          totalPrice={totalPrice}
          discount={discount}
        />
      </div>
    </PageContainer>
  );
};

export default CartPage;
