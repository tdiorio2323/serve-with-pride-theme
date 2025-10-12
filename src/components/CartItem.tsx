import React from 'react';
import {
  Plus, Minus, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeItem, updateQuantity }) => {
  return (
    <div key={`${item.id}-${item.variant?.size}-${item.variant?.color}`} className="flex items-center space-x-4 bg-muted/50 p-4 rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        decoding="async"
        width={64}
        height={64}
        className="h-16 w-16 rounded-md object-cover"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{item.name}</h4>
        <p className="text-sm text-muted-foreground">
          Size: {item.variant?.size} • Color: {item.variant?.color}
        </p>
        <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.id, item.qty - 1)}
          disabled={item.qty <= 1}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">
          {item.qty}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.id, item.qty + 1)}
          disabled={item.qty >= 10}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
