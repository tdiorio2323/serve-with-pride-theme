import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Hoodies: FC = () => {
  // Mock hoodie products - 8 products (2 rows x 4)
  const hoodieProducts = [
    {
      id: 'hoodie-1',
      name: 'Warrior Crest Hoodie',
      description: 'For those who fight for what\'s right. Premium heavyweight hoodie.',
      price: 54.99,
      images: ['/truth-logo-1.png'],
      category: 'hoodie' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Navy'],
      tags: ['warrior', 'hoodie'],
      featured: true,
      inStock: true,
      sku: 'HOO-001'
    },
    {
      id: 'hoodie-2',
      name: 'Victory Banner Hoodie',
      description: 'Celebrating the triumph of truth over deception. Warm and comfortable.',
      price: 54.99,
      images: ['/truth-logo-2.png'],
      category: 'hoodie' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Gray'],
      tags: ['victory', 'banner'],
      featured: true,
      inStock: true,
      sku: 'HOO-002'
    },
    {
      id: 'hoodie-3',
      name: 'Truth Logo Hoodie',
      description: 'Show your support for truth with this classic hoodie featuring the Truth Matters logo.',
      price: 54.99,
      images: ['/truth-logo-3.png'],
      category: 'hoodie' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Charcoal'],
      tags: ['truth', 'logo'],
      featured: false,
      inStock: true,
      sku: 'HOO-003'
    },
    {
      id: 'hoodie-4',
      name: 'Freedom Stripes Hoodie',
      description: 'Celebrate freedom with bold stripes. Heavyweight and comfortable.',
      price: 54.99,
      images: ['/truth-logo-4.png'],
      category: 'hoodie' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Red'],
      tags: ['freedom', 'stripes'],
      featured: false,
      inStock: true,
      sku: 'HOO-004'
    },
    {
      id: 'hoodie-5',
      name: 'Service Honor Hoodie',
      description: 'Honor those who serve with this special edition hoodie. Premium quality.',
      price: 54.99,
      images: ['/truth-logo-5.png'],
      category: 'hoodie' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Navy'],
      tags: ['service', 'honor'],
      featured: true,
      inStock: true,
      sku: 'HOO-005'
    },
    {
      id: 'hoodie-6',
      name: 'American Spirit Hoodie',
      description: 'Embody the American spirit with this comfortable hoodie. Flag-inspired design.',
      price: 54.99,
      images: ['/truth-logo-6.png'],
      category: 'hoodie' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Blue'],
      tags: ['american', 'spirit'],
      featured: false,
      inStock: true,
      sku: 'HOO-006'
    },
    {
      id: 'hoodie-7',
      name: 'Patriot Pride Hoodie',
      description: 'Wear your patriotic pride. Fleece-lined for maximum warmth and comfort.',
      price: 54.99,
      images: ['/truth-logo-7.png'],
      category: 'hoodie' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Gray'],
      tags: ['patriot', 'pride'],
      featured: false,
      inStock: true,
      sku: 'HOO-007'
    },
    {
      id: 'hoodie-8',
      name: 'Liberty Eagle Hoodie',
      description: 'Soar with liberty. Bold eagle design on premium heavyweight hoodie.',
      price: 54.99,
      images: ['/truth-logo-8.png'],
      category: 'hoodie' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Charcoal'],
      tags: ['liberty', 'eagle'],
      featured: true,
      inStock: true,
      sku: 'HOO-008'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Patriotic Hoodies - Truth Matters</title>
        <meta name="description" content="Premium heavyweight hoodies for veterans, first responders, and patriots. Warm, durable, and made with pride. Support veteran causes with every purchase." />
        <meta property="og:title" content="Patriotic Hoodies - Truth Matters" />
        <meta property="og:description" content="Premium hoodies for those who serve and support America." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          {/* Removed badge above hero title as requested */}
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Truth Matters Hoodies
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Stay warm while representing your values. Premium heavyweight hoodies
            perfect for rallies, outdoor events, or everyday comfort.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">{hoodieProducts.length} Hoodies</span>
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {hoodieProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {hoodieProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                New hoodie designs are being added regularly. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Premium Comfort</h2>
            <p className="text-muted-foreground">Built for patriots who demand quality</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">500g</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Heavyweight</h3>
              <p className="text-muted-foreground text-sm">Premium 500GSM cotton blend for warmth</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🧥</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Fleece Lined</h3>
              <p className="text-muted-foreground text-sm">Soft interior fleece for maximum comfort</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🎯</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Reinforced Seams</h3>
              <p className="text-muted-foreground text-sm">Built to last through heavy use</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🇺🇸</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Made in USA</h3>
              <p className="text-muted-foreground text-sm">Supporting American manufacturing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Perfect for Every Season
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            From crisp fall rallies to cold winter protests, our hoodies keep you
            comfortable while you stand for your principles.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <h3 className="font-display text-xl font-bold mb-2">🍂 Fall Events</h3>
              <p className="opacity-90">Perfect weight for outdoor rallies and events</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">❄️ Winter Warmth</h3>
              <p className="opacity-90">Stay warm during cold weather demonstrations</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">🌙 Evening Comfort</h3>
              <p className="opacity-90">Cozy up at home while watching the news</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hoodies;
