import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Target, Award, ExternalLink, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const causes = [
  {
    id: 1,
    name: "Wounded Warrior Project",
    shortName: "WWP",
    description: "Providing life-changing programs and services for wounded veterans of military actions following September 11, 2001. Supporting physical health, mental health, and economic empowerment.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    raised: 45680,
    goal: 75000,
    supporters: 1247,
    impact: "2,500+ veterans served this year",
    category: "Veterans Health",
    website: "https://www.woundedwarriorproject.org/",
    color: "from-blue-600 to-blue-800"
  },
  {
    id: 2,
    name: "Tunnel to Towers Foundation",
    shortName: "T2T",
    description: "Honoring the sacrifice of firefighter Stephen Siller who gave his life to save others on September 11, 2001. We honor military and first responders who make the supreme sacrifice.",
    imageUrl: "https://images.unsplash.com/photo-1574008451498-70e4fb71df78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    raised: 62340,
    goal: 100000,
    supporters: 892,
    impact: "156 families supported with housing",
    category: "First Responders",
    website: "https://tunnel2towers.org/",
    color: "from-red-600 to-red-800"
  },
  {
    id: 3,
    name: "The Gary Sinise Foundation",
    shortName: "GSF",
    description: "Serving our nation by honoring our defenders, veterans, first responders, their families, and those in need. Creating positive change through programs that strengthen communities.",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    raised: 38920,
    goal: 60000,
    supporters: 654,
    impact: "89 smart homes built for veterans",
    category: "Community Support",
    website: "https://www.garysinisefoundation.org/",
    color: "from-green-600 to-green-800"
  },
  {
    id: 4,
    name: "Folds of Honor",
    shortName: "FOH",
    description: "Providing educational scholarships to the spouses and children of America's fallen and disabled service members. Ensuring their sacrifice is never forgotten.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    raised: 71250,
    goal: 90000,
    supporters: 1456,
    impact: "425 scholarships awarded this year",
    category: "Education",
    website: "https://www.foldsofhonor.org/",
    color: "from-purple-600 to-purple-800"
  },
];

const stats = [
  {
    icon: Heart,
    label: "Total Donated",
    value: "$218,190",
    description: "From Truth Matters sales"
  },
  {
    icon: Users,
    label: "Veterans Helped",
    value: "3,170+",
    description: "Lives impacted this year"
  },
  {
    icon: Target,
    label: "Active Causes",
    value: "4",
    description: "Organizations we support"
  },
  {
    icon: TrendingUp,
    label: "Growth",
    value: "156%",
    description: "Increase in donations"
  }
];

const Causes: FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary">
            🇺🇸 Supporting Our Heroes
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-6">
            The Causes We Champion
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Every purchase matters. $1 from each item sold goes directly to organizations
            making a real difference in the lives of our nation's heroes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="font-bold">
              <Heart className="mr-2 h-5 w-5" />
              Make a Donation
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
              Learn Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="font-display text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-lg mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">How Your Purchase Makes Impact</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every item you buy creates a direct impact. Here's how it works:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">You Purchase</h3>
              <p className="text-muted-foreground">
                Buy any Truth Matters product. Quality gear that represents your values.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">We Donate</h3>
              <p className="text-muted-foreground">
                $1 from your purchase automatically goes to veteran and first responder causes.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Lives Change</h3>
              <p className="text-muted-foreground">
                Your contribution helps provide housing, healthcare, education, and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Causes Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Organizations We Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've carefully selected these outstanding organizations based on their
              proven impact and dedication to serving our heroes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {causes.map((cause) => (
              <Card key={cause.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cause.imageUrl}
                    alt={cause.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cause.color} opacity-80`}></div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {cause.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {cause.name}
                    </h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {cause.supporters} supporters
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {cause.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Donation Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(cause.raised)} of {formatCurrency(cause.goal)}
                      </span>
                    </div>
                    <Progress
                      value={calculateProgress(cause.raised, cause.goal)}
                      className="h-3"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {calculateProgress(cause.raised, cause.goal).toFixed(0)}% funded
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg mb-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Award className="w-4 h-4 mr-1" />
                      Impact This Year
                    </div>
                    <div className="font-semibold">
                      {cause.impact}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      className="flex-1 font-bold"
                      onClick={() => window.open(cause.website, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                    <Button variant="outline" className="font-bold">
                      <Heart className="w-4 h-4 mr-2" />
                      Donate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Every purchase is a vote for the values that matter.
            Shop Truth Matters and directly support the heroes who serve our nation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="font-bold text-primary hover:bg-white"
            >
              <Heart className="mr-2 h-5 w-5" />
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-bold"
            >
              Learn More About Our Mission
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Causes;