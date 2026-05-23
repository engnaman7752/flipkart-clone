# 🎨 Flipkart Clone — Frontend

> React 19 SPA with pixel-perfect Flipkart UI, AI-powered image search, and Razorpay checkout.

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Component-based UI with hooks |
| **Vite 8** | Lightning-fast dev server and build tooling |
| **Tailwind CSS 3** | Utility-first responsive styling |
| **React Router v7** | Client-side routing with nested routes |
| **TanStack Query v5** | Server-state caching, background re-fetching |
| **Zustand** | Lightweight global state management (cart, auth) |
| **Axios** | HTTP client for REST API communication |
| **EmailJS** | Client-side email delivery (OTP + order confirmation) |

---

## 📁 Project Structure

```
src/
├── api/
│   └── api.js                    # Axios instance with base URL + JWT interceptor
├── components/
│   ├── Navbar.jsx                # Search bar, image search trigger, cart badge, user dropdown
│   ├── ImageSearchModal.jsx      # Drag-and-drop AI image search (Groq Vision)
│   ├── LoginPopup.jsx            # Login/Signup modal with OTP email verification
│   ├── ProductCard.jsx           # Reusable product card (grid view)
│   ├── PriceSummary.jsx          # Cart/checkout price breakdown
│   ├── Footer.jsx                # Site-wide footer
│   ├── Toast.jsx                 # Global toast notifications
│   ├── home/                     # Homepage components
│   │   ├── HeroPeekCarousel.jsx  # Auto-sliding hero banner carousel
│   │   ├── CategoryStrip.jsx     # Top category navigation bar
│   │   ├── CategorySubNav.jsx    # Scrollable subcategory tiles
│   │   ├── ForYouContent.jsx     # "For You" promo shelves renderer
│   │   ├── PromoShelf.jsx        # Horizontal scrolling deal shelf
│   │   └── ProductGridSection.jsx# Product grid with filters
│   └── search/                   # Search results components
│       ├── SearchResultsLayout.jsx # List/grid view with sorting
│       ├── SidebarFilters.jsx    # Brand, rating, price range filters
│       └── ProductListCard.jsx   # Product card (list view)
├── pages/
│   ├── HomePage.jsx              # "For You" feed + search results
│   ├── ProductDetailPage.jsx     # Full PDP with image gallery + specs
│   ├── CartPage.jsx              # Cart with quantity controls
│   ├── CheckoutPage.jsx          # Address form + Razorpay payment
│   ├── OrderConfirmationPage.jsx # Post-order success page
│   ├── OrderHistoryPage.jsx      # Past orders list
│   ├── WishlistPage.jsx          # Saved items
│   ├── ComparePage.jsx           # Side-by-side product comparison
│   ├── ProfilePage.jsx           # User profile management
│   └── AddressesPage.jsx         # Saved addresses CRUD
├── services/
│   └── emailService.js           # EmailJS: sendOTP + sendOrderConfirmation
├── hooks/
│   └── useDebounce.js            # Debounce hook for search input
├── store/
│   ├── cartStore.js              # Zustand: cart, wishlist, search, toast state
│   └── authStore.js              # Zustand: user, token, login/logout
├── config/
│   ├── categories.js             # Category definitions + subcategories
│   └── forYouContent.js          # Hero slides + promo shelf configuration
└── utils/
    └── resolvePromoProduct.js    # Maps promo items to actual DB products
```

---

## ⚡ Key Features

- **AI Image Search** — Upload a photo → Groq Vision AI identifies the product → auto-searches catalog
- **Razorpay Checkout** — Dynamically loads Razorpay SDK, creates payment order, verifies signature
- **OTP Signup** — 6-digit OTP sent via EmailJS before account creation
- **Real-Time Search** — Debounced autocomplete with live suggestions from API
- **Product Comparison** — Compare up to 4 products side-by-side
- **Responsive** — Mobile-first design with adaptive layouts

---

## 🛠️ Setup

```bash
npm install
npm run dev
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_OTP_TEMPLATE_ID=your_otp_template_id
VITE_EMAILJS_ORDER_TEMPLATE_ID=your_order_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> Runs on `http://localhost:5173`

---

## 🚀 Deployment

Deployed on **Vercel** with root directory set to `frontend` and framework preset `Vite`.

**Live:** [https://flipkart-clone-omega-six.vercel.app](https://flipkart-clone-omega-six.vercel.app)
