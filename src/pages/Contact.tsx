import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Contact Truth Matters
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Have a question about our products? Want to learn more about our mission?
            We're here to help and would love to hear from you.
          </p>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2">Get in touch via email</p>
              <a href="mailto:contact@truthmatters.com" className="text-primary font-semibold hover:underline">
                contact@truthmatters.com
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-2">Speak directly with our team</p>
              <a href="tel:+11234567890" className="text-primary font-semibold hover:underline">
                (123) 456-7890
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Response Time</h3>
              <p className="text-muted-foreground mb-2">We typically respond within</p>
              <p className="text-primary font-semibold">24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="font-display text-3xl font-bold mb-2">
                    Send Us a Message
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    Fill out the form below and we'll get back to you as soon as possible.
                    All fields are required.
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-semibold text-foreground">
                          First Name *
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Enter your first name"
                          className="h-12"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-semibold text-foreground">
                          Last Name *
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Enter your last name"
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-foreground">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-semibold text-foreground">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="What is this regarding?"
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold text-foreground">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about how we can help you..."
                        rows={6}
                        className="resize-none"
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full font-bold text-lg h-14">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>

                    <div className="flex items-center text-sm text-muted-foreground mt-4">
                      <Shield className="w-4 h-4 mr-2" />
                      Your information is secure and will never be shared with third parties.
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information & Details */}
            <div className="space-y-8">

              {/* Company Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-bold">
                    Truth Matters HQ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Our Location</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        123 Patriot Way<br />
                        Freedom, USA 17760<br />
                        United States of America
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Address</h3>
                      <p className="text-muted-foreground mb-1">
                        General inquiries and customer support
                      </p>
                      <a
                        href="mailto:contact@truthmatters.com"
                        className="text-primary font-semibold hover:underline"
                      >
                        contact@truthmatters.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                      <p className="text-muted-foreground mb-1">
                        Monday - Friday, 9:00 AM - 6:00 PM EST
                      </p>
                      <a
                        href="tel:+11234567890"
                        className="text-primary font-semibold hover:underline"
                      >
                        (123) 456-7890
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-bold">
                    Quick Questions?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Order & Shipping Questions</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Check our <a href="/shipping-info" className="text-primary hover:underline">Shipping Info</a> and
                      <a href="/faq" className="text-primary hover:underline ml-1">FAQ</a> pages for quick answers.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Returns & Exchanges</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Visit our <a href="/returns" className="text-primary hover:underline">Returns</a> page
                      for detailed information on our return policy.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Wholesale Inquiries</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Interested in bulk orders? Email us directly at
                      <a href="mailto:wholesale@truthmatters.com" className="text-primary hover:underline ml-1">
                        wholesale@truthmatters.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-lg overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500 font-semibold">Interactive Map</p>
                    <p className="text-slate-400 text-sm">Visit us at our location</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
