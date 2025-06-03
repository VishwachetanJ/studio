
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SignUpForm } from "@/components/forms/SignUpForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | JAGRUTHI',
  description: 'Create an account with Jagruthi.',
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16 flex items-center justify-center">
        <SignUpForm />
      </main>
      <Footer />
    </div>
  );
}
