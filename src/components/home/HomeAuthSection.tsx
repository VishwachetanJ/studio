
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
    // Placeholder to match the structure and prevent layout shifts
    return (
        <div className="w-full h-full flex flex-col bg-gradient-to-br from-primary/5 via-background to-background p-6 rounded-lg shadow-md min-h-[500px] md:min-h-[600px]">
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-headline text-primary">Join Our Community</h2>
                <p className="text-md sm:text-lg text-foreground/80 max-w-xl mx-auto mt-3">Loading forms...</p>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center">
                {/* Intentionally empty or add a skeleton here if desired */}
            </div>
        </div>
    );
  }

  return (
    <section className="w-full h-full flex flex-col bg-gradient-to-br from-primary/5 via-background to-background p-6 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-headline text-primary">
          Join Our Community
        </h2>
        <p className="text-md sm:text-lg text-foreground/80 max-w-xl mx-auto mt-3">
          {currentView === "signIn"
            ? "Sign in to your account to connect with Jagruthi."
            : "Create a new account to support our causes and stay updated."}
        </p>
      </div>
      <div className="flex-grow flex flex-col justify-center items-center">
        {currentView === "signIn" ? (
          <SignInForm onSwitchToSignUp={switchToSignUp} />
        ) : (
          <SignUpForm onSwitchToSignIn={switchToSignIn} />
        )}
      </div>
    </section>
  );
}
