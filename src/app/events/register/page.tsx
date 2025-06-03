
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventForm } from "@/components/forms/EventForm";
import type { Metadata } from 'next';
import { Suspense } from 'react'; // Import Suspense

// Helper component to extract search params
function EventFormWrapper({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const category = searchParams?.category as string || "General Inquiry";
  const validCategories = ["Weekly", "Monthly", "Annually", "Special Event"];
  const selectedCategory = validCategories.includes(category) ? category : "General Inquiry";

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
          Register for {selectedCategory === "General Inquiry" ? "an" : ""} Event
          {selectedCategory !== "General Inquiry" && `: ${selectedCategory}`}
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
          Please fill out the form below to register your interest for our {selectedCategory.toLowerCase()} events. We're excited to have you join us!
        </p>
      </div>
      <EventForm selectedCategory={selectedCategory} />
    </>
  );
}


export async function generateMetadata({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {
  const category = searchParams?.category as string || "Event";
  const validCategories = ["Weekly", "Monthly", "Annually", "Special Event"];
  const displayCategory = validCategories.includes(category) ? category : "Our";

  return {
    title: `Register for ${displayCategory} Events | Jagruthi`,
    description: `Sign up for ${displayCategory.toLowerCase()} events, workshops, and community programs by Jagruthi.`,
  };
}


export default function RegisterEventPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        {/* Wrap EventFormWrapper with Suspense */}
        <Suspense fallback={<div>Loading event details...</div>}>
          <EventFormWrapper searchParams={searchParams} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
