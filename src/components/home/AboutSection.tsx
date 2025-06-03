import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, GraduationCap, Leaf, ShieldCheck, MessageSquareText, Tractor, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FocusArea {
  icon: LucideIcon;
  title: string;
  description: string;
}

const focusAreas: FocusArea[] = [
  {
    icon: UsersRound,
    title: "Rural Youth Empowerment",
    description: "Providing skill development and opportunities for rural youth to achieve their potential.",
  },
  {
    icon: GraduationCap,
    title: "Education for Underprivileged",
    description: "Ensuring access to quality education for children and women in underserved communities.",
  },
  {
    icon: Leaf,
    title: "Environmental Sustainability",
    description: "Promoting eco-friendly practices and conservation efforts for a healthier planet.",
  },
  {
    icon: ShieldCheck,
    title: "Women's Rights & Empowerment",
    description: "Advocating for women's rights and empowering them to lead fulfilling lives.",
  },
  {
    icon: MessageSquareText,
    title: "Educational Counseling",
    description: "Offering guidance and counseling for students from 1st grade to degree level.",
  },
  {
    icon: Tractor,
    title: "Farmers Welfare",
    description: "Supporting farmers with crop suggestions, modern techniques, and welfare programs.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-headline text-center text-primary mb-12">
          Our Focus Areas
        </h2>
        <p className="text-center max-w-3xl mx-auto text-lg text-foreground/80 mb-12">
          Jagruthi is dedicated to holistic community development. We work across several key areas to create sustainable impact and empower individuals from all walks of life. Our key initiatives include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area) => (
            <Card key={area.title} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                  <area.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
