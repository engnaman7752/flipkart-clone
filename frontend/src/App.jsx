import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResponsiveHomePage from './pages/ResponsiveHomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import WishlistPage from './pages/WishlistPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ComparePage from './pages/ComparePage';
import AccountPlaceholderPage from './pages/AccountPlaceholderPage';
import ProfilePage from './pages/ProfilePage';
import AddressesPage from './pages/AddressesPage';

function AppContent() {
  const location = useLocation();
  const isResponsiveHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#f1f3f6] flex flex-col">
      {!isResponsiveHome && <Navbar />}
      <Toast />
      <main className={isResponsiveHome ? "flex-1" : "pt-14 flex-1"}>
        <Routes>
          <Route path="/" element={<ResponsiveHomePage />} />
          <Route path="/legacy-home" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/compare" element={<ComparePage />} />
          
          {/* Account Placeholder Routes */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/coupons" element={<AccountPlaceholderPage title="Coupons" />} />
          <Route path="/supercoin" element={<AccountPlaceholderPage title="Supercoin Zone" />} />
          <Route path="/plus-zone" element={<AccountPlaceholderPage title="Flipkart Plus Zone" />} />
          <Route path="/saved-cards" element={<AccountPlaceholderPage title="Saved Cards & Wallet" />} />
          <Route path="/saved-addresses" element={<AddressesPage />} />
          <Route path="/gift-cards" element={<AccountPlaceholderPage title="Gift Cards" />} />
          <Route path="/notifications" element={<AccountPlaceholderPage title="Notifications" />} />
        </Routes>
      </main>
      {!isResponsiveHome && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
