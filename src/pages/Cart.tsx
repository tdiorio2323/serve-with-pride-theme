import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Cart() {
  const { state, updateQty, removeItem, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate("/all-products")}>Shop All</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <table className="w-full mb-8 border rounded-lg">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 text-left">Product</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Total</th>
            <th className="p-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {state.items.map((item) => (
            <tr key={item.id + (item.variant?.size || "") + (item.variant?.color || "") }>
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} width={48} height={48} loading="lazy" className="rounded" />
                  <span>{item.name}</span>
                  {item.variant?.size && <span className="ml-2 text-xs">Size: {item.variant.size}</span>}
                  {item.variant?.color && <span className="ml-2 text-xs">Color: {item.variant.color}</span>}
                </div>
              </td>
              <td className="p-2">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={item.qty}
                  aria-label={`Quantity for ${item.name}`}
                  className="w-16 border rounded px-2 py-1"
                  onChange={e => updateQty(item.id, Math.max(1, Math.min(10, Number(e.target.value))))}
                />
              </td>
              <td className="p-2">${item.price.toFixed(2)}</td>
              <td className="p-2">${(item.price * item.qty).toFixed(2)}</td>
              <td className="p-2">
                <Button variant="destructive" size="sm" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sticky bottom-0 bg-background p-4 rounded shadow flex justify-between items-center">
        <div>
          <span className="font-bold">Subtotal:</span> ${subtotal.toFixed(2)}
        </div>
        <Button size="lg" onClick={() => navigate("/checkout")}>Checkout</Button>
      </div>
    </div>
  );
}
