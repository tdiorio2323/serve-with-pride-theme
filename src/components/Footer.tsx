import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const footerLinks = {
    "SHOP": [
      { name: "All Products", path: "/all-products" },
      { name: "T-Shirts", path: "/t-shirts" },
      { name: "Hoodies", path: "/hoodies" },
      { name: "Hats", path: "/hats" },
      { name: "Patches", path: "/patches" },
      { name: "Accessories", path: "/accessories" }
    ],
    "SUPPORT": [
      { name: "Contact Us", path: "/contact" },
      { name: "Size Guide", path: "/size-guide" },
      { name: "Shipping Info", path: "/shipping-info" },
      { name: "Returns", path: "/returns" },
      { name: "FAQ", path: "/faq" }
    ],
    "COMPANY": [
      { name: "About Us", path: "/about" },
      { name: "Our Mission", path: "/our-mission" },
      { name: "Careers", path: "/careers" },
      { name: "Press", path: "/press" },
      { name: "Blog", path: "/blog" }
    ]
  };

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logo} 
                alt="Truth Matters Logo" 
                className="h-12 w-12 object-contain"
              />
              <div className="font-display text-2xl font-bold tracking-wide">
                TRUTH MATTERS
              </div>
            </div>
            
            <div className="mb-6">
              <div className="font-display text-lg font-bold mb-2 tracking-wide text-primary">
                VETERAN & FIRST RESPONDER OWNED
              </div>
              <div className="font-display text-lg font-bold tracking-wide text-primary">
                BUILT IN THE USA
              </div>
            </div>
            
            <p className="font-body text-white/80 leading-relaxed mb-6">
              Proudly serving those who serve. Every purchase supports our mission 
              to give back to the veteran and first responder communities.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display text-lg font-bold mb-4 tracking-wide">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="font-body text-white/80 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/20 pt-8 mt-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold mb-4 tracking-wide">
              STAY CONNECTED
            </h3>
            <p className="font-body text-white/80 mb-6">
              Get updates on new products, exclusive discounts, and community initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button 
                variant="hero"
                className="font-display font-bold tracking-wide"
              >
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <div className="font-body mb-4 md:mb-0">
              © 2024 Truth Matters. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export default Footer;