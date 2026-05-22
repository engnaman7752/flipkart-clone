import { useMemo } from 'react';
import HeroPeekCarousel from './HeroPeekCarousel';
import DealPromoCards from './DealPromoCards';
import InterestingFindsShelf from './InterestingFindsShelf';
import PromoShelf from './PromoShelf';
import BrandSpotlight from './BrandSpotlight';
import { enrichPromoList } from '../../utils/resolvePromoProduct';
import {
  HERO_SLIDES,
  DEAL_PROMOS,
  INTERESTING_FINDS,
  GRAB_OR_GONE,
  BRANDS_SPOTLIGHT,
  TRENDS,
  SHOP_COOL_SUMMER,
  APPLIANCE_COOL_SUMMER,
  FESTIVE_FASHION,
  HOME_UPGRADES,
} from '../../config/forYouContent';

const ForYouContent = ({ products, onPromoClick }) => {
  const heroSlides = useMemo(() => enrichPromoList(HERO_SLIDES, products), [products]);
  const dealPromos = useMemo(() => enrichPromoList(DEAL_PROMOS, products), [products]);
  const interestingFinds = useMemo(() => enrichPromoList(INTERESTING_FINDS, products), [products]);
  const grabOrGone = useMemo(() => enrichPromoList(GRAB_OR_GONE, products), [products]);
  const brandsSpotlight = useMemo(() => enrichPromoList(BRANDS_SPOTLIGHT, products), [products]);
  const trends = useMemo(() => enrichPromoList(TRENDS, products), [products]);
  const shopSummer = useMemo(() => enrichPromoList(SHOP_COOL_SUMMER, products), [products]);
  const applianceSummer = useMemo(() => enrichPromoList(APPLIANCE_COOL_SUMMER, products), [products]);
  const festiveFashion = useMemo(() => enrichPromoList(FESTIVE_FASHION, products), [products]);
  const homeUpgrades = useMemo(() => enrichPromoList(HOME_UPGRADES, products), [products]);

  const handleClick = (promo) => {
    if (promo) onPromoClick(promo);
  };

  if (!products?.length) {
    return (
      <div className="fk-container py-12 text-center text-flipkart-muted text-sm">
        Loading recommendations...
      </div>
    );
  }

  return (
    <div className="pb-8">
      <HeroPeekCarousel slides={heroSlides} onSlideClick={handleClick} />
      <DealPromoCards deals={dealPromos} onDealClick={handleClick} />
      <InterestingFindsShelf items={interestingFinds} onItemClick={handleClick} />
      <PromoShelf
        title="Grab or gone"
        items={grabOrGone}
        variant="yellow"
        onItemClick={handleClick}
      />
      <BrandSpotlight items={brandsSpotlight} onBrandClick={handleClick} />
      <PromoShelf
        title="Trends you may like"
        items={trends}
        variant="trends"
        cardVariant="trend"
        onItemClick={handleClick}
      />
      <PromoShelf
        title="Shop for a Cool Summer"
        items={shopSummer}
        variant="teal"
        showArrow
        onItemClick={handleClick}
      />
      <PromoShelf
        title="Appliance for Cool Summer"
        items={applianceSummer}
        variant="teal"
        showArrow
        onItemClick={handleClick}
      />
      <PromoShelf
        title="Festive Fashion Picks"
        items={festiveFashion}
        variant="yellow"
        showArrow
        onItemClick={handleClick}
      />
      <PromoShelf
        title="Home & Furniture Upgrades"
        items={homeUpgrades}
        variant="teal"
        showArrow
        onItemClick={handleClick}
      />
    </div>
  );
};

export default ForYouContent;
