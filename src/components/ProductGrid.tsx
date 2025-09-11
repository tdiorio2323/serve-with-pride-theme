import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import flagTee from "@/assets/flag-tee.jpg";
import responderHoodie from "@/assets/responder-hoodie.jpg";
import patriotHat from "@/assets/patriot-hat.jpg";
import thinBlueLinePatch from "@/assets/thin-blue-line-patch.jpg";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "Freedom Flag Tee",
      price: "$29.99",
      image: flagTee,
      badge: "BESTSELLER",
      description: "Premium cotton tee with vintage flag design"
    },
    {
      id: 2,
      name: "First Responder Hoodie",
      price: "$54.99",
      image: responderHoodie,
      badge: "NEW",
      description: "Heavy-duty hoodie honoring our heroes"
    },
    {
      id: 3,
      name: "Patriot Trucker Hat",
      price: "$24.99",
      image: patriotHat,
      badge: null,
      description: "Classic mesh-back cap with flag patch"
    },
    {
      id: 4,
      name: "Thin Blue Line Patch",
      price: "$12.99",
      image: thinBlueLinePatch,
      badge: "SUPPORT",
      description: "Iron-on patch supporting law enforcement"
    }
  ];

  return (
    <section id="shop" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-wide">
            FEATURED GEAR
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium apparel and accessories designed for those who serve and protect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="bg-card rounded-lg shadow-card border border-border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.badge && (
                    <Badge 
                      variant={product.badge === "BESTSELLER" ? "default" : "secondary"}
                      className="absolute top-3 left-3 font-display font-bold tracking-wide"
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-2xl font-bold text-primary">
                      {product.price}
                    </span>
                    <div className="font-body text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      +$1 DONATION
                    </div>
                  </div>
                  
                  <Button 
                    variant="default"
                    className="w-full font-display font-bold tracking-wide"
                  >
                    ADD TO CART
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            variant="outline"
            size="lg"
            className="font-display text-lg font-bold tracking-wide border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            VIEW ALL PRODUCTS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;