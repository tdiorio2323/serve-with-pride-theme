import { FC } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import heroBg from "@/assets/hero-bg.jpg";
import serviceBg from "@/assets/service-bg.jpg";
import Footer from "@/components/Footer";

const About: FC = () => {
  return (
    <div className="min-h-screen relative">
      <Helmet>
        <title>About Us - Truth Matters</title>
        <meta name="description" content="Founded by veterans and first responders, Truth Matters supports those who serve. Learn about our mission to give back to veteran causes." />
        <meta property="og:title" content="About Us - Truth Matters" />
        <meta property="og:description" content="Founded by veterans and first responders, Truth Matters supports those who serve." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(${serviceBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4, zIndex: -10 }}></div>
      <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(/about-bg.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, zIndex: -10 }}></div>
      <Header />
      <section className="relative py-40 text-center">
        <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.6, zIndex: -1 }}></div>
        <div className="relative container mx-auto px-4">
          <h1 className="font-display text-5xl font-bold tracking-tight text-black">
            About Us
          </h1>
          <p className="mt-4 text-xl text-black/80">
            Founded by veterans and first responders, for veterans and first
            responders.
          </p>
        </div>
      </section>

      <main className="container mx-auto max-w-4xl py-24">
        <div className="prose prose-lg mx-auto text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-16">
            <h2 className="font-display text-4xl font-bold text-black">Our Story</h2>
            <p className="text-lg text-black/80">
              Truth Matters started as a small project in a garage, born from a shared desire to create something meaningful for the communities we came from. As veterans and first responders, we wanted to build a brand that not only provided quality products but also served as a symbol of the values we hold dear: honor, integrity, and unwavering commitment. We've grown since those early days, but our core mission remains the same.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-16">
            <h2 className="font-display text-4xl font-bold text-black">Our Mission</h2>
            <p className="text-lg text-black/80">
              We are a company built on a foundation of service. Our mission is to
              provide high-quality apparel and gear that reflects the values of
              honor, courage, and commitment that define our nation's heroes.
            </p>
            <p className="text-lg text-black/80">
              Every item we sell is designed with a deep respect for the men and
              women who have served and continue to serve in our armed forces and
              emergency services. We are committed to giving back to these
              communities, and a portion of every sale goes to support veteran
              and first responder charities.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h2 className="font-display text-4xl font-bold text-black mb-8">Our Values</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="font-display text-2xl font-bold text-black">Honor</h3>
                <p className="mt-2 text-black/70">We operate with integrity and a strong moral compass.</p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="font-display text-2xl font-bold text-black">Courage</h3>
                <p className="mt-2 text-black/70">We stand up for what we believe in and support those who do the same.</p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="font-display text-2xl font-bold text-black">Commitment</h3>
                <p className="mt-2 text-black/70">We are dedicated to our customers, our communities, and our cause.</p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="font-display text-2xl font-bold text-black">Quality</h3>
                <p className="mt-2 text-black/70">We take pride in creating products that are built to last.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <p className="text-lg text-black/80">
              We believe that what you wear is more than just a piece of
              clothing; it's a statement of who you are and what you stand for.
              When you wear our gear, you are not only showing your support for
              our nation's heroes, but you are also joining a community of
              like-minded individuals who share a passion for service and a
              commitment to making a difference.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
