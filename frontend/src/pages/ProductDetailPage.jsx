import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import useCartStore from '../store/cartStore';
import PageContainer from '../components/PageContainer';
import RatingBadge from '../components/RatingBadge';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
      <div className="text-[#878787] text-sm font-medium">Loading product details...</div>
    </div>
  );
  if (error || !product) return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
      <div className="text-red-500 text-sm">Error loading product details.</div>
    </div>
  );

  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleBuyNow = async () => {
    await addToCart(product.id);
    navigate('/cart');
  };

  const images = product.images || ['https://via.placeholder.com/400'];
  const hasStock = product.stock > 0;

  const ctaButtons = (
    <div className="grid grid-cols-2 gap-3 w-full">
      <button
        type="button"
        id={`add-to-cart-${id}`}
        onClick={() => addToCart(product.id)}
        disabled={!hasStock}
        className="bg-[#ff9f00] hover:bg-[#e08c00] text-white font-bold py-3.5 text-[14px] uppercase tracking-wide shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-sm"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45C5.16 14.57 5 15.02 5 15.5c0 1.1.9 2 2 2h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.46 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        ADD TO CART
      </button>
      <button
        type="button"
        id={`buy-now-${id}`}
        onClick={handleBuyNow}
        disabled={!hasStock}
        className="bg-[#fb641b] hover:bg-[#e05615] text-white font-bold py-3.5 text-[14px] uppercase tracking-wide shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        BUY NOW
      </button>
    </div>
  );

  return (
    <PageContainer>
      {/* Breadcrumb */}
      <nav className="text-xs text-[#878787] mb-3 font-medium">
        <Link to="/" className="hover:text-[#2874f0]">Home</Link>
        <span className="mx-1">›</span>
        <span
          className="hover:text-[#2874f0] cursor-pointer"
          onClick={() => navigate(`/?category=${encodeURIComponent(product.category)}`)}
        >
          {product.category}
        </span>
        <span className="mx-1">›</span>
        <span className="text-[#212121]">{product.brand}</span>
      </nav>

      <div className="bg-white shadow-sm">
        <div className="flex flex-col lg:flex-row">

          {/* ── Left column: images ── */}
          <div className="w-full lg:w-[40%] border-r border-gray-100 lg:sticky top-[56px] self-start">
            <div className="flex gap-0">
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="w-[64px] border-r border-gray-100 py-4 flex flex-col gap-2 items-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`w-[52px] h-[52px] border p-0.5 flex items-center justify-center ${
                        selectedImgIdx === idx ? 'border-[#2874f0]' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1 p-6 flex items-center justify-center min-h-[340px] relative">
                <img
                  src={images[selectedImgIdx]}
                  alt={product.name}
                  className="max-h-[320px] max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-1.5 rounded-full border ${
                    isInWishlist(product.id) ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-400 border-gray-200 bg-white hover:text-red-400'
                  }`}
                >
                  <svg className="h-5 w-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* CTA — desktop */}
            <div className="hidden md:block px-6 py-4 border-t border-gray-100">
              {ctaButtons}
            </div>
          </div>

          {/* ── Right column: details ── */}
          <div className="flex-1 p-4 sm:p-6 pb-24 md:pb-6 min-w-0">

            <h1 className="text-[18px] sm:text-[20px] font-normal text-[#212121] leading-snug mb-1">
              {product.name}
            </h1>
            <p className="text-[13px] font-medium text-[#2874f0] hover:underline cursor-pointer mb-3">
              Visit the {product.brand} Store
            </p>

            {/* Rating row */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <RatingBadge rating={product.rating} count={product.rating_count} size="md" />
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                alt="Flipkart Assured"
                className="h-[18px]"
              />
            </div>

            {/* Price block */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <span className="text-[28px] font-bold text-[#212121]">
                  ₹{parseFloat(product.price).toLocaleString('en-IN')}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-[16px] text-[#878787] line-through">
                      ₹{parseFloat(product.mrp).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[16px] font-semibold text-[#388e3c]">{discount}% off</span>
                  </>
                )}
              </div>
              <p className="text-xs text-[#878787]">inclusive of all taxes</p>
              <p className="mt-2 text-sm">
                <span className="text-[#878787]">Availability: </span>
                <span className={`font-semibold ${hasStock ? 'text-[#388e3c]' : 'text-red-500'}`}>
                  {hasStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
            </div>

            {/* Available offers */}
            <div className="mb-5">
              <h3 className="font-semibold text-[14px] text-[#212121] mb-2">Available offers</h3>
              <ul className="space-y-1.5 text-[13px] text-[#212121]">
                <li className="flex items-start gap-2">
                  <span className="text-[#388e3c] font-bold text-xs mt-0.5 flex-shrink-0">●</span>
                  <span><strong>Bank Offer</strong> Get 10% instant discount on select credit cards. <span className="text-[#2874f0] cursor-pointer">T&C</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#388e3c] font-bold text-xs mt-0.5 flex-shrink-0">●</span>
                  <span><strong>Partner Offer</strong> Sign up for Flipkart Pay Later & get ₹100 gift voucher. <span className="text-[#2874f0] cursor-pointer">T&C</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#388e3c] font-bold text-xs mt-0.5 flex-shrink-0">●</span>
                  <span><strong>FREE Delivery</strong> on orders above ₹499.</span>
                </li>
              </ul>
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <h2 className="font-semibold text-[14px] text-[#212121] mb-2">Product Description</h2>
              <p className="text-[13px] text-[#212121] leading-relaxed">
                {product.description || 'No description available for this product.'}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <h2 className="font-semibold text-[14px] text-[#212121] mb-3">Specifications</h2>
                <table className="w-full text-[13px] border-collapse">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'}>
                        <td className="w-[38%] px-4 py-2.5 font-medium text-[#878787] border-b border-gray-100 align-top">{key}</td>
                        <td className="px-4 py-2.5 text-[#212121] border-b border-gray-100">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        {ctaButtons}
      </div>
    </PageContainer>
  );
};

export default ProductDetailPage;
