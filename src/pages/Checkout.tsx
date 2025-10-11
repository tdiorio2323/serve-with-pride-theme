import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { createCheckoutSessionMock } from "../lib/checkoutMock";

export default function Checkout() {
  const { state, subtotal, itemCount } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", state: "", zip: "" });
  const [loading, setLoading] = useState(false);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate("/cart")}>Back to Cart</Button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createCheckoutSessionMock(state.items, form);
    setLoading(false);
    navigate(res.url);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input name="name" id="name" required className="w-full border rounded px-2 py-1" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input name="email" id="email" type="email" required className="w-full border rounded px-2 py-1" value={form.email} onChange={handleChange} />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="block mb-1">Address</label>
            <input name="address" id="address" required className="w-full border rounded px-2 py-1" value={form.address} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="city" className="block mb-1">City</label>
            <input name="city" id="city" required className="w-full border rounded px-2 py-1" value={form.city} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="state" className="block mb-1">State</label>
            <input name="state" id="state" required className="w-full border rounded px-2 py-1" value={form.state} onChange={handleChange} />
          </div>
          <div className="col-span-2">
            <label htmlFor="zip" className="block mb-1">Zip</label>
            <input name="zip" id="zip" required className="w-full border rounded px-2 py-1" value={form.zip} onChange={handleChange} />
          </div>
        </div>
        <div className="border rounded p-4 bg-muted">
          <h2 className="font-bold mb-2">Order Summary</h2>
          <ul className="mb-2">
            {state.items.map(item => (
              <li key={item.id + (item.variant?.size || "") + (item.variant?.color || "") }>
                {item.name} x {item.qty} — ${(item.price * item.qty).toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="font-bold">Subtotal: ${subtotal.toFixed(2)}</div>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-bold mb-2">Payment</h2>
          <div className="text-muted-foreground">Payment will be collected on the next page (mock).</div>
        </div>
        <Button type="submit" size="lg" disabled={loading || state.items.length === 0}>
          {loading ? "Processing..." : "Submit Order"}
        </Button>
      </form>
    </div>
  );
}
