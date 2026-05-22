import React, { useState, useEffect, useRef, useCallback } from 'react';
import PromoImage from './PromoImage';

const HeroPeekCarousel = ({ slides, onSlideClick }) => {
  const [current, setCurrent] = useState(1);
  const intervalRef = useRef(null);
  const n = slides?.length || 0;

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (n <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % n);
    }, 4000);
  }, [n]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const goTo = (idx) => {
    setCurrent(idx);
    startAutoPlay();
  };

  if (!slides?.length) return null;

  return (
    <div className="fk-container mt-3">
      <div className="relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px]">
        <div className="relative w-full h-full overflow-hidden px-1">
          {slides.map((slide, idx) => {
            const diff = (idx - current + n) % n;
            const isActive = diff === 0;
            const isNext = diff === 1;
            const isPrev = diff === n - 1;

            let positionClass = '';
            if (isActive) {
              positionClass = 'left-[50%] -translate-x-1/2 w-[65%] sm:w-[58%] h-[92%] sm:h-[95%] z-20 opacity-100';
            } else if (isNext) {
              positionClass = 'left-[90%] sm:left-[88%] md:left-[85%] -translate-x-1/2 w-[25%] sm:w-[22%] md:w-[20%] h-[75%] sm:h-[80%] z-10 opacity-90 hover:opacity-100';
            } else if (isPrev) {
              positionClass = 'left-[10%] sm:left-[12%] md:left-[15%] -translate-x-1/2 w-[25%] sm:w-[22%] md:w-[20%] h-[75%] sm:h-[80%] z-10 opacity-90 hover:opacity-100';
            } else {
              if (diff > 1 && diff <= Math.floor(n / 2)) {
                positionClass = 'left-[130%] -translate-x-1/2 w-[20%] h-[80%] z-0 opacity-0 pointer-events-none';
              } else {
                positionClass = 'left-[-30%] -translate-x-1/2 w-[20%] h-[80%] z-0 opacity-0 pointer-events-none';
              }
            }

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  if (isActive) {
                    slide.productId ? onSlideClick(slide.productId) : onSlideClick(slide);
                  } else if (isNext) {
                    goTo((current + 1) % n);
                  } else if (isPrev) {
                    goTo((current - 1 + n) % n);
                  }
                }}
                disabled={!slide.productId && isActive}
                className={`absolute top-1/2 -translate-y-1/2 rounded-sm overflow-hidden shadow-md transition-all duration-500 ease-out ${slide.bgClass} ${positionClass} ${!slide.productId && isActive ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <PromoImage
                  src={slide.image}
                  alt={slide.title}
                  productId={slide.productId}
                  className="absolute right-0 top-0 h-full w-[55%] object-cover"
                />
                <div className="relative z-10 h-full flex flex-col justify-end p-2.5 sm:p-4 text-left max-w-[58%]">
                  {slide.badge && (
                    <span
                      className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-wider mb-0.5 ${
                        slide.id === 'daikin' ? 'text-sky-700' : 'text-white/90'
                      }`}
                    >
                      {slide.badge}
                    </span>
                  )}
                  <h3
                    className={`font-extrabold leading-tight ${
                      slide.id === 'daikin'
                        ? 'text-sky-900 text-xs sm:text-base md:text-lg'
                        : 'text-white text-[10px] sm:text-sm'
                    }`}
                  >
                    {slide.title}
                  </h3>
                  {slide.subtitle && isActive && (
                    <p
                      className={`text-[8px] sm:text-[10px] mt-0.5 line-clamp-2 ${
                        slide.id === 'daikin' ? 'text-sky-800' : 'text-white/75'
                      }`}
                    >
                      {slide.subtitle}
                    </p>
                  )}
                  {isActive && (
                    <p
                      className={`text-[9px] sm:text-xs font-bold mt-1 ${
                        slide.id === 'daikin' ? 'text-sky-900' : 'text-flipkart-yellow'
                      }`}
                    >
                      {slide.price}
                    </p>
                  )}
                </div>
                {isActive && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          goTo(i);
                        }}
                        className={`rounded-full transition-all ${
                          i === current ? 'w-2 h-2 bg-white shadow' : 'w-1.5 h-1.5 bg-white/50'
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => goTo((current - 1 + n) % n)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow text-gray-700 hover:bg-white text-lg leading-none"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => goTo((current + 1) % n)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow text-gray-700 hover:bg-white text-lg leading-none"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default HeroPeekCarousel;
