
"use client";

import React, { useState, useEffect } from "react";
import { SignInForm } from "@/components/forms/SignInForm";
import { SignUpForm } from "@/components/forms/SignUpForm";

export function HomeAuthSection() {
  const [currentView, setCurrentView] = useState<"signIn" | "signUp">("signIn");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchToSignUp = () => setCurrentView("signUp");
  const switchToSignIn = () => setCurrentView("signIn");

  if (!isMounted) {
    // Return a placeholder or null to avoid layout shifts and potential hydration issues
    // if the initial server render differs from what client-side logic might immediately change.
    // A common pattern is to match the expected height of the component.
    return <div className="py-12 sm:py-16 min-h-[600px]"></div>; // Adjust min-height as needed
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-headline text-primary">
            Join Our Community
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mt-4">
            {currentView === "signIn"
              ? "Sign in to your account to connect with Jagruthi."
              : "Create a new account to support our causes and stay updated."}
          </p>
        </div>
        <div className="flex justify-center">
          {currentView === "signIn" ? (
            <SignInForm onSwitchToSignUp={switchToSignUp} />
          ) : (
            <SignUpForm onSwitchToSignIn={switchToSignIn} />
          )}
        </div>
      </div>
    </section>
  );
}
