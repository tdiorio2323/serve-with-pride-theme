import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List, SortAsc, Shirt } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/data/products";

const Tshirts: FC = () => {
  const tshirtProducts = getProductsByCategory('tshirt');

  return (
    <div className="min-h-screen bg-background">
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
