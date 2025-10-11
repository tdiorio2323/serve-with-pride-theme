import { Skeleton } from "@/components/ui/Skeleton";
export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
