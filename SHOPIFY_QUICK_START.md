# Shopify Integration - Quick Start Guide

**TL;DR** - Get your React site connected to Shopify in 30 minutes.

---

## ⚡ Quick Setup (30 Minutes)

### Step 1: Shopify Account (5 min)
1. Sign up at https://www.shopify.com (14-day free trial)
2. Choose store name: `truthmatters-admin` (or similar)
3. Complete onboarding wizard

### Step 2: Create Custom App (5 min)
1. Go to: **Settings → Apps and sales channels**
2. Click **"Develop apps"** → **"Allow custom app development"**
3. Click **"Create an app"**
   - Name: "Truth Matters Frontend"
   - Click "Create app"
4. Click **"Configure Storefront API scopes"**
   - Enable ALL unauthenticated scopes (checkboxes)
   - Click "Save"
5. Click **"Install app"**
6. **Copy your credentials**:
   - Storefront API access token
   - Shop domain (e.g., truthmatters-admin.myshopify.com)

### Step 3: Install Dependencies (2 min)
```bash
npm install @shopify/storefront-api-client graphql-request graphql
```

### Step 4: Configure Environment (2 min)
Create `.env.local`:
```bash
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
VITE_SHOPIFY_API_VERSION=2024-01
```

### Step 5: Create Shopify Client (3 min)
Create `src/lib/shopify.ts`:
```typescript
import { GraphQLClient } from 'graphql-request';

const endpoint = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/${import.meta.env.VITE_SHOPIFY_API_VERSION}/graphql.json`;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
});
```

### Step 6: Add Products to Shopify (10 min)
1. Go to **Products → Add product** in Shopify Admin
2. Add 2-3 test products:
   - Title
   - Description
   - Price
   - Image
   - Variants (size, color)
3. Click "Save"

### Step 7: Test Product Fetch (3 min)
Create a test page to verify connection:

```typescript
import { useEffect, useState } from 'react';
import { shopifyClient } from '@/lib/shopify';
import { gql } from 'graphql-request';

export default function TestShopify() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = gql`
        query {
          products(first: 10) {
            edges {
              node {
                id
                title
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
              }
            }
          }
        }
      `;

      const data = await shopifyClient.request(query);
      setProducts(data.products.edges);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shopify Products</h1>
      {products.map((product: any) => (
        <div key={product.node.id} className="border p-4 mb-2">
          <h2>{product.node.title}</h2>
          <p>${product.node.priceRange.minVariantPrice.amount}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 What's Next?

1. **Migrate all products** - Export from `src/data/products.ts` to Shopify (CSV import)
2. **Implement cart** - Replace CartContext with Shopify cart API
3. **Set up checkout** - Use Shopify's hosted checkout
4. **Configure payments** - Enable Shopify Payments or Stripe
5. **Go live** - Disable test mode, deploy to production

---

## 📖 Full Guide

See **SHOPIFY_INTEGRATION_GUIDE.md** for complete implementation details including:
- Complete cart integration
- Product migration scripts
- Order management
- Webhooks setup
- Production deployment
- Troubleshooting

---

## 💰 Shopify Pricing

**Basic Plan: $39/month**
- Everything you need to start
- Unlimited products
- 2 staff accounts
- 24/7 support
- 2.9% + 30¢ per transaction (with Shopify Payments)

**Shopify Plan: $105/month**
- Lower fees: 2.6% + 30¢ per transaction
- 5 staff accounts
- Professional reports

**Start with free trial, then Basic plan is perfect for launching.**

---

## 🆘 Need Help?

- **Full documentation**: See SHOPIFY_INTEGRATION_GUIDE.md
- **Shopify support**: 24/7 chat in Shopify Admin
- **API docs**: https://shopify.dev/docs/api/storefront
- **Community**: https://community.shopify.com

---

## ✅ Checklist

- [ ] Shopify account created
- [ ] Custom app created and installed
- [ ] API credentials copied to `.env.local`
- [ ] Dependencies installed
- [ ] Shopify client configured
- [ ] Test products added to Shopify
- [ ] Products fetching successfully
- [ ] Ready to implement cart & checkout!
