# 🛒 Flipkart Clone — Full-Stack E-Commerce Platform

> SDE Intern Fullstack Assignment  
> A production-grade, full-stack Flipkart replica with clean architecture, background job processing, and pixel-perfect UI fidelity.

### 🔗 Live Links
- **Live Demo (Frontend):** [https://flipkart-clone-omega-six.vercel.app/](https://flipkart-clone-omega-six.vercel.app/)
- **Live API (Backend):** [https://flipkart-backend-080u.onrender.com/api/health](https://flipkart-backend-080u.onrender.com/api/health)

---

## 📌 Table of Contents

- [Tech Stack](#-tech-stack)
- [High Level Design (HLD)](#-high-level-design-hld)
- [Low Level Design (LLD)](#-low-level-design-lld)
- [Database Design](#-database-design)
- [Design Patterns Used](#-design-patterns-used)
- [API Reference](#-api-reference)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Setup & Run Locally](#-setup--run-locally)
- [Deployment](#-deployment)
- [Assumptions](#-assumptions)

---

## 🚀 Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | React 19, Vite, Tailwind CSS, React Router v7, TanStack Query, Zustand | SPA with optimized bundling, server-state caching, and global client-state |
| **Backend** | Node.js, Express 5, node-cron | RESTful API with background job processing |
| **Database** | PostgreSQL (Supabase) | Relational integrity + JSONB flexibility for semi-structured data |
| **Auth** | JWT (jsonwebtoken), bcrypt | Stateless token-based authentication with password hashing |
| **Email** | EmailJS (@emailjs/browser) | Client-side email delivery for OTP verification and order confirmation |
| **Payments** | Razorpay | Secure payment gateway with server-side signature verification |
| **AI/Vision** | Groq API (Llama 4 Scout Vision) | AI-powered image recognition for visual product search |

---

## 🏗️ High Level Design (HLD)

The system follows a **3-Tier Architecture** with an additional **Asynchronous Processing Layer** for reliability and performance.

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│                React SPA + Zustand + React Query                 │
└──────────────────────┬───────────────────────────────────────────┘
                       │  HTTP/REST (JSON)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                     API SERVER (Express 5)                        │
│                                                                  │
│  ┌────────┐ ┌────────┐ ┌─────────┐ ┌──────────┐ ┌────────────┐  │
│  │Products│ │  Cart  │ │ Orders  │ │ Wishlist │ │    Auth    │  │
│  │ Domain │ │ Domain │ │ Domain  │ │  Domain  │ │   Domain   │  │
│  └───┬────┘ └───┬────┘ └────┬────┘ └────┬─────┘ └─────┬──────┘  │
│      │          │           │            │             │          │
│  ┌───┴──┐  ┌────┴───┐                                           │
│  │Payment│  │ Users  │                                           │
│  │Domain │  │ Domain │                                           │
│  └───┬───┘  └────┬───┘                                           │
│      │          │           │            │             │          │
│      └──────────┴─────┬─────┴────────────┴─────────────┘          │
│                       │                                          │
│              ┌────────▼────────┐    ┌─────────────────────┐      │
│              │  PostgreSQL DB  │    │  Groq Vision AI      │      │
│              │  (Supabase)     │    │  (Image Search)      │      │
│              └────────┬────────┘    └─────────────────────┘      │
│                       │                                          │
│              ┌────────▼────────────────────────┐                 │
│              │  background_jobs table          │                 │
│              │  (Transactional Outbox)         │                 │
│              └────────▲────────────────────────┘                 │
│                       │  polls every 5s                           │
│              ┌────────┴────────┐                                  │
│              │  Background     │                                  │
│              │  Worker (cron)  │                                  │
│              └─────────────────┘                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Transactional Outbox Pattern** | Order creation and cart-clear tasks are wrapped in a single DB transaction. A background worker polls for pending jobs, ensuring the user never waits for async side-effects. If the worker crashes, jobs remain in `PENDING` state and are retried automatically. |
| **Pessimistic Row Locking** | The worker uses `FOR UPDATE SKIP LOCKED` to safely support multiple worker instances without double-processing the same job. |
| **Retry with Max Attempts** | Failed jobs increment an `attempts` counter and are retried up to `max_attempts`, after which they are marked `FAILED` for manual review. |
| **Stateless JWT Auth** | Each request carries a self-contained JWT token. The server never stores sessions, making it horizontally scalable. |

---

## 🔧 Low Level Design (LLD)

The backend follows a strict **Domain-Driven Modular Monolith** pattern. Each business domain is fully self-contained with its own Router → Controller → Service layer.

### Request Lifecycle

```
HTTP Request
    │
    ▼
┌─────────────────────┐
│   auth.middleware.js │  ← Extracts & verifies JWT, attaches req.user
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│   domain.router.js  │  ← Defines routes (GET, POST, PUT, DELETE)
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ domain.controller.js│  ← Handles HTTP req/res, input validation, error formatting
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  domain.service.js  │  ← Pure business logic + SQL queries (no HTTP awareness)
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│      db.js (pg)     │  ← Connection pool to PostgreSQL
└─────────────────────┘
```

### Why This Separation Matters

| Layer | Responsibility | Example |
|-------|---------------|---------|
| **Router** | URL mapping, HTTP method binding | `POST /api/orders` → `ordersController.placeOrder` |
| **Controller** | Parse `req.body`, call service, format `res.json()` | Extract `userId` from JWT, delegate to `ordersService.createOrder()` |
| **Service** | Business logic, DB queries, transaction management | Begin transaction → Insert order → Insert outbox job → Commit |
| **Middleware** | Cross-cutting concerns (auth, logging, error handling) | Verify JWT token and attach `req.user = { id, email }` |

> **Key Principle:** The Service layer has **zero knowledge** of Express (no `req`, `res`). This makes it independently testable and reusable.

---

## 🗃️ Database Design

### Entity Relationship Diagram

```
┌─────────┐       1:N        ┌──────────┐
│  Users  │──────────────────▶│  Orders  │
│         │                   │          │
│  id PK  │       1:N        │ id PK    │
│  name   │──────┐           │ user_id  │
│  email  │      │           │ items    │  ← JSONB snapshot
│  password│     │           │ address  │  ← JSONB snapshot
└─────────┘      │           │ total    │
     │           │           └──────────┘
     │    ┌──────▼──────┐
     │    │ cart_items   │    M:N junction table
     │    │             │
     │    │ user_id FK  │
     │    │ product_id FK│
     │    │ quantity    │
     │    └─────────────┘
     │
     │    ┌─────────────┐
     └───▶│  wishlist   │    M:N junction table
          │             │
          │ user_id FK  │
          │ product_id FK│
          └─────────────┘

┌────────────┐
│  Products  │
│            │
│  id PK     │
│  name      │
│  price     │
│  mrp       │
│  category  │
│  brand     │
│  images[]  │  ← PostgreSQL TEXT array
│  specs     │  ← JSONB (flexible schema)
│  rating    │
│  stock     │
└────────────┘

┌──────────────────┐
│ background_jobs  │    Transactional Outbox
│                  │
│  id PK           │
│  event_type      │    e.g. 'CLEAR_CART'
│  payload JSONB   │    e.g. { userId, orderId }
│  status          │    PENDING → PROCESSING → DONE / FAILED
│  attempts        │
│  max_attempts    │
└──────────────────┘
```

### Schema Design Decisions

| Decision | Explanation |
|----------|-------------|
| **JSONB for `specifications`** | Different product categories have entirely different attributes (a TV has "Refresh Rate", an AC has "Tonnage"). Using JSONB avoids creating hundreds of nullable columns and supports flexible, schemaless data within a rigid relational model. |
| **JSONB for `order_items`** | A point-in-time snapshot of the cart. If a product's price changes tomorrow, historical order receipts remain accurate. This is how production e-commerce systems work. |
| **`TEXT[]` for `images`** | PostgreSQL native array type — simpler than a separate `product_images` junction table for a 1:N relationship where the "N" side has no extra attributes. |
| **`background_jobs` table** | Acts as a durable message queue (Outbox Pattern). Decouples order creation from side-effects (cart clearing, email sending). Survives server restarts unlike in-memory queues. |
| **`UNIQUE(user_id, product_id)`** | On `cart_items` and `wishlist` to enforce business rule: one entry per product per user at the database level, not just the application level. |

---

## 🧩 Design Patterns Used

### 1. Transactional Outbox Pattern (Backend)
**Problem:** After placing an order, we need to clear the cart and send an email. If we do this synchronously, a failure in email sending would roll back the entire order.  
**Solution:** The order service inserts both the order and a `background_jobs` entry inside a single DB transaction. A cron-based worker (`worker.js`) polls for pending jobs and processes them independently. If it fails, the job is retried.

### 2. Observer Pattern (Frontend)
**Problem:** Multiple UI components need to stay in sync with the same state (e.g., the cart badge in the Navbar, the Cart page, the Checkout summary).  
**Solution:**
- **Zustand** acts as the *Subject*. Components that call `useCartStore()` are *Observers*. When the cart updates, all observers re-render automatically.
- **TanStack Query** observes server state. Calling `invalidateQueries('cart')` causes all components observing that query key to re-fetch and re-render.

### 3. Middleware Chain Pattern (Backend)
**Problem:** Cross-cutting concerns like authentication should not be duplicated across every route handler.  
**Solution:** Express middleware (`auth.middleware.js`) intercepts requests before they reach domain controllers. The JWT is verified once, and `req.user` is injected for all downstream handlers.

---

## 📡 API Reference

All endpoints are prefixed with `/api`. Protected routes require `Authorization: Bearer <JWT>` header.

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products (supports `?search=` and `?category=`) |
| `GET` | `/api/products/:id` | Get single product with full specifications |
| `POST` | `/api/products/image-search` | AI-powered visual product search (accepts base64 image) |

### Cart (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Get user's cart items |
| `POST` | `/api/cart` | Add item to cart `{ productId, quantity }` |
| `PUT` | `/api/cart/:productId` | Update item quantity `{ quantity }` |
| `DELETE` | `/api/cart/:productId` | Remove item from cart |

### Orders (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | Get user's order history |
| `POST` | `/api/orders` | Place order `{ orderItems, shippingAddress, subtotal, total }` |

### Payment (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/payment/create-order` | Create Razorpay payment order `{ amount }` |
| `POST` | `/api/payment/verify` | Verify payment signature `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }` |

### Wishlist (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/wishlist` | Get user's wishlist |
| `POST` | `/api/wishlist` | Add to wishlist `{ productId }` |
| `DELETE` | `/api/wishlist/:productId` | Remove from wishlist |

### Users (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users/profile` | Get user profile |
| `PUT` | `/api/users/profile` | Update user profile `{ name, gender, phone }` |
| `GET` | `/api/users/addresses` | Get saved addresses |
| `POST` | `/api/users/addresses` | Add new address |
| `PUT` | `/api/users/addresses/:id` | Update address |
| `DELETE` | `/api/users/addresses/:id` | Delete address |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login `{ email, password }` → returns JWT |
| `POST` | `/api/auth/signup` | Register `{ name, email, password }` → returns JWT |

---

## ✨ Features

### Core (Must Have) ✅
- [x] Product listing with grid/list layout, search, and category filters
- [x] Product detail page with image gallery, specifications, Add to Cart, Buy Now
- [x] Shopping cart with quantity update, remove, and price summary
- [x] Checkout with shipping address form and order review
- [x] Order placement with confirmation page displaying Order ID

### Bonus (Good to Have) ✅
- [x] Responsive design (mobile, tablet, desktop) — adaptive layouts with mobile-optimized navigation
- [x] User authentication (Login/Signup with JWT + bcrypt)
- [x] Order history — view past orders with detailed breakdowns
- [x] Wishlist functionality — add/remove products with heart toggle
- [x] Email notification on order placement and OTP verification (EmailJS)

### Extra (Self-Implemented) 🚀
- [x] **AI-Powered Image Search** — Upload or drag-and-drop a product photo; Groq Vision AI (Llama 4 Scout) identifies the product and auto-searches the catalog
- [x] **Razorpay Payment Integration** — Full payment flow with order creation, Razorpay checkout popup, and server-side HMAC SHA256 signature verification
- [x] **OTP-Based Email Verification** — Signup flow sends a 6-digit OTP to the user's email via EmailJS before account creation
- [x] **Product Comparison** — Side-by-side specification comparison for up to 4 products
- [x] **Advanced Fuzzy Search** — Typo-tolerant search with synonym mapping (e.g., "shoes" → "sneakers") powered by PostgreSQL `pg_trgm`

---

## 📁 Project Structure

```
flipkart-clone/
├── backend/
│   ├── server.js                          # Express app entry point + worker bootstrap
│   ├── db.js                              # PostgreSQL connection pool (pg)
│   ├── worker.js                          # Background job processor (node-cron)
│   ├── src/
│   │   ├── domains/
│   │   │   ├── products/
│   │   │   │   ├── products.router.js     # GET /api/products, POST /api/products/image-search
│   │   │   │   ├── products.controller.js # HTTP handler layer + image search handler
│   │   │   │   └── products.service.js    # Business logic + fuzzy search + synonym mapping
│   │   │   ├── cart/
│   │   │   │   ├── cart.router.js
│   │   │   │   ├── cart.controller.js
│   │   │   │   └── cart.service.js
│   │   │   ├── orders/
│   │   │   │   ├── orders.router.js
│   │   │   │   ├── orders.controller.js
│   │   │   │   └── orders.service.js      # Transactional Outbox implementation
│   │   │   ├── payment/
│   │   │   │   ├── payment.router.js
│   │   │   │   └── payment.controller.js  # Razorpay order + signature verification
│   │   │   ├── wishlist/
│   │   │   ├── auth/
│   │   │   └── users/
│   │   ├── middleware/
│   │   │   └── auth.middleware.js          # JWT verification middleware
│   │   └── services/
│   │       ├── email.service.js           # Nodemailer transporter + HTML templates
│   │       └── groqService.js             # Groq Vision AI image classification
│   ├── .env.example                       # Environment variable template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/                           # Axios instance + API config
│   │   ├── components/
│   │   │   ├── Navbar.jsx                 # Search bar, image search, cart badge, dropdowns
│   │   │   ├── ImageSearchModal.jsx       # Drag-and-drop AI image search UI
│   │   │   ├── LoginPopup.jsx             # Login/Signup with OTP verification
│   │   │   ├── ProductCard.jsx            # Reusable product card component
│   │   │   ├── home/                      # Hero carousel, promo shelves, category strips
│   │   │   └── search/                    # Search results layout, sidebar filters, list cards
│   │   ├── pages/
│   │   │   ├── HomePage.jsx               # "For You" feed + search results
│   │   │   ├── ProductDetailPage.jsx      # Full product page with gallery + specs
│   │   │   ├── CartPage.jsx               # Cart with quantity controls
│   │   │   ├── CheckoutPage.jsx           # Address form + Razorpay payment
│   │   │   ├── OrderConfirmationPage.jsx  # Post-order success page
│   │   │   ├── OrderHistoryPage.jsx       # Past orders list
│   │   │   ├── WishlistPage.jsx           # Saved items
│   │   │   ├── ComparePage.jsx            # Side-by-side product comparison
│   │   │   ├── ProfilePage.jsx            # User profile management
│   │   │   └── AddressesPage.jsx          # Saved addresses CRUD
│   │   ├── services/
│   │   │   └── emailService.js            # EmailJS: OTP + order confirmation emails
│   │   ├── hooks/
│   │   │   └── useDebounce.js             # Debounce hook for search input
│   │   ├── stores/                        # Zustand global state (cart, auth)
│   │   ├── config/                        # Homepage promo content + category config
│   │   └── utils/                         # Promo-to-product resolution utilities
│   ├── public/banners/                    # AI-generated product banner images
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🛠️ Setup & Run Locally

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or [Supabase](https://supabase.com))

### 1. Backend
```bash
cd backend
npm install

# Create .env from the template
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, PORT, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, GROQ_API_KEY

# Start the server (also boots the background worker)
node server.js
```
> Backend runs on `http://localhost:5000`  
> Health check: `GET http://localhost:5000/api/health`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
> Frontend runs on `http://localhost:5173`  
> API base URL is configured in `src/api/api.js`

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay API Key Secret |
| `GROQ_API_KEY` | Groq API key for Vision AI image search |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID (frontend) |
| `VITE_EMAILJS_OTP_TEMPLATE_ID` | EmailJS OTP template ID (frontend) |
| `VITE_EMAILJS_ORDER_TEMPLATE_ID` | EmailJS order confirmation template ID (frontend) |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key (frontend) |

---

## 🚀 Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| **Frontend** | [Vercel](https://vercel.com) | Set root directory to `frontend`, framework preset `Vite` |
| **Backend** | [Render](https://render.com) | Set root directory to `backend`, start command `node server.js` |
| **Database** | [Supabase](https://supabase.com) | Free tier PostgreSQL with connection pooling |

> **Important:** Add all `.env` variables to your hosting provider's environment settings.

---

## 📝 Assumptions

- A **default user** is seeded for quick demo (no mandatory signup for browsing).
- Login/Signup is fully functional with JWT and OTP email verification.
- Email notifications use [EmailJS](https://www.emailjs.com/) for client-side email delivery (OTP + order confirmations).
- Payment integration uses [Razorpay](https://razorpay.com/) test mode keys for demo.
- Image search uses [Groq](https://groq.com/) Vision AI (Llama 4 Scout model) for product classification.
- Delivery is always **FREE** for demo purposes.
- Product images include AI-generated 3D commercial renders for the hero carousel banners.

---

*Built with ❤️ for the SDE Intern Assessment*
