import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import CategoryIcon from '../components/home/CategoryIcon';
import LoginPopup from '../components/LoginPopup';
import ImageSearchModal from '../components/ImageSearchModal';
import SearchResultsLayout from '../components/search/SearchResultsLayout';
import { CATEGORIES } from '../config/categories';
import { enrichPromoList } from '../utils/resolvePromoProduct';
import {
  HERO_SLIDES,
  DEAL_PROMOS,
  INTERESTING_FINDS,
  GRAB_OR_GONE,
  BRANDS_SPOTLIGHT,
  TRENDS,
} from '../config/forYouContent';
import './ResponsiveHomePage.css';

const ResponsiveHomePage = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, cartCount, fetchCart } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Dialog and popup states
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Dropdown refs for click-outside closure
  const userMenuRef = useRef(null);
  const moreMenuRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch all products
  const isForYou = !categoryFilter && !searchQuery;

  const { data: allProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
    enabled: isForYou,
  });

  const { data: filteredProducts, isLoading: searchLoading, error: searchError } = useQuery({
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

  // Fetch cart count on load
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setShowMoreDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  // Slide rotation logic
  useEffect(() => {
    if (!isForYou) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isForYou]);

  // Resolve promo products using API list
  const heroSlides = useMemo(() => enrichPromoList(HERO_SLIDES, allProducts || []), [allProducts]);
  const dealPromos = useMemo(() => enrichPromoList(DEAL_PROMOS, allProducts || []), [allProducts]);
  const interestingFinds = useMemo(() => enrichPromoList(INTERESTING_FINDS, allProducts || []), [allProducts]);
  const grabOrGone = useMemo(() => enrichPromoList(GRAB_OR_GONE, allProducts || []), [allProducts]);
  const brandsSpotlight = useMemo(() => enrichPromoList(BRANDS_SPOTLIGHT, allProducts || []), [allProducts]);
  const trends = useMemo(() => enrichPromoList(TRENDS, allProducts || []), [allProducts]);

  // Navigation handlers
  const handleProductClick = (productId) => {
    if (productId) navigate(`/product/${productId}`);
  };

  const handlePromoClick = (promo) => {
    if (!promo) return;
    if (promo.productId) {
      navigate(`/product/${promo.productId}`);
      return;
    }
    if (promo.categoryFilter) setCategoryFilter(promo.categoryFilter);
    else setCategoryFilter('');

    if (promo.searchQuery) setSearchQuery(promo.searchQuery);
    else if (promo.match?.brand) setSearchQuery(promo.match.brand);
    else if (promo.match?.nameMatch) setSearchQuery(promo.match.nameMatch);
    else setSearchQuery('');

    // Smooth scroll down to grid section
    setTimeout(() => {
      document.getElementById('products-grid-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCategorySelect = (filter) => {
    if (categoryFilter === filter) {
      setCategoryFilter('');
      setSearchQuery('');
    } else {
      setCategoryFilter(filter);
      setSearchQuery('');
    }
  };

  const handleSubcategoryClick = (catFilter, subcatItem) => {
    setHoveredCategory(null);
    setCategoryFilter(catFilter);
    setSearchQuery(subcatItem);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleImageSearch = (keyword) => {
    setSearchQuery(keyword);
    setShowImageSearch(false);
  };

  // Category Hover helpers
  const handleCategoryMouseEnter = useCallback((filter) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (!filter) {
      setHoveredCategory(null);
      return;
    }
    hoverTimeoutRef.current = setTimeout(() => setHoveredCategory(filter), 150);
  }, []);

  const handleCategoryMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setHoveredCategory(null), 200);
  }, []);

  const handleMegaMenuMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }, []);

  const handleMegaMenuMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredCategory(null), 150);
  }, []);

  const activeHoveredCat = useMemo(() => {
    return CATEGORIES.find((c) => c.filter === hoveredCategory);
  }, [hoveredCategory]);

  return (
    <div className="responsive-page">
      {/* ─── Fixed Header / Navbar ─── */}
      <header className="responsive-header">
        <div className="responsive-container nav-container">
          {/* Logo Group */}
          <Link to="/" onClick={() => { setCategoryFilter(''); setSearchQuery(''); }} className="nav-logo-group">
            <span className="logo-main">Flipkart</span>
            <span className="logo-sub">
              Explore <span>Plus</span>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="plus icon" />
            </span>
          </Link>

          {/* Responsive Search Input */}
          <div className="nav-search-wrapper">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchQuery}
              onChange={handleSearchChange}
              className="nav-search-bar"
            />
            <button className="nav-search-btn" aria-label="Search">
              <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={() => setShowImageSearch(true)}
              className="nav-camera-btn"
              title="Search by image"
              aria-label="Image Search"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* Action Links */}
          <div className="nav-actions">
            {isAuthenticated ? (
              <div
                className="nav-user-badge"
                ref={userMenuRef}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <span>{user?.name?.split(' ')[0]}</span>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {showUserDropdown && (
                  <div className="user-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <div className="dropdown-header-title">Your Account</div>
                    <Link to="/profile" className="dropdown-item-link">
                      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      My Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item-link">
                      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      Orders
                    </Link>
                    <Link to="/wishlist" className="dropdown-item-link">
                      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      Wishlist
                    </Link>
                    <button onClick={logout} className="dropdown-logout-btn">
                      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setIsLoginPopupOpen(true)} className="nav-login-btn">
                Login
              </button>
            )}

            {/* More Menu */}
            <div className="nav-actions-more-container" style={{ position: 'relative' }}>
              <button
                className="nav-link-more"
                ref={moreMenuRef}
                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              >
                More
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: showMoreDropdown ? 'rotate(180deg)' : 'none' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showMoreDropdown && (
                <div className="more-dropdown-menu">
                  <Link to="/coupons" className="dropdown-item-link">Coupons</Link>
                  <Link to="/supercoin" className="dropdown-item-link">Supercoin Zone</Link>
                  <Link to="/plus-zone" className="dropdown-item-link">Flipkart Plus Zone</Link>
                </div>
              )}
            </div>

            {/* Cart Link */}
            <Link to="/cart" className="nav-link-cart">
              <div className="cart-icon-wrapper">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45C5.16 14.57 5 15.02 5 15.5c0 1.1.9 2 2 2h14v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.46 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Category Strip with Hover Mega Dropdowns ─── */}
      <nav className="category-strip">
        <div className="responsive-container category-row">
          {CATEGORIES.map((cat) => {
            const isActive = categoryFilter === cat.filter;
            return (
              <div
                key={cat.filter || 'for-you'}
                className="category-item-container"
                onMouseEnter={() => handleCategoryMouseEnter(cat.filter)}
                onMouseLeave={handleCategoryMouseLeave}
              >
                <button
                  onClick={() => handleCategorySelect(cat.filter)}
                  className={`category-item ${isActive ? 'active' : ''}`}
                >
                  <div className="category-icon-container">
                    <CategoryIcon type={cat.icon} active={isActive || hoveredCategory === cat.filter} />
                  </div>
                  <span className="category-label">{cat.displayLabel}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Hover Mega Menu Dropdown */}
        {activeHoveredCat && activeHoveredCat.subcategories?.length > 0 && (
          <div
            className="category-mega-dropdown"
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
          >
            <div className="responsive-container mega-dropdown-grid">
              {activeHoveredCat.subcategories.map((subcat) => (
                <div key={subcat.name}>
                  <div className="mega-column-title">{subcat.name}</div>
                  <ul className="mega-item-list">
                    {subcat.items.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => handleSubcategoryClick(activeHoveredCat.filter, item)}
                          className="mega-item-btn"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ─── Main Content Area ─── */}
      <main className="responsive-container" style={{ padding: '0 0 40px 0', flex: 1 }}>
        {isForYou ? (
          /* ── FOR YOU / HOME SECTIONS ── */
          <>
            {/* Hero Slider */}
            <section className="hero-section">
              <div className="hero-carousel-container">
                <button
                  className="hero-arrow hero-arrow-prev"
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                  aria-label="Previous Slide"
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
                    onClick={() => handlePromoClick(slide)}
                  >
                    <img src={slide.image} alt={slide.title} />
                  </div>
                ))}

                <button
                  className="hero-arrow hero-arrow-next"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  aria-label="Next Slide"
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="hero-dots">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      className={`hero-dot ${idx === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {productsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--fk-text-muted)', fontWeight: 'bold' }}>
                Loading recommendations...
              </div>
            ) : (
              <>
                {/* Deal Promos Row */}
                <section className="promo-shelf-card">
                  <div className="promo-shelf-header">
                    <h2 className="promo-shelf-title">Deals of the Day</h2>
                  </div>
                  <div className="promo-shelf-grid">
                    {dealPromos.slice(0, 6).map((deal, idx) => (
                      <div
                        key={idx}
                        className="resp-product-card"
                        onClick={() => handlePromoClick(deal)}
                      >
                        <div className="resp-product-img-wrapper">
                          <img src={deal.image} alt={deal.caption} />
                        </div>
                        <div className="resp-product-info">
                          <div className="resp-product-title" style={{ fontWeight: '600' }}>{deal.caption}</div>
                          <div className="resp-product-discount">{deal.offer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Brands Spotlight Section */}
                <section className="promo-shelf-card">
                  <div className="promo-shelf-header">
                    <h2 className="promo-shelf-title">Brands Spotlight</h2>
                  </div>
                  <div className="promo-shelf-grid">
                    {brandsSpotlight.slice(0, 6).map((item, idx) => (
                      <div
                        key={idx}
                        className="resp-product-card"
                        onClick={() => handlePromoClick(item)}
                      >
                        <div className="resp-product-img-wrapper">
                          <img src={item.image} alt={item.brand} />
                        </div>
                        <div className="resp-product-info">
                          <div className="resp-product-brand">{item.brand}</div>
                          <div className="resp-product-title">{item.description}</div>
                          <div className="resp-product-discount" style={{ color: 'var(--fk-blue)' }}>{item.offer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Interesting Finds Section */}
                <section className="promo-shelf-card">
                  <div className="promo-shelf-header">
                    <h2 className="promo-shelf-title">Interesting Finds</h2>
                  </div>
                  <div className="promo-shelf-grid">
                    {interestingFinds.slice(0, 6).map((item, idx) => (
                      <div
                        key={idx}
                        className="resp-product-card"
                        onClick={() => handlePromoClick(item)}
                      >
                        <div className="resp-product-img-wrapper">
                          <img src={item.image} alt={item.label} />
                        </div>
                        <div className="resp-product-info">
                          <div className="resp-product-title" style={{ fontWeight: '500' }}>{item.label}</div>
                          <div className="resp-product-discount">{item.offer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Trends You May Like */}
                <section className="promo-shelf-card">
                  <div className="promo-shelf-header">
                    <h2 className="promo-shelf-title">Trends You May Like</h2>
                  </div>
                  <div className="promo-shelf-grid">
                    {trends.slice(0, 6).map((item, idx) => (
                      <div
                        key={idx}
                        className="resp-product-card"
                        onClick={() => handlePromoClick(item)}
                      >
                        <div className="resp-product-img-wrapper">
                          <img src={item.image} alt={item.tag} />
                        </div>
                        <div className="resp-product-info">
                          <div className="resp-product-discount">#{item.tag}</div>
                          <div className="resp-product-title">Trending Now</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* All Products Grid Section */}
                <section id="products-grid-section" className="promo-shelf-card">
                  <div className="promo-shelf-header">
                    <h2 className="promo-shelf-title">Featured Products</h2>
                  </div>
                  <div className="promo-shelf-grid">
                    {allProducts?.map((product) => {
                      const img = Array.isArray(product.images) ? product.images[0] : product.images;
                      const originalPrice = Math.round(product.price * 1.25); // mock MRP
                      return (
                        <div
                          key={product.id}
                          className="resp-product-card"
                          onClick={() => handleProductClick(product.id)}
                        >
                          <div className="resp-product-img-wrapper">
                            <img src={img} alt={product.name} />
                          </div>
                          <div className="resp-product-info">
                            <div className="resp-product-brand">{product.brand || 'Flipkart'}</div>
                            <div className="resp-product-title">{product.name}</div>
                            <div className="resp-product-pricing">
                              <span className="resp-product-price">₹{product.price.toLocaleString()}</span>
                              <span className="resp-product-mrp">₹{originalPrice.toLocaleString()}</span>
                              <span className="resp-product-discount">20% off</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </>
            )}
          </>
        ) : (
          /* ── SEARCH & FILTER RESULTS LAYOUT ── */
          <div style={{ marginTop: '16px' }}>
            {searchLoading && (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--fk-text-muted)', fontWeight: 'bold' }}>
                Loading search results...
              </div>
            )}
            {searchError && (
              <div style={{ textAlign: 'center', color: 'red', padding: '40px' }}>
                Error retrieving products. Is the server online?
              </div>
            )}
            {!searchLoading && !searchError && (
              <SearchResultsLayout
                products={filteredProducts}
                categoryFilter={categoryFilter}
                searchQuery={searchQuery}
                onClearFilters={() => {
                  setCategoryFilter('');
                  setSearchQuery('');
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* ─── Multi-column Footer ─── */}
      <footer className="responsive-footer">
        <div className="responsive-container">
          <div className="footer-top">
            <div>
              <div className="footer-col-title">ABOUT</div>
              <ul className="footer-links">
                <li><a href="#about">Contact Us</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#about">Careers</a></li>
                <li><a href="#about">Flipkart Stories</a></li>
                <li><a href="#about">Press</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">HELP</div>
              <ul className="footer-links">
                <li><a href="#help">Payments</a></li>
                <li><a href="#help">Shipping</a></li>
                <li><a href="#help">Cancellation & Returns</a></li>
                <li><a href="#help">FAQ</a></li>
                <li><a href="#help">Report Infringement</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">CONSUMER POLICY</div>
              <ul className="footer-links">
                <li><a href="#policy">Cancellation & Returns</a></li>
                <li><a href="#policy">Terms Of Use</a></li>
                <li><a href="#policy">Security</a></li>
                <li><a href="#policy">Privacy</a></li>
                <li><a href="#policy">Sitemap</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">SOCIAL</div>
              <ul className="footer-links">
                <li><a href="#social">Facebook</a></li>
                <li><a href="#social">Twitter</a></li>
                <li><a href="#social">YouTube</a></li>
              </ul>
            </div>
            <div style={{ borderLeft: '1px solid #454d5e', paddingLeft: '24px' }}>
              <div className="footer-col-title">Mail Us:</div>
              <div className="footer-contact-info">
                <p>Flipkart Internet Private Limited,</p>
                <p>Buildings Alyssa, Begonia &</p>
                <p>Clove Embassy Tech Village,</p>
                <p>Outer Ring Road, Devarabeesanahalli Village,</p>
                <p>Bengaluru, 560103,</p>
                <p>Karnataka, India</p>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Registered Office Address:</div>
              <div className="footer-contact-info">
                <p>Flipkart Internet Private Limited,</p>
                <p>Buildings Alyssa, Begonia &</p>
                <p>Clove Embassy Tech Village,</p>
                <p>Outer Ring Road, Devarabeesanahalli Village,</p>
                <p>Bengaluru, 560103,</p>
                <p>Karnataka, India</p>
                <p>CIN : U51109KA2012PTC066107</p>
                <p>Telephone: <span style={{ color: 'var(--fk-blue)' }}>044-45614700</span></p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-links">
              <a href="#become-seller">Become a Seller</a>
              <a href="#advertise">Advertise</a>
              <a href="#gift-cards">Gift Cards</a>
              <a href="#help-center">Help Center</a>
              <span>© 2007-2026 Flipkart.com</span>
            </div>
            <div className="footer-payment-icons">
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payment partners logo" />
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Integrated Modals ─── */}
      <LoginPopup isOpen={isLoginPopupOpen} onClose={() => setIsLoginPopupOpen(false)} />
      <ImageSearchModal
        isOpen={showImageSearch}
        onClose={() => setShowImageSearch(false)}
        onSearch={handleImageSearch}
      />
    </div>
  );
};

export default ResponsiveHomePage;
