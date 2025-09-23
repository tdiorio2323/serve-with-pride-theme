"use client";

import * as React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Search, ShoppingCart, User, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart, useCartModal } from "@/lib/hooks/useCart";
import { useTheme } from "@/lib/providers/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import navigation from "@/data/navigation.json";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { totalItems } = useCart();
  const { openCart } = useCartModal();
  const { actualTheme } = useTheme();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const mainNav = navigation.main.items;
  const mobileNav = navigation.mobile.items;

  return (
    <>
      {/* Main Header */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled 
            ? "nav-grunge shadow-tactical backdrop-blur-md" 
            : "bg-brand-primary/90 backdrop-blur-sm",
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-brand-white hover:text-brand-accent"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center">
                <span className="text-2xl font-military font-black text-brand-white text-shadow-tactical">
                  TRUTH
                </span>
                <span className="text-2xl font-military font-black text-brand-accent text-shadow-tactical ml-1">
                  MATTERS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {mainNav.map((item) => (
                <div key={item.id} className="relative">
                  {item.items ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.id)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button className="nav-link flex items-center gap-1">
                        {item.title}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {openDropdown === item.id && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border shadow-tactical rounded-md overflow-hidden z-50">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.url}
                              className="block px-4 py-3 text-sm font-tactical font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.url} className="nav-link">
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="text-brand-white hover:text-brand-accent"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Account */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-brand-white hover:text-brand-accent"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-brand-white hover:text-brand-accent"
                onClick={openCart}
                aria-label={`Cart with ${totalItems} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="patriotRed" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-card border-r border-border shadow-tactical lg:hidden">
            <div className="flex h-16 items-center justify-between px-4 border-b border-border">
              <Link 
                href="/" 
                className="flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg font-military font-black text-foreground">
                  TRUTH
                </span>
                <span className="text-lg font-military font-black text-brand-accent ml-1">
                  MATTERS
                </span>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="p-4 space-y-2">
              {mobileNav.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="block px-4 py-3 text-sm font-tactical font-semibold text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Menu Footer */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-tactical">🇺🇸 MADE IN AMERICA</span>
                <span className="font-tactical">TRUTH MATTERS</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Patriotic announcement bar that can be shown above header
export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-patriot-red via-brand-accent to-patriot-red text-white py-2 px-4 text-center relative">
      <p className="text-sm font-tactical font-bold uppercase tracking-wide">
        🇺🇸 FREE SHIPPING ON ORDERS OVER $75 | SUPPORTING OUR HEROES SINCE DAY ONE
      </p>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-white hover:text-white/80"
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Trust signals component for header
export function TrustSignals() {
  const signals = [
    { icon: "🇺🇸", text: "MADE IN USA" },
    { icon: "🚚", text: "FREE SHIPPING $75+" },
    { icon: "🔒", text: "SECURE CHECKOUT" },
    { icon: "⭐", text: "5-STAR REVIEWS" },
  ];

  return (
    <div className="bg-brand-primary/50 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 text-xs font-tactical font-semibold text-brand-white">
          {signals.map((signal, index) => (
            <div key={index} className="flex items-center gap-1">
              <span>{signal.icon}</span>
              <span className="hidden sm:inline">{signal.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}