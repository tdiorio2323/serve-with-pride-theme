import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { HelmetProvider } from "react-helmet-async";

// Eager load: critical pages (Index, NotFound)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load: all other pages for code splitting
const About = lazy(() => import("./pages/About"));
const Causes = lazy(() => import("./pages/Causes"));
const Contact = lazy(() => import("./pages/Contact"));
const SizeGuide = lazy(() => import("./pages/SizeGuide"));
const ShippingInfo = lazy(() => import("./pages/ShippingInfo"));
const Returns = lazy(() => import("./pages/Returns"));
const FAQ = lazy(() => import("./pages/FAQ"));
const OurMission = lazy(() => import("./pages/OurMission"));
const Careers = lazy(() => import("./pages/Careers"));
const Press = lazy(() => import("./pages/Press"));
const Blog = lazy(() => import("./pages/Blog"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const Tshirts = lazy(() => import("./pages/Tshirts"));
const Hoodies = lazy(() => import("./pages/Hoodies"));
const Hats = lazy(() => import("./pages/Hats"));
const Patches = lazy(() => import("./pages/Patches"));
const Accessories = lazy(() => import("./pages/Accessories"));
const Mens = lazy(() => import("./pages/Mens"));
const Womens = lazy(() => import("./pages/Womens"));
const NewPage = lazy(() => import("./pages/NewPage"));
const TestPage = lazy(() => import("./pages/TestPage"));
const Mockups = lazy(() => import("./pages/Mockups"));

const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const ProductPage = lazy(() => import("./pages/ProductPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-brand-red">Loading...</div>
        </div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/causes" element={<Causes />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/shipping-info" element={<ShippingInfo />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/our-mission" element={<OurMission />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/t-shirts" element={<Tshirts />} />
            <Route path="/hoodies" element={<Hoodies />} />
            <Route path="/hats" element={<Hats />} />
            <Route path="/patches" element={<Patches />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/mens" element={<Mens />} />
            <Route path="/womens" element={<Womens />} />
            <Route path="/new-page" element={<NewPage />} />
            <Route path="/test-page" element={<TestPage />} />
            <Route path="/mockups" element={<Mockups />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/success" element={<OrderSuccess />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
