import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

const Accessories: FC = () => {
  // Mock accessory products - 8 products (2 rows x 4)
  const accessoryProducts = [
    {
      id: 'accessory-1',
      name: 'Truth Matters Sticker Pack',
      description: 'Spread the truth everywhere. Pack of 10 weatherproof vinyl stickers.',
      price: 9.99,
      images: ['/truth-logo-1.png'],
      category: 'accessory' as const,
      gender: 'unisex' as const,
      sizes: ['Various'],
      colors: ['Full Color'],
      tags: ['stickers', 'vinyl'],
      featured: true,
      inStock: true,
      sku: 'ACC-001'
    },
    {
      id: 'accessory-2',
      name: 'Patriot Coffee Mug',
      description: 'Start your morning with truth. 15oz ceramic mug with Truth Matters logo.',
      price: 18.99,
      images: ['/truth-logo-2.png'],
      category: 'accessory' as const,
      gender: 'unisex' as const,
      sizes: ['15oz'],
      colors: ['White', 'Black'],
      tags: ['mug', 'coffee'],
      featured: true,
      inStock: true,
      sku: 'ACC-002'
    },
    {
      id: 'accessory-3',
      name: 'Freedom Water Bottle',
      description: 'Stay hydrated while standing for freedom. Insulated stainless steel bottle.',
      price: 24.99,
      images: ['/truth-logo-3.png'],
      category: 'accessory' as const,
      gender: 'unisex' as const,
      sizes: ['32oz'],
      colors: ['Silver', 'Black'],
      tags: ['bottle', 'hydration'],
      featured: false,
      inStock: true,
      sku: 'ACC-003'
    },
    {
      id: 'accessory-4',
      name: 'Truth Keychain',
      description: 'Carry your values with you. Durable metal keychain with Truth Matters emblem.',
      price: 12.99,
      images: ['/truth-logo-4.png'],
      category: 'accessory' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Silver', 'Bronze'],
      tags: ['keychain', 'metal'],
      featured: false,
      inStock: true,
      sku: 'ACC-004'
    },
    {
      id: 'accessory-5',
      name: 'Patriot Tote Bag',
      description: 'Heavy-duty canvas tote bag perfect for groceries, books, or rallies.',
      price: 19.99,
      images: ['/truth-logo-5.png'],
      category: 'accessory' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Natural', 'Black'],
      tags: ['bag', 'tote', 'canvas'],
      featured: true,
      inStock: true,
      sku: 'ACC-005'
    },
    {
      id: 'accessory-6',
      name: 'Freedom Phone Case',
      description: 'Protect your phone with patriotic pride. Available for multiple models.',
      price: 16.99,
      images: ['/truth-logo-6.png'],
      category: 'accessory' as const,
      gender: 'unisex' as const,
      sizes: ['iPhone', 'Samsung'],
      colors: ['Clear', 'Black'],
      tags: ['phone', 'case', 'protection'],
      featured: false,
      inStock: true,
      sku: 'ACC-006'
    },
    {
      id: 'accessory-7',
      name: 'Truth Matters Wristband',
      description: 'Silicone wristband with embossed Truth Matters logo. Comfortable and durable.',
      price: 7.99,
      images: ['/truth-logo-7.png'],
      category: 'accessory' as const,
      gender: 'unisex' as const,
      sizes: ['One Size'],
      colors: ['Red', 'White', 'Blue', 'Black'],
      tags: ['wristband', 'silicone'],
      featured: false,
      inStock: true,
      sku: 'ACC-007'
    },
    {
      id: 'accessory-8',
      name: 'Patriot Pin Set',
      description: 'Set of 5 enamel pins featuring Truth Matters designs. Perfect for jackets and bags.',
      price: 14.99,
      images: ['/truth-logo-8.png'],
      category: 'accessory' as const,
      gender: 'unisex' as const,
      sizes: ['Various'],
      colors: ['Multi-Color'],
      tags: ['pins', 'enamel', 'set'],
      featured: true,
      inStock: true,
      sku: 'ACC-008'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          {/* Removed the button/badge above the hero title as requested */}
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Truth Matters Accessories
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Complete your patriotic arsenal. Premium accessories to show your values
            wherever life takes you.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">{accessoryProducts.length} Accessories</span>
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
          {accessoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {accessoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                New accessories are being added regularly. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Essential Gear</h2>
            <p className="text-muted-foreground">Complete your Truth Matters collection</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">☕</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Drinkware</h3>
              <p className="text-muted-foreground text-sm">Start every day with truth and coffee</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🎯</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Stickers & Decals</h3>
              <p className="text-muted-foreground text-sm">Weather-resistant messaging for anywhere</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🎒</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Bags & Gear</h3>
              <p className="text-muted-foreground text-sm">Carry your principles with you</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🇺🇸</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Flag Items</h3>
              <p className="text-muted-foreground text-sm">Honor the flag in style</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accessories;