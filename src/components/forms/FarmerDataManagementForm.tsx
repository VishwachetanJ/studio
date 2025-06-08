
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Database, Leaf, DollarSign, UserCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React, { useState, useEffect } from "react";

const cropTypes = ["Vegetable", "Fruit", "Grain", "Spice", "Pulse", "Oilseed", "Fiber", "Other"] as const;
const cultivationSeasons = ["Kharif", "Rabi", "Zaid", "Annual", "Other"] as const;
const harvestUnits = ["Kg", "Quintal", "Tonne", "Bags", "Numbers", "Other"] as const;

const farmerDataFormSchema = z.object({
  // Farmer Profile
  farmerName: z.string().min(2, { message: "Farmer name must be at least 2 characters." }),
  farmerContactNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format." }),
  village: z.string().min(2, { message: "Village name is required." }),
  mandal: z.string().min(2, { message: "Mandal name is required." }),
  district: z.string().min(2, { message: "District name is required." }),

  // Crop Details
  cropName: z.string().min(2, { message: "Crop name is required." }),
  cropType: z.enum(cropTypes, { required_error: "Please select a crop type." }),
  areaCultivatedAcres: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().positive({ message: "Area cultivated must be a positive number." })
  ),
  cultivationSeason: z.enum(cultivationSeasons, { required_error: "Please select a season." }),

  // Harvest & Sales Details
  harvestQuantity: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().positive({ message: "Harvest quantity must be a positive number." })
  ),
  harvestUnit: z.enum(harvestUnits, { required_error: "Please select a harvest unit." }),
  pricePerUnit: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().positive({ message: "Price must be a positive number." })
  ),
  dateOfSale: z.date().optional(),
  marketName: z.string().optional(),

  // Data Entry Meta
  employeeCode: z.string().min(3, { message: "Employee code is required (e.g., EMP123)."}),
  notes: z.string().optional(),
});

type FarmerDataFormValues = z.infer<typeof farmerDataFormSchema>;

export function FarmerDataManagementForm() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<FarmerDataFormValues>({
    resolver: zodResolver(farmerDataFormSchema),
    defaultValues: {
      farmerName: "",
      farmerContactNumber: "",
      village: "",
      mandal: "",
      district: "",
      cropName: "",
      cropType: undefined,
      areaCultivatedAcres: 0,
      cultivationSeason: undefined,
      harvestQuantity: 0,
      harvestUnit: undefined,
      pricePerUnit: 0,
      dateOfSale: undefined,
      marketName: "",
      employeeCode: "",
      notes: "",
    },
  });

  function onSubmit(data: FarmerDataFormValues) {
    console.log("Farmer Data Submitted (Demo):", data);
    toast({
      title: "Farmer Data Submitted (Demo)",
      description: `Data for farmer ${data.farmerName} (Crop: ${data.cropName}) entered by employee ${data.employeeCode} has been logged. Backend saving is not implemented.`,
      variant: "default",
    });
    // form.reset(); // Optionally reset form
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <Database className="h-7 w-7 text-primary" />
          <CardTitle className="text-2xl font-headline text-primary">Farmer Data Entry</CardTitle>
        </div>
        <CardDescription>
          Enter new farmer and crop information. For modifications or audit trails, backend integration is required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            
            {/* Farmer Profile Section */}
            <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-background">
              <h3 className="text-xl font-semibold text-accent flex items-center"><UserCircle className="mr-2 h-6 w-6"/>Farmer Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField name="farmerName" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Farmer Full Name*</FormLabel><FormControl><Input placeholder="Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField name="farmerContactNumber" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Contact Number*</FormLabel><FormControl><Input type="tel" placeholder="Phone Number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField name="village" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Village*</FormLabel><FormControl><Input placeholder="Village" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField name="mandal" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Mandal/Block*</FormLabel><FormControl><Input placeholder="Mandal/Block" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField name="district" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>District*</FormLabel><FormControl><Input placeholder="District" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
            </div>

            {/* Crop Details Section */}
            <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-background">
              <h3 className="text-xl font-semibold text-accent flex items-center"><Leaf className="mr-2 h-6 w-6"/>Crop Cultivation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField name="cropName" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Crop Name*</FormLabel><FormControl><Input placeholder="e.g., Cotton, Rice, Tomato" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField name="cropType" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Crop Type*</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select crop type" /></SelectTrigger></FormControl><SelectContent>{cropTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )}/>
                <FormField name="areaCultivatedAcres" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Area Cultivated (Acres)*</FormLabel><FormControl><Input type="number" placeholder="e.g., 2.5" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField name="cultivationSeason" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Cultivation Season*</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select season" /></SelectTrigger></FormControl><SelectContent>{cultivationSeasons.map(season => <SelectItem key={season} value={season}>{season}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )}/>
              </div>
            </div>
            
            {/* Harvest & Sales Section */}
            <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-background">
              <h3 className="text-xl font-semibold text-accent flex items-center"><DollarSign className="mr-2 h-6 w-6"/>Harvest & Sales Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField name="harvestQuantity" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Harvest Quantity*</FormLabel><FormControl><Input type="number" placeholder="e.g., 1000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField name="harvestUnit" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Harvest Unit*</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select unit" /></SelectTrigger></FormControl><SelectContent>{harvestUnits.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )}/>
                <FormField name="pricePerUnit" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Price Per Unit (₹)*</FormLabel><FormControl><Input type="number" placeholder="e.g., 20.50" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)}/></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField name="dateOfSale" control={form.control} render={({ field }) => (
                  <FormItem className="flex flex-col"><FormLabel>Date of Sale (Optional)</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                )}/>
                <FormField name="marketName" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Market Name (Optional)</FormLabel><FormControl><Input placeholder="e.g., Local Rythu Bazar" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
            </div>

            {/* Data Entry Meta Section */}
            <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-background">
              <h3 className="text-xl font-semibold text-accent flex items-center"><UserCircle className="mr-2 h-6 w-6"/>Data Entry Details</h3>
               <FormField name="employeeCode" control={form.control} render={({ field }) => (
                  <FormItem className="md:col-span-1"><FormLabel>Employee Code (Data Entry)*</FormLabel><FormControl><Input placeholder="Your Employee Code" {...field} /></FormControl><FormDescription>Employee ID of person entering data.</FormDescription><FormMessage /></FormItem>
                )}/>
                <FormField name="notes" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Additional Notes (Optional)</FormLabel><FormControl><Textarea placeholder="Any other relevant information..." {...field} rows={3} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-8" size="lg">
              Save Farmer Data
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
