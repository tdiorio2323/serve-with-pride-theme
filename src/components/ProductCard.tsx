/** @param {{product:any,isLoading?:boolean}} props */
import React, { useState } from 'react';
import { ProductCardSkeleton } from "@/components/ProductCard.Skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/data/products";
import { ShoppingCart, Eye, ExternalLink } from "lucide-react";
import { toast } from "sonner";


const ProductCard = ({ product, isLoading }) => {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Black');
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const img = product.images?.[0] || '/TRUTH-red-white-blue.jpg';
  const resolved = img.startsWith('/') ? img : `/${img}`;

  const handleAddToCart = () => {
    // Convert to the CartContext Product format
    const cartItem = {
      id: parseInt(product.id.replace(/\D/g, '')) || Math.random() * 1000, // Convert string to number
      name: product.name,
      if (product == null) {
        return <ProductCardSkeleton />;
      }
      return (
        <>
          <div className="group">
            <div className="bg-card rounded-lg border border-border overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-105" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={resolved}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width={320}
                    height={256}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                  />
                </Link>
                {product.category && (
                  <Badge
                    variant="secondary"
                    className="absolute top-3 left-3 font-display font-bold tracking-wide"
                  >
                    {product.category.toUpperCase()}
                  </Badge>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleQuickView}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 tracking-wide hover:text-primary transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                <p className="font-body text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="font-body text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    +$1 DONATION
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex gap-2">
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedColor} onValueChange={setSelectedColor}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.colors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full font-display font-bold tracking-wide"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    ADD TO CART
                  </Button>

                  <Link to={`/product/${product.id}`} className="block">
                    <Button
                      variant="outline"
                      className="w-full font-display font-bold tracking-wide"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      VIEW DETAILS
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick View Dialog */}
          <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{product.name}</DialogTitle>
                <DialogDescription>
                  Quick view product details
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {product ? (
                    <img
                      src={resolved}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      width={320}
                      height={320}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  ) : (
                    <Skeleton className="h-80 w-full" />
                  )}
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">{product.description}</p>

                  <div className="flex items-center gap-4">
                    <span className="font-display text-3xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant="secondary">+$1 DONATION</Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Size</label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Color</label>
                      <Select value={selectedColor} onValueChange={setSelectedColor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.colors.map((color) => (
                            <SelectItem key={color} value={color}>
                              {color}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full font-display font-bold tracking-wide"
                    size="lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    ADD TO CART
                  </Button>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>2 Premium quality materials</p>
                    <p>2 Free shipping on orders over $75</p>
                    <p>2 30-day return policy</p>
                    <p>2 $1 from each purchase donated to veteran causes</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full font-display font-bold tracking-wide"
                size="lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                ADD TO CART
              </Button>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Premium quality materials</p>
                <p>• Free shipping on orders over $75</p>
                <p>• 30-day return policy</p>
                <p>• $1 from each purchase donated to veteran causes</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
