
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction, SearchCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Audit Section | Accounts | Admin | Jagruthi',
  description: 'Monitor and audit account-related operations for Jagruthi.',
};

export default function AuditPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8">
          <Link href="/admin/accounts" legacyBehavior>
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Accounts Portal
            </Button>
          </Link>
        </div>
        <div className="text-center mb-12">
           <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Audit Section
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            This section will provide tools to monitor account activities, review logs, and ensure operational compliance.
          </p>
        </div>

        <Card className="max-w-xl mx-auto shadow-md">
          <CardHeader className="items-center text-center">
            <Construction className="h-12 w-12 text-accent mb-2" />
            <CardTitle className="text-xl font-semibold text-accent">Under Construction</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-foreground/70">
              The audit monitoring system is currently under development. 
              Features will include activity logging, transaction reviews, and compliance checks.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Please check back later for updates.
            </p>
            <SearchCheck className="h-8 w-8 text-primary mx-auto mt-6" />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
