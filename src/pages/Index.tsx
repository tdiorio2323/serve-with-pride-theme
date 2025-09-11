import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DonationTracker from "@/components/DonationTracker";
import ProductGrid from "@/components/ProductGrid";
import ServiceDiscount from "@/components/ServiceDiscount";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <Hero />
        <DonationTracker />
        <ProductGrid />
        <ServiceDiscount />
      </main>
      <Footer />
    </div>
  );
};

export default Index;