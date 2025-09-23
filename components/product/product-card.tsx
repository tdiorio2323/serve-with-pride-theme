"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { cn, formatPrice, calculateDiscount, isOnSale, getUrgencyMessage } from "@/lib/utils";
import { Button, AddToCartButton } from "@/components/ui/button";
import { ProductBadge, InventoryBadge, DiscountBadge } from "@/components/ui/badge";
import { useProductCart } from "@/lib/hooks/useCart";
import { showCartToast, showInventoryWarning, showOutOfStockToast } from "@/components/ui/toaster";
import { Product, ProductCardProps } from "@/lib/types";

export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  
  const { addToCart, getAddToCartMessage, canAddToCart, quantity } = useProductCart(product, selectedVariant);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];
  const currentImage = isHovered && secondaryImage ? secondaryImage : primaryImage;

  const totalInventory = product.variants.reduce((sum, variant) => sum + variant.quantityAvailable, 0);
  const urgencyMessage = getUrgencyMessage(totalInventory, product.badges);
  
  const handleAddToCart = () => {
    try {
      addToCart(selectedVariant);
      showCartToast(getAddToCartMessage(), "add");
      
      // Show inventory warning if stock is low
      if (selectedVariant.quantityAvailable <= 5) {
        showInventoryWarning(selectedVariant.quantityAvailable, product.title);
      }
    } catch (error) {
      if (selectedVariant.quantityAvailable <= 0) {
        showOutOfStockToast(product.title);
      } else {
        console.error("Add to cart error:", error);
      }
    }
  };

  const handleQuickView = () => {
    // Implement quick view modal
    console.log("Quick view:", product.id);
  };

  const handleWishlist = () => {
    // Implement wishlist functionality
    console.log("Add to wishlist:", product.id);
  };

  return (
    <div 
      className={cn(
        "group relative product-card-grunge transition-all duration-300",
        "hover:scale-[1.02] hover:z-10",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.badges.map((badge, index) => (
          <ProductBadge key={index} badge={badge} />
        ))}
        {isOnSale(selectedVariant.price, selectedVariant.compareAtPrice) && (
          <DiscountBadge 
            percentage={calculateDiscount(selectedVariant.compareAtPrice!, selectedVariant.price)}
            urgent
          />
        )}
      </div>

      {/* Inventory Status */}
      <div className="absolute top-3 right-3 z-10">
        <InventoryBadge quantity={totalInventory} />
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
        <Link href={`/products/${product.handle}`}>
          <Image
            src={currentImage.url}
            alt={currentImage.altText || product.title}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
              "group-hover:scale-110"
            )}
            priority={priority}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="tactical"
              onClick={handleQuickView}
              className="h-10 w-10 rounded-full"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleWishlist}
              className="h-10 w-10 rounded-full bg-white/90 hover:bg-white text-foreground"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.slice(0, 3).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 w-6 bg-white/50 rounded-full transition-all",
                  (index === 0 && !isHovered) || (index === 1 && isHovered) ? "bg-white" : ""
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Vendor */}
        {product.vendor && (
          <p className="text-xs font-tactical font-semibold text-brand-accent uppercase tracking-wider">
            {product.vendor}
          </p>
        )}

        {/* Title */}
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-tactical font-bold text-base text-foreground hover:text-brand-accent transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-military font-black text-foreground">
            {formatPrice(selectedVariant.price)}
          </span>
          {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(selectedVariant.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Rating (placeholder - would come from reviews) */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-brand-gold text-brand-gold" />
          ))}
          <span className="text-xs text-muted-foreground font-tactical ml-1">
            (127 reviews)
          </span>
        </div>

        {/* Variant Selection */}
        {product.variants.length > 1 && (
          <div className="space-y-2">
            <p className="text-xs font-tactical font-semibold text-muted-foreground">
              Size: {selectedVariant.selectedOptions.find(opt => opt.name === "Size")?.value}
            </p>
            <div className="flex gap-1">
              {product.variants.slice(0, 4).map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={cn(
                    "px-2 py-1 text-xs font-tactical font-bold rounded border transition-colors",
                    selectedVariant.id === variant.id
                      ? "bg-brand-accent text-white border-brand-accent"
                      : "bg-muted text-muted-foreground border-border hover:border-brand-accent"
                  )}
                >
                  {variant.selectedOptions.find(opt => opt.name === "Size")?.value || variant.title}
                </button>
              ))}
              {product.variants.length > 4 && (
                <span className="px-2 py-1 text-xs text-muted-foreground">
                  +{product.variants.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Urgency Message */}
        {urgencyMessage && (
          <p className="text-xs font-tactical font-bold text-responder-fire animate-pulse">
            {urgencyMessage}
          </p>
        )}

        {/* Add to Cart Button */}
        <AddToCartButton
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          inCart={quantity > 0}
          className="w-full"
        >
          {quantity > 0 ? `In Cart (${quantity})` : "Add to Arsenal"}
        </AddToCartButton>
      </div>

      {/* Patriotic accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-patriot-blue via-brand-white to-patriot-red opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

// Compact product card for smaller spaces
export function CompactProductCard({ product, className }: Omit<ProductCardProps, 'priority'>) {
  const selectedVariant = product.variants[0];
  const { addToCart, canAddToCart } = useProductCart(product, selectedVariant);
  
  const handleAddToCart = () => {
    try {
      addToCart(selectedVariant);
      showCartToast("Added to your patriot arsenal! 🇺🇸", "add");
    } catch (error) {
      showOutOfStockToast(product.title);
    }
  };

  return (
    <div className={cn("group flex gap-3 p-3 bg-card rounded-lg border hover:shadow-md transition-shadow", className)}>
      {/* Image */}
      <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <Link href={`/products/${product.handle}`}>
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText || product.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </Link>
        {product.badges.length > 0 && (
          <ProductBadge badge={product.badges[0]} className="absolute -top-1 -right-1 scale-75" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.handle}`}>
          <h4 className="font-tactical font-bold text-sm text-foreground hover:text-brand-accent transition-colors line-clamp-1">
            {product.title}
          </h4>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-military font-black text-base text-foreground">
            {formatPrice(selectedVariant.price)}
          </span>
          {isOnSale(selectedVariant.price, selectedVariant.compareAtPrice) && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(selectedVariant.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex-shrink-0">
        <Button
          size="icon"
          variant="patriot"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="h-8 w-8"
          aria-label="Add to cart"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Featured product card for hero sections
export function FeaturedProductCard({ product, className }: Omit<ProductCardProps, 'priority'>) {
  const selectedVariant = product.variants[0];
  const totalInventory = product.variants.reduce((sum, v) => sum + v.quantityAvailable, 0);
  
  return (
    <div className={cn("group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-muted/50 p-6", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-texture-concrete opacity-20" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-6">
        {/* Image */}
        <div className="relative aspect-square lg:aspect-[4/3] lg:w-1/2 overflow-hidden rounded-lg bg-muted">
          <Link href={`/products/${product.handle}`}>
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badges.slice(0, 2).map((badge, index) => (
              <ProductBadge key={index} badge={badge} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          {product.vendor && (
            <p className="text-sm font-tactical font-bold text-brand-accent uppercase tracking-wider">
              {product.vendor}
            </p>
          )}
          
          <Link href={`/products/${product.handle}`}>
            <h3 className="text-2xl lg:text-3xl font-military font-black text-foreground hover:text-brand-accent transition-colors">
              {product.title}
            </h3>
          </Link>
          
          <p className="text-muted-foreground font-tactical text-sm lg:text-base line-clamp-3">
            {product.description}
          </p>
          
          <div className="flex items-center gap-3">
            <span className="text-2xl lg:text-3xl font-military font-black text-foreground">
              {formatPrice(selectedVariant.price)}
            </span>
            {isOnSale(selectedVariant.price, selectedVariant.compareAtPrice) && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(selectedVariant.compareAtPrice!)}
                </span>
                <DiscountBadge 
                  percentage={calculateDiscount(selectedVariant.compareAtPrice!, selectedVariant.price)}
                />
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Link href={`/products/${product.handle}`}>
              <Button variant="patriot" size="tactical" className="font-bold">
                SECURE YOURS NOW
              </Button>
            </Link>
            <InventoryBadge quantity={totalInventory} lowStockThreshold={10} />
          </div>
        </div>
      </div>
    </div>
  );
}