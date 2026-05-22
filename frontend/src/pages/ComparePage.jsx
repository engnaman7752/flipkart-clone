import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import useCartStore from '../store/cartStore';

const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idsParam = searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',').map(Number) : [];
  const { addToCart } = useCartStore();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'compare', ids],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data.filter(p => ids.includes(p.id));
    },
    enabled: ids.length > 0,
  });

  const generateSpecs = (product) => {
    let specs = product.specifications;
    if (typeof specs === 'string') {
      try {
        specs = JSON.parse(specs);
      } catch (e) {
        specs = {};
      }
    }
    // Provide fallback basic specs if none are available in DB
    if (!specs || Object.keys(specs).length === 0) {
      if (product.category === 'Mobiles') {
        specs = {
          Display: '6.6 inch Full HD+',
          Camera: '50MP Rear, 13MP Front',
          Battery: '6000 mAh',
          Processor: 'Octa Core Processor',
          Warranty: '1 Year Manufacturer Warranty'
        };
      } else {
        specs = {
          'Brand Warranty': 'Yes',
          'Return Policy': '10 Days',
          'Delivery': 'Free',
          'Cash on Delivery': 'Available'
        };
      }
    }
    return specs;
  };

  const getSpecKeys = (productsList) => {
    const keys = new Set();
    productsList.forEach(p => {
      Object.keys(generateSpecs(p)).forEach(k => keys.add(k));
    });
    return Array.from(keys);
  };

  if (!ids.length) {
    return (
      <div className="bg-[#f1f3f6] min-h-screen py-12 px-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-medium text-[#212121] mb-4">No Products Selected</h2>
        <button onClick={() => navigate('/')} className="bg-[#2874f0] text-white px-8 py-3 rounded-sm shadow-sm font-medium">
          Browse Products
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-12 text-center text-[#878787]">Loading comparison...</div>;
  }

  const allSpecs = getSpecKeys(products || []);

  return (
    <div className="bg-[#f1f3f6] min-h-[calc(100vh-56px)] pt-4 pb-12">
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6">
        
        <div className="bg-white shadow-sm overflow-x-auto">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h1 className="text-[22px] font-medium text-[#212121]">Compare</h1>
            <span className="text-[14px] text-[#878787]">{products?.length || 0} items</span>
          </div>

          <table className="w-full text-left border-collapse min-w-[800px]">
            <tbody>
              {/* Image & Price Header Row */}
              <tr>
                <td className="w-[200px] border-r border-b border-gray-100 p-6 align-top">
                  <div className="text-[18px] text-[#878787] font-medium mt-8">Details</div>
                </td>
                {products?.map(product => {
                  const image = Array.isArray(product.images) ? product.images[0] : product.images;
                  const price = parseFloat(product.price);
                  return (
                    <td key={product.id} className="border-r border-b border-gray-100 p-6 align-top w-[250px]">
                      <div className="relative h-[200px] flex items-center justify-center p-4 mb-4 group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                        <img src={image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const newIds = ids.filter(id => id !== product.id);
                            if (newIds.length) {
                              navigate(`/compare?ids=${newIds.join(',')}`, { replace: true });
                            } else {
                              navigate('/');
                            }
                          }}
                          className="absolute top-0 right-0 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center text-lg"
                        >
                          ×
                        </button>
                      </div>
                      <h2 className="text-[16px] font-medium text-[#212121] hover:text-[#2874f0] cursor-pointer line-clamp-2 min-h-[48px]" onClick={() => navigate(`/product/${product.id}`)}>
                        {product.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-[#388e3c] text-white text-[12px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          {product.rating || 4.2} ★
                        </span>
                        <span className="text-[#878787] text-[12px]">({product.reviews || 8421})</span>
                      </div>
                      <div className="mt-3 text-[24px] font-medium text-[#212121]">
                        ₹{price.toLocaleString('en-IN')}
                      </div>
                      <button 
                        onClick={() => addToCart(product.id)}
                        className="w-full mt-4 bg-[#ff9f00] text-white py-2.5 font-medium uppercase text-[14px] shadow-sm hover:shadow-md"
                      >
                        Add to Cart
                      </button>
                    </td>
                  );
                })}
              </tr>

              {/* Specifications Rows */}
              {allSpecs.map((specKey, idx) => (
                <tr key={specKey} className={idx % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-white'}>
                  <td className="w-[200px] border-r border-b border-gray-100 p-4 text-[14px] text-[#878787]">
                    {specKey}
                  </td>
                  {products?.map(product => {
                    const specs = generateSpecs(product);
                    return (
                      <td key={product.id} className="border-r border-b border-gray-100 p-4 text-[14px] text-[#212121]">
                        {specs[specKey] || '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
