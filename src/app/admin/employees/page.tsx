
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmployeeDataForm } from "@/components/forms/EmployeeDataForm";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manage Employees | Admin | Jagruthi',
  description: 'Manage employee data for Jagruthi.',
};

export default function ManageEmployeesPage() {
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
            Employee Management
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Add new employees or update existing employee information.
          </p>
        </div>
        <EmployeeDataForm />
      </main>
      <Footer />
    </div>
  );
}
