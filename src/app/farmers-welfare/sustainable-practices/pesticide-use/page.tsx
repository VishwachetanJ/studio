
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ShieldCheck, Loader2, AlertTriangle, YoutubeIcon, BookOpenText, ListChecks, SprayCan } from 'lucide-react';
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
import { recommendPesticideOrAlternatives, type PesticideRecommendationInput, type PesticideRecommendationOutput } from "@/ai/flows/pesticide-recommendation-flow";

const formSchema = z.object({
  cropName: z.string().min(1, {message: "Crop name is required."}),
  soilType: z.string().min(1, {message: "Soil type is required."}),
  pestOrDiseaseName: z.string().min(1, {message: "Pest or disease name/description is required."}),
  symptomsObserved: z.string().min(10, {message: "Symptoms description must be at least 10 characters."}),
  infestationSeverity: z.enum(["Low", "Moderate", "High", "Very High"], {required_error: "Please select severity."}),
  previousPesticideUsage: z.string().optional(),
  farmLocation: z.string().optional(),
});


export default function PesticideUsePage() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<PesticideRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<PesticideRecommendationInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      soilType: "",
      pestOrDiseaseName: "",
      symptomsObserved: "",
      infestationSeverity: undefined,
      previousPesticideUsage: "",
      farmLocation: "",
    },
  });

  async function onSubmit(values: PesticideRecommendationInput) {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);
    try {
      const result = await recommendPesticideOrAlternatives(values);
      setRecommendation(result);
      toast({
        title: "Pest/Disease Management Advice Generated",
        description: "AI has provided recommendations based on your inputs.",
      });
    } catch (e) {
      console.error(e);
      let message = "Failed to get pest/disease management advice. Please try again.";
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

  const renderNonPesticideMethods = (methods: PesticideRecommendationOutput['nonPesticideRecommendations'] | undefined) => {
    if (!methods || methods.length === 0) {
      return <p className="text-foreground/70">No specific non-pesticide methods were suggested for this scenario, or pesticide use is advised. Check assessment.</p>;
    }
    return (
      <div>
        <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><ListChecks className="mr-2 h-6 w-6 text-green-600"/>Non-Pesticide Control Methods:</h3>
        <div className="space-y-4">
          {methods.map((method, index) => (
            <Card key={index} className="bg-green-500/5 p-4 border-green-500/30">
              <CardTitle className="text-lg text-green-700 mb-1">{method.methodName}</CardTitle>
              <p><strong className="text-foreground/80">Description:</strong> {method.description}</p>
              <p><strong className="text-foreground/80">Effectiveness:</strong> {method.effectiveness}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  const renderPesticideRecommendations = (pesticides: PesticideRecommendationOutput['pesticideRecommendations'] | undefined) => {
    if (!pesticides || pesticides.length === 0) {
       return <p className="text-foreground/70">No specific chemical pesticides were recommended. Focus on non-pesticide methods or check assessment.</p>;
    }
    return (
      <div>
        <h3 className="text-xl font-semibold text-primary mb-3 flex items-center"><SprayCan className="mr-2 h-6 w-6 text-orange-600"/>Pesticide Recommendations (If Necessary):</h3>
        <div className="space-y-4">
          {pesticides.map((p, index) => (
            <Card key={index} className="bg-orange-500/5 p-4 border-orange-500/30">
              <CardTitle className="text-lg text-orange-700 mb-1">{p.pesticideName}</CardTitle>
              <p><strong className="text-foreground/80">Active Ingredient:</strong> {p.activeIngredient}</p>
              <p><strong className="text-foreground/80">Dosage:</strong> {p.dosage}</p>
              <p><strong className="text-foreground/80">Application Timing:</strong> {p.applicationTiming}</p>
              <p><strong className="text-foreground/80">Application Method:</strong> {p.applicationMethod}</p>
              {p.waitingPeriod && <p><strong className="text-foreground/80">Waiting Period:</strong> {p.waitingPeriod}</p>}
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
          <ShieldCheck className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Safe &amp; Effective Pesticide Use
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Get AI-powered advice on managing crop pests and diseases, including whether to use pesticides or explore non-pesticide alternatives, with a focus on safety and Integrated Pest Management (IPM).
          </p>
        </div>

        <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/30">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Pest/Disease Information</CardTitle>
            <CardDescription>Provide details about the issue for tailored advice.</CardDescription>
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
                          <Input placeholder="e.g., Cotton, Tomato" {...field} />
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
                        <FormLabel>Soil Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Black Cotton Soil, Red Loam" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="pestOrDiseaseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pest/Disease Name (or main problem)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Aphids, Powdery Mildew, Bollworm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="symptomsObserved"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symptoms Observed</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe what you see on the plants, e.g., yellowing leaves, holes in fruit, white spots..." {...field} rows={4}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="infestationSeverity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Infestation/Infection Severity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low (Few plants affected, minor symptoms)</SelectItem>
                          <SelectItem value="Moderate">Moderate (Noticeable spread, some damage)</SelectItem>
                          <SelectItem value="High">High (Widespread, significant damage/yield loss potential)</SelectItem>
                          <SelectItem value="Very High">Very High (Severe infestation, critical)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousPesticideUsage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Pesticide Usage (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Sprayed 'Monocrotophos' 10 days ago, no effect." {...field} rows={2}/>
                      </FormControl>
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
                        <Input placeholder="e.g., Village, District for regional context" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Get Pest Management Advice
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-12 text-center">
            <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
            <p className="mt-4 text-lg text-foreground/70">Generating advice, please wait...</p>
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
            <Card className="w-full max-w-4xl mx-auto shadow-lg border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">AI Pest &amp; Disease Management Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Overall Assessment:</h3>
                  <p className="text-foreground/70 whitespace-pre-line bg-muted/50 p-3 rounded-md">{recommendation.assessment}</p>
                </div>
                
                {renderNonPesticideMethods(recommendation.nonPesticideRecommendations)}
                {renderPesticideRecommendations(recommendation.pesticideRecommendations)}

                {recommendation.safetyPrecautions && recommendation.safetyPrecautions.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-destructive mb-2 flex items-center"><AlertTriangle className="mr-2 h-5 w-5"/>Crucial Safety Precautions:</h3>
                    <ul className="list-disc list-inside space-y-1 pl-4 text-destructive/90 bg-destructive/5 p-3 rounded-md">
                      {recommendation.safetyPrecautions.map((precaution, index) => (
                        <li key={index}>{precaution}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {recommendation.environmentalConsiderations && recommendation.environmentalConsiderations.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Environmental Considerations:</h3>
                    <ul className="list-disc list-inside space-y-1 pl-4 text-foreground/70 bg-muted/50 p-3 rounded-md">
                      {recommendation.environmentalConsiderations.map((consideration, index) => (
                        <li key={index}>{consideration}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="w-full max-w-4xl mx-auto shadow-lg border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">Further Learning &amp; Practices (Pest/Disease Management)</CardTitle>
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

