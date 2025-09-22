import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/data/products";

const Hoodies: FC = () => {
  const hoodieProducts = getProductsByCategory('hoodie');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
              🧥 Hoodies Collection
            </Badge>
          </div>
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
