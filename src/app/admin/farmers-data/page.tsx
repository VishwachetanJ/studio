
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldAlert, Database, UserCircle, Leaf, DollarSign } from 'lucide-react'; // Added more icons for potential use
import { FarmerDataManagementForm } from "@/components/forms/FarmerDataManagementForm";

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
            Use the form below to demonstrate the entry of new farmer profiles, crop cultivation details, harvest quantities, and market price information. 
            This module is envisioned to be a comprehensive system for managing all farmer-related data.
          </p>
           <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-md max-w-3xl mx-auto text-sm text-destructive text-left">
            <div className="flex items-start">
              <ShieldAlert className="inline-block h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Important Note on Current Status & Future Features:</strong>
                <p className="mt-1">
                  The form below is a UI demonstration for <strong>new data entry</strong>. 
                  Backend integration for saving, reading, and especially <strong>modifying</strong> data is pending.
                </p>
                <p className="mt-2">
                  The full vision for this module includes:
                </p>
                <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5">
                  <li>Farmer Profiles & Contact Information Management.</li>
                  <li>Crop Cultivation Details (Type, Area, Season).</li>
                  <li>Harvest Quantities & Yield Tracking.</li>
                  <li>Market Price Logging & Analysis.</li>
                  <li>Secure forms for <strong>adding and modifying</strong> data by authorized employees.</li>
                  <li>Full audit trail for all data changes (tracking who created and who modified data, with timestamps and employee codes).</li>
                  <li>Role-based access control to ensure data security and appropriate permissions.</li>
                </ul>
                <p className="mt-2">
                  These comprehensive features are under development and will be implemented with robust backend support.
                </p>
              </div>
            </div>
          </div>
        </div>

        <FarmerDataManagementForm />

      </main>
      <Footer />
    </div>
  );
}
