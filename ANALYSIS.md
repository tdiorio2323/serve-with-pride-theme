# Route Tree
- /cart  (lazy)
- /checkout  (lazy)
- /order/success  (lazy)
- /product/:id  (PDP with skeleton hero)

# Component Ownership
- ProductGrid → layout + loading branch
- ProductCard → media + meta
- Skeleton → generic loading surface
# TRUTH E-Commerce Repo Analysis

(See previous analysis for full details. This version includes route tree and bundle report.)


## Route Tree
- / (Home)
- /about
- /contact
- /all-products
- /t-shirts
- /hoodies
- /hats
- /patches
- /accessories
- /faq
- /size-guide
- /terms-of-service
- /privacy-policy
- /returns
- /shipping
- /our-mission
- /press
- /careers
- /causes
- /blog
- /notfound
- /product/:id
- /cart
- /checkout
- /order/success

## Bundle Report
- Add bundle analyzer output after running `pnpm analyze:bundle`.

## Deltas
- Added .env.example, content stubs, site.webmanifest, sitemap.xml.
- Scripts and DX improvements planned.
