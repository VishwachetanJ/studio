
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { FarmerDataManagementForm } from "@/components/forms/FarmerDataManagementForm"; // Import the new form

export const metadata: Metadata = {
  title: 'Farmers Data Management | Admin | Jagruthi',
  description: 'Manage farmer profiles, crop details, quantities, price information, and track data modifications. Restricted access.',
};

export default function FarmersDataPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8">
          <Link href="/admin" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin Dashboard
            </Button>
          </Link>
        </div>
        <div className="text-center mb-12">
           <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Farmers Data Management
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Use the form below to enter new farmer and crop data. This module will allow authorized employees to manage farmer profiles, crop information, harvest quantities, and market price details. 
            All data entry and modifications will eventually be tracked with employee codes for audit purposes.
          </p>
           <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md max-w-2xl mx-auto text-sm text-destructive">
            <ShieldAlert className="inline-block h-5 w-5 mr-2" />
            <strong>Note:</strong> This is a UI demonstration for data entry. Backend integration for saving, modifying data, full audit trails, and role-based access control are pending implementation.
          </div>
        </div>

        <FarmerDataManagementForm />

      </main>
      <Footer />
    </div>
  );
}
