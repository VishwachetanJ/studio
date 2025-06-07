
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, DollarSign, ShoppingBag, Globe, Drumstick, Egg } from 'lucide-react'; // Added Drumstick and Egg
// Placeholder for chart component if you use Shadcn Charts
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const metadata: Metadata = {
  title: 'Market Demand & Trend Analysis | Smart Crop Selection | Jagruthi',
  description: 'Analyze market trends and demand for crops, poultry, and other agricultural products from various sources to make profitable choices.',
};

// Sample data - in a real app, this would come from an API connecting to a comprehensive global crop and livestock database
const sampleMarketData = [
  { crop: "Tomato (India)", currentPrice: 25, demandTrend: "High", forecast: "Stable to Rising", category: "Vegetable" },
  { crop: "Onion (India)", currentPrice: 30, demandTrend: "Medium", forecast: "Stable", category: "Vegetable" },
  { crop: "Chilli (India)", currentPrice: 120, demandTrend: "High", forecast: "Volatile", category: "Spice" },
  { crop: "Mango (Seasonal, India)", currentPrice: 80, demandTrend: "Seasonal High", forecast: "Peaking", category: "Fruit" },
  { crop: "Wheat (Global)", currentPrice: 20, demandTrend: "Medium", forecast: "Stable", category: "Grain" },
  { crop: "Corn/Maize (Global)", currentPrice: 18, demandTrend: "High", forecast: "Rising", category: "Grain" },
  { crop: "Soybeans (Global)", currentPrice: 45, demandTrend: "Medium", forecast: "Stable", category: "Legume" },
  { crop: "Coffee (Arabica, Global)", currentPrice: 250, demandTrend: "High", forecast: "Volatile", category: "Beverage Crop" },
  { crop: "Rice (Basmati, Export)", currentPrice: 90, demandTrend: "Medium", forecast: "Stable", category: "Grain" },
  { crop: "Potato (India)", currentPrice: 15, demandTrend: "High", forecast: "Stable", category: "Vegetable" },
  { crop: "Apple (Fuji, Global)", currentPrice: 150, demandTrend: "Medium", forecast: "Stable", category: "Fruit" },
  { crop: "Banana (Cavendish, Global)", currentPrice: 40, demandTrend: "High", forecast: "Stable", category: "Fruit" },
  { crop: "Cotton (Global)", currentPrice: 200, demandTrend: "Medium", forecast: "Volatile", category: "Fiber Crop" },
  { crop: "Sugarcane (India)", currentPrice: 3, demandTrend: "High", forecast: "Stable", category: "Cash Crop" },
  { crop: "Eggs (Dozen, India)", currentPrice: 60, demandTrend: "High", forecast: "Stable", category: "Poultry", icon: Egg },
  { crop: "Broiler Chicken (Live, India)", currentPrice: 110, demandTrend: "High", forecast: "Rising", category: "Poultry", icon: Drumstick },
  { crop: "Fish (Rohu, Farmed India)", currentPrice: 180, demandTrend: "Medium", forecast: "Stable", category: "Aquaculture" },
];

export default function MarketTrendsPage() {
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
          <TrendingUp className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Market Demand & Trend Analysis
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Stay ahead by analyzing current market prices, demand forecasts, and consumer trends for crops, poultry, and other agricultural products from local, national, global markets, and e-commerce platforms.
          </p>
        </div>

        <Card className="shadow-lg border-primary/30 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Current Market Snapshot</CardTitle>
            <CardDescription>
              Overview of key agricultural product prices and demand signals. The data below is illustrative; a full implementation would connect to live global market data for comprehensive analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold text-muted-foreground">Product</th>
                    <th className="text-right p-3 font-semibold text-muted-foreground">Avg. Price (₹/kg or Unit Est.)</th>
                    <th className="text-center p-3 font-semibold text-muted-foreground">Demand Trend</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground">Price Forecast</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleMarketData.map((item) => (
                    <tr key={item.crop} className="border-b hover:bg-muted/50">
                      <td className="p-3 flex items-center">
                        {item.icon && <item.icon className="h-4 w-4 mr-2 text-muted-foreground" />}
                        {item.crop}
                      </td>
                      <td className="text-right p-3">{item.currentPrice.toFixed(2)}</td>
                      <td className="text-center p-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${item.demandTrend === "High" ? "bg-green-100 text-green-700" : item.demandTrend === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                          {item.demandTrend}
                        </span>
                      </td>
                      <td className="p-3">{item.forecast}</td>
                      <td className="p-3 text-xs text-muted-foreground">{item.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* TODO: Implement API calls to fetch live market data from a comprehensive database */}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg border-accent/30">
                <CardHeader>
                    <CardTitle className="text-xl text-accent flex items-center"><ShoppingBag className="mr-2 h-5 w-5"/> E-commerce & Consumer Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-foreground/70">
                        Analysis of online sales data and consumer preferences from major e-commerce grocery platforms (like Swiggy Instamart, Zepto, Blinkit) and supermarket chains (such as Reliance, D-Mart, Walmart, Big Bazaar, More, Heritage, Rathnadeep) to identify niche markets, emerging demands (e.g., organic produce, exotic vegetables, poultry cuts, ready-to-cook non-veg meals, dairy products), and regional buying patterns.
                    </p>
                    <div className="mt-4 h-40 bg-muted/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">E-commerce Trend Chart Area</p>
                    </div>
                    {/* TODO: Fetch and display e-commerce trend data */}
                </CardContent>
            </Card>
            <Card className="shadow-lg border-accent/30">
                <CardHeader>
                    <CardTitle className="text-xl text-accent flex items-center"><Globe className="mr-2 h-5 w-5"/> Global & National Market Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-foreground/70">
                        Information on export opportunities, import/export policies, and broader agricultural commodity market movements for various food products, including grains, meats, and dairy.
                    </p>
                     <div className="mt-4 h-40 bg-muted/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Global Market Data Area</p>
                    </div>
                    {/* TODO: Integrate with global market data sources */}
                </CardContent>
            </Card>
        </div>
        
        <div className="text-center mt-12">
            <p className="text-md text-primary font-semibold">
                Comprehensive data integration, predictive analytics, and personalized advisory based on market intelligence for all agricultural products are under active development.
            </p>
        </div>

      </main>
      <Footer />
    </div>
  );
}

