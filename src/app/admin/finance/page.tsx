
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction, ShieldAlert, Landmark, BarChart3, PieChart, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Finance Management | Admin | Jagruthi',
  description: 'Oversee financial health, budgeting, and planning for Jagruthi. Restricted access.',
};

export default function FinanceManagementPage() {
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
            Finance Management
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            This section will provide tools for financial oversight, budgeting, reporting, and strategic financial planning for the organization.
          </p>
           <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md max-w-2xl mx-auto text-sm text-destructive">
            <ShieldAlert className="inline-block h-5 w-5 mr-2" />
            <strong>Note:</strong> Access to this section is intended for authorized personnel (e.g., Founder, Finance Head) only. Full role-based access control and financial system integration are pending implementation.
          </div>
        </div>

        <Card className="max-w-2xl mx-auto shadow-md">
          <CardHeader className="items-center text-center">
            <Construction className="h-12 w-12 text-accent mb-2" />
            <CardTitle className="text-xl font-semibold text-accent">Under Construction</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            <p className="text-foreground/70">
              The finance management module is currently under development. 
            </p>
             <p className="text-sm text-muted-foreground">
              Key features planned include:
            </p>
            <ul className="list-none text-left text-sm text-muted-foreground space-y-1 max-w-md mx-auto">
                <li className="flex items-center"><Landmark className="h-4 w-4 mr-2 text-primary" /> Budget Creation & Tracking</li>
                <li className="flex items-center"><BarChart3 className="h-4 w-4 mr-2 text-primary" /> Expense Monitoring & Categorization</li>
                <li className="flex items-center"><PieChart className="h-4 w-4 mr-2 text-primary" /> Financial Reporting & Dashboards</li>
                <li className="flex items-center"><FileSpreadsheet className="h-4 w-4 mr-2 text-primary" /> Grant Management & Donor Tracking</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Please check back later for updates on these financial management tools.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
