import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider drop-shadow-2xl mt-16">
          Built on Honor,
          <br />
          Worn with Pride
        </h1>
        
        <p className="font-body text-lg sm:text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto font-medium drop-shadow-lg">
          Every purchase supports veterans, law enforcement, firefighters & EMS.
        </p>
        
        <Button 
          variant="hero"
          size="lg"
          className="text-xl px-12 py-6 h-auto"
        >
          SHOP THE COLLECTION
        </Button>
        
        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-white font-body text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-2 drop-shadow-lg">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            VETERAN OWNED
          </div>
          <div className="flex items-center gap-2 drop-shadow-lg">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            FIRST RESPONDER OWNED
          </div>
          <div className="flex items-center gap-2 drop-shadow-lg">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            BUILT IN USA
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;