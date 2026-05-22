import PromoImage from './PromoImage';

const DealPromoCards = ({ deals, onDealClick }) => (
  <div className="fk-container mt-3 sm:mt-4">
    <div className="max-w-3xl mx-auto grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
      {deals.map((deal) => (
        <button
          key={deal.caption}
          type="button"
          onClick={() => onDealClick(deal)}
          disabled={!deal.productId}
          className="text-left group disabled:opacity-60 product-card bg-white rounded-sm overflow-hidden"
        >
          <div className="relative">
            <span className="absolute top-1.5 right-1.5 z-10 text-[9px] text-gray-500 bg-white/90 px-1 rounded-sm font-medium">
              AD
            </span>
            <div className="relative aspect-square bg-[#f8f8f8] overflow-hidden">
              <PromoImage
                src={deal.image}
                alt={deal.caption}
                productId={deal.productId}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-fk-deal-green text-white text-[10px] sm:text-[11px] font-bold text-center py-1.5 px-1">
                {deal.offer}
              </div>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs font-medium text-flipkart-text mt-1.5 text-center truncate px-0.5">
            {deal.caption}
          </p>
        </button>
      ))}
    </div>
  </div>
);

export default DealPromoCards;
