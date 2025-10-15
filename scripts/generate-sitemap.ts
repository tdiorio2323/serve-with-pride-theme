import { writeFileSync } from 'fs';
import { products } from '../src/data/products';

const SITE_URL = process.env.VITE_SITE_URL || 'https://truthmatters.com';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const staticPages: SitemapUrl[] = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },
  { loc: '/about', changefreq: 'monthly', priority: 0.8 },
  { loc: '/causes', changefreq: 'monthly', priority: 0.7 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.6 },
  { loc: '/all-products', changefreq: 'daily', priority: 0.9 },
  { loc: '/t-shirts', changefreq: 'weekly', priority: 0.9 },
  { loc: '/hoodies', changefreq: 'weekly', priority: 0.9 },
  { loc: '/hats', changefreq: 'weekly', priority: 0.9 },
  { loc: '/patches', changefreq: 'weekly', priority: 0.9 },
  { loc: '/accessories', changefreq: 'weekly', priority: 0.9 },
  { loc: '/mens', changefreq: 'weekly', priority: 0.8 },
  { loc: '/womens', changefreq: 'weekly', priority: 0.8 },
  { loc: '/faq', changefreq: 'monthly', priority: 0.6 },
  { loc: '/size-guide', changefreq: 'monthly', priority: 0.5 },
  { loc: '/shipping-info', changefreq: 'monthly', priority: 0.5 },
  { loc: '/returns', changefreq: 'monthly', priority: 0.5 },
  { loc: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { loc: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
  { loc: '/our-mission', changefreq: 'monthly', priority: 0.7 },
  { loc: '/careers', changefreq: 'monthly', priority: 0.5 },
  { loc: '/press', changefreq: 'monthly', priority: 0.5 },
  { loc: '/blog', changefreq: 'weekly', priority: 0.7 },
];

const productPages: SitemapUrl[] = products.map(product => ({
  loc: `/product/${product.id}`,
  changefreq: 'weekly',
  priority: product.featured ? 0.85 : 0.75,
}));

const allUrls = [...staticPages, ...productPages];

const currentDate = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls.map(url => `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${currentDate}</lastmod>${url.changefreq ? `
    <changefreq>${url.changefreq}</changefreq>` : ''}${url.priority ? `
    <priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

// Write to public directory
writeFileSync('./public/sitemap.xml', sitemap, 'utf-8');

console.log(`✅ Sitemap generated with ${allUrls.length} URLs (${staticPages.length} static + ${productPages.length} products)`);
console.log(`📍 Site URL: ${SITE_URL}`);
console.log(`📝 Output: public/sitemap.xml`);

