
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Map, Milestone, Briefcase, Lightbulb, Globe, BookCopy, Users, ArrowLeft, ExternalLink, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsletterSignUpForm } from "@/components/forms/NewsletterSignUpForm";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: 'Educational & Career Counseling Hub | Jagruthi',
  description: 'Comprehensive guidance on educational paths, career opportunities, skill enhancement, study abroad, and mentorship programs.',
};

const counselingServices = [
  {
    icon: Map,
    title: "Navigating Educational Paths",
    description: "Understanding different educational boards (CBSE, State Boards, ICSE, etc.) and choosing the right curriculum based on student aptitude and goals.",
    details: "We provide clarity on the structure, focus, and benefits of various educational systems to help students and parents make informed decisions.",
  },
  {
    icon: Milestone,
    title: "Guidance After Key Milestones",
    description: "Personalized advice on what to study after 10th, 12th, and degree. Exploring subject combinations, stream selection, and further education options.",
    details: "From choosing the right stream after 10th to selecting specialized courses after graduation, we map out potential academic and vocational pathways.",
  },
  {
    icon: Briefcase,
    title: "Exploring Courses & Career Opportunities",
    description: "In-depth information on various professional courses, vocational training, and emerging career fields. Aligning interests with potential job roles.",
    details: "Discover a wide array of courses and understand their relevance in the current job market. We help identify careers that match your skills and passion.",
  },
  {
    icon: Lightbulb,
    title: "Skill Development & Job Market Insights",
    description: "Identifying essential skills for today's job market, resources for skill enhancement, and understanding current employment trends.",
    details: "Stay ahead with insights into industry demands. We guide you on acquiring in-demand skills and navigating the job market effectively.",
  },
  {
    icon: Globe,
    title: "Study Abroad Options & Scholarships",
    description: "Information on opportunities for studying abroad, including application processes, university selection, and available scholarships.",
    details: "Explore global education prospects. We provide resources and guidance for international studies and funding opportunities.",
  },
  {
    icon: BookCopy,
    title: "Accessing Free Educational Resources",
    description: "Curated list of free, high-quality educational materials from government initiatives (like NPTEL, SWAYAM) and private institutions.",
    details: "Learn about and access a wealth of free online courses, lectures, and study materials to support your learning journey without financial burden.",
  },
  {
    icon: Users,
    title: "Comprehensive Mentorship Program",
    description: "One-on-one and group mentorship for students from 1st grade through their degree, covering academic support, personal development, and career guidance.",
    details: "Our mentors provide continuous support, helping students build confidence, overcome challenges, and achieve their full potential.",
  }
];

export default function CounselingHubPage() {
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
            Educational & Career Counseling Hub
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Jagruthi offers comprehensive guidance to students at every stage of their academic and professional journey. Explore our services designed to empower you with knowledge and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {counselingServices.map(service => (
            <Card key={service.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/30 h-full">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-xl font-headline text-accent">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 text-center">
                <p className="text-sm text-foreground/70">{service.description}</p>
                <p className="text-xs text-muted-foreground italic">{service.details}</p>
                <p className="text-xs text-primary font-medium mt-2">(Detailed guides and direct consultation sign-ups coming soon!)</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Separator className="my-12" />

        <section id="stay-updated" className="text-center">
           <Card className="max-w-2xl mx-auto shadow-md border-primary/30">
            <CardHeader>
                <div className="flex items-center justify-center space-x-2 mb-2">
                    <Bell className="h-7 w-7 text-primary" />
                    <CardTitle className="text-xl sm:text-2xl font-headline text-primary">Stay Informed!</CardTitle>
                </div>
              <CardDescription className="text-md">
                Sign up for our newsletter to receive updates on counseling workshops, new resources, and educational insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsletterSignUpForm />
            </CardContent>
          </Card>
        </section>

      </main>
      <Footer />
    </div>
  );
}
