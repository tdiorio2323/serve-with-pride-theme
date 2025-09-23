"use client";

import { createContext, useContext, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductVariant, CartLine } from "../types";

interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartState {
  // State
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  
  // Computed values
  totalItems: number;
  totalAmount: number;
  
  // Actions
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Private methods
  _generateItemId: (productId: string, variantId: string) => string;
  _calculateTotals: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,
      isLoading: false,
      totalItems: 0,
      totalAmount: 0,

      // Generate unique item ID
      _generateItemId: (productId: string, variantId: string) => `${productId}-${variantId}`,

      // Calculate totals
      _calculateTotals: () => {
        const { items } = get();
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
        
        set({ totalItems, totalAmount });
      },

      // Add item to cart
      addItem: (product: Product, variant: ProductVariant, quantity = 1) => {
        const { items, _generateItemId, _calculateTotals } = get();
        const itemId = _generateItemId(product.id, variant.id);
        
        // Check if item already exists
        const existingItemIndex = items.findIndex(item => item.id === itemId);
        
        if (existingItemIndex !== -1) {
          // Update quantity of existing item
          const updatedItems = items.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: itemId,
            product,
            variant,
            quantity,
          };
          
          set({ items: [...items, newItem] });
        }
        
        // Recalculate totals and open cart for feedback
        _calculateTotals();
        set({ isOpen: true });
        
        // Auto-close cart after 3 seconds for better UX
        setTimeout(() => {
          set({ isOpen: false });
        }, 3000);
      },

      // Remove item from cart
      removeItem: (itemId: string) => {
        const { items, _calculateTotals } = get();
        const updatedItems = items.filter(item => item.id !== itemId);
        
        set({ items: updatedItems });
        _calculateTotals();
      },

      // Update item quantity
      updateQuantity: (itemId: string, quantity: number) => {
        const { items, _calculateTotals } = get();
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          const updatedItems = items.filter(item => item.id !== itemId);
          set({ items: updatedItems });
        } else {
          // Update quantity
          const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          );
          set({ items: updatedItems });
        }
        
        _calculateTotals();
      },

      // Clear entire cart
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalAmount: 0,
          isOpen: false,
        });
      },

      // Toggle cart visibility
      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      // Open cart
      openCart: () => {
        set({ isOpen: true });
      },

      // Close cart
      closeCart: () => {
        set({ isOpen: false });
      },
    }),
    {
      name: "truth-matters-cart",
      storage: createJSONStorage(() => localStorage),
      
      // Only persist items, recalculate totals on hydration
      partialize: (state) => ({ 
        items: state.items 
      }),
      
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._calculateTotals();
        }
      },
    }
  )
);

// Context for providing cart state
const CartContext = createContext<CartState | null>(null);

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const store = useCartStore();

  // Ensure totals are calculated on mount (after hydration)
  useEffect(() => {
    store._calculateTotals();
  }, []);

  return (
    <CartContext.Provider value={store}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  
  if (!context) {
    // Fallback to store hook if context is not available
    return useCartStore();
  }
  
  return context;
}

// Selector hooks for performance optimization
export const useCartItems = () => useCartStore(state => state.items);
export const useCartTotal = () => useCartStore(state => ({
  totalItems: state.totalItems,
  totalAmount: state.totalAmount,
}));
export const useCartOpen = () => useCartStore(state => state.isOpen);

// Action hooks
export const useCartActions = () => useCartStore(state => ({
  addItem: state.addItem,
  removeItem: state.removeItem,
  updateQuantity: state.updateQuantity,
  clearCart: state.clearCart,
  toggleCart: state.toggleCart,
  openCart: state.openCart,
  closeCart: state.closeCart,
}));

// Helper function to get cart line items in Shopify format
export function getCartLines(): CartLine[] {
  const items = useCartStore.getState().items;
  
  return items.map(item => ({
    id: item.id,
    quantity: item.quantity,
    merchandise: {
      id: item.variant.id,
      title: item.variant.title,
      selectedOptions: item.variant.selectedOptions,
      product: item.product,
      image: item.variant.image || item.product.images[0],
      price: item.variant.price,
    },
    estimatedCost: {
      totalAmount: item.variant.price * item.quantity,
    },
  }));
}

// Helper to check if product variant is in cart
export function useIsInCart(productId: string, variantId: string): boolean {
  return useCartStore(state => {
    const itemId = state._generateItemId(productId, variantId);
    return state.items.some(item => item.id === itemId);
  });
}

// Helper to get quantity of specific variant in cart
export function useCartItemQuantity(productId: string, variantId: string): number {
  return useCartStore(state => {
    const itemId = state._generateItemId(productId, variantId);
    const item = state.items.find(item => item.id === itemId);
    return item?.quantity || 0;
  });
}