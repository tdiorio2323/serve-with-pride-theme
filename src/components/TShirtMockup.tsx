import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Download, Share2 } from "lucide-react";

interface TShirtMockupProps {
  logo: string;
  logoName: string;
  className?: string;
}

interface MockupVariant {
  id: string;
  name: string;
  color: string;
  textColor: string;
  bgGradient: string;
  description: string;
}

const mockupVariants: MockupVariant[] = [
  {
    id: 'black',
    name: 'Classic Black',
    color: '#000000',
    textColor: '#ffffff',
    bgGradient: 'from-gray-800 to-gray-900',
    description: 'Timeless black tee - perfect for any occasion'
  },
  {
    id: 'navy',
    name: 'Navy Blue',
    color: '#1a1a2e',
    textColor: '#ffffff',
    bgGradient: 'from-blue-900 to-blue-800',
    description: 'Professional navy - honor the service'
  },
  {
    id: 'charcoal',
    name: 'Charcoal Gray',
    color: '#36454f',
    textColor: '#ffffff',
    bgGradient: 'from-gray-700 to-gray-800',
    description: 'Sophisticated charcoal - versatile style'
  },
  {
    id: 'olive',
    name: 'Military Olive',
    color: '#4b5320',
    textColor: '#ffffff',
    bgGradient: 'from-green-800 to-green-900',
    description: 'Military inspired olive drab'
  },
  {
    id: 'white',
    name: 'Classic White',
    color: '#ffffff',
    textColor: '#000000',
    bgGradient: 'from-gray-100 to-white',
    description: 'Clean white tee - make a statement'
  }
];

export const TShirtMockup: React.FC<TShirtMockupProps> = ({ logo, logoName, className = "" }) => {
  const [selectedVariant, setSelectedVariant] = useState<MockupVariant>(mockupVariants[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateMockupSVG = (variant: MockupVariant, size: 'small' | 'large' = 'small') => {
    const width = size === 'large' ? 800 : 400;
    const height = size === 'large' ? 600 : 300;
    const logoSize = size === 'large' ? 200 : 100;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/>
          </filter>
          <pattern id="logo" x="0" y="0" width="100%" height="100%">
            <image href="${logo}" x="0" y="0" width="${logoSize}" height="${logoSize}" />
          </pattern>
        </defs>

        <!-- Background -->
        <rect width="${width}" height="${height}" fill="url(#gradient)" />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
          </linearGradient>
        </defs>

        <!-- T-shirt shape -->
        <path d="M ${width * 0.2} ${height * 0.15}
                 Q ${width * 0.25} ${height * 0.1} ${width * 0.35} ${height * 0.1}
                 L ${width * 0.65} ${height * 0.1}
                 Q ${width * 0.75} ${height * 0.1} ${width * 0.8} ${height * 0.15}
                 L ${width * 0.85} ${height * 0.25}
                 L ${width * 0.8} ${height * 0.3}
                 L ${width * 0.75} ${height * 0.35}
                 L ${width * 0.75} ${height * 0.9}
                 Q ${width * 0.75} ${height * 0.95} ${width * 0.7} ${height * 0.95}
                 L ${width * 0.3} ${height * 0.95}
                 Q ${width * 0.25} ${height * 0.95} ${width * 0.25} ${height * 0.9}
                 L ${width * 0.25} ${height * 0.35}
                 L ${width * 0.2} ${height * 0.3}
                 L ${width * 0.15} ${height * 0.25}
                 Z"
              fill="${variant.color}"
              filter="url(#shadow)"
              stroke="#000"
              stroke-width="1"
              stroke-opacity="0.1"/>

        <!-- Logo placement -->
        <image href="${logo}"
               x="${width * 0.5 - logoSize/2}"
               y="${height * 0.4}"
               width="${logoSize}"
               height="${logoSize * 0.8}"
               opacity="0.9"
               filter="url(#shadow)"/>

        <!-- Shirt details -->
        <ellipse cx="${width * 0.5}" cy="${height * 0.12}" rx="${width * 0.08}" ry="${height * 0.02}" fill="${variant.color}" opacity="0.8"/>

        <!-- Size tag -->
        <rect x="${width * 0.02}" y="${height * 0.02}" width="${width * 0.15}" height="${height * 0.08}" fill="white" opacity="0.9" rx="4"/>
        <text x="${width * 0.095}" y="${height * 0.07}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${width * 0.02}" fill="black" font-weight="bold">TRUTH</text>
      </svg>
    `;
  };

  const downloadMockup = () => {
    const svg = generateMockupSVG(selectedVariant, 'large');
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `truth-matters-${logoName}-${selectedVariant.name.toLowerCase().replace(' ', '-')}-mockup.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card className={`group hover:shadow-xl transition-all duration-300 ${className}`}>
        <CardContent className="p-6">
          <div className="relative mb-4">
            <div
              className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br shadow-lg"
              style={{ background: `linear-gradient(135deg, ${selectedVariant.color}15, ${selectedVariant.color}25)` }}
              dangerouslySetInnerHTML={{ __html: generateMockupSVG(selectedVariant) }}
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="h-8 w-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-foreground">
                {logoName} Tee
              </h3>
              <Badge variant="secondary" className="text-xs">
                Mockup
              </Badge>
            </div>

            <Select
              value={selectedVariant.id}
              onValueChange={(value) => {
                const variant = mockupVariants.find(v => v.id === value);
                if (variant) setSelectedVariant(variant);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {mockupVariants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: variant.color }}
                      />
                      {variant.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <p className="text-sm text-muted-foreground">
              {selectedVariant.description}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadMockup}
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {logoName} - {selectedVariant.name} Mockup
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div
                className="w-full h-96 rounded-lg overflow-hidden shadow-xl"
                dangerouslySetInnerHTML={{ __html: generateMockupSVG(selectedVariant, 'large') }}
              />

              <div className="flex gap-2">
                <Button onClick={downloadMockup} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download High-Res
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Color Options</h3>
                <div className="grid grid-cols-1 gap-2">
                  {mockupVariants.map((variant) => (
                    <div
                      key={variant.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedVariant.id === variant.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: variant.color }}
                      />
                      <div>
                        <div className="font-semibold">{variant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {variant.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold mb-3">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material:</span>
                    <span>100% Cotton</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fit:</span>
                    <span>Unisex Classic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sizes:</span>
                    <span>XS - 3XL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Print:</span>
                    <span>Premium Screen Print</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold text-primary">$29.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TShirtMockup;