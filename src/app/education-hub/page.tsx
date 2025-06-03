
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, BookCopy, Briefcase, GraduationCap, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Educational Resources Hub | Jagruthi',
  description: 'Explore free educational tutorials and courses from Jagruthi, categorized for all learning levels.',
};

const resourceCategories = [
  { name: "School (1st - 12th Class)", slug: "school", icon: School, description: "Resources for primary and secondary education." },
  { name: "Diploma Courses", slug: "diploma", icon: BookCopy, description: "Specialized diploma program materials." },
  { name: "Vocational Courses", slug: "vocational", icon: Briefcase, description: "Skill-based training and vocational studies." },
  { name: "Undergraduate Courses", slug: "undergraduate", icon: GraduationCap, description: "Materials for bachelor's degree programs." },
  { name: "Postgraduate Courses", slug: "postgraduate", icon: BookOpen, description: "Advanced studies and master's degree resources." },
] as const;

export default function EducationHubPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8">
          <Link href="/" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Educational Resources Hub
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Explore a wide range of free educational tutorials and courses designed to empower learners of all levels. Select a category below to begin your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {resourceCategories.map((category) => (
            <Link key={category.slug} href={`/education-hub/${category.slug}`} passHref legacyBehavior>
              <a className="block group">
                <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
                  <CardHeader className="text-center items-center">
                    <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 group-hover:bg-accent/20 transition-colors">
                      <category.icon className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="font-headline text-xl text-primary group-hover:text-accent transition-colors">
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
