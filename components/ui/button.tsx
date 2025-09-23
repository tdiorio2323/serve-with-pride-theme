import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Patriotic variants with military/tactical styling
        patriot:
          "bg-gradient-to-r from-patriot-red to-brand-accent text-white font-tactical font-bold shadow-patriot hover:shadow-tactical border border-patriot-red/30 hover:from-brand-accent hover:to-patriot-red transform hover:scale-[1.02] active:scale-[0.98]",
        tactical:
          "bg-gradient-to-r from-brand-primary to-brand-black text-brand-white font-tactical font-bold shadow-tactical hover:shadow-patriot border border-brand-silver/30 hover:border-brand-accent/50 transform hover:scale-[1.02] active:scale-[0.98]",
        grunge:
          "bg-grunge-steel text-brand-white font-military font-bold shadow-grunge hover:bg-grunge-rust border-2 border-grunge-concrete/50 hover:border-brand-gold/70 transform hover:scale-[1.02] active:scale-[0.98]",
        gold:
          "bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-black font-tactical font-bold shadow-button hover:shadow-patriot border border-brand-gold/50 hover:from-yellow-500 hover:to-brand-gold transform hover:scale-[1.02] active:scale-[0.98]",
        fire:
          "bg-gradient-to-r from-responder-fire to-red-600 text-white font-tactical font-bold shadow-patriot hover:shadow-tactical animate-pulse-patriot border border-responder-fire/30",
        police:
          "bg-gradient-to-r from-responder-police to-blue-800 text-white font-tactical font-bold shadow-tactical hover:shadow-patriot border border-responder-police/30 transform hover:scale-[1.02] active:scale-[0.98]",
        ems:
          "bg-gradient-to-r from-responder-ems to-green-700 text-white font-tactical font-bold shadow-patriot hover:shadow-tactical border border-responder-ems/30 transform hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-9 w-9",
        
        // Military-inspired sizes
        tactical: "h-11 px-6 py-3 text-sm font-bold tracking-wide",
        command: "h-14 px-12 py-4 text-lg font-bold tracking-wider",
      },
      uppercase: {
        true: "uppercase tracking-wider",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      uppercase: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, uppercase, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Add tactical text styling for military variants
    const isMilitaryVariant = ['patriot', 'tactical', 'grunge', 'fire', 'police', 'ems'].includes(variant as string);
    const militaryClass = isMilitaryVariant ? 'text-shadow-tactical' : '';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, uppercase, className }), militaryClass)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

// Patriotic button presets for common use cases
export const PatriotButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <Button ref={ref} variant="patriot" uppercase {...props}>
      {children}
    </Button>
  )
);
PatriotButton.displayName = "PatriotButton";

export const TacticalButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <Button ref={ref} variant="tactical" uppercase {...props}>
      {children}
    </Button>
  )
);
TacticalButton.displayName = "TacticalButton";

export const GrungeButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <Button ref={ref} variant="grunge" size="tactical" uppercase {...props}>
      {children}
    </Button>
  )
);
GrungeButton.displayName = "GrungeButton";

export const CommandButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'size'>>(
  ({ children, ...props }, ref) => (
    <Button ref={ref} variant="patriot" size="command" uppercase {...props}>
      {children}
    </Button>
  )
);
CommandButton.displayName = "CommandButton";

// First Responder themed buttons
export const FireButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <Button ref={ref} variant="fire" size="tactical" uppercase {...props}>
      {children}
    </Button>
  )
);
FireButton.displayName = "FireButton";

export const PoliceButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <Button ref={ref} variant="police" size="tactical" uppercase {...props}>
      {children}
    </Button>
  )
);
PoliceButton.displayName = "PoliceButton";

export const EmsButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  ({ children, ...props }, ref) => (
    <Button ref={ref} variant="ems" size="tactical" uppercase {...props}>
      {children}
    </Button>
  )
);
EmsButton.displayName = "EmsButton";

// Add-to-cart button with patriotic styling
export const AddToCartButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'> & { isLoading?: boolean; inCart?: boolean }
>(({ children, isLoading, inCart, disabled, ...props }, ref) => {
  const buttonText = inCart ? "In Cart" : isLoading ? "Adding..." : children;
  const buttonVariant = inCart ? "tactical" : "patriot";
  
  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      size="tactical"
      uppercase
      disabled={disabled || isLoading}
      {...props}
    >
      {buttonText}
    </Button>
  );
});
AddToCartButton.displayName = "AddToCartButton";

// Newsletter signup button
export const NewsletterButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  ({ children = "Join the Fight", ...props }, ref) => (
    <Button ref={ref} variant="gold" size="tactical" uppercase {...props}>
      {children}
    </Button>
  )
);
NewsletterButton.displayName = "NewsletterButton";

export { Button, buttonVariants };