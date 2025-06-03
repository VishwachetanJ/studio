
"use client";

import React, { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const newsletterFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export function NewsletterSignUpForm() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: NewsletterFormValues) {
    console.log(data);
    toast({
      title: "Subscribed!",
      description: "Thank you for signing up for our newsletter. You'll receive updates soon.",
    });
    form.reset();
  }

  if (!isMounted) {
    // Render null or a placeholder until the component has mounted on the client
    // This prevents the form from being part of the initial server-rendered HTML
    // that might be modified by browser extensions before hydration.
    // A placeholder could be used to prevent layout shifts, e.g., <div className="h-[APPROPRIATE_HEIGHT_HERE]"></div>
    return null; 
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-2">Stay Updated</h3>
      <p className="text-sm text-foreground/70 mb-4">
        Get the latest news on products, events, and our initiatives.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 items-start">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-grow w-full sm:w-auto">
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="your.email@example.com" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}
