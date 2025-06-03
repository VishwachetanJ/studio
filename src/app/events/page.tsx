
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventForm } from "@/components/forms/EventForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events at Jagruthi | Get Involved',
  description: 'Stay updated on upcoming events, workshops, and community programs by Jagruthi. Register your interest.',
};

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Upcoming Events & Workshops
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Join us for insightful workshops, community gatherings, and impactful events. Register below to secure your spot or express your interest in participation.
          </p>
        </div>
        <EventForm />
      </main>
      <Footer />
    </div>
  );
}
