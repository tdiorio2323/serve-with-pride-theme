import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCard.Skeleton";
import { Product } from "@/data/products";

type Props = { products?: Product[]; isLoading?: boolean };
export default function ProductGrid({ products, isLoading }: Props) {
  const loading = isLoading || !products;
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {products!.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
