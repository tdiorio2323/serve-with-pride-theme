import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Shield, Truck, Award, Users, Clock, ArrowRight, Flag, Heart, Target } from "lucide-react";
import { Button, CommandButton, PatriotButton } from "@/components/ui/button";
import { Badge, MadeInUSABadge, VeteranOwnedBadge, FreeShippingBadge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/product/product-grid";
import { FeaturedProductCard } from "@/components/product/product-card";
import { PromoBar, UrgencyPromoBar } from "@/components/layout/promo-bar";
import { getPatrioticQuote } from "@/lib/utils";

// Import data
import productsData from "@/data/products.json";
import collectionsData from "@/data/collections.json";
import subscriptionsData from "@/data/subscriptions.json";

// Sample featured products (first 8)
const featuredProducts = productsData.slice(0, 8);
const heroProduct = productsData[0];
const popularSubscription = subscriptionsData.find(sub => sub.popular);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Urgency Promo Bar */}
      <UrgencyPromoBar />

      {/* Hero Section */}
      <section className="hero-grunge min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <Badge variant="usa-made" className="mb-4">
                  🇺🇸 PROUDLY MADE IN AMERICA
                </Badge>
                <h1 className="text-grunge-hero">
                  TRUTH MATTERS.<br />
                  <span className="text-brand-gold">AMERICA FIRST.</span>
                </h1>
                <p className="text-xl text-brand-white/90 font-tactical max-w-2xl">
                  Gear up with patriotic apparel that screams American pride. From first responder heroes 
                  to freedom-loving patriots - we've got your six with quality gear and unwavering values.
                </p>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <CommandButton size="command">
                  SHOP PATRIOTIC GEAR
                </CommandButton>
                <Link href="/truth-club">
                  <Button variant="tactical" size="tactical" className="w-full sm:w-auto">
                    JOIN TRUTH CLUB
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2 text-brand-white/80">
                  <Star className="h-5 w-5 fill-brand-gold text-brand-gold" />
                  <span className="font-tactical font-bold">50,000+ Patriots</span>
                </div>
                <div className="flex items-center gap-2 text-brand-white/80">
                  <Shield className="h-5 w-5 text-brand-accent" />
                  <span className="font-tactical font-bold">Veteran Owned</span>
                </div>
                <div className="flex items-center gap-2 text-brand-white/80">
                  <Award className="h-5 w-5 text-brand-gold" />
                  <span className="font-tactical font-bold">Made in USA</span>
                </div>
              </div>
            </div>

            {/* Hero Product Showcase */}
            {heroProduct && (
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <FeaturedProductCard product={heroProduct} className="bg-transparent" />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4">
                  <Badge variant="fire" className="animate-pulse-patriot">
                    🔥 TRENDING NOW
                  </Badge>
                </div>
                <div className="absolute -bottom-4 -left-4">
                  <FreeShippingBadge />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hero Background Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-patriot-red to-brand-accent rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-tactical font-bold text-lg">FREE SHIPPING</h3>
              <p className="text-muted-foreground font-tactical text-sm">On orders over $75 across America</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-patriot-blue to-responder-police rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-tactical font-bold text-lg">VETERAN OWNED</h3>
              <p className="text-muted-foreground font-tactical text-sm">Supporting those who served</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-brand-black" />
              </div>
              <h3 className="font-tactical font-bold text-lg">MADE IN USA</h3>
              <p className="text-muted-foreground font-tactical text-sm">Proudly American crafted</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-responder-ems to-green-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-tactical font-bold text-lg">50K+ PATRIOTS</h3>
              <p className="text-muted-foreground font-tactical text-sm">Join the movement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-display font-military font-black mb-4">
              GEAR FOR <span className="text-brand-accent">HEROES</span>
            </h2>
            <p className="text-lg text-muted-foreground font-tactical max-w-2xl mx-auto">
              From first responders to freedom fighters, we've got the gear that honors your service and values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionsData.slice(0, 6).map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.handle}`}>
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-muted/50 aspect-[4/3] cursor-pointer">
                  <div className="absolute inset-0 bg-texture-concrete opacity-20" />
                  
                  {collection.image && (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-military font-black mb-2 group-hover:text-brand-accent transition-colors">
                      {collection.title}
                    </h3>
                    <p className="text-sm font-tactical opacity-90 line-clamp-2">
                      {collection.description}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-display font-military font-black mb-4">
              PATRIOTIC <span className="text-brand-accent">BESTSELLERS</span>
            </h2>
            <p className="text-lg text-muted-foreground font-tactical max-w-2xl mx-auto">
              Battle-tested gear chosen by patriots nationwide. These are the products that make America proud.
            </p>
          </div>

          <ProductGrid 
            products={featuredProducts} 
            showFilters={false} 
            itemsPerPage={8}
            className="mb-8"
          />

          <div className="text-center">
            <Link href="/collections">
              <PatriotButton size="tactical">
                VIEW ALL PRODUCTS
                <ArrowRight className="h-5 w-5 ml-2" />
              </PatriotButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Truth Club Subscription */}
      {popularSubscription && (
        <section className="py-16 bg-gradient-to-r from-patriot-blue via-brand-accent to-patriot-red text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="24h" className="mb-2">
                  🔥 MOST POPULAR
                </Badge>
                <h2 className="text-display font-military font-black text-shadow-tactical">
                  JOIN THE TRUTH CLUB
                </h2>
                <p className="text-xl font-tactical opacity-90">
                  Get exclusive patriotic gear delivered monthly. Join 10,000+ patriots who trust Truth Club 
                  for their freedom gear fix.
                </p>
                
                <ul className="space-y-3">
                  {popularSubscription.benefits.slice(0, 5).map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 font-tactical">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-brand-gold rounded-full" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-military font-black">
                    ${popularSubscription.price}/month
                  </span>
                  <Badge variant="sale">SAVE 20%</Badge>
                </div>

                <div className="flex gap-4">
                  <Link href="/truth-club">
                    <Button variant="ghost" size="tactical" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      JOIN NOW
                    </Button>
                  </Link>
                  <Link href="/truth-club">
                    <Button variant="outline" size="tactical" className="border-white/50 text-white hover:bg-white/10">
                      LEARN MORE
                    </Button>
                  </Link>
                </div>
              </div>

              {popularSubscription.image && (
                <div className="relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    <Image
                      src={popularSubscription.image.url}
                      alt={popularSubscription.image.altText || popularSubscription.title}
                      fill
                      className="object-cover rounded-xl"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Floating testimonial */}
                  <div className="absolute -bottom-6 -right-6 bg-white/95 p-4 rounded-lg shadow-tactical max-w-xs">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <p className="text-sm font-tactical text-foreground font-semibold">
                      "Best patriotic gear I've ever received! Truth Club delivers quality every month."
                    </p>
                    <p className="text-xs text-muted-foreground font-tactical mt-1">
                      - Mike S., Veteran
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-display font-military font-black mb-12">
            OUR <span className="text-brand-accent">MISSION</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-patriot-red to-brand-accent rounded-full flex items-center justify-center mx-auto">
                <Flag className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-tactical font-bold">AMERICA FIRST</h3>
              <p className="text-muted-foreground font-tactical">
                Every product celebrates American values and supports our great nation's principles.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-responder-police to-patriot-blue rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-tactical font-bold">SUPPORT HEROES</h3>
              <p className="text-muted-foreground font-tactical">
                We honor our first responders, military, and all who serve our communities with courage.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-10 w-10 text-brand-black" />
              </div>
              <h3 className="text-xl font-tactical font-bold">TRUTH MATTERS</h3>
              <p className="text-muted-foreground font-tactical">
                In a world of fake news and propaganda, we stand for truth, facts, and authentic patriotism.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-muted to-muted/50 p-8 rounded-xl max-w-4xl mx-auto">
            <blockquote className="text-xl font-military font-bold text-foreground italic mb-4">
              "{getPatrioticQuote()}"
            </blockquote>
            <p className="text-muted-foreground font-tactical">
              We believe in the Constitution, the flag, and the values that make America the greatest nation on Earth.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brand-primary via-brand-black to-brand-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-texture-concrete opacity-10" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-display font-military font-black mb-6 text-shadow-tactical">
            READY TO JOIN THE FIGHT?
          </h2>
          <p className="text-xl font-tactical mb-8 opacity-90 max-w-2xl mx-auto">
            Don't let the fake news media and woke corporations define America. 
            Join 50,000+ patriots who wear their values with pride.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/collections">
              <CommandButton size="command">
                SHOP NOW
              </CommandButton>
            </Link>
            <Link href="/truth-club">
              <Button variant="tactical" size="command">
                JOIN TRUTH CLUB
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-tactical opacity-80">
            <MadeInUSABadge />
            <VeteranOwnedBadge />
            <FreeShippingBadge />
            <Badge variant="patriotBlue">🔒 SECURE CHECKOUT</Badge>
          </div>
        </div>
      </section>
    </div>
  );
}