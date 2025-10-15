import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, SortAsc, Shirt } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const Tshirts: FC = () => {
  // Mock t-shirt products - 8 products (2 rows x 4)
  const tshirtProducts = [
    {
      id: 'tshirt-1',
      name: 'Truth Matters Classic Tee',
      description: 'Stand for truth with our classic Truth Matters t-shirt. Premium 100% cotton.',
      price: 29.99,
      images: ['/truth-logo-1.png'],
      category: 'tshirt' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Navy'],
      tags: ['truth', 'patriotic'],
      featured: true,
      inStock: true,
      sku: 'TSH-001'
    },
    {
      id: 'tshirt-2',
      name: 'Patriot Shield Tee',
      description: 'Defend freedom with honor. Our Patriot Shield design for true patriots.',
      price: 29.99,
      images: ['/truth-logo-2.png'],
      category: 'tshirt' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Gray'],
      tags: ['patriot', 'shield'],
      featured: true,
      inStock: true,
      sku: 'TSH-002'
    },
    {
      id: 'tshirt-3',
      name: 'Liberty Guard Tee',
      description: 'Standing watch over constitutional rights. A powerful symbol of freedom.',
      price: 29.99,
      images: ['/truth-logo-3.png'],
      category: 'tshirt' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Red'],
      tags: ['liberty', 'constitution'],
      featured: false,
      inStock: true,
      sku: 'TSH-003'
    },
    {
      id: 'tshirt-4',
      name: 'Honor Badge Tee',
      description: 'Representing duty, honor, and service to country. For those who serve with pride.',
      price: 29.99,
      images: ['/truth-logo-4.png'],
      category: 'tshirt' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Blue'],
      tags: ['honor', 'duty'],
      featured: false,
      inStock: true,
      sku: 'TSH-004'
    },
    {
      id: 'tshirt-5',
      name: 'Freedom Eagle Tee',
      description: 'Soar high with American pride. Bold eagle design on premium cotton.',
      price: 29.99,
      images: ['/truth-logo-5.png'],
      category: 'tshirt' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Charcoal'],
      tags: ['eagle', 'freedom'],
      featured: true,
      inStock: true,
      sku: 'TSH-005'
    },
    {
      id: 'tshirt-6',
      name: 'Justice Seal Tee',
      description: 'Upholding justice and truth. A statement piece for those who fight for what\'s right.',
      price: 29.99,
      images: ['/truth-logo-6.png'],
      category: 'tshirt' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Navy'],
      tags: ['justice', 'truth'],
      featured: false,
      inStock: true,
      sku: 'TSH-006'
    },
    {
      id: 'tshirt-7',
      name: 'Warrior Crest Tee',
      description: 'For those who fight for what\'s right. Bold crest design for modern warriors.',
      price: 29.99,
      images: ['/truth-logo-7.png'],
      category: 'tshirt' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Gray'],
      tags: ['warrior', 'crest'],
      featured: false,
      inStock: true,
      sku: 'TSH-007'
    },
    {
      id: 'tshirt-8',
      name: 'Victory Banner Tee',
      description: 'Celebrating the triumph of truth over deception. Premium quality tee.',
      price: 29.99,
      images: ['/truth-logo-8.png'],
      category: 'tshirt' as const,
      gender: 'unisex' as const,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Black', 'White', 'Red'],
      tags: ['victory', 'banner'],
      featured: true,
      inStock: true,
      sku: 'TSH-008'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Patriotic T-Shirts - Truth Matters</title>
        <meta name="description" content="Shop premium patriotic t-shirts for veterans, first responders, and patriots. 100% cotton, made with pride. Every purchase supports veteran causes." />
        <meta property="og:title" content="Patriotic T-Shirts - Truth Matters" />
        <meta property="og:description" content="Premium patriotic t-shirts for those who serve and support America." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          {/* Removed badge above hero title as requested */}
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Truth Matters T-Shirts
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Comfortable, high-quality tees that let you wear your values with pride.
            Perfect for rallies, everyday wear, or showing support for conservative principles.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">{tshirtProducts.length} T-Shirts</span>
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
          {tshirtProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {tshirtProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                New t-shirt designs are being added regularly. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Why Choose Our T-Shirts?</h2>
            <p className="text-muted-foreground">Quality materials, powerful messages, American values</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">100%</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Cotton</h3>
              <p className="text-muted-foreground text-sm">Premium quality, breathable cotton fabric</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">🇺🇸</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Made in USA</h3>
              <p className="text-muted-foreground text-sm">Supporting American jobs and manufacturing</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">✓</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Durable Print</h3>
              <p className="text-muted-foreground text-sm">Screen printed designs that won't fade or crack</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">XS-3XL</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">All Sizes</h3>
              <p className="text-muted-foreground text-sm">Inclusive sizing from XS to 3XL</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tshirts;
