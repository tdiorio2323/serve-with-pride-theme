"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Send, Mail, Phone, MapPin, Shield } from "lucide-react";
import { cn, isValidEmail } from "@/lib/utils";
import { Button, NewsletterButton } from "@/components/ui/button";
import { Badge, TrustBadge, MadeInUSABadge, VeteranOwnedBadge } from "@/components/ui/badge";
import { showNewsletterToast } from "@/components/ui/toaster";
import navigation from "@/data/navigation.json";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const footerNav = navigation.footer.items;
  const socialNav = navigation.social.items;

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      showNewsletterToast(false);
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Simulate API call - replace with actual newsletter signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showNewsletterToast(true, email);
      setEmail("");
    } catch (error) {
      showNewsletterToast(false);
    } finally {
      setIsSubscribing(false);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <Send className="h-5 w-5" />;
    }
  };

  return (
    <footer className={cn("bg-brand-primary text-brand-white", className)}>
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-patriot-red via-brand-accent to-patriot-red py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-military font-black mb-4 text-shadow-tactical">
              JOIN THE FIGHT FOR TRUTH
            </h2>
            <p className="text-lg font-tactical mb-6 opacity-90">
              Get exclusive access to patriotic gear, first responder discounts, and breaking news that matters. No propaganda, just truth.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email, patriot..."
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/70 font-tactical backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  required
                  disabled={isSubscribing}
                />
              </div>
              <NewsletterButton 
                type="submit" 
                disabled={isSubscribing}
                className="px-8"
              >
                {isSubscribing ? "ENLISTING..." : "JOIN NOW"}
              </NewsletterButton>
            </form>
            
            <p className="text-xs text-white/70 mt-4 font-tactical">
              By subscribing, you're joining 50,000+ patriots who refuse to stay silent.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 bg-texture-concrete">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-military font-black text-brand-white text-shadow-tactical">
                  TRUTH
                </span>
                <span className="text-2xl font-military font-black text-brand-accent text-shadow-tactical ml-1">
                  MATTERS
                </span>
              </div>
              
              <p className="text-brand-white/80 font-tactical mb-6 max-w-md">
                Proudly American. Unapologetically patriotic. Supporting those who serve and defend our great nation with quality gear and unwavering values.
              </p>

              {/* Trust Badges */}
              <div className="space-y-3 mb-6">
                <div className="flex flex-wrap gap-2">
                  <MadeInUSABadge />
                  <VeteranOwnedBadge />
                </div>
                <TrustBadge 
                  icon={<Shield className="h-4 w-4" />}
                  text="100% Satisfaction Guarantee"
                  className="text-brand-white/80"
                />
                <TrustBadge 
                  icon={<Mail className="h-4 w-4" />}
                  text="support@truthmatters.store"
                  className="text-brand-white/80"
                />
                <TrustBadge 
                  icon={<Phone className="h-4 w-4" />}
                  text="1-800-TRUTH-01 (1-800-878-8401)"
                  className="text-brand-white/80"
                />
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                {socialNav.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target={social.target || "_blank"}
                    rel="noopener noreferrer"
                    className="bg-brand-white/10 hover:bg-brand-accent/20 p-2 rounded-md transition-colors"
                    aria-label={`Follow us on ${social.title}`}
                  >
                    {getSocialIcon(social.title)}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Navigation */}
            {footerNav.map((section) => (
              <div key={section.id}>
                <h3 className="text-lg font-tactical font-bold text-brand-accent mb-4 uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items?.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.url}
                        className="text-brand-white/80 hover:text-brand-accent font-tactical transition-colors text-sm"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-white/20 py-6 bg-brand-black/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-brand-white/70 font-tactical">
                © 2024 Truth Matters. All rights reserved. Made with 🇺🇸 in the USA.
              </p>
              <p className="text-xs text-brand-white/60 font-tactical mt-1">
                Defending American values since day one.
              </p>
            </div>

            {/* Payment & Security */}
            <div className="flex items-center space-x-4 text-xs text-brand-white/70 font-tactical">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                256-BIT SSL
              </span>
              <span>SECURE PAYMENTS</span>
              <span>🇺🇸 USA SUPPORT</span>
            </div>
          </div>

          {/* Patriotic Quote */}
          <div className="text-center mt-4 pt-4 border-t border-brand-white/10">
            <p className="text-sm font-military font-bold text-brand-gold text-shadow-tactical italic">
              "The tree of liberty must be refreshed from time to time with the blood of patriots."
            </p>
            <p className="text-xs text-brand-white/60 font-tactical mt-1">
              - Thomas Jefferson
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Simplified footer for minimal pages
export function MinimalFooter({ className }: FooterProps) {
  return (
    <footer className={cn("bg-brand-primary text-brand-white py-8", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="text-lg font-military font-black text-brand-white">
              TRUTH
            </span>
            <span className="text-lg font-military font-black text-brand-accent ml-1">
              MATTERS
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-tactical">
            <Link href="/privacy-policy" className="hover:text-brand-accent transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-brand-accent transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-brand-accent transition-colors">
              Contact
            </Link>
          </div>
          
          <p className="text-xs text-brand-white/70 font-tactical">
            © 2024 Truth Matters. Made in 🇺🇸
          </p>
        </div>
      </div>
    </footer>
  );
}

// Special footer for checkout/cart pages
export function CheckoutFooter({ className }: FooterProps) {
  return (
    <footer className={cn("bg-card border-t py-6", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-tactical">
            <TrustBadge 
              icon={<Shield className="h-4 w-4" />}
              text="Secure Checkout"
            />
            <TrustBadge 
              icon={<Mail className="h-4 w-4" />}
              text="support@truthmatters.store"
            />
          </div>
          
          <div className="flex items-center">
            <span className="text-sm font-military font-bold text-foreground">
              TRUTH
            </span>
            <span className="text-sm font-military font-bold text-brand-accent ml-1">
              MATTERS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}