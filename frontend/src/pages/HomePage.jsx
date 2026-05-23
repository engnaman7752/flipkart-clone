import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import useCartStore from '../store/cartStore';
import CategoryStrip from '../components/home/CategoryStrip';
import CategorySubNav from '../components/home/CategorySubNav';
import ForYouContent from '../components/home/ForYouContent';
import SearchResultsLayout from '../components/search/SearchResultsLayout';

const scrollToProducts = () => {
  setTimeout(() => {
    document.getElementById('products-grid-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
};

const HomePage = () => {
  const navigate = useNavigate();
  const { searchQuery, categoryFilter, setCategoryFilter, setSearchQuery } = useCartStore();
  const isForYou = !categoryFilter && !searchQuery;

  const { data: allProducts, isLoading: forYouLoading } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
    enabled: isForYou,
  });

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', searchQuery, categoryFilter],
    queryFn: async () => {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (categoryFilter) params.category = categoryFilter;
      const res = await api.get('/products', { params });
      return res.data;
    },
    enabled: !isForYou,
  });

  const handleProductClick = (productId) => {
    if (productId) navigate(`/product/${productId}`);
  };

  const handlePromoClick = (promo) => {
    if (!promo) return;
    if (typeof promo === 'string' || typeof promo === 'number') {
      navigate(`/product/${promo}`);
      return;
    }
    if (promo.isDirectProduct && promo.productId) {
      navigate(`/product/${promo.productId}`);
      return;
    }
    if (promo.categoryFilter) setCategoryFilter(promo.categoryFilter);
    else setCategoryFilter('');

    if (promo.searchQuery) setSearchQuery(promo.searchQuery);
    else if (promo.match?.brand) setSearchQuery(promo.match.brand);
    else if (promo.match?.nameMatch) setSearchQuery(promo.match.nameMatch);
    else setSearchQuery('');

    scrollToProducts();
  };

  const handleCategorySelect = (filter) => {
    if (categoryFilter === filter) {
      setCategoryFilter('');
      setSearchQuery('');
    } else {
      setCategoryFilter(filter);
      setSearchQuery('');
    }
    if (filter) scrollToProducts();
  };

  return (
    <div className="bg-flipkart-light min-h-screen pb-12">
      <CategoryStrip categoryFilter={categoryFilter} onSelect={handleCategorySelect} />
      <CategorySubNav categoryFilter={categoryFilter} />

      {isForYou ? (
        forYouLoading ? (
          <div className="p-8 text-center mt-8 text-flipkart-muted font-medium">Loading...</div>
        ) : (
          <ForYouContent products={allProducts} onPromoClick={handlePromoClick} onProductClick={handleProductClick} />
        )
      ) : (
        <>
          {isLoading && (
            <div className="p-8 text-center mt-8 text-flipkart-muted font-medium">Loading products...</div>
          )}
          {error && (
            <div className="p-8 text-center text-red-500 mt-8">Error loading products. Is the backend running?</div>
          )}
          {!isLoading && !error && (
            <SearchResultsLayout
              products={products}
              categoryFilter={categoryFilter}
              searchQuery={searchQuery}
              onClearFilters={() => {
                setCategoryFilter('');
                setSearchQuery('');
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
