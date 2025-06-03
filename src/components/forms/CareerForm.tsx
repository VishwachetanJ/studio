
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ACCEPTED_FILE_EXTENSIONS_STRING = ".pdf, .doc, .docx, .txt, .jpg, .jpeg, .png, .webp, .gif";


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
  resumeFile: z
    .custom<FileList>((val) => val instanceof FileList, "Please upload your resume.")
    .refine((files) => files.length > 0, "Please upload your resume.")
    .refine((files) => files.length <= 1, "Please upload only one file.")
    .refine(
      (files) => {
        const file = files[0];
        if (!file) return false;
        return ACCEPTED_FILE_TYPES.includes(file.type);
      },
      `Accepted file types: ${ACCEPTED_FILE_EXTENSIONS_STRING}`
    )
    .refine(
      (files) => {
        const file = files[0];
        if (!file) return false;
        return file.size <= MAX_FILE_SIZE;
      },
      `File size must be ${MAX_FILE_SIZE / (1024 * 1024)}MB or less.`
    ),
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
      resumeFile: undefined,
      coverLetter: "",
    },
  });

  function onSubmit(data: CareerFormValues) {
    console.log("Form data:", data);
    if (data.resumeFile && data.resumeFile.length > 0) {
      console.log("Uploaded resume name:", data.resumeFile[0].name);
      console.log("Uploaded resume size:", data.resumeFile[0].size);
      console.log("Uploaded resume type:", data.resumeFile[0].type);
    }
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
              name="resumeFile"
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel>Resume/CV File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept={ACCEPTED_FILE_EXTENSIONS_STRING}
                      onChange={(e) => {
                        onChange(e.target.files);
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload your resume ({ACCEPTED_FILE_EXTENSIONS_STRING}). Max file size: {MAX_FILE_SIZE / (1024 * 1024)}MB.
                  </FormDescription>
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
