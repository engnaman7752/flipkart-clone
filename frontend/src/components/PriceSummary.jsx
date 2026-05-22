const PriceSummary = ({
  itemCount,
  totalMRP,
  totalPrice,
  discount,
  sticky = true,
  actionLabel,
  onAction,
  actionDisabled = false,
  showSavings = true,
}) => {
  const deliveryFree = true;

  return (
    <div className={`bg-white shadow-sm w-full md:w-[340px] flex-shrink-0 ${sticky ? 'md:sticky md:top-[72px]' : ''}`}>
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-100">
        <span className="text-xs font-semibold text-[#878787] uppercase tracking-widest">Price Details</span>
      </div>

      {/* Rows */}
      <div className="px-5 py-4 space-y-3 text-[14px] text-[#212121]">
        <div className="flex justify-between">
          <span>Price ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span>₹{(totalMRP ?? totalPrice).toLocaleString('en-IN')}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-[#388e3c]">
            <span>Discount</span>
            <span>− ₹{Math.round(discount).toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span className="text-[#388e3c] font-medium">{deliveryFree ? 'FREE' : '₹40'}</span>
        </div>

        {/* Dashed separator */}
        <div className="border-t border-dashed border-gray-200 !mt-4 !pt-3 flex justify-between font-bold text-[16px]">
          <span>Total Amount</span>
          <span>₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
        </div>

        {showSavings && discount > 0 && (
          <p className="text-[#388e3c] font-semibold text-[13px] pt-1 border-t border-gray-100">
            You will save ₹{Math.round(discount).toLocaleString('en-IN')} on this order
          </p>
        )}

        {actionLabel && onAction && (
          <button
            type="button"
            id="price-summary-action"
            onClick={onAction}
            disabled={actionDisabled}
            className="w-full bg-[#fb641b] hover:bg-[#e05615] text-white font-bold py-3.5 text-[14px] uppercase tracking-wide mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLabel}
          </button>
        )}
      </div>

      {/* Safe-purchase banner */}
      <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-[#388e3c] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
        <span className="text-[12px] text-[#878787]">Safe and Secure Payments. Easy returns.</span>
      </div>
    </div>
  );
};

export default PriceSummary;
