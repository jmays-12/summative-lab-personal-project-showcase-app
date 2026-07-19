# The Saltwater Source

A saltwater aquarium storefront SPA built with React. Browse marine livestock, read up on individual species, manage a cart, and handle inventory through an admin portal — all wrapped in a dark, ocean-inspired UI.

## Features

**Shopping**

- Browse and search the full livestock catalog
- Product cards show common name, scientific name, short description, and pricing
- Detail pages include extended care notes (tank requirements, compatibility, difficulty, habitat)
- Sale pricing with discount badges
- Add to cart, adjust quantities, remove items, view order summary with tax and shipping

**Admin**

- Add, edit, and delete products through the admin portal

---

## Tech Stack

- React + React Router (client-side routing)
- Context API (`ProductsContext`, `CartContext`)
- CSS custom properties, Grid, and Flexbox
- Vite

---

## Project Structure

```
src/
├── components/
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   └── NavBar.jsx
├── context/
│   ├── ProductsContext.jsx
│   └── CartContext.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ShopPage.jsx
│   ├── ProductPage.jsx
│   ├── CartPage.jsx
│   └── AdminPortalPage.jsx
├── hooks/
│   └── useSearch.js
├── utils/
│   └── pricing.js
└── assets/
    └── (product images)
```

---

## Product Data

Products are stored as JSON during development. Each object looks like:

```json
{
    "id": "7",
    "name": "Mandarinfish",
    "species": "Synchiropus splendidus",
    "shortDescription": "A tiny reef fish with incredible colors and a reputation for being difficult to keep.",
    "extendedDescription": "Mandarinfish are famous for their bright blue, orange, and green patterns. They spend most of their time picking tiny organisms from live rock and sand, so they do best in mature reef tanks with plenty of natural food available. They are peaceful fish, but they can be picky eaters and are best kept by experienced aquarium owners.",
    "image": "/assets/mandarinfish.png",
    "price": 89.99,
    "salePercentage": 5
}
```

---

## Running Locally

```bash
git clone <repository-url>
npm install
npm run dev
```

You'll also need a `.env` file with your API URL:

```
VITE_API_URL=http://localhost:3000/products
```

---

## Testing

```bash
npm test
```

Tests cover the custom `useSearch` hook, cart state via `CartContext`, all four CRUD operations through `ProductsContext`, and client-side routing across all pages.

---

## What's Missing / Future Ideas

- Real backend and persistent storage
- Auth and customer accounts
- Checkout and payment flow
- Order history
- Fish compatibility checker
- Wishlist / favorites
- Product reviews
