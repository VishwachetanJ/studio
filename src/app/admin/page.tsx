
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarCheck, FileText, BookUser, ClipboardList, Landmark, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Jagruthi',
  description: 'Admin dashboard for Jagruthi internal operations. Restricted access.',
};

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline text-primary mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Manage internal operations for Jagruthi. Access to these sections is restricted.
          </p>
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md max-w-2xl mx-auto text-sm text-destructive">
            <ShieldAlert className="inline-block h-5 w-5 mr-2" />
            <strong>Security Note:</strong> This dashboard and its modules are intended for authorized personnel only. Full role-based access control and login systems are pending implementation.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/employees" legacyBehavior>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Manage Staff</div>
                <p className="text-xs text-muted-foreground">
                  Add, view, and update employee information.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/attendance" legacyBehavior>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Attendance</CardTitle>
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Track Attendance</div>
                <p className="text-xs text-muted-foreground">
                  View and manage employee attendance records.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/payslips" legacyBehavior>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Pay Slips</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Generate Pay Slips</div>
                <p className="text-xs text-muted-foreground">
                  Manage payroll and employee pay slips.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/accounts" legacyBehavior>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Accounts Portal</CardTitle>
                <BookUser className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Manage Accounts</div>
                <p className="text-xs text-muted-foreground">
                  Oversee financial operations and auditing.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/farmers-data" legacyBehavior>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Farmers Data</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Manage Farm Data</div>
                <p className="text-xs text-muted-foreground">
                  Farmer profiles, crop details, prices. (Under Dev)
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/finance" legacyBehavior>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Finance Mgt.</CardTitle>
                <Landmark className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Financial Overview</div>
                <p className="text-xs text-muted-foreground">
                  Budgeting, financial planning. (Under Dev)
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
