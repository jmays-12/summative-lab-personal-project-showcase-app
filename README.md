# The Saltwater Source

A React-based saltwater aquarium storefront Single Page Application built for browsing marine livestock, viewing detailed species information, managing a shopping cart, and maintaining products through an admin portal.

The project focuses on creating a modern reef aquarium shopping experience with a dark ocean-inspired UI, responsive product cards, detailed product pages, and simple product management.

## Features

### Customer Experience

- Browse available saltwater livestock
- Search/filter products
- View individual product details
- Fish/product display cards currently support:
    - Common name
    - Scientific name
    - Short description
    - Extended description & care information
    - Pricing and discounts
- Add products to cart
- Adjust cart quantities
- Remove items from cart
- View order summary

### Product Catalog

Products include:

- Common names
- Scientific species names
- Short descriptions for product cards
- Extended descriptions for product detail pages
- Images
- Pricing & sale percentage

Example product information includes care notes such as:

- Tank requirements
- Compatibility
- Difficulty level
- Habitat information

### Admin Portal

The admin section allows management of inventory:

- Add new fish/products
- Edit existing products
- Delete products

Products use string IDs to remain compatible with generated database identifiers.

---

## Tech Stack

### Frontend

- React & React Router
- Context API for shared state management
- CSS custom properties for theming
- Responsive CSS Grid and Flexbox layouts

### Data

Product data is stored in JSON format during development.

Example structure:

```json
{
    "id": "jmb1p0tU2kA",
    "name": "Clownfish",
    "species": "Amphiprioninae ocellaris",
    "shortDescription": "Bright orange reef fish with a hardy personality.",
    "extendedDescription": "Detailed care information...",
    "image": "/assets/clownfish.png",
    "price": 24.99,
    "salePercentage": 0
}
```

---

## Project Structure

Example structure:

```
src/
├── components/
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   └── Navbar.jsx
│
├── context/
│   ├── ProductsContext.jsx
│   └── CartContext.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── ShopPage.jsx
│   ├── ProductPage.jsx
│   ├── CartPage.jsx
│   └── AdminPortalPage.jsx
│
├── utils/
│   └── pricing.js
│
└── assets/
    └── product images
```

---

## Design

The application uses an ocean-inspired theme:

- Deep navy backgrounds
- Cyan accent colors
- Glass-like navigation elements
- Rounded product cards
- Soft shadows and hover animations

The UI uses reusable styling patterns:

- Product card components
- Product detail layouts
- Shared buttons
- Consistent pricing displays

---

## Running Locally

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will run locally through the Vite development server.

---

## Product Data Management

Products currently use JSON-based storage for development.

To add a new product:

1. Add a new object to the products collection
2. Provide:
    - Unique string ID
    - Product name
    - Species
    - Description fields
    - Image path
    - Price
    - Sale percentage

3. Ensure the image exists in the assets folder

---

## Future Improvements

Potential additions:

- Persistent database storage
- User authentication
- Customer accounts
- Checkout/payment flow
- Order history
- Inventory tracking
- Fish compatibility recommendations
- Tank setup recommendations
- Favorites/wishlist functionality
- Product reviews

---

## Notes

This project is currently focused on the storefront experience and frontend architecture. The catalog, cart, and admin tools provide a foundation that could later be connected to a production backend and real inventory system.
