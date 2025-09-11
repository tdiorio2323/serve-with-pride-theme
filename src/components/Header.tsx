import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/truth-matters-logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "SHOP", href: "#shop" },
    { label: "ABOUT", href: "#about" },
    { label: "CAUSES", href: "#causes" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header className="bg-transparent">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-center h-32">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors duration-200 tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="Truth Matters Logo" 
                className="h-24 w-auto object-contain"
              />
            </div>

            {/* Icons */}
            <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center space-x-4">
                <button className="text-foreground hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="text-foreground hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border">
              <nav className="flex flex-col py-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors duration-200 tracking-wide px-4 py-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Promotional Banner */}
      <div className="bg-primary text-white text-center py-2 px-4 font-body text-sm font-semibold tracking-wide">
        🇺🇸 FREE SHIPPING ON ORDERS $75+ | VETERAN & FIRST RESPONDER DISCOUNTS AVAILABLE
      </div>
    </>
  );
};

export default Header;
