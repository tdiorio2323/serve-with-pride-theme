import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

const Patches: FC = () => {
  // Mock patch products - 8 products (2 rows x 4)
  const patchProducts = [
    {
      id: 'patch-1',
      name: 'Heritage Cross Patch',
      description: 'Honoring our heritage and those who served. Premium embroidered with velcro.',
      price: 12.99,
      images: ['/truth-logo-11.png'],
      category: 'patch' as const,
      gender: 'unisex' as const,
      sizes: ['3.5" x 3.5"'],
      colors: ['Full Color'],
      tags: ['heritage', 'cross'],
      featured: true,
      inStock: true,
      sku: 'PAT-001'
    },
    {
      id: 'patch-2',
      name: 'Truth Matters Shield Patch',
      description: 'Stand for truth. Embroidered shield design with hook & loop backing.',
      price: 12.99,
      images: ['/truth-logo-1.png'],
      category: 'patch' as const,
      gender: 'unisex' as const,
      sizes: ['3" x 3"'],
      colors: ['Full Color'],
      tags: ['truth', 'shield'],
      featured: true,
      inStock: true,
      sku: 'PAT-002'
    },
    {
      id: 'patch-3',
      name: 'Patriot Eagle Patch',
      description: 'Bold eagle embroidered patch. Perfect for tactical gear and backpacks.',
      price: 12.99,
      images: ['/truth-logo-2.png'],
      category: 'patch' as const,
      gender: 'unisex' as const,
      sizes: ['4" x 3"'],
      colors: ['Full Color'],
      tags: ['patriot', 'eagle'],
      featured: false,
      inStock: true,
      sku: 'PAT-003'
    },
    {
      id: 'patch-4',
      name: 'Liberty Star Patch',
      description: 'Freedom and liberty emblem. Velcro backing for easy attachment.',
      price: 12.99,
      images: ['/truth-logo-3.png'],
      category: 'patch' as const,
      gender: 'unisex' as const,
      sizes: ['3" Round'],
      colors: ['Full Color'],
      tags: ['liberty', 'star'],
      featured: false,
      inStock: true,
      sku: 'PAT-004'
    },
    {
      id: 'patch-5',
      name: 'Honor Badge Patch',
      description: 'Represent honor and duty. Premium quality embroidered patch.',
      price: 12.99,
      images: ['/truth-logo-4.png'],
      category: 'patch' as const,
      gender: 'unisex' as const,
      sizes: ['3.5" x 2.5"'],
      colors: ['Full Color'],
      tags: ['honor', 'badge'],
      featured: true,
      inStock: true,
      sku: 'PAT-005'
    },
    {
      id: 'patch-6',
      name: 'Warrior Crest Patch',
      description: 'For modern warriors. Durable embroidered design with velcro.',
      price: 12.99,
      images: ['/truth-logo-5.png'],
      category: 'patch' as const,
      gender: 'unisex' as const,
      sizes: ['4" x 3"'],
      colors: ['Full Color'],
      tags: ['warrior', 'crest'],
      featured: false,
      inStock: true,
      sku: 'PAT-006'
    },
    {
      id: 'patch-7',
      name: 'Defender Mark Patch',
      description: 'Defending our values. Weather-resistant embroidered patch.',
      price: 12.99,
      images: ['/truth-logo-6.png'],
      category: 'patch' as const,
      gender: 'unisex' as const,
      sizes: ['3" x 3"'],
      colors: ['Full Color'],
      tags: ['defender', 'mark'],
      featured: false,
      inStock: true,
      sku: 'PAT-007'
    },
    {
      id: 'patch-8',
      name: 'Unity Banner Patch',
      description: 'United we stand. Premium patch with hook backing for uniforms and gear.',
      price: 12.99,
      images: ['/truth-logo-7.png'],
      category: 'patch' as const,
      gender: 'unisex' as const,
      sizes: ['4" x 2"'],
      colors: ['Full Color'],
      tags: ['unity', 'banner'],
      featured: true,
      inStock: true,
      sku: 'PAT-008'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          {/* Removed badge above hero title as requested */}
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Truth Matters Patches
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Honor your service and values. Premium embroidered patches perfect for
            uniforms, tactical gear, backpacks, and more.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">{patchProducts.length} Patches</span>
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
          {patchProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {patchProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                New patch designs are being added regularly. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Military-Grade Quality</h2>
            <p className="text-muted-foreground">Built to honor those who serve</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🪡</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Embroidered</h3>
              <p className="text-muted-foreground text-sm">High-quality thread work that lasts</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🔒</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Velcro Backing</h3>
              <p className="text-muted-foreground text-sm">Easy attachment to gear and uniforms</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🌧️</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Weather Resistant</h3>
              <p className="text-muted-foreground text-sm">Stands up to tough conditions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🇺🇸</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Veteran Designed</h3>
              <p className="text-muted-foreground text-sm">Created by those who've served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Perfect for Every Application
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Show your support wherever you go. Our patches work on uniforms,
            backpacks, tactical gear, jackets, and more.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-display text-xl font-bold mb-2">👮 Law Enforcement</h3>
              <p className="opacity-90">Honor those who protect and serve</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">🪖 Military Gear</h3>
              <p className="opacity-90">Perfect for tactical equipment</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">🎒 Backpacks</h3>
              <p className="opacity-90">Show your values on the go</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">🧥 Jackets</h3>
              <p className="opacity-90">Add meaning to everyday wear</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Patches;