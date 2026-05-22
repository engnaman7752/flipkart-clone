import PromoImage from './PromoImage';

const PromoCard = ({ label, offer, image, productId, onClick, variant = 'default' }) => {
  if (variant === 'trend') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={!productId}
        className="flex-shrink-0 w-[110px] sm:w-[130px] sm:flex-1 bg-white rounded-sm overflow-hidden text-left disabled:opacity-60 product-card"
      >
        <div className="relative aspect-square bg-[#f5f5f5] p-2 flex items-center justify-center">
          <PromoImage
            src={image}
            alt={label}
            productId={productId}
            className="max-h-full max-w-full object-contain"
          />
          <span className="absolute bottom-0 left-0 right-0 bg-fk-yellow-shelf text-flipkart-text text-[10px] sm:text-xs font-bold text-center py-1 px-1 truncate">
            {label}
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!productId}
      className="flex-shrink-0 w-[110px] sm:w-[130px] sm:flex-1 bg-white rounded-sm p-1.5 sm:p-2 text-left disabled:opacity-60 product-card"
    >
      <div className="aspect-square bg-[#f5f5f5] rounded-md flex items-center justify-center p-2 mb-2 overflow-hidden">
        <PromoImage
          src={image}
          alt={label}
          productId={productId}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <p className="text-[10px] sm:text-[11px] text-flipkart-muted truncate">{label}</p>
      <p className="text-[11px] sm:text-xs font-bold text-flipkart-text truncate">{offer}</p>
    </button>
  );
};

export default PromoCard;
