
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ClipboardList, Leaf, Store, BarChart3, Droplets, Sun } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Farmers Welfare Hub | Jagruthi',
  description: 'Guidance on crop selection, sustainable practices, and direct market access for farmers by Jagruthi.',
};

const welfareServices = [
  {
    icon: ClipboardList,
    title: "Smart Crop Selection",
    description: "Receive tailored advice on choosing the right crops. We analyze weather forecasts, water resource availability (borewell, canal, rain-fed), and soil type to help you maximize yield and build resilience against changing conditions.",
    details: [
        { icon: Sun, text: "Weather Forecast Integration" },
        { icon: Droplets, text: "Water Resource Assessment" },
        { icon: BarChart3, text: "Soil Type Analysis" },
    ]
  },
  {
    icon: Leaf,
    title: "Sustainable Farming Practices",
    description: "Get expert guidance on optimal and eco-friendly pesticide and fertilizer usage. Learn about integrated pest management, soil health improvement techniques, and organic alternatives to ensure sustainable and profitable farming.",
    detailsHeading: "Key Areas:",
    details: [
        { text: "Efficient Fertilizer Application" },
        { text: "Safe & Effective Pesticide Use" },
        { text: "Organic Farming Techniques" },
        { text: "Soil Health Management" },
    ]
  },
  {
    icon: Store,
    title: "Direct to Consumer Sales",
    description: "Bypass intermediaries and sell your produce directly to customers through our platform. Jagruthi facilitates this connection, helping you achieve better prices and greater control over your sales. List your products in our community shop.",
    link: "/shop",
    linkText: "Visit Our Shop",
  }
];

export default function FarmersWelfarePage() {
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
            Farmers Welfare Hub
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Jagruthi is dedicated to empowering farmers with knowledge, resources, and market access for sustainable and profitable agriculture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {welfareServices.map(service => (
            <Card key={service.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/30 h-full">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-xl font-headline text-accent">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 text-center">
                <p className="text-sm text-foreground/70">{service.description}</p>
                {service.details && (
                    <div className="text-left text-xs text-muted-foreground space-y-1 mt-3 pt-3 border-t border-border">
                        {service.detailsHeading && <p className="font-semibold text-primary mb-1">{service.detailsHeading}</p>}
                        <ul className="list-none space-y-1">
                        {service.details.map(detail => (
                            <li key={detail.text} className="flex items-center">
                                {detail.icon && <detail.icon className="h-3.5 w-3.5 mr-2 text-primary flex-shrink-0" />}
                                <span>{detail.text}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                )}
                {service.link && (
                  <div className="mt-4">
                    <Link href={service.link} passHref legacyBehavior>
                      <Button variant="outline" size="sm" className="text-accent border-accent hover:bg-accent/10">
                        {service.linkText}
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary/10 border-primary/30 shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary text-center">Get Personalized Advice</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-foreground/70 mb-6">
                For tailored guidance specific to your farm, crops, and local conditions, please share your details with us through our Farmer Connect program. Our experts will analyze your information and provide personalized recommendations.
                </p>
                <Link href="/farmer-connect" legacyBehavior>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                        Connect With Us
                    </Button>
                </Link>
            </CardContent>
        </Card>

      </main>
      <Footer />
    </div>
  );
}
