import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCartTrigger } from "@/components/ShoppingCart";
import { leftNavItems, rightNavItems } from "@/data/navigation";

const DesktopNav: React.FC = () => {
  return (
    <>
      {/* Left Desktop Navigation */}
      <nav className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 items-center space-x-8">
        {leftNavItems.map((item) => {
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

      {/* Right Desktop Navigation */}
      <nav className="hidden md:flex absolute right-40 top-1/2 -translate-y-1/2 items-center space-x-8">
        {rightNavItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="font-display text-lg font-bold text-white hover:text-primary transition-colors duration-200 tracking-wide"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Icons */}
      <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center space-x-4">
          <button className="text-white hover:text-primary transition-colors" aria-label="Search">
            <Search className="w-6 h-6" />
          </button>
          <div className="text-white">
            <ShoppingCartTrigger />
          </div>
      </div>
    </>
  );
};

export default DesktopNav;
