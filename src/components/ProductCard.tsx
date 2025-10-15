import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { Product } from "@/data/products";

interface ProductCardProps {
  product?: Product;
  isLoading?: boolean;
}

export default function ProductCard({ product, isLoading = false }: ProductCardProps) {
  // Calculate price before early return to satisfy React Hooks rules
  const price = useMemo(() => {
    const amt = Number(product?.price ?? 0);
    const cur = "USD"; // Assuming USD as default currency
    try {
      return new Intl.NumberFormat(undefined, { style: "currency", currency: cur }).format(amt);
    } catch {
      return `$${amt.toFixed(2)}`;
    }
  }, [product?.price]);

  const href = product?.id ? `/product/${product.id}` : "#";

  if (isLoading || !product) return <ProductCardSkeleton />;

  return (
    <Link className="block group" to={href}>
      <div className="aspect-square overflow-hidden bg-neutral-100">
        <img
          src={product?.images[0] ?? "/placeholder.svg"}
          alt={product?.name ?? "Product"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium">{product?.name ?? "Unnamed product"}</h3>
        <p className="text-sm opacity-70">{price}</p>
      </div>
    </Link>
  );
}
