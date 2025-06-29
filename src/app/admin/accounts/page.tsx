
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ClipboardCheck, TrendingUp, Receipt, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accounts Portal | Admin | Jagruthi',
  description: 'Accounts department portal for managing financial operations and auditing at Jagruthi. Restricted access.',
};

export default function AccountsPortalPage() {
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
            Accounts Department Portal
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Manage financial operations, review transactions, and oversee auditing processes.
          </p>
           <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md max-w-3xl mx-auto text-sm text-destructive">
            <div className="flex items-start">
              <ShieldAlert className="inline-block h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Security & Access Control Note:</strong>
                <p className="mt-1">
                  Access to this portal is intended for authorized personnel only. 
                  Full role-based access control (RBAC), including distinct permissions for roles like Founder or Accounts Head (e.g., to verify, accept, rectify, reject, and update financial data), and secure login systems are pending implementation. 
                  Access will be governed by an employee hierarchical structure.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/accounts/audit" legacyBehavior>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Audit Section</CardTitle>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Monitor Operations</div>
                <p className="text-xs text-muted-foreground">
                  Review logs and ensure compliance. (Under Development)
                </p>
              </CardContent>
            </Card>
          </Link>
          <Card className="opacity-50 cursor-not-allowed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">Financial Reporting</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View Reports</div>
              <p className="text-xs text-muted-foreground">
                Generate and view financial statements. (Coming Soon)
              </p>
            </CardContent>
          </Card>
           <Card className="opacity-50 cursor-not-allowed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">Expense Tracking</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Manage Expenses</div>
              <p className="text-xs text-muted-foreground">
                Log and categorize organizational expenses. (Coming Soon)
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
