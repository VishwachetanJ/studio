
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ClipboardList, Leaf, Store, CloudSun, CalendarClock, Waves, ScanSearch, TrendingUp, FlaskConical, ShieldCheck, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Farmers Welfare Hub | Jagruthi',
  description: 'Guidance on crop selection, sustainable practices, market trends, and direct market access for farmers by Jagruthi.',
};

const welfareServices = [
  {
    icon: Leaf,
    title: "Sustainable Farming Practices",
    description: "Make informed decisions for sustainable and profitable farming. Our guidance on optimal pesticide/fertilizer use, integrated pest management, soil health, and organic methods leverages insights from weather patterns, seasonal forecasts, your farm's water and soil conditions, and market trends. For the most personalized advice, please utilize our Smart Crop Planning tools and share your farm details via the Farmer Connect program.",
    subPractices: [
        { title: "Efficient Fertilizer Application", icon: FlaskConical, slug: "fertilizer-application" },
        { title: "Safe & Effective Pesticide Use", icon: ShieldCheck, slug: "pesticide-use" },
        { title: "Organic Farming Techniques", icon: Leaf, slug: "organic-farming" },
        { title: "Soil Health Management", icon: Layers, slug: "soil-health" },
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

const smartTools = [
  {
    slug: "weather-data",
    title: "Advanced Weather Data",
    icon: CloudSun,
    link: "/farmers-welfare/smart-crop-selection/weather-data",
  },
  {
    slug: "seasonal-forecast",
    title: "Seasonal Forecasts",
    icon: CalendarClock,
    link: "/farmers-welfare/smart-crop-selection/seasonal-forecast",
  },
  {
    slug: "water-resources",
    title: "Water Assessment",
    icon: Waves,
    link: "/farmers-welfare/smart-crop-selection/water-resources",
  },
  {
    slug: "soil-analysis",
    title: "Soil Analysis",
    icon: ScanSearch,
    link: "/farmers-welfare/smart-crop-selection/soil-analysis",
  },
  {
    slug: "market-trends",
    title: "Market Trends",
    icon: TrendingUp,
    link: "/farmers-welfare/smart-crop-selection/market-trends",
  },
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
                {service.subPractices && (
                    <div className="mt-4 pt-4 border-t border-border space-y-2">
                        <p className="text-sm font-semibold text-primary mb-2">Explore Specific Guidance:</p>
                        {service.subPractices.map(practice => (
                            <Button 
                                key={practice.slug} 
                                variant="outline" 
                                size="sm" 
                                className="w-full justify-start text-left hover:bg-accent/5 py-3 h-auto"
                                // onClick={() => console.log(`Navigate to details for ${practice.slug}`)} // Placeholder action
                            >
                                <practice.icon className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                                <span className="text-sm font-medium text-foreground">{practice.title}</span>
                            </Button>
                        ))}
                         <p className="text-xs text-muted-foreground mt-2 italic">(Detailed guidance pages coming soon)</p>
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

          {/* New Card for Smart Crop Planning Tools */}
          <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/30 h-full">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 group-hover:bg-accent/20 transition-colors">
                  <ClipboardList className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl font-headline text-accent">Smart Crop Planning Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-3 text-center">
              <p className="text-sm text-foreground/70 mb-4">
                Access data-driven insights for your farm. These tools consider factors like weather, soil, water, and market trends to help you plan effectively.
              </p>
              <div className="space-y-2">
                {smartTools.map(tool => (
                  <Link href={tool.link} passHref legacyBehavior key={tool.slug}>
                    <Button variant="ghost" className="w-full justify-start text-left hover:bg-accent/5 py-3 h-auto">
                      <tool.icon className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{tool.title}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/10 border-primary/30 shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary text-center">Get Personalized Advice</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-foreground/70 mb-6">
                For tailored guidance specific to your farm, crops, and local conditions, please share your details with us through our Farmer Connect program. Our experts will analyze your information, considering data from all available tools and your inputs, to provide personalized recommendations.
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
