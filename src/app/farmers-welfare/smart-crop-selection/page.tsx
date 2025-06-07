
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CloudSun, CalendarClock, Waves, ScanSearch, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Smart Crop Selection Tools | Farmers Welfare | Jagruthi',
  description: 'Access advanced tools for crop planning including weather data, seasonal forecasts, water resource assessment, soil analysis, and market trends.',
};

const cropSelectionTools = [
  {
    slug: "weather-data",
    title: "Advanced Weather Data",
    description: "Access real-time and historical weather data from ISRO, Google Weather, and other meteorological sources.",
    icon: CloudSun,
  },
  {
    slug: "seasonal-forecast",
    title: "Seasonal Weather Forecasts",
    description: "Utilize long-term seasonal forecasts to plan crop cycles and mitigate climate risks.",
    icon: CalendarClock,
  },
  {
    slug: "water-resources",
    title: "Water Resource Assessment",
    description: "Analyze water availability from various sources (borewell, canal, rain-fed) for efficient irrigation.",
    icon: Waves,
  },
  {
    slug: "soil-analysis",
    title: "Soil Type & Health Analysis",
    description: "Understand your soil's composition and health to choose suitable crops and optimize nutrient management.",
    icon: ScanSearch,
  },
  {
    slug: "market-trends",
    title: "Market Demand & Trend Analysis",
    description: "Analyze global/Indian market data and e-commerce trends to predict product demand and improve profitability.",
    icon: TrendingUp,
  },
];

export default function SmartCropSelectionHubPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8">
          <Link href="/farmers-welfare" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Farmers Welfare Hub
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Smart Crop Selection Tools
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Empowering your farming decisions with data-driven insights. Select a tool below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cropSelectionTools.map((tool) => (
            <Link key={tool.slug} href={`/farmers-welfare/smart-crop-selection/${tool.slug}`} passHref legacyBehavior>
              <a className="block group">
                <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 border-accent/30">
                  <CardHeader className="text-center items-center">
                     <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 group-hover:bg-accent/20 transition-colors">
                        <tool.icon className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="font-headline text-xl text-primary group-hover:text-accent transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <p className="text-sm text-foreground/70">{tool.description}</p>
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
