import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact: FC = () => {
  return (
    <div className="hero-flag-background min-h-screen text-white">
      <Header />
      <header className="py-24 text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight">
          Contact Us
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          We'd love to hear from you. Send us a message and we'll get back to
          you as soon as possible.
        </p>
      </header>

      <main className="container mx-auto max-w-4xl py-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">Get in Touch</h2>
            <form className="mt-8 grid grid-cols-1 gap-6">
              <Input type="text" placeholder="Name" />
              <Input type="email" placeholder="Email" />
              <Textarea placeholder="Message" />
              <Button type="submit" size="lg">
                Send Message
              </Button>
            </form>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">Our Information</h2>
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground">contact@truthmatters.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-muted-foreground">(123) 456-7890</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-muted-foreground">123 Patriot Way, Freedom, USA 1776</p>
              </div>
            </div>
            <div className="mt-8 h-64 rounded-lg bg-muted"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
