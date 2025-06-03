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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const partnershipTypes = [
  "Corporate Sponsorship",
  "NGO Collaboration",
  "Event Partnership",
  "Resource Sharing",
  "Technology Partner",
  "Other",
];

const partnerFormSchema = z.object({
  organizationName: z.string().min(2, { message: "Organization name must be at least 2 characters." }),
  contactPerson: z.string().min(2, { message: "Contact person name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format." }),
  partnershipType: z.string({ required_error: "Please select a partnership type." }),
  proposal: z.string().min(20, { message: "Proposal details must be at least 20 characters." }),
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

export function PartnerForm() {
  const { toast } = useToast();
  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      organizationName: "",
      contactPerson: "",
      email: "",
      phone: "",
      partnershipType: undefined,
      proposal: "",
    },
  });

  function onSubmit(data: PartnerFormValues) {
    console.log(data);
    toast({
      title: "Partnership Proposal Submitted!",
      description: "Thank you for your interest in partnering with Jagruthi. We will review your proposal and get back to you.",
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Partner With Us</CardTitle>
        <CardDescription>Let's collaborate to create a bigger impact. We are open to various forms of partnership.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Organization's Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of the contact person" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="official.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Organization's Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="partnershipType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Partnership</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a partnership type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {partnershipTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proposal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partnership Proposal / Idea</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your partnership idea or proposal..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              Submit Proposal
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
