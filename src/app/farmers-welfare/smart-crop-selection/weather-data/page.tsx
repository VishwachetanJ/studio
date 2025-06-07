
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CloudSun, Thermometer, Wind, Droplets, BarChartBig } from 'lucide-react'; // Added Droplets
// TODO: Import charting libraries if needed, e.g., Recharts for Shadcn Charts

export const metadata: Metadata = {
  title: 'Advanced Weather Data | Smart Crop Selection | Jagruthi',
  description: 'Access and analyze real-time and historical weather data for informed crop planning.',
};

export default function WeatherDataPage() {
  // Placeholder data - In a real app, this would come from an API
  const sampleWeatherData = {
    current: { location: "Your Farm Area", temp: "28°C", humidity: "75%", wind: "10 km/h NW", condition: "Partly Cloudy" },
    historical: [
      { month: "Jan", avgTemp: 22, rainfall: 5 },
      { month: "Feb", avgTemp: 25, rainfall: 3 },
      // ... more data
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
          <CloudSun className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Advanced Weather Data
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Access clear and actionable weather information, aiming for the utility and comprehensiveness found in leading mobile weather apps and services like Google Weather. We plan to integrate data from reliable meteorological sources, including ISRO. By utilizing your device's location (with permission), we can provide more precise local weather data, and we are always exploring ways to incorporate more granular data sources, potentially including insights from mobile device capabilities in the future.
          </p>
        </div>

        <Card className="shadow-lg border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Current Weather Conditions</CardTitle>
            <CardDescription>Real-time data for: {sampleWeatherData.current.location} (Placeholder)</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <Thermometer className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-lg">{sampleWeatherData.current.temp}</p>
              <p className="text-sm text-muted-foreground">Temperature</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <Wind className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-lg">{sampleWeatherData.current.wind}</p>
              <p className="text-sm text-muted-foreground">Wind</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <Droplets className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-lg">{sampleWeatherData.current.humidity}</p>
              <p className="text-sm text-muted-foreground">Humidity</p>
            </div>
             <div className="p-4 bg-muted/50 rounded-lg text-center">
              <CloudSun className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-lg">{sampleWeatherData.current.condition}</p>
              <p className="text-sm text-muted-foreground">Condition</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-8 shadow-lg border-accent/30">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">Historical Weather Data & Analysis</CardTitle>
            <CardDescription>Review past trends to understand climate patterns for your region. (Chart placeholder)</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for charts - You would use Shadcn/Recharts here */}
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <BarChartBig className="h-12 w-12 text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">Historical Weather Chart Area (e.g., Avg. Temp, Rainfall)</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Data visualization for rainfall, temperature trends, etc., would be displayed here.
            </p>
            <p className="text-sm text-center mt-4 text-primary font-semibold">
              Full data integration and interactive charts are under development.
            </p>
            {/* TODO: Implement backend API calls to real weather data and populate charts */}
          </CardContent>
        </Card>

      </main>
      <Footer />
    </div>
  );
}
