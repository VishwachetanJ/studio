
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
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { LogIn } from "lucide-react";
import Link from "next/link";

const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

// onSwitchToSignUp prop removed
export function SignInForm() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: SignInFormValues) {
    console.log(data);
    toast({
      title: "Sign In Attempted",
      description: "If your credentials are valid, you'll be redirected shortly. (This is a demo)",
    });
  }

  if (!isMounted) {
    return null; 
  }

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg">
      <CardHeader className="text-center">
        <LogIn className="mx-auto h-10 w-10 text-primary mb-1 sm:h-12 sm:w-12 sm:mb-2" />
        <CardTitle className="text-xl sm:text-2xl font-headline text-primary">Sign In</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Access your Jagruthi account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Link href="/forgot-password" legacyBehavior>
                <a className="text-xs sm:text-sm text-primary hover:underline">
                  Forgot Password?
                </a>
              </Link>
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              Sign In
            </Button>
          </form>
        </Form>
        {/* Logic for switching to sign up within the same component removed */}
        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" legacyBehavior>
            <a className="font-medium text-primary hover:underline">
              Sign Up
            </a>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
