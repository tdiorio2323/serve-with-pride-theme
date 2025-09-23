"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { X, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PromoMessage {
  id: string;
  message: string;
  urgent?: boolean;
  link?: string;
  cta?: string;
}

const patrioticMessages: PromoMessage[] = [
  {
    id: "free-shipping",
    message: "🇺🇸 FREE SHIPPING ON ORDERS OVER $75 | GEAR UP FOR FREEDOM",
    urgent: false,
  },
  {
    id: "flash-sale",
    message: "⚡ FLASH SALE: 24 HOURS ONLY - 25% OFF PATRIOT COLLECTION",
    urgent: true,
    link: "/collections/patriot",
    cta: "SHOP NOW",
  },
  {
    id: "veterans-discount",
    message: "🪖 VETERANS & FIRST RESPONDERS: 15% OFF WITH ID VERIFICATION",
    urgent: false,
    link: "/veterans-discount",
    cta: "VERIFY NOW",
  },
  {
    id: "new-arrivals",
    message: "🔥 NEW ARRIVALS: TACTICAL GEAR THAT SCREAMS AMERICA FIRST",
    urgent: false,
    link: "/collections/new-arrivals",
    cta: "EXPLORE",
  },
  {
    id: "made-in-usa",
    message: "🏭 PROUDLY MADE IN USA | SUPPORTING AMERICAN WORKERS SINCE DAY ONE",
    urgent: false,
  },
  {
    id: "limited-edition",
    message: "⏰ LIMITED EDITION: FOUNDING FATHERS COLLECTION - ONLY 1776 PIECES",
    urgent: true,
    link: "/collections/founding-fathers",
    cta: "GET YOURS",
  },
  {
    id: "constitution-day",
    message: "📜 CONSTITUTION DAY SPECIAL: DEFEND FREEDOM WITH 17% OFF",
    urgent: false,
    link: "/collections/constitution",
    cta: "DEFEND NOW",
  },
  {
    id: "back-the-blue",
    message: "🔵 BACK THE BLUE: 10% OF POLICE GEAR SALES DONATED TO FALLEN OFFICERS FUND",
    urgent: false,
    link: "/collections/police",
  },
];

interface PromoBarProps {
  messages?: PromoMessage[];
  interval?: number;
  className?: string;
  dismissible?: boolean;
}

export function PromoBar({ 
  messages = patrioticMessages, 
  interval = 5000,
  className,
  dismissible = true,
}: PromoBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const currentMessage = messages[currentIndex];

  // Rotate messages
  useEffect(() => {
    if (!isPaused && messages.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isPaused, messages.length, interval]);

  if (!isVisible || !currentMessage) return null;

  return (
    <div 
      className={cn(
        "promo-bar relative overflow-hidden",
        currentMessage.urgent && "animate-pulse-patriot",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-center relative">
        {/* Megaphone icon for urgent messages */}
        {currentMessage.urgent && (
          <Megaphone className="h-4 w-4 text-white mr-2 animate-bounce" />
        )}
        
        {/* Message content */}
        <div className="flex items-center gap-4 text-center">
          <span className="text-sm font-tactical font-bold uppercase tracking-wider">
            {currentMessage.message}
          </span>
          
          {/* CTA Button */}
          {currentMessage.link && currentMessage.cta && (
            <a
              href={currentMessage.link}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-xs font-tactical font-bold uppercase tracking-wide transition-colors border border-white/30"
            >
              {currentMessage.cta}
            </a>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 h-6 w-6 text-white hover:text-white/80 hover:bg-white/10"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss promotion"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Progress indicators */}
      {messages.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1 pb-1">
          {messages.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-0.5 w-6 bg-white/30 transition-all duration-300",
                index === currentIndex && "bg-white"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Specialized promo bars for different contexts
export function UrgencyPromoBar() {
  const urgentMessages: PromoMessage[] = [
    {
      id: "flash-24h",
      message: "⚡ 24-HOUR FLASH SALE: 30% OFF EVERYTHING | ENDS MIDNIGHT EST",
      urgent: true,
      link: "/collections/sale",
      cta: "SHOP NOW",
    },
    {
      id: "limited-stock",
      message: "🔥 LIMITED STOCK ALERT: BESTSELLERS SELLING FAST",
      urgent: true,
      link: "/collections/best-sellers",
      cta: "SECURE YOURS",
    },
  ];

  return (
    <PromoBar 
      messages={urgentMessages}
      interval={3000}
      className="bg-gradient-to-r from-responder-fire via-red-600 to-responder-fire animate-pulse-patriot"
      dismissible={false}
    />
  );
}

export function HolidayPromoBar() {
  // This would be dynamically populated based on current holidays
  const holidayMessages: PromoMessage[] = [
    {
      id: "veterans-day",
      message: "🇺🇸 VETERANS DAY: HONORING THOSE WHO SERVED WITH 25% OFF MILITARY COLLECTION",
      urgent: false,
      link: "/collections/military",
      cta: "HONOR HEROES",
    },
    {
      id: "memorial-day",
      message: "🎖️ MEMORIAL DAY: REMEMBERING THE FALLEN WITH FREE SHIPPING ON ALL ORDERS",
      urgent: false,
    },
    {
      id: "independence-day",
      message: "🎆 INDEPENDENCE DAY: CELEBRATE FREEDOM WITH 1776 SPECIAL PRICING",
      urgent: true,
      link: "/collections/independence",
      cta: "CELEBRATE",
    },
  ];

  return (
    <PromoBar 
      messages={holidayMessages}
      interval={6000}
      className="bg-gradient-to-r from-patriot-blue via-brand-white to-patriot-red text-patriot-blue"
    />
  );
}

export function FirstResponderPromoBar() {
  const responderMessages: PromoMessage[] = [
    {
      id: "police-appreciation",
      message: "👮 POLICE APPRECIATION: BACK THE BLUE WITH 15% OFF + FREE SHIPPING",
      urgent: false,
      link: "/collections/police",
      cta: "SUPPORT",
    },
    {
      id: "firefighter-hero",
      message: "🚒 FIREFIGHTER HEROES: COURAGE UNDER FIRE DESERVES 20% OFF",
      urgent: false,
      link: "/collections/firefighter",
      cta: "HONOR",
    },
    {
      id: "ems-lifesavers",
      message: "🚑 EMS LIFESAVERS: FIRST ON SCENE, FIRST IN OUR HEARTS - 15% OFF",
      urgent: false,
      link: "/collections/ems",
      cta: "THANK",
    },
  ];

  return (
    <PromoBar 
      messages={responderMessages}
      interval={7000}
      className="bg-gradient-to-r from-responder-police via-responder-fire to-responder-ems"
    />
  );
}

// Countdown promo bar for time-sensitive offers
export function CountdownPromoBar({ endDate }: { endDate: Date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const end = endDate.getTime();
      const difference = end - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeLeft("EXPIRED");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const countdownMessage: PromoMessage = {
    id: "countdown",
    message: `⏰ FLASH SALE ENDS IN: ${timeLeft} | DON'T MISS OUT ON 30% OFF`,
    urgent: true,
    link: "/collections/sale",
    cta: "SHOP NOW",
  };

  if (timeLeft === "EXPIRED") return null;

  return (
    <PromoBar 
      messages={[countdownMessage]}
      className="bg-gradient-to-r from-patriot-red to-responder-fire animate-pulse-patriot"
      dismissible={false}
    />
  );
}

// Inventory alert promo bar
export function InventoryAlertBar({ productName, remaining }: { productName: string; remaining: number }) {
  if (remaining <= 0) return null;

  const alertMessage: PromoMessage = {
    id: "inventory-alert",
    message: `🔥 ONLY ${remaining} ${productName.toUpperCase()} LEFT IN STOCK | SECURE YOURS NOW`,
    urgent: true,
    cta: "ADD TO CART",
  };

  return (
    <PromoBar 
      messages={[alertMessage]}
      className="bg-gradient-to-r from-yellow-600 to-responder-fire animate-pulse"
      dismissible={false}
    />
  );
}