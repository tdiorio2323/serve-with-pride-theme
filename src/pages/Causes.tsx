import { FC } from "react";
import { Button } from "@/components/ui/button";

const causes = [
  {
    name: "Wounded Warrior Project",
    description: "Providing a variety of programs, services and events for wounded veterans of the military actions following the events of September 11, 2001.",
    imageUrl: "/placeholder.svg",
  },
  {
    name: "Tunnel to Towers Foundation",
    description: "Honoring the sacrifice of firefighter Stephen Siller who laid down his life to save others on September 11, 2001. We also honor our military and first responders who continue to make the supreme sacrifice of life and limb for our country.",
    imageUrl: "/placeholder.svg",
  },
  {
    name: "The Gary Sinise Foundation",
    description: "Serving our nation by honoring our defenders, veterans, first responders, their families, and those in need.",
    imageUrl: "/placeholder.svg",
  },
  {
    name: "Fold of Honor",
    description: "Providing educational scholarships to the spouses and children of America’s fallen and disabled service-members.",
    imageUrl: "/placeholder.svg",
  },
];

const Causes: FC = () => {
  return (
    <div className="bg-background text-foreground">
      <header className="py-24 text-center">
        <h1 className="font-display text-5xl font-bold tracking-tight">
          Our Causes
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          We are proud to support organizations that make a real difference in the lives of our nation's heroes.
        </p>
      </header>

      <main className="container mx-auto max-w-6xl py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {causes.map((cause) => (
            <div key={cause.name} className="flex flex-col overflow-hidden rounded-lg border bg-card">
              <img src={cause.imageUrl} alt={cause.name} className="h-48 w-full object-cover" />
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-display text-2xl font-bold">{cause.name}</h3>
                  <p className="mt-3 text-base text-muted-foreground">{cause.description}</p>
                </div>
                <div className="mt-6">
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Causes;
