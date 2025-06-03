
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Recycle, Trash2, Home, Trees, Leaf, Sprout, ArrowLeft, ExternalLink, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NewsletterSignUpForm } from "@/components/forms/NewsletterSignUpForm";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: 'Environmental Sustainability Hub | Jagruthi',
  description: 'Learn about e-waste management, reducing plastic, recycling, eco-friendly housing, tree planting, and forest conservation with Jagruthi.',
};

const sustainabilityTopics = [
  { 
    title: "E-waste Management", 
    icon: Trash2, 
    description: "Proper disposal and recycling of electronic waste to prevent environmental harm. We'll share guidelines and local collection points.",
    details: "E-waste contains hazardous materials that can contaminate soil and water if not managed correctly. We advocate for responsible recycling programs and promote awareness about the impact of e-waste. Future updates will include links to certified e-waste recyclers."
  },
  { 
    title: "Reducing Plastic Usage", 
    icon: Recycle, // Using Recycle as a general environmental icon, can be more specific if a 'no-plastic' icon exists
    description: "Tips and alternatives to minimize single-use plastics in daily life. Join our campaigns for a plastic-free environment.",
    details: "Plastic pollution is a major threat to our ecosystems. We encourage using reusable bags, water bottles, and containers. We're working on workshops to create plastic alternatives and promote policies reducing plastic production."
  },
  { 
    title: "Recycling Practices", 
    icon: Recycle, 
    description: "Learn how to segregate waste and effectively recycle various materials to conserve resources.",
    details: "Effective recycling starts with proper waste segregation at source – paper, plastic, glass, metal. We aim to provide clear guides on what can be recycled in our local area and partner with local bodies to improve recycling infrastructure."
  },
  { 
    title: "Eco-friendly Housing", 
    icon: Home, 
    description: "Information on sustainable building materials and practices for constructing environmentally friendly homes.",
    details: "Eco-friendly houses minimize environmental impact by using sustainable materials, energy-efficient designs, and renewable energy sources. We will share resources on low-cost, durable, and green building techniques suitable for our region."
  },
  { 
    title: "Tree Planting Initiatives", 
    icon: Trees, 
    description: "Participate in our tree plantation drives and contribute to increasing green cover for a healthier climate.",
    details: "Trees are vital for clean air, biodiversity, and combating climate change. Jagruthi organizes regular plantation drives and provides saplings. We focus on native species that support local ecosystems."
  },
  { 
    title: "Forest Conservation & Growth", 
    icon: Leaf, 
    description: "Supporting efforts to protect existing forests and promote afforestation for ecological balance.",
    details: "Protecting our forests from deforestation and degradation is crucial. We work with communities and authorities on conservation projects, promoting sustainable forest management and awareness about the importance of forests."
  }
];

export default function EnvironmentalSustainabilityPage() {
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
            Environmental Sustainability Hub
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Join us in creating a greener and healthier planet. Explore our initiatives and learn how you can contribute to environmental protection and conservation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sustainabilityTopics.map(topic => (
            <Card key={topic.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/30 h-full">
              <CardHeader className="flex-row items-center space-x-3 pb-3">
                <topic.icon className="h-10 w-10 text-accent" />
                <CardTitle className="text-xl font-headline text-accent">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <p className="text-sm text-foreground/70">{topic.description}</p>
                <p className="text-xs text-muted-foreground italic">{topic.details}</p>
                <p className="text-xs text-primary font-medium mt-2">(More resources and local action plans coming soon!)</p>
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
                    <CardTitle className="text-xl sm:text-2xl font-headline text-primary">Stay Green & Informed!</CardTitle>
                </div>
              <CardDescription className="text-md">
                Sign up for our newsletter to receive updates on environmental initiatives, events, and tips for sustainable living.
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
