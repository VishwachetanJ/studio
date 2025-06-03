import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PartnerForm } from "@/components/forms/PartnerForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner With Jagruthi | Collaborate for Impact',
  description: 'Explore partnership opportunities with Jagruthi. Let\'s work together to create sustainable change.',
};

export default function PartnerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
         <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Partner With Us
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            We believe in the power of collaboration. If your organization shares our vision, let's connect and explore how we can work together.
          </p>
        </div>
        <PartnerForm />
      </main>
      <Footer />
    </div>
  );
}
