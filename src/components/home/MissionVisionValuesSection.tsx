import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Gem } from "lucide-react";

interface MVVItem {
  icon: React.ElementType;
  title: string;
  text: string;
}

const items: MVVItem[] = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To empower rural communities through education, skill development, and sustainable practices, fostering a society where every individual has the opportunity to thrive.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "A self-reliant and equitable society where empowered youth, educated children, and respected women lead sustainable development and uphold their rights.",
  },
  {
    icon: Gem,
    title: "Our Values",
    text: "Compassion, Integrity, Empowerment, Sustainability, and Collaboration guide every action we take and every decision we make.",
  },
];

export function MissionVisionValuesSection() {
  return (
    <section id="mission" className="py-12 sm:py-16 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-headline text-center text-primary mb-12">
          Mission, Vision & Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card key={item.title} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto bg-accent/10 rounded-full p-3 w-fit mb-3">
                   <item.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl text-accent">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/70 text-center">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
