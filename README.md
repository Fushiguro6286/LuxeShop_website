<div align="center">
  <img src="https://img.icons8.com/color/150/000000/online-store.png" alt="LuxeShop Logo" width="100"/>

  # 🛍️ LuxeShop — Modern E-Commerce Experience
  
  **A complete, production-ready React e-commerce application built with modern patterns.**
  
  [![React](https://img.shields.io/badge/React-18.2.0-61DBFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=react-router)](https://reactrouter.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/)
</div>

<br />

> LuxeShop is a sophisticated, feature-rich front-end application tailored to provide a seamless online shopping experience. Designed with a focus on UI/UX, animations, and clean architecture, this application demonstrates industry best practices for state management and component composition.

---

## ✨ Features That Stand Out

- 🎨 **Elegant Design System** — Built with CSS modules and bespoke tokens with smooth dark-mode aesthetics.
- ✨ **Fluid Animations** — Micro-interactions and page transitions powered by `framer-motion`.
- 🛒 **Robust Cart System** — Global state with `useReducer` and the Context API, complete with `localStorage` persistence.
- ❤️ **Wishlist Tracking** — Seamlessly save and track desired items across browser sessions.
- 🔍 **Live Debounced Search** — Instant product searching with custom `useDebounce` hook.
- 🏷️ **Advanced Filtering** — Dynamic updates for multi-dimensional filtering (category, price range, and sort methods).
- 🧾 **Secure Checkout Flow** — Multi-step validation using `react-hook-form` and `yup`.
- 📱 **Fully Responsive** — Beautifully scales from mobile to high-resolution desktop views.
- 💀 **Skeleton Loading States** — Enhanced UX during asynchronous data fetches.

---

## 🚀 Quick Start Guide

Want to run the project locally? Follow these simple steps:

1. **Clone the repository** (if applicable) and navigate into the folder:
   ```bash
   cd ecommerce-app
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```
4. **View in the browser**: Open `http://localhost:3000` to see LuxeShop in action!

---

## 📁 System Architecture

Clean folder structure ensuring scalability and maintainability:

```text
src/
├── components/          # Reusable UI building blocks
│   ├── Filters/         # Category & Price filters
│   ├── Navbar/          # Dynamic navigation with badge counters
│   ├── ProductCard/     # Wishlist/Cart enabled product items
│   └── ...              # Other UI fragments
├── context/             # Global Application State (React Context)
│   ├── CartContext.js      
│   └── WishlistContext.js
├── hooks/               # Custom React Hooks
│   ├── useProducts.js   # API Fetch logic encapsulate hook
│   ├── useCart.js       # Context consumer alias
│   └── useDebounce.js   # Delayed execution hook
├── pages/               # Top-level Route Components
│   ├── Home/            
│   ├── Products/        
│   ├── ProductDetails/  
│   ├── Checkout/        
│   └── ...              
├── services/            # Axios API wrappers
├── utils/               # Helper methods (currency, sorting, maths)
├── App.js               # Router & Context Provider Shell
└── index.css            # Tokenized CSS & Global Defaults
```

---

## 🛠️ Tech Stack & Concepts

LuxeShop acts as a comprehensive sandbox demonstrating advanced React capabilities.

### Technologies
- **React.js 18** (Functional components)
- **React Router v6** (Splat routing & nested config)
- **Framer Motion** (Page entrance animations & hover dynamics)
- **Axios** (API Requests)
- **React Hook Form + Yup** (Safe, performant validations)
- **React Toastify** (Beautiful non-blocking notifications)

### Architectural Patterns
- **Provider Pattern**: Encapsulating Cart & Wishlist domains globally.
- **Custom Hooks Pattern**: Abstracting logic (`useProducts`, `useDebounce`) entirely away from UI presentation.
- **Controlled Components**: Granular control over form elements bridging complex validations.

---

## 🌐 Mock API Engine

LuxeShop consumes the [Fake Store API](https://fakestoreapi.com), an extremely reliable REST API for e-commerce boilerplate.

- `GET /products` — Fetch full catalogue
- `GET /products/categories` — Isolate active categories
- `GET /products/:id` — Details loader

---

<div align="center">
  <sub>Built with ❤️ by an enthusiast of the Modern Web.</sub>
</div>
