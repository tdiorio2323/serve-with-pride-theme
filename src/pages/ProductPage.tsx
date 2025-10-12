import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { getProductById, Product } from "@/data/products";
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useShare } from "@/hooks/use-share";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const { shareContent } = useShare();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Black');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // Standard sizing for all products
  const standardSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
  const standardColors = ['Black', 'White'];

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Set default color if product has different colors
        if (foundProduct.colors.length > 0) {
          const defaultColor = foundProduct.colors.includes('Black') ? 'Black' : foundProduct.colors[0];
          setSelectedColor(defaultColor);
        }
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/all-products')}>
              Back to Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[selectedImageIndex] || product.images[0],
      variant: {
        size: selectedSize,
        color: selectedColor,
      },
      qty: quantity,
      inStock: product.inStock,
    };

    addItem(cartItem);
    toast.success(`${product.name} added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => openCart(),
      },
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  const availableColors = standardColors.filter(color =>
    product.colors.includes(color) || product.colors.length === 0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-0 h-auto font-normal hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex] || product.images[0] || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="font-display font-bold tracking-wide">
                  {product.category.toUpperCase()}
                </Badge>
                {product.featured && (
                  <Badge variant="default">FEATURED</Badge>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-wide">
                {product.name}
              </h1>

              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4">
              <span className="font-display text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.salePrice && (
                <span className="font-display text-xl text-muted-foreground line-through">
                  ${product.salePrice.toFixed(2)}
                </span>
              )}
              <Badge variant="outline" className="bg-muted">
                +$1 DONATION
              </Badge>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Size Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Size: <span className="font-bold">{selectedSize}</span>
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {standardSizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="h-10"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Color: <span className="font-bold">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {availableColors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className="min-w-[80px]"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full font-display font-bold tracking-wide h-12 text-lg"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                ADD TO CART - ${(product.price * quantity).toFixed(2)}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleWishlist}
                  className="flex-1"
                >
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                  {isWishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => shareContent({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                  })}
                  className="flex-1"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  SHARE
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      <p className="text-sm text-muted-foreground">On orders over $75</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">30-Day Returns</p>
                      <p className="text-sm text-muted-foreground">Easy returns and exchanges</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Veteran Support</p>
                      <p className="text-sm text-muted-foreground">$1 from each purchase donated</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold">Product Details</h3>
              <div className="text-sm space-y-2">
                <p>• Premium quality materials</p>
                <p>• Comfortable, durable construction</p>
                <p>• Machine washable</p>
                <p>• Proudly supporting veteran causes</p>
                <p>• SKU: {product.sku}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;