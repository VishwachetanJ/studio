
"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction, Fingerprint, MapPin, UserCheck, ShieldAlert, MessageSquareWarning, CalendarDays, TrendingUp, FileText, Users, BarChart2, ListChecks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import React, { useState, useEffect } from "react";

// Metadata can still be exported from client components, Next.js handles it.
// For this page, we'll keep the existing metadata setup.
// export const metadata: Metadata = { ... }; // This would be defined by Next.js if needed for static generation

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  // The Calendar component itself handles internal month navigation.
  // If we needed to control it externally, we'd use a state like:
  // const [displayedMonth, setDisplayedMonth] = useState<Date>(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Conditional rendering to prevent hydration errors if Calendar or Date logic is client-specific
  if (!isMounted) {
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
              Loading attendance system...
            </p>
          </div>
          <div className="flex justify-center items-center py-10">
            <Construction className="h-12 w-12 text-primary animate-spin" />
            <p className="ml-4 text-lg text-foreground/70">Loading interface...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            This section provides a comprehensive system for managing employee attendance, punctuality, and related performance metrics, monitored by the HR department.
          </p>
           <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-md max-w-3xl mx-auto text-sm text-destructive text-left">
            <div className="flex items-start">
                <ShieldAlert className="inline-block h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                    <strong className="font-semibold">Security & Future Enhancements Note:</strong>
                    <p className="mt-1">
                    Access to this module is intended for authorized HR personnel and management. Full implementation of role-based access control (RBAC), data integrations, and secure login systems is pending backend development. The features described below are planned.
                    </p>
                </div>
            </div>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-md">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl font-semibold text-accent">Employee Attendance Management System</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Track and manage employee attendance and related activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Section 1: Attendance Tracking & Views */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center"><CalendarDays className="mr-2 h-5 w-5"/>Attendance Calendar & Data Integration</CardTitle>
                <CardDescription className="text-xs">View and verify employee attendance. Data from various sources will be consolidated here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/5 rounded-lg flex flex-col items-center justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border shadow"
                    // month={displayedMonth} // To control month externally
                    // onMonthChange={setDisplayedMonth} // To control month externally
                  />
                  {selectedDate && (
                    <p className="mt-4 text-sm text-center text-primary">
                      Selected Date: {selectedDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
                <p className="text-sm text-foreground/70 font-semibold">Planned Data Sources & Features:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
                    <li className="flex items-center"><Fingerprint className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" /> Biometric Systems Integration</li>
                    <li className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" /> GPS-based Attendance (for field staff)</li>
                    <li className="flex items-center"><Users className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" /> Manual Entry/Correction (by HR)</li>
                </ul>
                <Button variant="outline" size="sm" disabled className="mt-2">View Full Attendance Logs (Coming Soon)</Button>
              </CardContent>
            </Card>

            <Separator />

            {/* Section 2: Performance & Punctuality */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center"><TrendingUp className="mr-2 h-5 w-5"/>Performance & Punctuality Metrics</CardTitle>
                <CardDescription className="text-xs">Analyze punctuality and calculate performance scores based on attendance data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center">
                        <BarChart2 className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium text-foreground/80">Punctuality Reports</p>
                        <p className="text-xs text-muted-foreground">(e.g., Late arrivals, Early departures) (Coming Soon)</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center">
                        <UserCheck className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium text-foreground/80">Performance Scores</p>
                        <p className="text-xs text-muted-foreground">(Based on attendance, customizable metrics) (Coming Soon)</p>
                    </div>
                 </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
                    <li>Payroll Reporting Data (for Accounts department)</li>
                    <li>Individual Employee Performance Dashboards</li>
                </ul>
                <Button variant="outline" size="sm" disabled className="mt-2">Generate Performance Report (Coming Soon)</Button>
              </CardContent>
            </Card>

            <Separator />

            {/* Section 3: Complaint Management */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center"><MessageSquareWarning className="mr-2 h-5 w-5"/>Employee Complaint & Issue Logging</CardTitle>
                <CardDescription className="text-xs">Track and manage employee-related complaints or issues reported to HR.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-muted/30 rounded-lg min-h-[100px] flex flex-col items-center justify-center text-center">
                    <ListChecks className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium text-foreground/80">Complaint Log & Tracking System</p>
                    <p className="text-xs text-muted-foreground">(Status, resolution, history) (Coming Soon)</p>
                </div>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-4">
                    <li>Secure submission of complaints</li>
                    <li>Assignment to HR personnel</li>
                    <li>Audit trail for complaint handling</li>
                </ul>
                <Button variant="outline" size="sm" disabled className="mt-2">View Complaint Dashboard (Coming Soon)</Button>
              </CardContent>
            </Card>
            
            <p className="text-sm text-center text-muted-foreground mt-8">
              Full backend integration, API connections, and interactive features are planned.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

