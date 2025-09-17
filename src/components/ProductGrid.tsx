import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "Truth Matters Original",
      price: "$29.99",
      image: "/truth-logo-1.png",
      badge: "BESTSELLER",
      description: "Classic Truth Matters design"
    },
    {
      id: 2,
      name: "Patriot Warrior",
      price: "$34.99",
      image: "/truth-logo-2.png",
      badge: "NEW",
      description: "Bold warrior-inspired design"
    },
    {
      id: 3,
      name: "Service Pride",
      price: "$32.99",
      image: "/truth-logo-3.png",
      badge: null,
      description: "Honoring those who serve"
    },
    {
      id: 4,
      name: "Freedom Fighter",
      price: "$31.99",
      image: "/truth-logo-4.png",
      badge: "SUPPORT",
      description: "Stand for freedom and justice"
    },
    {
      id: 5,
      name: "Honor Guard",
      price: "$33.99",
      image: "/truth-logo-5.png",
      badge: null,
      description: "Tribute to honor and duty"
    },
    {
      id: 6,
      name: "Liberty Shield",
      price: "$35.99",
      image: "/truth-logo-6.png",
      badge: "LIMITED",
      description: "Defending liberty since day one"
    },
    {
      id: 7,
      name: "Courage Elite",
      price: "$36.99",
      image: "/truth-logo-7.png",
      badge: null,
      description: "For the courageous few"
    },
    {
      id: 8,
      name: "Victory Line",
      price: "$30.99",
      image: "/truth-logo-8.png",
      badge: "POPULAR",
      description: "Victory through perseverance"
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
              <div className="bg-card rounded-lg border border-border overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-105" style={{ boxShadow: 'var(--shadow-card)' }}>
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