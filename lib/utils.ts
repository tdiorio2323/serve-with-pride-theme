import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProductBadge } from "./types";

/**
 * Utility function to merge Tailwind classes
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price for display with patriotic styling considerations
 * @param price - Price in cents or dollars
 * @param currency - Currency code (default: USD)
 * @param showCents - Whether to show cents (default: true)
 * @returns Formatted price string
 */
export function formatPrice(
  price: number | string,
  currency: string = "USD",
  showCents: boolean = true
): string {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) return "$0.00";

  // Handle cents vs dollars - if price is over 100 and no decimal, treat as cents
  const actualPrice = numericPrice > 100 && !price.toString().includes(".") 
    ? numericPrice / 100 
    : numericPrice;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(actualPrice);
}

/**
 * Calculate discount percentage for patriotic sale badges
 * @param originalPrice - Original price
 * @param salePrice - Sale price
 * @returns Discount percentage as integer
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Generate badge classes based on badge type with patriotic styling
 * @param badge - Product badge object
 * @returns Tailwind classes for badge
 */
export function getBadgeClasses(badge: ProductBadge): string {
  const baseClasses = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-tactical font-bold uppercase tracking-wide";
  
  switch (badge.type) {
    case "24h":
      return cn(baseClasses, "bg-responder-fire text-white animate-pulse");
    case "limited":
      return cn(baseClasses, "bg-patriot-red text-white", badge.urgent && "animate-pulse-patriot");
    case "usa-made":
      return cn(baseClasses, "bg-gradient-to-r from-patriot-blue to-patriot-red text-white");
    case "sale":
      return cn(baseClasses, "bg-brand-gold text-brand-black");
    case "new":
      return cn(baseClasses, "bg-responder-ems text-white");
    case "bestseller":
      return cn(baseClasses, "bg-grunge-steel text-white");
    default:
      return cn(baseClasses, "bg-gray-600 text-white");
  }
}

/**
 * Get patriotic color variant for components
 * @param variant - Color variant name
 * @returns CSS color value or Tailwind class
 */
export function getPatrioticColor(variant: string): string {
  const colors = {
    "patriot-red": "hsl(var(--patriot-red))",
    "patriot-blue": "hsl(var(--patriot-blue))",
    "brand-accent": "hsl(var(--brand-accent))",
    "brand-gold": "hsl(var(--brand-gold))",
    "responder-fire": "hsl(var(--responder-fire))",
    "responder-police": "hsl(var(--responder-police))",
    "responder-ems": "hsl(var(--responder-ems))",
    "grunge-steel": "hsl(var(--grunge-steel))",
  };
  
  return colors[variant as keyof typeof colors] || variant;
}

/**
 * Generate SEO-friendly URL slug
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text with ellipsis for product cards
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Check if price indicates a sale (has compareAtPrice and is lower)
 * @param price - Current price
 * @param compareAtPrice - Original/compare price
 * @returns True if item is on sale
 */
export function isOnSale(price: number, compareAtPrice?: number): boolean {
  return compareAtPrice ? compareAtPrice > price : false;
}

/**
 * Format product title for tactical/military feel
 * @param title - Original title
 * @returns Formatted title with tactical emphasis
 */
export function formatProductTitle(title: string): string {
  // Add tactical formatting to certain keywords
  return title
    .replace(/\b(USA|AMERICA|PATRIOT|FREEDOM|LIBERTY|TACTICAL|MILITARY|FIRE|POLICE|EMT)\b/gi, (match) => 
      `<span class="font-military text-brand-accent">${match.toUpperCase()}</span>`
    );
}

/**
 * Generate urgency message based on inventory and badges
 * @param inventory - Available inventory
 * @param badges - Product badges
 * @returns Urgency message or null
 */
export function getUrgencyMessage(inventory: number, badges: ProductBadge[]): string | null {
  const hasLimitedBadge = badges.some(badge => badge.type === "limited");
  const has24hBadge = badges.some(badge => badge.type === "24h");
  
  if (inventory <= 5 && inventory > 0) {
    return `Only ${inventory} left in stock!`;
  }
  
  if (hasLimitedBadge) {
    return "Limited Edition - Get Yours Before They're Gone!";
  }
  
  if (has24hBadge) {
    return "24-Hour Flash Sale - Don't Wait!";
  }
  
  if (inventory <= 0) {
    return "Out of Stock";
  }
  
  return null;
}

/**
 * Debounce function for search and filtering
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Get random patriotic quotes for empty states or loading
 * @returns Random patriotic quote
 */
export function getPatrioticQuote(): string {
  const quotes = [
    "Land of the Free, Home of the Brave",
    "One Nation Under God",
    "Liberty and Justice for All",
    "These Colors Don't Run",
    "United We Stand",
    "In God We Trust",
    "Freedom Isn't Free",
    "Defend the Constitution",
    "Honor Our Heroes",
    "America First"
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
}

/**
 * Validate email for newsletter signup
 * @param email - Email to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format date in patriotic context (for product releases, sales end dates)
 * @param date - Date to format
 * @param includeTime - Whether to include time
 * @returns Formatted date string
 */
export function formatPatrioticDate(date: string | Date, includeTime: boolean = false): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", 
    day: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    })
  };
  
  return dateObj.toLocaleDateString("en-US", options);
}