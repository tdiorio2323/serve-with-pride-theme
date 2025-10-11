import React, { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function OrderSuccess() {
  const query = useQuery();
  const sessionId = query.get("session_id");
  const { state, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) clearCart();
  }, [sessionId, clearCart]);

  if (!sessionId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">No order found</h2>
        <Button onClick={() => navigate("/cart")}>Back to Cart</Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Order Received</h1>
      <div className="mb-4">Thank you for your purchase! (mock)</div>
      <div className="border rounded p-4 mb-4">
        <h2 className="font-bold mb-2">Order Summary</h2>
        <ul className="mb-2">
          {state.items.map(item => (
            <li key={item.id + (item.variant?.size || "") + (item.variant?.color || "") }>
              {item.name} x {item.qty} — ${(item.price * item.qty).toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="font-bold">Subtotal: ${subtotal.toFixed(2)}</div>
        <div className="mt-2 text-green-600">Status: Paid (mock)</div>
      </div>
      <Button onClick={() => navigate("/all-products")}>Continue Shopping</Button>
    </div>
  );
}
