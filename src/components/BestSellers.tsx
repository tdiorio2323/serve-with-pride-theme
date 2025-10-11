import React from 'react';
import ProductCard from './ProductCard';
import { products, getFeaturedProducts } from '../data/products';

export const BestSellers: React.FC = () => {
  const bestSellers = getFeaturedProducts().slice(0, 4); // Get the first 4 featured products

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
