import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volunteer With Us | Jagruthi Connect',
  description: 'Join Jagruthi as a volunteer and contribute to meaningful community projects. Apply today!',
};

export default function VolunteerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Become a Volunteer
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Your time and skills can make a real difference. Join our team of passionate volunteers and help us empower communities.
          </p>
        </div>
        <VolunteerForm />
      </main>
      <Footer />
    </div>
  );
}
