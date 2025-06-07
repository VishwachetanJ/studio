
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CalendarClock, LineChart, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Seasonal Weather Forecasts | Smart Crop Selection | Jagruthi',
  description: 'Utilize long-term seasonal weather forecasts for strategic crop planning and risk mitigation.',
};

export default function SeasonalForecastPage() {
  // Placeholder data
  const sampleForecast = {
    season: "Upcoming Kharif Season (June - Sep)",
    outlook: "Expected to be slightly above average rainfall. Temperatures likely to be normal to slightly above normal.",
    confidence: "Medium",
    recommendations: [
      "Consider water-intensive crops if irrigation is assured.",
      "Prepare for potential heat stress during mid-season.",
      "Monitor short-term forecasts closely for planting windows.",
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8">
          <Link href="/farmers-welfare/smart-crop-selection" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Smart Crop Selection
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <CalendarClock className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Seasonal Weather Forecasts
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Plan your agricultural activities with insights from long-term seasonal predictions to optimize crop cycles and manage climate-related risks.
          </p>
        </div>

        <Card className="shadow-lg border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Forecast for: {sampleForecast.season}</CardTitle>
            <CardDescription>Confidence Level: {sampleForecast.confidence} (Placeholder Data)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-accent mb-2">Overall Outlook:</h3>
              <p className="text-foreground/70">{sampleForecast.outlook}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-accent mb-2">Key Recommendations:</h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/70">
                {sampleForecast.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center my-6">
                <LineChart className="h-12 w-12 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Seasonal Trend Chart Area (e.g., Rainfall Probability, Temperature Anomalies)</p>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-md text-yellow-700">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <h4 className="font-bold">Disclaimer:</h4>
                  <p className="text-sm">
                    Seasonal forecasts provide a general outlook and are subject to change. Always combine this information with local observations and short-term weather updates for final decision-making.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-center mt-4 text-primary font-semibold">
              Integration with live forecast models and detailed regional predictions is under development.
            </p>
            {/* TODO: Implement backend API calls to fetch real seasonal forecast data */}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
