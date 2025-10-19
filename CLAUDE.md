# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based e-commerce website built with Vite, TypeScript, React Router, and shadcn/ui components. It's a patriotic-themed merchandise store featuring products like t-shirts, hoodies, hats, patches, and accessories.

## Development Commands

**Package Manager**: This project uses `npm` (package.json present; pnpm-lock.yaml is gitignored).

```bash
# Install dependencies
npm install

# Start development server (runs on port 8080)
npm run dev

# Build for production (includes sitemap generation)
npm run build

# Build for development mode
npm run build:dev

# Lint the codebase
npm run lint

# Strict linting (no warnings)
npm run lint:strict

# Type check without emitting files
npm run typecheck

# Preview production build (runs on port 4173)
npm run preview

# Run Playwright E2E tests
npm run test

# Run tests with UI mode
npm run test:ui

# Run E2E tests (alias for npm run test)
npm run test:e2e

# Run Lighthouse CI performance tests
npm run lhci

# Analyze bundle size
npm run analyze:bundle

# Audit routes
npm run analyze:routes

# Generate sitemap (runs automatically during build)
npm run generate:sitemap
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
- **Testing**: Playwright for E2E tests, Lighthouse CI for performance
- **SEO**: react-helmet-async for meta tags, automated sitemap generation

## Architecture

### Routing Structure

Routes are defined in `src/App.tsx` using React Router v6 with v7 future flags enabled. Key routing patterns:

- Static routes for pages like `/about`, `/contact`, `/faq`
- Category routes like `/t-shirts`, `/hoodies`, `/hats`
- Dynamic product route: `/product/:id` handled by `ProductPage.tsx`
- Catch-all `*` route for 404 - **IMPORTANT**: Add all custom routes ABOVE the catch-all route

**Route Loading Strategy**:
- Index and NotFound pages are eagerly loaded for immediate availability
- All other pages use `React.lazy()` for code splitting and performance
- Suspense boundary shows loading state during lazy load transitions

Provider hierarchy (from outer to inner):
1. QueryClientProvider (TanStack Query)
2. TooltipProvider (Radix UI)
3. CartProvider (Custom cart state)
4. BrowserRouter (React Router with future flags: v7_relativeSplatPath, v7_startTransition)

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

**CartItem Interface**: CartItem in `src/contexts/CartContext.tsx` has a simplified structure compared to the full Product interface:
- id: string (matches Product.id from products.ts)
- name, price, image, qty: basic product info
- variant: optional size and color selection
- Note: CartItem is specifically designed for cart state, not a duplicate Product definition

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

### Styling & Design System

**Tailwind Configuration** (`tailwind.config.ts`):
- **Custom brand colors**: Access via `brand-red`, `brand-dark`, `brand-navy`, `brand-gray`
- **Custom fonts**: 'Bebas Neue' for display text, 'Inter' for body/sans
- Typography plugin enabled for rich text (`@tailwindcss/typography`)
- Custom animations via tailwindcss-animate
- Dark mode support via next-themes (class-based)

**Design System** (`src/index.css`):
- All colors defined as HSL CSS variables in `:root`
- Custom gradients: `--gradient-hero`, `--gradient-red`, `--gradient-premium`
- Enhanced shadows: `--shadow-card`, `--shadow-button`, `--shadow-elegant`
- Glass effect variables: `--glass-bg`, `--glass-border`
- Brand colors: Truth Red (352 76% 50%), Service Blue (209 42% 16%)

**Utilities**:
- `cn()` from `src/lib/utils.ts` for conditional class merging
- Custom `.hero-flag-background` utility class with overlay effect

### Checkout & Payments

**Mock Checkout Flow**: The checkout process is currently front-end only with no real payment integration:
- Mock implementation in `src/lib/checkoutMock.ts`
- Flow: Cart → Checkout → Order Success
- No Stripe API calls or backend processing
- `createCheckoutSessionMock()` returns a mock success URL

### Performance Optimizations

- **Route-level code splitting**: All non-critical pages lazy loaded with React.lazy()
- **Image optimization**: ProductCard and ProductGrid components use:
  - `loading="lazy"` for deferred loading
  - `decoding="async"` for non-blocking decode
  - `fetchPriority="low"` for below-fold images
- **Suspense boundaries**: Graceful loading states during route transitions
- **Component skeletons**: Loading states for improved perceived performance

## Testing

**E2E Testing with Playwright**:
- Test files located in `./tests` directory
- Base URL: `http://localhost:4173` (or `PREVIEW_BASE` env var)
- Runs against production preview build (automatically started via `webServer` config)
- CI configuration: retries 2x, single worker
- Test reports: HTML format

**Performance Testing**:
- Lighthouse CI via `npm run lhci`
- Use for performance regression testing before deployment

**Pre-PR Checklist**:
```bash
npm run lint:strict  # Must pass with zero warnings
npm run typecheck    # Must pass with no type errors
npm run preview      # Smoke test the production build
npm run test         # Run E2E tests
```

## Coding Conventions

**Naming & Style** (from AGENTS.md):
- React components: PascalCase (e.g., `ProductCard.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useCart`)
- Use `@/` path alias instead of relative imports
- 2-space indentation, single quotes in JSX attributes when needed
- Keep UI state colocated with components
- Move sharable utilities to `lib/utils/`

**Commit Style**:
- Follow Conventional Commits: `feat:`, `fix(ui):`, `chore:`
- Use imperative mood for commit messages
- Include high-level intent and implementation notes in PR descriptions
- Add screenshots/recordings for visual changes

## Development Notes

- Development server runs on `http://[::]:8080` (IPv6 localhost, port 8080)
- Preview server runs on port 4173
- Component tagging is enabled in development mode via lovable-tagger
- **TypeScript Configuration**: Strict mode partially disabled with:
  - `noImplicitAny: false`
  - `noUnusedParameters: false`
  - `noUnusedLocals: false`
  - `strictNullChecks: false`
  - `allowJs: true`
- ESLint configured with React-specific rules
- Some Next.js artifacts present (.next directory, next-env.d.ts) but project uses Vite
- React Router configured with v7 future flags for forward compatibility

## Project Origin

This project was initially created with Lovable (lovable.dev) and is now managed locally. The README.md contains Lovable-specific instructions that may not be fully relevant for local development.

## Additional Resources

- See [AGENTS.md](AGENTS.md) for detailed repository guidelines, module organization, and workflow expectations
