import { FC } from "react";

const About: FC = () => {
  return (
    <div className="bg-background text-foreground">
      <header 
        className="relative bg-cover bg-center bg-no-repeat py-40 text-center text-white"
        style={{ backgroundImage: "url('/lovable-uploads/d8335492-a312-421d-9c3a-d102272a728a.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative">
          <h1 className="font-display text-5xl font-bold tracking-tight drop-shadow-md">
            About Us
          </h1>
          <p className="mt-4 text-xl text-white/90 drop-shadow-md">
            Founded by veterans and first responders, for veterans and first
            responders.
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl py-24">
        <div className="prose prose-lg mx-auto text-center">
          <h2 className="font-display text-4xl font-bold">Our Story</h2>
          <p className="text-lg">
            Truth Matters started as a small project in a garage, born from a shared desire to create something meaningful for the communities we came from. As veterans and first responders, we wanted to build a brand that not only provided quality products but also served as a symbol of the values we hold dear: honor, integrity, and unwavering commitment. We've grown since those early days, but our core mission remains the same.
          </p>

          <h2 className="font-display text-4xl font-bold mt-16">Our Mission</h2>
          <p className="text-lg">
            We are a company built on a foundation of service. Our mission is to
            provide high-quality apparel and gear that reflects the values of
            honor, courage, and commitment that define our nation's heroes.
          </p>
          <p className="text-lg">
            Every item we sell is designed with a deep respect for the men and
            women who have served and continue to serve in our armed forces and
            emergency services. We are committed to giving back to these
            communities, and a portion of every sale goes to support veteran
            and first responder charities.
          </p>

          <h2 className="font-display text-4xl font-bold mt-16">Our Values</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-display text-2xl font-bold">Honor</h3>
              <p className="mt-2 text-muted-foreground">We operate with integrity and a strong moral compass.</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-display text-2xl font-bold">Courage</h3>
              <p className="mt-2 text-muted-foreground">We stand up for what we believe in and support those who do the same.</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-display text-2xl font-bold">Commitment</h3>
              <p className="mt-2 text-muted-foreground">We are dedicated to our customers, our communities, and our cause.</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-display text-2xl font-bold">Quality</h3>
              <p className="mt-2 text-muted-foreground">We take pride in creating products that are built to last.</p>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-lg">
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
    </div>
  );
};

export default About;
