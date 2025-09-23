import React from 'react';
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TShirtMockup from "@/components/TShirtMockup";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Palette, Download, Eye, Shirt } from "lucide-react";

const logos = [
  {
    file: "/truth-logo-1.png",
    name: "Truth Matters Original",
    description: "The classic Truth Matters design - bold and unmistakable"
  },
  {
    file: "/truth-logo-2.png",
    name: "Patriot Shield",
    description: "Defending freedom with honor and courage"
  },
  {
    file: "/truth-logo-3.png",
    name: "Liberty Guard",
    description: "Standing watch over our constitutional rights"
  },
  {
    file: "/truth-logo-4.png",
    name: "Honor Badge",
    description: "Representing duty, honor, and service to country"
  },
  {
    file: "/truth-logo-5.png",
    name: "Freedom Eagle",
    description: "Soaring high with American pride and values"
  },
  {
    file: "/truth-logo-6.png",
    name: "Justice Seal",
    description: "Upholding justice and truth in all we do"
  },
  {
    file: "/truth-logo-7.png",
    name: "Warrior Crest",
    description: "For those who fight for what's right"
  },
  {
    file: "/truth-logo-8.png",
    name: "Victory Banner",
    description: "Celebrating the triumph of truth over deception"
  },
  {
    file: "/truth-logo-9.png",
    name: "Defender Mark",
    description: "Defending our nation and its sacred principles"
  },
  {
    file: "/truth-logo-10.png",
    name: "Unity Star",
    description: "United we stand, divided we fall"
  },
  {
    file: "/truth-logo-11.png",
    name: "Heritage Cross",
    description: "Honoring our heritage and those who served"
  }
];

const Mockups: FC = () => {
  const downloadAllMockups = () => {
    // In a real implementation, this would trigger downloads of all mockups
    alert('All mockups would be downloaded as a ZIP file');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
              <Shirt className="w-4 h-4 mr-2" />
              T-Shirt Mockups
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Truth Matters Collection
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our complete collection of Truth Matters designs on premium apparel.
            See how each logo looks on different colored tees and download high-resolution mockups.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="font-bold" onClick={downloadAllMockups}>
              <Download className="mr-2 h-5 w-5" />
              Download All Mockups
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
              <Eye className="mr-2 h-5 w-5" />
              View Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Palette className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold">5 Color Options</h3>
              <p className="text-muted-foreground">
                See your designs on Black, Navy, Charcoal, Military Olive, and White tees
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold">High-Res Downloads</h3>
              <p className="text-muted-foreground">
                Download print-ready SVG mockups for marketing and production
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold">Interactive Preview</h3>
              <p className="text-muted-foreground">
                Preview each design in full detail before downloading
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mockups Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Complete Design Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {logos.length} unique Truth Matters designs, each carefully crafted to represent
              the values and pride of those who serve our nation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {logos.map((logo, index) => (
              <TShirtMockup
                key={index}
                logo={logo.file}
                logoName={logo.name}
                className="h-full"
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-card border rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="font-display text-2xl font-bold mb-4">
                Need Custom Mockups?
              </h3>
              <p className="text-muted-foreground mb-6">
                Looking for specific colors, styles, or additional product mockups?
                Contact our design team for custom mockup services.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button>
                  Request Custom Mockups
                </Button>
                <Button variant="outline">
                  View More Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Mockup Specifications</h2>
            <p className="text-muted-foreground">Professional-grade mockups for all your marketing needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary mb-2">SVG Format</div>
              <div className="text-sm text-muted-foreground">Scalable vector graphics for any size</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary mb-2">800×600px</div>
              <div className="text-sm text-muted-foreground">High resolution for print and web</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary mb-2">5 Colors</div>
              <div className="text-sm text-muted-foreground">Black, Navy, Charcoal, Olive, White</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary mb-2">11 Designs</div>
              <div className="text-sm text-muted-foreground">Complete Truth Matters collection</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mockups;