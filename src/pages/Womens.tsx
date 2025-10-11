import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Grid, List, SortAsc, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductsByGender } from "@/data/products";

const Womens: FC = () => {
  const womensProducts = getProductsByGender('womens');
  const unisexProducts = getProductsByGender('unisex');
  const allProducts = [...womensProducts, ...unisexProducts];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-rose-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          {/* Removed badge above hero title as requested */}
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Women's Truth Matters
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Empowering American women who stand strong for truth, family values, and the principles that make our nation great.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">{allProducts.length} Products</span>
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
          {allProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                New women's products are being added regularly. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Message */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold mb-6">For the Strong Women of America</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our women's collection celebrates the strength, courage, and unwavering values of American women.
              From mothers protecting their children to professionals standing for truth in the workplace,
              these designs honor the women who keep our families and communities strong.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Family Values</h3>
                <p className="text-muted-foreground">Designs that honor the traditional family</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💪</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Female Strength</h3>
                <p className="text-muted-foreground">Celebrating the power of American women</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🇺🇸</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Patriotic Pride</h3>
                <p className="text-muted-foreground">Love of country and constitution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Find your perfect fit and style</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">T</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Fitted Tees</h3>
                <p className="text-muted-foreground text-sm">Flattering cuts with powerful messages</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">H</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Hoodies</h3>
                <p className="text-muted-foreground text-sm">Cozy comfort for the freedom-loving woman</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">👒</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Hats</h3>
                <p className="text-muted-foreground text-sm">Stylish headwear for every occasion</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">+</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Accessories</h3>
                <p className="text-muted-foreground text-sm">Complete your patriotic look</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Womens;