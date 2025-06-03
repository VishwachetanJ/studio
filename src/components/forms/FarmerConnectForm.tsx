
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Sprout } from "lucide-react";

const waterSources = [
  { id: "borewell", label: "Borewell" },
  { id: "canal", label: "Canal Irrigation" },
  { id: "tank", label: "Tank Irrigation" },
  { id: "rain_fed", label: "Rain-fed" },
  { id: "river", label: "River/Stream" },
  { id: "other", label: "Other" },
] as const;

const farmerConnectFormSchema = z.object({
  farmerName: z.string().min(2, { message: "Farmer name must be at least 2 characters." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format." }),
  village: z.string().min(2, { message: "Village name is required." }),
  mandal: z.string().min(2, { message: "Mandal name is required." }),
  district: z.string().min(2, { message: "District name is required." }),
  farmSizeAcres: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().positive({ message: "Farm size must be a positive number." })
  ),
  primaryWaterSources: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one water source.",
  }),
  otherWaterSource: z.string().optional(),
  soilType: z.string().optional(),
  vegetablesGrown: z.string().optional(),
  fruitsGrown: z.string().optional(),
  riceVarieties: z.string().optional(),
  dairyProduction: z.boolean().default(false),
  dairyDetails: z.string().optional(),
  poultryFarming: z.boolean().default(false),
  poultryDetails: z.string().optional(),
  currentFertilizers: z.string().min(5, { message: "Please describe current fertilizer usage (min 5 characters)."}),
  fertilizerAdviceSpecifics: z.string().min(10, { message: "Please specify advice needed (min 10 characters)."}),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to submit the form.",
  }),
}).refine(data => {
    if (data.primaryWaterSources.includes('other') && (!data.otherWaterSource || data.otherWaterSource.trim() === '')) {
        return false;
    }
    return true;
}, {
    message: "Please specify 'Other' water source if selected.",
    path: ["otherWaterSource"],
}).refine(data => {
    if (data.dairyProduction && (!data.dairyDetails || data.dairyDetails.trim().length < 5)) {
        return false;
    }
    return true;
}, {
    message: "Please provide details for dairy production (min 5 characters).",
    path: ["dairyDetails"],
}).refine(data => {
    if (data.poultryFarming && (!data.poultryDetails || data.poultryDetails.trim().length < 5)) {
        return false;
    }
    return true;
}, {
    message: "Please provide details for poultry farming (min 5 characters).",
    path: ["poultryDetails"],
});

type FarmerConnectFormValues = z.infer<typeof farmerConnectFormSchema>;

export function FarmerConnectForm() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FarmerConnectFormValues>({
    resolver: zodResolver(farmerConnectFormSchema),
    defaultValues: {
      farmerName: "",
      phoneNumber: "",
      village: "",
      mandal: "",
      district: "",
      farmSizeAcres: 0,
      primaryWaterSources: [],
      otherWaterSource: "",
      soilType: "",
      vegetablesGrown: "",
      fruitsGrown: "",
      riceVarieties: "",
      dairyProduction: false,
      dairyDetails: "",
      poultryFarming: false,
      poultryDetails: "",
      currentFertilizers: "",
      fertilizerAdviceSpecifics: "",
      agreeToTerms: false,
    },
  });

  const watchedDairyProduction = form.watch("dairyProduction");
  const watchedPoultryFarming = form.watch("poultryFarming");
  const watchedWaterSources = form.watch("primaryWaterSources");

  function onSubmit(data: FarmerConnectFormValues) {
    console.log("Farmer Data Submitted (Demo):", data);
    toast({
      title: "Farmer Data Submitted (Demo)",
      description: `Thank you, ${data.farmerName}. Your information has been received. We will contact you shortly.`,
      variant: "default",
    });
    form.reset();
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <Sprout className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl font-headline text-primary">Farmer Connect Form</CardTitle>
        </div>
        <CardDescription>Share your farming details with Jagruthi for support and advice. All fields marked with * are required.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="farmerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Farmer Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Your Contact Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Village *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Village Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mandal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mandal/Block *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Mandal/Block" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your District" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="farmSizeAcres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Farm Size (in Acres) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5.5" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="primaryWaterSources"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Primary Water Sources *</FormLabel>
                    <FormDescription>Select all that apply.</FormDescription>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {waterSources.map((source) => (
                      <FormField
                        key={source.id}
                        control={form.control}
                        name="primaryWaterSources"
                        render={({ field }) => (
                          <FormItem
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(source.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), source.id])
                                    : field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== source.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{source.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedWaterSources?.includes('other') && (
              <FormField
                control={form.control}
                name="otherWaterSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specify Other Water Source *</FormLabel>
                    <FormControl>
                      <Input placeholder="Describe other water source" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="soilType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soil Type (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Black soil, Red soil, Loamy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-accent border-b pb-1">Crop Details</h3>
                <FormField
                    control={form.control}
                    name="vegetablesGrown"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Vegetables Grown (Optional)</FormLabel>
                        <FormControl>
                        <Textarea placeholder="e.g., Tomato, Brinjal, Okra, Chilli. List all major vegetables." {...field} rows={3}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fruitsGrown"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Fruits Grown (Optional)</FormLabel>
                        <FormControl>
                        <Textarea placeholder="e.g., Mango, Banana, Guava, Papaya. List all major fruits." {...field} rows={3}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="riceVarieties"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rice Varieties Cultivated (Optional)</FormLabel>
                        <FormControl>
                        <Textarea placeholder="e.g., Sona Masuri, Basmati, IR-64. List all varieties." {...field} rows={3}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium text-accent border-b pb-1">Livestock Details (Optional)</h3>
                <FormField
                  control={form.control}
                  name="dairyProduction"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-3 border rounded-md">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="font-normal mb-0! cursor-pointer">Engaged in Dairy Production?</FormLabel>
                    </FormItem>
                  )}
                />
                {watchedDairyProduction && (
                  <FormField
                    control={form.control}
                    name="dairyDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dairy Details * (if dairy production is selected)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., 5 cows, 2 buffaloes, daily milk yield approx 50 liters. Breed of animals." {...field} rows={3}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                 <FormField
                  control={form.control}
                  name="poultryFarming"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-3 border rounded-md">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="font-normal mb-0! cursor-pointer">Engaged in Poultry Farming?</FormLabel>
                    </FormItem>
                  )}
                />
                {watchedPoultryFarming && (
                  <FormField
                    control={form.control}
                    name="poultryDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poultry Details * (if poultry farming is selected)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., 100 broiler chickens, 50 laying hens. Type of birds." {...field} rows={3}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
            </div>
            
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-accent border-b pb-1">Fertilizer Information *</h3>
                 <FormField
                    control={form.control}
                    name="currentFertilizers"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Current Fertilizers Used & Practices *</FormLabel>
                        <FormControl>
                        <Textarea placeholder="List fertilizers currently used, for which crops, application methods, and frequency." {...field} rows={4}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fertilizerAdviceSpecifics"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Specific Advice Needed on Fertilizers/Pesticides *</FormLabel>
                        <FormControl>
                        <Textarea placeholder="e.g., 'Best fertilizer for cotton in black soil?', 'Organic alternatives for pest control in vegetables?', 'How to improve soil health?'" {...field} rows={4}/>
                        </FormControl>
                        <FormDescription>
                            Please be as specific as possible with your questions.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      I agree to allow Jagruthi to store my information and contact me regarding agricultural advice and support programs. *
                    </FormLabel>
                    <FormDescription>
                      Your data will be used to provide you with better support.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              Submit Farmer Details
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    