import { test, expect } from "@playwright/test";

const base = process.env.PREVIEW_BASE ?? "http://localhost:4173";
const pages = ["/", "/all-products", "/about"];

test.describe("SEO Meta Tags", () => {
  for (const p of pages) {
    test(`meta tags on ${p}`, async ({ page }) => {
      await page.goto(base + p, { waitUntil: "domcontentloaded" });

      // Title check
      const title = await page.title();
      expect(title?.length ?? 0).toBeGreaterThan(10);
      console.log(`✓ ${p} title: ${title}`);

      // Canonical URL check
      const canonical = await page.locator('link[rel="canonical"]').first().getAttribute("href");
      expect(canonical).toBeTruthy();
      expect(canonical).toContain(p === "/" ? "" : p);
      console.log(`✓ ${p} canonical: ${canonical}`);

      // Open Graph image check
      const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
      expect(og).toBeTruthy();
      console.log(`✓ ${p} og:image: ${og}`);

      // Description check
      const description = await page.locator('meta[name="description"]').first().getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(50);
      console.log(`✓ ${p} description length: ${description?.length}`);
    });
  }
});

test.describe("Product Page SEO", () => {
  test("product page has structured data", async ({ page }) => {
    await page.goto(base + "/product/tshirt-truth-matters-1-unisex", { waitUntil: "domcontentloaded" });

    // Wait for product to load
    await page.waitForSelector('h1', { timeout: 5000 });

    // Check for Product schema
    const productSchema = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(s => {
        try {
          return JSON.parse(s.textContent || '');
        } catch {
          return null;
        }
      }).filter(Boolean);
    });

    const hasProduct = productSchema.some((s: any) => s['@type'] === 'Product');
    const hasBreadcrumb = productSchema.some((s: any) => s['@type'] === 'BreadcrumbList');

    expect(hasProduct).toBeTruthy();
    expect(hasBreadcrumb).toBeTruthy();
    console.log(`✓ Product page has structured data: Product=${hasProduct}, Breadcrumb=${hasBreadcrumb}`);
  });
});

test.describe("Static Resources", () => {
  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto(base + "/sitemap.xml");
    expect(response?.status()).toBe(200);

    const content = await page.content();
    expect(content).toContain('<urlset');
    expect(content).toContain('https://truthmatters.com');
    console.log(`✓ sitemap.xml is valid XML`);
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto(base + "/robots.txt");
    expect(response?.status()).toBe(200);

    const content = await page.content();
    expect(content).toContain('User-agent');
    expect(content).toContain('sitemap.xml');
    console.log(`✓ robots.txt references sitemap`);
  });
});

