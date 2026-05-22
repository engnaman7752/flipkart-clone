# Flipkart Clone — E-Commerce Platform

A full-stack Flipkart-style e-commerce web application built for the SDE Intern assignment. Includes product browsing, cart management, checkout, order placement, wishlist, and order history.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS, React Router, TanStack Query, Zustand |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL (Supabase-compatible) |

## Features

- **Product listing** — Grid layout with search and category filters
- **Product detail** — Image gallery, specs, Add to Cart / Buy Now
- **Shopping cart** — Update quantity, remove items, price summary
- **Checkout** — Shipping address form, order review, place order
- **Order confirmation** — Order ID display
- **Wishlist** — Save and manage favorite products
- **Order history** — View past orders

## Assumptions

- A **default user** is logged in (no real authentication).
- Login/Signup UI is present but non-functional (assignment focus is e-commerce flows).
- Product images use seeded URLs (Unsplash / placeholder services).
- Delivery is always FREE for demo purposes.

## Project Structure

```
flipkart-clone/
├── backend/          # Express API + PostgreSQL
├── frontend/         # React SPA
└── schema.sql        # Database schema (repo root)
```

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or Supabase)

### 1. Database

Create a PostgreSQL database and run the schema:

```bash
# From repo root — apply schema.sql to your database
psql $DATABASE_URL -f schema.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set DATABASE_URL and PORT (default 5000)

npm install
node run-seed.js    # Seed sample products
node server.js      # Start API on http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev         # http://localhost:5173
```

The frontend API base URL is configured in `frontend/src/api/api.js` (`http://localhost:5000/api`). Update this if deploying the backend elsewhere.

### Verify

- Open `http://localhost:5173`
- Backend health: `http://localhost:5000/api/health`

## Deployment

| Service | Suggested platform |
|---------|------------------|
| Frontend | Vercel, Netlify |
| Backend | Render, Railway |
| Database | Supabase, Neon |

**Frontend:** Set build command `npm run build`, output `dist`, and configure `VITE_API_URL` if you add env-based API URL.

**Backend:** Set `DATABASE_URL`, `PORT`, and enable CORS for your frontend origin.

## Links (update after deploy)

- **GitHub:** `https://github.com/YOUR_USERNAME/flipkart-clone`
- **Live demo:** `https://your-app.vercel.app`

## Evaluation Notes

- UI follows Flipkart color palette (`#2874f0`, `#fb641b`, `#f1f3f6`) and layout patterns.
- Database schema uses normalized tables for products, cart, orders, and wishlist.
- Code is organized by domain on the backend and by pages/components on the frontend.
