import PromoCard from './PromoCard';

const PromoShelf = ({
  title,
  items,
  onItemClick,
  variant = 'yellow',
  cardVariant = 'default',
  showArrow = false,
}) => {
  const isTeal = variant === 'teal';
  const isTrends = variant === 'trends';

  const wrapperClass = isTrends
    ? 'bg-white border-b-2 border-fk-yellow-shelf p-3 sm:p-4 shadow-sm'
    : isTeal
      ? 'bg-fk-teal-shelf shadow-sm'
      : 'bg-fk-yellow-shelf p-3 sm:p-4 shadow-sm relative overflow-hidden';

  const headerClass = isTeal
    ? 'flex items-center justify-between px-3 sm:px-4 py-3 text-white'
    : isTrends
      ? 'mb-3'
      : 'mb-3';

  return (
    <div className="fk-container mt-4 sm:mt-5">
      <div className={wrapperClass}>
        {!isTeal && !isTrends && (
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300/40 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        )}
        <div className={headerClass}>
          <h2
            className={`text-sm sm:text-base font-bold ${
              isTeal ? 'text-white uppercase tracking-wide' : 'text-flipkart-text'
            }`}
          >
            {title}
          </h2>
          {showArrow && isTeal && (
            <button
              type="button"
              className="bg-white text-fk-teal-shelf h-7 w-7 rounded-full flex items-center justify-center font-black text-sm hover:bg-gray-100"
              aria-label="View all"
            >
              &gt;
            </button>
          )}
        </div>
        <div
          className={`flex gap-2 sm:gap-3 overflow-x-auto scrollbar-none pb-1 ${
            isTeal ? 'px-3 sm:px-4 pb-3 sm:pb-4' : ''
          }`}
        >
          {items.map((item) => (
            <PromoCard
              key={item.label || item.tag}
              label={item.label || item.tag}
              offer={item.offer}
              image={item.image}
              productId={item.productId}
              variant={cardVariant}
              onClick={() => onItemClick(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoShelf;
