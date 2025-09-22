import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ShoppingCartTrigger, ShoppingCart } from "@/components/ShoppingCart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  const navItems = [
    {
      label: "SHOP",
      href: "/all-products",
      submenu: [
        { label: "All Products", href: "/all-products" },
        { label: "Men's", href: "/mens" },
        { label: "Women's", href: "/womens" },
        { label: "T-Shirts", href: "/t-shirts" },
        { label: "Hoodies", href: "/hoodies" },
        { label: "Hats", href: "/hats" },
        { label: "Patches", href: "/patches" },
        { label: "Accessories", href: "/accessories" }
      ]
    },
    { label: "ABOUT", href: "/about" },
    { label: "CAUSES", href: "/causes" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <header className="bg-black">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-center h-32">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 items-center space-x-8">
              {navItems.map((item) => {
                if (item.submenu) {
                  return (
                    <DropdownMenu key={item.label}>
                      <DropdownMenuTrigger className="font-display text-lg font-bold text-white hover:text-primary transition-colors duration-200 tracking-wide flex items-center gap-1">
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-black border-gray-700">
                        {item.submenu.map((subItem) => (
                          <DropdownMenuItem key={subItem.label} asChild>
                            <Link
                              to={subItem.href}
                              className="text-white hover:text-primary hover:bg-gray-800 w-full px-4 py-2 block"
                            >
                              {subItem.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                } else {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="font-display text-lg font-bold text-white hover:text-primary transition-colors duration-200 tracking-wide"
                    >
                      {item.label}
                    </Link>
                  );
                }
              })}
            </nav>

            {/* Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/">
                <img
                  src="/lovable-uploads/90530307-3214-4d21-8704-4884a059a14b.png"
                  alt="Truth Matters Logo"
                  className="h-20 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Icons */}
            <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center space-x-4">
                <button className="text-white hover:text-primary transition-colors">
                  <Search className="w-6 h-6" />
                </button>
                <div className="text-white">
                  <ShoppingCartTrigger />
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-700 z-50">
              <nav className="flex flex-col py-4">
                {navItems.map((item) => {
                  if (item.submenu) {
                    return (
                      <div key={item.label}>
                        <button
                          className="font-display text-lg font-bold text-white hover:text-primary transition-colors duration-200 tracking-wide px-4 py-3 flex items-center justify-between w-full"
                          onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                        >
                          {item.label}
                          <ChevronDown className={`w-4 h-4 transition-transform ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isShopDropdownOpen && (
                          <div className="bg-gray-900 border-t border-gray-700">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.label}
                                to={subItem.href}
                                className="block px-8 py-2 text-gray-300 hover:text-primary hover:bg-gray-800 transition-colors"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsShopDropdownOpen(false);
                                }}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="font-display text-lg font-bold text-white hover:text-primary transition-colors duration-200 tracking-wide px-4 py-3"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  }
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
      <ShoppingCart />
      
      {/* Promotional Banner */}
      <div className="bg-primary text-white text-center py-2 px-4 font-body text-sm font-semibold tracking-wide">
        🇺🇸 FREE SHIPPING ON ORDERS $75+ | VETERAN & FIRST RESPONDER DISCOUNTS AVAILABLE
      </div>
    </>
  );
};

export default Header;