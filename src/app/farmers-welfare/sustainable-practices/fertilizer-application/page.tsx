
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next'; // Keep for potential future use if metadata becomes dynamic
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, FlaskConical, Loader2, AlertTriangle } from 'lucide-react';
import { useForm, Controller } from "react-hook-form";
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
import { recommendFertilizers, FertilizerRecommendationInputSchema, type FertilizerRecommendationInput, type FertilizerRecommendationOutput } from "@/ai/flows/fertilizer-recommendation-flow";

// Metadata object (commented out as it's for server components, but good for reference)
// export const metadata: Metadata = {
//   title: 'Efficient Fertilizer Application | Farmers Welfare | Jagruthi',
//   description: 'Get AI-powered fertilizer recommendations based on your farm\'s specific conditions.',
// };

const formSchema = FertilizerRecommendationInputSchema; // Use the schema from the flow

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
        description: "AI has provided fertilizer advice based on your inputs.",
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
    return null; // Or a loading skeleton
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
            Input your farm and crop details to receive AI-powered fertilizer recommendations tailored to your specific needs, considering soil health, crop type, season, and water availability.
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="soilPH"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soil pH Level</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
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
                          <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
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
                          <Input type="number" step="1" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
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
                          <Input type="number" step="1" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
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
                          <Input type="number" step="1" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
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
                    name="farmLocation"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
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
                  Get Fertilizer Recommendation
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
          <Card className="mt-12 w-full max-w-3xl mx-auto shadow-lg border-green-500/50">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">AI Fertilizer Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">Specific Recommendations:</h3>
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
                  <h3 className="text-xl font-semibold text-destructive mb-2">Warnings:</h3>
                  <p className="text-destructive/90 whitespace-pre-line">{recommendation.warnings}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}

