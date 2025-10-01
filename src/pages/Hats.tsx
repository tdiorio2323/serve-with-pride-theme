import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

const Hats: FC = () => {
  // Mock hat products - 8 products (2 rows x 4)
  const hatProducts = [
    {
      id: 'hat-1',
      name: 'Defender Mark Cap',
      description: 'Defending our nation and its sacred principles. Classic adjustable cap.',
      price: 24.99,
      images: ['/truth-logo-9.png'],
      category: 'hat' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Black', 'White', 'Navy'],
      tags: ['defender', 'cap'],
      featured: true,
      inStock: true,
      sku: 'HAT-001'
    },
    {
      id: 'hat-2',
      name: 'Unity Star Trucker Hat',
      description: 'United we stand, divided we fall. Classic trucker hat with mesh back.',
      price: 26.99,
      images: ['/truth-logo-10.png'],
      category: 'hat' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Black', 'White', 'Red'],
      tags: ['unity', 'star', 'trucker'],
      featured: true,
      inStock: true,
      sku: 'HAT-002'
    },
    {
      id: 'hat-3',
      name: 'Truth Matters Classic Cap',
      description: 'Show your support for truth. Embroidered logo on premium cap.',
      price: 24.99,
      images: ['/truth-logo-11.png'],
      category: 'hat' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Black', 'White', 'Charcoal'],
      tags: ['truth', 'classic'],
      featured: false,
      inStock: true,
      sku: 'HAT-003'
    },
    {
      id: 'hat-4',
      name: 'Freedom Eagle Cap',
      description: 'Bold eagle design. Adjustable snapback for perfect fit.',
      price: 24.99,
      images: ['/truth-logo-1.png'],
      category: 'hat' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Black', 'White', 'Blue'],
      tags: ['freedom', 'eagle'],
      featured: false,
      inStock: true,
      sku: 'HAT-004'
    },
    {
      id: 'hat-5',
      name: 'Patriot Shield Hat',
      description: 'Defend your values. Premium embroidered shield design.',
      price: 26.99,
      images: ['/truth-logo-2.png'],
      category: 'hat' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Black', 'White', 'Gray'],
      tags: ['patriot', 'shield'],
      featured: true,
      inStock: true,
      sku: 'HAT-005'
    },
    {
      id: 'hat-6',
      name: 'Liberty Trucker Hat',
      description: 'Breathable mesh back for comfort. Classic liberty design.',
      price: 26.99,
      images: ['/truth-logo-3.png'],
      category: 'hat' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Black', 'White', 'Navy'],
      tags: ['liberty', 'trucker'],
      featured: false,
      inStock: true,
      sku: 'HAT-006'
    },
    {
      id: 'hat-7',
      name: 'Honor Badge Cap',
      description: 'For those who serve with honor. Durable construction.',
      price: 24.99,
      images: ['/truth-logo-4.png'],
      category: 'hat' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Black', 'White', 'Red'],
      tags: ['honor', 'badge'],
      featured: false,
      inStock: true,
      sku: 'HAT-007'
    },
    {
      id: 'hat-8',
      name: 'Victory Crest Hat',
      description: 'Celebrate victory. Premium cap with embroidered crest.',
      price: 24.99,
      images: ['/truth-logo-5.png'],
      category: 'hat' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Black', 'White', 'Charcoal'],
      tags: ['victory', 'crest'],
      featured: true,
      inStock: true,
      sku: 'HAT-008'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          {/* Removed badge above hero title as requested */}
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Truth Matters Hats
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Top off your patriotic look with premium quality caps and trucker hats.
            Show your support for conservative values wherever you go.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">{hatProducts.length} Hats</span>
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
          {hatProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {hatProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                New hat designs are being added regularly. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Premium Headwear</h2>
            <p className="text-muted-foreground">Quality caps built for American patriots</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🧢</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Adjustable Fit</h3>
              <p className="text-muted-foreground text-sm">Snap-back or strap closure for perfect fit</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">☀️</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Sun Protection</h3>
              <p className="text-muted-foreground text-sm">Structured brim shields you from the elements</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">⭐</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Embroidered Design</h3>
              <p className="text-muted-foreground text-sm">High-quality embroidered logos that last</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🇺🇸</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Patriotic Pride</h3>
              <p className="text-muted-foreground text-sm">Wear your American values with confidence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Complete Your Patriotic Look
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Match your hat with our T-shirts, hoodies, and accessories.
            Build the complete Truth Matters wardrobe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="font-bold">
              Shop T-Shirts
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hats;
