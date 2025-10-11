import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@/components/ShoppingCart";
import { Img } from "@/components/Img";
import PromoBanner from "./PromoBanner";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-black">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-center h-32">
            <DesktopNav />

            <MobileNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>
      </header>
      <ShoppingCart />
      <PromoBanner />
    </>
  );
};

export default Header;