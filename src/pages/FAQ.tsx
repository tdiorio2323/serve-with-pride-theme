import { FC, useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "We offer free standard shipping (5-7 business days) on all orders over $50. Express shipping (2-3 business days) is available for $9.95. All orders are processed within 1-2 business days."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within the United States and its territories. We're working on expanding international shipping to support patriots worldwide."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can also check your order status anytime by logging into your account."
        },
        {
          question: "What if my order arrives damaged?",
          answer: "We stand behind our products 100%. If your order arrives damaged, contact us within 48 hours with photos and we'll send a replacement immediately at no cost to you."
        }
      ]
    },
    {
      category: "Products & Quality",
      questions: [
        {
          question: "What materials are your products made from?",
          answer: "We use only premium materials: 100% cotton t-shirts, heavyweight cotton blend hoodies (500GSM), structured cotton caps, and weather-resistant embroidered patches. Many items are made in the USA."
        },
        {
          question: "Are your designs printed or embroidered?",
          answer: "Most apparel features high-quality screen printing or heat transfer vinyl for durability. Our hats and patches use premium embroidery. All designs are built to last through regular wear and washing."
        },
        {
          question: "How do I care for my Truth Matters apparel?",
          answer: "Machine wash cold with like colors, tumble dry low. For embroidered items, turn inside out before washing. Avoid bleach and fabric softener to preserve colors and designs."
        },
        {
          question: "Do you offer custom designs or bulk orders?",
          answer: "Yes! We offer custom designs for groups, rallies, and events. Contact us for bulk pricing on orders of 12+ items. Perfect for patriot groups, veteran organizations, and political events."
        }
      ]
    },
    {
      category: "Sizing & Fit",
      questions: [
        {
          question: "How do your sizes run?",
          answer: "Our apparel runs true to size. We offer detailed size charts for each product. If you're between sizes, we recommend sizing up for a more comfortable fit, especially for hoodies."
        },
        {
          question: "Do you offer plus sizes?",
          answer: "Yes! We offer extended sizes up to 5XL on most apparel because patriotism comes in all sizes. Check individual product pages for available size ranges."
        },
        {
          question: "What if the size doesn't fit?",
          answer: "No problem! We offer free exchanges within 30 days. Just contact us and we'll send you a prepaid return label to exchange for the right size."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What's your return policy?",
          answer: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, return it for a full refund or exchange. Items must be unworn and in original condition."
        },
        {
          question: "How do I start a return?",
          answer: "Contact our customer service team with your order number. We'll email you a prepaid return label within 24 hours. No restocking fees, no hassle."
        },
        {
          question: "How long do refunds take?",
          answer: "Once we receive your return, refunds are processed within 2-3 business days. You'll receive an email confirmation when your refund is issued."
        }
      ]
    },
    {
      category: "Account & Payment",
      questions: [
        {
          question: "Do I need an account to place an order?",
          answer: "You can checkout as a guest, but creating an account lets you track orders, save favorites, and speed up future purchases. Plus, account holders get early access to new designs!"
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use industry-standard SSL encryption and never store your payment information on our servers. Your security is our priority."
        }
      ]
    },
    {
      category: "Our Mission",
      questions: [
        {
          question: "What causes do you support?",
          answer: "We proudly support veteran organizations, law enforcement charities, and conservative causes that defend American values. A portion of every purchase goes to these important organizations."
        },
        {
          question: "Are you veteran-owned?",
          answer: "Yes! Truth Matters was founded by veterans who believe in standing up for the principles that make America great. Our designs are created by those who've served our nation."
        },
        {
          question: "Why should I choose Truth Matters?",
          answer: "When you shop with us, you're not just buying apparel - you're supporting American values, veteran causes, and high-quality products made to last. Every purchase makes a statement and supports our mission."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3')] bg-cover bg-center opacity-15"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
              <HelpCircle className="w-4 h-4 mr-2" />
              Customer Support
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and mission.
            Can't find what you're looking for? We're here to help.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-3">Mon-Fri 9AM-6PM EST</p>
                <p className="font-semibold">(555) 123-TRUTH</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-3">Response within 24 hours</p>
                <p className="font-semibold">support@truthmatters.com</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-3">Available during business hours</p>
                <Button size="sm">Start Chat</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center">
                <span className="w-2 h-8 bg-primary rounded mr-3"></span>
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <Card key={faqIndex} className="overflow-hidden">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
                        >
                          <h3 className="font-semibold pr-4">{faq.question}</h3>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-4 pt-0">
                            <div className="border-t pt-4">
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Clock className="w-16 h-16 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our customer service team is standing by to assist you.
            We're committed to making your Truth Matters experience exceptional.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="font-bold">
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold">
              Start Live Chat
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
