# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based e-commerce website built with Vite, TypeScript, React Router, and shadcn/ui components. It's a patriotic-themed merchandise store featuring products like t-shirts, hoodies, hats, patches, and accessories.

## Development Commands

```bash
# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Lint the codebase
npm run lint

# Preview production build
npm run preview
```

## Tech Stack

- **Build Tool**: Vite with SWC plugin for fast React compilation
- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6 with dynamic routes
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Context API for cart functionality
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Toasts**: Sonner

## Architecture

### Routing Structure

Routes are defined in `src/App.tsx` using React Router. Key routing patterns:

- Static routes for pages like `/about`, `/contact`, `/faq`
- Category routes like `/t-shirts`, `/hoodies`, `/hats`
- Dynamic product route: `/product/:id` handled by `ProductPage.tsx`
- Catch-all `*` route for 404 - **IMPORTANT**: Add all custom routes ABOVE the catch-all route

### Product Data

Products are centrally managed in `src/data/products.ts`:

- Product interface defines: id, name, description, price, salePrice, images, category, gender, sizes, colors, tags, featured, inStock, sku
- Helper functions: `getProductsByCategory`, `getProductsByGender`, `getFeaturedProducts`, `getProductById`, `searchProducts`
- Categories: 'tshirt' | 'hoodie' | 'hat' | 'patch' | 'accessory'
- Gender: 'mens' | 'womens' | 'unisex'

### Cart Context

Shopping cart managed via `src/contexts/CartContext.tsx`:

- Uses useReducer for state management
- Cart state persists to localStorage as 'truthmatters-cart'
- Actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART, TOGGLE_CART, OPEN_CART, CLOSE_CART
- Cart items track: product details, quantity, size, color
- Hook: `useCart()` provides access to cart state and methods

**Note**: There are two Product interfaces (one in `products.ts`, one in `CartContext.tsx`) - they differ slightly. CartItem extends the CartContext Product interface.

### Path Aliasing

TypeScript and Vite are configured with `@` alias pointing to `src/`:
```typescript
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
```

### Component Structure

- `src/components/` - Custom application components (Header, Footer, Hero, ProductCard, ShoppingCart, etc.)
- `src/components/ui/` - shadcn/ui components (Button, Card, Dialog, etc.)
- `src/pages/` - Route components (Index, About, ProductPage, AllProducts, category pages, etc.)
- `src/contexts/` - React Context providers
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions (utils.ts with `cn()` for class merging)

### Styling

- Tailwind CSS with custom config in `tailwind.config.ts`
- Typography plugin enabled for rich text
- Custom animations via tailwindcss-animate
- Dark mode support via next-themes
- Utility function `cn()` from `src/lib/utils.ts` for conditional class merging

## Development Notes

- Development server runs on `http://[::]:8080` (IPv6 localhost)
- Component tagging is enabled in development mode via lovable-tagger
- TypeScript strict mode is partially disabled (see tsconfig.json)
- ESLint configured with React-specific rules
- Some Next.js artifacts present (.next directory, next-env.d.ts) but project uses Vite

## Project Origin

This project was initially created with Lovable (lovable.dev) and is now managed locally. The README.md contains Lovable-specific instructions that may not be fully relevant for local development.
