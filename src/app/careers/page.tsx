
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CareerForm } from "@/components/forms/CareerForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at Jagruthi | Make a Difference',
  description: 'Explore career opportunities with Jagruthi and contribute your skills to a meaningful cause. Apply to join our team.',
};

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Join Our Team
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            We are looking for passionate individuals to join our mission. If you are dedicated to community development and empowerment, explore our openings or submit a general application.
          </p>
        </div>
        <CareerForm />
      </main>
      <Footer />
    </div>
  );
}
