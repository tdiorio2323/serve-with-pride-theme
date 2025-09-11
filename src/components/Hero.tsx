import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(29, 42, 54, 0.8), rgba(215, 38, 61, 0.3)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Watermark Logo */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-10"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: '40%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <img 
            src={logo} 
            alt="Truth Matters" 
            className="h-24 w-24 mx-auto mb-6 drop-shadow-2xl"
          />
        </div>
        
        <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider drop-shadow-2xl">
          GEAR BUILT FOR
          <br />
          THOSE WHO SERVE
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
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
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/70 font-body text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            VETERAN OWNED
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            FIRST RESPONDER OWNED
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            BUILT IN USA
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;