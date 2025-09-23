"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

// Patriotic Toast Components and Hooks
import { toast } from "@/hooks/use-toast";

// Patriotic success toast
export function showPatrioticSuccess(message: string, title?: string) {
  toast({
    title: title || "🇺🇸 Mission Accomplished!",
    description: message,
    className: "bg-gradient-to-r from-patriot-blue to-responder-ems text-white border-patriot-red font-tactical",
  });
}

// Tactical error toast  
export function showTacticalError(message: string, title?: string) {
  toast({
    title: title || "⚠️ Mission Failed",
    description: message,
    variant: "destructive",
    className: "bg-gradient-to-r from-patriot-red to-red-700 text-white border-patriot-red font-tactical",
  });
}

// Cart action toast
export function showCartToast(message: string, action?: "add" | "remove" | "update") {
  const titles = {
    add: "🛒 Added to Arsenal!",
    remove: "🗑️ Item Removed",
    update: "📦 Cart Updated",
  };
  
  toast({
    title: action ? titles[action] : "🛒 Cart Action",
    description: message,
    className: "bg-gradient-to-r from-brand-primary to-brand-black text-white border-brand-accent font-tactical",
  });
}

// Newsletter signup toast
export function showNewsletterToast(success: boolean, email?: string) {
  if (success) {
    toast({
      title: "🇺🇸 Welcome to the Fight!",
      description: `${email} has joined the Truth Matters newsletter. Stay strong, patriot!`,
      className: "bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-black border-brand-gold font-tactical font-bold",
    });
  } else {
    toast({
      title: "⚠️ Enlistment Failed",
      description: "Please check your email and try again, soldier.",
      variant: "destructive",
      className: "bg-gradient-to-r from-patriot-red to-red-700 text-white border-patriot-red font-tactical",
    });
  }
}

// Out of stock toast
export function showOutOfStockToast(productName: string) {
  toast({
    title: "📋 Temporarily Out of Service",
    description: `${productName} is currently out of stock. Check back soon, patriot!`,
    className: "bg-gradient-to-r from-grunge-steel to-gray-700 text-white border-grunge-concrete font-tactical",
  });
}

// Sale/discount toast
export function showSaleToast(discount: number, productName?: string) {
  const message = productName 
    ? `Save ${discount}% on ${productName}! Limited time only!`
    : `Save ${discount}% on your order! Act fast, patriot!`;
    
  toast({
    title: "🔥 Flash Sale Alert!",
    description: message,
    className: "bg-gradient-to-r from-responder-fire to-red-600 text-white border-responder-fire font-tactical animate-pulse-patriot",
  });
}

// Free shipping toast
export function showFreeShippingToast(qualified: boolean, remaining?: number) {
  if (qualified) {
    toast({
      title: "🚚 Free Shipping Secured!",
      description: "Your order qualifies for FREE shipping across America!",
      className: "bg-gradient-to-r from-patriot-blue to-blue-700 text-white border-patriot-blue font-tactical",
    });
  } else if (remaining) {
    toast({
      title: "🚚 Almost There, Soldier!",
      description: `Add $${remaining.toFixed(2)} more for FREE shipping!`,
      className: "bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-black border-brand-gold font-tactical",
    });
  }
}

// First responder appreciation toast
export function showFirstResponderToast(type: "fire" | "police" | "ems" | "military") {
  const messages = {
    fire: "Thank you for your service, brave firefighter! 🚒",
    police: "Thank you for protecting and serving! 🚔",
    ems: "Thank you for saving lives every day! 🚑", 
    military: "Thank you for defending our freedom! 🪖",
  };
  
  const colors = {
    fire: "from-responder-fire to-red-600",
    police: "from-responder-police to-blue-800",
    ems: "from-responder-ems to-green-700",
    military: "from-responder-military to-gray-600",
  };
  
  toast({
    title: "🇺🇸 Hero Appreciation",
    description: messages[type],
    className: `bg-gradient-to-r ${colors[type]} text-white border-current font-tactical`,
  });
}

// Inventory warning toast
export function showInventoryWarning(quantity: number, productName: string) {
  if (quantity <= 5 && quantity > 0) {
    toast({
      title: "⚠️ Low Stock Alert!",
      description: `Only ${quantity} ${productName} left in stock! Secure yours now!`,
      className: "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white border-yellow-500 font-tactical animate-pulse",
    });
  }
}

// Checkout success toast
export function showCheckoutSuccessToast(orderNumber?: string) {
  const message = orderNumber 
    ? `Order #${orderNumber} confirmed! Your patriotic gear is on the way!`
    : "Order confirmed! Your patriotic gear is on the way!";
    
  toast({
    title: "🇺🇸 Order Confirmed!",
    description: message,
    className: "bg-gradient-to-r from-patriot-blue via-brand-accent to-patriot-red text-white border-brand-gold font-tactical font-bold",
  });
}

// Loading/processing toast
export function showProcessingToast(message: string = "Processing your request...") {
  toast({
    title: "⏳ Stand By",
    description: message,
    className: "bg-gradient-to-r from-grunge-steel to-grunge-concrete text-white border-grunge-steel font-tactical",
  });
}

// Custom patriotic toast with full control
export function showCustomPatrioticToast({
  title,
  message,
  type = "info",
  urgent = false,
}: {
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  urgent?: boolean;
}) {
  const styles = {
    success: "from-patriot-blue to-responder-ems border-patriot-blue",
    error: "from-patriot-red to-red-700 border-patriot-red",
    warning: "from-brand-gold to-yellow-500 border-brand-gold text-brand-black",
    info: "from-brand-primary to-brand-black border-brand-accent",
  };
  
  const urgentClass = urgent ? "animate-pulse-patriot" : "";
  
  toast({
    title,
    description: message,
    className: `bg-gradient-to-r ${styles[type]} text-white font-tactical ${urgentClass}`,
  });
}