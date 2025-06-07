
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Waves, Edit3, BarChartHorizontalBig } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react"; // Added useEffect and useState

const waterSourcesOptions = [
  { id: "borewell", label: "Borewell (Depth, Yield)" },
  { id: "canal", label: "Canal Irrigation (Frequency, Duration)" },
  { id: "tank", label: "Tank Irrigation (Capacity, Current Level)" },
  { id: "rain_fed", label: "Purely Rain-fed" },
  { id: "river_stream", label: "River/Stream (Flow Rate)" },
  { id: "other", label: "Other (Specify)" },
];

export default function WaterResourcesPage() {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    location: "",
    sources: [] as string[],
    otherSourceDetails: "",
    notes: "",
  });
  const [isMounted, setIsMounted] = useState(false); // Added isMounted state

  useEffect(() => { // Added useEffect to set isMounted
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (sourceId: string) => {
    setFormData(prev => {
      const newSources = prev.sources.includes(sourceId)
        ? prev.sources.filter(s => s !== sourceId)
        : [...prev.sources, sourceId];
      return { ...prev, sources: newSources };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement backend API call for data submission
    console.log("Water Resource Data:", formData);
    toast({
      title: "Data Submitted (Demo)",
      description: "Your water resource information has been logged. Analysis features are under development.",
    });
  };

  if (!isMounted) { // Added check for isMounted
    return null; // Or a loading spinner
  }

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
          <Waves className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Water Resource Assessment
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Assess water availability from your farm's sources to plan irrigation schedules and select water-efficient crops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center"><Edit3 className="mr-2 h-6 w-6"/> Input Your Farm's Water Data</CardTitle>
              <CardDescription>Provide details about your water sources for analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="location">Farm Location / Survey No.</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g., Near Anytown, Survey No. 123" />
                </div>
                <div>
                  <Label>Available Water Sources (Select all that apply)</Label>
                  <div className="space-y-2 mt-2">
                    {waterSourcesOptions.map(source => (
                      <div key={source.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={source.id} 
                          checked={formData.sources.includes(source.id)} 
                          onCheckedChange={() => handleCheckboxChange(source.id)}
                        />
                        <Label htmlFor={source.id} className="font-normal">{source.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                {formData.sources.includes("other") && (
                  <div>
                    <Label htmlFor="otherSourceDetails">Specify Other Source</Label>
                    <Input id="otherSourceDetails" name="otherSourceDetails" value={formData.otherSourceDetails} onChange={handleInputChange} placeholder="e.g., Community Well" />
                  </div>
                )}
                <div>
                  <Label htmlFor="notes">Additional Notes / Details</Label>
                  <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="e.g., Borewell dried up last summer, Canal water expected by July..." rows={3}/>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Submit Data for Analysis</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-accent/30">
            <CardHeader>
              <CardTitle className="text-2xl text-accent flex items-center"><BarChartHorizontalBig className="mr-2 h-6 w-6"/> Water Availability Analysis (Placeholder)</CardTitle>
              <CardDescription>Insights based on your data and regional information will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary mb-1">Estimated Water Budget:</h4>
                <p className="text-sm text-foreground/70">Calculations based on your inputs will be shown here.</p>
                <p className="text-xs text-muted-foreground mt-1">(e.g., Total available water, deficit/surplus for planned crops)</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary mb-1">Irrigation Recommendations:</h4>
                <p className="text-sm text-foreground/70">Suggestions for optimal irrigation schedules and techniques.</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-primary mb-1">Crop Suitability (Water Perspective):</h4>
                <p className="text-sm text-foreground/70">Recommendations for crops based on water availability.</p>
              </div>
              <p className="text-sm text-center mt-6 text-primary font-semibold">
                Advanced analysis and personalized recommendations are under development.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
