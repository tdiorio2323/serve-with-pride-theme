import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Flag, Heart, Users, ArrowRight, Grid, Search } from "lucide-react";
import { Button, PatriotButton } from "@/components/ui/button";
import { Badge, VeteranOwnedBadge, MadeInUSABadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Import data
import collectionsData from "@/data/collections.json";

interface CollectionPreview {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText?: string;
  };
  productCount?: number;
  featured?: boolean;
  category: "patriot" | "responder" | "military" | "values";
}

// Transform collections data with additional metadata
const collections: CollectionPreview[] = collectionsData.map((collection, index) => ({
  ...collection,
  productCount: Math.floor(Math.random() * 50) + 10, // Mock product count
  featured: index < 3, // First 3 are featured
  category: getCollectionCategory(collection.handle),
}));

function getCollectionCategory(handle: string): "patriot" | "responder" | "military" | "values" {
  if (handle.includes("flag") || handle.includes("patriot")) return "patriot";
  if (handle.includes("responder") || handle.includes("fire") || handle.includes("police") || handle.includes("ems")) return "responder";
  if (handle.includes("military") || handle.includes("veteran")) return "military";
  return "values";
}

const categoryIcons = {
  patriot: Flag,
  responder: Shield,
  military: Users,
  values: Heart,
};

const categoryColors = {
  patriot: "from-patriot-red to-brand-accent",
  responder: "from-responder-fire to-responder-police",
  military: "from-responder-military to-brand-black",
  values: "from-brand-gold to-yellow-500",
};

export default function CollectionsPage() {
  const featuredCollections = collections.filter(c => c.featured);
  const regularCollections = collections.filter(c => !c.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-grunge py-20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <VeteranOwnedBadge className="mb-4" />
            <h1 className="text-grunge-hero">
              COLLECTIONS FOR
              <br />
              <span className="text-brand-accent">TRUE PATRIOTS</span>
            </h1>
            <p className="text-xl text-brand-white/90 font-tactical max-w-2xl mx-auto">
              Discover gear collections designed for America's finest. From first responders to freedom lovers, 
              find apparel that honors your service and celebrates your values.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
                <input
                  type="text"
                  placeholder="Search collections..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 font-tactical backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 pt-6 text-brand-white/80">
              <div className="flex items-center gap-2">
                <Grid className="h-5 w-5" />
                <span className="font-tactical font-bold">{collections.length} Collections</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-tactical font-bold">50K+ Patriots</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="font-tactical font-bold">Made in USA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
      </section>

      {/* Featured Collections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-display font-military font-black mb-4">
              FEATURED <span className="text-brand-accent">COLLECTIONS</span>
            </h2>
            <p className="text-lg text-muted-foreground font-tactical max-w-2xl mx-auto">
              Our most popular gear collections, chosen by patriots across America.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {featuredCollections.map((collection, index) => (
              <FeaturedCollectionCard key={collection.id} collection={collection} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* All Collections Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-display font-military font-black mb-4">
              ALL COLLECTIONS
            </h2>
            <p className="text-lg text-muted-foreground font-tactical max-w-2xl mx-auto">
              Browse our complete selection of patriotic gear collections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-display font-military font-black mb-4">
              SHOP BY <span className="text-brand-accent">CATEGORY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categoryIcons).map(([category, Icon]) => {
              const categoryCollections = collections.filter(c => c.category === category);
              const categoryTitle = {
                patriot: "Patriotic",
                responder: "First Responders", 
                military: "Military & Veterans",
                values: "American Values"
              }[category as keyof typeof categoryIcons];

              return (
                <div
                  key={category}
                  className={cn(
                    "group relative overflow-hidden rounded-xl aspect-square cursor-pointer",
                    "bg-gradient-to-br", categoryColors[category as keyof typeof categoryColors]
                  )}
                >
                  <div className="absolute inset-0 bg-texture-concrete opacity-20" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                    <Icon className="h-16 w-16 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-military font-black mb-2 text-shadow-tactical">
                      {categoryTitle}
                    </h3>
                    <p className="text-sm font-tactical opacity-90">
                      {categoryCollections.length} Collections
                    </p>
                    <p className="text-xs font-tactical opacity-75 mt-1">
                      {categoryCollections.reduce((sum, c) => sum + (c.productCount || 0), 0)} Products
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30">
                      Explore Category
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-patriot-blue via-brand-accent to-patriot-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-display font-military font-black mb-4 text-shadow-tactical">
            CAN'T FIND WHAT YOU'RE LOOKING FOR?
          </h2>
          <p className="text-xl font-tactical mb-8 opacity-90 max-w-2xl mx-auto">
            Let us know what patriotic gear you need. We're always adding new collections 
            based on what our community wants.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="ghost" size="tactical" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              REQUEST A COLLECTION
            </Button>
            <Button variant="outline" size="tactical" className="border-white/50 text-white hover:bg-white/10">
              CONTACT US
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Featured Collection Card Component
function FeaturedCollectionCard({ collection, priority = false }: { collection: CollectionPreview; priority?: boolean }) {
  const Icon = categoryIcons[collection.category];

  return (
    <Link href={`/collections/${collection.handle}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-muted/50 aspect-[4/5] cursor-pointer">
        <div className="absolute inset-0 bg-texture-concrete opacity-20" />
        
        {collection.image && (
          <Image
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Icon className="h-5 w-5 text-brand-accent" />
            <Badge variant="patriotRed" className="text-xs">
              FEATURED
            </Badge>
          </div>
          
          <h3 className="text-2xl font-military font-black mb-3 group-hover:text-brand-accent transition-colors">
            {collection.title}
          </h3>
          
          <p className="text-sm font-tactical opacity-90 line-clamp-3 mb-4">
            {collection.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-tactical font-bold">
              {collection.productCount} Products
            </span>
            <div className="flex items-center gap-2 text-sm font-tactical font-bold group-hover:text-brand-accent transition-colors">
              SHOP NOW
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/10 transition-all duration-500" />
      </div>
    </Link>
  );
}

// Regular Collection Card Component  
function CollectionCard({ collection }: { collection: CollectionPreview }) {
  const Icon = categoryIcons[collection.category];

  return (
    <Link href={`/collections/${collection.handle}`}>
      <div className="group product-card-grunge aspect-[4/5] cursor-pointer">
        <div className="relative h-3/4 overflow-hidden rounded-t-lg">
          {collection.image ? (
            <Image
              src={collection.image.url}
              alt={collection.image.altText || collection.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className={cn(
              "w-full h-full bg-gradient-to-br flex items-center justify-center",
              categoryColors[collection.category]
            )}>
              <Icon className="h-16 w-16 text-white" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          <div className="absolute top-3 left-3">
            <Icon className="h-6 w-6 text-white/80" />
          </div>
        </div>

        <div className="h-1/4 p-4 flex flex-col justify-center">
          <h3 className="font-tactical font-bold text-foreground group-hover:text-brand-accent transition-colors line-clamp-1 mb-1">
            {collection.title}
          </h3>
          
          <p className="text-sm text-muted-foreground font-tactical line-clamp-2 mb-2">
            {collection.description}
          </p>
          
          <div className="flex items-center justify-between text-xs font-tactical font-semibold">
            <span className="text-muted-foreground">
              {collection.productCount} Products
            </span>
            <div className="flex items-center gap-1 text-brand-accent group-hover:gap-2 transition-all">
              VIEW
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}