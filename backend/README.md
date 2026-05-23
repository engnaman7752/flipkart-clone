# ⚙️ Flipkart Clone — Backend

> Node.js + Express 5 REST API with domain-driven architecture, background job processing, and AI-powered image search.

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express 5** | HTTP framework with async error handling |
| **PostgreSQL** | Relational database (hosted on Supabase) |
| **pg** | PostgreSQL client with connection pooling |
| **JWT (jsonwebtoken)** | Stateless token-based authentication |
| **bcrypt** | Password hashing with salt rounds |
| **Razorpay** | Payment gateway integration (order + verify) |
| **Groq API** | Llama 4 Scout Vision model for image classification |
| **node-cron** | Background worker scheduling |
| **Nodemailer** | Email transporter (backup/transactional) |

---

## 📁 Project Structure

```
backend/
├── server.js                          # Express app entry point + worker bootstrap
├── db.js                              # PostgreSQL connection pool (pg)
├── worker.js                          # Background job processor (polls every 5s)
├── src/
│   ├── domains/
│   │   ├── products/
│   │   │   ├── products.router.js     # GET /products, GET /products/:id, POST /products/image-search
│   │   │   ├── products.controller.js # HTTP handlers + image search delegation
│   │   │   └── products.service.js    # Fuzzy search with pg_trgm + synonym mapping
│   │   ├── cart/
│   │   │   ├── cart.router.js         # GET, POST, PUT, DELETE /cart
│   │   │   ├── cart.controller.js
│   │   │   └── cart.service.js
│   │   ├── orders/
│   │   │   ├── orders.router.js       # GET, POST /orders
│   │   │   ├── orders.controller.js
│   │   │   └── orders.service.js      # Transactional Outbox: order + background job in one TX
│   │   ├── payment/
│   │   │   ├── payment.router.js      # POST /payment/create-order, POST /payment/verify
│   │   │   └── payment.controller.js  # Razorpay order creation + HMAC SHA256 verification
│   │   ├── wishlist/
│   │   │   ├── wishlist.router.js     # GET, POST, DELETE /wishlist
│   │   │   ├── wishlist.controller.js
│   │   │   └── wishlist.service.js
│   │   ├── auth/
│   │   │   ├── auth.router.js         # POST /auth/login, POST /auth/signup
│   │   │   ├── auth.controller.js
│   │   │   └── auth.service.js        # bcrypt hashing + JWT signing
│   │   └── users/
│   │       ├── user.router.js         # Profile + address CRUD
│   │       ├── user.controller.js
│   │       └── user.service.js
│   ├── middleware/
│   │   └── auth.middleware.js         # JWT extraction + verification → req.user
│   └── services/
│       ├── email.service.js           # Nodemailer transporter + HTML email templates
│       └── groqService.js            # Groq Vision AI: base64 image → product keyword
├── .env.example
└── package.json
```

---

## 🏗️ Architecture

### Domain-Driven Modular Monolith

Each business domain follows **Router → Controller → Service** separation:

```
HTTP Request → auth.middleware → router → controller → service → db
```

- **Router** — URL mapping and HTTP method binding
- **Controller** — Parses request, calls service, formats response
- **Service** — Pure business logic + SQL queries (zero Express awareness)
- **Middleware** — Cross-cutting JWT verification

### Transactional Outbox Pattern

Order placement uses a single database transaction to insert both the order and a background job entry. The `worker.js` polls every 5 seconds using `FOR UPDATE SKIP LOCKED` for safe concurrent processing with automatic retry on failure.

### AI Image Search Pipeline

```
Client uploads base64 image
    → POST /api/products/image-search
    → groqService.analyzeImage() calls Groq API (Llama 4 Scout Vision)
    → Returns single product keyword (e.g., "shoe", "laptop")
    → Client auto-searches with that keyword
```

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/products` | ❌ | List products (`?search=`, `?category=`) |
| `GET` | `/api/products/:id` | ❌ | Get product by ID |
| `POST` | `/api/products/image-search` | ❌ | AI image → keyword search |
| `GET` | `/api/cart` | ✅ | Get user's cart |
| `POST` | `/api/cart` | ✅ | Add to cart |
| `PUT` | `/api/cart/:productId` | ✅ | Update quantity |
| `DELETE` | `/api/cart/:productId` | ✅ | Remove from cart |
| `GET` | `/api/orders` | ✅ | Order history |
| `POST` | `/api/orders` | ✅ | Place order (outbox pattern) |
| `POST` | `/api/payment/create-order` | ✅ | Create Razorpay order |
| `POST` | `/api/payment/verify` | ✅ | Verify payment signature |
| `GET` | `/api/wishlist` | ✅ | Get wishlist |
| `POST` | `/api/wishlist` | ✅ | Add to wishlist |
| `DELETE` | `/api/wishlist/:productId` | ✅ | Remove from wishlist |
| `GET` | `/api/users/profile` | ✅ | Get profile |
| `PUT` | `/api/users/profile` | ✅ | Update profile |
| `GET` | `/api/users/addresses` | ✅ | Get saved addresses |
| `POST` | `/api/users/addresses` | ✅ | Add address |
| `PUT` | `/api/users/addresses/:id` | ✅ | Update address |
| `DELETE` | `/api/users/addresses/:id` | ✅ | Delete address |
| `POST` | `/api/auth/login` | ❌ | Login → JWT |
| `POST` | `/api/auth/signup` | ❌ | Register → JWT |
| `GET` | `/api/health` | ❌ | Health check |

---

## 🛠️ Setup

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GROQ_API_KEY=your_groq_api_key
```

### Run

```bash
node server.js
```

> Server starts on `http://localhost:5000` and auto-boots the background worker.  
> Health check: `GET http://localhost:5000/api/health`

---

## 🚀 Deployment

Deployed on **Render** with root directory set to `backend` and start command `node server.js`.

**Live:** [https://flipkart-backend-080u.onrender.com/api/health](https://flipkart-backend-080u.onrender.com/api/health)
