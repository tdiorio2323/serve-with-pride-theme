import { FC } from "react";
import { RotateCcw, CheckCircle, XCircle, Clock, Mail, Phone, Package, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Returns: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
              <RotateCcw className="w-4 h-4 mr-2" />
              Returns & Exchanges
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
            30-Day Satisfaction Guarantee
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Not completely satisfied with your Truth Matters purchase?
            We stand behind our products with a hassle-free return policy.
          </p>
        </div>
      </section>

      {/* Quick Return Info */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-2 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold mb-2">30 Days</h3>
                <p className="text-sm text-muted-foreground">Full return window from delivery date</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold mb-2">Free Returns</h3>
                <p className="text-sm text-muted-foreground">We provide prepaid return labels</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-purple-200 bg-purple-50">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold mb-2">Full Refund</h3>
                <p className="text-sm text-muted-foreground">100% money back guarantee</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">How to Return Your Order</h2>
            <p className="text-muted-foreground">Simple 3-step process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Email us at returns@truthmatters.com with your order number and reason for return.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> returns@truthmatters.com</p>
                  <p><strong>Phone:</strong> (555) 123-TRUTH</p>
                  <p><strong>Response:</strong> Within 24 hours</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle>Package & Ship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Pack your items in original packaging and use our prepaid return label.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Label:</strong> Emailed within 24 hours</p>
                  <p><strong>Packaging:</strong> Original preferred</p>
                  <p><strong>Drop-off:</strong> Any UPS location</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <CardTitle>Get Your Refund</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Once we receive your return, refunds are processed within 2-3 business days.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Processing:</strong> 2-3 business days</p>
                  <p><strong>Method:</strong> Original payment method</p>
                  <p><strong>Confirmation:</strong> Email notification</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Return Policy Details */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Return Policy Details</h2>
              <p className="text-muted-foreground">Everything you need to know</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    Returnable Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Unworn Apparel</p>
                      <p className="text-sm text-muted-foreground">With original tags attached</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Unwashed Items</p>
                      <p className="text-sm text-muted-foreground">In original condition</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Accessories</p>
                      <p className="text-sm text-muted-foreground">Hats, patches, stickers in original packaging</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Defective Items</p>
                      <p className="text-sm text-muted-foreground">Manufacturing defects accepted regardless of condition</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    Non-Returnable Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Custom/Personalized Items</p>
                      <p className="text-sm text-muted-foreground">Items made to your specifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Worn/Used Items</p>
                      <p className="text-sm text-muted-foreground">Items showing signs of wear</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Clearance Items</p>
                      <p className="text-sm text-muted-foreground">Final sale items marked as such</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold">Items Over 30 Days</p>
                      <p className="text-sm text-muted-foreground">Beyond our return window</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Exchanges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Exchanges</h2>
              <p className="text-muted-foreground">Need a different size or color?</p>
            </div>

            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-4">Free Size Exchanges</h3>
                  <p className="text-muted-foreground mb-6">
                    Got the wrong size? No problem! We offer free exchanges for different sizes
                    of the same item within 30 days of delivery.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Same item, different size
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Free return shipping
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Fast turnaround
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Priority processing
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 rounded-lg p-8">
                    <RotateCcw className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="font-semibold mb-2">Need to Exchange?</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Contact us first to ensure your new size is in stock
                    </p>
                    <Button className="w-full">
                      Start Exchange
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Circumstances */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Special Circumstances</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Defective Items:</strong> If you receive a defective item, we'll replace it immediately
                  regardless of when you contact us. We stand behind our quality 100%.
                </AlertDescription>
              </Alert>

              <Alert>
                <Package className="h-4 w-4" />
                <AlertDescription>
                  <strong>Wrong Item Received:</strong> If we sent you the wrong item, we'll send the correct
                  item immediately and provide a prepaid return label for the incorrect item.
                </AlertDescription>
              </Alert>

              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <strong>Holiday Returns:</strong> Items purchased between November 1st and December 25th
                  can be returned until January 31st of the following year.
                </AlertDescription>
              </Alert>

              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  <strong>Gift Returns:</strong> Gift recipients can return items without the original
                  purchaser's information. Store credit will be issued for gift returns without receipt.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Questions About Returns?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our customer service team is here to help make your return process
            as smooth as possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="font-bold">
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold">
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            Returns: returns@truthmatters.com | Phone: (555) 123-TRUTH
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Returns;
