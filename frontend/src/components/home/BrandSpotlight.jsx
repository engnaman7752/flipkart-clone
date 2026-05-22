import PromoImage from './PromoImage';

const BrandSpotlight = ({ items, onBrandClick }) => (
  <div className="fk-container mt-4 sm:mt-5">
    <h2 className="text-sm sm:text-base font-bold text-flipkart-text mb-3 px-0.5">
      Brands in Spotlight
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {items.map((item) => (
        <button
          key={item.brand}
          type="button"
          onClick={() => onBrandClick(item)}
          disabled={!item.productId}
          className="bg-white rounded-sm overflow-hidden text-left disabled:opacity-60 product-card"
        >
          <div className="relative aspect-[4/3] bg-[#f5f5f5] overflow-hidden">
            <span className="absolute top-2 left-2 z-10 text-[10px] sm:text-xs font-black text-flipkart-text uppercase tracking-tight">
              {item.brand}
            </span>
            <span className="absolute top-2 right-2 z-10 text-[9px] text-gray-500 bg-white/80 px-1 rounded-sm">
              AD
            </span>
            <PromoImage
              src={item.image}
              alt={item.brand}
              productId={item.productId}
              className="w-full h-full object-cover object-center pt-6"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-fk-yellow-shelf text-flipkart-text text-[10px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow-sm">
              {item.offer}
            </span>
          </div>
          <p className="text-[11px] text-flipkart-text px-2 py-2 truncate">{item.description}</p>
        </button>
      ))}
    </div>
  </div>
);

export default BrandSpotlight;
