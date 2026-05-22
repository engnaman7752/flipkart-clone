const RatingBadge = ({ rating, count, size = 'sm', className = '' }) => {
  // Pick bg color based on rating — Flipkart convention
  const bgColor =
    rating >= 4 ? '#388e3c'   // green
    : rating >= 3 ? '#ff9f00' // amber
    : '#f44336';              // red

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-[11px] px-2 py-0.5',
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <span
        className={`${sizeClasses[size]} font-bold rounded-sm inline-flex items-center gap-0.5 text-white`}
        style={{ backgroundColor: bgColor }}
      >
        {parseFloat(rating).toFixed(1)}
        <span className="text-[9px]">★</span>
      </span>
      {count != null && (
        <span className="text-[11px] text-[#878787] font-normal">
          ({Number(count).toLocaleString('en-IN')})
        </span>
      )}
    </div>
  );
};

export default RatingBadge;
