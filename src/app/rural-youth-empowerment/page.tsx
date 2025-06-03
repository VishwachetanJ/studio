
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, Briefcase, TrendingUp, BookOpen, ExternalLink, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsletterSignUpForm } from "@/components/forms/NewsletterSignUpForm";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: 'Rural Youth Empowerment Hub | Jagruthi',
  description: 'Access skill development courses, job opportunities, and government schemes tailored for rural youth empowerment.',
};

const skillPlatforms = [
  { name: "Coursera", url: "https://www.coursera.org", description: "Offers a wide range of online courses from universities and companies." },
  { name: "Udemy", url: "https://www.udemy.com", description: "A large marketplace for online learning and teaching." },
  { name: "NPTEL (Govt. of India)", url: "https://nptel.ac.in/", description: "Provides free online certification courses by IITs and IISc." },
  { name: "Skill India (Govt. of India)", url: "https://www.skillindia.gov.in/", description: "Government initiative for skill development." },
];

const jobPortals = [
  { name: "National Career Service (Govt. of India)", url: "https://www.ncs.gov.in/", description: "Official job portal by the Indian government." },
  { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", description: "Professional networking site with extensive job listings." },
  { name: "Naukri.com", url: "https://www.naukri.com/", description: "Popular private job portal in India." },
];

const governmentSchemes = [
  { name: "Startup India", url: "https://www.startupindia.gov.in/", description: "Hub for startups, offering resources, funding, and recognition." },
  { name: "MSME Schemes", url: "https://msme.gov.in/all-schemes", description: "Various schemes by the Ministry of MSME for small businesses." },
  { name: "Mudra Yojana (PMMY)", url: "https://www.mudra.org.in/", description: "Scheme for providing loans up to 10 lakh to non-corporate, non-farm small/micro enterprises." },
];

export default function RuralYouthEmpowermentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Rural Youth Empowerment Hub
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Empowering rural youth with skills, opportunities, and support for a brighter future. Explore resources for skill development, job searching, and government schemes.
          </p>
        </div>

        {/* Skill Development Section */}
        <section id="skill-development" className="mb-16">
          <Card className="shadow-lg border-accent/30">
            <CardHeader className="flex flex-row items-center space-x-3">
              <BookOpen className="h-8 w-8 text-accent" />
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-headline text-accent">Skill Development & Courses</CardTitle>
                <CardDescription className="text-md">Enhance your skills with online courses and training programs.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground/70">
                We are actively curating a list of recommended courses. In the meantime, explore these reputable platforms for a wide range of skill-oriented programs:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillPlatforms.map(platform => (
                  <Card key={platform.name} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">{platform.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-3">{platform.description}</p>
                       <Button variant="outline" size="sm" asChild>
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          Visit Platform <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                (Content Curation and Direct Integration Coming Soon)
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Job Opportunities Section */}
        <section id="job-opportunities" className="mb-16">
          <Card className="shadow-lg border-accent/30">
            <CardHeader className="flex flex-row items-center space-x-3">
              <Briefcase className="h-8 w-8 text-accent" />
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-headline text-accent">Job Opportunities</CardTitle>
                <CardDescription className="text-md">Find job openings in private and government sectors.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground/70">
                Discover potential career paths. While we work on a dedicated job board, here are some key portals to explore:
              </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobPortals.map(portal => (
                  <Card key={portal.name} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">{portal.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-3">{portal.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={portal.url} target="_blank" rel="noopener noreferrer">
                          Visit Portal <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-foreground/70 mt-4">
                We will feature curated job postings relevant to rural youth soon.
              </p>
              <p className="text-sm text-muted-foreground">
                (Live Job Board and Curated Listings Coming Soon)
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Government Schemes & Startup Support Section */}
        <section id="government-schemes" className="mb-16">
          <Card className="shadow-lg border-accent/30">
            <CardHeader className="flex flex-row items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-accent" />
              <div>
              <CardTitle className="text-2xl sm:text-3xl font-headline text-accent">Government Schemes & Startup Support</CardTitle>
              <CardDescription className="text-md">Information on initiatives supporting startups, MSMEs, and offering seed funding.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground/70">
                Learn about government initiatives that can help you start or grow your venture. Key resources include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {governmentSchemes.map(scheme => (
                  <Card key={scheme.name} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">{scheme.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-3">{scheme.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={scheme.url} target="_blank" rel="noopener noreferrer">
                          Learn More <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-foreground/70 mt-4">
                We will provide detailed guides and updates on relevant schemes.
              </p>
               <p className="text-sm text-muted-foreground">
                (Detailed Scheme Information and Updates Coming Soon)
              </p>
            </CardContent>
          </Card>
        </section>
        
        <Separator className="my-12" />

        {/* Notification/Subscription Section */}
        <section id="stay-updated" className="text-center">
           <Card className="max-w-2xl mx-auto shadow-md border-primary/30">
            <CardHeader>
                <div className="flex items-center justify-center space-x-2 mb-2">
                    <Bell className="h-7 w-7 text-primary" />
                    <CardTitle className="text-xl sm:text-2xl font-headline text-primary">Stay Updated!</CardTitle>
                </div>
              <CardDescription className="text-md">
                Sign up for our newsletter to receive notifications about new courses, job opportunities, government schemes, and other updates relevant to rural youth empowerment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsletterSignUpForm />
              <p className="text-xs text-muted-foreground mt-4">
                (Automated notifications upon new job/scheme postings are planned for future updates, requiring backend development.)
              </p>
            </CardContent>
          </Card>
        </section>

      </main>
      <Footer />
    </div>
  );
}
