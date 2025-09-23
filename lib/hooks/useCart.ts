"use client";

import { useCart as useCartProvider, useCartActions, useCartTotal, useCartItems, useIsInCart, useCartItemQuantity } from "../providers/cart-provider";
import { Product, ProductVariant } from "../types";
import { formatPrice } from "../utils";

/**
 * Main cart hook that provides all cart functionality
 * with additional convenience methods and patriotic messaging
 */
export function useCart() {
  const cart = useCartProvider();
  const { totalItems, totalAmount } = useCartTotal();
  const items = useCartItems();

  return {
    ...cart,
    
    // Formatted total for display
    formattedTotal: formatPrice(totalAmount),
    
    // Patriotic cart status messages
    getCartStatusMessage: () => {
      if (totalItems === 0) return "Your arsenal is empty, patriot!";
      if (totalItems === 1) return "1 item ready to serve";
      return `${totalItems} items ready to serve`;
    },
    
    // Check if cart qualifies for free shipping (over $75)
    qualifiesForFreeShipping: totalAmount >= 75,
    
    // Amount needed for free shipping
    amountUntilFreeShipping: Math.max(0, 75 - totalAmount),
    
    // Formatted free shipping message
    getFreeShippingMessage: () => {
      const remaining = 75 - totalAmount;
      if (remaining <= 0) {
        return "🇺🇸 You qualify for FREE shipping!";
      }
      return `Add ${formatPrice(remaining)} more for FREE shipping!`;
    },
  };
}

/**
 * Hook for product-specific cart operations
 */
export function useProductCart(product: Product, selectedVariant?: ProductVariant) {
  const { addItem } = useCartActions();
  const isInCart = selectedVariant ? useIsInCart(product.id, selectedVariant.id) : false;
  const quantity = selectedVariant ? useCartItemQuantity(product.id, selectedVariant.id) : 0;

  const addToCart = (variant: ProductVariant, qty: number = 1) => {
    if (!variant.availableForSale) {
      throw new Error("This item is not available for sale");
    }
    
    if (variant.quantityAvailable < qty) {
      throw new Error(`Only ${variant.quantityAvailable} items available`);
    }
    
    addItem(product, variant, qty);
  };

  // Generate patriotic success messages
  const getAddToCartMessage = () => {
    const messages = [
      "Added to your patriot arsenal! 🇺🇸",
      "Locked and loaded! Ready for checkout!",
      "Another victory for Team America!",
      "Your cart just got more patriotic!",
      "Freedom gear secured!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return {
    addToCart,
    isInCart,
    quantity,
    getAddToCartMessage,
    canAddToCart: selectedVariant?.availableForSale && (selectedVariant?.quantityAvailable || 0) > 0,
  };
}

/**
 * Hook for cart sidebar/modal management with patriotic messaging
 */
export function useCartModal() {
  const { isOpen, toggleCart, openCart, closeCart } = useCartActions();
  const { totalItems } = useCartTotal();

  const openWithMessage = (message?: string) => {
    openCart();
    
    // Optional: Show toast message when cart opens
    if (message) {
      // You can integrate with your toast system here
      console.log(message);
    }
  };

  return {
    isOpen,
    toggleCart,
    openCart: openWithMessage,
    closeCart,
    hasItems: totalItems > 0,
  };
}

/**
 * Hook for cart item management in cart components
 */
export function useCartItemManager() {
  const { removeItem, updateQuantity } = useCartActions();

  const removeWithConfirmation = (itemId: string) => {
    // You can add confirmation dialog here if needed
    removeItem(itemId);
  };

  const updateQuantityWithValidation = (itemId: string, newQuantity: number, maxQuantity: number) => {
    if (newQuantity < 0) return;
    if (newQuantity > maxQuantity) {
      // You can show toast here: "Only {maxQuantity} items available"
      return;
    }
    
    updateQuantity(itemId, newQuantity);
  };

  // Patriotic removal messages
  const getRemovalMessage = () => {
    const messages = [
      "Item dismissed from duty!",
      "Tactical withdrawal complete!",
      "Item honorably discharged!",
      "Mission aborted - item removed!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return {
    removeItem: removeWithConfirmation,
    updateQuantity: updateQuantityWithValidation,
    getRemovalMessage,
  };
}

/**
 * Hook for checkout preparation with patriotic validation
 */
export function useCheckout() {
  const { items, totalAmount, clearCart } = useCart();
  const { totalItems } = useCartTotal();

  const validateCartForCheckout = () => {
    if (totalItems === 0) {
      throw new Error("Your arsenal is empty! Add some patriotic gear first.");
    }

    // Check for out-of-stock items
    const outOfStockItems = items.filter(item => !item.variant.availableForSale);
    if (outOfStockItems.length > 0) {
      throw new Error("Some items in your cart are no longer available. Please remove them to continue.");
    }

    // Check quantity availability
    const oversoldItems = items.filter(item => item.quantity > item.variant.quantityAvailable);
    if (oversoldItems.length > 0) {
      throw new Error("Some items exceed available quantity. Please update quantities to continue.");
    }

    return true;
  };

  const prepareCheckoutData = () => {
    validateCartForCheckout();
    
    return {
      items: items.map(item => ({
        variantId: item.variant.id,
        quantity: item.quantity,
        price: item.variant.price,
      })),
      totalAmount,
      totalItems,
      metadata: {
        source: "truth-matters-storefront",
        theme: "patriotic",
      },
    };
  };

  // Patriotic checkout messages
  const getCheckoutMessages = () => ({
    success: "Mission accomplished! Order confirmed! 🇺🇸",
    error: "Mission failed! Please try again, patriot!",
    processing: "Processing your patriotic order...",
    redirect: "Redirecting to secure checkout...",
  });

  return {
    validateCartForCheckout,
    prepareCheckoutData,
    getCheckoutMessages,
    clearCart,
    canCheckout: totalItems > 0 && totalAmount > 0,
  };
}

/**
 * Hook for cart analytics and tracking
 */
export function useCartAnalytics() {
  const { items, totalAmount, totalItems } = useCart();

  const trackAddToCart = (product: Product, variant: ProductVariant, quantity: number) => {
    // Implement your analytics tracking here
    const event = {
      event: "add_to_cart",
      ecommerce: {
        currency: "USD",
        value: variant.price * quantity,
        items: [{
          item_id: variant.id,
          item_name: product.title,
          item_category: product.productType,
          item_variant: variant.title,
          price: variant.price,
          quantity,
        }],
      },
    };
    
    // Example: window.gtag?.('event', 'add_to_cart', event);
    console.log('Analytics Event:', event);
  };

  const trackRemoveFromCart = (product: Product, variant: ProductVariant, quantity: number) => {
    const event = {
      event: "remove_from_cart",
      ecommerce: {
        currency: "USD",
        value: variant.price * quantity,
        items: [{
          item_id: variant.id,
          item_name: product.title,
          item_category: product.productType,
          item_variant: variant.title,
          price: variant.price,
          quantity,
        }],
      },
    };
    
    console.log('Analytics Event:', event);
  };

  const trackViewCart = () => {
    const event = {
      event: "view_cart",
      ecommerce: {
        currency: "USD",
        value: totalAmount,
        items: items.map(item => ({
          item_id: item.variant.id,
          item_name: item.product.title,
          item_category: item.product.productType,
          item_variant: item.variant.title,
          price: item.variant.price,
          quantity: item.quantity,
        })),
      },
    };
    
    console.log('Analytics Event:', event);
  };

  return {
    trackAddToCart,
    trackRemoveFromCart,
    trackViewCart,
  };
}