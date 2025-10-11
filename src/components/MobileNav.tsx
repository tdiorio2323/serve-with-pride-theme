import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { ShoppingCartTrigger } from "@/components/ShoppingCart";
import Logo from "./Logo";
import { leftNavItems, rightNavItems } from "@/data/navigation";

interface MobileNavProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-primary transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm z-50">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Logo className="h-12 w-auto object-contain" />
            </Link>
            <button
              className="p-2 text-white hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col py-4 flex-1 overflow-y-auto">
            {[...leftNavItems, ...rightNavItems].map((item) => {
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
            
            {/* Mobile-only actions */}
            <div className="border-t border-gray-700 mt-4 pt-4 px-4">
              <div className="flex items-center justify-between">
                <button className="text-white hover:text-primary transition-colors flex items-center gap-2" aria-label="Search">
                  <Search className="w-5 h-5" />
                  <span className="font-display font-bold">Search</span>
                </button>
                <div className="text-white">
                  <ShoppingCartTrigger />
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
