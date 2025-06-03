
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

interface FocusArea {
  imageUrl: string;
  imageAlt: string;
  imageHint: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

const focusAreas: FocusArea[] = [
  {
    imageUrl: "https://placehold.co/400x300.png",
    imageAlt: "Rural Youth Empowerment Program",
    imageHint: "youth group",
    title: "Rural Youth Empowerment",
    description: "Providing skill development, job opportunities, and startup support for rural youth. Visit our hub for more.",
    link: "/rural-youth-empowerment",
    linkText: "Explore Empowerment Hub",
  },
  {
    imageUrl: "https://placehold.co/400x300.png",
    imageAlt: "Children receiving education",
    imageHint: "children learning",
    title: "Education for Underprivileged",
    description: "Ensuring access to quality education for children and women in underserved communities. Explore our free learning resources.",
    link: "/education-hub",
    linkText: "Explore Resources",
  },
  {
    imageUrl: "https://placehold.co/400x300.png",
    imageAlt: "Lush green environment",
    imageHint: "green plant",
    title: "Environmental Sustainability",
    description: "Promoting eco-friendly practices and conservation efforts for a healthier planet. Discover our initiatives.",
    link: "/environmental-sustainability",
    linkText: "Explore Eco Hub",
  },
  {
    imageUrl: "https://placehold.co/400x300.png",
    imageAlt: "Group of empowered women",
    imageHint: "women meeting",
    title: "Women's Rights & Empowerment",
    description: "Advocating for women's rights and providing resources on schemes and career restart options. Visit our hub.",
    link: "/womens-empowerment",
    linkText: "Explore Hub",
  },
  {
    imageUrl: "https://placehold.co/400x300.png",
    imageAlt: "Counselor guiding a student",
    imageHint: "student counseling",
    title: "Educational & Career Counseling",
    description: "Comprehensive guidance on educational paths (CBSE, State Board, etc.), what to study after 10th, 12th, and degree. Exploring various courses, career opportunities, job market insights, skill enhancement, study abroad options, and free education resources from government/private institutes. Mentorship for students from 1st grade to degree level.",
  },
  {
    imageUrl: "https://placehold.co/400x300.png",
    imageAlt: "Farmer in a field with crops",
    imageHint: "farmer harvest",
    title: "Farmers Welfare",
    description: "Guiding farmers on crop selection based on weather forecasts, water resources, and soil type. Providing advice on optimal pesticide and fertilizer usage. Facilitating direct-to-customer sales through our website to reduce middleman interference and improve farmer income.",
    link: "/farmers-welfare",
    linkText: "Explore Farmers Hub",
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
            <Card key={area.title} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={area.imageUrl}
                  alt={area.imageAlt}
                  fill
                  className="object-cover"
                  data-ai-hint={area.imageHint}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl text-primary">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pt-0 text-center">
                <p className="text-foreground/70">{area.description}</p>
              </CardContent>
              {area.link && area.linkText && (
                <CardFooter className="justify-center pt-2">
                  <Link href={area.link} passHref legacyBehavior>
                    <Button variant="link" className="text-accent hover:text-accent/80">
                      {area.linkText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
