import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import LoginPopup from './LoginPopup';
import ImageSearchModal from './ImageSearchModal';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, fetchCart, searchQuery, setSearchQuery, wishlist } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);

  const loginRef = useRef(null);
  const moreRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setShowMoreDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleImageSearch = (keyword) => {
    setSearchQuery(keyword);
    if (location.pathname !== '/') navigate('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 shadow-md">
      {/* ── Top bar: Flipkart blue gradient ── */}
      <div className="bg-[#2874f0] w-full">
        <div className="max-w-[1248px] mx-auto px-4 sm:px-6 flex items-center h-14 gap-2 sm:gap-4">

          {/* Logo + tagline */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-start mr-2 sm:mr-4 select-none">
            <span className="text-white font-black text-xl leading-tight tracking-tight italic">
              Flipkart
            </span>
            <span className="text-[10px] font-medium italic" style={{ color: '#ffe11b' }}>
              Explore&nbsp;<span className="text-white font-bold">Plus</span>
              &nbsp;<img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
                alt=""
                className="inline w-3 h-3 -mt-0.5"
              />
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex-grow max-w-[640px] relative min-w-0 flex items-center gap-1">
            <div className="relative flex-1">
            <input
              type="text"
              id="navbar-search"
              placeholder="Search for Products, Brands and More"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full h-9 pl-4 pr-10 rounded-sm outline-none text-[13px] bg-white text-gray-800 placeholder-gray-400 font-medium"
            />
            <button
              type="button"
              aria-label="Search"
              className="absolute right-0 top-0 h-9 w-10 bg-white flex items-center justify-center rounded-r-sm border-l border-gray-200"
            >
              <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            </div>
            {/* Camera / Image Search button */}
            <button
              type="button"
              aria-label="Search by image"
              title="Search by image"
              onClick={() => setShowImageSearch(true)}
              className="flex-shrink-0 h-9 w-9 bg-white/20 hover:bg-white/30 flex items-center justify-center rounded-sm transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto flex-shrink-0">

            {/* Login */}
            <div
              className="relative"
              ref={loginRef}
              onMouseEnter={() => setShowLoginDropdown(true)}
              onMouseLeave={() => setShowLoginDropdown(false)}
              onClick={() => setShowLoginDropdown(!showLoginDropdown)}
            >
              {isAuthenticated ? (
                <div className="text-white font-semibold text-sm hover:bg-white/20 px-4 py-1.5 rounded-sm transition-colors flex items-center gap-1 cursor-pointer">
                  {user?.name?.split(' ')[0]}
                  <svg className="w-3 h-3 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsLoginPopupOpen(true)}
                  className="font-semibold text-sm bg-white text-[#2874f0] px-10 py-1.5 rounded-sm transition-colors flex items-center gap-1 shadow hover:shadow-lg"
                >
                  Login
                </button>
              )}
              {showLoginDropdown && isAuthenticated && (
                <div className="absolute right-0 top-full mt-0 bg-white shadow-xl border border-gray-100 w-64 z-50 rounded-b-sm">
                  <div className="px-4 py-3">
                    <span className="text-[14px] text-[#212121] font-semibold">Your Account</span>
                  </div>
                  
                  <Link to="/profile" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    My Profile
                  </Link>

                  <Link to="/orders" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    Orders
                  </Link>

                  <Link to="/coupons" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                    Coupons
                  </Link>

                  <Link to="/supercoin" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Supercoin
                  </Link>

                  <Link to="/plus-zone" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    Flipkart Plus Zone
                  </Link>

                  <Link to="/saved-cards" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    Saved Cards & Wallet
                  </Link>

                  <Link to="/saved-addresses" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Saved Addresses
                  </Link>

                  <Link to="/wishlist" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Wishlist {wishlist?.length > 0 && <span className="ml-auto text-[11px] bg-[#ff6161] text-white rounded-full px-1.5">{wishlist.length}</span>}
                  </Link>

                  <Link to="/gift-cards" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                    Gift Cards
                  </Link>

                  <Link to="/notifications" className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    Notifications
                  </Link>

                  <button onClick={() => logout()} className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#2874f0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* More dropdown */}
            <div
              className="relative hidden md:block"
              ref={moreRef}
              onMouseEnter={() => setShowMoreDropdown(true)}
              onMouseLeave={() => setShowMoreDropdown(false)}
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
            >
              <button
                type="button"
                id="navbar-more-btn"
                className="text-white font-semibold text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1"
              >
                More
                <svg className={`w-3 h-3 opacity-80 transition-transform ${showMoreDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showMoreDropdown && (
                <div className="absolute right-0 top-full mt-0 bg-white shadow-xl border border-gray-100 w-64 z-50 rounded-b-sm">
                  <div className="px-4 py-3">
                    <span className="text-[14px] text-[#212121] font-semibold">More</span>
                  </div>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-4 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#212121]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" /></svg>
                    Become a Seller
                  </button>
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-4 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#212121]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" /></svg>
                    Notification Settings
                  </button>
                  <button type="button" className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-4 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#212121]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" /></svg>
                    24x7 Customer Care
                  </button>
                  <button type="button" className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-4 text-[13px] text-[#212121]">
                    <svg className="w-4 h-4 text-[#212121]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                    Advertise on Flipkart
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              id="navbar-cart-link"
              className="text-white font-semibold text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5"
            >
              <div className="relative">
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45C5.16 14.57 5 15.02 5 15.5c0 1.1.9 2 2 2h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.46 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[9px] rounded-full h-[16px] w-[16px] flex items-center justify-center font-bold leading-none">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>
      </div>
      <LoginPopup isOpen={isLoginPopupOpen} onClose={() => setIsLoginPopupOpen(false)} />
      <ImageSearchModal
        isOpen={showImageSearch}
        onClose={() => setShowImageSearch(false)}
        onSearch={handleImageSearch}
      />
    </header>
  );
};

export default Navbar;
