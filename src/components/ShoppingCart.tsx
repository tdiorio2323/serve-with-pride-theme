import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart as ShoppingCartIcon } from "lucide-react";
import CartItem from "./CartItem";
import { formatPrice } from "@/lib/utils";

export const ShoppingCartTrigger = () => {
  const { itemCount, toggleCart } = useCart();

  return (
    <Button
      variant="outline"
      size="sm"
      className="relative"
      onClick={toggleCart}
    >
      <ShoppingCartIcon className="h-4 w-4 text-red-600" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};

export const ShoppingCart = () => {
  const navigate = useNavigate();
  const { state, removeItem, updateQty, clearCart, closeCart, subtotal, donationAmount } = useCart();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCartIcon className="h-5 w-5" />
            Shopping Cart ({state.items.length})
          </SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCartIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground">Start shopping to add items to your cart</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.variant?.size}-${item.variant?.color}`}
                  item={item}
                  removeItem={removeItem}
                  updateQuantity={updateQty}
                />
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-primary">
                  <span>Donation (${donationAmount} to veterans)</span>
                  <span>{formatPrice(donationAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + donationAmount)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};