import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { BestSellers } from "@/components/BestSellers";
import MissionMerchSection from "@/components/MissionMerchSection";
import CollectionsSection from "@/components/CollectionsSection";
import SocialProofSection from "@/components/SocialProofSection";
import DonationTracker from "@/components/DonationTracker";
import ServiceDiscount from "@/components/ServiceDiscount";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <BestSellers />
        <DonationTracker />
        {/* <ProductGrid /> */}
        <ServiceDiscount />
        <MissionMerchSection />
        <CollectionsSection />
        <SocialProofSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;