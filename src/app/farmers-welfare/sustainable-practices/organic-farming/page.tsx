
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Leaf, Loader2, AlertTriangle, YoutubeIcon, BookOpenText, ListChecks } from 'lucide-react';
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
import { recommendOrganicPractices, type OrganicRecommendationInput, type OrganicRecommendationOutput } from "@/ai/flows/organic-farming-recommendation-flow";

const formSchema = z.object({
  cropName: z.string().min(1, {message: "Crop name is required."}).describe('The name of the crop being cultivated (e.g., "Tomato", "Spinach", "Wheat").'),
  soilType: z.string().min(1,{message: "Soil type is required."}).describe('The texture or type of the soil (e.g., "Loamy", "Sandy Clay", "Alluvial").'),
  soilOrganicMatterPercent: z.coerce.number().min(0).max(100).optional().describe('Optional: The percentage of organic matter in the soil (e.g., 1.5).'),
  currentSeason: z.enum(["Kharif", "Rabi", "Zaid", "Other"], {required_error: "Please select a season."}).describe('The current growing season.'),
  waterAvailability: z.enum(["Abundant", "Moderate", "Scarce"], {required_error: "Please select water availability."}).describe('The general availability of water for irrigation.'),
  specificChallenges: z.string().optional().describe('Optional: Any specific challenges faced (e.g., "High pest pressure for aphids", "Low soil fertility", "Weed control issues").'),
  farmLocation: z.string().optional().describe('Optional: The general location of the farm for regional considerations.'),
});


export default function OrganicFarmingPage() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<OrganicRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<OrganicRecommendationInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      soilType: "",
      soilOrganicMatterPercent: undefined,
      currentSeason: undefined,
      waterAvailability: undefined,
      specificChallenges: "",
      farmLocation: "",
    },
  });

  async function onSubmit(values: OrganicRecommendationInput) {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const result = await recommendOrganicPractices(values);
      setRecommendation(result);
      toast({
        title: "Organic Recommendation Generated",
        description: "AI has provided organic farming advice based on your inputs.",
      });
    } catch (e) {
      console.error(e);
      let message = "Failed to get organic farming recommendations. Please try again.";
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
          <Leaf className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Organic Farming Techniques
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Get AI-powered advice on organic inputs, pest control, soil health, and best practices for your farm.
          </p>
        </div>

        <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Farm & Crop Details for Organic Advice</CardTitle>
            <CardDescription>Provide accurate information for tailored organic recommendations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="cropName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Tomato, Spinach" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="soilType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soil Type/Texture</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Loamy, Sandy Clay" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="soilOrganicMatterPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soil Organic Matter (%) (Optional)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="e.g., 1.5" {...field} />
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
                      <FormItem>
                        <FormLabel>Farm Location (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Village, District, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specificChallenges"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Specific Challenges (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., High pest pressure for aphids, Low soil fertility, Weed control issues" {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Get Organic Recommendations
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-12 text-center">
            <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
            <p className="mt-4 text-lg text-foreground/70">Generating organic recommendations, please wait...</p>
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
            <Card className="w-full max-w-4xl mx-auto shadow-lg border-green-500/50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-700">AI Organic Farming Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><ListChecks className="mr-2 h-6 w-6 text-primary"/>Organic Input Recommendations:</h3>
                  {recommendation.organicInputRecommendations.length > 0 ? (
                    <div className="space-y-4">
                      {recommendation.organicInputRecommendations.map((rec, index) => (
                        <Card key={index} className="bg-muted/30 p-4">
                          <CardTitle className="text-lg text-accent mb-1">{rec.inputName} ({rec.inputType})</CardTitle>
                          <p><strong className="text-foreground/80">Application Rate:</strong> {rec.applicationRate}</p>
                          <p><strong className="text-foreground/80">Timing:</strong> {rec.timing}</p>
                          <p><strong className="text-foreground/80">Method:</strong> {rec.method}</p>
                          <p><strong className="text-foreground/80">Benefits:</strong> {rec.benefits}</p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-foreground/70">No specific organic input recommendations were generated.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Organic Pest & Disease Management:</h3>
                  {recommendation.pestAndDiseaseManagement.length > 0 ? (
                     <div className="space-y-4">
                      {recommendation.pestAndDiseaseManagement.map((rec, index) => (
                        <Card key={index} className="bg-muted/30 p-4">
                          <CardTitle className="text-lg text-accent mb-1">{rec.problemType}</CardTitle>
                          <p><strong className="text-foreground/80">Solution:</strong> {rec.organicSolution}</p>
                          <p><strong className="text-foreground/80">Preparation & Application:</strong> {rec.preparationAndApplication}</p>
                          <p><strong className="text-foreground/80">Timing/Frequency:</strong> {rec.timingOrFrequency}</p>
                        </Card>
                      ))}
                    </div>
                  ) : (
                     <p className="text-foreground/70">No specific pest and disease management advice generated. This might be due to the crop type or lack of specified challenges.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Soil Health Improvement Practices:</h3>
                   {recommendation.soilHealthImprovementPractices.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 pl-4 text-foreground/70">
                        {recommendation.soilHealthImprovementPractices.map((practice, index) => (
                        <li key={index}>{practice}</li>
                        ))}
                    </ul>
                    ) : (
                        <p className="text-foreground/70">No specific soil health practices were generated.</p>
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
            
            <Card className="w-full max-w-4xl mx-auto shadow-lg border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">Further Learning & Best Practices (Organic)</CardTitle>
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
