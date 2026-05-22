import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import api from '../api/api';
import PageContainer from '../components/PageContainer';
import PriceSummary from '../components/PriceSummary';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, fetchCart, clearCartLocal, showToast } = useCartStore();
  const { user } = useAuthStore();
  
  const [isPending, setIsPending] = useState(false);
  const [addressType, setAddressType] = useState('HOME');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('new');
  
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    if (!user) return;
    const fetchAddresses = async () => {
      try {
        const res = await api.get('/users/addresses');
        setSavedAddresses(res.data);
        if (res.data && res.data.length > 0) {
          const defaultAddr = res.data.find(a => a.is_default) || res.data[0];
          setSelectedAddressId(defaultAddr.id);
          setAddress(defaultAddr);
          setAddressType(defaultAddr.type || 'HOME');
        }
      } catch (err) {
        console.error('Failed to fetch addresses', err);
      }
    };
    fetchAddresses();
  }, [user]);

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
    if (id === 'new') {
      setAddress({ name: user?.name || '', phone: '', pincode: '', locality: '', address: '', city: '', state: '' });
      setAddressType('HOME');
    } else {
      const addr = savedAddresses.find(a => a.id === id);
      if (addr) {
        setAddress(addr);
        setAddressType(addr.type || 'HOME');
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <PageContainer className="text-center">
        <div className="bg-white shadow-sm p-12 text-center">
          <h2 className="text-[18px] font-medium text-[#212121] mb-4">No items to checkout.</h2>
          <button
            type="button"
            id="checkout-go-shop"
            onClick={() => navigate('/')}
            className="bg-[#2874f0] text-white font-medium px-8 py-3 text-[14px] uppercase hover:bg-[#1a5dc7] transition-colors"
          >
            Go Shop
          </button>
        </div>
      </PageContainer>
    );
  }

  const totalMRP = cartItems.reduce((acc, item) => acc + parseFloat(item.mrp) * item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  const discount = totalMRP - totalPrice;
  const itemCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handlePlaceOrder = async () => {
    setIsPending(true);
    try {
      // If selected address is new, save it first optionally?
      // Actually, we can just pass the address object directly as shippingAddress.
      // And we can even trigger api.post('/users/addresses', {...address, type: addressType}) in the background.
      
      let finalAddress = { ...address, type: addressType };
      
      if (selectedAddressId === 'new') {
        try {
           const newAddrRes = await api.post('/users/addresses', finalAddress);
           finalAddress = newAddrRes.data;
        } catch (e) {
           console.error('Failed to auto-save new address', e);
        }
      }

      const res = await api.post('/orders', {
        orderItems: cartItems,
        shippingAddress: finalAddress,
        subtotal: totalPrice,
        total: totalPrice,
      });
      clearCartLocal();
      navigate(`/order-confirmation/${res.data.orderId}`, { 
        replace: true,
        state: { emailPreviewUrl: res.data.emailPreviewUrl } 
      });
    } catch (err) {
      console.error('Failed to place order:', err);
      showToast('Failed to place order. Please try again.', 'error');
    } finally {
      setIsPending(false);
    }
  };

  const inputClass =
    'border border-gray-300 p-2.5 outline-none bg-white text-[13px] font-normal text-[#212121] focus:border-[#2874f0] transition-colors w-full rounded-sm';

  return (
    <PageContainer className="max-w-[1000px]">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-1 space-y-3 w-full">

          {/* Step 1 — Login */}
          <div className="bg-white shadow-sm flex items-stretch">
            <div className="bg-gray-50 px-5 flex items-center justify-center border-r border-gray-100">
              <span className="text-[#878787] font-bold text-[13px]">1</span>
            </div>
            <div className="px-5 py-4 flex-1">
              <div className="flex items-center gap-3 mb-0.5">
                <span className="text-[12px] font-bold text-[#878787] uppercase tracking-widest">Login</span>
                <svg className="w-4 h-4 text-[#388e3c]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-[14px] font-semibold text-[#212121]">
                {user?.name || 'Guest User'} <span className="ml-2 font-normal text-[#878787] text-[13px]">{user?.email || ''}</span>
              </div>
            </div>
          </div>

          {/* Step 2 — Delivery Address */}
          <div className="bg-white shadow-sm overflow-hidden">
            <div className="bg-[#2874f0] flex items-center h-12 px-5 gap-3">
              <span className="bg-white text-[#2874f0] font-bold w-5 h-5 flex items-center justify-center rounded-sm text-xs flex-shrink-0">2</span>
              <h2 className="text-white font-bold text-[12px] uppercase tracking-widest">Delivery Address</h2>
            </div>

            <div className="bg-[#f5faff] p-5 sm:p-6 border-t border-blue-50">
              {savedAddresses.length > 0 && (
                <div className="mb-6 space-y-3">
                  {savedAddresses.map(addr => (
                    <label key={addr.id} className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${selectedAddressId === addr.id ? 'border-[#2874f0] bg-blue-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="radio" name="addressSelect" checked={selectedAddressId === addr.id} onChange={() => handleAddressSelect(addr.id)} className="mt-1 accent-[#2874f0]" />
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-[14px] text-[#212121]">{addr.name}</span>
                          <span className="bg-gray-200 text-[#878787] text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase">{addr.type}</span>
                          <span className="font-semibold text-[14px] text-[#212121]">{addr.phone}</span>
                        </div>
                        <p className="text-[14px] text-[#212121]">
                          {addr.address}, {addr.locality}, {addr.city}, {addr.state} - <span className="font-semibold">{addr.pincode}</span>
                        </p>
                      </div>
                    </label>
                  ))}
                  
                  <label className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${selectedAddressId === 'new' ? 'border-[#2874f0] bg-blue-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="addressSelect" checked={selectedAddressId === 'new'} onChange={() => handleAddressSelect('new')} className="accent-[#2874f0]" />
                    <span className="font-medium text-[14px] text-[#2874f0]">Add a new address</span>
                  </label>
                </div>
              )}

              {selectedAddressId === 'new' && (
                <>
                  <div className="flex gap-2 mb-5">
                    {['HOME', 'WORK'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        id={`addr-type-${type.toLowerCase()}`}
                        onClick={() => setAddressType(type)}
                        className={`text-[12px] font-bold px-5 py-2 border transition-colors ${
                          addressType === type
                            ? 'border-[#2874f0] text-[#2874f0] bg-white'
                            : 'border-gray-300 text-[#878787] bg-white hover:border-gray-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <form className="space-y-4 max-w-lg" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#878787] uppercase tracking-wide mb-1.5">Full Name</label>
                        <input type="text" name="name" value={address.name} onChange={handleAddressChange} className={inputClass} placeholder="Enter full name" required />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#878787] uppercase tracking-wide mb-1.5">10-digit Mobile Number</label>
                        <input type="text" name="phone" value={address.phone} onChange={handleAddressChange} className={inputClass} placeholder="Phone number" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#878787] uppercase tracking-wide mb-1.5">Pincode</label>
                        <input type="text" name="pincode" value={address.pincode} onChange={handleAddressChange} className={inputClass} placeholder="6-digit Pincode" required />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#878787] uppercase tracking-wide mb-1.5">Locality</label>
                        <input type="text" name="locality" value={address.locality} onChange={handleAddressChange} className={inputClass} placeholder="Locality or Town" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#878787] uppercase tracking-wide mb-1.5">Address (Area and Street)</label>
                      <textarea name="address" value={address.address} onChange={handleAddressChange} className={`${inputClass} h-[72px] resize-none`} placeholder="House No., Building, Street" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#878787] uppercase tracking-wide mb-1.5">City / District / Town</label>
                        <input type="text" name="city" value={address.city} onChange={handleAddressChange} className={inputClass} required />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#878787] uppercase tracking-wide mb-1.5">State</label>
                        <input type="text" name="state" value={address.state} onChange={handleAddressChange} className={inputClass} required />
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Step 3 — Order Summary */}
          <div className="bg-white shadow-sm overflow-hidden">
            <div className="bg-[#2874f0] flex items-center h-12 px-5 gap-3">
              <span className="bg-white text-[#2874f0] font-bold w-5 h-5 flex items-center justify-center rounded-sm text-xs flex-shrink-0">3</span>
              <h2 className="text-white font-bold text-[12px] uppercase tracking-widest">Order Summary</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.product_id} className="px-5 py-4 flex gap-4 items-center">
                  <div className="w-[52px] h-[52px] flex items-center justify-center p-1 border border-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-normal text-[#212121] line-clamp-1">{item.name}</h3>
                    <div className="text-[12px] text-[#878787] mt-0.5">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-[14px] font-bold text-[#212121] flex-shrink-0">
                    ₹{(parseFloat(item.price) * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PriceSummary
          itemCount={itemCount}
          totalMRP={totalMRP}
          totalPrice={totalPrice}
          discount={discount}
          showSavings={false}
          actionLabel={isPending ? 'Processing...' : 'PLACE ORDER'}
          onAction={handlePlaceOrder}
          actionDisabled={isPending}
        />
      </div>
    </PageContainer>
  );
};

export default CheckoutPage;
