import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { BestSellers } from "@/components/BestSellers";
import MissionMerchSection from "@/components/MissionMerchSection";
import CollectionsSection from "@/components/CollectionsSection";
import SocialProofSection from "@/components/SocialProofSection";
import DonationTracker from "@/components/DonationTracker";
import ServiceDiscount from "@/components/ServiceDiscount";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/use-canonical";

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://truthmatters.com';

const Index = () => {
  useCanonical();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Truth Matters - Patriotic Apparel & Gear for Those Who Serve</title>
        <meta name="description" content="Premium patriotic apparel and gear for veterans, first responders, and patriots. Every purchase supports veteran causes. Shop t-shirts, hoodies, hats, and more." />
        <meta property="og:title" content="Truth Matters - Patriotic Apparel & Gear" />
        <meta property="og:description" content="Premium patriotic apparel and gear for veterans, first responders, and patriots. Every purchase supports veteran causes." />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
      </Helmet>
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
