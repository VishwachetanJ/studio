
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, Briefcase, TrendingUp, ArrowLeft, ExternalLink, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsletterSignUpForm } from "@/components/forms/NewsletterSignUpForm";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: 'Women\'s Rights & Empowerment Hub | Jagruthi',
  description: 'Access information on government schemes for women, career restart options, and resources on women\'s rights.',
};

const governmentSchemesExamples = [
  { name: "Beti Bachao Beti Padhao", description: "Focuses on education and welfare of girl children.", officialLink: "https://wcd.nic.in/bbbp-schemes" },
  { name: "Mahila Shakti Kendra", description: "Aims to empower rural women through community participation.", officialLink: "https://wcd.nic.in/schemes/mahila-shakti-kendra-msk" },
  { name: "Stand-Up India", description: "Facilitates bank loans for SC/ST and women entrepreneurs.", officialLink: "https://www.standupmitra.in/" },
  { name: "Support to Training and Employment Programme for Women (STEP)", description: "Aims to provide skills that give employability to women.", officialLink: "https://wcd.nic.in/schemes/support-training-and-employment-programme-women-step" },
];

const careerRestartExamples = [
  { company: "Major Tech Companies (e.g., Google, Microsoft, Amazon)", programType: "Returnship Programs", description: "Often have structured programs for women returning to the workforce after a break." },
  { company: "Financial Institutions (e.g., HDFC, Axis Bank)", programType: "Diversity Hiring Initiatives", description: "Specific drives and programs to encourage women to rejoin the corporate sector." },
  { company: "Various MNCs", programType: "Career Re-entry Programs", description: "Look for 'career re-entry', 'second innings', or 'returnship' on company career pages." },
];


export default function WomensEmpowermentPage() {
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
            Women's Rights & Empowerment Hub
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Dedicated to empowering women with information on their rights, government support, and career opportunities.
          </p>
        </div>

        {/* Government Schemes Section */}
        <section id="government-schemes" className="mb-16">
          <Card className="shadow-lg border-accent/30">
            <CardHeader className="flex flex-row items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-accent" />
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-headline text-accent">Government Schemes for Women</CardTitle>
                <CardDescription className="text-md">Explore initiatives by the government to support women's education, entrepreneurship, and welfare.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground/70">
                The government offers various schemes to empower women. Here are a few examples. For detailed and updated information, please visit official government websites.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {governmentSchemesExamples.map(scheme => (
                  <Card key={scheme.name} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">{scheme.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-3">{scheme.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer">
                          Learn More <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                (Information is indicative. Always refer to official government portals for the latest details.)
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Career Restart Options Section */}
        <section id="career-restart" className="mb-16">
          <Card className="shadow-lg border-accent/30">
            <CardHeader className="flex flex-row items-center space-x-3">
              <Briefcase className="h-8 w-8 text-accent" />
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-headline text-accent">Career Restart & Returnship Programs</CardTitle>
                <CardDescription className="text-md">Opportunities for women looking to re-enter the workforce after a career break.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground/70">
                Many private companies offer programs to help women restart their careers. These are often called 'Returnship' or 'Career Re-entry' programs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careerRestartExamples.map(example => (
                  <Card key={example.company} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary">{example.company}</CardTitle>
                      <CardDescription className="text-sm">{example.programType}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-3">{example.description}</p>
                       <p className="text-xs text-muted-foreground">Search on respective company career portals for active programs.</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
               <p className="text-foreground/70 mt-4">
                We recommend checking the career pages of major corporations and professional networking sites like LinkedIn for such opportunities.
              </p>
              <p className="text-sm text-muted-foreground">
                (Jagruthi will aim to list specific openings when available and partnered.)
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Women's Rights Section */}
        <section id="womens-rights" className="mb-16">
          <Card className="shadow-lg border-accent/30">
            <CardHeader className="flex flex-row items-center space-x-3">
              <ShieldCheck className="h-8 w-8 text-accent" />
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-headline text-accent">Know Your Rights</CardTitle>
                <CardDescription className="text-md">Information and resources about legal rights and support systems for women.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/70">
                Understanding your legal rights is crucial for empowerment. We are compiling resources and will provide links to legal aid, counseling services, and information on women's rights in India.
              </p>
              <p className="text-foreground/70">
                Topics will include: domestic violence, workplace harassment, property rights, and more.
              </p>
              <p className="font-medium text-primary">
                 Key government resources include the National Commission for Women (NCW) website.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="http://ncw.nic.in/" target="_blank" rel="noopener noreferrer">
                  Visit NCW Website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                (Detailed guides and contact information for support organizations coming soon.)
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
                    <CardTitle className="text-xl sm:text-2xl font-headline text-primary">Stay Informed!</CardTitle>
                </div>
              <CardDescription className="text-md">
                Sign up for our newsletter to receive updates on new schemes, career programs, and resources relevant to women's empowerment.
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

    