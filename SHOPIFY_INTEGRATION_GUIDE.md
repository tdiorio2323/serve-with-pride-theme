# Shopify Backend Integration Guide

Complete instructions for connecting your custom React/Vite website to Shopify's backend infrastructure.

---

## 📋 Table of Contents

1. [Overview & Architecture](#overview--architecture)
2. [Shopify Setup](#shopify-setup)
3. [Integration Approaches](#integration-approaches)
4. [Recommended Approach: Shopify Storefront API](#recommended-approach-shopify-storefront-api)
5. [Implementation Guide](#implementation-guide)
6. [Product Data Migration](#product-data-migration)
7. [Cart & Checkout Integration](#cart--checkout-integration)
8. [Order Management](#order-management)
9. [Webhooks & Events](#webhooks--events)
10. [Testing & Deployment](#testing--deployment)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview & Architecture

### What You Get with Shopify Backend

**Included:**
- ✅ Product catalog management (via Shopify Admin)
- ✅ Inventory tracking (real-time stock levels)
- ✅ Payment processing (Shopify Payments, PayPal, Stripe, etc.)
- ✅ Checkout flow (hosted or embedded)
- ✅ Order management & fulfillment
- ✅ Customer accounts & profiles
- ✅ Tax calculation (automatic)
- ✅ Shipping rates & label printing
- ✅ Analytics & reporting
- ✅ Email notifications (order confirmations, shipping updates)
- ✅ Admin dashboard
- ✅ PCI compliance (Shopify handles security)

**What You Keep Custom:**
- 🎨 Your React frontend (full control)
- 🎨 Your brand experience & design
- 🎨 Your URL/domain
- 🎨 Your marketing site content

### Architecture Overview

```
┌─────────────────────────────────────────┐
│   Your Custom React/Vite Frontend      │
│   (truthmatters.com)                    │
│                                          │
│   - Product listings                     │
│   - Product detail pages                 │
│   - About, Blog, Content pages          │
│   - Custom UI/UX                         │
└──────────────┬──────────────────────────┘
               │
               │ API Calls
               │ (Shopify Storefront API)
               │
┌──────────────▼──────────────────────────┐
│      Shopify Backend                     │
│                                          │
│   - Product data & inventory            │
│   - Cart management                      │
│   - Checkout (hosted or embedded)       │
│   - Payment processing                   │
│   - Order fulfillment                    │
│   - Customer accounts                    │
│   - Admin dashboard                      │
└──────────────────────────────────────────┘
```

---

## 🛍️ Shopify Setup

### Step 1: Create Shopify Account

1. **Sign up for Shopify**
   - Go to https://www.shopify.com
   - Start free trial (14 days free, then $39-$399/month)
   - Choose a store name (e.g., "truthmatters-admin")
   - This URL is just for admin - customers won't see it

2. **Choose a Plan**
   - **Basic** ($39/month): Good for starting out
   - **Shopify** ($105/month): Better features, lower transaction fees
   - **Advanced** ($399/month): For high volume
   - **Plus** ($2,300/month): Enterprise level

### Step 2: Configure Shopify Store

1. **Set Up Store Details**
   - Navigate to: Settings → General
   - Enter business name, address, contact info
   - Upload logo
   - Set timezone and currency

2. **Configure Payment Providers**
   - Navigate to: Settings → Payments
   - Enable **Shopify Payments** (lowest fees, no transaction charges)
   - Or add PayPal, Stripe, etc. (additional 2% transaction fee)
   - Test mode vs. Production mode

3. **Set Up Shipping**
   - Navigate to: Settings → Shipping and delivery
   - Add shipping zones (Domestic, International)
   - Configure shipping rates (flat rate, calculated, free shipping)
   - Set up shipping profiles for different product types

4. **Configure Taxes**
   - Navigate to: Settings → Taxes and duties
   - Enable automatic tax collection
   - Configure tax override for specific regions if needed

5. **Set Up Domains**
   - Navigate to: Settings → Domains
   - Connect your custom domain (truthmatters.com)
   - You'll keep using this for your custom frontend
   - Shopify will handle checkout subdomain (checkout.truthmatters.com)

### Step 3: Create Shopify App for API Access

This is crucial for connecting your React frontend to Shopify.

1. **Enable Custom App Development**
   - Navigate to: Settings → Apps and sales channels
   - Click "Develop apps" (top right)
   - Click "Allow custom app development"
   - Confirm by clicking "Allow custom app development"

2. **Create a Custom App**
   - Click "Create an app"
   - App name: "Truth Matters Frontend" (or similar)
   - App developer: Your email
   - Click "Create app"

3. **Configure API Scopes**
   - Click "Configure Storefront API scopes"
   - Enable the following scopes:
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_read_product_inventory`
     - ✅ `unauthenticated_read_product_tags`
     - ✅ `unauthenticated_read_collection_listings`
     - ✅ `unauthenticated_write_checkouts`
     - ✅ `unauthenticated_read_checkouts`
     - ✅ `unauthenticated_write_customers`
     - ✅ `unauthenticated_read_customer_tags`
   - Click "Save"

4. **Install the App**
   - Click "Install app"
   - This generates your API credentials

5. **Get Your API Credentials**
   - **Storefront API Access Token**: Copy this (you'll need it in your React app)
   - **API Key**: Copy this as well
   - **Shop Domain**: Your myshopify.com domain (e.g., truthmatters-admin.myshopify.com)

   **IMPORTANT**: Store these securely - they're like passwords!

---

## 🔄 Integration Approaches

### Option 1: Shopify Storefront API (RECOMMENDED)

**Best for:** Custom headless commerce (what you have now)

**Pros:**
- ✅ Full control over frontend
- ✅ GraphQL API (modern, efficient)
- ✅ Real-time inventory
- ✅ Custom cart experience
- ✅ Keep your existing React app
- ✅ Seamless checkout experience

**Cons:**
- ⚠️ More development work
- ⚠️ Need to handle cart state management
- ⚠️ Need to implement product sync

**Use Cases:**
- You want to keep your custom React frontend
- You want full design control
- You have developer resources

---

### Option 2: Shopify Buy Button (EASIER)

**Best for:** Simple product embedding

**Pros:**
- ✅ Super easy to implement
- ✅ Pre-built cart and checkout
- ✅ Minimal coding required
- ✅ Works with existing site

**Cons:**
- ⚠️ Less customization
- ⚠️ Shopify-styled cart (limited control)
- ⚠️ Embedded widget feel

**Use Cases:**
- You want quick setup
- You're okay with Shopify-styled components
- You have limited dev resources

---

### Option 3: Hydrogen (Shopify's React Framework)

**Best for:** Starting fresh with Shopify's tools

**Pros:**
- ✅ Built by Shopify for Shopify
- ✅ Optimized performance
- ✅ Best practices built-in
- ✅ React Server Components

**Cons:**
- ⚠️ Would require rebuilding your site
- ⚠️ Less flexibility
- ⚠️ Learning curve

**Use Cases:**
- Starting a new project
- Want Shopify-optimized stack
- Need maximum performance

---

## ⭐ Recommended Approach: Shopify Storefront API

This is the best fit for your existing React/Vite site. You get Shopify's backend power while keeping your custom frontend.

---

## 🛠️ Implementation Guide

### Phase 1: Install Dependencies

```bash
npm install @shopify/hydrogen-react graphql-request graphql
npm install @shopify/shopify-api --save-dev
```

**Packages:**
- `@shopify/hydrogen-react`: Shopify's React components and hooks
- `graphql-request`: Simple GraphQL client
- `graphql`: GraphQL utilities

### Phase 2: Environment Configuration

Create `.env.local` file in your project root:

```bash
# Shopify Storefront API credentials
VITE_SHOPIFY_STORE_DOMAIN=truthmatters-admin.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here
VITE_SHOPIFY_API_VERSION=2024-01

# Optional: for server-side operations
SHOPIFY_ADMIN_API_TOKEN=your_admin_api_token_here
```

**IMPORTANT SECURITY:**
- ✅ Storefront API token is **safe** to expose in frontend (read-only, public access)
- ❌ Admin API token is **NOT safe** - only use server-side
- Add `.env.local` to `.gitignore`

Update `.gitignore`:
```
# Environment files
.env.local
.env.production.local
.env*.local
```

### Phase 3: Create Shopify Client

Create `src/lib/shopify.ts`:

```typescript
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  apiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01',
  publicAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

export default client;
```

**Alternative: Using graphql-request**

```typescript
import { GraphQLClient } from 'graphql-request';

const endpoint = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/${import.meta.env.VITE_SHOPIFY_API_VERSION}/graphql.json`;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
});
```

### Phase 4: Create Shopify Service Layer

Create `src/services/shopify.service.ts`:

```typescript
import { shopifyClient } from '@/lib/shopify';
import { gql } from 'graphql-request';

// GraphQL Queries
const GET_PRODUCTS_QUERY = gql`
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          tags
          availableForSale
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE_QUERY = gql`
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
      tags
      availableForSale
      seo {
        title
        description
      }
    }
  }
`;

const CREATE_CART_MUTATION = gql`
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Service Functions
export class ShopifyService {
  // Fetch all products
  static async getProducts(limit = 50) {
    try {
      const data = await shopifyClient.request(GET_PRODUCTS_QUERY, {
        first: limit,
      });
      return data.products.edges.map((edge: any) => edge.node);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Fetch single product by handle
  static async getProductByHandle(handle: string) {
    try {
      const data = await shopifyClient.request(GET_PRODUCT_BY_HANDLE_QUERY, {
        handle,
      });
      return data.productByHandle;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Create a new cart
  static async createCart(lines: Array<{ merchandiseId: string; quantity: number }>) {
    try {
      const data = await shopifyClient.request(CREATE_CART_MUTATION, {
        input: { lines },
      });
      return data.cartCreate.cart;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  }

  // Add items to existing cart
  static async addToCart(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>) {
    try {
      const data = await shopifyClient.request(ADD_TO_CART_MUTATION, {
        cartId,
        lines,
      });
      return data.cartLinesAdd.cart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  // Get cart by ID
  static async getCart(cartId: string) {
    const query = gql`
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges {
                          node {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    `;

    try {
      const data = await shopifyClient.request(query, { cartId });
      return data.cart;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }

  // Update cart line quantity
  static async updateCartLine(cartId: string, lineId: string, quantity: number) {
    const mutation = gql`
      mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const data = await shopifyClient.request(mutation, {
        cartId,
        lines: [{ id: lineId, quantity }],
      });
      return data.cartLinesUpdate.cart;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }

  // Remove line from cart
  static async removeFromCart(cartId: string, lineIds: string[]) {
    const mutation = gql`
      mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const data = await shopifyClient.request(mutation, {
        cartId,
        lineIds,
      });
      return data.cartLinesRemove.cart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }
}
```

### Phase 5: Update Cart Context

Replace your existing `src/contexts/CartContext.tsx` to use Shopify:

```typescript
import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ShopifyService } from '@/services/shopify.service';

interface CartItem {
  id: string;
  lineId: string; // Shopify cart line ID
  merchandiseId: string; // Shopify variant ID
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image: string;
  handle: string;
}

interface CartState {
  cartId: string | null;
  items: CartItem[];
  totalAmount: number;
  isOpen: boolean;
  checkoutUrl: string | null;
}

type CartAction =
  | { type: 'SET_CART'; payload: { cartId: string; items: CartItem[]; totalAmount: number; checkoutUrl: string } }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  addToCart: (merchandiseId: string, quantity: number, productDetails: any) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cartId: action.payload.cartId,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        checkoutUrl: action.payload.checkoutUrl,
      };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'CLEAR_CART':
      localStorage.removeItem('shopify-cart-id');
      return { ...state, cartId: null, items: [], totalAmount: 0, checkoutUrl: null };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartId: null,
    items: [],
    totalAmount: 0,
    isOpen: false,
    checkoutUrl: null,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      const storedCartId = localStorage.getItem('shopify-cart-id');
      if (storedCartId) {
        try {
          const cart = await ShopifyService.getCart(storedCartId);
          if (cart) {
            updateCartState(cart);
          }
        } catch (error) {
          console.error('Error loading cart:', error);
          localStorage.removeItem('shopify-cart-id');
        }
      }
    };
    loadCart();
  }, []);

  const updateCartState = (cart: any) => {
    const items = cart.lines.edges.map((edge: any) => ({
      id: edge.node.merchandise.id,
      lineId: edge.node.id,
      merchandiseId: edge.node.merchandise.id,
      title: edge.node.merchandise.product.title,
      variantTitle: edge.node.merchandise.title,
      price: parseFloat(edge.node.merchandise.price.amount),
      quantity: edge.node.quantity,
      image: edge.node.merchandise.product.images.edges[0]?.node.url || '',
      handle: edge.node.merchandise.product.handle,
    }));

    dispatch({
      type: 'SET_CART',
      payload: {
        cartId: cart.id,
        items,
        totalAmount: parseFloat(cart.cost.totalAmount.amount),
        checkoutUrl: cart.checkoutUrl,
      },
    });

    localStorage.setItem('shopify-cart-id', cart.id);
  };

  const addToCart = async (merchandiseId: string, quantity: number, productDetails: any) => {
    try {
      let cart;
      if (state.cartId) {
        // Add to existing cart
        cart = await ShopifyService.addToCart(state.cartId, [{ merchandiseId, quantity }]);
      } else {
        // Create new cart
        cart = await ShopifyService.createCart([{ merchandiseId, quantity }]);
      }
      updateCartState(cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!state.cartId) return;
    try {
      const cart = await ShopifyService.updateCartLine(state.cartId, lineId, quantity);
      updateCartState(cart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!state.cartId) return;
    try {
      const cart = await ShopifyService.removeFromCart(state.cartId, [lineId]);
      updateCartState(cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleCart,
        openCart,
        closeCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

### Phase 6: Update Product Components

Example: Update `src/pages/AllProducts.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { ShopifyService } from '@/services/shopify.service';
import ProductCard from '@/components/ProductCard';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopifyProducts = await ShopifyService.getProducts(50);
        setProducts(shopifyProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.handle}
            name={product.title}
            price={parseFloat(product.priceRange.minVariantPrice.amount)}
            image={product.images.edges[0]?.node.url}
          />
        ))}
      </div>
    </div>
  );
}
```

### Phase 7: Update Checkout Flow

Replace your checkout page to redirect to Shopify's hosted checkout:

```typescript
import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { state } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.checkoutUrl) {
      // Redirect to Shopify's hosted checkout
      window.location.href = state.checkoutUrl;
    } else {
      // No cart, redirect to home
      navigate('/');
    }
  }, [state.checkoutUrl, navigate]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to checkout...</h1>
      <p>Please wait while we redirect you to secure checkout.</p>
    </div>
  );
}
```

---

## 📦 Product Data Migration

### Step 1: Add Products to Shopify

You have two options:

#### Option A: Manual Entry (Small Product Catalog)

1. Navigate to Shopify Admin → Products
2. Click "Add product"
3. Fill in:
   - Title
   - Description
   - Price
   - Compare at price (for sale items)
   - Images (upload all product photos)
   - Variants (sizes, colors)
   - Tags (for filtering)
   - SEO title and description
4. Repeat for each product

#### Option B: CSV Import (Faster for Many Products)

1. **Export your current products** from `src/data/products.ts` to CSV

Create a script `scripts/export-products-to-csv.ts`:

```typescript
import { products } from '../src/data/products';
import * as fs from 'fs';

const csvHeaders = [
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Type',
  'Tags',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Option2 Name',
  'Option2 Value',
  'Variant SKU',
  'Variant Grams',
  'Variant Inventory Tracker',
  'Variant Inventory Qty',
  'Variant Inventory Policy',
  'Variant Fulfillment Service',
  'Variant Price',
  'Variant Compare At Price',
  'Variant Requires Shipping',
  'Variant Taxable',
  'Variant Barcode',
  'Image Src',
  'Image Position',
  'Image Alt Text',
  'Gift Card',
  'SEO Title',
  'SEO Description',
  'Google Shopping / Google Product Category',
  'Google Shopping / Gender',
  'Google Shopping / Age Group',
  'Google Shopping / MPN',
  'Google Shopping / AdWords Grouping',
  'Google Shopping / AdWords Labels',
  'Google Shopping / Condition',
  'Google Shopping / Custom Product',
  'Google Shopping / Custom Label 0',
  'Google Shopping / Custom Label 1',
  'Google Shopping / Custom Label 2',
  'Google Shopping / Custom Label 3',
  'Google Shopping / Custom Label 4',
  'Variant Image',
  'Variant Weight Unit',
  'Variant Tax Code',
  'Cost per item',
];

const rows: string[][] = [csvHeaders];

products.forEach((product) => {
  product.sizes.forEach((size, sizeIndex) => {
    product.colors.forEach((color, colorIndex) => {
      const isFirstVariant = sizeIndex === 0 && colorIndex === 0;

      rows.push([
        product.id, // Handle
        isFirstVariant ? product.name : '', // Title (only on first variant)
        isFirstVariant ? product.description : '', // Body
        'Truth Matters', // Vendor
        product.category, // Type
        isFirstVariant ? product.tags.join(', ') : '', // Tags
        'TRUE', // Published
        'Size', // Option1 Name
        size, // Option1 Value
        'Color', // Option2 Name
        color, // Option2 Value
        `${product.sku}-${size}-${color}`, // Variant SKU
        '0', // Variant Grams
        'shopify', // Variant Inventory Tracker
        '100', // Variant Inventory Qty (set default)
        'deny', // Variant Inventory Policy
        'manual', // Variant Fulfillment Service
        product.price.toString(), // Variant Price
        product.salePrice?.toString() || '', // Variant Compare At Price
        'TRUE', // Variant Requires Shipping
        'TRUE', // Variant Taxable
        '', // Variant Barcode
        isFirstVariant && product.images[0] ? product.images[0] : '', // Image Src
        isFirstVariant ? '1' : '', // Image Position
        isFirstVariant ? product.name : '', // Image Alt Text
        'FALSE', // Gift Card
        isFirstVariant ? product.name : '', // SEO Title
        isFirstVariant ? product.description.substring(0, 160) : '', // SEO Description
        '', // Google Shopping Category
        product.gender, // Gender
        'Adult', // Age Group
        '', // MPN
        '', // AdWords Grouping
        '', // AdWords Labels
        'new', // Condition
        '', // Custom Product
        '', // Custom Label 0
        '', // Custom Label 1
        '', // Custom Label 2
        '', // Custom Label 3
        '', // Custom Label 4
        '', // Variant Image
        'lb', // Variant Weight Unit
        '', // Variant Tax Code
        '', // Cost per item
      ]);
    });
  });
});

const csvContent = rows.map(row =>
  row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
).join('\n');

fs.writeFileSync('shopify-products-import.csv', csvContent);
console.log('✅ CSV file created: shopify-products-import.csv');
console.log(`📦 Total rows: ${rows.length - 1} (${products.length} products)`);
```

Run the script:
```bash
npx tsx scripts/export-products-to-csv.ts
```

2. **Import to Shopify**:
   - Navigate to: Shopify Admin → Products
   - Click "Import" (top right)
   - Upload `shopify-products-import.csv`
   - Map columns (Shopify usually auto-detects)
   - Click "Import products"

3. **Upload Product Images**:
   - You'll need to upload images separately or include image URLs in CSV
   - Shopify can fetch images from public URLs
   - Or bulk upload via Shopify Admin → Files

### Step 2: Verify Product Sync

Test that your React app can fetch products:

```typescript
// Test in browser console or create a test page
import { ShopifyService } from '@/services/shopify.service';

const products = await ShopifyService.getProducts(10);
console.log('Products from Shopify:', products);
```

---

## 🛒 Cart & Checkout Integration

### Cart Integration (Already Covered)

See Phase 5 above for complete cart integration.

### Checkout Options

#### Option 1: Hosted Checkout (RECOMMENDED - Easiest)

**What it is:** Customer clicks "Checkout" and goes to Shopify's checkout page

**Pros:**
- ✅ Zero maintenance
- ✅ PCI compliant (Shopify handles security)
- ✅ All payment methods supported
- ✅ Optimized conversion rate
- ✅ Mobile-friendly
- ✅ Can customize branding/colors

**Cons:**
- ⚠️ Customer leaves your site
- ⚠️ Less design control

**Implementation:**
- Use the `checkoutUrl` from cart (already in CartContext)
- Redirect user to this URL when they click "Checkout"
- Shopify handles payment and redirects back to your site

**Customize Checkout:**
1. Navigate to: Shopify Admin → Settings → Checkout
2. Customize:
   - Logo
   - Colors (buttons, accents)
   - Background image
   - Typography
   - Custom CSS (Shopify Plus only)

---

#### Option 2: Checkout Sheet/Modal (Embedded)

**What it is:** Shopify checkout opens in an iframe/modal on your site

**Implementation:**
```typescript
import { useEffect } from 'react';

export function CheckoutModal({ checkoutUrl, onClose }: { checkoutUrl: string; onClose: () => void }) {
  useEffect(() => {
    // Listen for checkout completion
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'checkout_completed') {
        onClose();
        window.location.href = '/order/success';
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <iframe
          src={checkoutUrl}
          className="w-full h-full"
          title="Shopify Checkout"
        />
      </div>
    </div>
  );
}
```

---

#### Option 3: Custom Checkout (Advanced - Shopify Plus Only)

Requires Shopify Plus ($2,300/month) and significant development effort. Not recommended for most use cases.

---

## 📊 Order Management

### Customer View: Order Status

Create an order tracking page:

```typescript
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function OrderStatus() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Shopify sends customer to order status page after checkout
    // URL: /orders/[order-id]?key=[customer-key]
    const searchParams = new URLSearchParams(window.location.search);
    const customerKey = searchParams.get('key');

    if (orderId && customerKey) {
      // Fetch order status from Shopify
      // Note: This requires additional setup with Shopify's Order Status API
    }
  }, [orderId]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
      {/* Display order details */}
    </div>
  );
}
```

### Admin View: Manage Orders

Use Shopify Admin Dashboard:
- Navigate to: Orders
- View all orders, filter by status
- Mark as fulfilled, print packing slips
- Print shipping labels
- Send tracking information to customers

**Or build custom admin with Shopify Admin API** (requires Admin API access token):

```typescript
// This requires server-side implementation (Next.js API routes, Express, etc.)
// NOT safe to use Admin API in frontend

import { shopifyAdmin } from '@/lib/shopify-admin'; // Server-side only

export async function getOrders() {
  const query = `
    {
      orders(first: 50) {
        edges {
          node {
            id
            name
            email
            totalPrice
            createdAt
            fulfillmentStatus
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    price
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyAdmin.request(query);
  return response.data.orders.edges;
}
```

---

## 🔔 Webhooks & Events

Webhooks notify your server when events happen in Shopify (order created, fulfilled, etc.)

### Setup Webhooks

1. **Navigate to**: Shopify Admin → Settings → Notifications → Webhooks
2. **Create webhook**:
   - Event: "Order creation"
   - Format: JSON
   - URL: `https://your-backend.com/webhooks/shopify/order-created`
   - API version: 2024-01

### Common Webhook Topics

- `orders/create` - New order placed
- `orders/updated` - Order status changed
- `orders/fulfilled` - Order shipped
- `orders/cancelled` - Order cancelled
- `products/create` - New product added
- `products/update` - Product updated
- `products/delete` - Product deleted
- `inventory_levels/update` - Stock quantity changed

### Webhook Handler Example (Express.js)

```typescript
import express from 'express';
import crypto from 'crypto';

const app = express();

// Verify webhook authenticity
function verifyWebhook(req: express.Request): boolean {
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

  const hash = crypto
    .createHmac('sha256', secret)
    .update(req.body, 'utf8')
    .digest('base64');

  return hmac === hash;
}

app.post('/webhooks/shopify/order-created', express.raw({ type: 'application/json' }), (req, res) => {
  if (!verifyWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }

  const order = JSON.parse(req.body.toString());

  console.log('New order received:', order.name);

  // Do something with the order
  // - Send to your database
  // - Trigger email notifications
  // - Update analytics
  // - Sync with external systems

  res.status(200).send('Webhook received');
});

app.listen(3000);
```

---

## 🧪 Testing & Deployment

### Testing Checklist

- [ ] **Test Product Fetching**
  - All products load correctly
  - Images display properly
  - Prices match Shopify Admin
  - Variants (sizes, colors) work

- [ ] **Test Cart Functionality**
  - Add to cart works
  - Update quantity works
  - Remove from cart works
  - Cart persists across page reloads
  - Cart totals calculate correctly

- [ ] **Test Checkout Flow**
  - Cart redirects to Shopify checkout
  - Test payment (use Shopify's test mode)
  - Order confirmation works
  - Email notifications sent

- [ ] **Test Inventory Sync**
  - Out of stock products show correctly
  - Inventory updates in real-time

### Shopify Test Mode

1. **Enable Test Mode**:
   - Navigate to: Settings → Payments
   - Scroll to "Test mode"
   - Toggle ON

2. **Test Credit Cards**:
   - Use Shopify's test card: `1` for Visa (or any valid Luhn number)
   - Use any future expiry date
   - Use any 3-digit CVV

3. **Test Orders**:
   - Place test orders
   - Verify they appear in Shopify Admin
   - Check email notifications

### Production Deployment

1. **Disable Test Mode**:
   - Navigate to: Settings → Payments
   - Turn OFF test mode
   - Activate real payment provider

2. **Update Environment Variables**:
   ```bash
   # Production .env
   VITE_SHOPIFY_STORE_DOMAIN=truthmatters.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=production_token_here
   VITE_SHOPIFY_API_VERSION=2024-01
   ```

3. **Deploy Your React App**:
   ```bash
   npm run build
   # Deploy to Vercel, Netlify, or your hosting provider
   ```

4. **Configure Domain**:
   - Point your domain (truthmatters.com) to your hosting provider
   - Configure Shopify checkout subdomain if needed

5. **Test in Production**:
   - Place a real (small) test order
   - Verify payment processes
   - Check order appears in Shopify Admin
   - Verify email notifications

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: "Storefront API access token is invalid"
**Solution:**
- Verify token in `.env.local` matches Shopify Admin
- Check that API scopes are configured correctly
- Ensure you've installed the custom app in Shopify

#### Issue: "Products not loading"
**Solution:**
- Check browser console for CORS errors
- Verify Shopify store domain is correct
- Ensure products are published in Shopify Admin
- Check API version compatibility

#### Issue: "Cart not persisting"
**Solution:**
- Check localStorage for `shopify-cart-id`
- Verify cart ID is valid in Shopify
- Check for errors in cart API calls
- Ensure cart context is properly wrapped around app

#### Issue: "Checkout URL not working"
**Solution:**
- Verify cart has items before generating checkout URL
- Check that checkout is enabled in Shopify Settings
- Ensure payment provider is configured
- Try creating a new cart

#### Issue: "Images not displaying"
**Solution:**
- Verify images are uploaded in Shopify Admin
- Check image URLs in GraphQL response
- Ensure images are published (not draft)
- Check for CORS issues with Shopify CDN

---

## 📚 Additional Resources

### Official Documentation
- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Shopify Hydrogen (React framework)](https://shopify.dev/docs/custom-storefronts/hydrogen)
- [Shopify GraphQL Explorer](https://shopify.dev/docs/apps/tools/graphiql-admin-api)
- [Shopify API Changelog](https://shopify.dev/changelog)

### Code Examples
- [Shopify Storefront API Examples](https://github.com/Shopify/storefront-api-examples)
- [Headless Commerce Examples](https://github.com/topics/shopify-storefront-api)

### Video Tutorials
- [Build a Headless Shopify Store](https://www.youtube.com/results?search_query=shopify+headless+react)
- [Shopify Storefront API Tutorial](https://www.youtube.com/results?search_query=shopify+storefront+api)

---

## 🎯 Next Steps

1. **Set up Shopify account** and configure store settings
2. **Create custom app** and get API credentials
3. **Install dependencies** in your React project
4. **Implement Shopify service** layer
5. **Update Cart context** to use Shopify
6. **Migrate products** from local data to Shopify
7. **Test thoroughly** in Shopify test mode
8. **Deploy to production** and go live!

---

## 💡 Pro Tips

1. **Start with test mode** - Don't process real payments until everything works
2. **Use environment variables** - Keep API keys secure
3. **Cache product data** - Use React Query or SWR to cache Shopify API calls
4. **Monitor API usage** - Shopify has rate limits (2 requests/second for Storefront API)
5. **Optimize images** - Use Shopify CDN transformations for resized images
6. **Handle errors gracefully** - Show user-friendly messages when API fails
7. **Keep Shopify updated** - Subscribe to API changelog for breaking changes
8. **Use webhooks** - Keep your app in sync with Shopify events

---

**Questions or issues?** Consult Shopify Support or the Shopify Community forums.

Good luck with your Shopify integration! 🚀
