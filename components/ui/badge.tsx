import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, getBadgeClasses } from "@/lib/utils";
import { ProductBadge } from "@/lib/types";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        
        // Patriotic badge variants
        "24h": "badge-24h",
        limited: "badge-limited", 
        "usa-made": "badge-usa-made",
        sale: "badge-sale",
        new: "bg-responder-ems text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
        bestseller: "bg-grunge-steel text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
        
        // First responder themed
        fire: "bg-responder-fire text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide animate-pulse",
        police: "bg-responder-police text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
        ems: "bg-responder-ems text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
        military: "bg-responder-military text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
        
        // Status badges
        inStock: "bg-green-600 text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
        lowStock: "bg-yellow-600 text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide animate-pulse",
        outOfStock: "bg-red-600 text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
        
        // Patriotic colors
        patriotRed: "bg-patriot-red text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
        patriotBlue: "bg-patriot-blue text-white font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
        brandGold: "bg-brand-gold text-brand-black font-tactical font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  urgent?: boolean;
}

function Badge({ className, variant, urgent, ...props }: BadgeProps) {
  const urgentClass = urgent ? "animate-pulse-patriot" : "";
  
  return (
    <div className={cn(badgeVariants({ variant }), urgentClass, className)} {...props} />
  );
}

// Patriotic Product Badge Component
interface ProductBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  badge: ProductBadge;
}

function ProductBadgeComponent({ badge, className, ...props }: ProductBadgeProps) {
  return (
    <div 
      className={cn(getBadgeClasses(badge), className)} 
      title={badge.label}
      {...props}
    >
      {badge.label}
    </div>
  );
}

// Urgency Badge with countdown or limited quantities
interface UrgencyBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "limited" | "24h" | "low-stock" | "flash-sale";
  label: string;
  count?: number;
  urgent?: boolean;
}

function UrgencyBadge({ type, label, count, urgent = true, className, ...props }: UrgencyBadgeProps) {
  const getVariant = () => {
    switch (type) {
      case "24h":
      case "flash-sale":
        return "24h";
      case "limited":
        return "limited";
      case "low-stock":
        return "lowStock";
      default:
        return "limited";
    }
  };

  const displayLabel = count ? `${label} (${count} left!)` : label;

  return (
    <Badge variant={getVariant()} urgent={urgent} className={className} {...props}>
      {displayLabel}
    </Badge>
  );
}

// Trust Badge for building credibility
interface TrustBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  text: string;
}

function TrustBadge({ icon, text, className, ...props }: TrustBadgeProps) {
  return (
    <div className={cn("flex items-center gap-2 text-sm font-tactical text-muted-foreground", className)} {...props}>
      {icon && <span className="text-brand-accent">{icon}</span>}
      <span className="font-semibold">{text}</span>
    </div>
  );
}

// Collection Badge for product categorization
interface CollectionBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  collection: string;
  color?: "patriot" | "fire" | "police" | "ems" | "military";
}

function CollectionBadge({ collection, color = "patriot", className, ...props }: CollectionBadgeProps) {
  const getVariant = () => {
    switch (color) {
      case "fire":
        return "fire";
      case "police":
        return "police";
      case "ems":
        return "ems";
      case "military":
        return "military";
      default:
        return "patriotRed";
    }
  };

  return (
    <Badge variant={getVariant()} className={className} {...props}>
      {collection}
    </Badge>
  );
}

// Discount Badge showing savings
interface DiscountBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage: number;
  urgent?: boolean;
}

function DiscountBadge({ percentage, urgent = false, className, ...props }: DiscountBadgeProps) {
  return (
    <Badge 
      variant="sale" 
      urgent={urgent}
      className={cn("text-shadow-none", className)} 
      {...props}
    >
      SAVE {percentage}%
    </Badge>
  );
}

// Inventory Status Badge
interface InventoryBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  quantity: number;
  lowStockThreshold?: number;
}

function InventoryBadge({ quantity, lowStockThreshold = 5, className, ...props }: InventoryBadgeProps) {
  if (quantity <= 0) {
    return (
      <Badge variant="outOfStock" className={className} {...props}>
        OUT OF STOCK
      </Badge>
    );
  }
  
  if (quantity <= lowStockThreshold) {
    return (
      <Badge variant="lowStock" urgent className={className} {...props}>
        ONLY {quantity} LEFT
      </Badge>
    );
  }
  
  return (
    <Badge variant="inStock" className={className} {...props}>
      IN STOCK
    </Badge>
  );
}

// Free Shipping Badge
function FreeShippingBadge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Badge variant="patriotBlue" className={className} {...props}>
      🚚 FREE SHIPPING
    </Badge>
  );
}

// Made in USA Badge with flag
function MadeInUSABadge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Badge variant="usa-made" className={className} {...props}>
      🇺🇸 MADE IN USA
    </Badge>
  );
}

// Veteran Owned Badge
function VeteranOwnedBadge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Badge variant="military" className={className} {...props}>
      VETERAN OWNED
    </Badge>
  );
}

// Quality Guarantee Badge
function QualityBadge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Badge variant="brandGold" className={className} {...props}>
      ⭐ QUALITY GUARANTEE
    </Badge>
  );
}

export { 
  Badge, 
  badgeVariants, 
  ProductBadgeComponent as ProductBadge,
  UrgencyBadge,
  TrustBadge,
  CollectionBadge,
  DiscountBadge,
  InventoryBadge,
  FreeShippingBadge,
  MadeInUSABadge,
  VeteranOwnedBadge,
  QualityBadge,
};