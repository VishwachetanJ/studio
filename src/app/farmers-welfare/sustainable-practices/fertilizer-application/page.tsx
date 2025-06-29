
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, FlaskConical, Loader2, AlertTriangle, YoutubeIcon, BookOpenText, ListChecks, Languages } from 'lucide-react'; // Added Languages icon
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";
import { recommendFertilizers, type FertilizerRecommendationInput, type FertilizerRecommendationOutput } from "@/ai/flows/fertilizer-recommendation-flow";

// Define the form schema directly in the client component for react-hook-form
const formSchema = z.object({
  soilPH: z.coerce.number().min(0).max(14).describe('The pH level of the soil (e.g., 6.5).'),
  soilOrganicCarbonPercent: z.coerce.number().min(0).max(100).describe('The percentage of organic carbon in the soil (e.g., 0.7).'),
  soilNitrogenKgHa: z.coerce.number().min(0).describe('Available Nitrogen (N) in the soil in kg/ha (e.g., 250).'),
  soilPhosphorusKgHa: z.coerce.number().min(0).describe('Available Phosphorus (P) in the soil in kg/ha (e.g., 20).'),
  soilPotassiumKgHa: z.coerce.number().min(0).describe('Available Potassium (K) in the soil in kg/ha (e.g., 180).'),
  soilTexture: z.string().min(1,{message: "Soil texture is required."}).describe('The texture of the soil (e.g., "Loamy", "Sandy Clay", "Black Cotton Soil").'),
  cropName: z.string().min(1, {message: "Crop name is required."}).describe('The name of the crop being cultivated (e.g., "Rice", "Cotton", "Tomato").'),
  currentSeason: z.enum(["Kharif", "Rabi", "Zaid", "Other"], {required_error: "Please select a season."}).describe('The current growing season (e.g., "Kharif (June-Oct)", "Rabi (Nov-Mar)").'),
  waterAvailability: z.enum(["Abundant", "Moderate", "Scarce"], {required_error: "Please select water availability."}).describe('The general availability of water for irrigation (e.g., "Abundant (Canal/Borewell)", "Scarce (Rain-fed)").'),
  farmLocation: z.string().optional().describe('Optional: The general location of the farm (e.g., "Warangal, Telangana, India") for regional considerations.'),
  farmSizeAcres: z.coerce.number().min(0).optional().describe('Optional: The size of the farm in acres. This helps contextualize the scale.'),
  targetLanguage: z.string({required_error: "Please select a language."}).optional().default("English"),
});

const indianLanguages = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "हिन्दी (Hindi)" },
  { value: "Telugu", label: "తెలుగు (Telugu)" },
  { value: "Tamil", label: "தமிழ் (Tamil)" },
  { value: "Kannada", label: "ಕನ್ನಡ (Kannada)" },
  { value: "Malayalam", label: "മലയാളം (Malayalam)" },
  { value: "Marathi", label: "मराठी (Marathi)" },
  { value: "Bengali", label: "বাংলা (Bengali)" },
  { value: "Gujarati", label: "ગુજરાતી (Gujarati)" },
  { value: "Punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { value: "Odia", label: "ଓଡ଼ିଆ (Odia)" },
  { value: "Assamese", label: "অসমীয়া (Assamese)" },
];


export default function FertilizerApplicationPage() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<FertilizerRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FertilizerRecommendationInput>({ 
    resolver: zodResolver(formSchema), 
    defaultValues: {
      soilPH: 7.0,
      soilOrganicCarbonPercent: 0.5,
      soilNitrogenKgHa: 100,
      soilPhosphorusKgHa: 10,
      soilPotassiumKgHa: 100,
      soilTexture: "",
      cropName: "",
      currentSeason: undefined,
      waterAvailability: undefined,
      farmLocation: "",
      farmSizeAcres: undefined,
      targetLanguage: "English",
    },
  });

  async function onSubmit(values: FertilizerRecommendationInput) {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const result = await recommendFertilizers(values);
      setRecommendation(result);
      toast({
        title: "Recommendation Generated",
        description: "AI has provided fertilizer advice and learning suggestions based on your inputs.",
      });
    } catch (e) {
      console.error(e);
      let message = "Failed to get fertilizer recommendations. Please try again.";
      if (e instanceof Error) {
        message = e.message;
      }
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!isMounted) {
    return null;
  }

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
          <FlaskConical className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Efficient Fertilizer Application
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Input your farm and crop details to receive AI-powered fertilizer recommendations, learning tips, and best practices tailored to your specific needs. Remember to scale application rates to your specific land area. Select your preferred language for the advice.
          </p>
        </div>

        <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Farm & Crop Details</CardTitle>
            <CardDescription>Provide accurate information for the best recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="targetLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Languages className="mr-2 h-5 w-5 text-primary"/>Preferred Language for Advice</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {indianLanguages.map(lang => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="soilPH"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soil pH Level</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soilOrganicCarbonPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soil Organic Carbon (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soilNitrogenKgHa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Nitrogen (N) (kg/ha)</FormLabel>
                        <FormControl>
                          <Input type="number" step="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soilPhosphorusKgHa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Phosphorus (P) (kg/ha)</FormLabel>
                        <FormControl>
                          <Input type="number" step="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soilPotassiumKgHa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Potassium (K) (kg/ha)</FormLabel>
                        <FormControl>
                          <Input type="number" step="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soilTexture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soil Texture</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Loamy, Clayey, Sandy" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cropName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Rice, Cotton, Tomato" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="currentSeason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Growing Season</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select season" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Kharif">Kharif (e.g., June-Oct)</SelectItem>
                            <SelectItem value="Rabi">Rabi (e.g., Nov-Mar)</SelectItem>
                            <SelectItem value="Zaid">Zaid (e.g., Apr-Jun)</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="waterAvailability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Water Availability</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select water availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Abundant">Abundant (e.g., Canal, Plentiful Borewell)</SelectItem>
                            <SelectItem value="Moderate">Moderate (e.g., Tank, Timed Irrigation)</SelectItem>
                            <SelectItem value="Scarce">Scarce (e.g., Rain-fed, Limited Borewell)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="farmSizeAcres"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Size (Acres) (Optional)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="e.g., 5.5" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="farmLocation"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>Farm Location (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Village, Mandal, District, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Get Recommendations
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-12 text-center">
            <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
            <p className="mt-4 text-lg text-foreground/70">Generating recommendations, please wait...</p>
          </div>
        )}

        {error && (
          <Card className="mt-12 w-full max-w-3xl mx-auto shadow-lg border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center"><AlertTriangle className="mr-2"/> Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {recommendation && !isLoading && (
          <div className="mt-12 space-y-8">
            <Card className="w-full max-w-3xl mx-auto shadow-lg border-green-500/50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-700">AI Fertilizer Recommendation</CardTitle>
                <CardDescription>Advice generated in: {form.getValues("targetLanguage") || "English"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><ListChecks className="mr-2 h-6 w-6 text-primary"/>Specific Recommendations:</h3>
                  {recommendation.recommendations.length > 0 ? (
                    <div className="space-y-4">
                      {recommendation.recommendations.map((rec, index) => (
                        <Card key={index} className="bg-muted/30 p-4">
                          <CardTitle className="text-lg text-accent mb-1">{rec.nutrient}</CardTitle>
                          <p><strong className="text-foreground/80">Fertilizer:</strong> {rec.fertilizerType}</p>
                          <p><strong className="text-foreground/80">Rate:</strong> {rec.applicationRate}</p>
                          <p><strong className="text-foreground/80">Timing:</strong> {rec.timing}</p>
                          <p><strong className="text-foreground/80">Method:</strong> {rec.method}</p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-foreground/70">No specific fertilizer recommendations were generated. Please check the general advice.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">General Advice:</h3>
                  <p className="text-foreground/70 whitespace-pre-line">{recommendation.generalAdvice}</p>
                </div>

                {recommendation.warnings && (
                  <div>
                    <h3 className="text-xl font-semibold text-destructive mb-2 flex items-center"><AlertTriangle className="mr-2 h-5 w-5"/>Warnings:</h3>
                    <p className="text-destructive/90 whitespace-pre-line">{recommendation.warnings}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="w-full max-w-3xl mx-auto shadow-lg border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">Further Learning & Best Practices</CardTitle>
                 <CardDescription>Advice generated in: {form.getValues("targetLanguage") || "English"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {recommendation.suggestedVideoTopics && recommendation.suggestedVideoTopics.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><YoutubeIcon className="mr-2 h-6 w-6 text-red-600"/>Suggested Video Topics:</h3>
                    <ul className="list-disc list-inside space-y-2 pl-4 text-foreground/70">
                      {recommendation.suggestedVideoTopics.map((topic, index) => (
                        <li key={index}>{topic} <span className="text-xs text-muted-foreground">(Search on YouTube/Agri platforms)</span></li>
                      ))}
                    </ul>
                  </div>
                )}

                {recommendation.keyPracticeMethods && recommendation.keyPracticeMethods.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><BookOpenText className="mr-2 h-6 w-6 text-green-600"/>Key Practice Methods to Explore:</h3>
                    <ul className="list-disc list-inside space-y-2 pl-4 text-foreground/70">
                      {recommendation.keyPracticeMethods.map((method, index) => (
                        <li key={index}>{method}</li>
                      ))}
                    </ul>
                  </div>
                )}
                 {(!recommendation.suggestedVideoTopics || recommendation.suggestedVideoTopics.length === 0) &&
                  (!recommendation.keyPracticeMethods || recommendation.keyPracticeMethods.length === 0) && (
                    <p className="text-foreground/70">No specific learning suggestions were generated for this query.</p>
                 )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

    