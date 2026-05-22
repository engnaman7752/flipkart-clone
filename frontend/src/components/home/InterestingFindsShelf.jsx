import PromoCard from './PromoCard';

const InterestingFindsShelf = ({ items, onItemClick }) => (
  <div className="fk-container mt-4 sm:mt-5">
    <div className="bg-fk-yellow-shelf rounded-xl p-3 sm:p-4 shadow-sm">
      <h2 className="text-sm sm:text-base font-bold text-flipkart-text mb-3">
        Interesting finds
      </h2>
      <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-none">
        {items.map((item) => (
          <PromoCard
            key={item.label}
            label={item.label}
            offer={item.offer}
            image={item.image}
            productId={item.productId}
            onClick={() => onItemClick(item)}
            disabled={!item.productId}
          />
        ))}
      </div>
    </div>
  </div>
);

export default InterestingFindsShelf;
