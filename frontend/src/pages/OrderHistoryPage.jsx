import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const OrderHistoryPage = () => {
  const navigate = useNavigate();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await api.get('/orders');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-[#878787] text-[14px] font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-red-500 text-[14px]">Error loading orders. Is the backend running?</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white shadow-sm p-12 text-center max-w-lg mx-auto">
          <svg className="h-20 w-20 text-gray-200 mx-auto mb-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h2 className="text-[20px] font-medium text-[#212121] mb-2">No orders yet!</h2>
          <p className="text-[#878787] mb-8 text-[14px]">Browse our amazing deals and place your first order.</p>
          <button
            id="orders-start-shopping"
            onClick={() => navigate('/')}
            className="bg-[#2874f0] text-white font-medium px-10 py-3 text-[14px] uppercase tracking-wide hover:bg-[#1a5dc7] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1248px] mx-auto px-4 sm:px-6 py-4">
      {/* Page heading */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-medium text-[#212121]">My Orders</h1>
        <span className="text-[12px] bg-[#f1f3f6] text-[#878787] px-3 py-1 font-semibold border border-gray-200">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </span>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const orderDate = new Date(order.placed_at).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'long', year: 'numeric',
          });
          const addr = order.shipping_address || {};

          return (
            <div
              key={order.id}
              className="bg-white shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Order header row */}
              <div className="bg-[#f1f3f6] px-5 py-3 flex flex-wrap justify-between items-center gap-x-6 gap-y-2 border-b border-gray-200">
                <div className="flex gap-8 text-[12px]">
                  <div>
                    <span className="text-[#878787] font-semibold uppercase tracking-wide block mb-0.5">ORDER PLACED</span>
                    <span className="text-[#212121] font-medium">{orderDate}</span>
                  </div>
                  <div>
                    <span className="text-[#878787] font-semibold uppercase tracking-wide block mb-0.5">TOTAL</span>
                    <span className="text-[#212121] font-medium">₹{parseFloat(order.total).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[#878787] font-semibold uppercase tracking-wide block mb-0.5">ORDER #</span>
                    <span className="text-[#212121] font-medium font-mono">{order.id}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 border ${
                  order.status === 'PLACED'
                    ? 'bg-green-50 text-[#388e3c] border-green-200'
                    : 'bg-blue-50 text-[#2874f0] border-blue-200'
                }`}>
                  ● {order.status}
                </span>
              </div>

              {/* Order items */}
              <div className="divide-y divide-gray-100">
                {Array.isArray(order.order_items) && order.order_items.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-5 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div
                      className="flex gap-4 cursor-pointer"
                      onClick={() => navigate(`/product/${item.product_id}`)}
                    >
                      <div className="w-[64px] h-[64px] flex items-center justify-center p-1 border border-gray-100 bg-white flex-shrink-0">
                        <img
                          src={item.image || 'https://via.placeholder.com/100'}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-normal text-[#212121] line-clamp-2 hover:text-[#2874f0] transition-colors leading-snug mb-1">
                          {item.name}
                        </h4>
                        <span className="text-[12px] text-[#878787]">
                          Qty: {item.quantity}  ·  {item.brand}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0 ml-[72px] sm:ml-0">
                      <span className="text-[15px] font-bold text-[#212121]">
                        ₹{parseFloat(item.price).toLocaleString('en-IN')}
                      </span>
                      <button
                        id={`buy-again-${item.product_id}`}
                        onClick={() => navigate(`/product/${item.product_id}`)}
                        className="text-[12px] font-semibold text-[#2874f0] hover:underline"
                      >
                        Buy it again
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping footer */}
              <div className="bg-gray-50/50 px-5 py-2.5 border-t border-gray-100 text-[12px] text-[#878787]">
                <span className="font-semibold text-[#212121]">Deliver to: </span>
                <span>{addr.name}</span>
                {addr.city && <span className="mx-1">·</span>}
                <span>{[addr.address, addr.locality, addr.city, addr.state, addr.pincode].filter(Boolean).join(', ')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
