
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React, { useState, useEffect } from "react";

const availablePositions = [
  "Project Coordinator",
  "Field Officer",
  "Fundraising Manager",
  "Communications Lead",
  "Administrative Assistant",
  "Social Worker",
  "Accountant",
] as const;

const careerFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format." }),
  positionAppliedFor: z.enum(availablePositions, {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_type) {
        return { message: "Please select a position." };
      }
      if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: "Please select a valid position from the list." };
      }
      return { message: ctx.defaultError };
    },
  }),
  resumeLink: z.string().url({ message: "Please enter a valid URL for your resume/CV (e.g., Google Drive, LinkedIn)." }),
  coverLetter: z.string().min(20, {message: "Cover letter must be at least 20 characters."}).optional(),
});

type CareerFormValues = z.infer<typeof careerFormSchema>;

export function CareerForm() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      positionAppliedFor: undefined,
      resumeLink: "",
      coverLetter: "",
    },
  });

  function onSubmit(data: CareerFormValues) {
    console.log(data);
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest in joining Jagruthi. We will review your application and get back to you if there's a suitable opening.",
    });
    form.reset();
  }

  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Join Our Team</CardTitle>
        <CardDescription>We are looking for passionate individuals to contribute to our mission. Fill out the form below to apply.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Full Name" {...field} />
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Your Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="positionAppliedFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Applied For</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availablePositions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
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
              name="resumeLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link to Resume/CV (Required)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/your-resume" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us why you want to join Jagruthi and what you can bring to the team..." {...field} rows={5}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              Submit Application
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
