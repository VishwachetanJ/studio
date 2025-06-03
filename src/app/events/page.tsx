
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarRange, CalendarDays, CalendarCheck, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Select Event Type | Jagruthi',
  description: 'Choose the type of Jagruthi event you are interested in attending or learning more about.',
};

const eventCategories = [
  { name: "Weekly", slug: "Weekly", icon: CalendarRange, description: "Regular updates and activities." },
  { name: "Monthly", slug: "Monthly", icon: CalendarDays, description: "Our recurring monthly gatherings." },
  { name: "Annually", slug: "Annually", icon: CalendarCheck, description: "Major annual events and milestones." },
  { name: "Special Event", slug: "Special Event", icon: Star, description: "Unique, one-time special events." },
] as const;

export default function EventsCategoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Explore Our Events
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Jagruthi hosts a variety of events to engage with our community. Select a category below to learn more and register your interest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {eventCategories.map((category) => (
            <Link key={category.slug} href={`/events/register?category=${encodeURIComponent(category.slug)}`} passHref legacyBehavior>
              <a className="block group">
                <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                  <CardHeader className="text-center items-center">
                    <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 group-hover:bg-accent/20 transition-colors">
                      <category.icon className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="font-headline text-2xl text-primary group-hover:text-accent transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <p className="text-foreground/70">{category.description}</p>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
