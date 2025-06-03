import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DonationForm } from "@/components/forms/DonationForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate to Jagruthi | Support Our Cause',
  description: 'Make a donation to Jagruthi and help us empower communities. Your contribution makes a difference.',
};

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Support Jagruthi
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Your generous donation enables us to continue our vital work in education, empowerment, and environmental sustainability.
          </p>
        </div>
        <DonationForm />
      </main>
      <Footer />
    </div>
  );
}
