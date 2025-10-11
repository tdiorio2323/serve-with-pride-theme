import React from 'react';
import {
  Plus, Minus, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    image: string;
    price: string;
    quantity: number;
    size: string;
    color: string;
  };
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeItem, updateQuantity }) => {
  return (
    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4 bg-muted/50 p-4 rounded-lg">
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
          Size: {item.size} • Color: {item.color}
        </p>
        <p className="text-sm font-semibold">{item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
