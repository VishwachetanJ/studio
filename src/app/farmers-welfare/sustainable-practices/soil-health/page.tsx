
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Layers, Loader2, AlertTriangle, YoutubeIcon, BookOpenText, ListChecks } from 'lucide-react';
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
import { recommendSoilHealthPractices, type SoilHealthRecommendationInput, type SoilHealthRecommendationOutput } from "@/ai/flows/soil-health-management-flow";

const formSchema = z.object({
  cropName: z.string().min(1, {message: "Crop name is required."}).describe('The name of the crop being cultivated or planned (e.g., "Maize", "Cotton", "Groundnut").'),
  soilType: z.string().min(1,{message: "Soil type is required."}).describe('The predominant texture or type of the soil (e.g., "Sandy Loam", "Clayey", "Red Lateritic Soil").'),
  cropStage: z.enum(["Pre-Planting", "Active Growth", "Post-Harvest", "Fallow Period"], {required_error: "Please select a crop stage."}).describe('The current or relevant stage of the crop cycle.'),
  specificConcerns: z.string().optional().describe('Optional: Any specific soil health concerns (e.g., "Soil compaction", "Low organic matter", "Water erosion", "Salinity issues").'),
  waterAvailability: z.enum(["Abundant", "Moderate", "Scarce"], {required_error: "Please select water availability."}).describe('General water availability for the farm, as it influences certain soil practices.'),
  farmLocation: z.string().optional().describe('Optional: The general location of the farm for regional considerations.'),
});


export default function SoilHealthPage() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<SoilHealthRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<SoilHealthRecommendationInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      soilType: "",
      cropStage: undefined,
      specificConcerns: "",
      waterAvailability: undefined,
      farmLocation: "",
    },
  });

  async function onSubmit(values: SoilHealthRecommendationInput) {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const result = await recommendSoilHealthPractices(values);
      setRecommendation(result);
      toast({
        title: "Soil Health Recommendation Generated",
        description: "AI has provided soil health advice based on your inputs.",
      });
    } catch (e) {
      console.error(e);
      let message = "Failed to get soil health recommendations. Please try again.";
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

  const renderTechniques = (techniques: SoilHealthRecommendationOutput['preCultivationTechniques'] | undefined, title: string) => {
    if (!techniques || techniques.length === 0) {
      return <p className="text-foreground/70">No specific {title.toLowerCase()} were generated for this scenario.</p>;
    }
    return (
      <div>
        <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><ListChecks className="mr-2 h-6 w-6 text-primary"/>{title}:</h3>
        <div className="space-y-4">
          {techniques.map((rec, index) => (
            <Card key={index} className="bg-muted/30 p-4">
              <CardTitle className="text-lg text-accent mb-1">{rec.techniqueName}</CardTitle>
              <p><strong className="text-foreground/80">Description:</strong> {rec.description}</p>
              <p><strong className="text-foreground/80">Implementation:</strong> {rec.implementationDetails}</p>
              <p><strong className="text-foreground/80">Relevance:</strong> {rec.relevance}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  };


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
          <Layers className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Soil Health Management
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Get AI-powered advice on pre and post-cultivation techniques, in-crop practices like mulching, and overall soil health improvement tailored to your farm.
          </p>
        </div>

        <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Farm & Crop Details for Soil Health</CardTitle>
            <CardDescription>Provide accurate information for tailored recommendations.</CardDescription>
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
                        <FormLabel>Crop Name/Planned Crop</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Maize, Cotton" {...field} />
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
                        <FormLabel>Predominant Soil Type/Texture</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Sandy Loam, Clayey" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="cropStage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current/Relevant Crop Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select crop stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Pre-Planting">Pre-Planting</SelectItem>
                            <SelectItem value="Active Growth">Active Growth</SelectItem>
                            <SelectItem value="Post-Harvest">Post-Harvest</SelectItem>
                            <SelectItem value="Fallow Period">Fallow Period</SelectItem>
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
                            <SelectItem value="Abundant">Abundant</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Scarce">Scarce</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specificConcerns"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Specific Soil Health Concerns (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Soil compaction, Low organic matter, Erosion" {...field} rows={3} />
                        </FormControl>
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
                          <Input placeholder="e.g., Village, District, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Get Soil Health Advice
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-12 text-center">
            <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
            <p className="mt-4 text-lg text-foreground/70">Generating soil health advice, please wait...</p>
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
                <CardTitle className="text-2xl text-green-700">AI Soil Health Management Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {renderTechniques(recommendation.preCultivationTechniques, "Pre-Cultivation Techniques")}
                {renderTechniques(recommendation.duringCropTechniques, "During-Crop Techniques")}
                {renderTechniques(recommendation.postCultivationTechniques, "Post-Cultivation Techniques")}

                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">General Soil Health Advice:</h3>
                  <p className="text-foreground/70 whitespace-pre-line">{recommendation.generalSoilHealthAdvice}</p>
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
                <CardTitle className="text-2xl text-blue-700">Further Learning & Practices (Soil Health)</CardTitle>
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

