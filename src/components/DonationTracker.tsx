import { Progress } from "@/components/ui/progress";

const DonationTracker = () => {
  const currentAmount = 22430;
  const goalAmount = 50000;
  const progressPercentage = (currentAmount / goalAmount) * 100;

  return (
  <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-wide">
            MAKING A DIFFERENCE
          </h2>
          
          <div className="bg-card rounded-lg p-8 shadow-card border border-border">
            <div className="mb-6">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                ${currentAmount.toLocaleString()}
              </div>
              <div className="font-body text-lg text-muted-foreground">
                raised towards ${goalAmount.toLocaleString()} goal
              </div>
            </div>
            
            <div className="mb-6">
              <Progress 
                value={progressPercentage} 
                className="h-4 bg-muted"
              />
            </div>
            
            <div className="bg-black text-white p-6 rounded-lg">
              <div className="font-display text-2xl font-bold mb-2 tracking-wide">
                FIRST RESPONDER FUND
              </div>
              <p className="font-body text-white/90 leading-relaxed">
                Every order contributes <span className="font-bold text-primary">$1</span> to our First Responder Fund, 
                supporting families of fallen heroes and active service members in need.
              </p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-display text-2xl font-bold text-primary">342</div>
                <div className="font-body text-sm text-muted-foreground">Families Helped</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-primary">89</div>
                <div className="font-body text-sm text-muted-foreground">Communities Served</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-primary">15K+</div>
                <div className="font-body text-sm text-muted-foreground">Orders Placed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationTracker;