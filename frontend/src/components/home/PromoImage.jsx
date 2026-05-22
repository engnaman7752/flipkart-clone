import { useState, useEffect } from 'react';

const fallbackSrc = (productId) =>
  `https://picsum.photos/seed/fk-${productId || 'promo'}/400/400`;

const PromoImage = ({ src, alt, productId, className = '' }) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc(productId));

  useEffect(() => {
    setImgSrc(src || fallbackSrc(productId));
  }, [src, productId]);

  const handleError = () => {
    setImgSrc(fallbackSrc(productId));
  };

  return (
    <img
      src={imgSrc}
      alt={alt || 'Product'}
      loading="lazy"
      onError={handleError}
      className={className}
    />
  );
};

export default PromoImage;
