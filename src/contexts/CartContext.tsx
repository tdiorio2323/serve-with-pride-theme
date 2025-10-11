import React, { createContext, useContext, useReducer, useEffect } from 'react';


export interface CartItem {
  id: string;
  slug?: string;
  name: string;
  price: number;
  image: string;
  variant?: {
    size?: string;
    color?: string;
  };
  qty: number;
  inStock?: boolean;
}


interface CartState {
  items: CartItem[];
  isOpen: boolean;
}


type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QTY'; payload: { id: string; qty: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };


const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Only allow qty 1-10, check stock
      const item = action.payload;
      if (item.inStock === false) return state;
      if (item.qty < 1 || item.qty > 10) return state;
      const existing = state.items.find(
        i => i.id === item.id && i.variant?.size === item.variant?.size && i.variant?.color === item.variant?.color
      );
      if (existing) {
        const updated = state.items.map(i =>
          i.id === item.id && i.variant?.size === item.variant?.size && i.variant?.color === item.variant?.color
            ? { ...i, qty: Math.min(i.qty + item.qty, 10) }
            : i
        );
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, item] };
    }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      if (qty < 1 || qty > 10) return state;
      const updated = state.items.map(i =>
        i.id === id ? { ...i, qty } : i
      );
      return { ...state, items: updated };
    }
    case 'REMOVE_ITEM': {
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};


export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
};

export const calculateDonationAmount = (itemCount: number): number => {
  return itemCount * 1; // $1 per item
};

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
  subtotal: number;
  donationAmount: number;
}


const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  // Hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('truthmatters-cart');
    if (saved) {
      try {
        const { items } = JSON.parse(saved);
        if (Array.isArray(items)) {
          items.forEach((item: CartItem) => {
            dispatch({ type: 'ADD_ITEM', payload: item });
          });
        }
      } catch {}
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('truthmatters-cart', JSON.stringify({ items: state.items }));
  }, [state.items]);

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const updateQty = (id: string, qty: number) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  const itemCount = state.items.reduce((total, item) => total + item.qty, 0);
  const subtotal = calculateSubtotal(state.items);
  const donationAmount = calculateDonationAmount(itemCount);

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      toggleCart,
      openCart,
      closeCart,
      itemCount,
      subtotal,
      donationAmount
    }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};