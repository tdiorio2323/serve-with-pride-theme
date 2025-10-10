# TODO: Truth Matters E-Commerce Launch Plan

**Owner:** Tyler (default)
**Last Updated:** 2025-10-07
**Status:** 🔴 Alpha - Not Production Ready

---

## 1. NOW (P0 - Blockers for Checkout + Production Deploy)

### 1.1 Payment Integration - CRITICAL

- [ ] **Install Stripe** • Enable payment processing • `package.json` + env setup
  ```bash
  npm install @stripe/stripe-js stripe
  ```
  **Files:** `package.json`
  **Acceptance:** Stripe SDK installed, imports work
  **Est:** 0.25h

- [ ] **Create Stripe Account & Get Keys** • Production payment setup • Stripe Dashboard
  **Why:** Need API keys for checkout
  **Steps:**
  1. Sign up at https://stripe.com
  2. Navigate to Developers > API Keys
  3. Copy Publishable Key (starts with `pk_test_`) and Secret Key (`sk_test_`)
  **Acceptance:** Have both test and live keys
  **Est:** 0.5h

- [ ] **Create `.env.example`** • Document all required env vars • Root directory
  **Files:** `/.env.example` (new file)
  **Content:**
  ```env
  # Stripe Payment
  VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
  STRIPE_SECRET_KEY=sk_test_your_secret_here

  # API Configuration
  VITE_API_URL=http://localhost:3001

  # Database (when backend added)
  DATABASE_URL=postgresql://user:pass@localhost:5432/truthmatters

  # Email (when added)
  SENDGRID_API_KEY=SG.your_key_here

  # Analytics (optional)
  VITE_GA4_ID=G-XXXXXXXXXX
  VITE_META_PIXEL_ID=123456789
  ```
  **Acceptance:** File committed to repo
  **Est:** 0.25h

- [ ] **Create `.env.local`** • Set up local development secrets • Root directory
  **Files:** `/.env.local` (gitignored)
  **Action:** Copy `.env.example` and fill with real test keys
  **Acceptance:** App loads with env vars accessible
  **Est:** 0.1h

- [ ] **Build Checkout Page** • Complete payment flow • New file
  **Files:** `src/pages/Checkout.tsx` (new)
  **Why:** "Proceed to Checkout" button currently does nothing
  **Requirements:**
  - Address form (name, email, street, city, state, zip)
  - Shipping method selection ($0 if >$75, else $8.99)
  - Order summary with donation line item
  - Stripe Elements payment form
  - Submit → create Stripe checkout session
  **Code Pattern:**
  ```tsx
  import { loadStripe } from '@stripe/stripe-js';
  import { Elements, CardElement } from '@stripe/react-stripe-js';

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  export default function Checkout() {
    const { state } = useCart();
    // Form handling with react-hook-form
    // Calculate shipping, tax, total
    // Submit to backend API
  }
  ```
  **Acceptance:** Can navigate to /checkout, see form, Stripe iframe loads
  **Est:** 4h

- [ ] **Add Checkout Route** • Enable navigation to checkout • `src/App.tsx`
  **Files:** `src/App.tsx:72` (before catch-all route)
  **Code:**
  ```tsx
  import Checkout from "./pages/Checkout";
  // ...
  <Route path="/checkout" element={<Checkout />} />
  ```
  **Acceptance:** `/checkout` accessible
  **Est:** 0.1h

- [ ] **Wire Checkout Button** • Navigate to checkout page • `src/components/ShoppingCart.tsx:142`
  **Files:** `src/components/ShoppingCart.tsx`
  **Current:** `<Button className="w-full" size="lg">Proceed to Checkout</Button>`
  **Replace with:**
  ```tsx
  <Button
    className="w-full"
    size="lg"
    onClick={() => {
      closeCart();
      navigate('/checkout');
    }}
  >
    Proceed to Checkout
  </Button>
  ```
  **Imports needed:** `import { useNavigate } from 'react-router-dom';`
  **Acceptance:** Clicking button navigates to /checkout
  **Est:** 0.25h

### 1.2 Backend API - CRITICAL

- [ ] **Choose Backend Stack** • Decide on tech approach • Architecture decision
  **Options:**
  - **Option A (Fast):** Vercel Serverless Functions (Next.js API routes pattern in Vite)
  - **Option B (Simple):** Supabase (Postgres + Auth + Storage)
  - **Option C (Full Control):** Node.js + Express + Postgres (separate repo)
  **Recommendation:** Option A for speed (leverage existing Vercel setup)
  **Acceptance:** Decision documented in `ARCHITECTURE.md`
  **Est:** 0.5h

- [ ] **Create Orders API Endpoint** • Accept and store orders • New backend file
  **Why:** Cart data vanishes on refresh; need persistent orders
  **If using Vercel Functions:**
  **Files:** `api/orders.ts` (new)
  **Code stub:**
  ```typescript
  import type { VercelRequest, VercelResponse } from '@vercel/node';
  import Stripe from 'stripe';

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });

  export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { items, email, shippingAddress } = req.body;

    // TODO: Validate items, calculate total
    // TODO: Create Stripe payment intent
    // TODO: Store order in database
    // TODO: Send confirmation email

    return res.status(200).json({ clientSecret: 'xxx', orderId: 'xxx' });
  }
  ```
  **Acceptance:** Endpoint responds to POST requests
  **Est:** 3h

- [ ] **Set Up Database** • Store orders persistently • DB setup
  **Recommendation:** Supabase (free tier, Postgres, instant API)
  **Steps:**
  1. Create project at https://supabase.com
  2. Create `orders` table:
  ```sql
  CREATE TABLE orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp DEFAULT now(),
    email text NOT NULL,
    total numeric NOT NULL,
    status text DEFAULT 'pending',
    items jsonb NOT NULL,
    shipping_address jsonb NOT NULL,
    stripe_payment_intent_id text
  );
  ```
  3. Get connection string, add to `.env`
  **Acceptance:** Can query orders table
  **Est:** 1h

- [ ] **Connect Checkout to Backend** • Submit orders to API • `src/pages/Checkout.tsx`
  **Files:** `src/pages/Checkout.tsx` (update)
  **Code:**
  ```typescript
  const handleSubmit = async (formData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartState.items,
        email: formData.email,
        shippingAddress: formData,
        total: calculateTotal(),
      }),
    });
    const { clientSecret, orderId } = await response.json();
    // Confirm payment with Stripe
  };
  ```
  **Acceptance:** Form submission creates order in database
  **Est:** 2h

### 1.3 Fix Product ID Bug - CRITICAL

- [ ] **Standardize Product IDs to Strings** • Fix type mismatch • `src/contexts/CartContext.tsx`
  **Files:** `src/contexts/CartContext.tsx:4-5`
  **Current:**
  ```typescript
  export interface Product {
    id: number; // ❌ WRONG TYPE
  ```
  **Replace with:**
  ```typescript
  export interface Product {
    id: string; // ✅ Matches products.ts
  ```
  **Also update:**
  - Line 28: `payload: number` → `payload: string`
  - Line 68: `payload: { id: number` → `payload: { id: string`
  - Line 129: `removeItem: (id: number)` → `removeItem: (id: string)`
  - Line 130: `updateQuantity: (id: number, quantity: number)` → `updateQuantity: (id: string, quantity: number)`
  **Acceptance:** No TypeScript errors, cart operations work
  **Est:** 0.5h

- [ ] **Remove Product ID Hack** • Use proper string IDs • `src/pages/ProductPage.tsx:65`
  **Files:** `src/pages/ProductPage.tsx`
  **Current:**
  ```typescript
  id: parseInt(product.id.replace(/\D/g, '')) || Math.random() * 1000, // ❌ HACK
  ```
  **Replace with:**
  ```typescript
  id: product.id, // ✅ Use string directly
  ```
  **Acceptance:** Products add to cart with correct IDs
  **Est:** 0.1h

### 1.4 Order Confirmation - CRITICAL

- [ ] **Create Order Success Page** • Show order confirmation • New file
  **Files:** `src/pages/OrderSuccess.tsx` (new)
  **Why:** Users need confirmation their order was received
  **Requirements:**
  - Read order ID from URL params (`/order-success/:orderId`)
  - Display order summary, items, total
  - Show estimated shipping date
  - "Print receipt" button
  - "Continue shopping" CTA
  **Route:** Add to `src/App.tsx` before catch-all
  **Acceptance:** Successfully shows order details
  **Est:** 2h

- [ ] **Set Up Email Service** • Send order confirmations • SendGrid/Resend setup
  **Recommendation:** Resend (simpler, generous free tier)
  ```bash
  npm install resend
  ```
  **Files:** `api/send-email.ts` (new)
  **Env:** `RESEND_API_KEY=re_xxx`
  **Template:** HTML email with order details, tracking info
  **Acceptance:** Test email received in inbox
  **Est:** 2h

- [ ] **Trigger Confirmation Email** • Send on order create • `api/orders.ts`
  **Files:** `api/orders.ts` (update)
  **After order saved to DB:**
  ```typescript
  await sendOrderConfirmation({
    to: email,
    orderId: order.id,
    items: order.items,
    total: order.total,
  });
  ```
  **Acceptance:** Completing checkout sends email
  **Est:** 0.5h

### 1.5 Production Environment Setup

- [ ] **Add Env Vars to Vercel** • Configure production secrets • Vercel Dashboard
  **Why:** App needs keys in production
  **Steps:**
  1. Go to https://vercel.com/truthmatters/settings/environment-variables
  2. Add each var from `.env.example`
  3. Set Environment: Production, Preview, Development
  4. Use **live** Stripe keys for Production (pk_live_xxx, sk_live_xxx)
  **Acceptance:** All required vars set in Vercel
  **Est:** 0.5h

- [ ] **Configure Build Settings** • Ensure proper build • Vercel Dashboard
  **Settings:**
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
  - Node Version: 18.x
  **Files:** Can also create `vercel.json`:
  ```json
  {
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "framework": "vite"
  }
  ```
  **Acceptance:** Build succeeds on Vercel
  **Est:** 0.25h

---

## 2. NEXT (P1 - Polish for Launch Week)

### 2.1 Product Images & Assets

- [ ] **Replace Logo Placeholders with Product Photos** • Use real imagery • `src/data/products.ts`
  **Why:** Most products use same 2 logos; need actual product photography
  **Files:** `src/data/products.ts` (update all `images` arrays)
  **Required Assets:**
  - T-shirt: front/back/detail shots (Black & White variants)
  - Hoodie: front/back/hood close-up
  - Hat: front/side/back angles
  - Patches: flat + on-garment shots
  - Accessories: lifestyle photos
  **Upload to:** `/public/products/` folder
  **Naming:** `{sku}-front.jpg`, `{sku}-back.jpg`, etc.
  **Acceptance:** All 21 products have ≥2 unique photos
  **Est:** 8h (if photos available; 40h if need photoshoot)

- [ ] **Optimize Product Images** • Reduce file sizes • Image processing
  **Why:** Current PNGs are 1-3MB each
  **Tool:** Use Sharp or online tools
  ```bash
  npm install sharp
  node scripts/optimize-images.js
  ```
  **Script stub:**
  ```javascript
  const sharp = require('sharp');
  const fs = require('fs');
  const path = require('path');

  const inputDir = './public/products';
  const outputDir = './public/products/optimized';

  fs.readdirSync(inputDir).forEach(file => {
    sharp(path.join(inputDir, file))
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toFile(path.join(outputDir, file.replace('.png', '.jpg')));
  });
  ```
  **Acceptance:** Images <200KB each, no visible quality loss
  **Est:** 2h

- [ ] **Add Image Loading States** • Improve UX during load • Multiple files
  **Files:**
  - `src/components/ProductCard.tsx`
  - `src/pages/ProductPage.tsx`
  **Add:** Skeleton loaders using shadcn/ui Skeleton component
  **Code example:**
  ```tsx
  import { Skeleton } from "@/components/ui/skeleton";

  const [imageLoaded, setImageLoaded] = useState(false);

  {!imageLoaded && <Skeleton className="aspect-square" />}
  <img
    onLoad={() => setImageLoaded(true)}
    className={imageLoaded ? 'opacity-100' : 'opacity-0'}
  />
  ```
  **Acceptance:** Images fade in smoothly
  **Est:** 1h

### 2.2 Shipping & Tax

- [ ] **Implement Shipping Calculator** • Calculate real shipping costs • Backend logic
  **Files:** `api/orders.ts` or `src/utils/shipping.ts`
  **Options:**
  - **Simple:** Flat rate ($8.99 under $75, free over $75)
  - **Better:** Integrate ShipStation/EasyPost for live rates
  **Code (simple version):**
  ```typescript
  export const calculateShipping = (subtotal: number, state: string): number => {
    if (subtotal >= 75) return 0;
    if (['HI', 'AK'].includes(state)) return 19.99; // Higher for HI/AK
    return 8.99;
  };
  ```
  **Acceptance:** Shipping cost displays on checkout
  **Est:** 2h (simple) / 8h (API integration)

- [ ] **Add Tax Calculation** • Calculate sales tax by state • Backend
  **Why:** Required for legal compliance
  **Options:**
  - **DIY:** Use state tax table (maintenance burden)
  - **API:** TaxJar ($19/mo) or Avalara
  **Recommendation:** Start with simple state table, upgrade to API later
  **Files:** `src/utils/tax.ts`
  **Code stub:**
  ```typescript
  const TAX_RATES = {
    'CA': 0.0725, // California
    'TX': 0.0625, // Texas
    'NY': 0.04,   // New York
    // ... all states
  };

  export const calculateTax = (subtotal: number, state: string): number => {
    const rate = TAX_RATES[state] || 0;
    return subtotal * rate;
  };
  ```
  **Acceptance:** Tax line appears on checkout
  **Est:** 3h

### 2.3 Search Functionality

- [ ] **Implement Search** • Enable product search • New component + page
  **Files:**
  - `src/components/SearchDialog.tsx` (new) - modal search
  - `src/pages/SearchResults.tsx` (new) - results page
  **Wire to:** Search icon in `Header.tsx:111`
  **Use:** Existing `searchProducts()` from `products.ts:304`
  **Features:**
  - Keyboard shortcut (Cmd+K)
  - Fuzzy matching (name, description, tags)
  - Recent searches (localStorage)
  - No results state with suggestions
  **Acceptance:** Search returns relevant products
  **Est:** 4h

### 2.4 Account System (Basic)

- [ ] **Install Supabase Auth** • Add user authentication • Supabase setup
  ```bash
  npm install @supabase/supabase-js
  ```
  **Files:** `src/lib/supabase.ts` (new)
  **Code:**
  ```typescript
  import { createClient } from '@supabase/supabase-js';

  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON_KEY!
  );
  ```
  **Acceptance:** Can sign up/sign in users
  **Est:** 1h

- [ ] **Create Login/Signup Pages** • User authentication UI • New pages
  **Files:**
  - `src/pages/Login.tsx`
  - `src/pages/Signup.tsx`
  **Use:** Supabase auth methods (`supabase.auth.signInWithPassword()`)
  **Features:**
  - Email + password
  - "Forgot password" link
  - Social login (Google) - optional
  **Acceptance:** Users can create accounts and log in
  **Est:** 3h

- [ ] **Add Order History Page** • Show past orders • New page
  **Files:** `src/pages/OrderHistory.tsx`
  **Query:** Fetch orders where `user_id = current_user`
  **Display:** Table with date, order #, total, status
  **Acceptance:** Logged-in users see their orders
  **Est:** 2h

### 2.5 Inventory Management

- [ ] **Enforce Stock Checks** • Prevent ordering out-of-stock items • Multiple files
  **Files:**
  - `src/pages/ProductPage.tsx` - disable "Add to Cart" if out of stock
  - `api/orders.ts` - validate stock before order creation
  **Code (ProductPage):**
  ```tsx
  <Button
    onClick={handleAddToCart}
    disabled={!product.inStock}
  >
    {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
  </Button>
  ```
  **Acceptance:** Cannot add OOS products to cart
  **Est:** 1h

- [ ] **Add "Notify When Back in Stock"** • Collect emails for OOS products • New feature
  **Files:**
  - `src/pages/ProductPage.tsx` - show email input when OOS
  - `api/stock-notifications.ts` - store email requests
  **DB Table:**
  ```sql
  CREATE TABLE stock_notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL,
    product_id text NOT NULL,
    created_at timestamp DEFAULT now()
  );
  ```
  **Acceptance:** Email collected for OOS products
  **Est:** 2h

### 2.6 Analytics & Tracking

- [ ] **Install Google Analytics 4** • Track site usage • `index.html` + env
  **Files:** `index.html:25` (before `</head>`)
  **Code:**
  ```html
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  ```
  **Env:** `VITE_GA4_ID=G-XXXXXXXXXX` (replace with real ID from GA4)
  **Acceptance:** Events appear in GA4 dashboard
  **Est:** 1h

- [ ] **Add E-commerce Tracking Events** • Track purchases • Checkout pages
  **Files:** `src/pages/Checkout.tsx`, `src/pages/OrderSuccess.tsx`
  **Events to track:**
  - `begin_checkout` (when user lands on checkout)
  - `add_payment_info` (payment form filled)
  - `purchase` (order completed)
  **Code example:**
  ```typescript
  gtag('event', 'purchase', {
    transaction_id: orderId,
    value: total,
    currency: 'USD',
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
  ```
  **Acceptance:** Purchase events show in GA4 "Monetization" report
  **Est:** 2h

- [ ] **Install Meta Pixel** • Facebook conversion tracking • `index.html`
  **Why:** Track ads performance if running Facebook/Instagram ads
  **Files:** `index.html:25`
  **Code:** Get from Facebook Events Manager
  **Env:** `VITE_META_PIXEL_ID=123456789`
  **Acceptance:** PageView events in Meta Events Manager
  **Est:** 0.5h

### 2.7 SEO Improvements

- [ ] **Add Per-Page Meta Tags** • Unique title/description per route • All page files
  **Files:** Every page in `src/pages/`
  **Tool:** Use React Helmet or custom hook
  ```bash
  npm install react-helmet-async
  ```
  **Wrapper:** Add to `src/App.tsx`:
  ```tsx
  import { HelmetProvider } from 'react-helmet-async';
  // Wrap entire app
  ```
  **Usage in pages:**
  ```tsx
  import { Helmet } from 'react-helmet-async';

  <Helmet>
    <title>Product Name - Truth Matters</title>
    <meta name="description" content="Product description..." />
  </Helmet>
  ```
  **Acceptance:** Each page has unique title in browser tab
  **Est:** 3h

- [ ] **Generate Sitemap** • Help search engines index site • Build script
  **Files:** `scripts/generate-sitemap.js` (new)
  **Code:**
  ```javascript
  const fs = require('fs');
  const { products } = require('../src/data/products.ts');

  const pages = [
    '/',
    '/about',
    '/contact',
    '/all-products',
    '/t-shirts',
    '/hoodies',
    '/hats',
    '/patches',
    '/accessories',
    ...products.map(p => `/product/${p.id}`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `
      <url>
        <loc>https://truthmatters.com${page}</loc>
        <changefreq>weekly</changefreq>
      </url>
    `).join('')}
  </urlset>`;

  fs.writeFileSync('./public/sitemap.xml', sitemap);
  ```
  **Run in:** `package.json` add `"postbuild": "node scripts/generate-sitemap.js"`
  **Acceptance:** `sitemap.xml` created in `public/`
  **Est:** 1h

- [ ] **Add Structured Data (Product Schema)** • Rich snippets in Google • Product pages
  **Files:** `src/pages/ProductPage.tsx`
  **Add JSON-LD:**
  ```tsx
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.images[0],
      "description": product.description,
      "sku": product.sku,
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "USD",
        "availability": product.inStock ? "InStock" : "OutOfStock"
      }
    })}
  </script>
  ```
  **Acceptance:** Test with Google Rich Results Test tool
  **Est:** 1h

### 2.8 Accessibility Fixes

- [ ] **Add ARIA Labels** • Screen reader support • Multiple files
  **Files:** `src/components/ShoppingCart.tsx`, `Header.tsx`, etc.
  **Examples:**
  - Quantity buttons: `aria-label="Increase quantity"`
  - Remove button: `aria-label="Remove item from cart"`
  - Search icon: `aria-label="Search products"`
  **Tool:** Run `npx pa11y http://localhost:8080` to find issues
  **Acceptance:** Screen reader can navigate all functionality
  **Est:** 2h

- [ ] **Fix Color Contrast** • Meet WCAG AA standards • `src/index.css`, components
  **Check with:** Chrome DevTools Lighthouse > Accessibility
  **Issues likely:**
  - White text on red (primary) - may need darker red or bolder text
  - Gray text on white - ensure 4.5:1 ratio
  **Tool:** https://webaim.org/resources/contrastchecker/
  **Acceptance:** All text meets 4.5:1 contrast ratio
  **Est:** 1h

- [ ] **Add Keyboard Focus Styles** • Visible focus indicators • `src/index.css`
  **Add to global CSS:**
  ```css
  *:focus-visible {
    outline: 2px solid hsl(var(--primary));
    outline-offset: 2px;
  }

  button:focus-visible,
  a:focus-visible {
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.3);
  }
  ```
  **Acceptance:** Tab navigation shows clear focus ring
  **Est:** 0.5h

### 2.9 Error Handling

- [ ] **Add Error Boundaries** • Catch React errors gracefully • New component
  **Files:** `src/components/ErrorBoundary.tsx` (new)
  **Code:**
  ```tsx
  import React from 'react';

  class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
  > {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
              <Button onClick={() => window.location.href = '/'}>
                Return Home
              </Button>
            </div>
          </div>
        );
      }
      return this.props.children;
    }
  }
  ```
  **Wrap:** `src/App.tsx` - wrap Routes
  **Acceptance:** App shows error UI instead of white screen
  **Est:** 1h

- [ ] **Create 500 Error Page** • Handle server errors • New page
  **Files:** `src/pages/ServerError.tsx` (new)
  **Similar to 404 but for API failures**
  **Display:** Friendly message, "Try again" button, support email
  **Acceptance:** Failed API calls redirect to /500
  **Est:** 0.5h

- [ ] **Add API Error Toasts** • Show user-friendly error messages • Checkout, Cart
  **Files:** Anywhere `fetch()` is called
  **Pattern:**
  ```tsx
  try {
    const res = await fetch('/api/orders', {...});
    if (!res.ok) throw new Error('Order failed');
  } catch (error) {
    toast.error('Unable to process order. Please try again.');
  }
  ```
  **Acceptance:** Network errors show toast instead of console error
  **Est:** 1h

### 2.10 Performance Optimization

- [ ] **Implement Code Splitting** • Reduce bundle size • Vite config
  **Why:** Current bundle is 585KB (over 500KB warning)
  **Files:** `vite.config.ts`
  **Add:**
  ```typescript
  export default defineConfig({
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-select', ...],
            'utils': ['date-fns', 'zod', 'clsx'],
          }
        }
      }
    }
  });
  ```
  **Also:** Use dynamic imports for pages:
  ```tsx
  const Checkout = lazy(() => import('./pages/Checkout'));
  // Wrap with <Suspense>
  ```
  **Acceptance:** Bundle split into <300KB chunks
  **Est:** 2h

- [ ] **Add Image Lazy Loading** • Defer offscreen images • Product cards
  **Files:** `src/components/ProductCard.tsx:??`
  **Add to `<img>` tags:**
  ```tsx
  loading="lazy"
  ```
  **Acceptance:** Network tab shows images load as you scroll
  **Est:** 0.25h

- [ ] **Optimize Fonts** • Preload critical fonts • `index.html`
  **Files:** `index.html:8-10`
  **Add before Google Fonts link:**
  ```html
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" />
  ```
  **Also:** Self-host fonts for better performance (optional, advanced)
  **Acceptance:** Lighthouse shows improved font loading
  **Est:** 0.5h

---

## 3. LATER (P2 - Nice to Have)

### 3.1 Advanced Features

- [ ] **Wishlist Persistence** • Save wishlist to backend • Database + API
  **Est:** 3h

- [ ] **Product Reviews** • Allow user reviews/ratings • New feature
  **Est:** 8h

- [ ] **Discount Codes** • Coupon system • Backend + Checkout
  **Est:** 4h

- [ ] **Email Newsletter** • Mailchimp/ConvertKit integration • Footer form
  **Est:** 2h

- [ ] **Gift Cards** • Sell and redeem gift cards • Stripe products
  **Est:** 6h

- [ ] **Size Guide Modal** • Interactive sizing help • Modal component
  **Est:** 3h

- [ ] **Product Recommendations** • "You may also like" • Algorithm
  **Est:** 4h

- [ ] **Referral Program** • Share and earn discounts • Viral loop
  **Est:** 8h

### 3.2 Admin Tools

- [ ] **Admin Dashboard** • Manage orders, products • New protected route
  **Est:** 16h

- [ ] **Inventory Management UI** • Update stock levels • Admin feature
  **Est:** 8h

- [ ] **Order Fulfillment UI** • Mark orders as shipped • Admin feature
  **Est:** 4h

### 3.3 Marketing

- [ ] **Blog CMS Integration** • Content marketing • Sanity/Contentful
  **Est:** 12h

- [ ] **Email Drip Campaigns** • Abandoned cart recovery • Klaviyo/SendGrid
  **Est:** 8h

- [ ] **Retargeting Pixels** • AdRoll, Pinterest, TikTok • Tracking scripts
  **Est:** 2h

---

## 4. CONTENT INTAKE LIST

### Product Images Needed (21 products × 3 shots each = 63 images)

**Format Spec:**
- Format: JPEG (not PNG to save space)
- Size: 1200×1200px minimum
- Quality: 85% JPEG compression
- Background: White or transparent
- Naming: `{sku}-{view}.jpg` (e.g., `TM-TSH-001-front.jpg`)

**Per Product:**
1. Front view (on model or flat lay)
2. Back view
3. Detail shot (logo close-up, texture, tag)

**Delivery:**
- Upload to: `/public/products/` folder
- Or provide Dropbox/Drive link to Tyler

### Marketing Assets

- [ ] Hero banner images (1920×600px) - 3 variants for rotation
- [ ] Category headers (1920×300px) - 5 categories
- [ ] About page team photos (800×800px) - 2-3 people
- [ ] Cause/charity images (1200×800px) - 3 organizations
- [ ] Social media OG image (1200×630px) - 1 main

### Copy Blocks

- [ ] Product detail bullets (replace generic ones) - per product
- [ ] Shipping policy full text (currently placeholder)
- [ ] Return policy details (30-day specifics)
- [ ] FAQ content expansion (add 10 more Q&As)
- [ ] About page full story (500 words)
- [ ] Privacy policy legal review
- [ ] Terms of service legal review

### CSV Product Data (For Future Import)

**If adding more products, use this schema:**

```csv
id,name,description,price,salePrice,category,gender,sizes,colors,tags,featured,inStock,sku,image1,image2,image3
tshirt-new-001,"New Product","Description here",29.99,,tshirt,unisex,"S,M,L,XL","Black,White","tag1,tag2",false,true,TM-TSH-999,/products/sku-front.jpg,/products/sku-back.jpg,/products/sku-detail.jpg
```

---

## 5. ENV/SECRETS TO SET

### Development (.env.local)

```bash
# Stripe Test Keys
VITE_STRIPE_PUBLIC_KEY=pk_test_51xxxxx
STRIPE_SECRET_KEY=sk_test_51xxxxx

# API
VITE_API_URL=http://localhost:3001

# Supabase (if using)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx

# Email
RESEND_API_KEY=re_xxxxx

# Analytics (optional for dev)
VITE_GA4_ID=G-XXXXXXXXXX
```

### Production (Vercel Dashboard)

**Same as above but with LIVE keys:**
- `VITE_STRIPE_PUBLIC_KEY` = `pk_live_xxxxx`
- `STRIPE_SECRET_KEY` = `sk_live_xxxxx`
- `VITE_API_URL` = `https://api.truthmatters.com` (or Vercel serverless)

**Set in:** Vercel Dashboard > Project Settings > Environment Variables

---

## 6. VERIFICATION TESTS (Manual Test Script)

**Run before each deploy:**

### Test 1: Product Browsing
1. ✅ Visit homepage → all sections load
2. ✅ Click "Shop" → see product grid
3. ✅ Click product → see product page
4. ✅ All images load (no broken images)
5. ✅ Size/color selection works

### Test 2: Add to Cart
1. ✅ Select size and color
2. ✅ Click "Add to Cart"
3. ✅ Toast notification appears
4. ✅ Cart badge shows count
5. ✅ Open cart → item listed correctly

### Test 3: Cart Management
1. ✅ Increase quantity → price updates
2. ✅ Decrease quantity → price updates
3. ✅ Remove item → disappears
4. ✅ Add multiple products → all appear
5. ✅ Donation line item calculated ($1 per item)

### Test 4: Checkout (When implemented)
1. ✅ Click "Proceed to Checkout"
2. ✅ Navigate to checkout page
3. ✅ Fill shipping form → validation works
4. ✅ Select shipping method → cost updates
5. ✅ Tax calculated correctly
6. ✅ Enter Stripe test card: `4242 4242 4242 4242`
7. ✅ Submit order → processes successfully
8. ✅ Redirect to order success page

### Test 5: Order Confirmation
1. ✅ Order success page shows correct details
2. ✅ Confirmation email received
3. ✅ Check database → order recorded
4. ✅ Check Stripe dashboard → payment captured

### Test 6: Mobile
1. ✅ Test on real iPhone/Android
2. ✅ Mobile menu works
3. ✅ Cart drawer usable
4. ✅ Checkout form usable on small screen
5. ✅ All tap targets ≥44px

### Test 7: Error Cases
1. ✅ Enter invalid credit card → error shown
2. ✅ Lose internet → friendly error
3. ✅ Navigate to fake URL → 404 page
4. ✅ API failure → error boundary catches

### Test 8: Accessibility
1. ✅ Tab through page → focus visible
2. ✅ Use screen reader → all content readable
3. ✅ Zoom to 200% → still usable
4. ✅ Keyboard-only checkout → completable

### Test 9: Performance
1. ✅ Run Lighthouse on homepage → score ≥90
2. ✅ Run on product page → score ≥90
3. ✅ Check Network tab → no huge files (>2MB)
4. ✅ Test on 3G throttle → loads in <5s

---

## 7. RELEASE CHECKLIST

**Pre-Launch (1 day before):**
- [ ] All P0 tasks complete
- [ ] Run full verification test suite (Section 6)
- [ ] Lighthouse scores ≥90 across pages
- [ ] All env vars set in Vercel
- [ ] Stripe webhook configured and tested
- [ ] Test order placed successfully in production
- [ ] Confirmation email received
- [ ] Order appears in database
- [ ] Legal pages reviewed (privacy, terms)
- [ ] SSL certificate active (https://)
- [ ] Custom domain configured (if applicable)
- [ ] Google Analytics tracking verified
- [ ] Sitemap submitted to Google Search Console

**Launch Day:**
- [ ] Final build: `npm run build`
- [ ] Deploy to Vercel: `git push` (auto-deploy) or `vercel --prod`
- [ ] Smoke test production:
  - [ ] Homepage loads
  - [ ] Can browse products
  - [ ] Can add to cart
  - [ ] Can complete checkout (use real card in test mode)
  - [ ] Confirmation email sent
- [ ] Monitor error logs for 1 hour
- [ ] Post-launch announcement (social, email)

**Post-Launch (Week 1):**
- [ ] Daily order monitoring
- [ ] Check analytics (traffic, conversion rate)
- [ ] Respond to customer support inquiries
- [ ] Fix any bugs reported
- [ ] Collect user feedback
- [ ] Plan next iteration (P1 tasks)

---

## SUMMARY

**Total Estimated Hours:** 120-150h to production-ready

**Critical Path (P0):** 40-50h
- Payment integration: 12h
- Backend API: 8h
- Fix product IDs: 1h
- Order confirmation: 5h
- Email setup: 3h
- Environment config: 2h
- Testing: 10h

**Owner:** Tyler (all tasks unless reassigned)

**Next Action:** Start with **1.1 Payment Integration** (install Stripe)

**Questions/Blockers:** Contact Tyler at [your-email@example.com]

---

*Generated by Claude Code on 2025-10-07*
