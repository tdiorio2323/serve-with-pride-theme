# 🚀 LAUNCH CHECKLIST: Truth Matters E-Commerce

**Purpose:** Copy-paste runnable commands to get from dev → production

**Owner:** Tyler
**Target:** Production launch readiness
**Prerequisites:** Node.js 18+, npm, Git

---

## 📋 TABLE OF CONTENTS

1. [Local Setup](#1-local-setup)
2. [Database Setup](#2-database-setup)
3. [Stripe Configuration](#3-stripe-configuration)
4. [Email Service Setup](#4-email-service-setup)
5. [Seed Sample Products](#5-seed-sample-products)
6. [Analytics Setup](#6-analytics-setup)
7. [SEO & Metadata](#7-seo--metadata)
8. [Accessibility Testing](#8-accessibility-testing)
9. [Performance Audit](#9-performance-audit)
10. [Production Deploy](#10-production-deploy)
11. [Post-Deploy Smoke Tests](#11-post-deploy-smoke-tests)

---

## 1. LOCAL SETUP

### 1.1 Clone & Install

```bash
# Clone repository
git clone https://github.com/tdiorio2323/serve-with-pride-theme.git
cd serve-with-pride-theme

# Install dependencies
npm install

# Verify installation
npm run build
```

**Expected output:** `✓ built in X.XXs` with no errors

### 1.2 Environment Configuration

```bash
# Copy example env file
cp .env.example .env.local

# Open in editor
code .env.local  # or: nano .env.local
```

**Minimum required vars:**
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_XXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXX
VITE_API_URL=http://localhost:3001
```

### 1.3 Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.4.19  ready in XXX ms

  ➜  Local:   http://[::]:8080/
  ➜  Network: use --host to expose
```

**Verify:** Open http://localhost:8080 → homepage loads

---

## 2. DATABASE SETUP

### Option A: Supabase (Recommended)

#### 2.1 Create Supabase Project

```bash
# Visit https://supabase.com/dashboard
# Click "New Project"
# Name: truthmatters-prod
# Database Password: [Generate strong password]
# Region: [Choose closest to users]
```

#### 2.2 Get Connection Details

```bash
# In Supabase Dashboard:
# Settings > API > URL
# Copy: https://xxxxx.supabase.co

# Settings > API > anon public key
# Copy: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

# Settings > Database > Connection string
# Copy: postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres
```

**Add to `.env.local`:**
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres
```

#### 2.3 Create Database Schema

**In Supabase SQL Editor:**

```sql
-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),

  -- Customer info
  email text NOT NULL,
  customer_name text,

  -- Order details
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  items jsonb NOT NULL,

  -- Pricing
  subtotal numeric(10,2) NOT NULL,
  shipping numeric(10,2) DEFAULT 0,
  tax numeric(10,2) DEFAULT 0,
  donation numeric(10,2) DEFAULT 0,
  total numeric(10,2) NOT NULL,

  -- Addresses
  shipping_address jsonb NOT NULL,
  billing_address jsonb,

  -- Payment
  stripe_payment_intent_id text,
  stripe_charge_id text,

  -- Fulfillment
  tracking_number text,
  shipped_at timestamp with time zone
);

-- Index for customer lookups
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);

-- Stock notifications table (for out-of-stock alerts)
CREATE TABLE stock_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  email text NOT NULL,
  product_id text NOT NULL,
  notified boolean DEFAULT false
);

CREATE INDEX idx_stock_notifications_product ON stock_notifications(product_id);

-- Optional: User accounts (if implementing auth)
-- Supabase provides auth.users automatically

-- Optional: Order history view
CREATE VIEW order_summary AS
SELECT
  id,
  created_at,
  email,
  status,
  total,
  jsonb_array_length(items) as item_count
FROM orders
ORDER BY created_at DESC;
```

**Verify:**
```sql
SELECT * FROM orders LIMIT 1;
-- Should return: (no rows) with correct columns
```

### Option B: Local Postgres (Development Only)

```bash
# Install Postgres (macOS)
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb truthmatters_dev

# Run migrations (after creating migration files)
psql truthmatters_dev < migrations/001_create_orders.sql
```

---

## 3. STRIPE CONFIGURATION

### 3.1 Create Stripe Account

```bash
# Visit https://dashboard.stripe.com/register
# Complete signup
# Skip verification for test mode
```

### 3.2 Get API Keys

**In Stripe Dashboard:**

1. Go to: **Developers > API Keys**
2. Copy **Publishable key** (starts with `pk_test_`)
3. Click **"Reveal test key token"** for **Secret key** (starts with `sk_test_`)

**Add to `.env.local`:**
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_51Xxxxx
STRIPE_SECRET_KEY=sk_test_51Xxxxx
```

### 3.3 Test Cards

**Use these for testing:**

| Card Number | Description | Expected Result |
|-------------|-------------|-----------------|
| `4242 4242 4242 4242` | Visa | Success |
| `4000 0000 0000 9995` | Visa | Decline (insufficient funds) |
| `4000 0025 0000 3155` | Visa | Requires 3D Secure auth |

**CVV:** Any 3 digits
**Expiry:** Any future date
**ZIP:** Any 5 digits

### 3.4 Configure Webhooks (When backend ready)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/webhooks/stripe

# Copy webhook signing secret (starts with whsec_)
# Add to .env.local:
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

**For production:**
1. Go to: **Developers > Webhooks**
2. Click **"Add endpoint"**
3. URL: `https://truthmatters.com/api/webhooks/stripe`
4. Events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy **Signing secret**

### 3.5 Create Test Product in Stripe (Optional)

```bash
stripe products create \
  --name="Truth Matters T-Shirt" \
  --description="Premium patriotic apparel"

stripe prices create \
  --product=prod_XXXXXX \
  --unit-amount=2999 \
  --currency=usd
```

---

## 4. EMAIL SERVICE SETUP

### Option A: Resend (Recommended - Simpler)

#### 4.1 Create Resend Account

```bash
# Visit https://resend.com/signup
# Sign up with GitHub or email
```

#### 4.2 Get API Key

1. Go to: **API Keys**
2. Click **"Create API Key"**
3. Name: `truthmatters-production`
4. Copy key (starts with `re_`)

**Add to `.env.local`:**
```env
RESEND_API_KEY=re_xxxxxxxxxx
```

#### 4.3 Verify Domain (Production only)

**For production emails from @truthmatters.com:**

1. Go to: **Domains**
2. Click **"Add Domain"**
3. Enter: `truthmatters.com`
4. Add DNS records to domain registrar:
   ```
   TXT  @  "v=spf1 include:resend.com ~all"
   TXT  resend._domainkey  [provided DKIM value]
   ```
5. Wait 5-10 minutes for verification

#### 4.4 Install Resend SDK

```bash
npm install resend
```

#### 4.5 Test Email Send

Create: `scripts/test-email.js`

```javascript
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  try {
    const data = await resend.emails.send({
      from: 'Truth Matters <orders@truthmatters.com>',
      to: ['your-email@example.com'],
      subject: 'Test Order Confirmation',
      html: '<strong>Your order has been received!</strong>'
    });
    console.log('✓ Email sent:', data.id);
  } catch (error) {
    console.error('✗ Email failed:', error);
  }
}

sendTestEmail();
```

**Run:**
```bash
node scripts/test-email.js
```

**Expected:** Email appears in your inbox within 30 seconds

### Option B: SendGrid

```bash
# Visit https://signup.sendgrid.com/
# Create API key: Settings > API Keys > Create API Key
# Add to .env.local:
SENDGRID_API_KEY=SG.xxxxxxxxxx

# Install SDK
npm install @sendgrid/mail

# Test
node scripts/test-sendgrid.js
```

---

## 5. SEED SAMPLE PRODUCTS

### 5.1 Verify Product Data

```bash
# Check products file exists
cat src/data/products.ts | grep "export const products" -A 5
```

**Expected output:** Array of product objects

### 5.2 Import Products to Database (If using CMS)

**If using a headless CMS like Sanity:**

Create: `scripts/import-products.js`

```javascript
const { products } = require('../src/data/products.ts');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function importProducts() {
  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .insert([product]);

    if (error) {
      console.error('Failed:', product.name, error);
    } else {
      console.log('✓ Imported:', product.name);
    }
  }
}

importProducts();
```

**Run:**
```bash
node scripts/import-products.js
```

### 5.3 Upload Product Images

```bash
# Optimize images first
npm install sharp

# Create optimization script
node scripts/optimize-images.js

# Upload to Supabase Storage (if using)
supabase storage create products
supabase storage upload products public/products/*.jpg
```

**Or:** Use Cloudinary/AWS S3/Vercel Blob

---

## 6. ANALYTICS SETUP

### 6.1 Google Analytics 4

#### Create GA4 Property

```bash
# Visit https://analytics.google.com/
# Admin > Create Property
# Property name: Truth Matters
# Timezone: [Your timezone]
# Currency: USD
# Create > Web > Add stream
# Website URL: https://truthmatters.com
# Copy: Measurement ID (G-XXXXXXXXXX)
```

**Add to `.env.local`:**
```env
VITE_GA4_ID=G-XXXXXXXXXX
```

#### Install GA4 Tag

Edit: `index.html`

```html
<head>
  <!-- ... existing tags ... -->

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

**Replace `G-XXXXXXXXXX`** with your actual Measurement ID

#### Verify Tracking

```bash
# Start dev server
npm run dev

# Open site in browser
# Open browser console
# Type: dataLayer
# Should see: Array with events
```

**Or:** Use **GA4 DebugView** (Analytics > Admin > DebugView)

### 6.2 Meta Pixel (Optional)

```bash
# Visit https://business.facebook.com/events_manager
# Create Pixel
# Copy Pixel ID: 123456789
```

**Add to `index.html`:**

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '123456789');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=123456789&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

**Verify:** Meta Events Manager > Test Events

---

## 7. SEO & METADATA

### 7.1 Generate Sitemap

Create: `scripts/generate-sitemap.js`

```javascript
const fs = require('fs');
const { products } = require('../src/data/products');

const BASE_URL = 'https://truthmatters.com';

const staticPages = [
  '/',
  '/about',
  '/contact',
  '/causes',
  '/all-products',
  '/t-shirts',
  '/hoodies',
  '/hats',
  '/patches',
  '/accessories',
  '/mens',
  '/womens',
  '/faq',
  '/shipping-info',
  '/returns',
  '/privacy-policy',
  '/terms-of-service',
];

const dynamicPages = products.map(p => `/product/${p.id}`);

const allPages = [...staticPages, ...dynamicPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log(`✓ Sitemap generated with ${allPages.length} URLs`);
```

**Run:**
```bash
node scripts/generate-sitemap.js
```

**Verify:**
```bash
cat public/sitemap.xml | head -20
```

### 7.2 Verify robots.txt

```bash
cat public/robots.txt
```

**Should contain:**
```
User-agent: *
Allow: /

Sitemap: https://truthmatters.com/sitemap.xml
```

**If missing sitemap line, add it:**
```bash
echo "\nSitemap: https://truthmatters.com/sitemap.xml" >> public/robots.txt
```

### 7.3 Check Meta Tags

```bash
# Homepage
curl http://localhost:8080 | grep -E '<title>|<meta.*description' -A 1
```

**Expected output:**
```html
<title>Truth Matters - Gear Built for Those Who Serve</title>
<meta name="description" content="Veteran & First Responder owned...">
```

### 7.4 Validate Structured Data

**Visit:** https://search.google.com/test/rich-results

**Test URL:** `http://localhost:8080/product/tshirt-truth-matters-1`

**Expected:** Valid Product schema detected

---

## 8. ACCESSIBILITY TESTING

### 8.1 Install Testing Tools

```bash
# pa11y for automated checks
npm install -g pa11y

# axe-cli
npm install -g @axe-core/cli
```

### 8.2 Run Automated Scan

```bash
# Start dev server in background
npm run dev &

# Wait for server to start
sleep 5

# Scan homepage
pa11y http://localhost:8080

# Scan product page
pa11y http://localhost:8080/product/tshirt-truth-matters-1

# Scan checkout (when implemented)
pa11y http://localhost:8080/checkout
```

**Expected:** 0 errors (warnings are okay to review)

### 8.3 Run axe DevTools

```bash
# Scan all pages
axe http://localhost:8080 --save accessibility-report.json

# View report
cat accessibility-report.json | jq '.violations | length'
# Should be: 0
```

### 8.4 Manual Keyboard Test

```bash
# Open site in browser
# Try navigating with only keyboard:
# - Tab through all interactive elements
# - Verify focus is visible (blue outline)
# - Press Enter on links/buttons
# - Can add to cart without mouse
# - Can complete checkout with keyboard only
```

**Checklist:**
- [ ] All buttons/links reachable with Tab
- [ ] Focus order is logical (top to bottom, left to right)
- [ ] Focus indicator visible (outline or ring)
- [ ] Dropdowns openable with Enter/Space
- [ ] Form fields have labels
- [ ] Error messages announced by screen reader

### 8.5 Screen Reader Test (macOS)

```bash
# Enable VoiceOver
# Cmd + F5

# Navigate homepage
# Listen for:
# - All text is read
# - Images have alt text
# - Buttons announce their purpose
# - Form fields announce their labels
```

---

## 9. PERFORMANCE AUDIT

### 9.1 Run Lighthouse

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Start production build
npm run build
npm run preview &

# Wait for server
sleep 3

# Run Lighthouse
lighthouse http://localhost:4173 \
  --output=html \
  --output-path=./lighthouse-report.html \
  --view

# Or for CI (JSON output)
lighthouse http://localhost:4173 \
  --output=json \
  --output-path=./lighthouse-report.json \
  --chrome-flags="--headless"
```

**Target Scores:**
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥95
- SEO: ≥95

### 9.2 Analyze Bundle Size

```bash
# Build with size analysis
npm run build

# Check bundle sizes
ls -lh dist/assets/*.js | awk '{print $5, $9}'
```

**Expected output:**
```
159K dist/assets/index-CY-61zDH.js
```

**If >500KB:** Need code splitting (see TODO.md section 2.10)

### 9.3 Check Image Sizes

```bash
# List all images over 200KB
find public -type f \( -name "*.jpg" -o -name "*.png" \) -size +200k -exec ls -lh {} \;
```

**If any found:** Optimize with:
```bash
# Install imagemin
npm install -g imagemin-cli imagemin-mozjpeg

# Optimize JPEGs
imagemin public/*.jpg --out-dir=public/optimized --plugin=mozjpeg

# Replace originals
mv public/optimized/* public/
```

### 9.4 Test Load Time on Slow Network

```bash
# Chrome DevTools
# 1. Open DevTools (Cmd+Opt+I)
# 2. Network tab
# 3. Throttling: "Slow 3G"
# 4. Reload page
# 5. Check "Load" time in bottom left
```

**Target:** <5 seconds on Slow 3G

---

## 10. PRODUCTION DEPLOY

### 10.1 Pre-Deploy Checklist

**Verify all critical items:**

```bash
# Environment check
echo "Checking environment variables..."
grep -q "VITE_STRIPE_PUBLIC_KEY" .env.local && echo "✓ Stripe configured" || echo "✗ Missing Stripe keys"
grep -q "VITE_SUPABASE_URL" .env.local && echo "✓ Supabase configured" || echo "✗ Missing Supabase"
grep -q "RESEND_API_KEY" .env.local && echo "✓ Email configured" || echo "✗ Missing email service"

# Build test
npm run build && echo "✓ Build successful" || echo "✗ Build failed"

# Lint check
npm run lint 2>&1 | grep -q "0 errors" && echo "✓ No lint errors" || echo "⚠ Lint warnings/errors present"

# Type check (if you add it)
# npm run type-check && echo "✓ No TypeScript errors"
```

**Must all show ✓ before deploying**

### 10.2 Configure Vercel Environment Variables

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables (Production)
vercel env add VITE_STRIPE_PUBLIC_KEY production
# Paste: pk_live_51xxxxx (LIVE KEY - not test!)

vercel env add STRIPE_SECRET_KEY production
# Paste: sk_live_51xxxxx (LIVE SECRET KEY)

vercel env add VITE_SUPABASE_URL production
# Paste: https://xxxxx.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

vercel env add RESEND_API_KEY production
# Paste: re_xxxxx

vercel env add VITE_GA4_ID production
# Paste: G-XXXXXXXXXX

# Repeat for Preview and Development if needed
```

**Or:** Set in Vercel Dashboard:
- Go to: https://vercel.com/truthmatters/settings/environment-variables
- Add each variable with Environment: Production

### 10.3 Deploy to Production

**Option A: Git Push (Automatic)**

```bash
# Commit all changes
git add .
git commit -m "chore: prepare for production launch"

# Push to main branch (triggers auto-deploy)
git push origin main

# Monitor deployment
vercel --prod
```

**Option B: Manual Deploy**

```bash
# Deploy current directory
vercel --prod

# Follow prompts
# Vercel will build and deploy
```

**Expected output:**
```
✓ Production: https://truthmatters.com [copied to clipboard]
```

### 10.4 Verify Deployment

```bash
# Check deployment status
vercel ls

# View logs
vercel logs truthmatters.com
```

**Visit:** https://truthmatters.com

**Should see:** Homepage loads correctly

---

## 11. POST-DEPLOY SMOKE TESTS

**Critical path tests to run immediately after deploy:**

### 11.1 Homepage Test

```bash
# Check HTTP status
curl -I https://truthmatters.com | grep "HTTP"
# Expected: HTTP/2 200

# Check title tag
curl -s https://truthmatters.com | grep -o "<title>.*</title>"
# Expected: <title>Truth Matters - Gear Built for Those Who Serve</title>

# Check for errors in HTML
curl -s https://truthmatters.com | grep -i "error\|exception"
# Expected: (no output)
```

### 11.2 Product Browsing Test

**Manual steps:**

1. ✅ Visit https://truthmatters.com
2. ✅ Click "SHOP" in navigation
3. ✅ See product grid with images
4. ✅ Click a product → PDP loads
5. ✅ All product images load (no broken images)

### 11.3 Add to Cart Test

**Manual steps:**

1. ✅ On product page, select size (e.g., "M")
2. ✅ Select color (e.g., "Black")
3. ✅ Click "ADD TO CART"
4. ✅ Toast notification appears ("Added to cart!")
5. ✅ Cart badge shows "1"
6. ✅ Click cart icon → cart drawer opens
7. ✅ Product appears in cart with correct details

### 11.4 Checkout Test (CRITICAL - Use Test Mode First!)

**⚠️ IMPORTANT: First test in Stripe TEST MODE**

```bash
# Verify you're using test keys
vercel env ls | grep STRIPE
# Should show: pk_test_xxx and sk_test_xxx
```

**Manual steps:**

1. ✅ In cart, click "Proceed to Checkout"
2. ✅ Checkout page loads
3. ✅ Fill shipping form:
   - Name: Test User
   - Email: test@example.com
   - Address: 123 Test St
   - City: San Francisco
   - State: CA
   - ZIP: 94102
4. ✅ Select shipping method
5. ✅ Enter test card: `4242 4242 4242 4242`
   - CVV: 123
   - Expiry: 12/34
   - ZIP: 12345
6. ✅ Click "Place Order"
7. ✅ Order processes (loading state shows)
8. ✅ Redirect to success page
9. ✅ Success page shows order number
10. ✅ **CRITICAL:** Check email inbox for confirmation
11. ✅ Check Stripe dashboard → payment appears
12. ✅ Check database → order recorded

**If ANY step fails:** STOP and fix before accepting real orders

### 11.5 Error Handling Test

**Test payment decline:**

1. ✅ Add product to cart
2. ✅ Go to checkout
3. ✅ Enter declining card: `4000 0000 0000 9995`
4. ✅ Submit order
5. ✅ Error message appears: "Your card was declined"
6. ✅ User can retry with different card

**Test network error:**

1. ✅ Open DevTools → Network tab
2. ✅ Set "Offline"
3. ✅ Try to add to cart
4. ✅ Friendly error shown (not raw error)

### 11.6 Mobile Test

**On real device (iPhone or Android):**

1. ✅ Visit site on phone
2. ✅ Mobile menu works (tap hamburger icon)
3. ✅ Browse products → scrolling smooth
4. ✅ Add to cart → works
5. ✅ Cart drawer opens and usable
6. ✅ Checkout form fillable on mobile keyboard
7. ✅ All tap targets ≥44px (not too small)

### 11.7 Analytics Verification

**Check Google Analytics:**

```bash
# Visit: https://analytics.google.com/
# Select: Truth Matters property
# Go to: Reports > Realtime
```

**While on another device/browser:**
1. ✅ Visit homepage → see 1 user in Realtime
2. ✅ Click product → see event
3. ✅ Add to cart → see `add_to_cart` event
4. ✅ Complete purchase → see `purchase` event with revenue

**Check Stripe Dashboard:**

```bash
# Visit: https://dashboard.stripe.com/test/payments
```

1. ✅ Test payment appears in list
2. ✅ Shows correct amount
3. ✅ Status: "Succeeded"

### 11.8 Email Deliverability Test

**Check order confirmation email:**

1. ✅ Email arrives within 30 seconds
2. ✅ From address: `orders@truthmatters.com` (not Gmail/Hotmail)
3. ✅ Subject line correct
4. ✅ Order details accurate
5. ✅ Links work (back to site)
6. ✅ Not in spam folder

**If in spam:**
- Check SPF/DKIM DNS records
- Verify domain authentication in Resend
- Send test from Resend dashboard → check spam score

---

## 12. PRODUCTION MONITORING (First 24 Hours)

### 12.1 Set Up Error Monitoring

**Install Sentry (optional but recommended):**

```bash
npm install @sentry/react

# Get DSN from https://sentry.io
# Add to .env:
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

**Initialize in `src/main.tsx`:**

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### 12.2 Monitor Vercel Logs

```bash
# Real-time logs
vercel logs --follow

# Or in dashboard:
# Visit: https://vercel.com/truthmatters/deployments
# Click latest deployment > "Logs" tab
```

**Watch for:**
- 500 errors
- Failed payment intents
- Email send failures

### 12.3 Check Stripe Webhooks

```bash
# Visit: https://dashboard.stripe.com/webhooks
# Click your webhook endpoint
# View: Recent deliveries
```

**Should see:**
- `payment_intent.succeeded` events
- All showing "Success" (200 status)

**If failing:** Check endpoint URL and webhook secret

### 12.4 Monitor Order Volume

**Create simple dashboard query:**

```sql
-- In Supabase SQL Editor
SELECT
  COUNT(*) as total_orders,
  SUM(total) as total_revenue,
  COUNT(*) FILTER (WHERE status = 'pending') as pending,
  COUNT(*) FILTER (WHERE status = 'processing') as processing
FROM orders
WHERE created_at > NOW() - INTERVAL '24 hours';
```

**Run every few hours on launch day**

### 12.5 Customer Support Readiness

**Set up support email:**
- Forward: support@truthmatters.com → your email
- Auto-responder: "Thanks for contacting us, we'll respond within 24 hours"

**Prepare FAQ answers:**
- Shipping times: "5-7 business days"
- Return policy: "30 days, unused condition"
- Sizing questions: "Refer to size guide"
- Order tracking: "You'll receive tracking # via email when shipped"

---

## 13. ROLLBACK PROCEDURE (If Critical Issues Arise)

### 13.1 Immediate Rollback

```bash
# List recent deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]

# Or in Vercel Dashboard:
# Deployments > Previous deployment > "Promote to Production"
```

### 13.2 Disable Checkout (Emergency)

**If orders are broken but site otherwise fine:**

Edit `src/components/ShoppingCart.tsx`:

```tsx
<Button
  className="w-full"
  size="lg"
  disabled
>
  Checkout Temporarily Unavailable
</Button>
```

**Quick deploy:**
```bash
git add .
git commit -m "hotfix: disable checkout"
git push
```

### 13.3 Enable Maintenance Mode

**Create:** `public/maintenance.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Under Maintenance - Truth Matters</title>
</head>
<body style="font-family: sans-serif; text-align: center; padding: 100px;">
  <h1>🛠 We'll be right back!</h1>
  <p>Our store is undergoing maintenance. Check back in 30 minutes.</p>
  <p>Questions? Email: support@truthmatters.com</p>
</body>
</html>
```

**Redirect all traffic:**

Edit `vercel.json`:

```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/maintenance.html"
    }
  ]
}
```

**Deploy:**
```bash
vercel --prod
```

---

## 14. GO-LIVE ANNOUNCEMENT

### 14.1 Social Media Posts

**Twitter/X:**
```
🇺🇸 WE'RE LIVE! Truth Matters is now open for business.

Premium apparel for those who serve. Every purchase supports veterans and first responders.

Shop now: https://truthmatters.com

#TruthMatters #VeteranOwned #FirstResponders
```

**Instagram:**
- Post: High-quality product photo
- Caption: Same as Twitter
- Stories: Behind-the-scenes launch prep

**Facebook:**
- Share link to store
- Pin post to top of page

### 14.2 Email Announcement (If you have list)

**Subject:** "We're Live! Shop Truth Matters"

**Body:**
```
Hey [Name],

The wait is over. Truth Matters is officially open!

Browse our collection of premium patriotic apparel:
→ T-shirts: $29.99
→ Hoodies: $54.99
→ Hats: $24.99

Every purchase donates $1 to veteran causes.

LAUNCH SPECIAL: Free shipping on orders $50+ (normally $75)
Use code: LAUNCH2024

Shop now: https://truthmatters.com

Thank you for your support,
Tyler
Founder, Truth Matters
```

### 14.3 Update Website Banner

**Add to `Header.tsx` banner:**
```tsx
🎉 NOW OPEN! Free shipping on $50+ with code LAUNCH2024
```

---

## 15. POST-LAUNCH CHECKLIST (Week 1)

**Daily tasks:**

- [ ] Check Vercel logs for errors (morning & evening)
- [ ] Review Stripe dashboard for successful payments
- [ ] Monitor orders table in database
- [ ] Respond to customer emails within 24h
- [ ] Check social media for mentions/questions
- [ ] Track analytics (traffic, conversion rate)

**Weekly review:**

- [ ] Total orders: ______
- [ ] Total revenue: $______
- [ ] Conversion rate: ______%
- [ ] Average order value: $______
- [ ] Top-selling products: ____________
- [ ] Customer support issues: ____________
- [ ] Technical bugs found: ____________

**Adjustments needed:**
- [ ] Pricing changes?
- [ ] Product descriptions?
- [ ] Checkout UX improvements?
- [ ] Shipping options?

---

## 16. SCALING CHECKLIST (When >100 orders/day)

**Infrastructure:**
- [ ] Upgrade Supabase plan (if hitting limits)
- [ ] Enable Vercel caching
- [ ] Set up CDN for images (Cloudinary/Imgix)
- [ ] Implement Redis for session storage

**Operations:**
- [ ] Automate order fulfillment (ShipStation integration)
- [ ] Hire customer support (or use Zendesk)
- [ ] Set up inventory alerts (low stock notifications)
- [ ] Create admin dashboard for order management

**Marketing:**
- [ ] Set up abandoned cart emails (Klaviyo)
- [ ] Implement referral program
- [ ] Run retargeting ads (Facebook/Google)
- [ ] Start email marketing campaigns

---

## 🎯 QUICK COMMAND REFERENCE

**Most common commands:**

```bash
# Local development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run preview                # Preview production build
npm run lint                   # Check code quality

# Deployment
vercel                         # Deploy to preview
vercel --prod                  # Deploy to production
vercel logs --follow           # Monitor logs

# Database
psql $DATABASE_URL             # Connect to database
# Or: Supabase Dashboard > SQL Editor

# Testing
lighthouse http://localhost:4173  # Performance audit
pa11y http://localhost:8080        # Accessibility check
npm test                           # Run tests (when added)

# Stripe
stripe listen --forward-to localhost:3001/api/webhooks/stripe
stripe products list           # List products
stripe payments list           # List payments

# Monitoring
vercel logs                    # View deployment logs
curl -I https://truthmatters.com  # Check site status
```

---

## 🆘 TROUBLESHOOTING

### "Build failed" on Vercel

```bash
# Check build logs
vercel logs

# Common fixes:
# 1. Missing env var
vercel env add MISSING_VAR production

# 2. TypeScript error
npm run build  # Run locally to see error
# Fix error, commit, push

# 3. Out of memory
# Vercel Dashboard > Settings > General > Node.js Version: 18.x
```

### "Payment fails" but Stripe says success

```bash
# Check webhook delivery
# Stripe Dashboard > Webhooks > Recent deliveries

# If failing:
# 1. Verify webhook URL is correct
# 2. Check STRIPE_WEBHOOK_SECRET in env
# 3. Test webhook locally:
stripe trigger payment_intent.succeeded
```

### "Email not sending"

```bash
# Check Resend logs
# Dashboard > Logs

# Common issues:
# 1. Domain not verified → Add DNS records
# 2. Wrong API key → Check env var
# 3. Rate limit hit → Upgrade plan

# Test send:
node scripts/test-email.js
```

### "Images not loading"

```bash
# Check if files exist
ls public/products/

# Check Vercel logs for 404s
vercel logs | grep 404

# Fix: Ensure images committed to Git
git add public/products/*.jpg
git commit -m "Add product images"
git push
```

---

## ✅ FINAL PRE-LAUNCH CHECKLIST

**Sign off on each item before going live:**

### Technical
- [ ] Build succeeds with no errors
- [ ] All env vars set in Vercel (production)
- [ ] Database schema created and tested
- [ ] Stripe test payment successful
- [ ] Email confirmation received
- [ ] Analytics tracking verified
- [ ] Sitemap generated and submitted
- [ ] Robots.txt allows crawling
- [ ] SSL certificate active (https)
- [ ] Lighthouse scores ≥90

### Content
- [ ] All products have images (no placeholders)
- [ ] Product descriptions complete
- [ ] Legal pages reviewed (privacy, terms)
- [ ] About page complete
- [ ] Contact info correct
- [ ] FAQ answers accurate
- [ ] Shipping policy clear

### Functionality
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Cart persists on refresh
- [ ] Can remove from cart
- [ ] Checkout form works
- [ ] Payment processes successfully
- [ ] Order confirmation displays
- [ ] Confirmation email sends
- [ ] Order saved to database

### UX/Accessibility
- [ ] Mobile responsive
- [ ] Keyboard navigable
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] No console errors
- [ ] Loading states implemented
- [ ] Error messages friendly
- [ ] 404 page styled

### Operations
- [ ] Support email set up
- [ ] Inventory levels set
- [ ] Shipping costs configured
- [ ] Tax calculation working
- [ ] Refund process documented
- [ ] Order fulfillment plan ready

**Once all checked:** 🚀 **YOU'RE READY TO LAUNCH!**

---

*Generated by Claude Code on 2025-10-07*
*Questions? Contact Tyler*
