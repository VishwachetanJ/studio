
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SignInForm } from "@/components/forms/SignInForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | JAGRUTHI',
  description: 'Sign in to your Jagruthi account.',
};

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16 flex items-center justify-center">
        <SignInForm />
      </main>
      <Footer />
    </div>
  );
}
