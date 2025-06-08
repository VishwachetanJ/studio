
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction, ShieldAlert, Database, Apple, Wheat, DollarSign, Edit, Users, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
            This section will allow authorized employees to manage farmer profiles, crop information, cultivation data, harvest quantities, and market price details. All data entry and modifications will be tracked with employee codes for audit purposes.
          </p>
           <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md max-w-2xl mx-auto text-sm text-destructive">
            <ShieldAlert className="inline-block h-5 w-5 mr-2" />
            <strong>Note:</strong> Access to this section is intended for authorized personnel only. Full role-based access control, data storage, modification capabilities, and audit trail functionalities are pending implementation.
          </div>
        </div>

        <Card className="max-w-2xl mx-auto shadow-md">
          <CardHeader className="items-center text-center">
            <Construction className="h-12 w-12 text-accent mb-2" />
            <CardTitle className="text-xl font-semibold text-accent">Under Construction</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            <p className="text-foreground/70">
              The comprehensive system for managing farmers' data is currently under development.
            </p>
            <p className="text-sm text-muted-foreground">
              Future features will include:
            </p>
            <ul className="list-none text-left text-sm text-muted-foreground space-y-2 max-w-md mx-auto">
                <li className="flex items-center"><Database className="h-4 w-4 mr-2 text-primary flex-shrink-0" /> Farmer Profiles & Contact Information Management.</li>
                <li className="flex items-center"><Wheat className="h-4 w-4 mr-2 text-primary flex-shrink-0" /> Crop Cultivation Details (Type, Area, Season).</li>
                <li className="flex items-center"><Apple className="h-4 w-4 mr-2 text-primary flex-shrink-0" /> Harvest Quantities & Yield Tracking.</li>
                <li className="flex items-center"><DollarSign className="h-4 w-4 mr-2 text-primary flex-shrink-0" /> Market Price Logging & Analysis.</li>
                <li className="flex items-center"><Edit className="h-4 w-4 mr-2 text-primary flex-shrink-0" /> Secure forms for adding and modifying data by authorized employees.</li>
                <li className="flex items-center"><History className="h-4 w-4 mr-2 text-primary flex-shrink-0" /> Audit trail for data changes (created by, updated by, timestamps with employee codes).</li>
                <li className="flex items-center"><Users className="h-4 w-4 mr-2 text-primary flex-shrink-0" /> Role-based access control.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Please check back later for updates on these powerful data management tools.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
