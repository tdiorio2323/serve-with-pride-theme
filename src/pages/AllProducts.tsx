import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AllProducts: React.FC = () => {
  return (
    <div className="hero-flag-background min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p>This is the all products page. Content to be added.</p>
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;