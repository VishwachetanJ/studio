
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FarmerConnectForm } from "@/components/forms/FarmerConnectForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Farmer Connect Program | Jagruthi',
  description: 'Connect with Jagruthi to share your farming details, get advice on best practices, fertilizer usage, and explore support opportunities.',
};

export default function FarmerConnectPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Farmer Connect Program
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Share your farming details with us. Jagruthi aims to provide tailored advice on agricultural practices, fertilizer and pesticide usage, crop management, and connect you with relevant support schemes.
          </p>
        </div>
        <FarmerConnectForm />
      </main>
      <Footer />
    </div>
  );
}

    