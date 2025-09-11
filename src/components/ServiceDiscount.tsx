import { Button } from "@/components/ui/button";
import serviceBg from "@/assets/service-bg.jpg";
import { Badge, Shield, Flame, Truck } from "lucide-react";

const ServiceDiscount = () => {
  const serviceGroups = [
    { icon: Shield, label: "MILITARY", color: "text-green-400" },
    { icon: Badge, label: "POLICE", color: "text-blue-400" },
    { icon: Flame, label: "FIRE", color: "text-red-400" },
    { icon: Truck, label: "EMS", color: "text-orange-400" }
  ];

  return (
    <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${serviceBg})` }}
      ></div>
      <div className="absolute inset-0 bg-brand-navy/80"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-wide">
            SERVICE-ID
            <br />
            VERIFIED DISCOUNTS
          </h2>
          
          <p className="font-body text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Military, Police, Firefighters & EMS receive <span className="font-bold text-primary">10% off</span> all orders.
            <br />
            Verify your service now to unlock exclusive savings.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {serviceGroups.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <div className="font-display text-sm font-bold tracking-wide">
                  {service.label}
                </div>
              </div>
            ))}
          </div>

          <Button 
            variant="hero"
            size="lg"
            className="text-xl px-12 py-6 h-auto mb-8"
          >
            VERIFY WITH GOVX ID
          </Button>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="font-display text-2xl font-bold mb-4 tracking-wide">
              QUICK & SECURE VERIFICATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-display font-bold mb-2">STEP 1</div>
                <div className="font-body text-white/80">Click verification button</div>
              </div>
              <div>
                <div className="font-display font-bold mb-2">STEP 2</div>
                <div className="font-body text-white/80">Upload service credentials</div>
              </div>
              <div>
                <div className="font-display font-bold mb-2">STEP 3</div>
                <div className="font-body text-white/80">Instant 10% discount applied</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDiscount;