
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction, Fingerprint, MapPin, UserCheck, ShieldAlert, MessageSquareWarning } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Employee Attendance | Admin | Jagruthi',
  description: 'Manage and track employee attendance for Jagruthi, integrating various data sources for performance and punctuality monitoring.',
};

export default function AttendancePage() {
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
            Employee Attendance & Monitoring
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            This section will provide a comprehensive system for managing employee attendance, punctuality, and related performance metrics, monitored by the HR department.
          </p>
           <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md max-w-3xl mx-auto text-sm text-destructive text-left">
            <div className="flex items-start">
                <ShieldAlert className="inline-block h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                    <strong className="font-semibold">Security & Future Enhancements Note:</strong>
                    <p className="mt-1">
                    Access to this module is intended for authorized HR personnel and management. Full implementation of role-based access control (RBAC) and secure login systems is pending.
                    </p>
                </div>
            </div>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto shadow-md">
          <CardHeader className="items-center text-center">
            <Construction className="h-12 w-12 text-accent mb-2" />
            <CardTitle className="text-xl font-semibold text-accent">Under Construction</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            <p className="text-foreground/70">
              The advanced attendance tracking and employee monitoring system is currently under development.
            </p>
            <p className="text-sm text-muted-foreground">
              Key features planned for this module include:
            </p>
            <ul className="list-none text-left text-sm text-muted-foreground space-y-2 max-w-md mx-auto">
                <li className="flex items-center"><Fingerprint className="h-4 w-4 mr-2 text-primary" /> Integration with Biometric Systems</li>
                <li className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary" /> GPS-based Attendance Tracking (for field staff)</li>
                <li className="flex items-center"><UserCheck className="h-4 w-4 mr-2 text-primary" /> HR Dashboard for Monitoring & Verification</li>
                <li className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-primary" /> Calendar Views for Employee Availability & Leave</li>
                <li className="flex items-center"><TrendingUp className="h-4 w-4 mr-2 text-primary" /> Punctuality & Performance Metric Calculation</li>
                <li className="flex items-center"><FileText className="h-4 w-4 mr-2 text-primary" /> Attendance Reporting for Payroll (monitored by Accounts)</li>
                <li className="flex items-center"><MessageSquareWarning className="h-4 w-4 mr-2 text-primary" /> Logging and Management of Employee Complaints/Issues</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Please check back later for updates on these comprehensive employee management tools.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
