import { FC } from "react";
import { Truck, Clock, Shield, MapPin, Package, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Shipping: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
              <Truck className="w-4 h-4 mr-2" />
              Shipping Information
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Fast & Secure Shipping
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We get your Truth Matters gear to you quickly and safely.
            Free shipping on orders over $50 with tracking included.
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Shipping Options</h2>
            <p className="text-muted-foreground">Choose the delivery speed that works for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Standard Shipping</CardTitle>
                <p className="text-2xl font-bold text-green-600">FREE</p>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    5-7 Business Days
                  </p>
                  <p className="text-sm text-muted-foreground">
                    USPS Ground Advantage or UPS Ground
                  </p>
                  <p className="text-xs text-muted-foreground">
                    $5.95 for orders under $50
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-primary">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Express Shipping</CardTitle>
                <p className="text-2xl font-bold text-primary">$9.95</p>
                <p className="text-sm text-muted-foreground">All orders</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    2-3 Business Days
                  </p>
                  <p className="text-sm text-muted-foreground">
                    UPS 3-Day Select or FedEx Express
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Most Popular
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Overnight</CardTitle>
                <p className="text-2xl font-bold text-red-600">$24.95</p>
                <p className="text-sm text-muted-foreground">Rush orders</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Next Business Day
                  </p>
                  <p className="text-sm text-muted-foreground">
                    FedEx Overnight or UPS Next Day Air
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Order by 2PM EST
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Processing Time */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Processing & Fulfillment</h2>
              <p className="text-muted-foreground">How we get your order ready to ship</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Processing Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Standard Items</p>
                      <p className="text-sm text-muted-foreground">1-2 business days for in-stock merchandise</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Custom Orders</p>
                      <p className="text-sm text-muted-foreground">3-5 business days for personalized items</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Bulk Orders (12+)</p>
                      <p className="text-sm text-muted-foreground">5-7 business days for large quantities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Order Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Automatic Updates</p>
                      <p className="text-sm text-muted-foreground">Email notifications at every step</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Real-Time Tracking</p>
                      <p className="text-sm text-muted-foreground">Follow your package from warehouse to doorstep</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Delivery Confirmation</p>
                      <p className="text-sm text-muted-foreground">Photo proof of delivery when available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Zones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Where We Ship</h2>
              <p className="text-muted-foreground">Delivering Truth Matters gear across America</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Shipping Zones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4 text-green-600">✓ We Ship To:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• All 50 United States</li>
                      <li>• Washington D.C.</li>
                      <li>• Puerto Rico</li>
                      <li>• U.S. Virgin Islands</li>
                      <li>• Guam</li>
                      <li>• American Samoa</li>
                      <li>• Military APO/FPO addresses</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 text-red-600">Currently Not Available:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• International shipping</li>
                      <li>• P.O. Boxes (for some carriers)</li>
                    </ul>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Military Personnel:</strong> We proudly support our troops with special shipping rates to APO/FPO addresses. Contact us for details.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Circumstances */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Important Shipping Info</h2>
              <p className="text-muted-foreground">What you need to know</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Holiday & Peak Seasons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    During peak seasons (elections, holidays, major events), processing and shipping may take longer due to high demand.
                  </p>
                  <p className="text-sm">
                    <strong>Election Season:</strong> Order early! Demand for patriotic gear spikes during election cycles.
                  </p>
                  <p className="text-sm">
                    <strong>Holiday Cutoffs:</strong> Check our homepage for last-minute shipping deadlines.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    Ensure your shipping address is complete and correct. We cannot be responsible for packages sent to incorrect addresses.
                  </p>
                  <p className="text-sm">
                    <strong>Apartments:</strong> Include unit numbers for faster delivery.
                  </p>
                  <p className="text-sm">
                    <strong>Rural Areas:</strong> Some remote locations may require additional delivery time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get your Truth Matters gear shipped fast and secure.
            Free shipping on orders over $50!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="font-bold">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold">
              Track Your Order
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shipping;