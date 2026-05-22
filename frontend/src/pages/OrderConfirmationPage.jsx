import { useParams, useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const emailPreviewUrl = location.state?.emailPreviewUrl;

  return (
    <div className="max-w-[1248px] mx-auto px-4 sm:px-6 py-8">
      <div className="max-w-[480px] mx-auto">
        <div className="bg-white shadow-sm">

          {/* Green success header bar */}
          <div className="bg-[#388e3c] px-6 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#388e3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-[14px] leading-tight">Order Confirmed!</p>
              <p className="text-green-100 text-[12px]">Your order has been placed successfully.</p>
            </div>
          </div>

          {/* Order details */}
          <div className="px-6 py-5">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-[12px] font-semibold text-[#878787] uppercase tracking-wide">Order ID</span>
              <span className="text-[14px] font-bold text-[#212121] font-mono">#{orderId}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-[12px] font-semibold text-[#878787] uppercase tracking-wide">Payment</span>
              <span className="text-[13px] font-semibold text-[#388e3c]">Cash on Delivery</span>
            </div>
            <div className="py-3 border-b border-gray-100">
              <span className="text-[12px] font-semibold text-[#878787] uppercase tracking-wide">Estimated Delivery</span>
              <p className="text-[13px] text-[#212121] mt-0.5">3–5 Business Days</p>
            </div>
            <p className="text-[11px] text-[#878787] mt-3 leading-relaxed">
              You will receive updates on your registered phone number as your order is processed and shipped.
            </p>
          </div>

          {/* Email Notification Alert */}
          {emailPreviewUrl && (
            <div className="mx-6 mb-5 bg-[#f0f5ff] border border-[#d6e4ff] rounded-sm p-4 flex gap-4 items-start">
              <div className="text-[#2874f0] mt-0.5 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#212121] mb-1">Email Receipt Sent!</p>
                <p className="text-[12px] text-[#424242]">We've sent a detailed order confirmation and receipt to your registered email address.</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="px-6 pb-6 flex flex-col gap-3">
            <button
              type="button"
              id="order-confirm-continue-shopping"
              onClick={() => navigate('/')}
              className="w-full bg-[#fb641b] hover:bg-[#e05615] text-white font-bold py-3.5 text-[14px] uppercase tracking-wide transition-colors"
            >
              Continue Shopping
            </button>
            <button
              type="button"
              id="order-confirm-view-orders"
              onClick={() => navigate('/orders')}
              className="w-full border border-[#2874f0] text-[#2874f0] font-bold py-3.5 text-[13px] uppercase tracking-wide hover:bg-[#f0f5ff] transition-colors"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
