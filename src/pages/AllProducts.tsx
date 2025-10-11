import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Grid, List, SortAsc, Search, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, Product } from "@/data/products";

const AllProducts: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesGender = selectedGender === "all" || product.gender === selectedGender || product.gender === "unisex";

    return matchesSearch && matchesCategory && matchesGender;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Complete Collection
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
            All Truth Matters Products
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Browse our complete collection of patriotic apparel and accessories.
            Every purchase supports conservative values and veteran causes.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Category:</span>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}s
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Gender:</span>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="mens">Men's</SelectItem>
                      <SelectItem value="womens">Women's</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">Sort:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price-low">Price Low-High</SelectItem>
                      <SelectItem value="price-high">Price High-Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">{filteredProducts.length} Products</span>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm">
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">No Products Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedGender("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you're looking for</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory("tshirt")}
            >
              <span className="text-2xl">👕</span>
              <span>T-Shirts</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory("hoodie")}
            >
              <span className="text-2xl">🧥</span>
              <span>Hoodies</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory("hat")}
            >
              <span className="text-2xl">🧢</span>
              <span>Hats</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2 hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory("accessory")}
            >
              <span className="text-2xl">🎖️</span>
              <span>Accessories</span>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllProducts;