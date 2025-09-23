import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Shield, Users, ChevronRight } from "lucide-react";
import { Button, PatriotButton } from "@/components/ui/button";
import { Badge, MadeInUSABadge, VeteranOwnedBadge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/product/product-grid";
import { PromoBar } from "@/components/layout/promo-bar";
import { cn, formatPrice } from "@/lib/utils";

// Import data
import collectionsData from "@/data/collections.json";
import productsData from "@/data/products.json";

interface CollectionPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    sort?: string;
    q?: string;
    page?: string;
  };
}

export default function CollectionPage({ params, searchParams }: CollectionPageProps) {
  // Find the collection by slug
  const collection = collectionsData.find(c => c.handle === params.slug);
  
  if (!collection) {
    notFound();
  }

  // Filter products that belong to this collection (mock logic - in real app would come from API)
  const collectionProducts = productsData.filter(product => 
    product.collections?.includes(collection.id) || 
    product.productType?.toLowerCase().includes(collection.handle.toLowerCase()) ||
    product.tags?.some(tag => tag.toLowerCase().includes(collection.handle.toLowerCase()))
  );

  // If no products match, show some random products for demo
  const products = collectionProducts.length > 0 ? collectionProducts : productsData.slice(0, 12);

  // Collection stats
  const totalProducts = products.length;
  const priceRange = products.length > 0 ? {
    min: Math.min(...products.map(p => p.variants[0].price)),
    max: Math.max(...products.map(p => p.variants[0].price))
  } : { min: 0, max: 0 };

  const averageRating = 4.8; // Mock rating
  const reviewCount = Math.floor(Math.random() * 1000) + 500;

  return (
    <div className="min-h-screen">
      {/* Collection-specific promo bar */}
      <PromoBar 
        messages={[{
          id: `${collection.handle}-promo`,
          message: `🔥 ${collection.title.toUpperCase()}: FREE SHIPPING ON ALL ORDERS + 15% OFF WITH CODE PATRIOT15`,
          urgent: true,
          cta: "SHOP NOW"
        }]}
        interval={5000}
      />

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm font-tactical">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/collections" className="text-muted-foreground hover:text-foreground transition-colors">
              Collections
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-bold">
              {collection.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Collection Hero */}
      <section className="py-16 bg-gradient-to-br from-card to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-texture-concrete opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Collection Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Link 
                  href="/collections"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <span className="text-sm font-tactical text-muted-foreground">
                  Back to Collections
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <MadeInUSABadge />
                  <VeteranOwnedBadge />
                </div>
                
                <h1 className="text-display font-military font-black text-foreground">
                  {collection.title}
                </h1>
                
                <p className="text-lg text-muted-foreground font-tactical leading-relaxed">
                  {collection.description}
                </p>
              </div>

              {/* Collection Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-border">
                <div className="text-center">
                  <div className="text-2xl font-military font-black text-foreground">
                    {totalProducts}
                  </div>
                  <div className="text-sm font-tactical text-muted-foreground">
                    Products
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
                    <span className="text-lg font-military font-black text-foreground">
                      {averageRating}
                    </span>
                  </div>
                  <div className="text-sm font-tactical text-muted-foreground">
                    ({reviewCount} reviews)
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-military font-black text-foreground">
                    {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                  </div>
                  <div className="text-sm font-tactical text-muted-foreground">
                    Price Range
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Shield className="h-4 w-4 text-brand-accent" />
                    <span className="text-lg font-military font-black text-foreground">
                      100%
                    </span>
                  </div>
                  <div className="text-sm font-tactical text-muted-foreground">
                    Satisfaction
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <PatriotButton size="tactical">
                  SHOP THIS COLLECTION
                </PatriotButton>
                <Button variant="outline" size="tactical">
                  VIEW SIZE GUIDE
                </Button>
              </div>
            </div>

            {/* Collection Image */}
            <div className="relative">
              {collection.image ? (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Overlay badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge variant="usa-made">
                      🇺🇸 MADE IN USA
                    </Badge>
                    <Badge variant="fire" className="animate-pulse-patriot">
                      🔥 TRENDING
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-patriot-red to-brand-accent flex items-center justify-center">
                  <div className="text-center text-white">
                    <Shield className="h-24 w-24 mx-auto mb-4" />
                    <h3 className="text-2xl font-military font-black text-shadow-tactical">
                      {collection.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Floating testimonial */}
              <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-lg shadow-tactical border max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-sm font-tactical text-foreground font-semibold">
                  "Exactly what I expected from Truth Matters. Quality gear that shows my pride!"
                </p>
                <p className="text-xs text-muted-foreground font-tactical mt-1">
                  - Sarah M., Police Officer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-tactical">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4 text-brand-accent" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-responder-ems" />
              <span>Trusted by 50,000+ Patriots</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4 text-brand-gold" />
              <span>4.8/5 Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-headline font-military font-black text-foreground">
              PRODUCTS IN THIS COLLECTION
            </h2>
            <div className="text-sm text-muted-foreground font-tactical">
              {products.length} products found
            </div>
          </div>

          <ProductGrid
            products={products}
            defaultSort={searchParams.sort || "featured"}
            showFilters={true}
            showSort={true}
            itemsPerPage={16}
            className="mb-16"
          />
        </div>
      </section>

      {/* Related Collections */}
      {collectionsData.length > 1 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-headline font-military font-black mb-4">
                MORE PATRIOTIC COLLECTIONS
              </h2>
              <p className="text-lg text-muted-foreground font-tactical max-w-2xl mx-auto">
                Explore other collections that celebrate American values and honor our heroes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collectionsData
                .filter(c => c.id !== collection.id)
                .slice(0, 3)
                .map((relatedCollection) => (
                  <Link key={relatedCollection.id} href={`/collections/${relatedCollection.handle}`}>
                    <div className="group product-card-grunge aspect-[4/3] cursor-pointer">
                      <div className="relative h-full overflow-hidden rounded-lg">
                        {relatedCollection.image ? (
                          <Image
                            src={relatedCollection.image.url}
                            alt={relatedCollection.image.altText || relatedCollection.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-patriot-blue to-brand-accent flex items-center justify-center">
                            <Shield className="h-16 w-16 text-white" />
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-lg font-military font-black mb-2 group-hover:text-brand-accent transition-colors">
                            {relatedCollection.title}
                          </h3>
                          <p className="text-sm font-tactical opacity-90 line-clamp-2">
                            {relatedCollection.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Collection CTA */}
      <section className="py-16 bg-gradient-to-r from-patriot-blue via-brand-accent to-patriot-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-display font-military font-black mb-6 text-shadow-tactical">
            READY TO SHOW YOUR PRIDE?
          </h2>
          <p className="text-xl font-tactical mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of patriots who trust {collection.title} for quality gear 
            that represents their values. Made in America, designed for heroes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="ghost" size="tactical" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              SHOP {collection.title.toUpperCase()}
            </Button>
            <Link href="/truth-club">
              <Button variant="outline" size="tactical" className="border-white/50 text-white hover:bg-white/10">
                JOIN TRUTH CLUB
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static params for collections (for static generation if needed)
export async function generateStaticParams() {
  return collectionsData.map((collection) => ({
    slug: collection.handle,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CollectionPageProps) {
  const collection = collectionsData.find(c => c.handle === params.slug);
  
  if (!collection) {
    return {
      title: "Collection Not Found | Truth Matters",
    };
  }

  return {
    title: `${collection.seo?.title || collection.title} | Truth Matters`,
    description: collection.seo?.description || collection.description,
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: collection.image ? [collection.image.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: collection.title,
      description: collection.description,
      images: collection.image ? [collection.image.url] : [],
    },
  };
}